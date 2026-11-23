import { i18n } from '../i18n/index.js';

export function formatRupiah(number) {
  if (typeof number !== 'number') return number;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
}

export function formatDuration(minutes) {
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
  const mins = parseInt(minutes) || 0;
  if (mins < 60) return `${mins} ${isEn ? 'Mins' : 'Menit'}`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return remainingMins > 0 
    ? `${hours} ${isEn ? 'hr' : 'Jam'} ${remainingMins} ${isEn ? 'mins' : 'Mnt'}` 
    : `${hours} ${isEn ? 'hr' : 'Jam'}`;
}

/**
 * Calculates and formats ingredient amount proportionally according to target servings.
 * Example: base amount 0.5 for 4 servings -> if target is 8, result = 1
 */
export function scaleIngredientAmount(baseAmount, baseServings, targetServings) {
  if (typeof baseAmount !== 'number') return baseAmount;
  const scaled = (baseAmount / baseServings) * targetServings;
  
  // Format clean integer (e.g. 1, 2)
  if (Number.isInteger(scaled)) {
    return scaled.toString();
  }
  // Proportional rounding to 1 or 2 decimal places
  return parseFloat(scaled.toFixed(2)).toString();
}

/**
 * Returns difficulty badge styling and localized label
 */
export function getDifficultyBadge(difficulty) {
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
  const d = difficulty?.toLowerCase();

  switch (d) {
    case 'sangat mudah':
    case 'very easy':
      return { label: isEn ? 'Very Easy' : 'Sangat Mudah', class: 'bg-emerald-50 text-emerald-800 border border-emerald-200' };
    case 'mudah':
    case 'easy':
      return { label: isEn ? 'Easy' : 'Mudah', class: 'bg-teal-50 text-teal-800 border border-teal-200' };
    case 'sedang':
    case 'medium':
    case 'moderate':
      return { label: isEn ? 'Moderate' : 'Sedang', class: 'bg-amber-50 text-amber-800 border border-amber-200' };
    case 'sulit':
    case 'hard':
    case 'advanced':
      return { label: isEn ? 'Advanced' : 'Mahir', class: 'bg-rose-50 text-rose-800 border border-rose-200' };
    default:
      return { label: difficulty || (isEn ? 'Moderate' : 'Sedang'), class: 'bg-stone-50 text-stone-800 border border-stone-200' };
  }
}

