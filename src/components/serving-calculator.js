import { scaleIngredientAmount } from '../utils/formatters.js';
import { t, i18n } from '../i18n/index.js';

/**
 * Editorial Serving Size Calculator Component
 * Free input with stepper buttons (1 to 100), quick presets,
 * and automatic real-time ingredient scaling.
 */

export const MIN_SERVINGS = 1;
export const MAX_SERVINGS = 100;

export function renderServingCalculator(baseServings = 4, activeServings = 4) {
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
  const currentVal = Math.max(MIN_SERVINGS, Math.min(MAX_SERVINGS, parseInt(activeServings) || baseServings || 4));

  return `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-[#FAF7F2] border border-[#D49B42]/35 shadow-xs">
      
      <!-- Label & Icon -->
      <div class="flex items-center gap-3.5">
        <div class="w-11 h-11 rounded-2xl bg-[#1E120A] text-[#D49B42] border border-[#D49B42]/40 flex items-center justify-center font-bold text-xs shadow-md shrink-0">
          <svg class="w-5 h-5 text-[#D49B42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div>
          <span class="block text-xs font-bold uppercase tracking-wider text-[#120B07] flex items-center gap-1.5">
            <span class="text-[#C84C24]">✦</span>
            <span>${t('recipeDetail.scaleNotice')}</span>
          </span>
          <span class="text-[11px] text-[#5C3622] block mt-0.5">${t('recipeDetail.scaleSub')}</span>
          <span class="text-[10px] text-[#2E4D38] font-bold block mt-0.5">
            ${isEn ? `Range: ${MIN_SERVINGS} – ${MAX_SERVINGS} servings` : `Watesan porsi: ${MIN_SERVINGS} s/d ${MAX_SERVINGS} porsi`}
          </span>
        </div>
      </div>

      <!-- Free Numeric Input & Steppers -->
      <div class="flex items-center flex-wrap gap-2.5 sm:gap-3">
        
        <!-- Interactive Stepper with Free Custom Input -->
        <div class="inline-flex items-center rounded-2xl border border-[#D49B42]/35 bg-white p-1 shadow-sm">
          
          <!-- Decrement Button -->
          <button 
            type="button" 
            id="portion-dec-btn"
            aria-label="Kurangi Porsi"
            class="w-9 h-9 rounded-xl flex items-center justify-center text-[#5C3622] hover:bg-[#FAF7F2] active:bg-[#E8DEC8] transition-all font-bold text-base cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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
              class="w-16 sm:w-20 text-center font-bold text-base text-[#120B07] bg-transparent outline-none py-1 focus:ring-1 focus:ring-[#C84C24] rounded-lg transition-all appearance-none"
            />
            <span class="text-[11px] font-bold text-[#8C624D] pr-1.5 pointer-events-none">
              ${isEn ? 'srv' : 'porsi'}
            </span>
          </div>

          <!-- Increment Button -->
          <button 
            type="button" 
            id="portion-inc-btn"
            aria-label="Tambah Porsi"
            class="w-9 h-9 rounded-xl flex items-center justify-center text-[#5C3622] hover:bg-[#FAF7F2] active:bg-[#E8DEC8] transition-all font-bold text-base cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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
            class="px-3 py-2 rounded-xl border border-[#D49B42]/40 bg-white hover:bg-[#FAF7F2] text-[#120B07] text-[11px] font-bold transition-all shadow-xs cursor-pointer"
          >
            ${isEn ? `Base (${baseServings})` : `Asli (${baseServings})`}
          </button>
          
          ${[2, 4, 10, 20].filter(q => q !== baseServings).map(q => `
            <button 
              type="button" 
              data-quick-servings="${q}"
              class="px-2.5 py-2 rounded-xl border border-[#E8DEC8] bg-white hover:bg-[#FAF7F2] text-[#5C3622] text-[11px] font-semibold transition-all shadow-2xs cursor-pointer hidden sm:inline-block"
            >
              ${q}
            </button>
          `).join('')}
        </div>

      </div>

    </div>
  `;
}

export function initServingCalculator(arg1, arg2, arg3) {
  let baseRecipe = arg1;
  let onServingsChangeCallback = arg2;

  // Support both (recipe, callback) and (container, recipe, callback) signatures
  if (arg1 instanceof HTMLElement && arg2) {
    baseRecipe = arg2;
    onServingsChangeCallback = arg3;
  }

  const inputEl = document.getElementById('portion-custom-input');
  const decBtn = document.getElementById('portion-dec-btn');
  const incBtn = document.getElementById('portion-inc-btn');
  const quickBtns = document.querySelectorAll('[data-quick-servings]');

  if (!inputEl) return;

  function updateValue(val) {
    let numeric = parseInt(val, 10);
    if (isNaN(numeric)) numeric = baseRecipe?.baseServings || 4;
    numeric = Math.max(MIN_SERVINGS, Math.min(MAX_SERVINGS, numeric));

    inputEl.value = numeric;

    if (decBtn) decBtn.disabled = numeric <= MIN_SERVINGS;
    if (incBtn) incBtn.disabled = numeric >= MAX_SERVINGS;

    if (typeof onServingsChangeCallback === 'function') {
      onServingsChangeCallback(numeric);
    }
  }

  if (decBtn) {
    decBtn.onclick = () => {
      const current = parseInt(inputEl.value, 10) || baseRecipe.baseServings;
      updateValue(current - 1);
    };
  }

  if (incBtn) {
    incBtn.onclick = () => {
      const current = parseInt(inputEl.value, 10) || baseRecipe.baseServings;
      updateValue(current + 1);
    };
  }

  inputEl.addEventListener('input', (e) => {
    const raw = e.target.value;
    if (raw === '') return;
    updateValue(raw);
  });

  inputEl.addEventListener('blur', (e) => {
    const raw = e.target.value;
    if (raw === '' || isNaN(parseInt(raw, 10))) {
      updateValue(baseRecipe.baseServings || 4);
    } else {
      updateValue(raw);
    }
  });

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetVal = btn.getAttribute('data-quick-servings');
      if (targetVal) updateValue(targetVal);
    });
  });
}
