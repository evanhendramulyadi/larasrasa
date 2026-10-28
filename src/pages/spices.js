import { spiceService, localizeSpice } from '../services/spiceService.js';
import { spices } from '../data/spices.js';
import { i18n, t } from '../i18n/index.js';

export { localizeSpice };

/**
 * Jelajah Rempah (Curated Macro Culinary Spice Exhibition)
 * Full-width catalog and interactive pop-up modal exhibition.
 */

let activeCategory = 'semua';

export async function renderSpicesPage() {
  const categories = [
    { id: 'semua', label: t('spicesSection.catAll') || 'Semua Rempah' },
    { id: 'aromatik', label: t('spicesSection.catAromatic') || 'Aromatik Pokok' },
    { id: 'rimpang', label: t('spicesSection.catRhizome') || 'Rimpang Hangat' },
    { id: 'biji', label: t('spicesSection.catSeed') || 'Biji Sangrai' },
    { id: 'daun', label: t('spicesSection.catLeaf') || 'Daun & Batang' },
    { id: 'asam', label: t('spicesSection.catAcid') || 'Asam & Manis Alami' }
  ];

  const localizedSpices = await spiceService.getSpices('semua');

  const filteredSpices = activeCategory === 'semua'
    ? localizedSpices
    : localizedSpices.filter(s => s.category === activeCategory);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
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

      <!-- Filter Category Pills and Count Bar -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-[#D49B42]/20">
        <!-- Category Filter Pills -->
        <div class="flex flex-wrap items-center gap-2">
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

        <div class="text-xs font-bold text-[#2E4D38] flex items-center gap-2 shrink-0">
          <span class="inline-block w-2 h-2 rounded-full bg-[#C84C24]"></span>
          <span>${filteredSpices.length} ${t('spicesSection.availableCount')}</span>
        </div>
      </div>

      <!-- Full-Width Responsive Catalog Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        ${filteredSpices.map(spice => `
          <div 
            data-spice-id="${spice.id}"
            role="button"
            tabindex="0"
            class="spice-card group p-4 rounded-3xl bg-white border border-[#D49B42]/30 hover:border-[#C84C24] cursor-pointer transition-all duration-300 card-hover-lift shadow-xs hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              <div class="relative w-full aspect-4/3 rounded-2xl overflow-hidden mb-3 bg-[#FAF7F2] border border-[#E8DEC8]">
                <img src="${spice.image}" 
                     alt="${spice.name}" 
                     class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" 
                     loading="lazy"
                     onerror="this.src='/assets/images/hero/hero-culinary.jpg'"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <span class="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-[#120B07]/85 text-[10px] font-bold text-[#FAF7F2] backdrop-blur-md border border-[#D49B42]/30">
                  ${spice.categoryName}
                </span>
              </div>
              
              <h3 class="font-editorial-serif text-lg font-bold text-[#120B07] group-hover:text-[#C84C24] transition-colors leading-snug">
                ${spice.name}
              </h3>
              <p class="text-xs italic text-[#2E4D38] mb-2 font-mono font-semibold">
                ${spice.latinName}
              </p>
              <p class="text-xs text-[#5C3622] line-clamp-2 leading-relaxed">
                ${spice.role}
              </p>
            </div>

            <div class="pt-3 border-t border-[#E8DEC8] mt-4 flex items-center justify-between">
              <span class="text-xs font-bold text-[#C84C24] group-hover:text-[#AE3E1B] flex items-center gap-1.5 transition-colors">
                <span>${t('spicesSection.inspectBtn') || 'Lihat Rahasia Rempah'}</span>
                <span class="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Pop-up Modal Container Root -->
      <div id="spice-modal-root"></div>

    </div>
  `;
}

function renderSpiceModal(spice) {
  if (!spice) return '';
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';

  return `
    <div id="spice-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/70 backdrop-blur-sm spice-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-spice-title">
      <div id="spice-modal-dialog" class="relative w-full max-w-4xl lg:max-w-5xl bg-white rounded-3xl shadow-2xl border-2 border-[#D49B42]/40 overflow-hidden my-auto spice-modal-card">
        
        <!-- Close Button (X) -->
        <button type="button" 
                id="close-spice-modal-btn" 
                class="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg" 
                aria-label="${t('spicesSection.closeModal') || 'Tutup'}">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Modal Header with Panoramic Macro Image -->
        <div class="relative w-full h-36 sm:h-44 overflow-hidden bg-[#120B07]">
          <img src="${spice.image}" 
               alt="${spice.name}" 
               class="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
               onerror="this.src='/assets/images/hero/hero-culinary.jpg'"/>
          <div class="absolute inset-0 bg-gradient-to-t from-[#120B07] via-black/45 to-transparent"></div>
          
          <div class="absolute bottom-3 sm:bottom-4 left-5 sm:left-6 right-14 text-white space-y-0.5">
            <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C84C24] text-white shadow-xs border border-white/20">
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <span>${spice.categoryName}</span>
            </div>
            <h2 id="modal-spice-title" class="font-editorial-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              ${spice.name}
            </h2>
            <p class="text-xs text-[#D49B42] italic font-mono font-semibold">
              ${spice.latinName}
            </p>
          </div>
        </div>

        <!-- Modal Body: Single-Row 3-Column Layout ("Sebaris" Tanpa Scroll) -->
        <div class="p-4 sm:p-5">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 items-stretch">
            
            <!-- Col 1: Peran Utama & Karakter Rasa -->
            <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 flex flex-col justify-between space-y-2.5">
              <div>
                <span class="text-[11px] font-bold text-[#C84C24] uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#C84C24]"></span>
                  <span>${isEn ? 'Culinary Role' : 'Peran Utama & Rasa'}</span>
                </span>
                <p class="text-xs text-[#120B07] leading-relaxed">
                  ${spice.role}
                </p>
              </div>
              ${spice.flavorNote ? `
                <div class="pt-2 border-t border-[#D49B42]/20 text-[11px] text-[#2E4D38] leading-snug">
                  <span class="font-bold text-[#C84C24]">${isEn ? 'Flavor Note:' : 'Catatan Rasa:'}</span> ${spice.flavorNote}
                </div>
              ` : ''}
            </div>

            <!-- Col 2: Profil Aroma & Olahan Pawon -->
            <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 flex flex-col justify-between space-y-2.5">
              <div>
                <span class="text-[11px] font-bold text-[#120B07] uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#D49B42]"></span>
                  <span>${t('spicesSection.aromaTitle') || 'Aroma & Karakter'}</span>
                </span>
                <p class="text-xs text-[#5C3622] leading-relaxed">
                  ${spice.aromaProfile}
                </p>
              </div>
              <div class="pt-2 border-t border-[#D49B42]/20 text-[11px] text-[#5C3622] leading-snug">
                <span class="font-bold text-[#120B07] block mb-0.5">${t('spicesSection.prepTitle') || 'Teknik Pengolahan Pawon:'}</span>
                <span>${spice.preparationMethod}</span>
              </div>
            </div>

            <!-- Col 3: Kearifan Budaya & Sajian Ikonik -->
            <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 flex flex-col justify-between space-y-2.5">
              <div>
                <span class="text-[11px] font-bold text-[#2E4D38] uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#2E4D38]"></span>
                  <span>${t('spicesSection.wisdomTitle') || 'Kearifan & Tradisi'}</span>
                </span>
                <p class="text-xs text-[#5C3622] leading-relaxed italic">
                  "${spice.culturalWisdom}"
                </p>
              </div>
              
              <div class="pt-2 border-t border-[#D49B42]/20 space-y-1">
                ${spice.iconicDishes && spice.iconicDishes.length > 0 ? `
                  <div class="text-[11px] text-[#120B07]">
                    <span class="font-bold text-[#C84C24] block mb-1 text-[10px] uppercase tracking-wider">${t('spicesSection.dishesTitle') || 'Sajian Ikonik:'}</span>
                    <div class="flex flex-wrap gap-1">
                      ${spice.iconicDishes.map(dish => `
                        <span class="px-2 py-0.5 rounded-md bg-white border border-[#D49B42]/35 text-[10px] font-semibold text-[#120B07] shadow-2xs">
                          ${dish}
                        </span>
                      `).join('')}
                    </div>
                  </div>
                ` : ''}

                ${spice.substitutes ? `
                  <p class="text-[10px] text-[#7A4E33] pt-1">
                    <span class="font-bold text-[#120B07]">${t('spicesSection.substitutesTitle') || 'Alternatif'}:</span> ${spice.substitutes}
                  </p>
                ` : ''}
              </div>
            </div>

          </div>
        </div>

        <!-- Modal Footer: Clean Single Close Button (Without Jelajahi Resep Button) -->
        <div class="p-3 bg-[#FAF7F2] border-t border-[#D49B42]/20 flex items-center justify-center">
          <button type="button" 
                  id="modal-close-footer-btn" 
                  class="px-8 py-2 rounded-full text-xs font-bold text-[#120B07] bg-white border border-[#D49B42]/40 hover:bg-[#C84C24] hover:text-white hover:border-[#C84C24] transition-all cursor-pointer shadow-xs">
            ${t('spicesSection.closeModal') || 'Tutup'}
          </button>
        </div>

      </div>
    </div>
  `;
}

function openSpiceModal(spiceId) {
  const root = document.getElementById('spice-modal-root');
  if (!root) return;

  const localizedSpices = spices.map(localizeSpice);
  const spice = localizedSpices.find(s => s.id === spiceId);
  if (!spice) return;

  root.innerHTML = renderSpiceModal(spice);
  document.body.style.overflow = 'hidden';

  const closeModal = () => {
    root.innerHTML = '';
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKeyDown);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };
  window.addEventListener('keydown', handleKeyDown);

  const closeBtn = document.getElementById('close-spice-modal-btn');
  const closeFooterBtn = document.getElementById('modal-close-footer-btn');
  const backdrop = document.getElementById('spice-modal-backdrop');

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeFooterBtn) closeFooterBtn.addEventListener('click', closeModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
  }
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
    const handleTrigger = () => {
      const sId = card.getAttribute('data-spice-id');
      if (sId) {
        openSpiceModal(sId);
      }
    };

    card.addEventListener('click', handleTrigger);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleTrigger();
      }
    });
  });
}
