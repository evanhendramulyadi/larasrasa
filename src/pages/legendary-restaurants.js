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
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <!-- Page Header with Javanese Heritage Gradient -->
      <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 border border-[#C49A58]/35 shadow-xl bg-gradient-to-r from-[#24140D] via-[#351C12] to-[#1A0F0A] text-[#FAF6EF]">
        <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#C49A58]/10 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#B85C38]/15 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 space-y-3 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF6EF]/10 border border-[#C49A58]/40 text-xs font-bold text-[#C49A58] uppercase tracking-wider">
            <svg class="w-3.5 h-3.5 text-[#B85C38]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            ${t('restaurantsSection.badge')}
          </div>
          <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            ${t('restaurantsSection.title')}
          </h1>
          <p class="text-sm sm:text-base text-[#FAF6EF]/85 leading-relaxed">
            ${t('restaurantsSection.description')}
          </p>
        </div>
      </div>

      <!-- Discovery & Filters Toolbar -->
      <div class="bg-white p-5 rounded-3xl border border-[#C49A58]/20 shadow-xs space-y-4">
        
        <div class="flex flex-col md:flex-row items-center gap-4">
          <!-- Instant Search -->
          <div class="relative flex-1 w-full">
            <input type="text" 
                   id="restaurant-search-input" 
                   value="${currentFilter.search}"
                   placeholder="${t('restaurantsSection.searchPlaceholder')}" 
                   class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#C49A58]/30 bg-[#FAF6EF] text-xs text-[#302018] placeholder-[#654332]/50 focus:outline-hidden focus:ring-2 focus:ring-[#B85C38] transition-all"/>
            <svg class="w-4 h-4 text-[#654332] absolute left-3.5 top-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </div>

          <!-- City Dropdown -->
          <div class="w-full md:w-auto flex items-center gap-2">
            <label class="text-xs font-bold uppercase tracking-wider text-[#654332] shrink-0">${t('restaurantsSection.cityFilter')}</label>
            <select id="restaurant-city-select" class="w-full md:w-auto py-2.5 px-3.5 rounded-xl border border-[#C49A58]/30 bg-[#FAF6EF] text-xs text-[#302018] focus:outline-hidden focus:ring-2 focus:ring-[#B85C38]">
              <option value="semua">${t('restaurantsSection.allCities')}</option>
              <option value="Semarang" ${currentFilter.city === 'Semarang' ? 'selected' : ''}>Semarang</option>
              <option value="Surakarta" ${currentFilter.city === 'Surakarta' ? 'selected' : ''}>Surakarta (Solo)</option>
              <option value="Kudus" ${currentFilter.city === 'Kudus' ? 'selected' : ''}>Kudus</option>
              <option value="Banyumas" ${currentFilter.city === 'Banyumas' ? 'selected' : ''}>Banyumas (Purwokerto)</option>
              <option value="Pekalongan" ${currentFilter.city === 'Pekalongan' ? 'selected' : ''}>Pekalongan</option>
              <option value="Magelang" ${currentFilter.city === 'Magelang' ? 'selected' : ''}>Magelang</option>
            </select>
          </div>

          <!-- Reset Button -->
          <button id="restaurant-reset-btn" type="button" class="shrink-0 text-xs font-bold text-[#B85C38] hover:text-[#302018] underline transition-colors cursor-pointer">
            ${t('common.reset')}
          </button>
        </div>

        <!-- Status & Results Count Bar -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F2E8D8] text-xs text-[#654332]">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span id="restaurants-count-label">
              ${isEn 
                ? `Showing <strong class="text-[#302018]">${restaurantsList.length}</strong> legendary culinary establishments`
                : `Menampilkan <strong class="text-[#302018]">${restaurantsList.length}</strong> warung & restoran legendaris`}
            </span>
          </div>
          <span class="text-[11px] text-[#777B52] italic">
            ${isEn ? 'Click "Open in Map" on cards for Google Maps navigation' : 'Klik "Buka di Peta" pada kartu untuk melihat rute navigasi Google Maps'}
          </span>
        </div>

      </div>

      <!-- Directory Cards Grid -->
      <div id="restaurants-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${restaurantsList.length > 0 ? restaurantsList.map(r => renderRestaurantCard(r)).join('') : `
          <div class="col-span-full p-12 text-center rounded-3xl bg-white border border-[#C49A58]/20 space-y-3">
            <span class="text-3xl">🍲</span>
            <h3 class="font-editorial-serif text-lg font-bold text-[#302018]">${isEn ? 'No Establishments Found' : 'Tidak Ada Restoran Ditemukan'}</h3>
            <p class="text-xs text-[#654332]">${isEn ? 'Try adjusting your search query or selecting another city.' : 'Coba ubah kata kunci pencarian atau pilih kota lainnya.'}</p>
          </div>
        `}
      </div>

    </div>
  `;
}

export function initLegendaryRestaurantsInteractions() {
  const searchInput = document.getElementById('restaurant-search-input');
  const citySelect = document.getElementById('restaurant-city-select');
  const resetBtn = document.getElementById('restaurant-reset-btn');

  async function updateList() {
    const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
    const list = await restaurantService.getRestaurants(currentFilter);
    const grid = document.getElementById('restaurants-grid');
    const countLabel = document.getElementById('restaurants-count-label');

    if (countLabel) {
      countLabel.innerHTML = isEn 
        ? `Showing <strong class="text-[#302018]">${list.length}</strong> legendary culinary establishments`
        : `Menampilkan <strong class="text-[#302018]">${list.length}</strong> warung & restoran legendaris`;
    }

    if (grid) {
      if (list.length > 0) {
        grid.innerHTML = list.map(r => renderRestaurantCard(r)).join('');
      } else {
        grid.innerHTML = `
          <div class="col-span-full p-12 text-center rounded-3xl bg-white border border-[#C49A58]/20 space-y-3">
            <span class="text-3xl">🍲</span>
            <h3 class="font-editorial-serif text-lg font-bold text-[#302018]">${isEn ? 'No Establishments Found' : 'Tidak Ada Restoran Ditemukan'}</h3>
            <p class="text-xs text-[#654332]">${isEn ? 'Try adjusting your search query or selecting another city.' : 'Coba ubah kata kunci pencarian atau pilih kota lainnya.'}</p>
          </div>
        `;
      }
    }
  }

  if (searchInput) {
    let tSearch;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(tSearch);
      tSearch = setTimeout(() => {
        currentFilter.search = e.target.value;
        updateList();
      }, 200);
    });
  }

  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      currentFilter.city = e.target.value;
      updateList();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentFilter = { city: 'semua', category: 'semua', search: '' };
      if (searchInput) searchInput.value = '';
      if (citySelect) citySelect.value = 'semua';
      updateList();
    });
  }
}
