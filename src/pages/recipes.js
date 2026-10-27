import { recipeService } from '../services/recipeService.js';
import { renderFilterPanel } from '../components/filter-panel.js';
import { renderRecipeCard } from '../components/recipe-card.js';
import { t, i18n } from '../i18n/index.js';

/**
 * Editorial Royal Heritage Recipe Discovery Listing Page
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
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <!-- Page Header with Javanese Heritage Gradient -->
      <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-14 border-2 border-[#D49B42]/40 shadow-2xl bg-gradient-to-r from-[#120B07] via-[#1E120A] to-[#120B07] text-[#FAF7F2]">
        <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#D49B42]/15 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#C84C24]/18 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 space-y-3.5 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#D49B42]/40 text-xs font-bold text-[#D49B42] uppercase tracking-wider shadow-xs">
            <span class="w-2 h-2 rounded-full bg-[#C84C24] animate-pulse"></span>
            <span>${t('recipesSection.badge')}</span>
          </div>
          <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            ${t('recipesSection.title')}
          </h1>
          <p class="text-sm sm:text-base text-[#FAF7F2]/85 leading-relaxed">
            ${t('recipesSection.description')}
          </p>
        </div>
      </div>

      <!-- Filter & Search Controls -->
      <div id="recipe-filter-container">
        ${renderFilterPanel(activeFilters)}
      </div>

      <!-- Result Counter & Status -->
      <div class="flex items-center justify-between text-xs text-[#2E4D38] pb-3 border-b border-[#D49B42]/25">
        <div id="recipe-count-indicator" class="font-medium text-xs sm:text-sm">
          ${t('recipesSection.showingResults')} <strong class="text-[#120B07] font-bold">${recipesList.length}</strong> ${t('recipesSection.authenticRecipes')}
          ${activeFilters.flavor !== 'semua' ? `<span class="ml-1.5 text-[#C84C24] font-bold">(${activeFilters.flavor})</span>` : ''}
          ${activeFilters.region !== 'semua' ? `<span class="ml-1.5 text-[#C84C24] font-bold">(${activeFilters.region})</span>` : ''}
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
    <div class="col-span-full py-16 text-center space-y-5 bg-white rounded-3xl border-2 border-dashed border-[#D49B42]/40 p-8 shadow-xs">
      <div class="w-16 h-16 rounded-3xl bg-[#FAF7F2] border border-[#D49B42]/40 text-[#C84C24] flex items-center justify-center mx-auto shadow-sm">
        <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
      </div>
      <div class="space-y-1.5">
        <h3 class="font-editorial-serif text-2xl font-bold text-[#120B07]">${t('recipesSection.emptyTitle')}</h3>
        <p class="text-sm text-[#5C3622] max-w-md mx-auto leading-relaxed">
          ${t('recipesSection.emptyDesc')}
        </p>
      </div>
      <div class="pt-2">
        <button id="empty-state-reset" type="button" class="px-6 py-3 rounded-full text-xs font-bold bg-[#120B07] text-[#FAF7F2] hover:bg-[#C84C24] transition-all shadow-sm cursor-pointer border border-[#D49B42]/40">
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

  async function applyFilters() {
    const list = await recipeService.getRecipes(activeFilters);
    const container = document.getElementById('recipe-grid-container');
    const indicator = document.getElementById('recipe-count-indicator');

    if (container) {
      container.innerHTML = list.length > 0 ? list.map(r => renderRecipeCard(r)).join('') : renderEmptyState();
      
      const emptyReset = document.getElementById('empty-state-reset');
      if (emptyReset) {
        emptyReset.onclick = () => {
          activeFilters = {
            search: '',
            region: 'semua',
            flavor: 'semua',
            duration: 'semua',
            difficulty: 'semua',
            sort: 'popular'
          };
          window.location.hash = '#/resep';
        };
      }
    }

    if (indicator) {
      indicator.innerHTML = `
        ${t('recipesSection.showingResults')} <strong class="text-[#120B07] font-bold">${list.length}</strong> ${t('recipesSection.authenticRecipes')}
        ${activeFilters.flavor !== 'semua' ? `<span class="ml-1.5 text-[#C84C24] font-bold">(${activeFilters.flavor})</span>` : ''}
        ${activeFilters.region !== 'semua' ? `<span class="ml-1.5 text-[#C84C24] font-bold">(${activeFilters.region})</span>` : ''}
      `;
    }
  }

  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        activeFilters.search = e.target.value;
        applyFilters();
      }, 300);
    });
  }

  if (searchClear && searchInput) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      activeFilters.search = '';
      applyFilters();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeFilters.sort = e.target.value;
      applyFilters();
    });
  }

  if (regionSelect) {
    regionSelect.addEventListener('change', (e) => {
      activeFilters.region = e.target.value;
      applyFilters();
    });
  }

  if (durationSelect) {
    durationSelect.addEventListener('change', (e) => {
      activeFilters.duration = e.target.value;
      applyFilters();
    });
  }

  if (diffSelect) {
    diffSelect.addEventListener('change', (e) => {
      activeFilters.difficulty = e.target.value;
      applyFilters();
    });
  }

  // Flavor pills
  const flavorPills = document.querySelectorAll('[data-filter-type="flavor"]');
  flavorPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const val = pill.getAttribute('data-value');
      activeFilters.flavor = val;
      flavorPills.forEach(p => {
        const isCurrent = p.getAttribute('data-value') === val;
        p.className = `filter-pill px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
          isCurrent 
            ? (val === 'semua' ? 'bg-[#1E120A] text-[#FAF7F2] ring-1 ring-[#D49B42]/50 shadow-xs' : 'bg-[#C84C24] text-white font-bold shadow-md ring-2 ring-[#C84C24]/30')
            : 'bg-[#FAF7F2] text-[#5C3622] hover:bg-[#EFE8DA] border border-[#E8DEC8]'
        }`;
      });
      applyFilters();
    });
  });
}
