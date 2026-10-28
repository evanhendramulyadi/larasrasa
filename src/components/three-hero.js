import { t, i18n } from '../i18n/index.js';

/**
 * Premium Interactive Culinary Heritage Showcase
 * Mode 'gudeg': Authentic Gudeg Komplit in Kasongan earthenware clay (gerabah) with 5 culinary hotspots.
 * Mode 'feast': Traditional Central Javanese banquet with iconic regional dish hotspots.
 */

export class ThreeHeroShowcase {
  constructor(containerElement) {
    this.container = containerElement;
    this.currentMode = 'gudeg'; // 'gudeg' | 'feast'
    this.isDisposed = false;
  }

  init() {
    if (!this.container) return;
    this.renderOuterLayout();
    this.switchMode(this.currentMode);
  }

  renderOuterLayout() {
    const isEn = i18n.getLanguage() === 'en';

    this.container.innerHTML = `
      <div class="relative w-full h-full flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-b from-[#FAF7F2] via-white to-[#F5EFEB] border border-[#D49B42]/40 shadow-xl p-3.5 sm:p-5 transition-all duration-300">
        
        <!-- Header Controls: Mode Selector & Status -->
        <div class="flex items-center justify-between z-20 gap-2 mb-3">
          <!-- Dual-Mode Tabs -->
          <div class="inline-flex p-1 rounded-full bg-[#EFE8DA] border border-[#D49B42]/30 shadow-inner text-xs font-bold text-[#5C3622] shrink-0">
            <button type="button" id="hero-tab-gudeg" class="px-3 sm:px-4 py-1.5 rounded-full transition-all bg-[#C84C24] text-white shadow-xs flex items-center gap-1.5 cursor-pointer text-[11px] sm:text-xs shrink-0 font-bold">
              <span>🏺</span>
              <span>${t('hero.tab3d')}</span>
            </button>
            <button type="button" id="hero-tab-feast" class="px-3 sm:px-4 py-1.5 rounded-full transition-all text-[#5C3622] hover:text-[#C84C24] flex items-center gap-1.5 cursor-pointer text-[11px] sm:text-xs shrink-0 font-bold">
              <span>🍲</span>
              <span>${t('hero.tabFeast')}</span>
            </button>
          </div>

          <!-- Dynamic Hint / Action Badge -->
          <div id="hero-showcase-hint" class="text-[11px] font-bold text-[#5C3622] bg-white/95 px-3 py-1.5 rounded-full border border-[#D49B42]/40 backdrop-blur-md shadow-xs hidden sm:flex items-center gap-1.5 whitespace-nowrap shrink-0">
            <span class="w-2 h-2 rounded-full bg-[#C84C24] animate-pulse shrink-0"></span>
            <span id="hero-hint-text">${t('hero.canvasHint')}</span>
          </div>
        </div>

        <!-- Center Viewport Area -->
        <div id="hero-viewport-area" class="w-full flex-1 relative rounded-2xl overflow-hidden min-h-[320px] sm:min-h-[360px] bg-[#FAF7F2] border border-[#D49B42]/30 shadow-inner"></div>

        <!-- Footer Caption Bar -->
        <div id="hero-footer-caption" class="z-20 mt-3 flex items-center gap-2 text-xs text-[#5C3622] bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#D49B42]/35 shadow-xs">
          <span class="w-2.5 h-2.5 rounded-full bg-[#D49B42] shrink-0 animate-pulse"></span>
          <span class="font-bold text-[#120B07] text-xs sm:text-sm font-editorial-serif tracking-wide" id="hero-caption-title">
            ${t('hero.canvasTitle')}
          </span>
        </div>

      </div>
    `;

    // Wire mode buttons
    const btnGudeg = this.container.querySelector('#hero-tab-gudeg');
    const btnFeast = this.container.querySelector('#hero-tab-feast');

    if (btnGudeg && btnFeast) {
      btnGudeg.onclick = () => this.switchMode('gudeg');
      btnFeast.onclick = () => this.switchMode('feast');
    }
  }

  switchMode(mode) {
    this.currentMode = mode;
    const isEn = i18n.getLanguage() === 'en';

    const btnGudeg = this.container.querySelector('#hero-tab-gudeg');
    const btnFeast = this.container.querySelector('#hero-tab-feast');
    const hintEl = this.container.querySelector('#hero-hint-text');
    const titleEl = this.container.querySelector('#hero-caption-title');
    const viewport = this.container.querySelector('#hero-viewport-area');

    if (!viewport) return;

    const activeBtnClass = 'px-3 sm:px-4 py-1.5 rounded-full transition-all bg-[#C84C24] text-white shadow-xs flex items-center gap-1.5 cursor-pointer font-bold text-[11px] sm:text-xs shrink-0';
    const inactiveBtnClass = 'px-3 sm:px-4 py-1.5 rounded-full transition-all text-[#5C3622] hover:text-[#C84C24] flex items-center gap-1.5 cursor-pointer font-bold text-[11px] sm:text-xs shrink-0';

    if (mode === 'gudeg') {
      if (btnGudeg) btnGudeg.className = activeBtnClass;
      if (btnFeast) btnFeast.className = inactiveBtnClass;
      if (hintEl) hintEl.textContent = t('hero.canvasHint');
      if (titleEl) titleEl.textContent = t('hero.canvasTitle');

      this.renderGudegShowcase(viewport);
    } else {
      if (btnGudeg) btnGudeg.className = inactiveBtnClass;
      if (btnFeast) btnFeast.className = activeBtnClass;
      if (hintEl) hintEl.textContent = t('hero.canvasHint');
      if (titleEl) titleEl.textContent = t('hero.feastTitle');

      this.renderFeastShowcase(viewport);
    }
  }

  /* -------------------------------------------------------------
   * MODE 1: PUSAKA GERABAH & GUDEG KOMPLIT SHOWCASE
   * ----------------------------------------------------------- */
  renderGudegShowcase(viewport) {
    const isEn = i18n.getLanguage() === 'en';

    const hotspots = [
      {
        id: 'gori',
        title: isEn ? 'Slow-braised Young Jackfruit (Gudeg)' : 'Gori / Nangka Muda Bacem',
        desc: isEn 
          ? 'Young jackfruit simmered for hours with coconut palm sugar, bay leaves, teak leaves, and aromatic spices until rich mahogany and melt-in-the-mouth.'
          : 'Nangka muda serat padat yang diungkep perlahan bersama gula kelapa, daun jati, dan rempah aromatik hingga empuk meresap kecokelatan.',
        role: isEn ? 'Core Dish' : 'Inti Masakan',
        x: '43%',
        y: '68%'
      },
      {
        id: 'areh',
        title: isEn ? 'Velvety Coconut Cream Curd (Areh)' : 'Areh Santan Kanil Gurih',
        desc: isEn 
          ? 'First-press coconut milk reduced over low firewood embers into a silky, savory cloud curd that balances sweet jackfruit.'
          : 'Santan kelapa kental (kanil) perasan pertama yang dimasak perlahan hingga menghasilkan dadih putih gurih lembut penyeimbang rasa manis.',
        role: isEn ? 'Savory Balance' : 'Penyeimbang Gurih',
        x: '46%',
        y: '57%'
      },
      {
        id: 'ayam',
        title: isEn ? 'Braised Free-range Chicken (Ayam Bacem)' : 'Ayam Kampung Opor Bacem',
        desc: isEn 
          ? 'Local free-range chicken drumstick braised with coriander, shallots, garlic, and coconut sugar until deeply infused.'
          : 'Ayam kampung asli empuk bumbu bacem ketumbar sangrai, bawang merah, bawang putih, dan gula kelapa alami.',
        role: isEn ? 'Signature Protein' : 'Lauk Utama',
        x: '44%',
        y: '42%'
      },
      {
        id: 'telur',
        title: isEn ? 'Marbled Braised Duck Egg (Telur Pindang)' : 'Telur Bebek Pindang Bacem',
        desc: isEn 
          ? 'Rich duck egg boiled and braised with shallot skins and guava leaves, producing a dark mahogany marbled gloss and dense yolk.'
          : 'Telur bebek pilihan yang direbus dan dibacem bersama daun jambu biji, menghasilkan semburat cokelat marmer berkilau dan rasa gurih mantap.',
        role: isEn ? 'Traditional Complement' : 'Lauk Tradisi',
        x: '31%',
        y: '56%'
      },
      {
        id: 'krecek',
        title: isEn ? 'Spicy Cattle Skin Stew (Sambal Krecek)' : 'Sambal Goreng Krecek Kulit Sapi',
        desc: isEn 
          ? 'Chewy dried cattle skin cracklings simmered in fiery red chili sauce with whole bird\'s eye chilies to cut through the sweetness.'
          : 'Krecek kulit sapi kenyal gurih yang dimasak dalam kuah santan cabai merah dan rawit utuh, memberi sentuhan pedas menyegarkan.',
        role: isEn ? 'Fiery Kick' : 'Aksen Pedas Segar',
        x: '66%',
        y: '64%'
      }
    ];

    viewport.innerHTML = `
      <div class="relative w-full h-full rounded-2xl overflow-hidden group select-none bg-[#120B07]">
        <!-- High-res Gudeg Photograph -->
        <img 
          src="/assets/images/hero/pusaka-gerabah-gudeg.jpg" 
          alt="Gudeg Komplit Gerabah Kasongan" 
          class="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-103"
          onerror="this.src='/assets/images/recipes/gudeg-komplit.jpg'"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

        <!-- Gerabah & Banana Leaf Heritage Badge -->
        <div class="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#120B07]/90 text-[#FAF7F2] px-3 py-1.5 rounded-full border border-[#D49B42]/50 backdrop-blur-md shadow-lg text-[10px] font-bold">
          <span class="text-[#D49B42] shrink-0">🏺</span>
          <span>${isEn ? 'Plated on Kasongan Earthenware' : 'Disajikan di Gerabah Kasongan'}</span>
        </div>

        <!-- Hotspot Pins -->
        ${hotspots.map((item, i) => `
          <div 
            class="culinary-hotspot" 
            data-gudeg-id="${item.id}"
            style="top: ${item.y}; left: ${item.x};"
            title="${item.title}"
          >
            <div class="culinary-hotspot-pulse"></div>
            <div class="culinary-hotspot-pin">
              ${i + 1}
            </div>
          </div>
        `).join('')}

        <!-- Interactive Popover Card -->
        <div 
          id="gudeg-hotspot-popover" 
          class="absolute bottom-3 left-3 right-3 p-4 rounded-2xl bg-white/98 backdrop-blur-xl border border-[#D49B42]/60 shadow-2xl text-left transition-all duration-300 opacity-0 pointer-events-none translate-y-2 z-30 max-h-[85%] overflow-y-auto"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <span id="gudeg-popover-role" class="inline-block text-[10px] font-bold uppercase tracking-wider text-[#C84C24] bg-[#FDF4EE] px-2.5 py-0.5 rounded-md mb-1 border border-[#C84C24]/20">
                Peran Rasa
              </span>
              <h4 id="gudeg-popover-title" class="font-editorial-serif text-lg font-bold text-[#120B07] leading-tight">
                Nama Elemen
              </h4>
              <p id="gudeg-popover-desc" class="text-xs text-[#5C3622] mt-1.5 leading-relaxed">
                Deskripsi
              </p>
            </div>
            <button type="button" id="gudeg-popover-close" class="text-[#5C3622] hover:text-[#120B07] p-1 font-bold text-lg cursor-pointer shrink-0">&times;</button>
          </div>
          <div class="mt-3 pt-2.5 border-t border-[#E8DEC8] flex items-center justify-between">
            <a href="#/resep/gudeg-komplit" class="text-xs font-bold text-[#C84C24] hover:text-[#AE3E1B] flex items-center gap-1.5">
              <span>${isEn ? 'View Full Recipe' : 'Lihat Resep Lengkap'}</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <span class="text-[10px] text-[#2E4D38] font-bold">${isEn ? 'Kasongan Earthenware' : 'Gerabah Tradisional Kasongan'}</span>
          </div>
        </div>

      </div>
    `;

    const popover = viewport.querySelector('#gudeg-hotspot-popover');
    const popTitle = viewport.querySelector('#gudeg-popover-title');
    const popDesc = viewport.querySelector('#gudeg-popover-desc');
    const popRole = viewport.querySelector('#gudeg-popover-role');
    const popClose = viewport.querySelector('#gudeg-popover-close');

    const showHotspot = (item) => {
      if (!popover) return;
      popTitle.textContent = item.title;
      popDesc.textContent = item.desc;
      popRole.textContent = item.role;
      popover.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
      popover.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');

      viewport.querySelectorAll('.culinary-hotspot').forEach(pin => {
        pin.classList.toggle('active', pin.getAttribute('data-gudeg-id') === item.id);
      });
    };

    const hideHotspot = () => {
      if (!popover) return;
      popover.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
      popover.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      viewport.querySelectorAll('.culinary-hotspot').forEach(pin => pin.classList.remove('active'));
    };

    viewport.querySelectorAll('.culinary-hotspot').forEach(pin => {
      const id = pin.getAttribute('data-gudeg-id');
      const item = hotspots.find(h => h.id === id);
      if (item) {
        pin.addEventListener('click', (e) => {
          e.stopPropagation();
          showHotspot(item);
        });
      }
    });

    popClose?.addEventListener('click', (e) => {
      e.stopPropagation();
      hideHotspot();
    });

    viewport.addEventListener('click', (e) => {
      if (!e.target.closest('#gudeg-hotspot-popover')) {
        hideHotspot();
      }
    });
  }

  /* -------------------------------------------------------------
   * MODE 2: INTERACTIVE BANQUET FEAST SHOWCASE
   * ----------------------------------------------------------- */
  renderFeastShowcase(viewport) {
    const isEn = i18n.getLanguage() === 'en';

    const dishes = [
      {
        id: 'nasi-liwet',
        title: t('hero.dishNasiLiwet'),
        desc: t('hero.dishNasiLiwetDesc'),
        region: 'Surakarta (Solo)',
        slug: 'nasi-liwet-solo',
        x: '48%',
        y: '48%'
      },
      {
        id: 'garang-asem',
        title: t('hero.dishGarangAsem'),
        desc: t('hero.dishGarangAsemDesc'),
        region: 'Pekalongan & Kudus',
        slug: 'garang-asem-kudus',
        x: '76%',
        y: '54%'
      },
      {
        id: 'soto-kudus',
        title: t('hero.dishSotoKudus'),
        desc: t('hero.dishSotoKudusDesc'),
        region: 'Kudus',
        slug: 'soto-kudus',
        x: '38%',
        y: '72%'
      },
      {
        id: 'mendoan',
        title: t('hero.dishMendoan'),
        desc: t('hero.dishMendoanDesc'),
        region: 'Banyumas',
        slug: 'mendoan-banyumas',
        x: '63%',
        y: '72%'
      }
    ];

    viewport.innerHTML = `
      <div class="relative w-full h-full rounded-2xl overflow-hidden group select-none bg-[#120B07]">
        <!-- High-res Feast Photograph -->
        <img 
          src="/assets/images/hero/hero-culinary.jpg" 
          alt="Jamuan Pusaka Jawa Tengah" 
          class="w-full h-full object-cover object-center filter brightness-[0.98] transition-transform duration-700 ease-out group-hover:scale-103"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none"></div>

        <!-- Hotspot Pins -->
        ${dishes.map((dish, i) => `
          <div 
            class="culinary-hotspot" 
            data-dish-id="${dish.id}"
            style="top: ${dish.y}; left: ${dish.x};"
            title="${dish.title}"
          >
            <div class="culinary-hotspot-pulse"></div>
            <div class="culinary-hotspot-pin">
              ${i + 1}
            </div>
          </div>
        `).join('')}

        <!-- Interactive Popover Card -->
        <div 
          id="feast-hotspot-popover" 
          class="absolute bottom-3 left-3 right-3 p-4 rounded-2xl bg-white/98 backdrop-blur-xl border border-[#D49B42]/60 shadow-2xl text-left transition-all duration-300 opacity-0 pointer-events-none translate-y-2 z-30 max-h-[85%] overflow-y-auto"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <span id="popover-dish-region" class="inline-block text-[10px] font-bold uppercase tracking-wider text-[#C84C24] bg-[#FDF4EE] px-2.5 py-0.5 rounded-md mb-1 border border-[#C84C24]/20">
                Wilayah
              </span>
              <h4 id="popover-dish-title" class="font-editorial-serif text-lg font-bold text-[#120B07] leading-tight">
                Nama Hidangan
              </h4>
              <p id="popover-dish-desc" class="text-xs text-[#5C3622] mt-1.5 leading-relaxed">
                Deskripsi
              </p>
            </div>
            <button type="button" id="popover-close-btn" class="text-[#5C3622] hover:text-[#120B07] p-1 font-bold text-lg cursor-pointer shrink-0">&times;</button>
          </div>
          <div class="mt-3 pt-2.5 border-t border-[#E8DEC8] flex items-center justify-between">
            <a id="popover-dish-link" href="#/resep" class="text-xs font-bold text-[#C84C24] hover:text-[#AE3E1B] flex items-center gap-1.5">
              <span>${t('recipesSection.viewRecipeBtn')}</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <span class="text-[10px] text-[#2E4D38] font-bold">${t('hero.canvasBadge')}</span>
          </div>
        </div>

      </div>
    `;

    const popover = viewport.querySelector('#feast-hotspot-popover');
    const popTitle = viewport.querySelector('#popover-dish-title');
    const popDesc = viewport.querySelector('#popover-dish-desc');
    const popRegion = viewport.querySelector('#popover-dish-region');
    const popLink = viewport.querySelector('#popover-dish-link');
    const popClose = viewport.querySelector('#popover-close-btn');

    const showDish = (dish) => {
      if (!popover) return;
      popTitle.textContent = dish.title;
      popDesc.textContent = dish.desc;
      popRegion.textContent = dish.region;
      popLink.href = `#/resep/${dish.slug}`;
      popover.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
      popover.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');

      viewport.querySelectorAll('.culinary-hotspot').forEach(pin => {
        pin.classList.toggle('active', pin.getAttribute('data-dish-id') === dish.id);
      });
    };

    const hideDish = () => {
      if (!popover) return;
      popover.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
      popover.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      viewport.querySelectorAll('.culinary-hotspot').forEach(pin => pin.classList.remove('active'));
    };

    viewport.querySelectorAll('.culinary-hotspot').forEach(pin => {
      const dishId = pin.getAttribute('data-dish-id');
      const dish = dishes.find(d => d.id === dishId);
      if (dish) {
        pin.addEventListener('click', (e) => {
          e.stopPropagation();
          showDish(dish);
        });
      }
    });

    popClose?.addEventListener('click', (e) => {
      e.stopPropagation();
      hideDish();
    });

    viewport.addEventListener('click', (e) => {
      if (!e.target.closest('#feast-hotspot-popover')) {
        hideDish();
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
