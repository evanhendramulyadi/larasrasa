import { t, i18n } from '../i18n/index.js';
import { openRecipeModal } from './recipe-modal.js';

/**
 * Central Javanese Heritage Feast — 4 Iconic Guest of Honor Banquet Dishes
 * Centerpiece showcase featuring Central Java's iconic guest feast dishes.
 * Interactive hotspot pins and quick-action menu chips with direct recipe popup modal access.
 */
export class HeroShowcase {
  constructor(containerElement) {
    this.container = containerElement;
    this.activeDishId = 'nasi-liwet';
    this.isDisposed = false;
  }

  init() {
    if (!this.container) return;
    this.render();
    this.bindEvents();
  }

  getDishes() {
    const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
    return [
      {
        id: 'nasi-liwet',
        num: 1,
        title: t('hero.dishNasiLiwet'),
        role: t('hero.dishNasiLiwetRole'),
        desc: t('hero.dishNasiLiwetDesc'),
        region: isEn ? 'Surakarta (Solo) City' : 'Kota Surakarta (Solo)',
        slug: 'nasi-liwet-solo',
        x: '23%',
        y: '58%'
      },
      {
        id: 'garang-asem',
        num: 2,
        title: t('hero.dishGarangAsem'),
        role: t('hero.dishGarangAsemRole'),
        desc: t('hero.dishGarangAsemDesc'),
        region: isEn ? 'Kudus Regency' : 'Kabupaten Kudus',
        slug: 'garang-asem-kudus',
        x: '50%',
        y: '43%'
      },
      {
        id: 'soto-kudus',
        num: 3,
        title: t('hero.dishSotoKudus'),
        role: t('hero.dishSotoKudusRole'),
        desc: t('hero.dishSotoKudusDesc'),
        region: isEn ? 'Kudus Regency' : 'Kabupaten Kudus',
        slug: 'soto-kudus',
        x: '76%',
        y: '56%'
      },
      {
        id: 'mendoan',
        num: 4,
        title: t('hero.dishMendoan'),
        role: t('hero.dishMendoanRole'),
        desc: t('hero.dishMendoanDesc'),
        region: isEn ? 'Banyumas Regency' : 'Kabupaten Banyumas',
        slug: 'mendoan-banyumas',
        x: '51%',
        y: '77%'
      }
    ];
  }

  render() {
    const dishes = this.getDishes();
    const isEn = i18n.getLanguage() === 'en';

    this.container.innerHTML = `
      <div class="relative w-full h-full flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[#D49B42]/35 shadow-lg p-2.5 sm:p-3.5 transition-all duration-300">
        
        <!-- Header Bar: Title, Badge & Royal Guest Note -->
        <div class="z-20 shrink-0 mb-2">
          <div class="flex items-center justify-between gap-2">
            <h3 class="font-editorial-serif text-sm sm:text-base font-bold text-[#120B07] leading-tight">
              ${t('hero.pusakaTitle')}
            </h3>
            <span class="text-[9.5px] sm:text-[10px] font-bold text-[#C84C24] bg-[#FDF4EE] border border-[#C84C24]/20 px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-2xs">
              ${t('hero.pusakaBadge')}
            </span>
          </div>
          <!-- Guest Banquet Description -->
          <p class="text-[10px] sm:text-[11px] text-[#5C3622] leading-relaxed mt-1">
            ${t('hero.pusakaDesc')}
          </p>
        </div>

        <!-- Centerpiece Viewport with 4 Interactive Hotspot Pins -->
        <div id="hero-viewport-area" class="w-full flex-1 relative rounded-xl sm:rounded-2xl overflow-hidden min-h-0 bg-[#120B07] border border-[#D49B42]/30 shadow-inner group select-none flex flex-col">
          <img 
            src="/assets/images/hero/heritage-feast.jpg" 
            alt="${t('hero.pusakaTitle')}" 
            class="w-full h-full object-cover object-center filter brightness-[0.98] transition-transform duration-700 ease-out group-hover:scale-103"
            data-fallback-src="/assets/images/hero/hero-culinary.jpg"
          />

          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25 pointer-events-none"></div>

          <!-- Hotspot Pins -->
          ${dishes.map(dish => `
            <div 
              class="culinary-hotspot" 
              data-dish-id="${dish.id}"
              data-dish-slug="${dish.slug}"
              style="top: ${dish.y}; left: ${dish.x};"
              title="${dish.title} - ${dish.role}"
              role="button"
              tabindex="0"
              aria-label="${dish.title}"
            >
              <div class="culinary-hotspot-pulse"></div>
              <div class="culinary-hotspot-pin">
                ${dish.num}
              </div>
            </div>
          `).join('')}

          <!-- Interactive Dish Popover Card -->
          <div 
            id="hero-dish-popover" 
            class="absolute bottom-2 left-2 right-2 p-3 sm:p-3.5 rounded-xl bg-white/98 backdrop-blur-xl border border-[#D49B42]/60 shadow-xl text-left transition-all duration-300 opacity-0 pointer-events-none translate-y-2 z-30 max-h-[85%] overflow-y-auto"
          >
            <div class="flex items-start justify-between gap-2.5">
              <div class="min-w-0 pr-1">
                <div class="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <span id="popover-dish-region" class="inline-block text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider text-[#C84C24] bg-[#FDF4EE] px-2 py-0.5 rounded-md border border-[#C84C24]/20">
                    ${isEn ? 'Region' : 'Wilayah'}
                  </span>
                  <span id="popover-dish-role" class="inline-block text-[9px] sm:text-[9.5px] font-semibold text-[#5C3622] italic">
                    ${isEn ? 'Banquet Role' : 'Peran Jamuan'}
                  </span>
                </div>
                <h4 id="popover-dish-title" class="font-editorial-serif text-base sm:text-lg font-bold text-[#120B07] leading-tight">
                  Nama Hidangan
                </h4>
                <p id="popover-dish-desc" class="text-[11px] sm:text-xs text-[#5C3622] mt-1 leading-relaxed">
                  Deskripsi
                </p>
              </div>
              <button type="button" id="popover-close-btn" class="text-[#5C3622] hover:text-[#120B07] p-1 font-bold text-base cursor-pointer shrink-0" aria-label="Tutup">&times;</button>
            </div>
            
            <div class="mt-2.5 pt-2 border-t border-[#E8DEC8] flex items-center justify-between gap-2">
              <button 
                type="button" 
                id="popover-open-recipe-btn" 
                class="text-xs font-bold text-white bg-[#C84C24] hover:bg-[#AE3E1B] px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <span>${t('hero.pusakaOpenRecipe')}</span>
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <span class="text-[10px] text-[#2E4D38] font-bold tracking-tight">
                ${isEn ? 'Royal Heritage Recipe' : 'Resep Pusaka Teruji'}
              </span>
            </div>
          </div>

        </div>

        <!-- 4 Quick-Action Dish Chips (Clicking opens Recipe Modal directly) -->
        <div class="grid grid-cols-2 gap-1.5 sm:gap-2 mt-2 shrink-0">
          ${dishes.map(dish => `
            <div 
              data-recipe-slug="${dish.slug}"
              data-dish-id="${dish.id}"
              role="button"
              tabindex="0"
              class="hero-dish-card-chip flex items-center justify-between p-1.5 sm:p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#FDF4EE] border border-[#D49B42]/30 hover:border-[#C84C24] transition-all cursor-pointer text-left group shadow-2xs"
              title="${dish.title}"
            >
              <div class="min-w-0 pr-1">
                <div class="flex items-center gap-1">
                  <span class="text-[9px] font-bold text-[#C84C24] w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#C84C24]/30">${dish.num}</span>
                  <span class="text-[10px] sm:text-[11px] font-bold text-[#120B07] group-hover:text-[#C84C24] transition-colors truncate block leading-tight">${dish.title}</span>
                </div>
                <span class="text-[8.5px] sm:text-[9px] text-[#5C3622] truncate block mt-0.5">${dish.region}</span>
              </div>
              <svg class="w-3.5 h-3.5 text-[#C84C24] shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  bindEvents() {
    const dishes = this.getDishes();
    const viewport = this.container.querySelector('#hero-viewport-area');
    const popover = this.container.querySelector('#hero-dish-popover');
    const popTitle = this.container.querySelector('#popover-dish-title');
    const popDesc = this.container.querySelector('#popover-dish-desc');
    const popRegion = this.container.querySelector('#popover-dish-region');
    const popRole = this.container.querySelector('#popover-dish-role');
    const popOpenBtn = this.container.querySelector('#popover-open-recipe-btn');
    const popClose = this.container.querySelector('#popover-close-btn');

    let currentActiveSlug = '';

    const showDish = (dish) => {
      if (!popover) return;
      currentActiveSlug = dish.slug;
      popTitle.textContent = dish.title;
      popDesc.textContent = dish.desc;
      popRegion.textContent = dish.region;
      popRole.textContent = dish.role;
      popover.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
      popover.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');

      viewport?.querySelectorAll('.culinary-hotspot').forEach(pin => {
        pin.classList.toggle('active', pin.getAttribute('data-dish-id') === dish.id);
      });
    };

    const hideDish = () => {
      if (!popover) return;
      popover.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
      popover.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      viewport?.querySelectorAll('.culinary-hotspot').forEach(pin => pin.classList.remove('active'));
    };

    // Hotspot pin click listener: show popover and allow quick opening
    viewport?.querySelectorAll('.culinary-hotspot').forEach(pin => {
      const dishId = pin.getAttribute('data-dish-id');
      const dish = dishes.find(d => d.id === dishId);
      if (dish) {
        pin.addEventListener('click', (e) => {
          e.stopPropagation();
          showDish(dish);
        });

        // Keydown support for accessibility
        pin.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            openRecipeModal(dish.slug);
          }
        });
      }
    });

    // Popover "Open Full Recipe" button
    popOpenBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentActiveSlug) {
        openRecipeModal(currentActiveSlug);
      }
    });

    // Close button
    popClose?.addEventListener('click', (e) => {
      e.stopPropagation();
      hideDish();
    });

    // Click outside popover in viewport hides it
    viewport?.addEventListener('click', (e) => {
      if (!e.target.closest('#hero-dish-popover') && !e.target.closest('.culinary-hotspot')) {
        hideDish();
      }
    });

    // 4 quick-action chips directly open the Recipe Modal popup
    this.container.querySelectorAll('.hero-dish-card-chip').forEach(chip => {
      const slug = chip.getAttribute('data-recipe-slug');
      if (slug) {
        chip.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openRecipeModal(slug);
        });

        chip.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            openRecipeModal(slug);
          }
        });
      }
    });
  }

  dispose() {
    this.isDisposed = true;
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
