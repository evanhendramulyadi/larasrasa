import { spices } from '../data/spices.js';
import { spiceTranslationsEn } from '../data/translations-en.js';
import { i18n, t } from '../i18n/index.js';

/**
 * Jelajah Rempah (Curated Macro Culinary Spice Exhibition)
 * Features high-definition macro food photography, botanical profiles,
 * culinary philosophy, traditional preparations, and bilingual i18n.
 */

export function localizeSpice(s) {
  if (!s) return s;
  const lang = i18n?.getLanguage ? i18n.getLanguage() : 'id';
  if (lang !== 'en') return { ...s };

  const trans = spiceTranslationsEn[s.id];
  if (!trans) return { ...s };

  return {
    ...s,
    name: trans.name || s.name,
    categoryName: trans.categoryName || s.categoryName,
    role: trans.role || s.role,
    aromaProfile: trans.aromaProfile || s.aromaProfile,
    flavorNote: trans.flavorNote || s.flavorNote,
    preparationMethod: trans.preparationMethod || s.preparationMethod,
    culturalWisdom: trans.culturalWisdom || s.culturalWisdom,
    substitutes: trans.substitutes || s.substitutes,
  };
}

let activeCategory = 'semua';
let currentSpiceId = 'bawang-merah';

export async function renderSpicesPage() {
  const categories = [
    { id: 'semua', label: t('spicesSection.catAll') || 'Semua Rempah' },
    { id: 'aromatik', label: t('spicesSection.catAromatic') || 'Aromatik Utama' },
    { id: 'rimpang', label: t('spicesSection.catRhizome') || 'Rimpang Hangat' },
    { id: 'biji', label: t('spicesSection.catSeed') || 'Biji-bijian & Kering' },
    { id: 'daun', label: t('spicesSection.catLeaf') || 'Daun Aromatik' },
    { id: 'asam', label: t('spicesSection.catAcid') || 'Asam & Manis Alami' }
  ];

  const localizedSpices = spices.map(localizeSpice);
  const currentSpice = localizedSpices.find(s => s.id === currentSpiceId) || localizedSpices[0];

  const filteredSpices = activeCategory === 'semua'
    ? localizedSpices
    : localizedSpices.filter(s => s.category === activeCategory);

  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <!-- Page Header -->
      <div class="space-y-3 pb-6 border-b border-[#C49A58]/20">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2E8D8] text-xs font-semibold text-[#B85C38] uppercase tracking-wider">
          <svg class="w-3.5 h-3.5 text-[#B85C38]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          ${t('spicesSection.badge') || 'Eksplorasi Bumbu Warisan'}
        </div>
        <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-[#302018] tracking-tight">
          ${t('spicesSection.title') || 'Pusaka Rempah Jawa Tengah'}
        </h1>
        <p class="text-sm sm:text-base text-[#654332] max-w-2xl leading-relaxed">
          ${t('spicesSection.description') || 'Menyingkap rahasia bumbu dasar, aromatik purba, dan rimpang penyegar yang menjadi ruh di balik kelezatan masakan tradisional Jawa Tengah.'}
        </p>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex flex-wrap items-center gap-2 pb-2">
        ${categories.map(c => `
          <button type="button" 
                  data-spice-category="${c.id}"
                  class="spice-cat-btn px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    c.id === activeCategory
                      ? 'bg-[#B85C38] text-white shadow-sm ring-1 ring-[#B85C38]'
                      : 'bg-white text-[#302018] border border-[#C49A58]/30 hover:bg-[#F2E8D8]'
                  }">
            ${c.label}
          </button>
        `).join('')}
      </div>

      <!-- Curated Macro Exhibition Showcase & Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left: Curated Spotlight Exhibition Card -->
        <div class="lg:col-span-5 bg-white rounded-3xl border border-[#C49A58]/25 p-6 shadow-sm sticky top-28 space-y-5">
          <div class="flex items-center justify-between border-b border-[#F2E8D8] pb-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#302018] text-[#C49A58]">
              <span class="w-1.5 h-1.5 rounded-full bg-[#C49A58] animate-pulse"></span>
              ${isEn ? 'Curated Spice Spotlight' : 'Sorotan Utama Rempah'}
            </span>
            <span class="text-[11px] text-[#654332]/80 italic">
              ${isEn ? 'Macro Culinary Exhibition' : 'Eksibisi Makro Kuliner'}
            </span>
          </div>

          <!-- Active Spice Dynamic Detail Container -->
          <div id="spice-active-details" class="space-y-4">
            ${renderActiveSpiceDetails(currentSpice)}
          </div>
        </div>

        <!-- Right: Spices Selection Grid -->
        <div class="lg:col-span-7 space-y-4">
          <div class="text-xs text-[#654332] flex items-center justify-between pb-1">
            <span>${t('spicesSection.selectHint') || 'Pilih rempah untuk menelaah khasiat dan filosofinya'}</span>
            <span><strong class="text-[#302018]">${filteredSpices.length}</strong> ${t('spicesSection.availableCount') || 'Rempah Tersedia'}</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" id="spice-cards-container">
            ${filteredSpices.map(s => renderSpiceCard(s, s.id === currentSpice.id)).join('')}
          </div>
        </div>

      </div>

    </div>
  `;
}

function renderSpiceCard(s, isSelected) {
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
  const imgSrc = s.image || `/assets/images/ingredients/${s.id}.jpg`;

  return `
    <div data-spice-id="${s.id}" 
         class="spice-card group p-3.5 rounded-2xl bg-white border cursor-pointer transition-all duration-200 card-hover-lift flex flex-col justify-between ${
           isSelected ? 'border-[#B85C38] shadow-md ring-2 ring-[#B85C38]/40' : 'border-[#C49A58]/20 hover:border-[#B85C38]/50 shadow-2xs'
         }">
      <div class="space-y-2.5">
        <!-- Photo Container -->
        <div class="relative w-full h-36 rounded-xl overflow-hidden bg-[#FAF6EF] border border-[#E5D9C5]/60">
          <img 
            src="${imgSrc}" 
            alt="${s.name}" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onerror="this.src='/assets/images/hero/hero-culinary.jpg'"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <span class="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-[#302018]/80 backdrop-blur-xs text-[10px] font-bold text-[#FAF6EF]">
            ${s.categoryName}
          </span>
          <span class="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs shadow-xs" style="background-color: ${s.modelColor || '#C49A58'}; color: #FFF;">
            ●
          </span>
        </div>

        <div>
          <h3 class="font-editorial-serif text-lg font-bold text-[#302018] group-hover:text-[#B85C38] transition-colors">
            ${s.name}
          </h3>
          <p class="text-[11px] font-mono text-[#777B52] italic">
            ${s.latinName}
          </p>
          <p class="text-xs text-[#654332] line-clamp-2 leading-relaxed mt-1">
            ${s.role}
          </p>
        </div>
      </div>

      <div class="pt-3 border-t border-[#F2E8D8] mt-3 flex items-center justify-between text-xs">
        <span class="text-[11px] font-bold text-[#B85C38]">
          ${isSelected ? (isEn ? 'Currently Inspected' : 'Sedang Ditelaah') : (isEn ? 'Inspect Spice' : 'Telaah Rempah')}
        </span>
        <span class="text-[#654332]/60 group-hover:text-[#B85C38] transition-colors">&rarr;</span>
      </div>
    </div>
  `;
}

function renderActiveSpiceDetails(s) {
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
  const imgSrc = s.image || `/assets/images/ingredients/${s.id}.jpg`;

  return `
    <div class="space-y-4 animate-fade-in">
      <div>
        <h2 class="font-editorial-serif text-2xl font-bold text-[#302018]">
          ${s.name}
        </h2>
        <p class="text-xs font-mono italic text-[#777B52]">
          ${s.latinName} &bull; ${s.categoryName}
        </p>
      </div>

      <!-- Curated Macro Photograph of Fresh Spice -->
      <div class="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-[#C49A58]/25 bg-[#F2E8D8]/50 shadow-md group">
        <img 
          src="${imgSrc}" 
          alt="${s.name}" 
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          onerror="this.src='/assets/images/hero/hero-culinary.jpg'"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
        <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span class="bg-[#302018]/90 text-[#C49A58] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-xs shadow-xs border border-[#C49A58]/30">
            ${isEn ? 'Macro Heritage Archive' : 'Arsip Makro Kuliner'}
          </span>
          <span class="text-[11px] text-[#FAF6EF] font-mono italic">
            ${s.latinName}
          </span>
        </div>
      </div>

      <!-- Aroma & Flavor Profile -->
      <div class="p-3.5 rounded-xl bg-[#FAF6EF] border border-[#C49A58]/25 space-y-1.5 shadow-2xs">
        <span class="block text-[11px] font-bold uppercase tracking-wider text-[#302018]">
          ${t('spicesSection.aromaTitle') || 'Karakter Aroma & Rasa'}
        </span>
        <p class="text-xs text-[#654332] leading-relaxed">
          <strong>${s.flavorNote}</strong> &bull; ${s.aromaProfile}
        </p>
      </div>

      <!-- Preparation Method -->
      <div class="space-y-1 text-xs">
        <span class="font-bold text-[#302018] block">
          ${t('spicesSection.prepTitle') || 'Cara Pengolahan Tradisional'}
        </span>
        <p class="text-[#654332] leading-relaxed">
          ${s.preparationMethod}
        </p>
      </div>

      <!-- Cultural Wisdom -->
      <div class="p-3 rounded-xl bg-[#F2E8D8]/50 border border-[#C49A58]/30 space-y-1 text-xs">
        <span class="font-bold text-[#B85C38] block flex items-center gap-1.5">
          <span>📜</span>
          <span>${t('spicesSection.wisdomTitle') || 'Filosofi & Kearifan Dapur Jawa'}</span>
        </span>
        <p class="text-[#4A2C1A] leading-relaxed italic">
          "${s.culturalWisdom}"
        </p>
      </div>

      <!-- Iconic Central Javanese Dishes -->
      <div class="space-y-1.5 text-xs">
        <span class="font-bold text-[#302018] block">
          ${t('spicesSection.dishesTitle') || 'Hidangan Ikonik Jawa Tengah'}
        </span>
        <div class="flex flex-wrap gap-1.5 pt-1">
          ${s.iconicDishes.map(d => `
            <a href="#/resep?search=${encodeURIComponent(d)}" class="px-2.5 py-1 rounded-lg bg-[#FAF6EF] border border-[#E5D9C5] text-[#302018] text-[11px] font-medium hover:bg-[#B85C38] hover:text-white hover:border-[#B85C38] transition-colors shadow-2xs">
              ${d} &rarr;
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function initSpicesPageInteractions() {
  const localizedSpices = spices.map(localizeSpice);
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';

  // Bind Spice Cards
  document.querySelectorAll('.spice-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-spice-id');
      const found = localizedSpices.find(s => s.id === id);
      if (found) {
        currentSpiceId = found.id;

        // Update cards styling
        document.querySelectorAll('.spice-card').forEach(c => {
          c.classList.remove('border-[#B85C38]', 'shadow-md', 'ring-2', 'ring-[#B85C38]/40');
          c.classList.add('border-[#C49A58]/20');
          const badge = c.querySelector('.text-\\[\\#B85C38\\]');
          if (badge) badge.textContent = isEn ? 'Inspect Spice' : 'Telaah Rempah';
        });
        card.classList.add('border-[#B85C38]', 'shadow-md', 'ring-2', 'ring-[#B85C38]/40');
        card.classList.remove('border-[#C49A58]/20');
        const activeBadge = card.querySelector('.text-\\[\\#B85C38\\]');
        if (activeBadge) activeBadge.textContent = isEn ? 'Currently Inspected' : 'Sedang Ditelaah';

        // Update left featured exhibition spotlight
        const detailsContainer = document.getElementById('spice-active-details');
        if (detailsContainer) {
          detailsContainer.innerHTML = renderActiveSpiceDetails(found);
        }
      }
    });
  });

  // Bind Category Buttons
  document.querySelectorAll('.spice-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-spice-category');
      activeCategory = cat;

      // Update button styling
      document.querySelectorAll('.spice-cat-btn').forEach(b => {
        b.className = 'spice-cat-btn px-4 py-2 rounded-full text-xs font-semibold transition-all bg-white text-[#302018] border border-[#C49A58]/30 hover:bg-[#F2E8D8]';
      });
      btn.className = 'spice-cat-btn px-4 py-2 rounded-full text-xs font-semibold transition-all bg-[#B85C38] text-white shadow-sm ring-1 ring-[#B85C38]';

      // Re-filter cards
      const filtered = cat === 'semua' ? localizedSpices : localizedSpices.filter(s => s.category === cat);
      const container = document.getElementById('spice-cards-container');
      if (container) {
        container.innerHTML = filtered.map(s => renderSpiceCard(s, s.id === currentSpiceId)).join('');
        // Re-bind click on filtered cards
        initSpicesPageInteractions();
      }
    });
  });
}
