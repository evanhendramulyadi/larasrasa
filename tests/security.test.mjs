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
  VALID_INGREDIENTS,
  MAX_INGREDIENTS,
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
import {
  renderAiFoodCreatorPage,
  initAiFoodCreatorInteractions,
  resetAiFoodCreatorState,
  isAiFoodCreatorVerifying,
} from '../src/pages/ai-food-creator.js';
import { resolveNearestRoute, ROUTE_DEFINITIONS } from '../src/utils/routes.js';
import { aiFoodCreatorService, getLocalizedRecipeSteps, ALL_INGREDIENTS } from '../src/services/aiFoodCreatorService.js';
import { i18n } from '../src/i18n/index.js';
import { resetLegendaryRestaurantsState } from '../src/pages/legendary-restaurants.js';

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

  assert.ok(!nav.includes('Pilih Menu'));
  assert.ok(!nav.includes('Find Menu'));
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
  assert.equal(selected.slice(4, 9).every((m) => !m.id.includes('lite') && m.id.includes('flash')), true);
  assert.equal(selected.slice(9, 10).every((m) => m.id.includes('pro')), true);

  // Verify -latest alias outranks preview within the same tier
  const aliasVsPreview = rankCompatibleModels([
    { name: 'models/gemini-3.1-flash-lite-preview', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
    { name: 'models/gemini-flash-lite-latest', supportedGenerationMethods: ['generateContent'], outputTokenLimit: 65536 },
  ]);
  assert.deepEqual(aliasVsPreview.map((m) => m.id), ['gemini-flash-lite-latest', 'gemini-3.1-flash-lite-preview']);

  // Request 3 where active remaining models return 503, invalid_json, or TimeoutError -> returns 503 instead of 502
  const overloadDeps = makeDeps({
    fetchFn: async (url) => {
      const target = String(url);
      if (target.includes('/v1beta/models?')) {
        return new Response(
          makeListModelsJson([
            { name: 'models/gemini-dead-lite', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
            { name: 'models/gemini-active-flash', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
            { name: 'models/gemini-truncated-flash', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
            { name: 'models/gemini-slow-flash', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
          ]),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      }
      if (target.includes('gemini-dead-lite')) {
        return new Response('Not found', { status: 404 });
      }
      if (target.includes('gemini-truncated-flash')) {
        return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: '{"title":"Truncated' }] } }] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (target.includes('gemini-slow-flash')) {
        const err = new Error('The operation timed out');
        err.name = 'TimeoutError';
        throw err;
      }
      return new Response('Service Unavailable', { status: 503 });
    },
  });
  const res3 = await handleRequest(makePostRequest(payload, { 'cf-connecting-ip': '203.0.113.11' }), overloadDeps);
  assert.equal(res3.status, 503);
  assert.equal(res3.headers.get('retry-after'), '15');

  // Prose-wrapped JSON without code fences parses cleanly & generationConfig uses maxOutputTokens >= 8192
  let capturedGenConfig = null;
  const proseDeps = makeDeps({
    fetchFn: async (url, init) => {
      const target = String(url);
      if (target.includes('/v1beta/models?')) {
        return new Response(
          makeListModelsJson([
            { name: 'models/gemini-prose-flash', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
          ]),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      }
      capturedGenConfig = JSON.parse(String(init.body)).generationConfig;
      return new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [
                  {
                    text:
                      'Berikut resepnya:\n' +
                      JSON.stringify({
                        title: 'Garang Asem Bumbung',
                        ingredients: [{ nameId: 'Ayam Kampung', amount: 500, unitId: 'g' }],
                        stepsId: [{ stepNumber: 1, titleId: 'Siapkan', instructionId: 'Masak hingga empuk.' }],
                      }) +
                      '\nSelamat memasak!',
                  },
                ],
              },
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    },
  });
  const proseRes = await handleRequest(makePostRequest(payload, { 'cf-connecting-ip': '203.0.113.13' }), proseDeps);
  assert.equal(proseRes.status, 200);
  const proseData = await proseRes.json();
  assert.equal(proseData.recipe.title, 'Garang Asem Bumbung');
  assert.ok(capturedGenConfig && capturedGenConfig.maxOutputTokens >= 8192);
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

test('Homepage translates Flavor Map city cards in EN and dead placeholder/listeners are removed', async () => {
  const prevLang = i18n.getLanguage();
  try {
    i18n.setLanguage('id');
    const homeId = await renderHomePage();
    assert.ok(homeId.includes('Kota Semarang'));
    assert.ok(homeId.includes('Kota Surakarta (Solo)'));
    assert.ok(homeId.includes('Kab. Kudus'));

    i18n.setLanguage('en');
    const homeEn = await renderHomePage();
    assert.ok(homeEn.includes('Semarang City'));
    assert.ok(homeEn.includes('Surakarta (Solo) City'));
    assert.ok(homeEn.includes('Kudus Regency'));
  } finally {
    i18n.setLanguage(prevLang);
  }

  assert.equal(aiFoodCreatorService.composePosterCanvas, undefined);
  assert.equal(aiFoodCreatorService.downloadPoster, undefined);
  assert.equal(aiFoodCreatorService.downloadRecipeJson, undefined);

  const routerSrc = fs.readFileSync(path.join(rootDir, 'src/router.js'), 'utf8');
  assert.ok(!routerSrc.includes('recipe-detail.js'));
  const flavorMapSrc = fs.readFileSync(path.join(rootDir, 'src/pages/flavor-map.js'), 'utf8');
  assert.ok(flavorMapSrc.includes('export function resetFlavorMapState()'));
  assert.ok(routerSrc.includes('resetLegendaryRestaurantsState()'));
  assert.ok(routerSrc.includes('resetFlavorMapState()'));
  assert.equal(typeof resetLegendaryRestaurantsState, 'function');

  const aiCreatorSrc = fs.readFileSync(path.join(rootDir, 'src/pages/ai-food-creator.js'), 'utf8');
  assert.ok(aiCreatorSrc.includes('id="ingredient-grid-container"'));
  assert.ok(!aiCreatorSrc.includes('[data-tab]'));
  assert.ok(!aiCreatorSrc.includes('creator-nickname-input'));
  assert.ok(aiCreatorSrc.includes("scrollToTop('smooth')"));

  const recommendationsSrc = fs.readFileSync(path.join(rootDir, 'src/pages/recommendations.js'), 'utf8');
  assert.ok(recommendationsSrc.includes("scrollToTop('smooth')"));

  const restHtmlCheck = await renderLegendaryRestaurantsPage();
  const spicesHtmlCheck = await renderSpicesPage();
  assert.ok(!restHtmlCheck.includes('loading="lazy"'));
  assert.ok(!spicesHtmlCheck.includes('loading="lazy"'));
});

test('Route prefix resolution allows trailing typos on all pages and redirects leading typos to home', () => {
  assert.equal(resolveNearestRoute('/', false), '/');
  assert.equal(resolveNearestRoute('', false), '/');

  for (const def of ROUTE_DEFINITIONS) {
    for (const pagePath of [def.idPath, def.enPath]) {
      if (!pagePath || pagePath === '/') continue;

      assert.equal(resolveNearestRoute(pagePath, false), pagePath);
      assert.equal(resolveNearestRoute(`${pagePath}hh`, false), pagePath);
      assert.equal(resolveNearestRoute(`${pagePath}hhkfojejowjojof`, false), pagePath);
      assert.equal(resolveNearestRoute(`${pagePath.toUpperCase()}xyz/`, false), pagePath);
      assert.equal(resolveNearestRoute(`${pagePath}<script>alert(1)</script>`, false), pagePath);
      assert.equal(resolveNearestRoute(`/dddd${pagePath.slice(1)}hh`, false), '/');
    }
  }

  assert.equal(resolveNearestRoute('/resep/soto-kudus', false), '/resep/soto-kudus');
  assert.equal(resolveNearestRoute('/resep/soto-kudus', true), '/recipes/soto-kudus');
  assert.equal(resolveNearestRoute('/resep/<script>alert(1)</script>', false), '/resep');
});

test('AI Food Creator result page Back to Studio buttons match Download/Copy hover lift effects', () => {
  const aiCreatorSrc = fs.readFileSync(path.join(rootDir, 'src/pages/ai-food-creator.js'), 'utf8');

  const topBtnMatch = aiCreatorSrc.match(/id="create-another-recipe-btn"[\s\S]*?class="([^"]+)"/);
  assert.ok(topBtnMatch, 'Top Back to Studio button must exist');
  assert.ok(topBtnMatch[1].includes('hover:-translate-y-0.5'));
  assert.ok(topBtnMatch[1].includes('hover:shadow-md'));

  const bottomBtnMatch = aiCreatorSrc.match(/id="bottom-create-another-btn"[\s\S]*?class="([^"]+)"/);
  assert.ok(bottomBtnMatch, 'Bottom Back to Studio button must exist');
  assert.ok(bottomBtnMatch[1].includes('hover:-translate-y-0.5'));
  assert.ok(bottomBtnMatch[1].includes('hover:shadow-lg'));
});

test('AI Food Creator enforces 5-10 ingredients and prompt guarantees selected ingredients, cooking method, taste harmony, and spice level', async () => {
  const allBackendIds = Object.keys(VALID_INGREDIENTS);
  const allFrontendIds = ALL_INGREDIENTS.map((item) => item.id);
  const tenIngredients = [
    'ayam-kampung',
    'udang-jerbung',
    'tempe-kedelai',
    'bawang-merah',
    'bawang-putih',
    'ketumbar',
    'daun-bawang',
    'belimbing-wuluh',
    'kacang-tanah',
    'tauco-kedelai',
  ];

  // 1. Frontend catalog has zero duplicate IDs and matches backend allowlist 1-to-1
  assert.equal(new Set(allFrontendIds).size, allFrontendIds.length);
  assert.deepEqual([...allFrontendIds].sort(), [...allBackendIds].sort());
  assert.equal(MAX_INGREDIENTS, 10);

  // 2. Backend validator accepts 10 ingredients and rejects 11 ingredients
  const tenValidation = validateGenerateRequest({
    action: 'generate',
    inputs: {
      ...VALID_INPUTS,
      selectedIngredientIds: tenIngredients,
      cookingMethod: 'goreng',
      tasteProfile: 'asam-segar',
      spiceLevel: 0,
      dietary: ['tanpa-santan'],
    },
  });
  assert.equal(tenValidation.ok, true);
  assert.equal(tenValidation.data.selectedIngredientIds.length, 10);

  const elevenValidation = validateGenerateRequest({
    action: 'generate',
    inputs: {
      ...VALID_INPUTS,
      selectedIngredientIds: [...tenIngredients, 'kemiri'],
    },
  });
  assert.equal(elevenValidation.ok, false);

  // 3. Prompt enforces all 10 ingredients, optional supporting adjustments, cooking method, taste harmony, and spice level
  const gorengPrompt = buildServerRecipePrompt(tenValidation.data);
  assert.ok(gorengPrompt.includes('10 bahan'));
  tenIngredients.forEach((id, idx) => {
    assert.ok(
      gorengPrompt.includes(`${idx + 1}. ${VALID_INGREDIENTS[id]}`),
      `Missing numbered ingredient ${VALID_INGREDIENTS[id]}`,
    );
  });
  assert.ok(gorengPrompt.includes('10 DARI 10 BAHAN HARUS ADA & DIPAKAI'));
  assert.ok(gorengPrompt.includes('BAHAN TAMBAHAN / PENYESUAIAN DIPERBOLEHKAN'));
  assert.ok(gorengPrompt.includes("sekadar 'Tempe Mendoan' biasa"));
  assert.ok(gorengPrompt.includes('DILARANG KERAS menyertakan kata "LarasRasa"'));
  assert.ok(gorengPrompt.includes('unsur nama orang'));
  assert.ok(gorengPrompt.includes('ASAM SEGAR'));
  assert.ok(gorengPrompt.includes('WAJIB TIDAK PEDAS (Level 0 - Ramah Anak)'));
  assert.ok(gorengPrompt.includes('Tanpa Santan'));

  for (const [method, expectedFragment] of [
    ['tumis', 'TUMIS CEPAT BERAROMA'],
    ['ungkep', 'UNGKEP & REBUS KUAH KALDU'],
    ['kukus', 'KUKUS BUNGKUS DAUN PISANG'],
    ['bakar', 'PANGGANG / BAKAR ARANG BATOK'],
  ]) {
    const methodPrompt = buildServerRecipePrompt({ ...VALID_INPUTS, cookingMethod: method });
    assert.ok(methodPrompt.includes(expectedFragment), `Prompt for ${method} must include directive`);
  }

  for (const [taste, expectedFragment] of [
    ['manis-gurih', 'MANIS GURIH HARMONIS'],
    ['gurih-segar', 'GURIH SEGAR BERKALDU'],
    ['pedas-gurih', 'PEDAS GURIH MANTAP'],
    ['asam-segar', 'ASAM SEGAR'],
    ['pekat-rempah', 'PEKAT KAYA REMPAH TRADISI'],
  ]) {
    const tastePrompt = buildServerRecipePrompt({ ...VALID_INPUTS, tasteProfile: taste });
    assert.ok(tastePrompt.includes(expectedFragment), `Prompt for ${taste} must include directive`);
  }

  for (const [level, expectedFragment] of [
    [0, 'WAJIB TIDAK PEDAS (Level 0'],
    [1, 'WAJIB HANGAT LEMBUT (Level 1)'],
    [2, 'WAJIB PEDAS MANTAP (Level 2)'],
    [3, 'WAJIB PEDAS NENDANG MERCON (Level 3)'],
  ]) {
    const spicePrompt = buildServerRecipePrompt({ ...VALID_INPUTS, spiceLevel: level });
    assert.ok(spicePrompt.includes(expectedFragment), `Prompt for spice level ${level} must include directive`);
  }

  // 4. UI clearly displays Min. 5, Maks. 10 bounds
  const aiCreatorHtmlId = await renderAiFoodCreatorPage();
  assert.ok(aiCreatorHtmlId.includes('Maks. 10'));
  assert.ok(aiCreatorHtmlId.includes('/10'));

  // 5. Frontend service treats tampered <5 or >10 ingredients as BACKEND_REQUEST_FAILED and preserves spiceLevel 0
  await assert.rejects(
    () =>
      aiFoodCreatorService.generateRecipe({
        creatorName: 'Evan',
        selectedIngredientIds: tenIngredients.slice(0, 4),
      }),
    (err) => err && err.message === 'BACKEND_REQUEST_FAILED',
  );
  await assert.rejects(
    () =>
      aiFoodCreatorService.generateRecipe({
        creatorName: 'Evan',
        selectedIngredientIds: [...tenIngredients, 'kemiri'],
      }),
    (err) => err && err.message === 'BACKEND_REQUEST_FAILED',
  );

  const originalFetch = globalThis.fetch;
  let forwardedPayload = null;
  globalThis.fetch = async (_url, init) => {
    forwardedPayload = JSON.parse(String(init.body));
    return new Response(
      JSON.stringify({
        success: true,
        recipe: {
          title: 'Gimbal Krispi Rampai Nusantara',
          ingredients: tenIngredients.map((id) => ({
            nameId: VALID_INGREDIENTS[id],
            amount: 50,
            unitId: 'g',
          })),
          stepsId: [{ stepNumber: 1, titleId: 'Racik', instructionId: 'Olahan krispi.' }],
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  };

  try {
    const recipe = await aiFoodCreatorService.generateRecipe({
      creatorName: 'Evan',
      selectedIngredientIds: [...tenIngredients, tenIngredients[0]],
      cookingMethod: 'goreng',
      dishCategory: 'lauk',
      tasteProfile: 'asam-segar',
      spiceLevel: 0,
      cookingDuration: 'standard',
      servings: 4,
      equipment: ['wajan', 'cobek'],
      dietary: [],
      customNotes: '',
      outputLanguage: 'id',
    });
    assert.equal(forwardedPayload.inputs.selectedIngredientIds.length, 10);
    assert.equal(recipe.ingredients.length, 10);
    assert.equal(recipe.spiceLevel, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('Edge Function adapts maxOutputTokens cleanly to model outputTokenLimit (16384 vs 8192)', async () => {
  const seenMaxTokens = [];
  const deps = makeDeps({
    fetchFn: async (url, init) => {
      const target = String(url);
      if (target.includes('/v1beta/models?')) {
        return new Response(
          makeListModelsJson([
            { name: 'models/gemini-8k-flash-lite', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 8192 },
            { name: 'models/gemini-64k-flash', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
          ]),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      }
      seenMaxTokens.push(JSON.parse(String(init.body)).generationConfig.maxOutputTokens);
      if (target.includes('gemini-8k-flash-lite')) {
        return new Response('Overloaded', { status: 503 });
      }
      return new Response(makeValidRecipePayload('Tumis Rampai Komplit'), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    },
  });

  const res = await handleRequest(
    makePostRequest(JSON.stringify({ action: 'generate', inputs: VALID_INPUTS }), {
      'cf-connecting-ip': '203.0.113.88',
    }),
    deps,
  );
  assert.equal(res.status, 200);
  assert.deepEqual(seenMaxTokens, [8192, 16384]);
});

test('Dish title strips accidental LarasRasa brand leakage on both backend and frontend while keeping person/note nuances', async () => {
  const deps = makeDeps({
    fetchFn: async (url) => {
      const target = String(url);
      if (target.includes('/v1beta/models?')) {
        return new Response(
          makeListModelsJson([
            { name: 'models/gemini-brand-flash', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
          ]),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      }
      return new Response(makeValidRecipePayload('Gimbal Rampai Nusantara LarasRasa'), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    },
  });

  const res = await handleRequest(
    makePostRequest(JSON.stringify({ action: 'generate', inputs: VALID_INPUTS }), {
      'cf-connecting-ip': '203.0.113.99',
    }),
    deps,
  );
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.recipe.title, 'Gimbal Rampai Nusantara');

  const normalized = aiFoodCreatorService._normalizeRecipeObject(
    {
      title: 'Gimbal Rampai Ala Evan LarasRasa',
      ingredients: [{ nameId: 'Ayam Kampung', amount: 250, unitId: 'g' }],
      stepsId: [{ stepNumber: 1, titleId: 'Masak', instructionId: 'Goreng renyah.' }],
    },
    VALID_INPUTS,
    'Evan Hendra Mulyadi',
  );
  assert.equal(normalized.title, 'Gimbal Rampai Ala Evan');
});

test('Global credit exhaustion (upstream 429/402) maps to CREDIT_EXHAUSTED while persistent cooldown survives refresh/route reset', async () => {
  // 1. Upstream Gemini 429 across reachable models -> backend returns 402 CREDIT_EXHAUSTED
  const creditDeps = makeDeps({
    fetchFn: async (url) => {
      const target = String(url);
      if (target.includes('/v1beta/models?')) {
        return new Response(
          makeListModelsJson([
            { name: 'models/gemini-quota-flash', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
          ]),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      }
      return new Response(JSON.stringify({ error: { code: 429, status: 'RESOURCE_EXHAUSTED' } }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    },
  });

  const creditRes = await handleRequest(
    makePostRequest(JSON.stringify({ action: 'generate', inputs: VALID_INPUTS }), {
      'cf-connecting-ip': '203.0.113.120',
    }),
    creditDeps,
  );
  assert.equal(creditRes.status, 402);
  const creditBody = await creditRes.json();
  assert.equal(creditBody.code, 'CREDIT_EXHAUSTED');

  // 2. Frontend maps upstream CREDIT_EXHAUSTED cleanly to err.code === 'CREDIT_EXHAUSTED'
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify(creditBody), {
      status: creditRes.status,
      headers: { 'Content-Type': 'application/json' },
    });

  try {
    await assert.rejects(
      () => aiFoodCreatorService.generateRecipe({ ...VALID_INPUTS }),
      (err) => err && err.code === 'CREDIT_EXHAUSTED',
    );
  } finally {
    globalThis.fetch = originalFetch;
  }

  // 3. Active cooldown stored at generation start stays hidden on initial render/reload until user tries to generate again
  const originalLocalStorage = globalThis.localStorage;
  const mockStore = new Map([['larasrasa_last_ai_recipe_timestamp', String(Date.now() - 30_000)]]);
  globalThis.localStorage = {
    getItem: (k) => (mockStore.has(k) ? mockStore.get(k) : null),
    setItem: (k, v) => mockStore.set(k, String(v)),
    removeItem: (k) => mockStore.delete(k),
  };

  try {
    resetAiFoodCreatorState();
    const htmlOnReload = await renderAiFoodCreatorPage();
    assert.ok(!htmlOnReload.includes('ai-creator-session-alert'));
    assert.ok(!htmlOnReload.includes('Batas Waktu Peracikan Resep'));
  } finally {
    if (originalLocalStorage === undefined) {
      delete globalThis.localStorage;
    } else {
      globalThis.localStorage = originalLocalStorage;
    }
  }
});

test('Edge Function & frontend reject missing/undefined recipe steps, trigger model fallback, and normalize alternate formats safely', async () => {
  const triedModels = [];
  const deps = makeDeps({
    fetchFn: async (url) => {
      const target = String(url);
      if (target.includes('/v1beta/models?')) {
        return new Response(
          makeListModelsJson([
            { name: 'models/gemini-flaky-lite', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
            { name: 'models/gemini-solid-flash', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
          ]),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      }

      const match = target.match(/\/models\/([^:]+):generateContent/);
      const modelId = match ? match[1] : 'unknown';
      triedModels.push(modelId);

      // First model returns title + ingredients but broken/undefined steps -> must fall back
      if (modelId === 'gemini-flaky-lite') {
        return new Response(
          JSON.stringify({
            candidates: [
              {
                content: {
                  parts: [
                    {
                      text: JSON.stringify({
                        title: 'Ungkep Ayam Flaky',
                        ingredients: [{ nameId: 'Ayam Kampung', amount: 500, unitId: 'g' }],
                        stepsId: [{ stepNumber: 1, titleId: 'undefined', instructionId: 'undefined' }],
                      }),
                    },
                  ],
                },
              },
            ],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      }

      // Second model uses alternate key (`steps` + `descriptionId`) and poisoned `stepsEn`
      return new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [
                  {
                    text: JSON.stringify({
                      title: 'Ungkep Ayam Kemiri Mantap',
                      ingredients: [{ nameId: 'Ayam Kampung', amount: 500, unitId: 'g' }],
                      steps: [
                        { stepNumber: 1, titleId: 'Tumis Bumbu', descriptionId: 'Haluskan lalu tumis hingga harum.' },
                        { stepNumber: 2, titleId: 'undefined', instructionId: 'undefined' },
                        'Ungkep ayam dengan api kecil hingga bumbu meresap.',
                      ],
                      stepsEn: [{ stepNumber: 1, titleEn: 'Prep', instructionEn: 'undefined' }],
                    }),
                  },
                ],
              },
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    },
  });

  const res = await handleRequest(
    makePostRequest(JSON.stringify({ action: 'generate', inputs: VALID_INPUTS }), {
      'cf-connecting-ip': '203.0.113.150',
    }),
    deps,
  );
  assert.equal(res.status, 200);
  assert.deepEqual(triedModels, ['gemini-flaky-lite', 'gemini-solid-flash']);

  const body = await res.json();
  assert.equal(body.recipe.stepsId.length, 2);
  assert.equal(body.recipe.stepsId[0].stepNumber, 1);
  assert.equal(body.recipe.stepsId[0].titleId, 'Tumis Bumbu');
  assert.equal(body.recipe.stepsId[0].instructionId, 'Haluskan lalu tumis hingga harum.');
  assert.equal(body.recipe.stepsId[1].stepNumber, 2);
  assert.equal(body.recipe.stepsId[1].titleId, 'Tahap 2');
  assert.equal(body.recipe.stepsId[1].instructionId, 'Ungkep ayam dengan api kecil hingga bumbu meresap.');
  assert.equal(body.recipe.stepsEn, undefined);

  // Frontend normalization & English fallback never emit "undefined"
  const normalized = aiFoodCreatorService._normalizeRecipeObject(body.recipe, VALID_INPUTS, 'Evan');
  const idSteps = getLocalizedRecipeSteps(normalized, false);
  const enSteps = getLocalizedRecipeSteps(normalized, true);
  assert.equal(idSteps.length, 2);
  assert.equal(enSteps.length, 2);
  assert.equal(enSteps[0].title, 'Tumis Bumbu');
  assert.equal(enSteps[0].instruction, 'Haluskan lalu tumis hingga harum.');
  assert.ok(!JSON.stringify({ idSteps, enSteps }).includes('undefined'));

  // Frontend rejects backend payload if all steps are missing/undefined
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        success: true,
        recipe: {
          title: 'Resep Tanpa Step',
          ingredients: [{ nameId: 'Ayam Kampung', amount: 500, unitId: 'g' }],
          stepsId: [{ stepNumber: 1, titleId: 'undefined', instructionId: 'undefined' }],
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  try {
    await assert.rejects(
      () => aiFoodCreatorService.generateRecipe({ ...VALID_INPUTS }),
      (err) => err && err.message === 'BACKEND_INVALID_RECIPE_FORMAT',
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('Edge Function & frontend preserve embedded bilingual steps, retry untranslated EN steps, and support snake_case steps_en', async () => {
  const attempted = [];
  const deps = makeDeps({
    fetchFn: async (url) => {
      const target = String(url);
      if (target.includes('/v1beta/models?')) {
        return new Response(
          makeListModelsJson([
            { name: 'models/gemini-id-copy-lite', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
            { name: 'models/gemini-bilingual-flash', supportedGenerationMethods: ['generateContent'], inputTokenLimit: 1048576, outputTokenLimit: 65536 },
          ]),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      }

      const match = target.match(/\/models\/([^:]+):generateContent/);
      const modelId = match ? match[1] : 'unknown';
      attempted.push(modelId);

      // First model copies Indonesian verbatim into stepsEn -> backend must reject EN translation & try next model
      if (modelId === 'gemini-id-copy-lite') {
        return new Response(
          JSON.stringify({
            candidates: [
              {
                content: {
                  parts: [
                    {
                      text: JSON.stringify({
                        title: 'Tumis Ayam Kemiri',
                        ingredients: [{ nameId: 'Ayam Kampung', nameEn: 'Free-Range Chicken', amount: 500, unitId: 'g', unitEn: 'g' }],
                        stepsId: [
                          { stepNumber: 1, titleId: 'Siapkan Bumbu', instructionId: 'Haluskan bawang merah dan kemiri lalu tumis hingga harum.' },
                        ],
                        stepsEn: [
                          { stepNumber: 1, titleEn: 'Siapkan Bumbu', instructionEn: 'Haluskan bawang merah dan kemiri lalu tumis hingga harum.' },
                        ],
                      }),
                    },
                  ],
                },
              },
            ],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        );
      }

      // Second model embeds titleEn/instructionEn inside `steps` without separate `stepsEn`
      return new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [
                  {
                    text: JSON.stringify({
                      title: 'Tumis Ayam Kemiri',
                      ingredients: [{ nameId: 'Ayam Kampung', nameEn: 'Free-Range Chicken', amount: 500, unitId: 'g', unitEn: 'g' }],
                      steps: [
                        {
                          stepNumber: 1,
                          titleId: 'Persiapan Bumbu',
                          titleEn: 'Spice Paste Prep',
                          instructionId: 'Haluskan bawang merah dan kemiri lalu tumis hingga harum.',
                          instructionEn: 'Grind the shallots and candlenuts, then saute until fragrant.',
                        },
                      ],
                    }),
                  },
                ],
              },
            },
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    },
  });

  const res = await handleRequest(
    makePostRequest(JSON.stringify({ action: 'generate', inputs: { ...VALID_INPUTS, outputLanguage: 'en' } }), {
      'cf-connecting-ip': '203.0.113.175',
    }),
    deps,
  );
  assert.equal(res.status, 200);
  assert.deepEqual(attempted, ['gemini-id-copy-lite', 'gemini-bilingual-flash']);

  const data = await res.json();
  assert.equal(data.recipe.stepsId[0].titleId, 'Persiapan Bumbu');
  assert.equal(data.recipe.stepsEn[0].titleEn, 'Spice Paste Prep');
  assert.equal(data.recipe.stepsEn[0].instructionEn, 'Grind the shallots and candlenuts, then saute until fragrant.');

  // Also ensure snake_case steps_en works directly in frontend normalization
  const snakeNormalized = aiFoodCreatorService._normalizeRecipeObject(
    {
      title: 'Garang Asem Kudus',
      ingredients: [{ nameId: 'Ayam', nameEn: 'Chicken', amount: 500, unitId: 'g', unitEn: 'g' }],
      steps_id: [{ stepNumber: 1, title_id: 'Kukus Ayam', instruction_id: 'Kukus ayam dalam daun pisang.' }],
      steps_en: [{ stepNumber: 1, title_en: 'Steam Chicken', instruction_en: 'Steam the chicken wrapped in banana leaves.' }],
    },
    { ...VALID_INPUTS, outputLanguage: 'en' },
    'Evan',
  );
  const enSteps = getLocalizedRecipeSteps(snakeNormalized, true);
  assert.equal(enSteps[0].title, 'Steam Chicken');
  assert.equal(enSteps[0].instruction, 'Steam the chicken wrapped in banana leaves.');
});

test('AI Food Creator locks and greys out all form options, name, ingredients, and notes while verifying', async () => {
  const originalDocument = globalThis.document;
  const originalWindow = globalThis.window;
  const originalLocalStorage = globalThis.localStorage;
  const originalFetch = globalThis.fetch;

  const mockStore = new Map();
  globalThis.localStorage = {
    getItem: (k) => (mockStore.has(k) ? mockStore.get(k) : null),
    setItem: (k, v) => mockStore.set(k, String(v)),
    removeItem: (k) => mockStore.delete(k),
  };

  let elements = new Map();
  let removePills = [];
  let ingredientCards = [];
  let cookingRadios = [];
  let spiceRadios = [];

  const makeStub = (extra = {}) => ({
    classList: {
      add() {},
      remove() {},
      contains() { return false; },
    },
    scrollIntoView() {},
    focus() {},
    remove() {},
    ...extra,
  });

  let containerHtml = '';
  const rebuildDomFromHtml = (html) => {
    containerHtml = html;
    elements = new Map();
    const gridStub = makeStub({ scrollTop: 0 });
    gridStub._setHtml = (nextGridHtml) => {
      containerHtml = containerHtml.replace(
        /(<div id="ingredient-grid-container"[^>]*>)[\s\S]*?(<\/div>\s*<\/section>)/,
        `$1${nextGridHtml}$2`,
      );
      rebuildDomFromHtml(containerHtml);
    };
    Object.defineProperty(gridStub, 'innerHTML', {
      get: () => containerHtml,
      set: (val) => gridStub._setHtml(val),
    });

    for (const id of [
      'ai-creator-form',
      'creator-name-input',
      'creator-name-label',
      'creator-name-error',
      'creator-name-help',
      'creator-name-box',
      'ingredient-search-input',
      'clear-ingredient-search-btn',
      'ingredient-chips-box',
      'taste-profile-select',
      'custom-notes-input',
      'generate-recipe-submit-btn',
      'ai-creator-session-alert',
    ]) {
      if (containerHtml.includes(`id="${id}"`)) {
        elements.set(id, makeStub({ id }));
      }
    }
    if (containerHtml.includes('id="ingredient-grid-container"')) {
      elements.set('ingredient-grid-container', gridStub);
    }

    removePills = [...containerHtml.matchAll(/data-remove-ingredient="([^"]+)"/g)].map((m) =>
      makeStub({ getAttribute: (attr) => (attr === 'data-remove-ingredient' ? m[1] : null) }),
    );
    ingredientCards = [...containerHtml.matchAll(/data-ingredient-id="([^"]+)"/g)].map((m) =>
      makeStub({ getAttribute: (attr) => (attr === 'data-ingredient-id' ? m[1] : null) }),
    );
    cookingRadios = [...containerHtml.matchAll(/<input type="radio" name="cookingMethod" value="([^"]+)"/g)].map((m) =>
      makeStub({ value: m[1], checked: true }),
    );
    spiceRadios = [...containerHtml.matchAll(/<input type="radio" name="spiceLevel" value="([^"]+)"/g)].map((m) =>
      makeStub({ value: m[1], checked: true }),
    );
  };

  const pageMainContent = {
    get innerHTML() {
      return containerHtml;
    },
    set innerHTML(val) {
      rebuildDomFromHtml(String(val));
    },
  };

  globalThis.document = {
    documentElement: { lang: 'id', scrollTop: 0 },
    body: { scrollTop: 0 },
    title: '',
    getElementById(id) {
      if (id === 'page-main-content') return pageMainContent;
      return elements.get(id) || null;
    },
    querySelectorAll(selector) {
      if (selector === '[data-remove-ingredient]') return removePills;
      if (selector === '[data-ingredient-id]') return ingredientCards;
      if (selector === 'input[name="cookingMethod"]') return cookingRadios;
      if (selector === 'input[name="spiceLevel"]') return spiceRadios;
      return [];
    },
  };

  globalThis.window = {
    location: { hash: '#/ai-food-creator', search: '' },
    scrollY: 0,
    scrollTo() {},
    dispatchEvent() {},
  };

  let resolveFetch;
  let fetchCalls = 0;
  globalThis.fetch = () => {
    fetchCalls++;
    return new Promise((resolve) => {
      resolveFetch = resolve;
    });
  };

  try {
    i18n.setLanguage('id');
    resetAiFoodCreatorState();
    pageMainContent.innerHTML = await renderAiFoodCreatorPage();
    initAiFoodCreatorInteractions();

    assert.equal(isAiFoodCreatorVerifying(), false);
    assert.ok(!containerHtml.includes('<fieldset id="ai-creator-fields" disabled'));
    assert.match(containerHtml, /<input[\s\S]*?id="creator-name-input"(?![^>]*disabled)/);

    // Fill creator name & custom notes before submitting
    elements.get('creator-name-input').oninput({ target: { value: 'Evan Hendra Mulyadi' } });
    elements.get('custom-notes-input').oninput({ target: { value: 'Kuah areh lembut' } });

    // Submit form -> enters verifying state immediately while fetch is pending
    const submitPromise = elements.get('ai-creator-form').onsubmit({ preventDefault() {} });
    await new Promise((r) => setTimeout(r, 15));

    assert.equal(fetchCalls, 1);
    assert.equal(isAiFoodCreatorVerifying(), true);
    assert.ok(!containerHtml.includes('ai-creator-session-alert'));
    assert.ok(!containerHtml.includes('Batas Waktu Peracikan Resep'));

    // Assert every form control above the CTA button is disabled and greyed out, while the verifying button keeps its normal terracotta color
    assert.ok(containerHtml.includes('<fieldset id="ai-creator-fields" disabled'));
    assert.ok(containerHtml.includes('aria-busy="true"'));
    assert.ok(containerHtml.includes('Memverifikasi...'));
    assert.ok(containerHtml.includes('grayscale opacity-75 cursor-not-allowed'));
    assert.ok(!containerHtml.includes('card-hover-lift'));

    const verifyingBtnMatch = containerHtml.match(/<button[\s\S]*?id="generate-recipe-submit-btn"[\s\S]*?class="([^"]+)"/);
    assert.ok(verifyingBtnMatch);
    assert.ok(verifyingBtnMatch[1].includes('bg-[#C84C24]'));
    assert.ok(verifyingBtnMatch[1].includes('cursor-wait'));
    assert.ok(!verifyingBtnMatch[1].includes('bg-stone-'));

    for (const controlPattern of [
      /<input[\s\S]*?id="creator-name-input"[\s\S]*?disabled/,
      /<input[\s\S]*?id="ingredient-search-input"[\s\S]*?disabled/,
      /<select[\s\S]*?id="taste-profile-select"[\s\S]*?disabled/,
      /<input[\s\S]*?id="custom-notes-input"[\s\S]*?disabled/,
      /<button[\s\S]*?id="generate-recipe-submit-btn"[\s\S]*?disabled/,
      /<button type="button" disabled data-remove-ingredient=/,
      /<button[\s\S]*?data-ingredient-id=[\s\S]*?disabled/,
      /<input type="radio" name="cookingMethod"[^>]*disabled/,
      /<input type="radio" name="spiceLevel"[^>]*disabled/,
    ]) {
      assert.match(containerHtml, controlPattern);
    }

    // Switching language during verification preserves the locked/greyed-out state in EN
    i18n.setLanguage('en');
    const enVerifyingHtml = await renderAiFoodCreatorPage();
    assert.ok(enVerifyingHtml.includes('<fieldset id="ai-creator-fields" disabled'));
    assert.ok(enVerifyingHtml.includes('Verifying...'));
    assert.ok(!enVerifyingHtml.includes('card-hover-lift'));
    i18n.setLanguage('id');

    // Attempted edits or duplicate submit while verifying must be completely ignored
    elements.get('creator-name-input').oninput({ target: { value: 'Nama Diubah' } });
    elements.get('custom-notes-input').oninput({ target: { value: 'Catatan Diubah' } });
    elements.get('ingredient-search-input').oninput({ target: { value: 'cabai' } });
    elements.get('taste-profile-select').onchange({ target: { value: 'asam-segar' } });
    removePills[0].onclick({ stopPropagation() {} });
    ingredientCards[0].onclick();
    cookingRadios[1].onchange();
    spiceRadios[3].onchange();
    await elements.get('ai-creator-form').onsubmit({ preventDefault() {} });
    await new Promise((r) => setTimeout(r, 275));

    assert.equal(fetchCalls, 1);
    assert.ok(containerHtml.includes('value="Evan Hendra Mulyadi"'));
    assert.ok(containerHtml.includes('value="Kuah areh lembut"'));
    assert.ok(!containerHtml.includes('Nama Diubah'));
    assert.ok(!containerHtml.includes('Catatan Diubah'));

    // Reject/fail backend call -> unlocks form and shows backend error alert
    resolveFetch(
      new Response(JSON.stringify({ error: 'Unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    await submitPromise;

    assert.equal(isAiFoodCreatorVerifying(), false);
    assert.ok(!containerHtml.includes('<fieldset id="ai-creator-fields" disabled'));
    assert.ok(containerHtml.includes('Racik Resep Pusaka'));
    assert.ok(containerHtml.includes('ai-creator-session-alert'));
    assert.ok(containerHtml.includes('value="Evan Hendra Mulyadi"'));

    // Active cooldown after successful generation stays hidden upon returning to studio until user attempts to generate again
    mockStore.set('larasrasa_last_ai_recipe_timestamp', String(Date.now() - 30_000));
    resetAiFoodCreatorState();
    pageMainContent.innerHTML = await renderAiFoodCreatorPage();
    initAiFoodCreatorInteractions();
    assert.ok(!containerHtml.includes('ai-creator-session-alert'));
    assert.ok(!containerHtml.includes('Batas Waktu Peracikan Resep'));

    // Only when user fills name and clicks generate again during active cooldown does the cooldown notice appear
    elements.get('creator-name-input').oninput({ target: { value: 'Evan Hendra Mulyadi' } });
    await elements.get('ai-creator-form').onsubmit({ preventDefault() {} });
    assert.equal(fetchCalls, 1);
    assert.equal(isAiFoodCreatorVerifying(), false);
    assert.ok(containerHtml.includes('ai-creator-session-alert'));
    assert.ok(containerHtml.includes('Batas Waktu Peracikan Resep'));
  } finally {
    resetAiFoodCreatorState();
    i18n.setLanguage('id');
    globalThis.document = originalDocument;
    globalThis.window = originalWindow;
    if (originalLocalStorage === undefined) {
      delete globalThis.localStorage;
    } else {
      globalThis.localStorage = originalLocalStorage;
    }
    globalThis.fetch = originalFetch;
  }
});
