import { spices } from '../data/spices.js';
import { spiceTranslationsEn } from '../data/translations-en.js';
import { ThreeSpiceViewer } from '../components/three-spice-viewer.js';
import { i18n, t } from '../i18n/index.js';

/**
 * Jelajah Rempah (Interactive Spice Exploration Page)
 * Features 3D Three.js PBR inspection, procedural textures, basalt mortar pedestal, and full i18n.
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
let spiceViewerInstance = null;

export async function renderSpicesPage() {
  const categories = [
    { id: 'semua', label: t('spicesSection.catAll') },
    { id: 'aromatik', label: t('spicesSection.catAromatic') },
    { id: 'rimpang', label: t('spicesSection.catRhizome') },
    { id: 'biji', label: t('spicesSection.catSeed') },
    { id: 'daun', label: t('spicesSection.catLeaf') },
    { id: 'asam', label: t('spicesSection.catAcid') }
  ];

  const localizedSpices = spices.map(localizeSpice);
  const currentSpice = localizedSpices.find(s => s.id === currentSpiceId) || localizedSpices[0];

  const filteredSpices = activeCategory === 'semua'
    ? localizedSpices
    : localizedSpices.filter(s => s.category === activeCategory);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <!-- Page Header -->
      <div class="space-y-3 pb-6 border-b border-[#C49A58]/20">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2E8D8] text-xs font-semibold text-[#B85C38] uppercase tracking-wider">
          <svg class="w-3.5 h-3.5 text-[#B85C38]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          ${t('spicesSection.badge')}
        </div>
        <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-[#302018] tracking-tight">
          ${t('spicesSection.title')}
        </h1>
        <p class="text-sm sm:text-base text-[#654332] max-w-2xl leading-relaxed">
          ${t('spicesSection.description')}
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

      <!-- Interactive 3D Inspection Stage & Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left: Interactive 3D Spice Inspector Stage -->
        <div class="lg:col-span-5 bg-white rounded-3xl border border-[#C49A58]/20 p-6 shadow-sm sticky top-28 space-y-4">
          <div class="flex items-center justify-between border-b border-[#F2E8D8] pb-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#302018] text-[#C49A58]">
              <span class="w-1.5 h-1.5 rounded-full bg-[#C49A58] animate-ping"></span>
              ${t('spicesSection.inspect3dBadge')}
            </span>
            <span class="text-[11px] text-[#654332]/80 italic">${t('spicesSection.inspect3dHint')}</span>
          </div>

          <!-- 3D Canvas Box -->
          <div id="spice-3d-stage" class="w-full h-64 sm:h-72 rounded-2xl bg-radial from-[#FAF6EF] to-[#F2E8D8] border border-[#C49A58]/20 overflow-hidden flex items-center justify-center relative shadow-inner"></div>

          <!-- Active Spice Highlight Detail -->
          <div id="spice-active-details" class="space-y-3 pt-2">
            ${renderActiveSpiceDetails(currentSpice)}
          </div>
        </div>

        <!-- Right: Spices Selection Grid -->
        <div class="lg:col-span-7 space-y-4">
          <div class="text-xs text-[#654332] flex items-center justify-between pb-1">
            <span>${t('spicesSection.selectHint')}</span>
            <span><strong class="text-[#302018]">${filteredSpices.length}</strong> ${t('spicesSection.availableCount')}</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" id="spice-cards-container">
            ${filteredSpices.map(s => {
              const isSelected = s.id === currentSpice.id;
              return `
                <div data-spice-id="${s.id}" 
                     class="spice-card p-5 rounded-2xl bg-white border cursor-pointer transition-all duration-200 card-hover-lift flex flex-col justify-between ${
                       isSelected ? 'border-[#B85C38] shadow-md ring-2 ring-[#B85C38]/40' : 'border-[#C49A58]/20 hover:border-[#B85C38]/50'
                     }">
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-xs" style="background-color: ${s.modelColor}20; color: ${s.modelColor};">
                        ●
                      </div>
                      <span class="text-[10px] font-mono italic text-[#654332]/80">
                        ${s.categoryName}
                      </span>
                    </div>

                    <h3 class="font-editorial-serif text-lg font-bold text-[#302018]">
                      ${s.name}
                    </h3>
                    <p class="text-[11px] font-mono text-[#654332] italic">
                      ${s.latinName}
                    </p>
                    <p class="text-xs text-[#654332] line-clamp-2 leading-relaxed">
                      ${s.role}
                    </p>
                  </div>

                  <div class="pt-3 border-t border-[#F2E8D8] mt-3 flex items-center justify-between text-xs">
                    <span class="text-[11px] font-semibold text-[#B85C38]">
                      ${isSelected ? t('spicesSection.inspectingBadge') : t('spicesSection.inspectBtn')}
                    </span>
                    <span class="text-[#654332]/60 group-hover:text-[#302018]">&rarr;</span>
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

function renderActiveSpiceDetails(s) {
  return `
    <div class="space-y-3">
      <div>
        <h2 class="font-editorial-serif text-2xl font-bold text-[#302018]">
          ${s.name}
        </h2>
        <p class="text-xs font-mono italic text-[#654332]">
          ${s.latinName} &bull; ${s.categoryName}
        </p>
      </div>

      <!-- Macro Culinary Photograph of Fresh Spice -->
      <div class="relative w-full h-32 rounded-2xl overflow-hidden border border-[#C49A58]/20 bg-[#F2E8D8]/50 shadow-xs">
        <img src="${s.image}" alt="${s.name}" class="w-full h-full object-cover" onerror="this.style.display='none'"/>
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <span class="absolute bottom-2 left-3 bg-[#302018]/85 text-[#C49A58] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-xs">
          ${i18n?.getLanguage && i18n.getLanguage() === 'en' ? 'Macro Culinary Photography' : 'Fotografi Makro Bahan'}
        </span>
      </div>

      <div class="p-3 rounded-xl bg-[#FAF6EF] border border-[#C49A58]/20 space-y-1">
        <span class="block text-[11px] font-bold uppercase tracking-wider text-[#302018]">${t('spicesSection.aromaTitle')}</span>
        <p class="text-xs text-[#654332] leading-relaxed">
          ${s.aromaProfile} ${s.flavorNote}
        </p>
      </div>

      <div class="space-y-1 text-xs">
        <span class="font-bold text-[#302018] block">${t('spicesSection.prepTitle')}</span>
        <p class="text-[#654332] leading-relaxed">
          ${s.preparationMethod}
        </p>
      </div>

      <div class="space-y-1 text-xs">
        <span class="font-bold text-[#302018] block">${t('spicesSection.wisdomTitle')}</span>
        <p class="text-[#654332] leading-relaxed">
          ${s.culturalWisdom}
        </p>
      </div>

      <div class="space-y-1 text-xs">
        <span class="font-bold text-[#302018] block">${t('spicesSection.dishesTitle')}</span>
        <div class="flex flex-wrap gap-1.5 pt-1">
          ${s.iconicDishes.map(d => `
            <a href="#/resep?search=${encodeURIComponent(d)}" class="px-2 py-0.5 rounded-md bg-[#F2E8D8] text-[#302018] text-[11px] font-medium hover:bg-[#B85C38] hover:text-white transition-colors">
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
  const currentSpice = localizedSpices.find(s => s.id === currentSpiceId) || localizedSpices[0];

  const stage = document.getElementById('spice-3d-stage');
  if (stage) {
    if (spiceViewerInstance) {
      spiceViewerInstance.dispose();
    }
    spiceViewerInstance = new ThreeSpiceViewer(stage);
    spiceViewerInstance.init(currentSpice);
  }

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
          if (badge) badge.textContent = t('spicesSection.inspectBtn');
        });
        card.classList.add('border-[#B85C38]', 'shadow-md', 'ring-2', 'ring-[#B85C38]/40');
        card.classList.remove('border-[#C49A58]/20');
        const activeBadge = card.querySelector('.text-\\[\\#B85C38\\]');
        if (activeBadge) activeBadge.textContent = t('spicesSection.inspectingBadge');

        // Update 3D model
        if (spiceViewerInstance) {
          spiceViewerInstance.buildSpiceGeometry(found);
        }

        // Update text details
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
      const filtered = cat === 'semua' ? spices : spices.filter(s => s.category === cat);
      const container = document.getElementById('spice-cards-container');
      if (container) {
        container.innerHTML = filtered.map(s => {
          const isSelected = s.id === currentSpice.id;
          return `
            <div data-spice-id="${s.id}" 
                 class="spice-card p-5 rounded-2xl bg-white border cursor-pointer transition-all duration-200 card-hover-lift flex flex-col justify-between ${
                   isSelected ? 'border-[#B85C38] shadow-md ring-2 ring-[#B85C38]/40' : 'border-[#C49A58]/20 hover:border-[#B85C38]/50'
                 }">
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-xs" style="background-color: ${s.modelColor}20; color: ${s.modelColor};">
                    ●
                  </div>
                  <span class="text-[10px] font-mono italic text-[#654332]/80">
                    ${s.categoryName}
                  </span>
                </div>

                <h3 class="font-editorial-serif text-lg font-bold text-[#302018]">
                  ${s.name}
                </h3>
                <p class="text-[11px] font-mono text-[#654332] italic">
                  ${s.latinName}
                </p>
                <p class="text-xs text-[#654332] line-clamp-2 leading-relaxed">
                  ${s.role}
                </p>
              </div>

              <div class="pt-3 border-t border-[#F2E8D8] mt-3 flex items-center justify-between text-xs">
                <span class="text-[11px] font-semibold text-[#B85C38]">
                  ${isSelected ? t('spicesSection.inspectingBadge') : t('spicesSection.inspectBtn')}
                </span>
                <span class="text-[#654332]/60 group-hover:text-[#302018]">&rarr;</span>
              </div>
            </div>
          `;
        }).join('');

        // Re-bind click on filtered cards
        initSpicesPageInteractions();
      }
    });
  });
}
