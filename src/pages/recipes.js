import { recipeService } from '../services/recipeService.js';
import { renderFilterPanel } from '../components/filter-panel.js';
import { renderRecipeCard } from '../components/recipe-card.js';
import { t } from '../i18n/index.js';

/**
 * Upgraded Recipe Discovery Listing Page
 */

let activeFilters = {
  search: '',
  region: 'semua',
  flavor: 'semua',
  duration: 'semua',
  difficulty: 'semua',
  sort: 'popular'
};

export async function renderRecipesPage(urlParams = {}) {
  if (urlParams.flavor) activeFilters.flavor = urlParams.flavor;
  if (urlParams.region) activeFilters.region = urlParams.region;
  if (urlParams.search) activeFilters.search = urlParams.search;

  const recipesList = await recipeService.getRecipes(activeFilters);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <!-- Page Header -->
      <div class="space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2E8D8] text-xs font-semibold text-[#654332] uppercase tracking-wider border border-[#E5D9C5]">
          <span>${t('hero.badge')}</span>
        </div>
        <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-[#302018]">
          ${t('recipesSection.title')}
        </h1>
        <p class="text-sm sm:text-base text-[#654332] max-w-2xl leading-relaxed">
          ${t('recipesSection.description')}
        </p>
      </div>

      <!-- Filter & Search Controls -->
      <div id="recipe-filter-container">
        ${renderFilterPanel(activeFilters)}
      </div>

      <!-- Result Counter & Status -->
      <div class="flex items-center justify-between text-xs text-[#777B52] pb-2 border-b border-[#E5D9C5]">
        <div id="recipe-count-indicator">
          ${t('recipesSection.showingResults')} <strong class="text-[#302018] font-bold">${recipesList.length}</strong> ${t('recipesSection.authenticRecipes')}
          ${activeFilters.flavor !== 'semua' ? `<span class="ml-1 text-[#B85C38] font-bold">(${activeFilters.flavor})</span>` : ''}
          ${activeFilters.region !== 'semua' ? `<span class="ml-1 text-[#B85C38] font-bold">(${activeFilters.region})</span>` : ''}
        </div>
      </div>

      <!-- Recipe Grid or Empty State -->
      <div id="recipe-grid-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        ${recipesList.length > 0 ? recipesList.map(r => renderRecipeCard(r)).join('') : renderEmptyState()}
      </div>

    </div>
  `;
}

function renderEmptyState() {
  return `
    <div class="col-span-full py-16 text-center space-y-4 bg-white rounded-3xl border border-dashed border-[#B85C38]/40 p-8">
      <div class="w-16 h-16 rounded-2xl bg-[#F2E8D8] text-[#B85C38] flex items-center justify-center mx-auto shadow-xs">
        <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
      </div>
      <div class="space-y-1">
        <h3 class="font-editorial-serif text-2xl font-bold text-[#302018]">${t('recipesSection.emptyTitle')}</h3>
        <p class="text-sm text-[#654332] max-w-md mx-auto">
          ${t('recipesSection.emptyDesc')}
        </p>
      </div>
      <div class="pt-2">
        <button id="empty-state-reset" type="button" class="px-5 py-2.5 rounded-full text-xs font-bold bg-[#302018] text-[#FAF6EF] hover:bg-[#B85C38] transition-colors shadow-xs">
          ${t('recipesSection.emptyResetBtn')}
        </button>
      </div>
    </div>
  `;
}

export function initRecipesPageInteractions() {
  const searchInput = document.getElementById('recipe-search-input');
  const searchClear = document.getElementById('recipe-search-clear');
  const sortSelect = document.getElementById('recipe-sort-select');
  const regionSelect = document.getElementById('filter-region');
  const durationSelect = document.getElementById('filter-duration');
  const diffSelect = document.getElementById('filter-difficulty');
  const resetBtn = document.getElementById('filter-reset-btn');
  const emptyReset = document.getElementById('empty-state-reset');

  async function updateResults() {
    const list = await recipeService.getRecipes(activeFilters);
    const grid = document.getElementById('recipe-grid-container');
    const counter = document.getElementById('recipe-count-indicator');

    if (grid) {
      grid.innerHTML = list.length > 0 ? list.map(r => renderRecipeCard(r)).join('') : renderEmptyState();
      
      const emptyBtn = document.getElementById('empty-state-reset');
      if (emptyBtn) {
        emptyBtn.onclick = resetAll;
      }
    }

    if (counter) {
      counter.innerHTML = `
        ${t('recipesSection.showingResults')} <strong class="text-[#302018] font-bold">${list.length}</strong> ${t('recipesSection.authenticRecipes')}
        ${activeFilters.flavor !== 'semua' ? `<span class="ml-1 text-[#B85C38] font-bold">(${activeFilters.flavor})</span>` : ''}
        ${activeFilters.region !== 'semua' ? `<span class="ml-1 text-[#B85C38] font-bold">(${activeFilters.region})</span>` : ''}
      `;
    }
  }

  function resetAll() {
    activeFilters = {
      search: '',
      region: 'semua',
      flavor: 'semua',
      duration: 'semua',
      difficulty: 'semua',
      sort: 'popular'
    };
    if (searchInput) searchInput.value = '';
    if (regionSelect) regionSelect.value = 'semua';
    if (durationSelect) durationSelect.value = 'semua';
    if (diffSelect) diffSelect.value = 'semua';
    if (sortSelect) sortSelect.value = 'popular';
    
    // Reset flavor pills
    document.querySelectorAll('.filter-pill').forEach(btn => {
      const val = btn.getAttribute('data-value');
      if (val === 'semua') {
        btn.className = 'filter-pill px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all bg-[#302018] text-white shadow-xs';
      } else {
        btn.className = 'filter-pill px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all bg-[#FAF6EF] text-[#654332] hover:bg-[#F2E8D8] border border-[#E5D9C5]';
      }
    });

    updateResults();
  }

  // Bind Search with debounce
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        activeFilters.search = e.target.value;
        updateResults();
      }, 250);
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      activeFilters.search = '';
      updateResults();
    });
  }

  // Bind Dropdowns
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeFilters.sort = e.target.value;
      updateResults();
    });
  }

  if (regionSelect) {
    regionSelect.addEventListener('change', (e) => {
      activeFilters.region = e.target.value;
      updateResults();
    });
  }

  if (durationSelect) {
    durationSelect.addEventListener('change', (e) => {
      activeFilters.duration = e.target.value;
      updateResults();
    });
  }

  if (diffSelect) {
    diffSelect.addEventListener('change', (e) => {
      activeFilters.difficulty = e.target.value;
      updateResults();
    });
  }

  // Bind Flavor Pills
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-value');
      activeFilters.flavor = value;

      document.querySelectorAll('.filter-pill').forEach(b => {
        b.className = 'filter-pill px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all bg-[#FAF6EF] text-[#654332] hover:bg-[#F2E8D8] border border-[#E5D9C5]';
      });

      if (value === 'semua') {
        btn.className = 'filter-pill px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all bg-[#302018] text-white shadow-xs';
      } else {
        btn.className = 'filter-pill px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all bg-[#B85C38] text-white font-bold shadow-xs';
      }

      updateResults();
    });
  });

  if (resetBtn) resetBtn.addEventListener('click', resetAll);
  if (emptyReset) emptyReset.addEventListener('click', resetAll);
}
