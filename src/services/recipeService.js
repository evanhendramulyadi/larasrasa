import { recipes } from '../data/recipes.js';
import { recipeTranslationsEn } from '../data/translations-en.js';
import { i18n } from '../i18n/index.js';
import { API_CONFIG, apiRequest } from './api.js';

export function localizeRecipe(recipe) {
  if (!recipe) return recipe;
  const lang = i18n?.getLanguage ? i18n.getLanguage() : 'id';
  if (lang !== 'en') return { ...recipe };

  const key = recipe.slug || recipe.id || '';
  const baseKey = key.replace(/-(solo|kudus|semarang|pekalongan|banyumas)$/, '');
  const trans = recipeTranslationsEn[key] || 
                recipeTranslationsEn[recipe.id] || 
                recipeTranslationsEn[baseKey] ||
                recipeTranslationsEn[baseKey.replace(/^nasi-/, '')] ||
                recipeTranslationsEn[key.replace(/^tempe-/, '')];
  if (!trans) return { ...recipe };

  return {
    ...recipe,
    name: trans.name || recipe.name,
    mealType: trans.mealType || recipe.mealType,
    difficulty: trans.difficulty || recipe.difficulty,
    difficultyLevel: trans.difficultyLevel || recipe.difficultyLevel,
    intro: trans.intro || recipe.intro,
    history: trans.history || recipe.history,
    culturalBackground: trans.culturalBackground || recipe.culturalBackground,
    interestingFacts: trans.interestingFacts || recipe.interestingFacts,
    regionalVariations: trans.regionalVariations || recipe.regionalVariations,
    equipment: trans.equipment || recipe.equipment,
    ingredientGroups: trans.ingredientGroups || recipe.ingredientGroups,
    steps: trans.steps || recipe.steps,
    servingAdvice: trans.servingAdvice || recipe.servingAdvice,
    servingSuggestions: trans.servingAdvice || recipe.servingSuggestions,
    cookingTips: trans.chefTips 
      ? (Array.isArray(trans.chefTips) ? trans.chefTips : [trans.chefTips]) 
      : recipe.cookingTips,
    commonMistakes: trans.commonMistakes 
      ? trans.commonMistakes.map(m => typeof m === 'object' ? `${m.mistake}: ${m.solution}` : m)
      : recipe.commonMistakes,
    substitutions: trans.substitutions || recipe.substitutions,
    nutrition: trans.nutrition 
      ? { ...recipe.nutrition, ...trans.nutrition } 
      : (lang === 'en' && recipe.nutrition 
          ? { 
              ...recipe.nutrition, 
              note: trans.nutritionNote || 'Estimated nutrition per standard serving without additional white rice.' 
            } 
          : recipe.nutrition),
  };
}

export const recipeService = {
  /**
   * Mengambil daftar resep dengan filter, pencarian, dan pengurutan.
   * Disiapkan untuk memanggil GET /api/recipes jika mode Laravel aktif.
   */
  async getRecipes(params = {}) {
    if (!API_CONFIG.useMock) {
      try {
        const queryString = new URLSearchParams(params).toString();
        const response = await apiRequest(`/recipes${queryString ? `?${queryString}` : ''}`);
        return (response.data || []).map(localizeRecipe);
      } catch (err) {
        console.warn('Gagal memuat resep dari Laravel API, beralih ke data lokal:', err);
      }
    }

    // Local filter and search implementation
    let result = recipes.map(localizeRecipe);

    // Filter keyword / pencarian
    if (params.search && params.search.trim()) {
      const q = params.search.toLowerCase().trim();
      result = result.filter(r => {
        const inName = r.name.toLowerCase().includes(q) || (r.javaneseName && r.javaneseName.toLowerCase().includes(q));
        const inRegion = r.regionName.toLowerCase().includes(q);
        const inIntro = r.intro.toLowerCase().includes(q);
        const inIngredients = r.ingredientGroups.some(g =>
          g.items.some(i => i.name.toLowerCase().includes(q))
        );
        return inName || inRegion || inIntro || inIngredients;
      });
    }

    // Filter wilayah / region
    if (params.region && params.region !== 'semua') {
      result = result.filter(r => r.regionId === params.region);
    }

    // Filter profil rasa
    if (params.flavor && params.flavor !== 'semua') {
      result = result.filter(r => r.flavorProfiles.includes(params.flavor));
    }

    // Filter tingkat kesulitan
    if (params.difficulty && params.difficulty !== 'semua') {
      result = result.filter(r => r.difficulty.toLowerCase() === params.difficulty.toLowerCase());
    }

    // Filter durasi memasak
    if (params.duration && params.duration !== 'semua') {
      result = result.filter(r => {
        const totalMinutes = parseInt(r.cookingDuration) || 60;
        if (params.duration === 'cepat') return totalMinutes <= 35;
        if (params.duration === 'sedang') return totalMinutes > 35 && totalMinutes <= 60;
        if (params.duration === 'lama') return totalMinutes > 60;
        return true;
      });
    }

    // Sorting / Pengurutan
    if (params.sort) {
      if (params.sort === 'tercepat') {
        result.sort((a, b) => (parseInt(a.cookingDuration) || 0) - (parseInt(b.cookingDuration) || 0));
      } else if (params.sort === 'termudah') {
        const diffWeight = { 'Sangat Mudah': 1, 'Mudah': 2, 'Sedang': 3, 'Sulit': 4 };
        result.sort((a, b) => (diffWeight[a.difficulty] || 3) - (diffWeight[b.difficulty] || 3));
      } else if (params.sort === 'nama-asc') {
        result.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    return result;
  },

  /**
   * Mengambil detail resep berdasarkan slug unik.
   * Disiapkan untuk memanggil GET /api/recipes/{slug}.
   */
  async getRecipeBySlug(slug) {
    if (!API_CONFIG.useMock) {
      try {
        const response = await apiRequest(`/recipes/${slug}`);
        return localizeRecipe(response.data);
      } catch (err) {
        console.warn(`Gagal memuat resep ${slug} dari Laravel API:`, err);
      }
    }

    const recipe = recipes.find(r => r.slug === slug || r.id === slug);
    if (!recipe) {
      throw new Error(`Resep dengan slug "${slug}" tidak ditemukan.`);
    }
    return localizeRecipe(recipe);
  },

  /**
   * Mengambil resep unggulan pilihan kurator.
   */
  async getFeaturedRecipes(limit = 4) {
    const all = await this.getRecipes();
    return all.slice(0, limit);
  },

  /**
   * Mengambil resep terkait (related recipes).
   */
  async getRelatedRecipes(recipeId, limit = 3) {
    const current = recipes.find(r => r.id === recipeId);
    if (!current) return recipes.slice(0, limit).map(localizeRecipe);

    const related = recipes.filter(r => 
      r.id !== recipeId && (
        (current.relatedRecipeIds && current.relatedRecipeIds.includes(r.id)) ||
        r.regionId === current.regionId ||
        r.flavorProfiles.some(f => current.flavorProfiles.includes(f))
      )
    );

    return related.slice(0, limit).map(localizeRecipe);
  }
};

