import { getDifficultyBadge } from '../utils/formatters.js';
import { t } from '../i18n/index.js';

/**
 * Upgraded Recipe Card Component
 * Uses the refined Warm Ivory, Deep Espresso, and Terracotta palette.
 */
export function renderRecipeCard(recipe) {
  const diff = getDifficultyBadge(recipe.difficulty);

  const isEn = typeof document !== 'undefined' && document.documentElement.lang === 'en';
  const flavorLabels = {
    segar: isEn ? 'Fresh' : 'Segar',
    asam: isEn ? 'Tangy' : 'Asam',
    pedas: isEn ? 'Spicy' : 'Pedas',
    manis: isEn ? 'Sweet' : 'Manis',
    gurih: isEn ? 'Savory' : 'Gurih',
    'kaya-rempah': isEn ? 'Spiced' : 'Rempah'
  };

  const flavorTags = recipe.flavorProfiles.map(f => {
    let colorClass = 'bg-[#F2E8D8] text-[#654332]';
    if (f === 'segar') colorClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    if (f === 'asam') colorClass = 'bg-amber-50 text-amber-800 border-amber-200';
    if (f === 'pedas') colorClass = 'bg-rose-50 text-rose-800 border-rose-200';
    if (f === 'manis') colorClass = 'bg-orange-50 text-orange-800 border-orange-200';
    if (f === 'gurih') colorClass = 'bg-stone-100 text-stone-800 border-stone-200';
    if (f === 'kaya-rempah') colorClass = 'bg-[#F2E8D8] text-[#302018] border-[#E5D9C5]';
    const tagText = flavorLabels[f] || f;
    return `<span class="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${colorClass}">${tagText}</span>`;
  }).join(' ');

  return `
    <article 
      data-recipe-slug="${recipe.slug}"
      role="link"
      tabindex="0"
      aria-label="${recipe.name} (${recipe.regionName})"
      class="recipe-card recipe-card-item group bg-white rounded-2xl overflow-hidden border border-[#E5D9C5] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col card-hover-lift cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#B85C38]"
    >
      <!-- Card Image Header -->
      <a href="#/resep/${recipe.slug}" class="recipe-card-link relative block overflow-hidden aspect-4/3 bg-[#302018]/10" aria-label="${recipe.name}">
        <img src="${recipe.image}" 
             alt="${recipe.name}" 
             loading="lazy"
             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
             onerror="this.onerror=null; this.src='/assets/images/hero/hero-culinary.jpg';"/>
        
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
        
        <!-- Regional Badge -->
        <div class="absolute top-3 left-3">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#302018]/90 text-[#FAF6EF] backdrop-blur-xs border border-[#C49A58]/50 shadow-xs">
            <svg class="w-3.5 h-3.5 text-[#C49A58]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            ${recipe.regionName}
          </span>
        </div>

        <!-- Duration Badge -->
        <div class="absolute bottom-3 left-3">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-black/75 text-white backdrop-blur-xs">
            <svg class="w-3.5 h-3.5 text-[#C49A58]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            ${recipe.cookingDuration}
          </span>
        </div>
      </a>

      <!-- Card Body -->
      <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <!-- Flavor Tags & Difficulty -->
          <div class="flex items-center justify-between gap-2 mb-2.5">
            <div class="flex flex-wrap gap-1">
              ${flavorTags}
            </div>
            <span class="text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${diff.class}">
              ${diff.label}
            </span>
          </div>

          <!-- Title -->
          <h3 class="font-editorial-serif text-lg font-bold text-[#302018] group-hover:text-[#B85C38] transition-colors leading-snug mb-1.5">
            <a href="#/resep/${recipe.slug}" class="hover:underline">
              ${recipe.name}
            </a>
          </h3>

          <!-- Intro excerpt -->
          <p class="text-xs text-[#654332]/90 line-clamp-2 leading-relaxed">
            ${recipe.intro}
          </p>
        </div>

        <!-- Card Footer Action -->
        <div class="pt-3 border-t border-[#E5D9C5] flex items-center justify-between text-xs">
          <span class="text-[#777B52] font-semibold text-[11px]">
            Est. ${recipe.estimatedCost}
          </span>
          <a href="#/resep/${recipe.slug}" 
             class="inline-flex items-center gap-1.5 font-bold text-[#302018] group-hover:text-[#B85C38] transition-colors">
            <span>${t('recipesSection.viewRecipeBtn')}</span>
            <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `;
}
