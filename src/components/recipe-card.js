import { getDifficultyBadge } from '../utils/formatters.js';
import { t, i18n } from '../i18n/index.js';

/**
 * Editorial Royal Heritage Recipe Card Component
 * Refined typography, Javanese authentic dish naming, smooth hover elevations,
 * and comprehensive bilingual labels.
 */
export function renderRecipeCard(recipe) {
  const diff = getDifficultyBadge(recipe.difficulty);
  const isEn = i18n?.getLanguage ? i18n.getLanguage() === 'en' : (typeof document !== 'undefined' && document.documentElement.lang === 'en');
  
  const flavorLabels = {
    segar: isEn ? 'Fresh' : 'Segar Sumyah',
    asam: isEn ? 'Tangy' : 'Asem Alami',
    pedas: isEn ? 'Spicy' : 'Pedes Kemepyar',
    manis: isEn ? 'Sweet' : 'Legi Lumer',
    gurih: isEn ? 'Savory' : 'Gurih Kanil',
    'kaya-rempah': isEn ? 'Spiced' : 'Kaya Rempah'
  };

  // Localize duration
  let localizedDuration = recipe.cookingDuration || '';
  if (isEn && localizedDuration) {
    localizedDuration = localizedDuration.replace(/Menit/gi, 'Mins').replace(/Jam/gi, 'hr');
  }

  const flavorTags = (recipe.flavorProfiles || []).map(f => {
    let colorClass = 'bg-[#FAF7F2] text-[#5C3622] border-[#E8DEC8]';
    if (f === 'segar') colorClass = 'bg-emerald-50/90 text-emerald-800 border-emerald-200';
    if (f === 'asam') colorClass = 'bg-amber-50/90 text-amber-800 border-amber-200';
    if (f === 'pedas') colorClass = 'bg-rose-50/90 text-rose-800 border-rose-200';
    if (f === 'manis') colorClass = 'bg-orange-50/90 text-orange-800 border-orange-200';
    if (f === 'gurih') colorClass = 'bg-[#F5EFEB] text-[#331F14] border-[#E8DEC8]';
    if (f === 'kaya-rempah') colorClass = 'bg-[#FDF4EE] text-[#C84C24] border-[#C84C24]/30';
    const tagText = flavorLabels[f] || f;
    return `<span class="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${colorClass} shadow-2xs">${tagText}</span>`;
  }).join(' ');

  return `
    <article 
      data-recipe-slug="${recipe.slug}"
      role="link"
      tabindex="0"
      aria-label="${recipe.name} (${recipe.regionName})"
      class="recipe-card recipe-card-item group bg-white rounded-3xl overflow-hidden border border-[#D49B42]/30 shadow-xs hover:shadow-2xl hover:border-[#D49B42] transition-all duration-300 flex flex-col card-hover-lift cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#C84C24]"
    >
      <!-- Card Image Header with Zoom on Hover -->
      <a href="#/resep/${recipe.slug}" class="recipe-card-link relative block overflow-hidden aspect-4/3 bg-[#120B07]/10" aria-label="${recipe.name}">
        <img src="${recipe.image}" 
             alt="${recipe.name}" 
             loading="lazy"
             class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" 
             onerror="this.onerror=null; this.src='/assets/images/hero/hero-culinary.jpg';"/>
        
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-60 transition-opacity"></div>
        
        <!-- Regional Badge with Gold Pin -->
        <div class="absolute top-3.5 left-3.5">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#120B07]/90 text-[#FAF7F2] backdrop-blur-md border border-[#D49B42]/50 shadow-md">
            <svg class="w-3.5 h-3.5 text-[#D49B42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>${recipe.regionName}</span>
          </span>
        </div>

        <!-- Duration & Serving Badges -->
        <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-black/85 text-white backdrop-blur-md border border-white/15 shadow-xs shrink-0">
            <svg class="w-3.5 h-3.5 text-[#D49B42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>${localizedDuration}</span>
          </span>

          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-black/85 text-white backdrop-blur-md border border-white/15 shadow-xs shrink-0">
            <span>👤</span>
            <span>${recipe.baseServings} ${isEn ? 'Servings' : 'Porsi'}</span>
          </span>
        </div>
      </a>

      <!-- Card Body Content -->
      <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <!-- Flavor Tags & Difficulty Level -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <div class="flex flex-wrap gap-1.5">
              ${flavorTags}
            </div>
            <span class="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${diff.class} shrink-0">
              ${diff.label}
            </span>
          </div>

          <!-- Recipe Title -->
          <h3 class="font-editorial-serif text-xl font-bold text-[#120B07] group-hover:text-[#C84C24] transition-colors leading-snug mb-1">
            <a href="#/resep/${recipe.slug}" class="hover:underline">
              ${recipe.name}
            </a>
          </h3>

          <!-- Authentic Javanese Name Subtitle -->
          ${recipe.javaneseName ? `
            <p class="font-editorial-serif italic text-xs text-[#D49B42] font-semibold mb-2">
              "${recipe.javaneseName}"
            </p>
          ` : ''}

          <!-- Narrative excerpt -->
          <p class="text-xs text-[#5C3622] line-clamp-2 leading-relaxed">
            ${recipe.intro}
          </p>
        </div>

        <!-- Card Footer Action & Estimated Budget -->
        <div class="pt-3.5 border-t border-[#E8DEC8] flex items-center justify-between text-xs">
          <div class="flex items-center gap-1.5 text-[#2E4D38] font-bold text-[11px]">
            <span>💰</span>
            <span>Est. ${recipe.estimatedCost}</span>
          </div>

          <a href="#/resep/${recipe.slug}" 
             class="inline-flex items-center gap-1.5 font-bold text-[#120B07] group-hover:text-[#C84C24] transition-all">
            <span>${t('recipesSection.viewRecipeBtn')}</span>
            <svg class="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-[#C84C24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `;
}
