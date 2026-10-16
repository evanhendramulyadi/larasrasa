import { scaleIngredientAmount } from '../utils/formatters.js';
import { t } from '../i18n/index.js';

/**
 * Upgraded Serving Size Calculator Component
 */

export function renderServingCalculator(baseServings = 4, activeServings = 4) {
  const portionOptions = [2, 4, 6, 8, 12];

  return `
    <div class="flex items-center justify-between flex-wrap gap-3 p-4 sm:p-5 rounded-2xl bg-[#F2E8D8]/70 border border-[#E5D9C5]">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-[#302018] text-[#C49A58] flex items-center justify-center font-bold text-xs shadow-xs">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div>
          <span class="block text-xs font-bold uppercase tracking-wider text-[#302018]">${t('recipeDetail.scaleNotice')}</span>
          <span class="text-[11px] text-[#654332]">${t('recipeDetail.scaleSub')}</span>
        </div>
      </div>

      <div class="inline-flex rounded-xl border border-[#E5D9C5] bg-white p-1 shadow-2xs" role="group" aria-label="Portion Selection">
        ${portionOptions.map(p => {
          const isSelected = p === activeServings;
          return `
            <button type="button" 
                    data-servings="${p}"
                    class="portion-btn px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      isSelected 
                        ? 'bg-[#B85C38] text-white shadow-xs' 
                        : 'text-[#654332] hover:bg-[#FAF6EF]'
                    }">
              ${p} ${t('common.servings')}
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

export function initServingCalculator(container, recipe, onPortionChange) {
  const buttons = container.querySelectorAll('.portion-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetServings = parseInt(btn.getAttribute('data-servings'));
      
      // Update UI button state
      buttons.forEach(b => {
        b.classList.remove('bg-[#B85C38]', 'text-white', 'shadow-xs');
        b.classList.add('text-[#654332]');
      });
      btn.classList.add('bg-[#B85C38]', 'text-white', 'shadow-xs');
      btn.classList.remove('text-[#654332]');

      // Trigger callback
      if (typeof onPortionChange === 'function') {
        onPortionChange(targetServings);
      }
    });
  });
}
