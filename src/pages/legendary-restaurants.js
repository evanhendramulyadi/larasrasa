import { restaurantService } from '../services/restaurantService.js';
import { renderRestaurantCard } from '../components/restaurant-card.js';
import { regions } from '../data/regions.js';
import { localizeRegion } from '../services/regionService.js';
import { t, i18n } from '../i18n/index.js';
import { escapeHtml } from '../utils/dom.js';

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
          <div class="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/10 border border-[#D49B42]/40 text-xs font-bold text-[#D49B42] uppercase tracking-wider shadow-xs">
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
            <label for="restaurant-search-input" class="sr-only">${escapeHtml(t('restaurantsSection.searchPlaceholder'))}</label>
            <input type="text" 
                   id="restaurant-search-input" 
                   name="restaurantSearch"
                   autocomplete="off"
                   value="${escapeHtml(currentFilter.search)}"
                   maxlength="100"
                   placeholder="${t('restaurantsSection.searchPlaceholder')}" 
                   class="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#E8DEC8] bg-[#FAF7F2] text-sm text-[#120B07] placeholder-[#5C3622]/50 focus:outline-hidden focus:ring-2 focus:ring-[#C84C24] transition-all shadow-inner"/>
            <svg class="w-5 h-5 text-[#C84C24] absolute left-3.5 top-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </div>

          <!-- City Dropdown -->
          <div class="w-full md:w-auto flex items-center gap-2.5">
            <label for="restaurant-city-select" class="text-xs font-bold uppercase tracking-wider text-[#5C3622] shrink-0">${t('restaurantsSection.cityFilter')}</label>
            <select id="restaurant-city-select" class="w-full md:w-auto py-3 px-4 rounded-2xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-bold text-[#120B07] focus:ring-2 focus:ring-[#C84C24] cursor-pointer">
              <option value="semua">${t('restaurantsSection.allCities')}</option>
              ${regions.map(r => `
                <option value="${escapeHtml(r.id)}" ${currentFilter.city === r.id ? 'selected' : ''}>${escapeHtml(localizeRegion(r).name)}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- Status & Results Count Bar -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-[#E8DEC8] text-xs text-[#5C3622]">
          <div class="flex items-center gap-2 font-medium">
            <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span id="restaurants-count-label">
              ${isEn 
                ? `Showing <strong class="text-[#120B07]">${restaurantsList.length}</strong> legendary culinary establishments`
                : `Menampilkan <strong class="text-[#120B07]">${restaurantsList.length}</strong> tempat makan & warung legendaris`}
            </span>
          </div>
          <span class="text-[11px] text-[#2E4D38] font-semibold italic">
            ${isEn ? 'Click "Open in Map" on cards for Google Maps navigation' : 'Klik "Buka di Peta" pada kartu untuk navigasi Google Maps'}
          </span>
        </div>

      </div>

      <!-- Restaurant Cards Grid -->
      <div id="restaurants-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${restaurantsList.length > 0 ? restaurantsList.map(r => renderRestaurantCard(r)).join('') : renderRestaurantEmptyState()}
      </div>

      <!-- Historical Documentation & Business Records Reminder Card -->
      <div class="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-white via-[#FAF7F2] to-[#F5EFEB] border border-[#D49B42]/40 shadow-xs space-y-2">
        <h3 class="font-editorial-serif text-base sm:text-lg font-bold text-[#120B07]">
          ${t('restaurantsSection.noticeTitle')}
        </h3>
        <p class="text-xs sm:text-[13px] text-[#5C3622] leading-relaxed">
          ${t('restaurantsSection.noticeText')}
        </p>
        <p class="text-xs sm:text-[13px] text-[#5C3622]/90 leading-relaxed pt-1 border-t border-[#E8DEC8]/60">
          ${t('restaurantsSection.noticeText2')}
        </p>
      </div>

    </div>
  `;
}

function renderRestaurantEmptyState() {
  return `
    <div class="col-span-full py-16 text-center space-y-4 bg-white rounded-3xl border-2 border-dashed border-[#D49B42]/40 p-8 shadow-xs">
      <div class="w-16 h-16 rounded-3xl bg-[#FAF7F2] border border-[#D49B42]/40 text-[#C84C24] flex items-center justify-center mx-auto shadow-sm">
        <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
      </div>
      <div class="space-y-1.5 max-w-md mx-auto">
        <h3 class="font-editorial-serif text-2xl font-bold text-[#120B07]">${t('restaurantsSection.emptyTitle')}</h3>
        <p class="text-sm text-[#5C3622] leading-relaxed">
          ${t('restaurantsSection.emptyDesc')}
        </p>
      </div>
    </div>
  `;
}

export function initLegendaryRestaurantsInteractions() {
  const searchInput = document.getElementById('restaurant-search-input');
  const citySelect = document.getElementById('restaurant-city-select');

  async function updateResults() {
    const list = await restaurantService.getRestaurants(currentFilter);
    const grid = document.getElementById('restaurants-grid');
    const label = document.getElementById('restaurants-count-label');
    const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';

    if (grid) {
      grid.innerHTML = list.length > 0 
        ? list.map(r => renderRestaurantCard(r)).join('') 
        : renderRestaurantEmptyState();
    }
    if (label) {
      label.innerHTML = isEn 
        ? `Showing <strong class="text-[#120B07]">${list.length}</strong> legendary culinary establishments`
        : `Menampilkan <strong class="text-[#120B07]">${list.length}</strong> tempat makan & warung legendaris`;
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
}
