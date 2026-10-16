import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9222;

async function run() {
  console.log('Launching Edge with remote debugging...');
  const proc = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\temp\\edge-test-profile',
    '--disable-gpu',
    '--no-first-run',
    '--window-size=1280,960',
    'about:blank'
  ]);

  let versionData = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 300));
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) {
        versionData = await res.json();
        break;
      }
    } catch (_) {}
  }

  if (!versionData) {
    console.error('Failed to connect to Edge CDP');
    proc.kill();
    return;
  }

  console.log('Connected to Edge:', versionData.Browser);

  const newTabRes = await fetch(`http://127.0.0.1:${PORT}/json/new?http://localhost:5173/#/peta-rasa`, { method: 'PUT' });
  const tab = await newTabRes.json();
  const ws = new WebSocket(tab.webSocketDebuggerUrl);

  await new Promise(resolve => { ws.onopen = resolve; });
  console.log('WebSocket connected.');

  let idCounter = 1;
  const callbacks = new Map();
  const consoleMessages = [];

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      callbacks.get(msg.id)(msg.result);
      callbacks.delete(msg.id);
    }
    if (msg.method === 'Runtime.consoleAPICalled') {
      const text = msg.params.args.map(a => a.value || JSON.stringify(a)).join(' ');
      console.log(`[BROWSER CONSOLE ${msg.params.type.toUpperCase()}]:`, text);
      consoleMessages.push({ type: msg.params.type, text });
    }
  };

  function send(method, params = {}) {
    return new Promise(resolve => {
      const id = idCounter++;
      callbacks.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 960,
    deviceScaleFactor: 1,
    mobile: false
  });

  console.log('--- Navigating to Peta Rasa ---');
  await send('Page.navigate', { url: 'http://localhost:5173/#/peta-rasa' });
  await new Promise(r => setTimeout(r, 4000));

  // Scroll to map
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('central-java-map');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`
  });
  await new Promise(r => setTimeout(r, 1000));

  // Evaluate DOM for map container & tiles
  const evalResult = await send('Runtime.evaluate', {
    expression: `(() => {
      const mapEl = document.getElementById('central-java-map');
      if (!mapEl) return { error: 'central-java-map not found' };
      const rect = mapEl.getBoundingClientRect();
      const tiles = Array.from(document.querySelectorAll('#central-java-map .leaflet-tile'));
      const loadedTiles = tiles.filter(t => t.complete && t.naturalWidth > 0).length;
      const tileSrcs = tiles.map(t => t.src).slice(0, 3);
      const markers = document.querySelectorAll('#central-java-map .leaflet-marker-icon').length;
      const geojsonPaths = document.querySelectorAll('#central-java-map path').length;
      const textContent = mapEl.innerText;
      return {
        width: rect.width,
        height: rect.height,
        totalTiles: tiles.length,
        loadedTiles,
        tileSrcs,
        markers,
        geojsonPaths,
        hasErrorText: textContent.includes('API') || textContent.includes('error') || textContent.includes('gagal'),
        textContent: textContent.substring(0, 200)
      };
    })()`,
    returnByValue: true
  });

  console.log('Peta Rasa Evaluation:', JSON.stringify(evalResult.result.value, null, 2));

  // Click a marker to trigger popup
  await send('Runtime.evaluate', {
    expression: `(() => {
      const firstPin = document.querySelector('#central-java-map .custom-city-pin');
      if (firstPin) firstPin.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 1000));

  // Check if popup opened
  const popupEval = await send('Runtime.evaluate', {
    expression: `(() => {
      const popup = document.querySelector('#central-java-map .leaflet-popup-content');
      return {
        popupOpened: !!popup,
        popupText: popup ? popup.innerText : null
      };
    })()`,
    returnByValue: true
  });
  console.log('Peta Rasa Marker Popup Test:', JSON.stringify(popupEval.result.value, null, 2));

  // Capture screenshot of Peta Rasa
  const ss1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshot-peta-rasa.png', Buffer.from(ss1.data, 'base64'));
  console.log('Saved screenshot-peta-rasa.png');

  // Navigate to legendary restaurants
  console.log('--- Navigating to Restaurant Map ---');
  await send('Page.navigate', { url: 'http://localhost:5173/#/restoran-legendaris' });
  await new Promise(r => setTimeout(r, 4000));

  // Scroll to map
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('restaurants-real-map');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`
  });
  await new Promise(r => setTimeout(r, 1000));

  const evalResult2 = await send('Runtime.evaluate', {
    expression: `(() => {
      const mapEl = document.getElementById('restaurants-real-map');
      if (!mapEl) return { error: 'restaurants-real-map not found' };
      const rect = mapEl.getBoundingClientRect();
      const tiles = Array.from(document.querySelectorAll('#restaurants-real-map .leaflet-tile'));
      const loadedTiles = tiles.filter(t => t.complete && t.naturalWidth > 0).length;
      const tileSrcs = tiles.map(t => t.src).slice(0, 3);
      const markers = document.querySelectorAll('#restaurants-real-map .leaflet-marker-icon').length;
      const textContent = mapEl.innerText;
      return {
        width: rect.width,
        height: rect.height,
        totalTiles: tiles.length,
        loadedTiles,
        tileSrcs,
        markers,
        hasErrorText: textContent.includes('API') || textContent.includes('error') || textContent.includes('gagal'),
        textContent: textContent.substring(0, 200)
      };
    })()`,
    returnByValue: true
  });

  console.log('Restaurant Map Evaluation:', JSON.stringify(evalResult2.result.value, null, 2));

  // Click a restaurant marker to trigger popup
  await send('Runtime.evaluate', {
    expression: `(() => {
      const firstPin = document.querySelector('#restaurants-real-map .rest-map-pin');
      if (firstPin) firstPin.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 1000));

  const popupEval2 = await send('Runtime.evaluate', {
    expression: `(() => {
      const popup = document.querySelector('#restaurants-real-map .leaflet-popup-content');
      return {
        popupOpened: !!popup,
        popupText: popup ? popup.innerText : null
      };
    })()`,
    returnByValue: true
  });
  console.log('Restaurant Marker Popup Test:', JSON.stringify(popupEval2.result.value, null, 2));

  const ss2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshot-restaurants.png', Buffer.from(ss2.data, 'base64'));
  console.log('Saved screenshot-restaurants.png');

  ws.close();
  proc.kill();
  process.exit(0);
}

run().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});

