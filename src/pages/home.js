import { recipeService } from '../services/recipeService.js';
import { restaurantService } from '../services/restaurantService.js';
import { flavorProfiles } from '../data/flavorProfiles.js';
import { spices } from '../data/spices.js';
import { recipes } from '../data/recipes.js';
import { localizeSpice } from '../services/spiceService.js';
import { renderRecipeCard } from '../components/recipe-card.js';
import { renderRestaurantCard } from '../components/restaurant-card.js';
import { ThreeHeroShowcase } from '../components/three-hero.js';
import { i18n, t } from '../i18n/index.js';

/**
 * World-Class Royal Javanese Heritage Homepage
 * Clean architectural section bands with alternating contrast, generous breathing room,
 * interactive 3D centerpiece, and distinct culinary showcases.
 */
export async function renderHomePage() {
  const isEn = i18n.getLanguage() === 'en';
  const featuredRecipes = await recipeService.getFeaturedRecipes(4);
  const featuredRestaurants = await restaurantService.getFeaturedRestaurants(3);
  const sampleSpices = spices.map(localizeSpice).slice(0, 5);

  return `
    <div class="w-full">
      
      <!-- HERO SECTION: ONE-SCREEN VIEWPORT OPTIMIZED (FULL VIEWPORT ON MOBILE & DESKTOP) -->
      <section class="relative overflow-hidden border-b border-[#D49B42]/30 bg-[#FAF7F2] min-h-[calc(100svh-68px)] min-h-[calc(100dvh-68px)] py-8 sm:py-12 lg:py-0 lg:h-[calc(100svh-68px)] lg:min-h-[560px] lg:max-h-[840px] flex flex-col justify-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
            
            <!-- Left Editorial Text -->
            <div class="lg:col-span-6 space-y-3.5 sm:space-y-4 lg:space-y-3.5 xl:space-y-4 text-center lg:text-left z-10">
              
              <!-- Royal Heritage Pill -->
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-[#D49B42]/40 text-[10.5px] sm:text-xs font-bold text-[#C84C24] uppercase tracking-wider shadow-2xs">
                <span>${t('hero.badge')}</span>
              </div>

              <!-- Main Headline -->
              <h1 class="font-editorial-serif text-2xl sm:text-4xl lg:text-[32px] xl:text-[42px] 2xl:text-[46px] font-bold tracking-tight text-[#120B07] leading-[1.14] break-words">
                ${t('hero.titleStart')} <span class="italic text-terracotta-gradient">${t('hero.titleAccent')}</span> ${t('hero.titleEnd')}
              </h1>

              <!-- Poetic Intro Description -->
              <p class="text-xs sm:text-base lg:text-[13px] xl:text-[15px] text-[#5C3622] font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                ${t('hero.description')}
              </p>

              <!-- Hero Action Buttons -->
              <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-0.5 sm:pt-1">
                <a href="${isEn ? '#/recipes' : '#/resep'}" 
                   class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold bg-[#C84C24] hover:bg-[#AE3E1B] text-white transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer border border-[#E05A30]">
                  <span>${t('hero.ctaPrimary')}</span>
                  <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                
                <a href="${isEn ? '#/recommendations' : '#/rekomendasi'}" 
                   class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-5.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold bg-white hover:bg-[#FAF7F2] text-[#120B07] transition-all border border-[#D49B42]/40 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 cursor-pointer">
                  <svg class="w-4 h-4 text-[#C84C24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
                  </svg>
                  <span>${t('hero.ctaSecondary')}</span>
                </a>
              </div>

              <!-- Cultural Quotation Pill -->
              <div class="pt-0.5 flex items-center justify-center lg:justify-start gap-2.5 text-xs text-[#2E4D38]">
                <span class="inline-block w-6 h-px bg-[#D49B42]"></span>
                <span class="italic font-editorial-serif text-[11px] sm:text-xs font-semibold text-[#5C3622]">${t('hero.culturalPill')}</span>
              </div>

              <!-- Key Heritage Stats Cards -->
              <div class="pt-1 sm:pt-1.5 grid grid-cols-3 gap-2 sm:gap-2.5 text-left max-w-lg mx-auto lg:mx-0">
                <div class="p-2 sm:p-2.5 rounded-xl bg-white/95 border border-[#D49B42]/30 shadow-2xs overflow-hidden flex flex-col justify-between">
                  <span class="font-editorial-serif text-base sm:text-xl font-bold text-[#C84C24] block leading-none mb-0.5">8</span>
                  <span class="text-[10px] sm:text-[11px] font-bold text-[#120B07] block leading-tight truncate">${t('hero.statsRegions')}</span>
                  <span class="text-[8.5px] sm:text-[9.5px] text-[#5C3622] block leading-tight truncate mt-0.5">${t('hero.statsRegionsSub')}</span>
                </div>
                <div class="p-2 sm:p-2.5 rounded-xl bg-white/95 border border-[#D49B42]/30 shadow-2xs overflow-hidden flex flex-col justify-between">
                  <span class="font-editorial-serif text-base sm:text-xl font-bold text-[#D49B42] block leading-none mb-0.5">${recipes.length}</span>
                  <span class="text-[10px] sm:text-[11px] font-bold text-[#120B07] block leading-tight truncate">${t('hero.statsRecipes')}</span>
                  <span class="text-[8.5px] sm:text-[9.5px] text-[#5C3622] block leading-tight truncate mt-0.5">${t('hero.statsRecipesSub')}</span>
                </div>
                <div class="p-2 sm:p-2.5 rounded-xl bg-white/95 border border-[#D49B42]/30 shadow-2xs overflow-hidden flex flex-col justify-between">
                  <span class="font-editorial-serif text-base sm:text-xl font-bold text-[#2E4D38] block leading-none mb-0.5">${spices.length}</span>
                  <span class="text-[10px] sm:text-[11px] font-bold text-[#120B07] block leading-tight truncate">${t('hero.statsHeritage')}</span>
                  <span class="text-[8.5px] sm:text-[9.5px] text-[#5C3622] block leading-tight truncate mt-0.5">${t('hero.statsHeritageSub')}</span>
                </div>
              </div>

            </div>

            <!-- Right Interactive Centerpiece Showcase -->
            <div class="lg:col-span-6 relative flex items-center justify-center w-full">
              <div id="hero-culinary-showcase" class="w-full max-w-lg lg:max-w-[480px] xl:max-w-[530px] h-[370px] sm:h-[430px] lg:h-[410px] xl:h-[450px] 2xl:h-[480px]"></div>
            </div>

          </div>
        </div>
      </section>

      <!-- SECTION: DISCOVER BY FLAVOR SPECTRUM -->
      <section class="w-full py-14 sm:py-20 border-b border-[#D49B42]/25 bg-white/70">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span class="text-xs uppercase font-bold tracking-widest text-[#C84C24] block">
              ${t('flavorSection.badge')}
            </span>
            <h2 class="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#120B07]">
              ${t('flavorSection.title')}
            </h2>
            <p class="text-sm sm:text-base text-[#5C3622] leading-relaxed">
              ${t('flavorSection.description')}
            </p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            ${flavorProfiles.map(f => {
              const fName = isEn ? (f.nameEn || f.name) : f.name;
              const fTagline = isEn ? (f.taglineEn || f.tagline) : f.tagline;
              return `
              <a href="${isEn ? '#/recipes' : '#/resep'}" 
                 data-flavor-spectrum="${f.id}"
                 class="group p-5 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/35 hover:border-[#C84C24] text-center transition-all duration-300 card-hover-lift flex flex-col items-center justify-between shadow-2xs">
                <div class="w-13 h-13 rounded-2xl flex items-center justify-center mb-3.5 transition-transform group-hover:scale-110 shadow-xs" style="background-color: ${f.color}15; color: ${f.color}; border: 1px solid ${f.color}35;">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" fill="currentColor" fill-opacity="0.2"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-editorial-serif text-base font-bold text-[#120B07] group-hover:text-[#C84C24] transition-colors mb-1">
                    ${fName}
                  </h3>
                  <p class="text-[11px] text-[#5C3622] line-clamp-2 leading-snug">
                    ${fTagline}
                  </p>
                </div>
                <span class="mt-3.5 text-[10px] font-bold text-[#C84C24] uppercase tracking-wider group-hover:underline flex items-center gap-1">
                  <span>${t('flavorSection.exploreBtn')}</span>
                  <span>&rarr;</span>
                </span>
              </a>
            `;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION: FEATURED CURATED RECIPES -->
      <section class="w-full py-14 sm:py-20 border-b border-[#D49B42]/30 bg-[#F4EDE2]/85 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 sm:mb-12 gap-4 pb-5 border-b border-[#D49B42]/30">
            <div class="space-y-2">
              <span class="text-xs uppercase font-bold tracking-widest text-[#C84C24] block">
                ${t('recipesSection.badge')}
              </span>
              <h2 class="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#120B07]">
                ${t('recipesSection.title')}
              </h2>
              <p class="text-sm sm:text-base text-[#5C3622] max-w-xl">
                ${t('recipesSection.description')}
              </p>
            </div>
            <a href="${isEn ? '#/recipes' : '#/resep'}" class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#120B07] hover:bg-[#C84C24] text-[#FAF7F2] transition-all duration-300 shadow-sm shrink-0">
              <span>${t('recipesSection.viewAll')}</span>
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${featuredRecipes.map(r => renderRecipeCard(r)).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION: FLAVOR MAP CULINARY GEOGRAPHY -->
      <section class="w-full py-14 sm:py-20 bg-[#120B07] text-white relative overflow-hidden border-b border-[#D49B42]/30 shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div class="lg:col-span-6 space-y-5">
              <span class="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/10 border border-[#D49B42]/40 text-xs font-bold text-[#D49B42] uppercase tracking-wider">
                <span>${t('mapSection.badge')}</span>
              </span>

              <h2 class="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#FAF7F2]">
                ${t('mapSection.title')}
              </h2>

              <p class="text-sm sm:text-base text-[#FAF7F2]/85 leading-relaxed">
                ${t('mapSection.description')}
              </p>

              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div class="p-3.5 rounded-2xl bg-white/5 border border-[#D49B42]/30">
                  <p class="font-bold text-[#D49B42]">Kota Semarang</p>
                  <p class="text-[11px] text-[#FAF7F2]/75 mt-0.5">Lumpia & Tahu Gimbal</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-white/5 border border-[#D49B42]/30">
                  <p class="font-bold text-[#D49B42]">Solo (Surakarta)</p>
                  <p class="text-[11px] text-[#FAF7F2]/75 mt-0.5">Nasi Liwet & Selat Solo</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-white/5 border border-[#D49B42]/30">
                  <p class="font-bold text-[#D49B42]">Kab. Kudus</p>
                  <p class="text-[11px] text-[#FAF7F2]/75 mt-0.5">Soto Kudus & Garang Asem</p>
                </div>
              </div>

              <div class="pt-2">
                <a href="${isEn ? '#/flavor-map' : '#/peta-rasa'}" 
                   class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#C84C24] hover:bg-[#AE3E1B] text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-[#E05A30]">
                  <span>${t('nav.flavorMap')} &rarr;</span>
                </a>
              </div>
            </div>

            <!-- Preview Graphic Teaser -->
            <div class="lg:col-span-6 flex items-center justify-center">
              <div class="w-full aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D49B42]/40 shadow-xl relative group">
                <img src="/assets/images/regions/peta-sentra-kuliner.jpg" 
                     alt="${t('mapSection.mapTitle')}" 
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     onerror="this.src='/assets/images/regions/semarang.jpg'"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
                  <span class="text-xs uppercase tracking-widest text-[#D49B42] font-bold">${t('mapSection.badge')}</span>
                  <h3 class="font-editorial-serif text-2xl sm:text-3xl font-bold text-white mt-1">${t('mapSection.mapTitle')}</h3>
                  <p class="text-xs text-[#EFE8DA] mt-1.5">${t('mapSection.mapHint')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION: SPICE DISCOVERY -->
      <section class="w-full py-14 sm:py-20 border-b border-[#D49B42]/25 bg-white/70">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span class="text-xs uppercase font-bold tracking-widest text-[#C84C24] block">
              ${t('spicesSection.badge')}
            </span>
            <h2 class="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#120B07]">
              ${t('spicesSection.title')}
            </h2>
            <p class="text-sm sm:text-base text-[#5C3622] leading-relaxed">
              ${t('spicesSection.description')}
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            ${sampleSpices.map(s => `
              <div 
                data-spice-id="${s.id}"
                role="button"
                tabindex="0"
                aria-label="${s.name}"
                class="spice-card group bg-[#FAF7F2] p-5 rounded-2xl border border-[#D49B42]/30 shadow-2xs hover:border-[#C84C24] transition-all card-hover-lift flex flex-col justify-between cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#C84C24]">
                <div>
                  <div class="relative w-full h-40 rounded-xl overflow-hidden mb-3.5 bg-white border border-[#E8DEC8]">
                    <img src="${s.image}" 
                         alt="${s.name}" 
                         class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" 
                         loading="lazy"
                         onerror="this.src='/assets/images/hero/hero-culinary.jpg'"/>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>
                    <span class="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-[#120B07]/90 text-[10px] font-bold text-[#FAF7F2] backdrop-blur-md border border-[#D49B42]/30">
                      ${s.categoryName}
                    </span>
                  </div>
                  <h3 class="font-editorial-serif text-lg font-bold text-[#120B07] group-hover:text-[#C84C24] transition-colors mb-0.5">
                    ${s.name}
                  </h3>
                  <p class="text-[10.5px] italic text-[#2E4D38] mb-2 font-mono font-semibold">
                    ${s.latinName}
                  </p>
                  <p class="text-xs text-[#5C3622] line-clamp-2 leading-relaxed">
                    ${s.role}
                  </p>
                </div>
                <div class="pt-4 border-t border-[#E8DEC8] mt-4">
                  <button type="button" 
                          data-spice-id="${s.id}"
                          class="w-full text-xs font-bold text-[#C84C24] group-hover:text-[#AE3E1B] transition-colors flex items-center justify-between cursor-pointer">
                    <span>${t('spicesSection.inspectBtn')}</span>
                    <span class="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="mt-10 text-center">
            <a href="${isEn ? '#/spices' : '#/jelajah-rempah'}" 
               class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#120B07] hover:bg-[#C84C24] text-[#FAF7F2] transition-all shadow-sm">
              <span>${isEn ? 'Explore All 19 Heritage Spices' : 'Jelajahi Seluruh 19 Rempah Pusaka'}</span>
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <!-- SECTION: LEGENDARY HISTORIC RESTAURANTS -->
      <section class="w-full py-14 sm:py-20 border-b border-[#D49B42]/30 bg-[#F4EDE2]/85 relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 sm:mb-12 gap-4 pb-5 border-b border-[#D49B42]/30">
            <div class="space-y-2">
              <span class="text-xs uppercase font-bold tracking-widest text-[#C84C24] block">
                ${t('restaurantsSection.badge')}
              </span>
              <h2 class="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#120B07]">
                ${t('restaurantsSection.title')}
              </h2>
              <p class="text-sm sm:text-base text-[#5C3622] max-w-xl">
                ${t('restaurantsSection.description')}
              </p>
            </div>
            <a href="${isEn ? '#/restaurants' : '#/restoran-legendaris'}" class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#120B07] hover:bg-[#C84C24] text-[#FAF7F2] transition-all shadow-sm shrink-0">
              <span>${t('nav.restaurants')}</span>
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${featuredRestaurants.map(r => renderRestaurantCard(r)).join('')}
          </div>
        </div>
      </section>

      <!-- SECTION: QUICK CONCIERGE CTA (WHAT TO EAT TODAY) -->
      <section class="w-full py-14 sm:py-20 bg-gradient-to-b from-[#FAF7F2] to-[#F5EFEB] border-b border-[#D49B42]/25">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-white rounded-3xl p-8 sm:p-14 border border-[#D49B42]/40 shadow-xl text-center space-y-6">
            <div class="w-16 h-16 rounded-3xl bg-[#120B07] text-[#D49B42] border-2 border-[#D49B42]/50 flex items-center justify-center mx-auto shadow-md">
              <svg class="w-8 h-8 text-[#D49B42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
              </svg>
            </div>

            <div class="space-y-3">
              <span class="text-xs uppercase font-bold tracking-widest text-[#C84C24] block">
                ${t('recommendations.badge')}
              </span>
              <h2 class="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#120B07]">
                ${t('recommendations.title')}
              </h2>
              <p class="text-sm sm:text-base text-[#5C3622] max-w-xl mx-auto leading-relaxed">
                ${t('recommendations.subtitle')}
              </p>
            </div>

            <div class="pt-2">
              <a href="${isEn ? '#/recommendations' : '#/rekomendasi'}" 
                 class="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs sm:text-sm font-bold bg-[#C84C24] hover:bg-[#AE3E1B] text-white transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 border border-[#E05A30]">
                <span>${t('recommendations.submitBtn')}</span>
                <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION: AI FOOD CREATOR SPOTLIGHT STUDIO -->
      <section class="w-full py-14 sm:py-20 border-b border-[#D49B42]/25 bg-white/70">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#120B07] border border-[#D49B42]/40 shadow-xl p-6 sm:p-10 lg:p-12 text-[#FAF7F2]">
            <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div class="lg:col-span-8 space-y-4">
                <div class="inline-flex items-center px-3.5 py-1 rounded-full bg-white/10 border border-[#D49B42]/40 text-xs font-bold text-[#D49B42] shadow-xs">
                  <span>${isEn ? 'AI CULINARY STUDIO • CENTRAL JAVA' : 'STUDIO RACIK KULINER AI • JAWA TENGAH'}</span>
                </div>
                <h2 class="font-editorial-serif text-2xl sm:text-4xl lg:text-[40px] font-bold text-white leading-tight">
                  ${isEn ? 'Craft Your Recipe Concept & Bumbu Profile' : 'Rancang Konsep Resep & Komposisi Bumbu Anda'}
                </h2>
                <p class="text-xs sm:text-base text-[#FAF7F2]/85 max-w-2xl leading-relaxed">
                  ${isEn 
                    ? 'Input your culinary vision, choose authentic regional spices, calibrate for 4 portions, and generate a standardized recipe template ready for backend integration.'
                    : 'Pilih bahan rempah otentik Jawa Tengah, tentukan teknik memasak tradisional, atur takaran 4 porsi, lan susun cithakan resep resmi siap sambung backend.'}
                </p>
                <div class="pt-2">
                  <a href="#/ai-food-creator" class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#C84C24] hover:bg-[#AE3E1B] text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-[#E05A30]">
                    <span>${isEn ? 'Open AI Food Creator Studio' : 'Bukak Studio AI Food Creator'}</span>
                    <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div class="lg:col-span-4 bg-white/5 border border-[#D49B42]/30 rounded-2xl p-5 sm:p-6 space-y-3.5 text-xs">
                <span class="text-[11px] font-bold text-[#D49B42] uppercase tracking-wider block">${isEn ? 'AI Studio Architecture' : 'Kautaman Studio AI'}</span>
                <div class="space-y-2.5 text-[#FAF7F2]/85">
                  <div class="flex items-start gap-2.5">
                    <span class="text-[#C84C24] font-bold text-sm">✓</span>
                    <span><strong>${isEn ? 'Standard Scale (4 Portions):' : 'Standar Porsi (4 Porsi):'}</strong> ${isEn ? 'Calibrated for 4 standard portions' : 'Disesuaikan pas untuk takaran saji 4 porsi'}</span>
                  </div>
                  <div class="flex items-start gap-2.5">
                    <span class="text-[#C84C24] font-bold text-sm">✓</span>
                    <span><strong>${isEn ? 'Creator Attribution:' : 'Hak Cipta Tertera:'}</strong> ${isEn ? 'Official certificate & attribution' : 'Asma pencipta ing cithakan resep'}</span>
                  </div>
                  <div class="flex items-start gap-2.5">
                    <span class="text-[#C84C24] font-bold text-sm">✓</span>
                    <span><strong>${isEn ? 'Backend Ready:' : 'Kesiapan Backend API:'}</strong> ${isEn ? 'Structured payload ready for Laravel API' : 'Format payload siap kagem endpoint API'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  `;
}

export function initHomePageInteractions() {
  const heroContainer = document.getElementById('hero-culinary-showcase') || document.getElementById('hero-3d-canvas');
  if (heroContainer) {
    const showcase = new ThreeHeroShowcase(heroContainer);
    showcase.init();
    window._currentHeroShowcase = showcase;
  }
}
