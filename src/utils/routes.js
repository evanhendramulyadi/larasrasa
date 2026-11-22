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
