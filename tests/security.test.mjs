import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  handleRequest,
  extractTrustedClientIp,
  validateGenerateRequest,
  buildServerRecipePrompt,
  createModelDiscoveryState,
  isCompatibleTextRecipeModel,
  rankCompatibleModels,
  selectCandidateModels,
} from '../supabase/functions/generate-recipe/index.ts';
import { escapeHtml, safeUrl } from '../src/utils/dom.js';
import { renderFilterPanel } from '../src/components/filter-panel.js';
import { renderRecipeCard } from '../src/components/recipe-card.js';
import { renderRestaurantCard } from '../src/components/restaurant-card.js';
import { renderRecipeModal } from '../src/components/recipe-modal.js';
import { renderNavbar } from '../src/components/navbar.js';
import { renderFooter } from '../src/components/footer.js';
import { renderHomePage } from '../src/pages/home.js';
import { renderRecipesPage } from '../src/pages/recipes.js';
import { renderSpicesPage } from '../src/pages/spices.js';
import { renderLegendaryRestaurantsPage } from '../src/pages/legendary-restaurants.js';
import { renderRecommendationsPage } from '../src/pages/recommendations.js';
import { renderAiFoodCreatorPage } from '../src/pages/ai-food-creator.js';
import { resolveNearestRoute } from '../src/utils/routes.js';
import { aiFoodCreatorService } from '../src/services/aiFoodCreatorService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const VALID_INPUTS = {
  creatorName: 'Evan Hendra Mulyadi',
  selectedIngredientIds: [
    'ayam-kampung',
    'bawang-merah',
    'bawang-putih',
    'ketumbar',
    'kemiri',
  ],
  cookingMethod: 'ungkep',
  dishCategory: 'lauk',
  tasteProfile: 'manis-gurih',
  spiceLevel: 1,
  cookingDuration: 'standard',
  servings: 4,
  equipment: ['wajan', 'cobek'],
  dietary: [],
  customNotes: 'Kuah areh gurih lembut',
  outputLanguage: 'id',
};

function makeDeps(overrides = {}) {
  return {
    getEnv: (name) => {
      if (name === 'GEMINI_API_KEY') return 'test-gemini-secret-key';
      if (name === 'RATE_LIMIT_SALT') return 'test-salt';
      return undefined;
    },
    rateLimitState: {
      perKeyTimestamps: new Map(),
      globalTimestamps: [],
    },
    modelDiscoveryState: createModelDiscoveryState(),
    sleepFn: async () => {},
    fetchFn: async () => {
      throw new Error('Gemini API must not be called on rejected requests');
    },
    ...overrides,
  };
}

function makeListModelsJson(models, nextPageToken) {
  return JSON.stringify(nextPageToken ? { models, nextPageToken } : { models });
}

function makeValidRecipePayload(title = 'Ungkep Ayam Kemiri') {
  return JSON.stringify({
    candidates: [
      {
        content: {
          parts: [
            {
              text: JSON.stringify({
                title,
                ingredients: [{ nameId: 'Ayam Kampung', amount: 500, unitId: 'g' }],
                stepsId: [{ stepNumber: 1, titleId: 'Masak', instructionId: 'Masak hingga matang.' }],
              }),
            },
          ],
        },
      },
    ],
  });
}

function makePostRequest(bodyStr, headers = {}) {
  return new Request('https://fkenbpopcgghadbcresj.supabase.co/functions/v1/generate-recipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://larasrasa.vercel.app',
      'cf-ray': 'abc123-SIN',
      'cf-connecting-ip': '203.0.113.50',
      ...headers,
    },
    body: bodyStr,
  });
}

test('Edge Function CORS & HTTP methods: rejects disallowed origin & non-POST', async () => {
  const deps = makeDeps();

  const allowedOptions = await handleRequest(
    new Request('https://example.com/fn', {
      method: 'OPTIONS',
      headers: { Origin: 'https://larasrasa.vercel.app' },
    }),
    deps,
  );
  assert.equal(allowedOptions.status, 204);
  assert.equal(allowedOptions.headers.get('access-control-allow-origin'), 'https://larasrasa.vercel.app');

  const wildcardSpoofOptions = await handleRequest(
    new Request('https://example.com/fn', {
      method: 'OPTIONS',
      headers: { Origin: 'https://evil-attacker.vercel.app' },
    }),
    deps,
  );
  assert.equal(wildcardSpoofOptions.status, 403);
  assert.equal(wildcardSpoofOptions.headers.get('access-control-allow-origin'), null);

  const getRes = await handleRequest(new Request('https://example.com/fn', { method: 'GET' }), deps);
  assert.equal(getRes.status, 405);

  const badOriginPost = await handleRequest(
    makePostRequest(JSON.stringify({ action: 'generate', inputs: VALID_INPUTS }), {
      Origin: 'https://evil.vercel.app',
    }),
    deps,
  );
  assert.equal(badOriginPost.status, 403);
});

test('Edge Function blocks removed diagnose and unauthenticated check-credits actions', async () => {
  for (const action of ['diagnose', 'check-credits', 'status', 'admin']) {
    const deps = makeDeps();
    const res = await handleRequest(makePostRequest(JSON.stringify({ action })), deps);
    assert.equal(res.status, 400, `Action ${action} must be rejected`);
    const data = await res.json();
    assert.equal(data.success, false);
    assert.equal(data.credits, undefined);
    assert.equal(data.keyPrefix, undefined);
  }
});

test('Edge Function enforces Content-Type, body size limit, strict JSON schema, and field bounds BEFORE Gemini', async () => {
  const deps = makeDeps();

  // Wrong content type
  const badCt = await handleRequest(
    new Request('https://example.com/fn', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain', 'cf-ray': 'r1', 'cf-connecting-ip': '198.51.100.1' },
      body: 'hello',
    }),
    deps,
  );
  assert.equal(badCt.status, 415);

  // Oversized body > 4096 bytes
  const bigRes = await handleRequest(
    makePostRequest(JSON.stringify({ action: 'generate', inputs: { ...VALID_INPUTS, customNotes: 'a'.repeat(5000) } }), {
      'cf-connecting-ip': '198.51.100.2',
    }),
    deps,
  );
  assert.equal(bigRes.status, 413);

  // Raw prompt field rejected (anti-LLM-proxy abuse)
  const rawPromptRes = await handleRequest(
    makePostRequest(JSON.stringify({ action: 'generate', prompt: 'Write an essay', inputs: VALID_INPUTS }), {
      'cf-connecting-ip': '198.51.100.3',
    }),
    deps,
  );
  assert.equal(rawPromptRes.status, 400);

  // Unknown field inside inputs rejected
  const extraInputRes = await handleRequest(
    makePostRequest(JSON.stringify({ action: 'generate', inputs: { ...VALID_INPUTS, adminOverride: true } }), {
      'cf-connecting-ip': '198.51.100.4',
    }),
    deps,
  );
  assert.equal(extraInputRes.status, 400);

  // Prototype pollution attempt rejected
  const protoRes = await handleRequest(
    makePostRequest('{"action":"generate","__proto__":{"polluted":true},"inputs":{}}', {
      'cf-connecting-ip': '198.51.100.5',
    }),
    deps,
  );
  assert.equal(protoRes.status, 400);

  // Invalid ingredient ID rejected
  const badIng = validateGenerateRequest({
    action: 'generate',
    inputs: { ...VALID_INPUTS, selectedIngredientIds: ['ayam-kampung', 'bawang-merah', 'bawang-putih', 'ketumbar', 'not-real-ing'] },
  });
  assert.equal(badIng.ok, false);

  // Exceeding field length limits rejected
  const longNotes = validateGenerateRequest({
    action: 'generate',
    inputs: { ...VALID_INPUTS, customNotes: 'x'.repeat(251) },
  });
  assert.equal(longNotes.ok, false);
});

test('Edge Function rate limiter enforces backend limits and resists X-Forwarded-For spoofing', async () => {
  let calledCount = 0;
  const deps = makeDeps({
    fetchFn: async (url) => {
      const target = String(url);
      if (target.includes('/v1beta/models?')) {
        return new Response(
          makeListModelsJson([
            {
              name: 'models/gemini-flash-lite-latest',
              displayName: 'Gemini Flash-Lite Latest',
              supportedGenerationMethods: ['generateContent', 'countTokens'],
              inputTokenLimit: 1048576,
              outputTokenLimit: 65536,
            },
          ]),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      }
      calledCount++;
      return new Response(makeValidRecipePayload(), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    },
  });

  const payload = JSON.stringify({ action: 'generate', inputs: VALID_INPUTS });

  // Verify untrusted x-forwarded-for cannot override fallback or cf-connecting-ip
  assert.equal(
    extractTrustedClientIp(
      new Request('https://example.com', { headers: { 'x-forwarded-for': '1.2.3.4' } }),
    ),
    'untrusted-edge-fallback',
  );
  assert.equal(
    extractTrustedClientIp(
      new Request('https://example.com', {
        headers: { 'x-forwarded-for': '1.2.3.4', 'cf-ray': '123', 'cf-connecting-ip': '203.0.113.8' },
      }),
    ),
    '203.0.113.8',
  );

  // 1st and 2nd request within 60s succeed
  const r1 = await handleRequest(makePostRequest(payload, { 'x-forwarded-for': '10.0.0.1' }), deps);
  const r2 = await handleRequest(makePostRequest(payload, { 'x-forwarded-for': '10.0.0.2' }), deps);
  assert.equal(r1.status, 200);
  assert.equal(r2.status, 200);

  // 3rd request within 60s blocked even with spoofed X-Forwarded-For!
  const r3 = await handleRequest(makePostRequest(payload, { 'x-forwarded-for': '10.0.0.99' }), deps);
  assert.equal(r3.status, 429);
  assert.ok(Number(r3.headers.get('retry-after')) >= 1);
  assert.equal(calledCount, 2);
});

test('Edge Function sends GEMINI_API_KEY strictly via x-goog-api-key header on ListModels & generateContent and hides upstream errors', async () => {
  const capturedUrls = [];
  const capturedHeadersList = [];

  const deps = makeDeps({
    fetchFn: async (url, init) => {
      const target = String(url);
      capturedUrls.push(target);
      capturedHeadersList.push(init.headers);
      if (target.includes('/v1beta/models?')) {
        return new Response(
          makeListModelsJson([
            {
              name: 'models/gemini-flash-lite-latest',
              displayName: 'Gemini Flash-Lite Latest',
              supportedGenerationMethods: ['generateContent'],
              inputTokenLimit: 1048576,
              outputTokenLimit: 65536,
            },
          ]),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      }
      return new Response('Internal quota trace at /secret/path', { status: 500 });
    },
  });

  const res = await handleRequest(
    makePostRequest(JSON.stringify({ action: 'generate', inputs: VALID_INPUTS }), {
      'cf-connecting-ip': '198.51.100.77',
    }),
    deps,
  );
  assert.equal(res.status, 502);
  const body = await res.json();
  assert.equal(body.error, 'Recipe generation failed');
  assert.ok(!JSON.stringify(body).includes('/secret/path'));
  assert.ok(capturedUrls.length >= 2);
  for (let i = 0; i < capturedUrls.length; i++) {
    assert.ok(!capturedUrls[i].includes('test-gemini-secret-key'));
    assert.equal(capturedHeadersList[i]['x-goog-api-key'], 'test-gemini-secret-key');
  }

  const prompt = buildServerRecipePrompt(VALID_INPUTS);
  assert.ok(prompt.includes('Daging Ayam Kampung'));
  assert.ok(prompt.includes('Evan Hendra Mulyadi'));
});

test('Frontend XSS defense, safeUrl, and filter-panel search escaping', () => {
  // Attribute injection payload via search query parameter
  const xssPayload = '" autofocus onfocus="alert(1)" x="';
  const html = renderFilterPanel({ search: xssPayload });
  assert.ok(!html.includes('onfocus="alert(1)"'));
  assert.ok(html.includes('&quot; autofocus onfocus=&quot;'));

  // Escape preserves 0 and neutralizes HTML metacharacters
  assert.equal(escapeHtml(0), '0');
  assert.equal(escapeHtml('<script>alert("x")</script>'), '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');

  // safeUrl rejects javascript: & data: URIs
  assert.equal(safeUrl('javascript:alert(1)', '#'), '#');
  assert.equal(safeUrl('data:text/html,<script>alert(1)</script>', '#'), '#');
  assert.equal(safeUrl('//evil.com/x.js', '#'), '#');
  assert.equal(safeUrl('/assets/images/recipes/soto-kudus.jpg'), '/assets/images/recipes/soto-kudus.jpg');
  assert.equal(safeUrl('https://www.google.com/maps/place/foo'), 'https://www.google.com/maps/place/foo');

  // Route slug validation strips XSS attempt
  assert.equal(resolveNearestRoute('/resep/<script>alert(1)</script>', false), '/resep');
  assert.equal(resolveNearestRoute('/resep/soto-kudus', false), '/resep/soto-kudus');

  // Deprecated checkCredits no longer exposed on frontend service
  assert.equal(aiFoodCreatorService.checkCredits, undefined);
});

test('CSP & Deployment compliance: zero inline scripts or inline event handlers & valid vercel.json', () => {
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  assert.ok(!/<script(?![^>]*src=)/i.test(indexHtml), 'index.html must not contain inline scripts');

  const vercelJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'vercel.json'), 'utf8'));
  const headerList = vercelJson.headers[0].headers;
  const headerMap = Object.fromEntries(headerList.map((h) => [h.key, h.value]));

  assert.equal(headerMap['X-Content-Type-Options'], 'nosniff');
  assert.equal(headerMap['X-Frame-Options'], 'DENY');
  assert.ok(headerMap['Content-Security-Policy'].includes("script-src 'self'"));
  assert.ok(headerMap['Content-Security-Policy'].includes("script-src-attr 'none'"));
  assert.ok(!headerMap['Content-Security-Policy'].includes("script-src 'self' 'unsafe-inline'"));

  // Check all files in src/ for inline on*= handlers
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.js')) {
        const content = fs.readFileSync(full, 'utf8');
        assert.ok(!/\son(click|error|load|focus|mouseover)=["']/i.test(content), `Inline event handler found in ${full}`);
      }
    }
  }
  walk(path.join(rootDir, 'src'));
});

test('Full page & component rendering regression + XSS payload neutralization checks', async () => {
  const xss = '<img src=x onerror=alert(1)>';

  // Render pages (zero exceptions, zero inline onerror/onclick, uses data-fallback-src)
  const nav = renderNavbar('/');
  const footer = renderFooter();
  const home = await renderHomePage();
  const recipesHtml = await renderRecipesPage({ search: '" autofocus onfocus="alert(1)' });
  const spicesHtml = await renderSpicesPage();
  const restHtml = await renderLegendaryRestaurantsPage();
  const recHtml = await renderRecommendationsPage();
  const aiHtml = await renderAiFoodCreatorPage();

  for (const [name, html] of [
    ['navbar', nav],
    ['footer', footer],
    ['home', home],
    ['recipes', recipesHtml],
    ['spices', spicesHtml],
    ['restaurants', restHtml],
    ['recommendations', recHtml],
    ['ai-food-creator', aiHtml],
  ]) {
    assert.ok(typeof html === 'string' && html.length > 100, `${name} rendered empty output`);
    assert.ok(!/\son(click|error|focus)=["']/i.test(html), `${name} contains unsafe inline event handler`);
    assert.ok(!/<script/i.test(html), `${name} contains inline <script>`);
  }

  assert.ok(home.includes('data-fallback-src='));
  assert.ok(!recipesHtml.includes('onfocus="alert(1)"'));
  assert.ok(recipesHtml.includes('&quot; autofocus onfocus=&quot;alert(1)'));
  assert.ok(aiHtml.includes('maxlength="60"'));
  assert.ok(aiHtml.includes('maxlength="250"'));

  // Malicious card/modal objects neutralized cleanly
  const maliciousRecipeCard = renderRecipeCard({
    slug: 'test"><script>1</script>',
    name: xss,
    regionName: xss,
    intro: xss,
    image: 'javascript:alert(1)',
    flavorProfiles: ['manis'],
  });
  assert.ok(!maliciousRecipeCard.includes('<img src=x onerror=alert(1)>'));
  assert.ok(!maliciousRecipeCard.includes('javascript:alert(1)'));

  const maliciousRestCard = renderRestaurantCard({
    name: xss,
    description: xss,
    city: xss,
    image: 'data:text/html,<script>1</script>',
    googleMapsUrl: 'javascript:alert(1)',
  });
  assert.ok(!maliciousRestCard.includes('<img src=x onerror=alert(1)>'));
  assert.ok(!maliciousRestCard.includes('javascript:alert(1)'));

  const maliciousModal = renderRecipeModal({
    name: xss,
    regionName: xss,
    intro: xss,
    image: 'javascript:alert(1)',
    ingredientGroups: [],
    steps: [],
  });
  assert.ok(!maliciousModal.includes('javascript:alert(1)'));
  assert.ok(!maliciousModal.includes('<img src=x onerror=alert(1)>'));
  assert.ok(maliciousModal.includes('&lt;img src=x onerror=alert(1)&gt;'));
});

test('Dynamic Model Discovery: filters incompatible modalities & prioritizes lowest-cost lightweight models', () => {
  const rawModels = [
    { name: 'models/gemini-embedding-001', displayName: 'Gemini Embedding 001', supportedGenerationMethods: ['embedContent'], outputTokenLimit: 1 },
    { name: 'models/gemini-9-flash-preview-tts', displayName: 'Gemini TTS', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 16384 },
    { name: 'models/gemini-9-flash-image', displayName: 'Nano Banana', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 32768 },
    { name: 'models/gemini-9-flash-native-audio', displayName: 'Gemini Live Audio', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 32768 },
    { name: 'models/gemini-robotics-er-9', displayName: 'Gemini Robotics', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    { name: 'models/gemini-9-computer-use', displayName: 'Computer Use', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    { name: 'models/deep-research-preview', displayName: 'Deep Research', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    { name: 'models/gemma-4-31b-it', displayName: 'Gemma 4', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 32768 },
    { name: 'models/lyria-3.5', displayName: 'Lyria Music', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    { name: 'models/gemini-9-tiny', displayName: 'Tiny Model', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 256 },
    { name: 'models/../evil-path', displayName: 'Path Traversal', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    // Valid compatible text models using synthetic future versions (zero hardcoded names)
    { name: 'models/gemini-9-pro', displayName: 'Gemini 9 Pro', description: 'Supports text and image input', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536, thinking: true },
    { name: 'models/gemini-9-flash', displayName: 'Gemini 9 Flash', description: 'Multimodal image/audio understanding', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536, thinking: true },
    { name: 'models/gemini-9-flash-lite', displayName: 'Gemini 9 Flash-Lite', description: 'Lightweight text generation', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
    { name: 'models/gemini-flash-lite-latest', displayName: 'Gemini Flash-Lite Latest', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
  ];

  // Ensure incompatible items are rejected even individually
  assert.equal(isCompatibleTextRecipeModel(rawModels[0]), null);
  assert.equal(isCompatibleTextRecipeModel(rawModels[1]), null);
  assert.equal(isCompatibleTextRecipeModel(rawModels[2]), null);
  assert.equal(isCompatibleTextRecipeModel(rawModels[7]), null);
  assert.equal(isCompatibleTextRecipeModel(rawModels[10]), null);

  const ranked = rankCompatibleModels(rawModels);
  assert.deepEqual(
    ranked.map((m) => m.id),
    ['gemini-9-flash-lite', 'gemini-flash-lite-latest', 'gemini-9-flash', 'gemini-9-pro'],
  );
});

test('Dynamic Model Discovery: caches paginated ListModels, fails over fast on 404/503, retries sole 503 candidate, and diversifies tiers', async () => {
  let currentTime = 1_000_000;
  let listModelsCalls = 0;
  const generateCalls = [];

  const deps = makeDeps({
    nowFn: () => currentTime,
    fetchFn: async (url) => {
      const target = String(url);
      if (target.includes('/v1beta/models?')) {
        listModelsCalls++;
        if (!target.includes('pageToken=')) {
          return new Response(
            makeListModelsJson(
              [
                { name: 'models/gemini-9-flash-lite', displayName: 'Dead Lite', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
                { name: 'models/gemini-flash-lite-latest', displayName: 'Overloaded Lite', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
              ],
              'page-2-token',
            ),
            { status: 200, headers: { 'Content-Type': 'application/json' } },
          );
        }
        return new Response(
          makeListModelsJson([
            { name: 'models/gemini-9-flash', displayName: 'Healthy Flash', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
          ]),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      }

      const modelMatch = target.match(/\/models\/([^:]+):generateContent/);
      const modelId = modelMatch ? modelMatch[1] : 'unknown';
      generateCalls.push(modelId);

      if (modelId === 'gemini-9-flash-lite') {
        return new Response('Model no longer available', { status: 404 });
      }
      if (modelId === 'gemini-flash-lite-latest') {
        return new Response('Overloaded', { status: 503 });
      }
      if (modelId === 'gemini-9-flash') {
        return new Response(makeValidRecipePayload('Garang Asem Kudus'), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response('Unexpected model', { status: 500 });
    },
  });

  const payload = JSON.stringify({ action: 'generate', inputs: VALID_INPUTS });

  // Request 1: fetches 2 pages of ListModels, skips 404 on model 1, fails over immediately on 503 model 2 -> model 3 succeeds
  const res1 = await handleRequest(makePostRequest(payload, { 'cf-connecting-ip': '203.0.113.10' }), deps);
  assert.equal(res1.status, 200);
  const body1 = await res1.json();
  assert.equal(body1.success, true);
  assert.equal(body1.recipe.title, 'Garang Asem Kudus');
  assert.equal(listModelsCalls, 2); // 2 paginated requests once
  assert.deepEqual(generateCalls, [
    'gemini-9-flash-lite',
    'gemini-flash-lite-latest',
    'gemini-9-flash',
  ]);

  // Request 2 shortly after: uses cached ListModels (0 new calls) AND skips 404 + 503 blocked models directly!
  currentTime += 5_000;
  generateCalls.length = 0;
  const res2 = await handleRequest(makePostRequest(payload, { 'cf-connecting-ip': '203.0.113.10' }), deps);
  assert.equal(res2.status, 200);
  assert.equal(listModelsCalls, 2);
  assert.deepEqual(generateCalls, ['gemini-9-flash']);

  // Single-candidate scenario: when only 1 model exists and returns 503 once, retries once and succeeds
  let soleAttempt = 0;
  const soleDeps = makeDeps({
    fetchFn: async (url) => {
      if (String(url).includes('/v1beta/models?')) {
        return new Response(
          makeListModelsJson([
            { name: 'models/gemini-sole-flash', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
          ]),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      }
      soleAttempt++;
      if (soleAttempt === 1) {
        return new Response('Temporary overload', { status: 503 });
      }
      return new Response(makeValidRecipePayload('Soto Kudus Asli'), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    },
  });
  const soleRes = await handleRequest(makePostRequest(payload, { 'cf-connecting-ip': '203.0.113.12' }), soleDeps);
  assert.equal(soleRes.status, 200);
  assert.equal(soleAttempt, 2);

  // Tier-diversity check: many lite models must not starve flash and pro fallback slots
  const manyModels = rankCompatibleModels([
    { name: 'models/gemini-9.1-flash-lite', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    { name: 'models/gemini-9.2-flash-lite', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    { name: 'models/gemini-9.3-flash-lite', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    { name: 'models/gemini-9.4-flash-lite', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    { name: 'models/gemini-9.5-flash-lite', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    { name: 'models/gemini-9.6-flash-lite', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    { name: 'models/gemini-9.1-flash', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    { name: 'models/gemini-9.2-flash', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    { name: 'models/gemini-9.3-flash', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    { name: 'models/gemini-9.4-flash', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    { name: 'models/gemini-9.5-flash', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    { name: 'models/gemini-9.1-pro', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    { name: 'models/gemini-9.2-pro', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
  ]);
  const selected = selectCandidateModels(manyModels, createModelDiscoveryState(), 1000);
  assert.equal(selected.length, 10);
  assert.equal(selected.slice(0, 4).every((m) => m.id.includes('flash-lite')), true);
  assert.equal(selected.slice(4, 8).every((m) => !m.id.includes('lite') && m.id.includes('flash')), true);
  assert.equal(selected.slice(8, 10).every((m) => m.id.includes('pro')), true);

  // Request 3 where active remaining models return 503 -> returns 503 instead of 502
  const overloadDeps = makeDeps({
    fetchFn: async (url) => {
      const target = String(url);
      if (target.includes('/v1beta/models?')) {
        return new Response(
          makeListModelsJson([
            { name: 'models/gemini-dead-lite', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
            { name: 'models/gemini-active-flash', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
          ]),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      }
      if (target.includes('gemini-dead-lite')) {
        return new Response('Not found', { status: 404 });
      }
      return new Response('Service Unavailable', { status: 503 });
    },
  });
  const res3 = await handleRequest(makePostRequest(payload, { 'cf-connecting-ip': '203.0.113.11' }), overloadDeps);
  assert.equal(res3.status, 503);
  assert.equal(res3.headers.get('retry-after'), '15');
});

test('Frontend service maps HTTP 503 to BACKEND_REQUEST_FAILED consistently with standard error alerts', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ success: false, error: 'AI service is temporarily unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });

  try {
    await assert.rejects(
      () =>
        aiFoodCreatorService.generateRecipe({
          creatorName: 'Evan',
          selectedIngredientIds: VALID_INPUTS.selectedIngredientIds,
          cookingMethod: 'ungkep',
          dishCategory: 'lauk',
          tasteProfile: 'manis-gurih',
          spiceLevel: 1,
          cookingDuration: 'standard',
          servings: 4,
          equipment: ['wajan', 'cobek'],
          dietary: [],
          customNotes: '',
          outputLanguage: 'id',
        }),
      (err) => err && err.message === 'BACKEND_REQUEST_FAILED',
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
