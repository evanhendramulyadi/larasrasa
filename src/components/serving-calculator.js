import { t, i18n } from '../i18n/index.js';

/**
 * Editorial Serving Info Component (Fixed 4 People Standard)
 * Clean, verified heritage banner showing 4-person family calibration
 * without unnecessary steppers or complex inputs.
 */

export const DEFAULT_SERVINGS = 4;

export function renderServingCalculator(baseServings = 4, activeServings = 4) {
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';

  return `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-[#FAF7F2] border border-[#D49B42]/35 shadow-xs">
      
      <!-- Label & Heritage Icon -->
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
            <span>${isEn ? 'Standard Recipe Servings: 4 People' : 'Takaran Saji Resep: 4 Orang'}</span>
          </span>
          <span class="text-[11px] text-[#5C3622] block mt-0.5">
            ${isEn 
              ? 'All spice ratios and ingredient measurements below are calibrated for 4 people.' 
              : 'Seluruh komposisi bumbu dan gramasi bahan di bawah telah disesuaikan pas untuk kebutuhan santap 4 orang.'}
          </span>
        </div>
      </div>

      <!-- Static Verified Badge (Fixed 4 People) -->
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#D49B42]/35 shadow-2xs text-xs font-bold text-[#120B07] shrink-0 self-start sm:self-auto">
        <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
        <span>${isEn ? '4 People (Family Standard)' : '4 Orang (Standar Keluarga)'}</span>
      </div>

    </div>
  `;
}

export function initServingCalculator() {
  // Static 4 people scale - no adjustment controls needed
}
