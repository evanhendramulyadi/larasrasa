import { i18n } from '../i18n/index.js';

export const ROUTE_DEFINITIONS = [
  { id: 'home', idPath: '/', enPath: '/' },
  { id: 'recipes', idPath: '/resep', enPath: '/recipes' },
  { id: 'flavorMap', idPath: '/peta-rasa', enPath: '/flavor-map' },
  { id: 'spices', idPath: '/jelajah-rempah', enPath: '/spices' },
  { id: 'restaurants', idPath: '/restoran-legendaris', enPath: '/restaurants' },
  { id: 'recommendations', idPath: '/rekomendasi', enPath: '/recommendations' },
  { id: 'aiFoodCreator', idPath: '/ai-food-creator', enPath: '/ai-food-creator' }
];

/**
 * Returns localized path (without hash), e.g. '/recipes' or '/resep'
 */
export function getRoutePath(key, lang = i18n?.getLanguage?.() || 'id') {
  const def = ROUTE_DEFINITIONS.find(d => d.id === key);
  if (!def) return '/';
  return lang === 'en' ? def.enPath : def.idPath;
}

/**
 * Returns localized hash, e.g. '#/recipes' or '#/resep'
 */
export function getRouteHash(key, lang = i18n?.getLanguage?.() || 'id', query = '') {
  const path = getRoutePath(key, lang);
  const q = query ? (query.startsWith('?') ? query : `?${query}`) : '';
  return `#${path}${q}`;
}

/**
 * Returns localized recipe detail hash, e.g. '#/recipes/soto-kudus' or '#/resep/soto-kudus'
 */
export function getRecipeDetailHash(slug, lang = i18n?.getLanguage?.() || 'id') {
  const basePath = lang === 'en' ? '/recipes' : '/resep';
  return `#${basePath}/${slug}`;
}

/**
 * Translate an existing hash URL (e.g. '#/resep?region=semarang') to target language ('#/recipes?region=semarang')
 */
export function translateHashRoute(currentHash, targetLang) {
  if (!currentHash) return '#/';
  const raw = currentHash.replace(/^#/, '');
  const [pathPart, queryPart] = raw.split('?');
  const path = pathPart.startsWith('/') ? pathPart : `/${pathPart}`;
  const query = queryPart ? `?${queryPart}` : '';

  // Handle detail routes: /resep/:slug or /recipes/:slug
  if (path.startsWith('/resep/') || path.startsWith('/recipes/')) {
    const slug = path.replace(/^\/(resep|recipes)\//, '');
    const newBase = targetLang === 'en' ? '/recipes' : '/resep';
    return `#${newBase}/${slug}${query}`;
  }

  // Exact match across definitions
  for (const def of ROUTE_DEFINITIONS) {
    if (path === def.idPath || path === def.enPath) {
      const targetPath = targetLang === 'en' ? def.enPath : def.idPath;
      return `#${targetPath}${query}`;
    }
  }

  return `#${path}${query}`;
}

const PAGE_PREFIX_ROUTES = Array.from(
  new Set(
    ROUTE_DEFINITIONS.flatMap((def) => [def.idPath, def.enPath]).filter(
      (routePath) => routePath && routePath !== '/'
    )
  )
).sort((a, b) => b.length - a.length);

/**
 * Resolves a raw hash path to the nearest valid clean route, sanitizing dynamic recipe slugs.
 * Matches non-home page routes by prefix so trailing characters/typos after a valid page route
 * still resolve to that page, while prefixed typos (e.g. /ddddjelajah-rempahhh) redirect to '/'.
 */
export function resolveNearestRoute(rawPath, isEn = false) {
  let normalized = (rawPath || '').split('?')[0].trim().toLowerCase().replace(/\/+$/, '');
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }

  if (normalized === '/') {
    return '/';
  }

  if (
    normalized.startsWith('/resep/') ||
    normalized.startsWith('/recipes/') ||
    normalized.startsWith('/recipe/')
  ) {
    const rawSlug = normalized.replace(/^\/(resep|recipes|recipe)\//, '').trim();
    const slug = /^[a-z0-9-]+$/i.test(rawSlug) ? rawSlug : '';
    if (slug) {
      return isEn ? `/recipes/${slug}` : `/resep/${slug}`;
    }
    return isEn ? '/recipes' : '/resep';
  }

  const matchedPrefix = PAGE_PREFIX_ROUTES.find((route) => normalized.startsWith(route));
  if (matchedPrefix) {
    return matchedPrefix;
  }

  return '/';
}
