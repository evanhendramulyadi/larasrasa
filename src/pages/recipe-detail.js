import { recipeService } from '../services/recipeService.js';
import { restaurantService } from '../services/restaurantService.js';
import { renderServingCalculator, initServingCalculator } from '../components/serving-calculator.js';
import { scaleIngredientAmount, getDifficultyBadge } from '../utils/formatters.js';
import { renderRecipeCard } from '../components/recipe-card.js';
import { renderRestaurantCard } from '../components/restaurant-card.js';
import { i18n, t } from '../i18n/index.js';

/**
 * Upgraded Recipe Detail View
 * Comprehensive culinary editorial article with 21 sections,
 * dynamic portion calculator, checklist steps, and i18n support.
 */

let currentServings = 4;

export async function renderRecipeDetailPage(slug) {
  let recipe;
  try {
    recipe = await recipeService.getRecipeBySlug(slug);
  } catch (err) {
    const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
    return `
      <div class="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 class="font-editorial-serif text-3xl font-bold text-[#140C07]">${isEn ? 'Recipe Not Found' : 'Resep Tidak Ditemukan'}</h2>
        <p class="text-sm text-[#5C3622]">${isEn ? 'Sorry, the requested recipe could not be found.' : 'Maaf, resep dengan tautan tersebut tidak ditemukan.'}</p>
        <a href="#/resep" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#140C07] text-white text-xs font-bold">
          &larr; ${isEn ? 'Back to Recipes' : 'Kembali ke Resep'}
        </a>
      </div>
    `;
  }

  currentServings = recipe.baseServings;
  const diff = getDifficultyBadge(recipe.difficulty);
  const relatedRecipes = await recipeService.getRelatedRecipes(recipe.id, 3);
  
  let relevantRestaurants = [];
  if (recipe.legendaryRestaurantIds && recipe.legendaryRestaurantIds.length > 0) {
    const allR = await restaurantService.getRestaurants();
    relevantRestaurants = allR.filter(r => recipe.legendaryRestaurantIds.includes(r.id));
  }
  const cookingSteps = recipe.steps || recipe.instructions || [];

  return `
    <article class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      <!-- Back Navigation & Breadcrumb -->
      <nav class="flex items-center justify-between text-xs text-[#4A5834]" aria-label="Breadcrumb">
        <div class="flex items-center gap-2">
          <a href="#/" class="hover:text-[#140C07]">${t('nav.home')}</a>
          <span>/</span>
          <a href="#/resep" class="hover:text-[#140C07]">${t('nav.recipes')}</a>
          <span>/</span>
          <span class="text-[#140C07] font-semibold">${recipe.regionName}</span>
        </div>
        <button id="recipe-share-btn" type="button" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8DEC8] hover:bg-[#EFE8DA] text-[#140C07] font-semibold transition-colors shadow-2xs">
          <svg class="w-3.5 h-3.5 text-[#C84C24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
          <span id="share-btn-text">${t('recipeDetail.shareBtn')}</span>
        </button>
      </nav>

      <!-- 1. FOOD NAME & REGIONAL ORIGIN HEADER -->
      <header class="space-y-4">
        <div class="flex flex-wrap items-center gap-2">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#140C07] text-[#FAF7F2]">
            <svg class="w-3.5 h-3.5 text-[#D49B42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            ${recipe.regionName}
          </span>
          <span class="text-xs px-2.5 py-1 rounded-full font-semibold ${diff.class}">
            ${diff.label}
          </span>
          <span class="text-xs px-2.5 py-1 rounded-full bg-[#EFE8DA] text-[#140C07] font-semibold border border-[#E8DEC8]">
            ${recipe.mealType}
          </span>
        </div>

        <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-[#140C07] leading-tight">
          ${recipe.name}
        </h1>

        ${recipe.javaneseName ? `
          <p class="font-editorial-serif italic text-lg sm:text-xl text-[#4A5834]">
            ${recipe.javaneseName}
          </p>
        ` : ''}

        <!-- 3. INTRODUCTION -->
        <p class="text-base sm:text-lg text-[#5C3622] leading-relaxed max-w-4xl pt-1">
          ${recipe.intro}
        </p>

        <!-- Meta Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-y border-[#E8DEC8] py-4 text-center">
          <div class="p-2">
            <span class="block text-[11px] uppercase tracking-wider text-[#4A5834]">${t('recipeDetail.prepTime')}</span>
            <span class="font-bold text-sm text-[#140C07]">${recipe.prepTime}</span>
          </div>
          <div class="p-2 border-l border-[#E8DEC8]">
            <span class="block text-[11px] uppercase tracking-wider text-[#4A5834]">${t('recipeDetail.cookTime')}</span>
            <span class="font-bold text-sm text-[#140C07]">${recipe.cookTime}</span>
          </div>
          <div class="p-2 border-l border-[#E8DEC8]">
            <span class="block text-[11px] uppercase tracking-wider text-[#4A5834]">${t('recipeDetail.baseServings')}</span>
            <span class="font-bold text-sm text-[#140C07]">${recipe.baseServings} ${t('common.servings')}</span>
          </div>
          <div class="p-2 border-l border-[#E8DEC8]">
            <span class="block text-[11px] uppercase tracking-wider text-[#4A5834]">${t('common.estBudget')}</span>
            <span class="font-bold text-sm text-[#C84C24]">${recipe.estimatedCost}</span>
          </div>
        </div>
      </header>

      <!-- 2. HERO PHOTOGRAPH -->
      <div class="relative rounded-3xl overflow-hidden border border-[#E8DEC8] shadow-xl aspect-16/9 bg-[#140C07]/10">
        <img src="${recipe.image}" 
             alt="${recipe.name}" 
             class="w-full h-full object-cover"
             onerror="this.onerror=null; this.src='/assets/images/hero/hero-culinary.jpg';"/>
        <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"></div>
        <div class="absolute bottom-4 left-6 right-6 text-white text-xs flex items-center justify-between">
          <span class="bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
            ${recipe.regionName}
          </span>
          <span class="text-[11px] opacity-80 hidden sm:inline">${i18n?.getLanguage && i18n.getLanguage() === 'en' ? 'Traditional Culinary Heritage' : 'Pusaka Kuliner Tradisional'}</span>
        </div>
      </div>

      <!-- 4 & 5 & 6. HISTORY, CULTURAL BACKGROUND & INTERESTING FACTS -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div class="lg:col-span-7 space-y-6">
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DEC8] space-y-4 shadow-xs">
            <h2 class="font-editorial-serif text-2xl font-bold text-[#140C07] flex items-center gap-2">
              <span class="w-2.5 h-6 bg-[#C84C24] rounded-full inline-block"></span>
              ${t('recipeDetail.historyTitle')}
            </h2>
            <p class="text-sm text-[#5C3622] leading-relaxed">
              ${recipe.history}
            </p>
            ${recipe.culturalBackground ? `
              <div class="pt-3 border-t border-[#E8DEC8] text-xs text-[#5C3622] leading-relaxed italic bg-[#FAF7F2] p-4 rounded-2xl border">
                <strong>${t('recipeDetail.culturalValue')}:</strong> ${recipe.culturalBackground}
              </div>
            ` : ''}
          </div>

          <!-- Regional Variations -->
          ${recipe.regionalVariations ? `
            <div class="bg-[#EFE8DA]/70 p-6 rounded-3xl border border-[#E8DEC8] space-y-2">
              <h3 class="font-editorial-serif text-lg font-bold text-[#140C07]">${t('recipeDetail.variationsTitle')}</h3>
              <p class="text-xs text-[#5C3622] leading-relaxed">
                ${recipe.regionalVariations}
              </p>
            </div>
          ` : ''}
        </div>

        <!-- 5. Interesting Facts Column -->
        <div class="lg:col-span-5 space-y-6">
          <div class="bg-gradient-to-br from-[#140C07] to-[#1F140F] text-[#FAF7F2] p-6 sm:p-7 rounded-3xl shadow-md space-y-4 border border-[#D49B42]/20">
            <h3 class="font-editorial-serif text-xl font-bold text-[#D49B42] flex items-center gap-2">
              <svg class="w-5 h-5 text-[#D49B42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              ${t('recipeDetail.factsTitle')}
            </h3>
            <ul class="space-y-3 text-xs text-[#EFE8DA]/90">
              ${recipe.interestingFacts.map(fact => `
                <li class="flex items-start gap-2.5 leading-relaxed">
                  <span class="text-[#C84C24] font-bold mt-0.5">&bull;</span>
                  <span>${fact}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- 9. Cooking Equipment -->
          <div class="bg-white p-5 rounded-3xl border border-[#E8DEC8] space-y-3 shadow-xs">
            <h4 class="font-editorial-serif text-xs font-bold uppercase tracking-wider text-[#140C07]">
              ${t('recipeDetail.equipmentTitle')}
            </h4>
            <div class="flex flex-wrap gap-2">
              ${recipe.equipment.map(eq => `
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs bg-[#FAF7F2] text-[#140C07] border border-[#E8DEC8]">
                  <svg class="w-3 h-3 text-[#C84C24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  ${eq}
                </span>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- 8. INGREDIENTS & DYNAMIC SERVING CALCULATOR -->
      <section class="space-y-6 pt-6 border-t border-[#E8DEC8]">
        <div class="space-y-1">
          <span class="text-xs uppercase font-bold tracking-widest text-[#C84C24]">${i18n?.getLanguage && i18n.getLanguage() === 'en' ? 'Spice Composition & Quantities' : 'Komposisi Bumbu & Takaran'}</span>
          <h2 class="font-editorial-serif text-3xl font-bold text-[#140C07]">
            ${t('recipeDetail.ingredientsTitle')}
          </h2>
        </div>

        <!-- Serving Scaler Tool -->
        <div id="serving-calculator-container">
          ${renderServingCalculator(recipe.baseServings, currentServings)}
        </div>

        <!-- Ingredients Table / Groups -->
        <div id="ingredients-display" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${renderIngredientsTable(recipe, currentServings)}
        </div>
      </section>

      <!-- 14. STEP-BY-STEP COOKING INSTRUCTIONS WITH INTERACTIVE CHECKLIST -->
      <section class="space-y-6 pt-6 border-t border-[#E8DEC8]">
        <div class="space-y-2">
          <span class="text-xs uppercase font-bold tracking-widest text-[#C84C24]">${i18n?.getLanguage && i18n.getLanguage() === 'en' ? 'Practical Kitchen Guide' : 'Panduan Praktis Dapur'}</span>
          <h2 class="font-editorial-serif text-3xl font-bold text-[#140C07]">
            ${t('recipeDetail.stepsTitle')}
          </h2>
          <p class="text-xs text-[#4A5834]">
            ${t('recipeDetail.stepsSub')}
          </p>
        </div>

        <div class="space-y-4">
          ${cookingSteps.map((step, idx) => `
            <div class="step-card bg-white p-6 rounded-3xl border border-[#E8DEC8] shadow-xs transition-all duration-200" id="step-card-${idx}">
              <div class="flex items-start gap-4">
                <!-- Step Checkbox -->
                <button type="button" 
                        data-step-index="${idx}"
                        class="step-checkbox shrink-0 mt-1 w-6 h-6 rounded-lg border-2 border-[#C84C24] flex items-center justify-center transition-all bg-[#FAF7F2] hover:bg-[#EFE8DA]"
                        aria-label="Tandai langkah ${step.stepNumber} selesai">
                  <svg class="step-check-icon w-4 h-4 text-white hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </button>

                <div class="flex-1 space-y-2">
                  <div class="flex items-center justify-between flex-wrap gap-2">
                    <h3 class="font-editorial-serif text-lg font-bold text-[#140C07]">
                      ${t('common.step')} ${step.stepNumber}: ${step.title}
                    </h3>
                    ${step.timerMinutes ? `
                      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EFE8DA] text-[#140C07]">
                        <svg class="w-3.5 h-3.5 text-[#C84C24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        ${step.timerMinutes} ${t('common.minutes')}
                      </span>
                    ` : ''}
                  </div>

                  <p class="text-sm text-[#140C07] leading-relaxed step-instruction">
                    ${step.instruction}
                  </p>

                  ${step.tip ? `
                    <div class="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] text-xs text-[#5C3622] flex items-start gap-2 mt-2">
                      <svg class="w-4 h-4 text-[#C84C24] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6v2h8v-2c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7Z"/>
                        <path d="M9 22h6"/>
                      </svg>
                      <span><strong>${t('recipeDetail.chefTip')}</strong> ${step.tip}</span>
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 15 & 16. COOKING TIPS & COMMON MISTAKES -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#E8DEC8]">
        <!-- Cooking Tips -->
        <div class="bg-amber-50/60 p-6 sm:p-7 rounded-3xl border border-amber-200 space-y-3">
          <h3 class="font-editorial-serif text-lg font-bold text-amber-950 flex items-center gap-2">
            <svg class="w-5 h-5 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            ${t('recipeDetail.tipsTitle')}
          </h3>
          <ul class="space-y-2 text-xs text-amber-900 leading-relaxed">
            ${(Array.isArray(recipe.cookingTips) ? recipe.cookingTips : [recipe.cookingTips]).filter(Boolean).map(tip => `
              <li class="flex items-start gap-2">
                <span class="text-amber-700 font-bold">&check;</span>
                <span>${tip}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Common Mistakes -->
        <div class="bg-rose-50/60 p-6 sm:p-7 rounded-3xl border border-rose-200 space-y-3">
          <h3 class="font-editorial-serif text-lg font-bold text-rose-950 flex items-center gap-2">
            <svg class="w-5 h-5 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            ${t('recipeDetail.mistakesTitle')}
          </h3>
          <ul class="space-y-2 text-xs text-rose-900 leading-relaxed">
            ${(Array.isArray(recipe.commonMistakes) ? recipe.commonMistakes : []).map(m => `
              <li class="flex items-start gap-2">
                <span class="text-rose-600 font-bold">&times;</span>
                <span>${typeof m === 'object' ? `<strong>${m.mistake}:</strong> ${m.solution}` : m}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </section>

      <!-- 17 & 18 & 19. SUBSTITUTIONS, SERVING & NUTRITION -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-[#E8DEC8]">
        <!-- Substitutions -->
        <div class="bg-white p-6 rounded-3xl border border-[#E8DEC8] space-y-3 shadow-xs">
          <h4 class="font-editorial-serif text-base font-bold text-[#140C07]">
            ${t('recipeDetail.substitutionsTitle')}
          </h4>
          <div class="space-y-2 text-xs text-[#5C3622]">
            ${recipe.substitutions.map(sub => `
              <div class="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
                <strong class="text-[#140C07] block">${sub.ingredient}</strong>
                <span>${sub.substitute}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Serving Suggestions -->
        <div class="bg-white p-6 rounded-3xl border border-[#E8DEC8] space-y-3 shadow-xs">
          <h4 class="font-editorial-serif text-base font-bold text-[#140C07]">
            ${t('recipeDetail.servingTitle')}
          </h4>
          <p class="text-xs text-[#5C3622] leading-relaxed">
            ${recipe.servingSuggestions}
          </p>
        </div>

        <!-- Nutrition Card -->
        <div class="bg-white p-6 rounded-3xl border border-[#E8DEC8] space-y-3 shadow-xs">
          <h4 class="font-editorial-serif text-base font-bold text-[#140C07]">
            ${t('recipeDetail.nutritionTitle')}
          </h4>
          <div class="grid grid-cols-2 gap-2 text-center text-xs">
            <div class="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
              <span class="block text-[10px] text-[#4A5834]">${i18n?.getLanguage && i18n.getLanguage() === 'en' ? 'Calories' : 'Kalori'}</span>
              <span class="font-bold text-[#140C07]">${recipe.nutrition.calories}</span>
            </div>
            <div class="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
              <span class="block text-[10px] text-[#4A5834]">${i18n?.getLanguage && i18n.getLanguage() === 'en' ? 'Protein' : 'Protein'}</span>
              <span class="font-bold text-[#140C07]">${recipe.nutrition.protein}</span>
            </div>
            <div class="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
              <span class="block text-[10px] text-[#4A5834]">${i18n?.getLanguage && i18n.getLanguage() === 'en' ? 'Carbs' : 'Karbohidrat'}</span>
              <span class="font-bold text-[#140C07]">${recipe.nutrition.carbs}</span>
            </div>
            <div class="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
              <span class="block text-[10px] text-[#4A5834]">${i18n?.getLanguage && i18n.getLanguage() === 'en' ? 'Fat' : 'Lemak'}</span>
              <span class="font-bold text-[#140C07]">${recipe.nutrition.fat}</span>
            </div>
          </div>
          <p class="text-[10px] text-[#4A5834] italic text-center">
            ${recipe.nutrition.note}
          </p>
        </div>
      </section>

      <!-- 21. RELEVANT LEGENDARY RESTAURANTS -->
      ${relevantRestaurants.length > 0 ? `
        <section class="space-y-6 pt-6 border-t border-[#E8DEC8]">
          <div class="space-y-1">
            <span class="text-xs uppercase font-bold tracking-widest text-[#C84C24]">${t('recipeDetail.restaurantsTitle')}</span>
            <h2 class="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#140C07]">
              ${recipe.name}
            </h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${relevantRestaurants.map(rst => renderRestaurantCard(rst)).join('')}
          </div>
        </section>
      ` : ''}

      <!-- 20. RELATED RECIPES -->
      ${relatedRecipes.length > 0 ? `
        <section class="space-y-6 pt-6 border-t border-[#E8DEC8]">
          <div class="flex items-center justify-between">
            <h2 class="font-editorial-serif text-2xl font-bold text-[#140C07]">
              ${t('recipeDetail.relatedTitle')}
            </h2>
            <a href="#/resep" class="text-xs font-bold text-[#C84C24] hover:text-[#140C07]">
              ${t('recipesSection.viewAll')} &rarr;
            </a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            ${relatedRecipes.map(rel => renderRecipeCard(rel)).join('')}
          </div>
        </section>
      ` : ''}

    </article>
  `;
}

function renderIngredientsTable(recipe, targetServings) {
  return recipe.ingredientGroups.map(group => `
    <div class="bg-white p-6 rounded-3xl border border-[#E8DEC8] space-y-3 shadow-xs">
      <h3 class="font-editorial-serif text-base font-bold text-[#140C07] border-b border-[#E8DEC8] pb-2">
        ${group.name}
      </h3>
      <ul class="space-y-2 text-xs">
        ${group.items.map(item => {
          const scaledAmount = scaleIngredientAmount(item.amount, recipe.baseServings, targetServings);
          return `
            <li class="flex items-start justify-between gap-3 py-1.5 border-b border-[#E8DEC8]/50 last:border-0">
              <span class="text-[#140C07] font-medium leading-relaxed">
                ${item.name}
                ${item.notes ? `<span class="block text-[11px] text-[#4A5834] font-normal italic">${item.notes}</span>` : ''}
              </span>
              <span class="shrink-0 font-bold text-[#140C07] bg-[#FAF7F2] px-2.5 py-0.5 rounded-lg border border-[#E8DEC8]">
                ${scaledAmount} ${item.unit}
              </span>
            </li>
          `;
        }).join('')}
      </ul>
    </div>
  `).join('');
}

export function initRecipeDetailInteractions(recipe) {
  const calcContainer = document.getElementById('serving-calculator-container');
  if (calcContainer && recipe) {
    initServingCalculator(calcContainer, recipe, (newServings) => {
      currentServings = newServings;
      const display = document.getElementById('ingredients-display');
      if (display) {
        display.innerHTML = renderIngredientsTable(recipe, newServings);
      }
    });
  }

  // Interactive Checklist Steps
  const stepCheckboxes = document.querySelectorAll('.step-checkbox');
  stepCheckboxes.forEach(btn => {
    btn.addEventListener('click', () => {
      const isChecked = btn.classList.contains('bg-[#C84C24]');
      const checkIcon = btn.querySelector('.step-check-icon');
      const stepCard = btn.closest('.step-card');
      const instructionText = stepCard?.querySelector('.step-instruction');

      if (isChecked) {
        btn.classList.remove('bg-[#C84C24]');
        btn.classList.add('bg-[#FAF7F2]');
        checkIcon?.classList.add('hidden');
        stepCard?.classList.remove('opacity-60', 'bg-emerald-50/40');
        instructionText?.classList.remove('line-through', 'text-stone-400');
      } else {
        btn.classList.add('bg-[#C84C24]');
        btn.classList.remove('bg-[#FAF7F2]');
        checkIcon?.classList.remove('hidden');
        stepCard?.classList.add('opacity-60', 'bg-emerald-50/40');
        instructionText?.classList.add('line-through', 'text-stone-400');
      }
    });
  });

  // Share Button
  const shareBtn = document.getElementById('recipe-share-btn');
  const shareText = document.getElementById('share-btn-text');
  if (shareBtn && shareText) {
    shareBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        shareText.textContent = t('recipeDetail.linkCopied');
        setTimeout(() => {
          shareText.textContent = t('recipeDetail.shareBtn');
        }, 2500);
      }).catch(() => {
        shareText.textContent = 'Copy failed';
      });
    });
  }
}
