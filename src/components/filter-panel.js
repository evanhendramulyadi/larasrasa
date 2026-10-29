import { regions } from '../data/regions.js';
import { getLocalizedFlavorProfiles } from '../data/flavorProfiles.js';
import { t } from '../i18n/index.js';

/**
 * Editorial Royal Heritage Filter & Search Panel Component
 * Fully localized, accessible, and reactive with royal Javanese palette.
 */
export function renderFilterPanel(currentFilters = {}) {
  const selectedRegion = currentFilters.region || 'semua';
  const selectedFlavor = currentFilters.flavor || 'semua';
  const selectedDuration = currentFilters.duration || 'semua';
  const selectedDiff = currentFilters.difficulty || 'semua';
  const selectedSort = currentFilters.sort || 'popular';
  const searchQuery = currentFilters.search || '';
  const localizedFlavors = getLocalizedFlavorProfiles();

  return `
    <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#D49B42]/30 shadow-xs mb-10 space-y-6">
      
      <!-- Top Row: Search & Sort with Heritage Styling -->
      <div class="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        <!-- Search Input -->
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#C84C24]">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </div>
          <input type="text" 
                 id="recipe-search-input" 
                 value="${searchQuery}"
                 placeholder="${t('recipesSection.searchPlaceholder')}" 
                 class="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-[#E8DEC8] bg-[#FAF7F2] text-sm text-[#120B07] placeholder-[#5C3622]/50 focus:outline-hidden focus:ring-2 focus:ring-[#C84C24] focus:border-transparent transition-all shadow-inner"/>
          ${searchQuery ? `
            <button id="recipe-search-clear" type="button" aria-label="Clear search" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#5C3622] hover:text-[#C84C24] cursor-pointer">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          ` : ''}
        </div>

        <!-- Sort Select -->
        <div class="flex items-center gap-2.5 shrink-0">
          <label for="recipe-sort-select" class="text-xs font-bold uppercase tracking-wider text-[#5C3622] shrink-0">
            ${t('recipesSection.sortBy')}
          </label>
          <select id="recipe-sort-select" class="py-3 px-4 rounded-2xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-bold text-[#120B07] focus:outline-hidden focus:ring-2 focus:ring-[#C84C24] cursor-pointer">
            <option value="popular" ${selectedSort === 'popular' ? 'selected' : ''}>${t('recipesSection.sortCurated')}</option>
            <option value="tercepat" ${selectedSort === 'tercepat' ? 'selected' : ''}>${t('recipesSection.sortFastest')}</option>
            <option value="termudah" ${selectedSort === 'termudah' ? 'selected' : ''}>${t('recipesSection.sortEasiest')}</option>
            <option value="nama-asc" ${selectedSort === 'nama-asc' ? 'selected' : ''}>${t('recipesSection.sortName')}</option>
          </select>
        </div>
      </div>

      <!-- Second Row: Flavor Filter Pills -->
      <div>
        <span class="block text-xs font-bold uppercase tracking-wider text-[#120B07] mb-3 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#C84C24]"></span>
          <span>${t('recipesSection.flavorFilterLabel')}</span>
        </span>
        <div class="flex flex-wrap gap-2">
          <button type="button" 
                  data-filter-type="flavor" 
                  data-value="semua"
                  class="filter-pill px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedFlavor === 'semua'
                      ? 'bg-[#1E120A] text-[#FAF7F2] ring-1 ring-[#D49B42]/50 shadow-xs'
                      : 'bg-[#FAF7F2] text-[#5C3622] hover:bg-[#EFE8DA] border border-[#E8DEC8]'
                  }">
            ${t('recipesSection.allFlavors')}
          </button>
          ${localizedFlavors.map(f => `
            <button type="button" 
                    data-filter-type="flavor" 
                    data-value="${f.id}"
                    class="filter-pill px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedFlavor === f.id
                        ? 'bg-[#C84C24] text-white font-bold shadow-md ring-2 ring-[#C84C24]/30'
                        : 'bg-[#FAF7F2] text-[#5C3622] hover:bg-[#EFE8DA] border border-[#E8DEC8]'
                    }">
              ${f.name}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Third Row: Region Filter -->
      <div class="pt-4 border-t border-[#E8DEC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-3 w-full sm:w-auto">
          <label for="filter-region" class="block text-xs font-bold uppercase tracking-wider text-[#5C3622] shrink-0">
            ${t('common.city')}:
          </label>
          <select id="filter-region" data-filter-type="region" class="w-full sm:w-72 py-2.5 px-3.5 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-semibold text-[#120B07] cursor-pointer focus:ring-2 focus:ring-[#C84C24]">
            <option value="semua">${t('recipesSection.allRegions')}</option>
            ${regions.map(r => `
              <option value="${r.id}" ${selectedRegion === r.id ? 'selected' : ''}>${r.name}</option>
            `).join('')}
          </select>
        </div>
      </div>

    </div>
  `;
}
