import { restaurantService } from '../services/restaurantService.js';
import { renderRestaurantCard } from '../components/restaurant-card.js';
import { t, i18n } from '../i18n/index.js';

let currentFilter = {
  city: 'semua',
  category: 'semua',
  search: ''
};

export async function renderLegendaryRestaurantsPage() {
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
  const restaurantsList = await restaurantService.getRestaurants(currentFilter);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <!-- Page Header with Javanese Heritage Gradient -->
      <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-14 border-2 border-[#D49B42]/40 shadow-2xl bg-gradient-to-r from-[#120B07] via-[#1E120A] to-[#120B07] text-[#FAF7F2]">
        <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#D49B42]/15 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#C84C24]/18 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 space-y-3.5 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#D49B42]/40 text-xs font-bold text-[#D49B42] uppercase tracking-wider shadow-xs">
            <svg class="w-3.5 h-3.5 text-[#C84C24]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>${t('restaurantsSection.badge')}</span>
          </div>
          <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            ${t('restaurantsSection.title')}
          </h1>
          <p class="text-sm sm:text-base text-[#FAF7F2]/85 leading-relaxed">
            ${t('restaurantsSection.description')}
          </p>
        </div>
      </div>

      <!-- Discovery & Filters Toolbar -->
      <div class="bg-white p-6 sm:p-7 rounded-3xl border border-[#D49B42]/30 shadow-xs space-y-4">
        
        <div class="flex flex-col md:flex-row items-center gap-4">
          <!-- Instant Search -->
          <div class="relative flex-1 w-full">
            <input type="text" 
                   id="restaurant-search-input" 
                   value="${currentFilter.search}"
                   placeholder="${t('restaurantsSection.searchPlaceholder')}" 
                   class="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#E8DEC8] bg-[#FAF7F2] text-sm text-[#120B07] placeholder-[#5C3622]/50 focus:outline-hidden focus:ring-2 focus:ring-[#C84C24] transition-all shadow-inner"/>
            <svg class="w-5 h-5 text-[#C84C24] absolute left-3.5 top-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </div>

          <!-- City Dropdown -->
          <div class="w-full md:w-auto flex items-center gap-2.5">
            <label class="text-xs font-bold uppercase tracking-wider text-[#5C3622] shrink-0">${t('restaurantsSection.cityFilter')}</label>
            <select id="restaurant-city-select" class="w-full md:w-auto py-3 px-4 rounded-2xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-bold text-[#120B07] focus:ring-2 focus:ring-[#C84C24] cursor-pointer">
              <option value="semua">${t('restaurantsSection.allCities')}</option>
              <option value="Semarang" ${currentFilter.city === 'Semarang' ? 'selected' : ''}>Kota Semarang</option>
              <option value="Surakarta" ${currentFilter.city === 'Surakarta' ? 'selected' : ''}>Solo (Surakarta)</option>
              <option value="Kudus" ${currentFilter.city === 'Kudus' ? 'selected' : ''}>Kab. Kudus</option>
              <option value="Banyumas" ${currentFilter.city === 'Banyumas' ? 'selected' : ''}>Banyumas (Purwokerto)</option>
              <option value="Pekalongan" ${currentFilter.city === 'Pekalongan' ? 'selected' : ''}>Pekalongan</option>
              <option value="Magelang" ${currentFilter.city === 'Magelang' ? 'selected' : ''}>Magelang</option>
              <option value="Tegal" ${currentFilter.city === 'Tegal' ? 'selected' : ''}>Kota/Kab Tegal</option>
              <option value="Wonosobo" ${currentFilter.city === 'Wonosobo' ? 'selected' : ''}>Kab. Wonosobo</option>
            </select>
          </div>

          <!-- Reset Button -->
          <button id="restaurant-reset-btn" type="button" class="shrink-0 text-xs font-bold text-[#C84C24] hover:text-[#120B07] underline transition-colors cursor-pointer px-2">
            ${t('common.reset')}
          </button>
        </div>

        <!-- Status & Results Count Bar -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-[#E8DEC8] text-xs text-[#5C3622]">
          <div class="flex items-center gap-2 font-medium">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span id="restaurants-count-label">
              ${isEn 
                ? `Showing <strong class="text-[#120B07]">${restaurantsList.length}</strong> legendary culinary establishments`
                : `Nampilaken <strong class="text-[#120B07]">${restaurantsList.length}</strong> warung & restoran legendaris`}
            </span>
          </div>
          <span class="text-[11px] text-[#2E4D38] font-semibold italic">
            ${isEn ? 'Click "Open in Map" on cards for Google Maps navigation' : 'Klik "Buka di Peta" kagem navigasi Google Maps'}
          </span>
        </div>

      </div>

      <!-- Restaurant Cards Grid -->
      <div id="restaurants-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${restaurantsList.map(r => renderRestaurantCard(r)).join('')}
      </div>

      <!-- Heritage Integrity Card -->
      <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white via-[#FAF7F2] to-[#F5EFEB] border border-[#D49B42]/35 shadow-sm space-y-2">
        <h3 class="font-editorial-serif text-lg font-bold text-[#120B07] flex items-center gap-2">
          <span class="text-[#D49B42]">✦</span>
          <span>${t('restaurantsSection.integrityTitle')}</span>
        </h3>
        <p class="text-xs text-[#5C3622] leading-relaxed">
          ${t('restaurantsSection.integrityText')}
        </p>
      </div>

    </div>
  `;
}

export function initLegendaryRestaurantsInteractions() {
  const searchInput = document.getElementById('restaurant-search-input');
  const citySelect = document.getElementById('restaurant-city-select');
  const resetBtn = document.getElementById('restaurant-reset-btn');

  async function updateResults() {
    const list = await restaurantService.getRestaurants(currentFilter);
    const grid = document.getElementById('restaurants-grid');
    const label = document.getElementById('restaurants-count-label');
    const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';

    if (grid) {
      grid.innerHTML = list.map(r => renderRestaurantCard(r)).join('');
    }
    if (label) {
      label.innerHTML = isEn 
        ? `Showing <strong class="text-[#120B07]">${list.length}</strong> legendary culinary establishments`
        : `Nampilaken <strong class="text-[#120B07]">${list.length}</strong> warung & restoran legendaris`;
    }
  }

  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        currentFilter.search = e.target.value;
        updateResults();
      }, 300);
    });
  }

  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      currentFilter.city = e.target.value;
      updateResults();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentFilter = { city: 'semua', category: 'semua', search: '' };
      if (searchInput) searchInput.value = '';
      if (citySelect) citySelect.value = 'semua';
      updateResults();
    });
  }
}
