import { scaleIngredientAmount } from '../utils/formatters.js';
import { t, i18n } from '../i18n/index.js';

/**
 * Custom Free-Input Serving Size Calculator Component
 * Allows user to enter any custom portion freely with reasonable min-max limits (1 to 100).
 */

export const MIN_SERVINGS = 1;
export const MAX_SERVINGS = 100;

export function renderServingCalculator(baseServings = 4, activeServings = 4) {
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
  const currentVal = Math.max(MIN_SERVINGS, Math.min(MAX_SERVINGS, parseInt(activeServings) || baseServings || 4));

  return `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#F2E8D8]/70 border border-[#E5D9C5] shadow-2xs">
      
      <!-- Label & Icon -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-[#302018] text-[#C49A58] flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div>
          <span class="block text-xs font-bold uppercase tracking-wider text-[#302018]">${t('recipeDetail.scaleNotice')}</span>
          <span class="text-[11px] text-[#654332] block">${t('recipeDetail.scaleSub')}</span>
          <span class="text-[10px] text-[#8C624D] font-medium block mt-0.5">
            ${isEn ? `Range: ${MIN_SERVINGS} – ${MAX_SERVINGS} servings` : `Batas wajar: ${MIN_SERVINGS} s/d ${MAX_SERVINGS} porsi`}
          </span>
        </div>
      </div>

      <!-- Free Numeric Input & Steppers -->
      <div class="flex items-center flex-wrap gap-2 sm:gap-3">
        
        <!-- Interactive Stepper with Free Custom Input -->
        <div class="inline-flex items-center rounded-xl border border-[#E5D9C5] bg-white p-1 shadow-xs">
          
          <!-- Decrement Button -->
          <button 
            type="button" 
            id="portion-dec-btn"
            aria-label="Kurangi Porsi"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-[#654332] hover:bg-[#FAF6EF] active:bg-[#E5D9C5] transition-all font-bold text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            ${currentVal <= MIN_SERVINGS ? 'disabled' : ''}
          >
            &minus;
          </button>

          <!-- Free Custom Number Input -->
          <div class="relative flex items-center px-1">
            <input 
              type="number" 
              id="portion-custom-input"
              name="customServings"
              min="${MIN_SERVINGS}" 
              max="${MAX_SERVINGS}" 
              value="${currentVal}"
              aria-label="Jumlah Porsi"
              class="w-16 sm:w-20 text-center font-bold text-sm text-[#302018] bg-transparent outline-none py-1 focus:ring-1 focus:ring-[#B85C38] rounded-md transition-all appearance-none"
            />
            <span class="text-[11px] font-semibold text-[#8C624D] pr-1.5 pointer-events-none">
              ${isEn ? 'srv' : 'porsi'}
            </span>
          </div>

          <!-- Increment Button -->
          <button 
            type="button" 
            id="portion-inc-btn"
            aria-label="Tambah Porsi"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-[#654332] hover:bg-[#FAF6EF] active:bg-[#E5D9C5] transition-all font-bold text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            ${currentVal >= MAX_SERVINGS ? 'disabled' : ''}
          >
            &#43;
          </button>
        </div>

        <!-- Quick Shortcut / Reset Pills -->
        <div class="flex items-center gap-1.5 text-xs">
          <button 
            type="button" 
            data-quick-servings="${baseServings}"
            title="${isEn ? 'Reset to base recipe servings' : 'Kembali ke porsi standar resep'}"
            class="px-2.5 py-1.5 rounded-lg border border-[#E5D9C5] bg-white hover:bg-[#FAF6EF] text-[#654332] text-[11px] font-bold transition-all shadow-2xs cursor-pointer"
          >
            ${isEn ? `Base (${baseServings})` : `Asli (${baseServings})`}
          </button>
          
          ${[2, 4, 10, 25].filter(q => q !== baseServings).map(q => `
            <button 
              type="button" 
              data-quick-servings="${q}"
              class="px-2 py-1.5 rounded-lg border border-[#E5D9C5] bg-white hover:bg-[#FAF6EF] text-[#654332] text-[11px] font-medium transition-all shadow-2xs cursor-pointer hidden sm:inline-block"
            >
              ${q}
            </button>
          `).join('')}
        </div>

      </div>

    </div>
  `;
}

export function initServingCalculator(container, recipe, onPortionChange) {
  if (!container || !recipe) return;

  const input = container.querySelector('#portion-custom-input');
  const decBtn = container.querySelector('#portion-dec-btn');
  const incBtn = container.querySelector('#portion-inc-btn');
  const quickBtns = container.querySelectorAll('[data-quick-servings]');

  const clamp = (val) => {
    let num = parseInt(val, 10);
    if (isNaN(num)) num = recipe.baseServings || 4;
    return Math.max(MIN_SERVINGS, Math.min(MAX_SERVINGS, num));
  };

  const updateState = (newVal) => {
    const clamped = clamp(newVal);
    if (input) {
      input.value = clamped;
    }
    if (decBtn) {
      decBtn.disabled = clamped <= MIN_SERVINGS;
    }
    if (incBtn) {
      incBtn.disabled = clamped >= MAX_SERVINGS;
    }
    if (typeof onPortionChange === 'function') {
      onPortionChange(clamped);
    }
  };

  if (input) {
    // Real-time on input
    input.addEventListener('input', () => {
      if (input.value === '') return; // Allow user to type freely without instant jump
      const val = parseInt(input.value, 10);
      if (!isNaN(val)) {
        if (val > MAX_SERVINGS) {
          input.value = MAX_SERVINGS;
        }
        updateState(input.value);
      }
    });

    // Enforce on blur or change
    input.addEventListener('change', () => {
      updateState(input.value);
    });

    input.addEventListener('blur', () => {
      updateState(input.value);
    });
  }

  if (decBtn) {
    decBtn.addEventListener('click', () => {
      const current = parseInt(input?.value, 10) || recipe.baseServings || 4;
      updateState(current - 1);
    });
  }

  if (incBtn) {
    incBtn.addEventListener('click', () => {
      const current = parseInt(input?.value, 10) || recipe.baseServings || 4;
      updateState(current + 1);
    });
  }

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.getAttribute('data-quick-servings'), 10);
      if (!isNaN(target)) {
        updateState(target);
      }
    });
  });
}
