import { t, i18n } from '../i18n/index.js';

/**
 * Premium Interactive Culinary Heritage Showcase
 * 
 * Replaces previous 3D model presentations with authentic, high-definition
 * editorial culinary photography and interactive dish hotspots:
 * 1. Mode 'feast': High-resolution culinary photograph of an authentic Central Javanese banquet
 *    with interactive hotspot pins revealing cultural dish insights.
 * 2. Mode 'gudeg': Authentic Gudeg Komplit served in traditional Kasongan earthenware clay (gerabah)
 *    and fresh banana leaf, with interactive hotspots identifying the 5 key culinary components.
 * 
 * Fully responsive, bilingual (ID & EN), and performant with zero WebGL overhead.
 */

export class ThreeHeroShowcase {
  constructor(containerElement) {
    this.container = containerElement;
    this.currentMode = 'gudeg'; // 'gudeg' (Pusaka Gerabah & Gudeg) | 'feast' (Jamuan Pusaka)
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
      <div class="relative w-full h-full flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-b from-[#FAF6EF] via-white to-[#F2E8D8] border border-[#E5D9C5] shadow-xl p-3 sm:p-4 transition-all duration-300">
        
        <!-- Header Controls: Mode Selector & Status -->
        <div class="flex items-center justify-between z-20 gap-2 mb-2.5">
          <!-- Dual-Mode Tabs -->
          <div class="inline-flex p-1 rounded-full bg-[#FAF6EF] border border-[#E5D9C5] shadow-xs text-xs font-bold text-[#654332] max-w-full">
            <button type="button" id="hero-tab-gudeg" class="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all bg-[#B85C38] text-white shadow-xs flex items-center gap-1 sm:gap-1.5 cursor-pointer text-[11px] sm:text-xs shrink-0 font-bold">
              <span>🏺</span>
              <span class="truncate">${isEn ? 'Pusaka Gerabah' : 'Gudeg Gerabah'}</span>
            </button>
            <button type="button" id="hero-tab-feast" class="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all text-[#654332] hover:text-[#B85C38] flex items-center gap-1 sm:gap-1.5 cursor-pointer text-[11px] sm:text-xs shrink-0 font-bold">
              <span>🍲</span>
              <span class="truncate">${t('hero.tabFeast')}</span>
            </button>
          </div>

          <!-- Dynamic Hint / Action Badge -->
          <div id="hero-showcase-hint" class="text-[11px] font-semibold text-[#654332] bg-white/90 px-3 py-1 rounded-full border border-[#E5D9C5] backdrop-blur-xs shadow-2xs hidden sm:flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[#B85C38] animate-pulse"></span>
            <span id="hero-hint-text">${isEn ? 'Tap pins to explore dish elements' : 'Sentuh titik untuk menelaah racikan'}</span>
          </div>
        </div>

        <!-- Center Viewport Area -->
        <div id="hero-viewport-area" class="w-full flex-1 relative rounded-2xl overflow-hidden min-h-[300px] sm:min-h-[340px] bg-[#FAF6EF] border border-[#E5D9C5]/50"></div>

        <!-- Footer Caption Bar -->
        <div id="hero-footer-caption" class="z-20 mt-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs text-[#654332] bg-white/95 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[#E5D9C5] shadow-xs">
          <div class="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span class="w-2 h-2 rounded-full bg-[#C49A58] shrink-0"></span>
            <span class="font-bold text-[#302018] truncate text-[11px] sm:text-xs" id="hero-caption-title">
              ${isEn ? 'Gudeg Komplit in Traditional Earthenware' : 'Gudeg Komplit Kendhi Gerabah Kasongan'}
            </span>
          </div>
          <span class="text-[10px] sm:text-[11px] text-[#777B52] italic font-medium shrink-0" id="hero-caption-subtitle">
            ${isEn ? 'Authentic Central Javanese Heritage' : 'Pusaka Dapur Autentik Jawa Tengah'}
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
    const subEl = this.container.querySelector('#hero-caption-subtitle');
    const viewport = this.container.querySelector('#hero-viewport-area');

    if (!viewport) return;

    const activeBtnClass = 'px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all bg-[#B85C38] text-white shadow-xs flex items-center gap-1 sm:gap-1.5 cursor-pointer font-bold text-[11px] sm:text-xs shrink-0';
    const inactiveBtnClass = 'px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all text-[#654332] hover:text-[#B85C38] flex items-center gap-1 sm:gap-1.5 cursor-pointer font-bold text-[11px] sm:text-xs shrink-0';

    if (mode === 'gudeg') {
      if (btnGudeg) btnGudeg.className = activeBtnClass;
      if (btnFeast) btnFeast.className = inactiveBtnClass;
      if (hintEl) hintEl.textContent = isEn ? 'Tap pins to explore Gudeg elements' : 'Sentuh titik untuk menelaah elemen Gudeg';
      if (titleEl) titleEl.textContent = isEn ? 'Gudeg Komplit in Traditional Earthenware' : 'Gudeg Komplit Kendhi Gerabah Kasongan';
      if (subEl) subEl.textContent = isEn ? 'Surakarta & Yogyakarta Heritage' : 'Warisan Dapur Surakarta & Jogja';

      this.renderGudegShowcase(viewport);
    } else {
      if (btnGudeg) btnGudeg.className = inactiveBtnClass;
      if (btnFeast) btnFeast.className = activeBtnClass;
      if (hintEl) hintEl.textContent = t('hero.feastSubtitle');
      if (titleEl) titleEl.textContent = t('hero.feastTitle');
      if (subEl) subEl.textContent = t('hero.feastSubtitle');

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
        title: isEn ? 'Slow-cooked Young Jackfruit (Gudeg)' : 'Gori / Nangka Muda Bacem',
        desc: isEn 
          ? 'Tender young jackfruit simmered for hours with coconut sugar, bay leaves, teak leaves, and rich spices until mahogany-dark and melt-in-the-mouth.'
          : 'Nangka muda serat padat yang diungkep perlahan bersama gula jawa, daun salam, daun jati, dan rempah harum hingga berwarna merah kecokelatan meresap.',
        role: isEn ? 'Heart of the Dish' : 'Ruh Masakan',
        x: '43%',
        y: '68%'
      },
      {
        id: 'areh',
        title: isEn ? 'Velvety Coconut Cream Curd (Areh)' : 'Areh Santan Kental Gurih',
        desc: isEn 
          ? 'First-press coconut milk reduced over low firewood embers into a silky, savory cloud curd that balances the sweet jackfruit.'
          : 'Santan kelapa kental perasan pertama yang dimasak perlahan hingga membentuk dadih putih lembut penyeimbang rasa manis gurih.',
        role: isEn ? 'Savory Emulsion' : 'Kekayaan Rasa',
        x: '46%',
        y: '57%'
      },
      {
        id: 'ayam',
        title: isEn ? 'Braised Free-range Chicken (Ayam Bacem)' : 'Ayam Kampung Bacem Gurih',
        desc: isEn 
          ? 'Local free-range chicken drumstick braised with coriander, shallots, garlic, and coconut sugar until deeply infused.'
          : 'Ayam kampung asli bertekstur kenyal empuk yang diungkep dengan ketumbar sangrai, bawang putih, dan gula nira kelapa murni.',
        role: isEn ? 'Signature Protein' : 'Lauk Utama',
        x: '44%',
        y: '42%'
      },
      {
        id: 'telur',
        title: isEn ? 'Marbled Braised Duck Egg (Telur Pindang)' : 'Telur Bebek Pindang Bacem',
        desc: isEn 
          ? 'Rich duck egg boiled and braised with shallot skins and guava leaves, producing a dark mahogany marbled gloss and dense yolk.'
          : 'Telur bebek pilihan yang dimasak bersama kulit bawang dan daun jambu batu, menghasilkan warna cokelat gelap mengilat dan kuning telur gurih.',
        role: isEn ? 'Traditional Complement' : 'Lauk Wajib',
        x: '31%',
        y: '56%'
      },
      {
        id: 'krecek',
        title: isEn ? 'Spicy Cattle Skin Stew (Sambal Krecek)' : 'Sambal Goreng Krecek Kulit Sapi',
        desc: isEn 
          ? 'Chewy dried cattle skin cracklings simmered in fiery red chili sauce with whole bird\'s eye chilies to cut through the sweetness.'
          : 'Kerupuk kulit sapi kenyal yang dimasak dalam kuah santan cabai merah pedas bertabur rawit utuh, pemberi sengatan pedas penyeimbang manis.',
        role: isEn ? 'Fiery Balance' : 'Sengatan Pedas',
        x: '66%',
        y: '64%'
      }
    ];

    viewport.innerHTML = `
      <div class="relative w-full h-full rounded-2xl overflow-hidden group select-none bg-[#302018]">
        <!-- High-res Gudeg Photograph -->
        <img 
          src="/assets/images/hero/pusaka-gerabah-gudeg.jpg" 
          alt="Gudeg Komplit Gerabah Tradisional" 
          class="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-102"
          onerror="this.src='/assets/images/recipes/gudeg-komplit.jpg'"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none"></div>

        <!-- Gerabah & Banana Leaf Heritage Badge -->
        <div class="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 flex items-center gap-1.5 bg-[#302018]/85 text-[#FAF6EF] px-2.5 sm:px-3 py-1 rounded-full border border-[#C49A58]/40 backdrop-blur-md shadow-md text-[9px] sm:text-[10px] font-bold max-w-[calc(100%-1.5rem)]">
          <span class="text-[#C49A58] shrink-0">🏺</span>
          <span class="truncate">${isEn ? 'Plated on Kasongan Earthenware' : 'Disajikan di Gerabah Kasongan'}</span>
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
          class="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 p-3 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#C49A58]/50 shadow-2xl text-left transition-all duration-300 opacity-0 pointer-events-none translate-y-2 z-30 max-h-[85%] overflow-y-auto"
        >
          <div class="flex items-start justify-between gap-2">
            <div>
              <span id="gudeg-popover-role" class="inline-block text-[10px] font-bold uppercase tracking-wider text-[#B85C38] bg-[#F2E8D8] px-2.5 py-0.5 rounded-md mb-1 border border-[#C49A58]/20">
                Peran Rasa
              </span>
              <h4 id="gudeg-popover-title" class="font-editorial-serif text-base font-bold text-[#302018] leading-tight">
                Nama Elemen
              </h4>
              <p id="gudeg-popover-desc" class="text-xs text-[#654332] mt-1.5 leading-relaxed">
                Deskripsi
              </p>
            </div>
            <button type="button" id="gudeg-popover-close" class="text-[#654332] hover:text-[#302018] p-1 font-bold text-base cursor-pointer shrink-0">&times;</button>
          </div>
          <div class="mt-3 pt-2.5 border-t border-[#E5D9C5] flex items-center justify-between">
            <a href="#/resep/gudeg-komplit" class="text-xs font-bold text-[#B85C38] hover:text-[#A04A27] flex items-center gap-1.5">
              <span>${isEn ? 'View Full Gudeg Recipe' : 'Lihat Resep Lengkap Gudeg'}</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <span class="text-[10px] text-[#777B52] italic">${isEn ? 'Heritage Earthenware Plating' : 'Peranti Tradisi Gerabah'}</span>
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
   * MODE 2: INTERACTIVE PHOTOGRAPHIC CULINARY FEAST & HOTSPOTS
   * ----------------------------------------------------------- */
  renderFeastShowcase(viewport) {
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
      <div class="relative w-full h-full rounded-2xl overflow-hidden group select-none bg-[#302018]">
        <!-- High-res Feast Photograph -->
        <img 
          src="/assets/images/hero/hero-culinary.jpg" 
          alt="Jamuan Pusaka Jawa Tengah" 
          class="w-full h-full object-cover object-center filter brightness-[0.98] transition-transform duration-700 ease-out group-hover:scale-102"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none"></div>

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
          class="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 p-3 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#C49A58]/50 shadow-2xl text-left transition-all duration-300 opacity-0 pointer-events-none translate-y-2 z-30 max-h-[85%] overflow-y-auto"
        >
          <div class="flex items-start justify-between gap-2">
            <div>
              <span id="popover-dish-region" class="inline-block text-[10px] font-bold uppercase tracking-wider text-[#B85C38] bg-[#F2E8D8] px-2.5 py-0.5 rounded-md mb-1 border border-[#C49A58]/20">
                Wilayah
              </span>
              <h4 id="popover-dish-title" class="font-editorial-serif text-base font-bold text-[#302018] leading-tight">
                Nama Hidangan
              </h4>
              <p id="popover-dish-desc" class="text-xs text-[#654332] mt-1.5 leading-relaxed">
                Deskripsi
              </p>
            </div>
            <button type="button" id="popover-close-btn" class="text-[#654332] hover:text-[#302018] p-1 font-bold text-base cursor-pointer shrink-0">&times;</button>
          </div>
          <div class="mt-3 pt-2.5 border-t border-[#E5D9C5] flex items-center justify-between">
            <a id="popover-dish-link" href="#/resep" class="text-xs font-bold text-[#B85C38] hover:text-[#A04A27] flex items-center gap-1.5">
              <span>${t('recipesSection.viewRecipeBtn')}</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <span class="text-[10px] text-[#777B52] italic font-medium">${t('hero.canvasBadge')}</span>
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
