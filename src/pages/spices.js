import { spiceService, localizeSpice } from '../services/spiceService.js';
import { spices } from '../data/spices.js';
import { i18n, t } from '../i18n/index.js';

export { localizeSpice };

/**
 * Jelajah Rempah (Curated Macro Culinary Spice Exhibition)
 * Botanical profiles, culinary philosophy, traditional preparations, and bilingual i18n.
 */

let activeCategory = 'semua';
let currentSpiceId = 'bawang-merah';

export async function renderSpicesPage() {
  const categories = [
    { id: 'semua', label: t('spicesSection.catAll') || 'Sedaya Rempah' },
    { id: 'aromatik', label: t('spicesSection.catAromatic') || 'Aromatik Pokok' },
    { id: 'rimpang', label: t('spicesSection.catRhizome') || 'Rimpang Anget' },
    { id: 'biji', label: t('spicesSection.catSeed') || 'Wiji-wijian Sangrai' },
    { id: 'daun', label: t('spicesSection.catLeaf') || 'Godhong Aromatik' },
    { id: 'asam', label: t('spicesSection.catAcid') || 'Asem & Manis Alami' }
  ];

  const localizedSpices = await spiceService.getSpices('semua');
  const currentSpice = localizedSpices.find(s => s.id === currentSpiceId) || localizedSpices[0];

  const filteredSpices = activeCategory === 'semua'
    ? localizedSpices
    : localizedSpices.filter(s => s.category === activeCategory);

  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <!-- Page Header with Javanese Heritage Gradient -->
      <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-14 border-2 border-[#D49B42]/40 shadow-2xl bg-gradient-to-r from-[#120B07] via-[#1E120A] to-[#120B07] text-[#FAF7F2]">
        <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#D49B42]/15 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#C84C24]/18 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 space-y-3.5 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#D49B42]/40 text-xs font-bold text-[#D49B42] uppercase tracking-wider shadow-xs">
            <svg class="w-3.5 h-3.5 text-[#C84C24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            <span>${t('spicesSection.badge')}</span>
          </div>
          <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            ${t('spicesSection.title')}
          </h1>
          <p class="text-sm sm:text-base text-[#FAF7F2]/85 leading-relaxed">
            ${t('spicesSection.description')}
          </p>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex flex-wrap items-center gap-2.5 pb-2">
        ${categories.map(c => `
          <button type="button" 
                  data-spice-category="${c.id}"
                  class="spice-cat-btn rempah-pill-btn px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    c.id === activeCategory
                      ? 'bg-[#C84C24] text-white shadow-md ring-2 ring-[#C84C24]/30'
                      : 'bg-white text-[#120B07] border border-[#D49B42]/35 hover:bg-[#FAF7F2]'
                  }">
            ${c.label}
          </button>
        `).join('')}
      </div>

      <!-- Curated Macro Exhibition Showcase & Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left: Curated Spotlight Exhibition Card -->
        <div id="spice-spotlight-container" class="lg:col-span-5 pawon-glass rounded-3xl border border-[#D49B42]/40 p-6 sm:p-7 shadow-lg sticky top-28 space-y-5">
          ${renderSpiceSpotlight(currentSpice)}
        </div>

        <!-- Right: Catalog Grid -->
        <div class="lg:col-span-7 space-y-4">
          <div class="flex items-center justify-between pb-2 border-b border-[#D49B42]/25 text-xs text-[#2E4D38]">
            <span class="font-bold">${t('spicesSection.selectHint')}</span>
            <span class="font-mono text-[#C84C24] font-bold">${filteredSpices.length} ${t('spicesSection.availableCount')}</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${filteredSpices.map(spice => {
              const isSelected = spice.id === currentSpiceId;
              return `
                <div 
                  data-spice-id="${spice.id}"
                  class="spice-card group p-4 rounded-3xl bg-white border cursor-pointer transition-all duration-300 card-hover-lift shadow-2xs flex flex-col justify-between ${
                    isSelected ? 'border-[#C84C24] ring-2 ring-[#C84C24]/30 shadow-md' : 'border-[#D49B42]/30 hover:border-[#D49B42]'
                  }"
                >
                  <div>
                    <div class="relative w-full h-36 rounded-2xl overflow-hidden mb-3 bg-[#FAF7F2] border border-[#E8DEC8]">
                      <img src="${spice.image}" 
                           alt="${spice.name}" 
                           class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" 
                           loading="lazy"
                           onerror="this.src='/assets/images/hero/hero-culinary.jpg'"/>
                      <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>
                      <span class="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-md bg-[#120B07]/90 text-[10px] font-bold text-[#FAF7F2] backdrop-blur-md border border-[#D49B42]/30">
                        ${spice.categoryName}
                      </span>
                    </div>
                    
                    <h3 class="font-editorial-serif text-base font-bold text-[#120B07] group-hover:text-[#C84C24] transition-colors leading-snug">
                      ${spice.name}
                    </h3>
                    <p class="text-[10px] italic text-[#2E4D38] mb-1.5 font-mono font-semibold">
                      ${spice.latinName}
                    </p>
                    <p class="text-xs text-[#5C3622] line-clamp-2 leading-relaxed">
                      ${spice.role}
                    </p>
                  </div>

                  <div class="pt-3 border-t border-[#E8DEC8] mt-3 flex items-center justify-between">
                    <span class="text-[11px] font-bold ${isSelected ? 'text-[#C84C24]' : 'text-[#120B07] group-hover:text-[#C84C24]'}">
                      ${isSelected ? t('spicesSection.inspectingBadge') : t('spicesSection.inspectBtn')}
                    </span>
                    <span class="text-xs text-[#C84C24] group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>

    </div>
  `;
}

function renderSpiceSpotlight(spice) {
  return `
    <div class="space-y-4">
      <div class="flex items-center justify-between border-b border-[#D49B42]/25 pb-3">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#120B07] text-[#D49B42] border border-[#D49B42]/40 shadow-xs">
          <span class="w-2 h-2 rounded-full bg-[#C84C24] animate-pulse"></span>
          <span>${t('spicesSection.inspect3dBadge')}</span>
        </span>
        <span class="text-xs font-mono font-bold text-[#C84C24] bg-[#FAF7F2] px-2.5 py-0.5 rounded-md border border-[#D49B42]/30">
          ${spice.categoryName}
        </span>
      </div>

      <div class="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-[#120B07] border border-[#D49B42]/35 shadow-md">
        <img src="${spice.image}" 
             alt="${spice.name}" 
             class="w-full h-full object-cover filter brightness-[0.98] contrast-[1.05]"
             onerror="this.src='/assets/images/hero/hero-culinary.jpg'"/>
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
        <div class="absolute bottom-3 left-4 right-4 text-white">
          <h2 class="font-editorial-serif text-2xl font-bold leading-tight">
            ${spice.name}
          </h2>
          <p class="text-xs text-[#D49B42] italic font-mono font-semibold">
            ${spice.latinName}
          </p>
        </div>
      </div>

      <div class="space-y-3 text-xs leading-relaxed">
        <div class="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/25 space-y-1">
          <span class="font-bold text-[#120B07] block uppercase tracking-wider text-[11px]">
            ${t('spicesSection.aromaTitle')}
          </span>
          <p class="text-[#5C3622]">
            ${spice.aromaProfile}
          </p>
        </div>

        <div class="p-3.5 rounded-2xl bg-white border border-[#E8DEC8] space-y-1">
          <span class="font-bold text-[#120B07] block uppercase tracking-wider text-[11px]">
            ${t('spicesSection.prepTitle')}
          </span>
          <p class="text-[#5C3622]">
            ${spice.preparationMethod}
          </p>
        </div>

        <div class="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/25 space-y-1">
          <span class="font-bold text-[#120B07] block uppercase tracking-wider text-[11px]">
            ${t('spicesSection.wisdomTitle')}
          </span>
          <p class="text-[#5C3622]">
            ${spice.culturalWisdom}
          </p>
        </div>
      </div>
    </div>
  `;
}

export function initSpicesPageInteractions() {
  const catBtns = document.querySelectorAll('[data-spice-category]');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-spice-category');
      if (cat) {
        activeCategory = cat;
        window.dispatchEvent(new CustomEvent('larasrasa:languagechange'));
      }
    });
  });

  const spiceCards = document.querySelectorAll('[data-spice-id]');
  spiceCards.forEach(card => {
    card.addEventListener('click', () => {
      const sId = card.getAttribute('data-spice-id');
      if (sId) {
        currentSpiceId = sId;
        const localized = spices.map(localizeSpice);
        const target = localized.find(s => s.id === sId);
        const spot = document.getElementById('spice-spotlight-container');
        if (spot && target) {
          spot.innerHTML = renderSpiceSpotlight(target);
        }

        spiceCards.forEach(c => {
          const isThis = c.getAttribute('data-spice-id') === sId;
          c.className = `spice-card group p-4 rounded-3xl bg-white border cursor-pointer transition-all duration-300 card-hover-lift shadow-2xs flex flex-col justify-between ${
            isThis ? 'border-[#C84C24] ring-2 ring-[#C84C24]/30 shadow-md' : 'border-[#D49B42]/30 hover:border-[#D49B42]'
          }`;
        });
      }
    });
  });
}
