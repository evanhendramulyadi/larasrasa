import { recipeService } from '../services/recipeService.js';
import { restaurantService } from '../services/restaurantService.js';
import { flavorProfiles } from '../data/flavorProfiles.js';
import { spices } from '../data/spices.js';
import { localizeSpice } from './spices.js';
import { renderRecipeCard } from '../components/recipe-card.js';
import { renderRestaurantCard } from '../components/restaurant-card.js';
import { ThreeHeroShowcase } from '../components/three-hero.js';
import { i18n, t } from '../i18n/index.js';

/**
 * Upgraded Homepage (Beranda)
 * With elevated Royal Javanese Heritage palette tokens, bilingual support, and showcase.
 */
export async function renderHomePage() {
  const isEn = i18n.getLanguage() === 'en';
  const featuredRecipes = await recipeService.getFeaturedRecipes(4);
  const featuredRestaurants = await restaurantService.getFeaturedRestaurants(3);
  const sampleSpices = spices.map(localizeSpice).slice(0, 5);

  return `
    <div class="space-y-20 lg:space-y-28 pb-24">
      
      <!-- HERO SECTION -->
      <section class="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E8DEC8]">
        <!-- Subtle Ambient Warm Glow (Polos Menarik Bercorak) -->
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#D49B42]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute bottom-0 right-10 w-[450px] h-[450px] bg-[#C84C24]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <!-- Left Editorial Text -->
            <div class="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-left z-10">
              <div class="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#EFE8DA] border border-[#E8DEC8] text-[10px] sm:text-xs font-semibold text-[#5C3622] uppercase tracking-wider shadow-2xs">
                <span class="w-2 h-2 rounded-full bg-[#C84C24] animate-pulse"></span>
                <span>${t('hero.badge')}</span>
              </div>

              <h1 class="font-editorial-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#140C07] leading-[1.14] break-words">
                ${t('hero.titleStart')} <span class="italic text-[#C84C24]">${t('hero.titleAccent')}</span> ${t('hero.titleEnd')}
              </h1>

              <p class="text-sm sm:text-lg text-[#5C3622] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                ${t('hero.description')}
              </p>

              <!-- Hero Actions -->
              <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
                <a href="#/resep" 
                   class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#C84C24] hover:bg-[#AE3E1B] text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
                  <span>${t('hero.ctaPrimary')}</span>
                  <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <a href="#/rekomendasi" 
                   class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold bg-white hover:bg-[#EFE8DA] text-[#140C07] transition-all border border-[#E8DEC8] shadow-xs cursor-pointer">
                  <svg class="w-4 h-4 text-[#C84C24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
                  </svg>
                  <span>${t('hero.ctaSecondary')}</span>
                </a>
              </div>

              <!-- Cultural Quotation Pill -->
              <div class="pt-2 sm:pt-3 flex items-center justify-center lg:justify-start gap-3 text-xs text-[#4A5834]">
                <span class="inline-block w-8 h-px bg-[#D49B42]"></span>
                <span class="italic font-editorial-serif text-[11px] sm:text-xs">${t('hero.culturalPill')}</span>
              </div>
            </div>

            <!-- Right Interactive Centerpiece Showcase -->
            <div class="lg:col-span-6 relative flex items-center justify-center w-full">
              <div id="hero-3d-canvas" class="w-full max-w-[500px] min-h-[400px] sm:min-h-[470px]"></div>
            </div>

          </div>
        </div>
      </section>

      <!-- SECTION: DISCOVER BY FLAVOR -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span class="text-xs uppercase font-bold tracking-widest text-[#C84C24]">${t('flavorSection.badge')}</span>
          <h2 class="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#140C07]">
            ${t('flavorSection.title')}
          </h2>
          <p class="text-sm text-[#5C3622] leading-relaxed">
            ${t('flavorSection.description')}
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          ${flavorProfiles.map(f => {
            const fName = isEn ? (f.nameEn || f.name) : f.name;
            const fTagline = isEn ? (f.taglineEn || f.tagline) : f.tagline;
            return `
            <a href="#/resep?flavor=${f.id}" 
               class="group p-5 rounded-2xl bg-white border border-[#E8DEC8] hover:border-[#C84C24] text-center transition-all duration-300 card-hover-lift flex flex-col items-center justify-between shadow-2xs">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110" style="background-color: ${f.color}15; color: ${f.color};">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z" fill="currentColor" fill-opacity="0.2"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              </div>
              <div>
                <h3 class="font-editorial-serif text-base font-bold text-[#140C07] group-hover:text-[#C84C24] transition-colors mb-1">
                  ${fName}
                </h3>
                <p class="text-[11px] text-[#5C3622] line-clamp-2 leading-tight">
                  ${fTagline}
                </p>
              </div>
              <span class="mt-3 text-[10px] font-bold text-[#C84C24] uppercase tracking-wider group-hover:underline">
                ${t('flavorSection.exploreBtn')} &rarr;
              </span>
            </a>
          `;
          }).join('')}
        </div>
      </section>

      <!-- SECTION: FEATURED RECIPES -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div class="space-y-2">
            <span class="text-xs uppercase font-bold tracking-widest text-[#C84C24]">${t('recipesSection.badge')}</span>
            <h2 class="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#140C07]">
              ${t('recipesSection.title')}
            </h2>
            <p class="text-sm text-[#5C3622] max-w-xl">
              ${t('recipesSection.description')}
            </p>
          </div>
          <a href="#/resep" class="inline-flex items-center gap-1.5 text-sm font-bold text-[#140C07] hover:text-[#C84C24] transition-colors group shrink-0">
            <span>${t('recipesSection.viewAll')}</span>
            <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${featuredRecipes.map(r => renderRecipeCard(r)).join('')}
        </div>
      </section>

      <!-- SECTION: PETA RASA PREVIEW -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-br from-[#140C07] to-[#22150E] rounded-3xl p-8 sm:p-12 lg:p-14 text-white relative overflow-hidden shadow-xl border border-[#D49B42]/30">
          <div class="absolute -right-16 -bottom-16 w-96 h-96 bg-[#C84C24]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div class="lg:col-span-6 space-y-6">
              <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C84C24]/25 border border-[#C84C24]/40 text-xs font-semibold text-[#FAF7F2] uppercase tracking-wider">
                <svg class="w-3.5 h-3.5 text-[#D49B42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                  <line x1="9" x2="9" y1="3" y2="18"/>
                  <line x1="15" x2="15" y1="6" y2="21"/>
                </svg>
                ${t('mapSection.badge')}
              </span>

              <h2 class="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#FAF7F2]">
                ${t('mapSection.title')}
              </h2>

              <p class="text-sm sm:text-base text-[#EFE8DA]/85 leading-relaxed">
                ${t('mapSection.description')}
              </p>

              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div class="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <p class="font-bold text-[#D49B42]">Kota Semarang</p>
                  <p class="text-[11px] text-[#EFE8DA]/70">Lumpia & Tahu Gimbal</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <p class="font-bold text-[#D49B42]">Kota Surakarta (Solo)</p>
                  <p class="text-[11px] text-[#EFE8DA]/70">Nasi Liwet & Selat</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <p class="font-bold text-[#D49B42]">Kabupaten Kudus</p>
                  <p class="text-[11px] text-[#EFE8DA]/70">Soto Kencur & Garang Asem</p>
                </div>
              </div>

              <div class="pt-2">
                <a href="#/peta-rasa" 
                   class="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-[#C84C24] hover:bg-[#AE3E1B] text-white transition-all shadow-md">
                  <span>${t('nav.flavorMap')} &rarr;</span>
                </a>
              </div>
            </div>

            <!-- Preview Graphic Teaser -->
            <div class="lg:col-span-6 flex items-center justify-center">
              <div class="w-full aspect-4/3 rounded-2xl overflow-hidden border-2 border-[#D49B42]/30 shadow-2xl relative group">
                <img src="/assets/images/regions/semarang.jpg" 
                     alt="Peta Rasa Jawa Tengah" 
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <span class="text-xs uppercase tracking-widest text-[#D49B42] font-bold">${t('mapSection.badge')}</span>
                  <h3 class="font-editorial-serif text-2xl font-bold text-white">${t('mapSection.mapTitle')}</h3>
                  <p class="text-xs text-[#EFE8DA] mt-1">${t('mapSection.mapHint')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION: SPICE DISCOVERY -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span class="text-xs uppercase font-bold tracking-widest text-[#C84C24]">${t('spicesSection.badge')}</span>
          <h2 class="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#140C07]">
            ${t('spicesSection.title')}
          </h2>
          <p class="text-sm text-[#5C3622] leading-relaxed">
            ${t('spicesSection.description')}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          ${sampleSpices.map(s => `
            <div class="group bg-white p-4 rounded-2xl border border-[#E8DEC8] shadow-xs hover:border-[#C84C24] transition-all card-hover-lift flex flex-col justify-between">
              <div>
                <div class="relative w-full h-32 rounded-xl overflow-hidden mb-3 bg-[#FAF7F2] border border-[#E8DEC8]/60">
                  <img src="${s.image}" 
                       alt="${s.name}" 
                       class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                       loading="lazy"
                       onerror="this.src='/assets/images/hero/hero-culinary.jpg'"/>
                  <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <span class="absolute bottom-1.5 left-2 px-2 py-0.5 rounded-md bg-[#140C07]/85 text-[9px] font-bold text-[#FAF7F2] backdrop-blur-xs">
                    ${s.categoryName}
                  </span>
                </div>
                <h3 class="font-editorial-serif text-base font-bold text-[#140C07] group-hover:text-[#C84C24] transition-colors mb-0.5">
                  ${s.name}
                </h3>
                <p class="text-[10px] italic text-[#4A5834] mb-1.5 font-mono">
                  ${s.latinName}
                </p>
                <p class="text-xs text-[#5C3622]/90 line-clamp-2 leading-relaxed">
                  ${s.role}
                </p>
              </div>
              <div class="pt-3 border-t border-[#E8DEC8] mt-3">
                <a href="#/jelajah-rempah" class="text-xs font-bold text-[#C84C24] hover:text-[#140C07] transition-colors flex items-center justify-between">
                  <span>${t('spicesSection.inspectBtn')}</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- SECTION: LEGENDARY RESTAURANTS -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div class="space-y-2">
            <span class="text-xs uppercase font-bold tracking-widest text-[#C84C24]">${t('restaurantsSection.badge')}</span>
            <h2 class="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#140C07]">
              ${t('restaurantsSection.title')}
            </h2>
            <p class="text-sm text-[#5C3622] max-w-xl">
              ${t('restaurantsSection.description')}
            </p>
          </div>
          <a href="#/restoran-legendaris" class="inline-flex items-center gap-1.5 text-sm font-bold text-[#140C07] hover:text-[#C84C24] transition-colors group shrink-0">
            <span>${t('nav.restaurants')}</span>
            <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${featuredRestaurants.map(r => renderRestaurantCard(r)).join('')}
        </div>
      </section>

      <!-- SECTION: AI FOOD CREATOR SPOTLIGHT -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#140C07] via-[#22150E] to-[#140C07] border border-[#D49B42]/35 shadow-2xl p-8 sm:p-12 text-[#FAF7F2]">
          <div class="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#C84C24]/15 blur-3xl pointer-events-none"></div>
          <div class="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#D49B42]/10 blur-3xl pointer-events-none"></div>
          
          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-8 space-y-4">
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#D49B42]/40 text-xs font-bold text-[#D49B42]">
                <span class="w-2 h-2 rounded-full bg-[#C84C24] animate-ping"></span>
                <span>${isEn ? 'AI CULINARY STUDIO • CREATE YOUR OWN DISH' : 'STUDIO KULINER AI • RANCANG RESEP ORISINAL'}</span>
              </div>
              <h2 class="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                ${isEn ? 'Create Your Own Javanese Dish & Recipe' : 'Rancang Resep Orisinal & Takaran Bumbu Anda'}
              </h2>
              <p class="text-sm sm:text-base text-[#FAF7F2]/85 max-w-2xl leading-relaxed">
                ${isEn 
                  ? 'Input your culinary vision, choose regional proteins and spices, and our AI Culinary Engine will synthesize an authentic recipe with scaled measurements officially credited to your name.'
                  : 'Pilih bahan rempah otentik Jawa Tengah, tentukan teknik memasak, dan biarkan AI menyusun takaran presisi serta cetak biru resep resmi bertuliskan nama Anda sebagai pencipta.'}
              </p>
              <div class="pt-2 flex flex-wrap gap-3">
                <a href="#/ai-food-creator" class="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold bg-[#C84C24] hover:bg-[#AE3E1B] text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  <span>✨ ${isEn ? 'Launch AI Food Creator' : 'Ciptakan Resep di Studio AI'}</span>
                  <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>

            <div class="lg:col-span-4 bg-white/5 border border-[#D49B42]/25 rounded-2xl p-6 backdrop-blur-xs space-y-3 text-xs">
              <span class="text-[10px] font-bold text-[#D49B42] uppercase tracking-wider block">${isEn ? 'AI Studio Advantages' : 'Kelebihan Studio AI'}</span>
              <div class="space-y-2 text-[#FAF7F2]/80">
                <div class="flex items-start gap-2">
                  <span class="text-[#C84C24] font-bold">✓</span>
                  <span><strong>${isEn ? 'Free & Instant:' : 'Bebas Akses Tanpa Hambatan:'}</strong> ${isEn ? 'Instant recipe synthesis' : 'Perancangan resep cepat'}</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-[#C84C24] font-bold">✓</span>
                  <span><strong>${isEn ? 'Official Attribution:' : 'Hak Cipta Tertera:'}</strong> ${isEn ? 'Full name on recipe blueprint' : 'Nama tertera pada dokumen resep'}</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-[#C84C24] font-bold">✓</span>
                  <span><strong>${isEn ? 'Authentic Spices:' : 'Logika Bumbu Otentik:'}</strong> ${isEn ? 'Curated Central Javanese flavors' : 'Pilihan bahan khas 8 wilayah'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION: RECOMMENDATION CTA -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-white via-[#FAF7F2] to-[#EFE8DA] rounded-3xl p-8 sm:p-12 border border-[#E8DEC8] shadow-lg text-center space-y-6 max-w-3xl mx-auto">
          <div class="w-14 h-14 rounded-2xl bg-[#140C07] text-[#D49B42] flex items-center justify-center mx-auto shadow-md">
            <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
            </svg>
          </div>

          <div class="space-y-2">
            <h2 class="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#140C07]">
              ${t('recommendations.title')}
            </h2>
            <p class="text-sm sm:text-base text-[#5C3622] max-w-xl mx-auto leading-relaxed">
              ${t('recommendations.subtitle')}
            </p>
          </div>

          <div class="pt-2">
            <a href="#/rekomendasi" 
               class="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold bg-[#C84C24] hover:bg-[#AE3E1B] text-white transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5">
              <span>${t('recommendations.submitBtn')}</span>
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

    </div>
  `;
}

export function initHomePageInteractions() {
  const heroCanvas = document.getElementById('hero-3d-canvas');
  if (heroCanvas) {
    const showcase = new ThreeHeroShowcase(heroCanvas);
    showcase.init();
    window._currentHeroShowcase = showcase;
  }
}
