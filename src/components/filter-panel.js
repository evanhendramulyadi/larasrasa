import { regions } from '../data/regions.js';
import { getLocalizedFlavorProfiles } from '../data/flavorProfiles.js';
import { t } from '../i18n/index.js';

/**
 * Upgraded Filter & Search Panel Component
 * Fully localized, accessible, and reactive.
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
    <div class="bg-white p-6 sm:p-7 rounded-3xl border border-[#E5D9C5] shadow-xs mb-10 space-y-6">
      
      <!-- Top Row: Search & Sort -->
      <div class="flex flex-col md:flex-row items-stretch md:items-center gap-4">
        <!-- Search Input -->
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777B52]">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </div>
          <input type="text" 
                 id="recipe-search-input" 
                 value="${searchQuery}"
                 placeholder="${t('recipesSection.searchPlaceholder')}" 
                 class="w-full pl-10 pr-10 py-3 rounded-xl border border-[#E5D9C5] bg-[#FAF6EF] text-sm text-[#302018] placeholder-[#654332]/50 focus:outline-hidden focus:ring-2 focus:ring-[#B85C38] focus:border-transparent transition-all"/>
          ${searchQuery ? `
            <button id="recipe-search-clear" type="button" aria-label="Clear search" class="absolute inset-y-0 right-0 pr-3 flex items-center text-[#654332] hover:text-[#B85C38]">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          ` : ''}
        </div>

        <!-- Sort Select -->
        <div class="flex items-center gap-2 shrink-0">
          <label for="recipe-sort-select" class="text-xs font-bold uppercase tracking-wider text-[#654332] shrink-0">
            ${t('recipesSection.sortBy')}
          </label>
          <select id="recipe-sort-select" class="py-2.5 px-3.5 rounded-xl border border-[#E5D9C5] bg-[#FAF6EF] text-xs font-semibold text-[#302018] focus:outline-hidden focus:ring-2 focus:ring-[#B85C38]">
            <option value="popular" ${selectedSort === 'popular' ? 'selected' : ''}>${t('recipesSection.sortCurated')}</option>
            <option value="tercepat" ${selectedSort === 'tercepat' ? 'selected' : ''}>${t('recipesSection.sortFastest')}</option>
            <option value="termudah" ${selectedSort === 'termudah' ? 'selected' : ''}>${t('recipesSection.sortEasiest')}</option>
            <option value="nama-asc" ${selectedSort === 'nama-asc' ? 'selected' : ''}>${t('recipesSection.sortName')}</option>
          </select>
        </div>
      </div>

      <!-- Second Row: Flavor Filter Pills -->
      <div>
        <span class="block text-xs font-bold uppercase tracking-wider text-[#302018] mb-2.5">
          ${t('recipesSection.flavorFilterLabel')}
        </span>
        <div class="flex flex-wrap gap-2">
          <button type="button" 
                  data-filter-type="flavor" 
                  data-value="semua"
                  class="filter-pill px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedFlavor === 'semua'
                      ? 'bg-[#302018] text-white shadow-xs'
                      : 'bg-[#FAF6EF] text-[#654332] hover:bg-[#F2E8D8] border border-[#E5D9C5]'
                  }">
            ${t('recipesSection.allFlavors')}
          </button>
          ${localizedFlavors.map(f => `
            <button type="button" 
                    data-filter-type="flavor" 
                    data-value="${f.id}"
                    class="filter-pill px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedFlavor === f.id
                        ? 'bg-[#B85C38] text-white font-bold shadow-xs'
                        : 'bg-[#FAF6EF] text-[#654332] hover:bg-[#F2E8D8] border border-[#E5D9C5]'
                    }">
              ${f.name}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Third Row: Region & Duration Dropdowns -->
      <div class="pt-4 border-t border-[#E5D9C5] grid grid-cols-1 sm:grid-cols-3 gap-4">
        <!-- Region Filter -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-[#654332] mb-1.5">
            ${t('common.city')}:
          </label>
          <select id="filter-region" data-filter-type="region" class="w-full py-2 px-3 rounded-xl border border-[#E5D9C5] bg-[#FAF6EF] text-xs font-medium text-[#302018]">
            <option value="semua">${t('recipesSection.allRegions')}</option>
            ${regions.map(r => `
              <option value="${r.id}" ${selectedRegion === r.id ? 'selected' : ''}>${r.name}</option>
            `).join('')}
          </select>
        </div>

        <!-- Duration Filter -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-[#654332] mb-1.5">
            ${t('recipesSection.durationLabel')}
          </label>
          <select id="filter-duration" data-filter-type="duration" class="w-full py-2 px-3 rounded-xl border border-[#E5D9C5] bg-[#FAF6EF] text-xs font-medium text-[#302018]">
            <option value="semua" ${selectedDuration === 'semua' ? 'selected' : ''}>${t('recipesSection.allDurations')}</option>
            <option value="cepat" ${selectedDuration === 'cepat' ? 'selected' : ''}>${t('recipesSection.durationQuick')}</option>
            <option value="sedang" ${selectedDuration === 'sedang' ? 'selected' : ''}>${t('recipesSection.durationStandard')}</option>
            <option value="lama" ${selectedDuration === 'lama' ? 'selected' : ''}>${t('recipesSection.durationSlow')}</option>
          </select>
        </div>

        <!-- Difficulty Filter & Reset -->
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="text-xs font-bold uppercase tracking-wider text-[#654332]">
              ${t('recipesSection.difficultyLabel')}
            </label>
            <button id="filter-reset-btn" type="button" class="text-[11px] text-[#B85C38] hover:text-[#302018] underline font-bold">
              ${t('recipesSection.resetFilters')}
            </button>
          </div>
          <select id="filter-difficulty" data-filter-type="difficulty" class="w-full py-2 px-3 rounded-xl border border-[#E5D9C5] bg-[#FAF6EF] text-xs font-medium text-[#302018]">
            <option value="semua" ${selectedDiff === 'semua' ? 'selected' : ''}>${t('recipesSection.allDifficulties')}</option>
            <option value="Sangat Mudah" ${selectedDiff.toLowerCase() === 'sangat mudah' ? 'selected' : ''}>${t('recipesSection.diffVeryEasy')}</option>
            <option value="Mudah" ${selectedDiff.toLowerCase() === 'mudah' ? 'selected' : ''}>${t('recipesSection.diffEasy')}</option>
            <option value="Sedang" ${selectedDiff.toLowerCase() === 'sedang' ? 'selected' : ''}>${t('recipesSection.diffMedium')}</option>
          </select>
        </div>
      </div>

    </div>
  `;
}
