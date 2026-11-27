import { 
  aiFoodCreatorService, 
  getLocalizedRecipeSteps,
  INGREDIENT_CATALOG, 
  ALL_INGREDIENTS, 
  PREFERENCE_OPTIONS 
} from '../services/aiFoodCreatorService.js';
import { i18n, t } from '../i18n/index.js';
import { escapeHtml, scrollToTop } from '../utils/dom.js';

/**
 * LarasRasa AI Food Creator Studio
 * 
 * Interactive Culinary Studio:
 * - Creator identity & attribution input
 * - Searchable Central Javanese ingredient catalog
 * - Culinary calibration: traditional method, taste profile, spice warmth, portion scaling (standard 4 portions), custom notes
 * - Authentic recipe synthesis with scaled measurements, traditional techniques, and flavor calibration
 * - Direct recipe document download (PDF)
 * - 100% reactive bilingual support (ID with Javanese touch & EN)
 */

function getRandomFiveIngredients() {
  return [...ALL_INGREDIENTS].sort(() => 0.5 - Math.random()).slice(0, 5).map(i => i.id);
}

let searchQuery = '';
let formState = {
  creatorName: '',
  selectedIngredientIds: getRandomFiveIngredients(),
  cookingMethod: 'ungkep',
  dishCategory: 'lauk',
  tasteProfile: 'manis-gurih',
  spiceLevel: 1,
  cookingDuration: 'standard',
  servings: 4,
  equipment: ['wajan', 'cobek'],
  dietary: [],
  customNotes: '',
  outputLanguage: 'id'
};

const COOLDOWN_KEY = 'larasrasa_last_ai_recipe_timestamp';
const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes limit per session
const MIN_INGREDIENTS = 5;
const MAX_INGREDIENTS = 10;

let currentGeneratedRecipe = null;
let isVerifying = false;
let isGenerating = false;
let currentGeneratingPercent = 20;
let currentGeneratingStageIdx = 0;
let validationMessage = null;
let sessionAlert = null; // { type: 'cooldown' | 'credit' | 'forbidden' | 'error', minutes?: number }
let toastMessage = null;
let nameError = false;
let ingredientError = null; // null | 'min' | 'max'
let generationRunId = 0;
let searchDebounce = null;

function safeGetStorage(key) {
  if (typeof localStorage === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetStorage(key, value) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage quota/privacy mode errors
  }
}

function safeRemoveStorage(key) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage privacy mode errors
  }
}

function getCooldownStorageState() {
  const raw = safeGetStorage(COOLDOWN_KEY);
  if (!raw) return null;
  const parsedTs = Number.parseInt(raw, 10);
  const now = Date.now();
  if (Number.isFinite(parsedTs) && parsedTs > 0 && parsedTs <= now) {
    const elapsed = now - parsedTs;
    if (elapsed < COOLDOWN_MS) {
      return {
        timestamp: raw,
        minutes: Math.max(1, Math.ceil((COOLDOWN_MS - elapsed) / 60000))
      };
    }
  }
  safeRemoveStorage(COOLDOWN_KEY);
  return null;
}

function restoreCooldownStorage(previousTimestamp) {
  if (previousTimestamp) {
    safeSetStorage(COOLDOWN_KEY, previousTimestamp);
  } else {
    safeRemoveStorage(COOLDOWN_KEY);
  }
}

function isOnAiFoodCreatorRoute() {
  if (typeof window === 'undefined' || !window.location) return true;
  const hashPath = (window.location.hash || '#/').split('?')[0];
  return hashPath === '#/ai-food-creator';
}

const GENERATING_STAGES_ID = [
  { pct: 28, text: 'Menyelaraskan rempah tradisi...' },
  { pct: 54, text: 'Menghitung takaran bumbu presisi...' },
  { pct: 79, text: 'Menyusun panduan langkah memasak...' },
  { pct: 93, text: 'Menyempurnakan dokumen resep...' }
];

const GENERATING_STAGES_EN = [
  { pct: 28, text: 'Harmonizing heritage spices...' },
  { pct: 54, text: 'Calibrating precise measurements...' },
  { pct: 79, text: 'Formulating step-by-step cooking guide...' },
  { pct: 93, text: 'Finalizing authentic recipe document...' }
];

export function isAiFoodCreatorVerifying() {
  return isVerifying;
}

export function isAiFoodCreatorGenerating() {
  return isGenerating;
}

export function updateAiFoodCreatorGeneratingLanguage(targetLang) {
  const isEn = targetLang === 'en';
  const badgeEl = document.getElementById('generating-badge');
  if (badgeEl) {
    badgeEl.textContent = isEn ? 'LarasRasa AI Culinary Experiment Studio' : 'Studio Eksperimen Kuliner AI LarasRasa';
  }
  const titleEl = document.getElementById('generating-title');
  if (titleEl) {
    titleEl.textContent = isEn ? 'Formulating Authentic Culinary Creation...' : 'Meracik Kreasi Resep Pusaka Otentik...';
  }
  const descEl = document.getElementById('generating-desc');
  if (descEl) {
    descEl.textContent = isEn
      ? 'Harmonizing regional spices, calculating precise ingredient grammage, and formulating your authentic recipe document.'
      : 'Menyelaraskan rempah tradisi, menghitung takaran bumbu presisi, dan menyusun dokumen resep pusaka autentik.';
  }
  const stageEl = document.getElementById('generating-progress-stage');
  if (stageEl) {
    const stages = isEn ? GENERATING_STAGES_EN : GENERATING_STAGES_ID;
    const stage = stages[currentGeneratingStageIdx] || stages[0];
    stageEl.textContent = stage.text;
  }
}

export function resetAiFoodCreatorState() {
  generationRunId++;
  if (searchDebounce) {
    clearTimeout(searchDebounce);
    searchDebounce = null;
  }
  if (typeof window !== 'undefined' && window.__larasRasaProgressTimer) {
    clearInterval(window.__larasRasaProgressTimer);
    window.__larasRasaProgressTimer = null;
  }
  currentGeneratingPercent = 20;
  currentGeneratingStageIdx = 0;
  searchQuery = '';
  formState = {
    creatorName: '',
    selectedIngredientIds: getRandomFiveIngredients(),
    cookingMethod: 'ungkep',
    dishCategory: 'lauk',
    tasteProfile: 'manis-gurih',
    spiceLevel: 1,
    cookingDuration: 'standard',
    servings: 4,
    equipment: ['wajan', 'cobek'],
    dietary: [],
    customNotes: '',
    outputLanguage: 'id'
  };
  currentGeneratedRecipe = null;
  isVerifying = false;
  isGenerating = false;
  validationMessage = null;
  sessionAlert = null;
  toastMessage = null;
  nameError = false;
  ingredientError = null;
}

export async function renderAiFoodCreatorPage() {
  const currentLang = i18n?.getLanguage ? i18n.getLanguage() : 'id';

  if (!formState.selectedIngredientIds || formState.selectedIngredientIds.length < MIN_INGREDIENTS) {
    formState.selectedIngredientIds = getRandomFiveIngredients();
  } else if (formState.selectedIngredientIds.length > MAX_INGREDIENTS) {
    formState.selectedIngredientIds = formState.selectedIngredientIds.slice(0, MAX_INGREDIENTS);
  }

  if (isGenerating) {
    return renderGeneratingState(currentLang);
  }

  if (
    currentGeneratedRecipe &&
    currentGeneratedRecipe.title &&
    Array.isArray(currentGeneratedRecipe.ingredients) &&
    currentGeneratedRecipe.ingredients.length > 0 &&
    getLocalizedRecipeSteps(currentGeneratedRecipe, currentLang === 'en').length > 0
  ) {
    return renderResultView(currentGeneratedRecipe, currentLang);
  }

  return renderFormView(currentLang);
}

/**
 * Generating State with Javanese Culinary Animation
 */
function renderGeneratingState(currentLang) {
  const isEn = currentLang === 'en';
  const stages = isEn ? GENERATING_STAGES_EN : GENERATING_STAGES_ID;
  const currentStage = stages[currentGeneratingStageIdx] || stages[0];

  return `
    <div class="max-w-3xl mx-auto px-4 py-24 text-center space-y-6 animate-fade-in">
      <div class="relative w-24 h-24 mx-auto">
        <div class="absolute inset-0 rounded-3xl bg-[#D49B42]/15 blur-md"></div>
        <div class="w-24 h-24 rounded-3xl bg-[#120B07] border-2 border-[#D49B42] text-[#D49B42] flex items-center justify-center mx-auto shadow-2xl text-4xl">
          <svg class="w-12 h-12 text-[#D49B42] animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10"/>
          </svg>
        </div>
      </div>

      <div class="space-y-3">
        <span class="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#D49B42]/50 text-xs font-bold text-[#C84C24] uppercase tracking-wider shadow-xs">
          <span id="generating-badge">${isEn ? 'LarasRasa AI Culinary Experiment Studio' : 'Studio Eksperimen Kuliner AI LarasRasa'}</span>
        </span>
        <h2 id="generating-title" class="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#120B07]">
          ${isEn ? 'Formulating Authentic Culinary Creation...' : 'Meracik Kreasi Resep Pusaka Otentik...'}
        </h2>
        <p id="generating-desc" class="text-xs sm:text-sm text-[#5C3622] max-w-md mx-auto leading-relaxed">
          ${isEn 
            ? 'Harmonizing regional spices, calculating precise ingredient grammage, and formulating your authentic recipe document.'
            : 'Menyelaraskan rempah tradisi, menghitung takaran bumbu presisi, dan menyusun dokumen resep pusaka autentik.'}
        </p>
      </div>

      <div class="max-w-xs mx-auto pawon-glass p-4 rounded-2xl border border-[#D49B42]/35 text-xs text-[#5C3622] space-y-2 shadow-sm">
        <div class="flex items-center justify-between font-bold">
          <span id="generating-progress-stage" class="text-xs text-[#5C3622] transition-all">
            ${escapeHtml(currentStage.text)}
          </span>
          <span id="generating-progress-percent" class="text-[#C84C24] font-mono">${currentGeneratingPercent}%</span>
        </div>
        <div class="w-full bg-[#FAF7F2] h-2.5 rounded-full overflow-hidden border border-[#E8DEC8]">
          <div id="generating-progress-bar" class="bg-gradient-to-r from-[#D49B42] via-[#C84C24] to-[#2E4D38] h-full rounded-full transition-all duration-700 ease-out" style="width: ${currentGeneratingPercent}%"></div>
        </div>
      </div>
    </div>
  `;
}

function getFilteredIngredients() {
  if (searchQuery.trim().length === 0) {
    return ALL_INGREDIENTS;
  }
  const q = searchQuery.toLowerCase().trim();
  return ALL_INGREDIENTS.filter(i =>
    (i.nameId && i.nameId.toLowerCase().includes(q)) ||
    (i.nameEn && i.nameEn.toLowerCase().includes(q)) ||
    (i.flavorNote && i.flavorNote.toLowerCase().includes(q)) ||
    (i.description && i.description.toLowerCase().includes(q))
  );
}

function renderIngredientChipsBox(isEn, isLocked = isVerifying) {
  const selectedCount = formState.selectedIngredientIds.length;
  const errorMessage = ingredientError === 'max'
    ? (isEn ? `Maximum ${MAX_INGREDIENTS} ingredients can be selected per recipe.` : `Maksimal ${MAX_INGREDIENTS} bahan dapat dipilih untuk satu racikan resep.`)
    : (isEn ? `Minimum ${MIN_INGREDIENTS} ingredients must be selected.` : `Minimal ${MIN_INGREDIENTS} bahan harus tetap dipilih.`);

  const boxClass = isLocked
    ? 'bg-stone-200/70 border-stone-300'
    : (ingredientError ? 'bg-rose-50/25 border-rose-400 ring-1 ring-rose-300' : 'bg-[#FAF7F2] border-[#D49B42]/30');
  const titleClass = isLocked ? 'text-stone-500' : (ingredientError ? 'text-rose-700' : 'text-[#5C3622]');
  const countClass = isLocked ? 'text-stone-500' : (ingredientError ? 'text-rose-600' : 'text-emerald-700');

  return `
          <!-- Active Ingredients Chips Bar -->
          <div id="ingredient-chips-box" class="p-4 rounded-2xl border ${boxClass} space-y-2 transition-all">
            <div class="text-[11px] font-bold uppercase tracking-wider flex items-center justify-between gap-2 flex-wrap">
              <span class="${titleClass}">
                ${isEn ? `Selected Ingredients (Min. ${MIN_INGREDIENTS}, Max. ${MAX_INGREDIENTS}):` : `Bahan yang Siap Masuk ke Racikan (Min. ${MIN_INGREDIENTS}, Maks. ${MAX_INGREDIENTS}):`}
              </span>
              <span class="font-bold ${countClass}">
                ✓ ${selectedCount}/${MAX_INGREDIENTS} ${isEn ? 'ingredients ready' : 'bahan siap diracik'}
              </span>
            </div>
            ${!isLocked && ingredientError ? `
              <p id="ingredient-limit-error" class="text-xs text-rose-600 font-semibold flex items-center gap-1.5 animate-shake">
                <span>${escapeHtml(errorMessage)}</span>
              </p>
            ` : ''}
            <div class="flex flex-wrap gap-1.5">
              ${selectedCount === 0 ? `
                <span class="text-xs italic ${isLocked ? 'text-stone-500' : 'text-[#5C3622]'}">
                  ${isEn ? 'No ingredients selected yet. Click ingredients below to select.': 'Belum ada bahan yang dipilih. Klik bahan-bahan di bawah untuk memilih.'}
                </span>
              ` : formState.selectedIngredientIds.map(id => {
                const item = ALL_INGREDIENTS.find(i => i.id === id);
                if (!item) return '';
                return `
                  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold shadow-2xs ${
                    isLocked
                      ? 'bg-stone-100 border-stone-300 text-stone-500'
                      : 'bg-white border-[#D49B42]/45 text-[#120B07]'
                  }">
                    <span>${escapeHtml(isEn ? (item.nameEn || item.nameId) : item.nameId)}</span>
                    <button type="button" ${isLocked ? 'disabled' : ''} data-remove-ingredient="${escapeHtml(item.id)}" class="font-bold ml-1 text-sm ${
                      isLocked
                        ? 'text-stone-400 cursor-not-allowed'
                        : 'text-[#C84C24] hover:text-rose-700 cursor-pointer'
                    }">&times;</button>
                  </span>
                `;
              }).join('')}
            </div>
          </div>`;
}

function renderIngredientGridItems(filteredIngredients, isEn, isLocked = isVerifying) {
  if (filteredIngredients.length === 0) {
    return `
              <div class="col-span-full py-12 px-4 text-center space-y-3 rounded-3xl border border-dashed ${
                isLocked ? 'bg-stone-200/60 border-stone-300' : 'bg-[#FAF7F2] border-[#D49B42]/50'
              }">
                <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold ${
                  isLocked ? 'bg-stone-400 text-stone-100' : 'bg-[#120B07] text-[#D49B42]'
                }">
                  <svg class="w-5 h-5 ${isLocked ? 'text-stone-100' : 'text-[#D49B42]'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
                <div class="space-y-1">
                  <h3 class="font-editorial-serif text-base sm:text-lg font-bold ${isLocked ? 'text-stone-500' : 'text-[#120B07]'}">
                    ${isEn ? 'Ingredient Not Found' : 'Bahan Tidak Ditemukan'}
                  </h3>
                  <p class="text-xs max-w-sm mx-auto leading-relaxed ${isLocked ? 'text-stone-500' : 'text-[#5C3622]'}">
                    ${isEn 
                      ? `No authentic ingredients match "${escapeHtml(searchQuery)}". Try searching for another keyword like Ayam, Bawang, or Cabai.` 
                      : `Tidak ada bahan atau bumbu yang cocok dengan kata kunci "${escapeHtml(searchQuery)}". Silakan coba kata kunci lain seperti Ayam, Bawang, atau Cabai.`}
                  </p>
                </div>
                <button 
                  type="button" 
                  id="clear-ingredient-search-btn"
                  ${isLocked ? 'disabled' : ''}
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-bold shadow-2xs transition-colors ${
                    isLocked
                      ? 'bg-stone-200 border-stone-300 text-stone-400 cursor-not-allowed'
                      : 'bg-white border-[#D49B42]/50 text-[#C84C24] hover:bg-[#FAF7F2] cursor-pointer'
                  }"
                >
                  <span>✕</span>
                  <span>${isEn ? 'Clear Search Keyword' : 'Bersihkan Kata Kunci'}</span>
                </button>
              </div>
    `;
  }

  const isMaxReached = formState.selectedIngredientIds.length >= MAX_INGREDIENTS;

  return filteredIngredients.map(item => {
    const isSelected = formState.selectedIngredientIds.includes(item.id);
    const cardStateClass = isLocked
      ? (isSelected
          ? 'bg-stone-500 text-stone-100 border-stone-500 ring-2 ring-stone-400 shadow-none cursor-not-allowed'
          : 'bg-stone-100 text-stone-400 border-stone-200 opacity-65 cursor-not-allowed')
      : (isSelected
          ? 'card-hover-lift bg-[#120B07] text-white border-[#C84C24] ring-2 ring-[#C84C24] shadow-sm cursor-pointer'
          : `card-hover-lift ${isMaxReached ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-[#FAF7F2] hover:border-[#D49B42]'} bg-white text-[#120B07] border-[#E8DEC8]`);
    const badgeClass = isLocked
      ? (isSelected ? 'bg-stone-600 text-stone-100' : 'bg-stone-200 text-stone-400')
      : (isSelected ? 'bg-[#C84C24] text-white' : 'bg-black/10 text-[#5C3622] group-hover:bg-[#C84C24]/20');

    return `
                <button 
                  type="button" 
                  data-ingredient-id="${escapeHtml(item.id)}"
                  ${isLocked ? 'disabled' : ''}
                  class="group relative text-left p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 min-h-[3.75rem] ${cardStateClass}"
                >
                  <strong class="text-xs sm:text-sm font-bold block whitespace-normal break-words leading-tight flex-1">
                    ${escapeHtml(isEn ? (item.nameEn || item.nameId) : item.nameId)}
                  </strong>
                  <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${badgeClass}">
                    ${isSelected ? '✓' : '+'}
                  </span>
                </button>
    `;
  }).join('');
}

/**
 * Form View: Interactive Studio Configuration
 */
function renderFormView(currentLang) {
  const isEn = currentLang === 'en';

  // Compute session alert content reactively based on active language (strictly zero emoji)
  // Cooldown notices are shown only when triggered by a generation attempt, never persistently on load/verifying
  function getSessionAlertContent() {
    if (isVerifying) return null;
    const activeAlert = sessionAlert;
    if (!activeAlert) return null;
    if (activeAlert.type === 'cooldown') {
      const activeCooldown = getCooldownStorageState();
      const minutes = activeCooldown?.minutes || activeAlert.minutes || 10;
      const minuteUnit = minutes === 1 ? 'minute' : 'minutes';
      return {
        badge: isEn ? 'Rate Limit Notice' : 'Peringatan Batas Waktu',
        title: isEn ? 'Cooldown in Effect' : 'Batas Waktu Peracikan Resep',
        text: isEn 
          ? `Recipe generation is limited to once every 10 minutes. Please wait ${minutes} more ${minuteUnit} before crafting a new recipe.`
          : `Batas peracikan resep adalah 10 menit sekali. Silakan tunggu ${minutes} menit lagi sebelum meracik resep baru.`,
        isWarning: true
      };
    }
    if (activeAlert.type === 'credit') {
      return {
        badge: isEn ? 'Credit Limit Notice' : 'Pemberitahuan Kuota Resep',
        title: isEn ? 'Global Credits Exhausted' : 'Kredit Global Habis',
        text: isEn
          ? 'Global recipe creation credits are currently exhausted. Please wait until credits become available again.'
          : 'Kredit peracikan resep global telah habis. Silakan tunggu sampai kuota kredit tersedia kembali.',
        isWarning: false
      };
    }
    if (activeAlert.type === 'forbidden' || activeAlert.type === 'backend_error' || activeAlert.type === 'error') {
      return {
        badge: isEn ? 'Service Notice' : 'Pemberitahuan Layanan',
        title: isEn ? 'Backend Connection Notice' : 'Kendala Server Backend',
        text: isEn
          ? 'Failed to load recipe from the service backend. Please check your connection or try again shortly.'
          : 'Gagal memuat resep dari server backend. Silakan periksa koneksi atau coba beberapa saat lagi.',
        isWarning: false
      };
    }
    return {
      badge: isEn ? 'Service Notice' : 'Pemberitahuan Layanan',
      title: isEn ? 'Backend Connection Notice' : 'Kendala Server Backend',
      text: activeAlert.text || (isEn ? 'Failed to load recipe from the service backend. Please check your connection or try again shortly.' : 'Gagal memuat resep dari server backend. Silakan periksa koneksi atau coba beberapa saat lagi.'),
      isWarning: false
    };
  }

  const alertContent = getSessionAlertContent();

  // Filter ingredients directly by search query (no category tabs)
  const filteredIngredients = getFilteredIngredients();

  return `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <!-- Studio Header with Royal Javanese Heritage Gradient -->
      <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-14 text-center max-w-4xl mx-auto border-2 border-[#D49B42]/45 shadow-2xl bg-gradient-to-br from-[#120B07] via-[#1E120A] to-[#120B07] text-[#FAF7F2]">
        <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#D49B42]/15 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#C84C24]/18 blur-3xl pointer-events-none"></div>
        
        <div class="relative z-10 space-y-3.5 max-w-2xl mx-auto">
          <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-[#D49B42]/40 shadow-xs">
            <span class="text-xs font-bold text-[#D49B42] uppercase tracking-wider">
              ${isEn ? 'AI Culinary Studio • Central Java' : 'Studio Eksperimen Kuliner AI • Jawa Tengah'}
            </span>
          </div>
          
          <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            ${isEn ? 'Craft Your Authentic Javanese Recipe' : 'Racik Bumbu & Rancang Konsep Masakan Anda'}
          </h1>
          
          <p class="text-sm sm:text-base text-[#FAF7F2]/85 leading-relaxed">
            ${isEn
              ? 'Select authentic Central Javanese ingredients, calibrate traditional flavors, and generate a complete recipe ready to download.'
              : 'Pilih aneka bahan rempah khas Jawa Tengah, tentukan karakter rasa tradisi, dan racik dokumen resep lengkap yang siap diunduh.'}
          </p>
        </div>
      </div>

      <!-- Interactive Studio Form -->
      <form id="ai-creator-form" class="space-y-8 max-w-4xl mx-auto" aria-busy="${isVerifying ? 'true' : 'false'}">
        
        <fieldset id="ai-creator-fields" ${isVerifying ? 'disabled' : ''} class="space-y-8 min-w-0 border-0 p-0 m-0 ${isVerifying ? 'select-none' : ''}">

          <!-- Input Nama Lengkap User (Pencipta Resep) -->
          <div id="creator-name-box" class="${
            isVerifying
              ? 'bg-stone-100/90 border-stone-300 grayscale opacity-75 cursor-not-allowed'
              : `pawon-glass ${nameError ? 'border-rose-400 bg-rose-50/20 ring-2 ring-rose-200' : 'border-[#D49B42]/35'}`
          } p-5 sm:p-6 rounded-3xl border shadow-xs space-y-2 transition-all scroll-mt-24">
            <div class="flex items-center justify-between">
              <label for="creator-name-input" id="creator-name-label" class="block text-xs font-bold ${
                isVerifying ? 'text-stone-500' : (nameError ? 'text-rose-700' : 'text-[#120B07]')
              } uppercase tracking-wider transition-colors">
                ${isEn ? 'Your Full Name' : 'Nama Lengkap Anda'} <span class="${isVerifying ? 'text-stone-400' : 'text-[#C84C24]'}">*</span>
              </label>
              <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                isVerifying
                  ? 'text-stone-500 bg-stone-200/80 border-stone-300'
                  : 'text-[#C84C24] bg-[#FDF4EE] border-[#C84C24]/30'
              }">
                ${isEn ? 'Recipe Author' : 'Pencipta Resep'}
              </span>
            </div>
            <input 
              type="text" 
              id="creator-name-input" 
              name="creatorName"
              autocomplete="name"
              maxlength="60"
              ${isVerifying ? 'disabled' : ''}
              value="${escapeHtml(formState.creatorName)}"
              placeholder="${isEn ? 'e.g., Evan Hendra Mulyadi' : 'Contoh: Evan Hendra Mulyadi'}"
              class="w-full px-4 py-3 rounded-2xl border ${
                isVerifying
                  ? 'bg-stone-200/70 border-stone-300 text-stone-500 cursor-not-allowed placeholder:text-stone-400'
                  : nameError 
                    ? 'bg-white border-rose-500 ring-2 ring-rose-300 bg-rose-50/30 text-[#120B07]' 
                    : 'bg-white border-[#E8DEC8] focus:ring-2 focus:ring-[#C84C24] text-[#120B07]'
              } focus:outline-hidden text-sm transition-all shadow-inner"
            />
            <p id="creator-name-error" class="text-xs text-rose-600 font-semibold flex items-center gap-1.5 animate-shake ${!isVerifying && nameError ? '' : 'hidden'}">
              <span>${isEn ? 'Full name is required. Please fill in your name.' : 'Nama lengkap harus diisi sebelum meracik resep.'}</span>
            </p>
            <p id="creator-name-help" class="text-[11px] ${isVerifying ? 'text-stone-500' : 'text-[#5C3622]/80'} ${!isVerifying && nameError ? 'hidden' : ''}">
              ${isEn 
                ? 'Your name will be inscribed as the author of this original recipe in the document and downloadable PDF.' 
                : 'Nama Anda akan dicantumkan sebagai peracik resep pada dokumen pusaka dan berkas unduhan PDF.'}
            </p>
          </div>
          
          <!-- SECTION 1: Ingredient Selection -->
          <section class="${
            isVerifying
              ? 'bg-stone-100/90 border-stone-300 grayscale opacity-75 cursor-not-allowed'
              : 'pawon-glass border-[#D49B42]/35'
          } p-6 sm:p-8 rounded-3xl space-y-6 border shadow-xs transition-all">
            <div class="space-y-0.5 pb-4 border-b ${isVerifying ? 'border-stone-300' : 'border-[#E8DEC8]'}">
              <h2 class="font-editorial-serif text-xl sm:text-2xl font-bold ${isVerifying ? 'text-stone-600' : 'text-[#120B07]'}">
                ${isEn ? 'Step 1 • Select Authentic Central Javanese Ingredients' : 'Langkah 1 • Pilih Bahan & Rempah Otentik Jawa Tengah'}
              </h2>
              <p class="text-xs ${isVerifying ? 'text-stone-500' : 'text-[#5C3622]'}">
                ${isEn ? 'Select authentic Central Javanese ingredients and spices' : 'Pilih aneka bahan pokok dan bumbu dapur autentik khas Jawa Tengah'}
              </p>
            </div>

            ${renderIngredientChipsBox(isEn, isVerifying)}

            <!-- Instant Search Input (Single Clean Search Bar) -->
            <div class="relative w-full">
              <label for="ingredient-search-input" class="sr-only">${isEn ? 'Search ingredients or spices' : 'Cari nama bahan atau rempah dapur'}</label>
              <input 
                type="text" 
                id="ingredient-search-input" 
                name="ingredientSearch"
                autocomplete="off"
                ${isVerifying ? 'disabled' : ''}
                placeholder="${isEn ? 'Search ingredients or spices (e.g. Ayam, Kemiri, Bawang, Lengkuas)...' : 'Cari nama bahan atau rempah dapur (contoh: Ayam, Kemiri, Bawang, Serai)...'}" 
                value="${escapeHtml(searchQuery)}"
                class="w-full pl-11 pr-4 py-3 rounded-2xl border text-xs sm:text-sm shadow-inner ${
                  isVerifying
                    ? 'bg-stone-200/70 border-stone-300 text-stone-500 placeholder:text-stone-400 cursor-not-allowed'
                    : 'bg-white border-[#E8DEC8] text-[#120B07] focus:outline-hidden focus:ring-2 focus:ring-[#C84C24]'
                }"
              />
              <svg class="w-4 h-4 ${isVerifying ? 'text-stone-400' : 'text-[#C84C24]'} absolute left-4 top-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </div>

            <!-- Ingredients Grid (Pure Text Names, Zero Photos/Emojis/Categories) -->
            <div id="ingredient-grid-container" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 max-h-[32rem] overflow-y-auto pt-3 pb-4 px-2 custom-scrollbar">
              ${renderIngredientGridItems(filteredIngredients, isEn, isVerifying)}
            </div>
          </section>

          <!-- SECTION 2: Culinary Calibration & Portions -->
          <section class="${
            isVerifying
              ? 'bg-stone-100/90 border-stone-300 grayscale opacity-75 cursor-not-allowed'
              : 'pawon-glass border-[#D49B42]/35'
          } p-6 sm:p-8 rounded-3xl space-y-6 border shadow-xs transition-all">
            <div class="pb-4 border-b ${isVerifying ? 'border-stone-300' : 'border-[#E8DEC8]'} space-y-0.5">
              <h2 class="font-editorial-serif text-xl sm:text-2xl font-bold ${isVerifying ? 'text-stone-600' : 'text-[#120B07]'}">
                ${isEn ? 'Step 2 • Culinary Calibration & Portions' : 'Langkah 2 • Kalibrasi Karakter Rasa & Teknik Dapur'}
              </h2>
              <p class="text-xs ${isVerifying ? 'text-stone-500' : 'text-[#5C3622]'}">
                ${isEn ? 'Calibrate cooking technique, flavor profile, and chili warmth level' : 'Tentukan metode olah bumbu, karakter rasa pusaka, dan tingkat kehangatan lombok'}
              </p>
            </div>

            <!-- Cooking Method -->
            <div class="space-y-2.5">
              <span id="cooking-method-group-label" class="block text-xs font-bold ${isVerifying ? 'text-stone-500' : 'text-[#120B07]'} uppercase tracking-wider">
                ${isEn ? 'Traditional Cooking Method' : 'Metode Olah Tradisional'}
              </span>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3" role="radiogroup" aria-labelledby="cooking-method-group-label">
                ${PREFERENCE_OPTIONS.cookingMethods.map(m => {
                  const isSelected = formState.cookingMethod === m.id;
                  const labelClass = isVerifying
                    ? (isSelected
                        ? 'bg-stone-500 text-stone-100 border-stone-500 ring-2 ring-stone-400 cursor-not-allowed'
                        : 'bg-stone-100 text-stone-400 border-stone-200 opacity-70 cursor-not-allowed')
                    : (isSelected
                        ? 'card-hover-lift cursor-pointer bg-[#120B07] text-[#FAF7F2] border-[#C84C24] ring-2 ring-[#C84C24]'
                        : 'card-hover-lift cursor-pointer bg-white hover:bg-[#FAF7F2] text-[#120B07] border-[#E8DEC8]');
                  const descClass = isVerifying
                    ? (isSelected ? 'text-stone-200' : 'text-stone-400')
                    : (isSelected ? 'text-[#D49B42]' : 'text-[#5C3622]');
                  return `
                    <label class="p-4 rounded-2xl border transition-all flex flex-col justify-between ${labelClass}">
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-bold">${isEn ? m.labelEn : m.labelId}</span>
                        <input type="radio" name="cookingMethod" value="${m.id}" ${isSelected ? 'checked' : ''} ${isVerifying ? 'disabled' : ''} class="sr-only"/>
                      </div>
                      <p class="text-[10px] ${descClass} mt-2 leading-relaxed">
                        ${isEn ? (m.descEn || m.descId) : m.descId}
                      </p>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Row 1: Regional Flavor & Standard Portions (2 Columns) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <!-- Taste Profile -->
              <div class="space-y-2">
                <label for="taste-profile-select" class="block text-xs font-bold ${isVerifying ? 'text-stone-500' : 'text-[#120B07]'} uppercase tracking-wider">
                  ${isEn ? 'Flavor Character Balance' : 'Harmoni Karakter Rasa'}
                </label>
                <select 
                  id="taste-profile-select" 
                  ${isVerifying ? 'disabled' : ''}
                  class="w-full px-4 py-3.5 rounded-2xl border text-xs font-bold ${
                    isVerifying
                      ? 'bg-stone-200/70 border-stone-300 text-stone-500 cursor-not-allowed'
                      : 'bg-white border-[#E8DEC8] text-[#120B07] focus:ring-2 focus:ring-[#C84C24]'
                  }"
                >
                  ${PREFERENCE_OPTIONS.tasteProfiles.map(tp => `
                    <option value="${tp.id}" ${formState.tasteProfile === tp.id ? 'selected' : ''}>
                      ${isEn ? tp.labelEn : tp.labelId}
                    </option>
                  `).join('')}
                </select>
                <p class="text-[11px] ${isVerifying ? 'text-stone-500' : 'text-[#5C3622]/80'}">
                  ${isEn ? 'Calibrates authentic flavor balance and spice harmony.' : 'Menyesuaikan racikan harmoni rasa dan rempah tradisi.'}
                </p>
              </div>

              <!-- Fixed Standard 4 Portions Servings Info -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="block text-xs font-bold ${isVerifying ? 'text-stone-500' : 'text-[#120B07]'} uppercase tracking-wider">
                    ${isEn ? 'Servings Scale (Fixed)' : 'Porsi Santapan (Standar Otomatis)'}
                  </span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isVerifying
                      ? 'text-stone-500 bg-stone-200 border-stone-300'
                      : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  }">
                    ${isEn ? '✓ 4 Portions' : '✓ 4 Porsi'}
                  </span>
                </div>

                <div class="p-3 rounded-2xl border flex items-center gap-3 shadow-2xs ${
                  isVerifying
                    ? 'border-stone-300 bg-stone-200/60'
                    : 'border-[#D49B42]/35 bg-white'
                }">
                  <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isVerifying ? 'bg-stone-400 text-stone-100' : 'bg-[#1E120A] text-[#D49B42]'
                  }">
                    <svg class="w-5 h-5 ${isVerifying ? 'text-stone-100' : 'text-[#D49B42]'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="9"/>
                      <circle cx="12" cy="12" r="5" stroke-dasharray="2 2"/>
                    </svg>
                  </div>
                  <div>
                    <strong class="text-xs sm:text-sm font-bold block ${isVerifying ? 'text-stone-500' : 'text-[#120B07]'}">${isEn ? '4 Portions (Standard Serving)' : '4 Porsi (Takaran Standar)'}</strong>
                    <span class="text-[11px] leading-tight block ${isVerifying ? 'text-stone-500' : 'text-[#5C3622]'}">
                      ${isEn 
                        ? 'Measurements and spice ratios are calibrated automatically for 4 portions.' 
                        : 'Komposisi bumbu dan takaran bahan otomatis diselaraskan secara pas untuk 4 porsi.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 2: Tingkat Kehangatan Lombok (Baris Sendiri & Lapang) -->
            <div class="space-y-2.5 pt-2">
              <div class="flex items-center justify-between">
                <span id="spice-level-group-label" class="block text-xs font-bold ${isVerifying ? 'text-stone-500' : 'text-[#120B07]'} uppercase tracking-wider">
                  ${isEn ? 'Chili Warmth Level (Lombok)' : 'Tingkat Kehangatan Lombok'}
                </span>
                <span class="text-[11px] ${isVerifying ? 'text-stone-500' : 'text-[#5C3622]'}">
                  ${isEn ? '4 Warmth Scales' : '4 Skala Tingkat Pedas'}
                </span>
              </div>
              
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3" role="radiogroup" aria-labelledby="spice-level-group-label">
                ${[
                  { id: 0, title: isEn ? 'No Spice' : 'Tanpa Pedas', desc: isEn ? 'Child friendly, no chili' : 'Ramah anak, tanpa cabai', badge: 'Level 0' },
                  { id: 1, title: isEn ? 'Mild Warmth' : 'Hangat Lembut', desc: isEn ? 'Red chili aroma, subtle' : 'Cabai merah besar beraroma', badge: 'Level 1' },
                  { id: 2, title: isEn ? 'Medium Hot' : 'Pedas Sedang', desc: isEn ? 'Curly chili, balanced' : 'Cabai keriting lauk harian', badge: 'Level 2' },
                  { id: 3, title: isEn ? 'Fiery Hot' : 'Pedas Mantap', desc: isEn ? 'Bird’s eye chili kick' : 'Cabai rawit ulek mantap', badge: 'Level 3' }
                ].map(sl => {
                  const isSelected = formState.spiceLevel === sl.id;
                  const cardClass = isVerifying
                    ? (isSelected
                        ? 'bg-stone-500 text-stone-100 border-stone-500 ring-2 ring-stone-400 shadow-none cursor-not-allowed'
                        : 'bg-stone-100 text-stone-400 border-stone-200 opacity-70 cursor-not-allowed')
                    : (isSelected
                        ? 'card-hover-lift cursor-pointer bg-[#120B07] text-white border-[#C84C24] ring-2 ring-[#C84C24] shadow-sm'
                        : 'card-hover-lift cursor-pointer bg-white hover:bg-[#FAF7F2] text-[#120B07] border-[#E8DEC8]');
                  const badgeClass = isVerifying
                    ? (isSelected ? 'bg-stone-600 text-stone-100' : 'bg-stone-200 text-stone-400')
                    : (isSelected ? 'bg-[#C84C24] text-white' : 'bg-[#FAF7F2] text-[#C84C24]');
                  const dotClass = isVerifying
                    ? (isSelected ? 'text-stone-200' : 'text-stone-400')
                    : (isSelected ? 'text-[#D49B42]' : 'text-emerald-700');
                  const titleClass = isVerifying
                    ? (isSelected ? 'text-stone-100' : 'text-stone-400')
                    : (isSelected ? 'text-white' : 'text-[#120B07]');
                  const descClass = isVerifying
                    ? (isSelected ? 'text-stone-200' : 'text-stone-400')
                    : (isSelected ? 'text-white/80' : 'text-[#5C3622]');
                  return `
                    <label class="p-4 rounded-2xl border text-left text-xs font-bold transition-all flex flex-col justify-between ${cardClass}">
                      <input type="radio" name="spiceLevel" value="${sl.id}" ${isSelected ? 'checked' : ''} ${isVerifying ? 'disabled' : ''} class="sr-only"/>
                      <div class="flex items-center justify-between">
                        <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${badgeClass}">${sl.badge}</span>
                        <span class="text-xs ${dotClass} font-bold">
                          ${isSelected ? '●' : '○'}
                        </span>
                      </div>
                      <div class="mt-3 space-y-0.5">
                        <strong class="block text-xs font-bold ${titleClass}">${sl.title}</strong>
                        <span class="block text-[10px] ${descClass} font-normal leading-tight">${sl.desc}</span>
                      </div>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Row 3: Custom Culinary Notes -->
            <div class="space-y-2 pt-2">
              <label for="custom-notes-input" class="block text-xs font-bold ${isVerifying ? 'text-stone-500' : 'text-[#120B07]'} uppercase tracking-wider">
                ${isEn ? 'Culinary Vision / Special Notes (Optional)' : 'Catatan Selera Tambahan (Opsional)'}
              </label>
              <input 
                type="text" 
                id="custom-notes-input" 
                name="customNotes"
                autocomplete="off"
                maxlength="250"
                ${isVerifying ? 'disabled' : ''}
                value="${escapeHtml(formState.customNotes)}"
                placeholder="${isEn ? 'e.g., Rich coconut milk with subtle lime fragrance...' : 'Contoh: Kuah areh gurih lembut beraroma daun jeruk...'}"
                class="w-full px-4 py-3.5 rounded-2xl border text-xs sm:text-sm shadow-inner ${
                  isVerifying
                    ? 'bg-stone-200/70 border-stone-300 text-stone-500 placeholder:text-stone-400 cursor-not-allowed'
                    : 'bg-white border-[#E8DEC8] text-[#120B07] focus:ring-2 focus:ring-[#C84C24]'
                }"
              />
              <p class="text-[11px] ${isVerifying ? 'text-stone-500' : 'text-[#5C3622]/80'} leading-relaxed">
                ${isEn 
                  ? 'Personal preference or creative touch for the recipe formulation. If filled with gibberish, inappropriate text, or off-topic prompts, AI will automatically ignore them and focus on the authentic recipe.' 
                  : 'Sentuhan pribadi atau catatan khusus untuk menyempurnakan racikan rasa. Jika diisi teks asal, kata tidak pantas, atau di luar konteks masakan, AI akan mengabaikannya dan tetap fokus pada resep autentik.'}
              </p>
            </div>
          </section>

        </fieldset>

        <!-- CTA Action Bar -->
        <div class="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#120B07] via-[#1E120A] to-[#120B07] border-2 border-[#D49B42]/45 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-5">
          <div class="text-left space-y-1.5">
            <h3 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#FAF7F2]">
              ${isVerifying
                ? (isEn ? 'Verifying your recipe formulation...' : 'Memverifikasi racikan resep Anda...')
                : (isEn ? 'Ready to craft your heritage recipe?' : 'Siap meracik kreasi resep pusaka Anda?')}
            </h3>
            <p class="text-xs text-[#FAF7F2]/80 max-w-lg">
              ${isVerifying
                ? (isEn
                    ? 'Your selections above are locked while LarasRasa AI verifies and crafts your recipe.'
                    : 'Seluruh pilihan di atas dikunci sementara selagi LarasRasa AI memverifikasi dan meracik resep Anda.')
                : (isEn 
                    ? 'LarasRasa AI will formulate calibrated spice measurements, cooking techniques, and step-by-step instructions ready to download.' 
                    : 'Kecerdasan buatan LarasRasa akan meracik takaran bumbu presisi, teknik memasak, dan panduan olah lengkap yang siap diunduh.')}
            </p>
          </div>

          <button 
            type="submit" 
            id="generate-recipe-submit-btn"
            ${isVerifying ? 'disabled' : ''}
            class="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2.5 shrink-0 border ${
              isVerifying
                ? 'bg-stone-600 text-stone-100 border-stone-500 opacity-90 cursor-wait shadow-md'
                : 'bg-[#C84C24] hover:bg-[#AE3E1B] text-[#FAF7F2] shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer border-[#E05A30]'
            }"
          >
            ${isVerifying ? `
              <svg class="w-4 h-4 text-white animate-spin shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>${isEn ? 'Verifying...' : 'Memverifikasi...'}</span>
            ` : `
              <span>${isEn ? 'Craft Heritage Recipe' : 'Racik Resep Pusaka'}</span>
              <svg class="w-4 h-4 text-[#FAF7F2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            `}
          </button>
        </div>

        <!-- Alert Banner Below Button (Zero Emoji, Bilingual Reactive) -->
        ${alertContent ? `
          <div id="ai-creator-session-alert" class="p-5 sm:p-6 rounded-3xl ${
            alertContent.isWarning
              ? 'bg-amber-50 border-2 border-amber-300 text-amber-950'
              : 'bg-rose-50 border-2 border-rose-300 text-rose-950'
          } shadow-md space-y-1.5 text-center animate-fade-in" role="alert">
            <div class="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
              alertContent.isWarning ? 'bg-amber-200/70 text-amber-900 border border-amber-400/50' : 'bg-rose-200/70 text-rose-900 border border-rose-400/50'
            }">
              ${escapeHtml(alertContent.badge)}
            </div>
            <strong class="block text-sm sm:text-base font-bold font-editorial-serif ${
              alertContent.isWarning ? 'text-amber-900' : 'text-rose-900'
            }">
              ${escapeHtml(alertContent.title)}
            </strong>
            <p class="text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mx-auto">
              ${escapeHtml(alertContent.text)}
            </p>
          </div>
        ` : ''}

      </form>

    </div>
  `;
}

/**
 * Formats full recipe into a clean, beautifully formatted text string.
 * Matches the exact structure and sections of the on-screen display.
 * Dynamically formats in Indonesian or English depending on active language.
 */
function formatRecipeAsText(recipe, isEn = false) {
  const sections = [];

  const title = (recipe.title || '').trim();
  const subtitle = isEn 
    ? (recipe.subtitleEn || 'Authentic Heritage Recipe') 
    : (recipe.subtitleId || 'Racikan Resep Dapur Tradisi');
  const creator = recipe.creatorName || (isEn ? 'LarasRasa Culinary Hearth' : 'Dapur Tradisi LarasRasa');
  const creatorLine = isEn ? `Recipe Creator: ${creator}` : `Pencipta Resep: ${creator}`;
  const versionInfo = isEn ? '(English Version)' : '(Indonesian Version)';

  // 1. Title Block
  sections.push(
`${title}
"${subtitle}" ${versionInfo}

${creatorLine}`
  );

  // 2. Karakter Rasa & Konsep Olahan / Recipe Overview
  const descText = isEn 
    ? (recipe.descriptionEn || recipe.description || recipe.philosophy)
    : (recipe.descriptionId || recipe.description || recipe.philosophy);
  if (descText) {
    const overviewTitle = isEn ? 'Recipe Overview & Flavor Character' : 'Karakter Rasa & Konsep Olahan';
    sections.push(`${overviewTitle}\n${descText.trim()}`);
  }

  // 3. Ingredients & Seasonings
  if (recipe.ingredients && recipe.ingredients.length > 0) {
    const ingHeader = isEn 
      ? `Ingredients & Kitchen Spices (${recipe.servings || 4} portions)` 
      : `Bahan & Bumbu Dapur (${recipe.servings || 4} porsi)`;
    
    const ingLines = recipe.ingredients.map(i => {
      const name = isEn ? (i.nameEn || i.nameId || i.name) : (i.nameId || i.name);
      const amt = i.amount ? `${i.amount} ` : '';
      const unit = isEn ? (i.unitEn || i.unitId || i.unit || '') : (i.unitId || i.unit || '');
      const note = (isEn ? (i.noteEn || i.noteId || i.note) : (i.noteId || i.note));
      const noteStr = note ? ` (${note})` : '';
      const measure = (amt || unit) ? ` - ${amt}${unit}`.trimEnd() : '';
      return `• ${name}${measure}${noteStr}`;
    }).join('\n');

    sections.push(`${ingHeader}\n\n${ingLines}`);
  }

  // 4. Traditional Kitchen Equipment
  if (recipe.equipment && recipe.equipment.length > 0) {
    const eqHeader = isEn ? 'Traditional Kitchen Equipment:' : 'Peralatan Dapur Tradisional:';
    const eqLines = recipe.equipment.map(eq => {
      const label = typeof eq === 'object' ? (isEn ? (eq.labelEn || eq.labelId) : (eq.labelId || eq.labelEn)) : eq;
      return `• ${label}`;
    }).join('\n');

    sections.push(`${eqHeader}\n\n${eqLines}`);
  }

  // 5. Step-by-Step Cooking Guide
  const stepsList = getLocalizedRecipeSteps(recipe, isEn);
  if (stepsList.length > 0) {
    const stepsHeader = isEn 
      ? `Step-by-Step Cooking Guide (${stepsList.length} steps):` 
      : `Panduan Langkah Memasak (${stepsList.length} tahap):`;

    const formattedSteps = stepsList.map((st) => (
      st.instruction ? `${st.stepNumber}. ${st.title}\n${st.instruction}` : `${st.stepNumber}. ${st.title}`
    )).join('\n\n');

    sections.push(`${stepsHeader}\n\n${formattedSteps}`);
  }

  // 6. Tautan Web LarasRasa
  sections.push(
    isEn 
      ? 'LarasRasa • Discover Authentic Heritage Recipes: https://larasrasa.vercel.app' 
      : 'LarasRasa • Menyelaraskan Rasa Warisan Leluhur: https://larasrasa.vercel.app'
  );

  return sections.join('\n\n');
}

/**
 * Output Result View: Pure AI text recipe with Frontend Certificate. Zero photos.
 */
function renderResultView(recipe, currentLang) {
  if (!recipe || !recipe.title) {
    return renderFormView(currentLang);
  }
  const isEn = currentLang === 'en';
  const resolvedSteps = getLocalizedRecipeSteps(recipe, isEn);
  const creationDate = new Date(recipe.createdAt || Date.now()).toLocaleDateString(isEn ? 'en-US' : 'id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      <!-- Top Navigation & Action Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D49B42]/30">
        <div class="space-y-1.5">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>${t('aiCreator.resultBadge')}</span>
            </span>
          </div>
          <h1 class="font-editorial-serif text-2xl sm:text-4xl font-bold text-[#120B07]">
            ${t('aiCreator.resultHeading')}
          </h1>
          <p class="text-xs text-[#5C3622]">
            ${isEn ? 'Generated on:' : 'Tanggal Dibuat:'} <strong class="text-[#120B07]">${creationDate}</strong>
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button 
            type="button" 
            id="create-another-recipe-btn"
            class="px-5 py-2.5 rounded-2xl border border-[#D49B42]/50 bg-white hover:bg-[#FAF7F2] text-[#120B07] text-xs font-bold transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
          >
            <svg class="w-4 h-4 text-[#120B07] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>${t('aiCreator.backToStudioBtn')}</span>
          </button>
        </div>
      </div>

      <!-- Action Toolbar (PDF, Copy) -->
      <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button 
          type="button" 
          id="download-recipe-pdf-btn"
          class="px-5 py-2.5 rounded-2xl bg-[#C84C24] hover:bg-[#AE3E1B] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer border border-[#E05A30]"
        >
          <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          <span>${isEn ? 'Download Recipe (PDF)' : 'Unduh Resep (PDF)'}</span>
        </button>

        <button 
          type="button" 
          id="copy-recipe-text-btn"
          class="px-5 py-2.5 rounded-2xl bg-white hover:bg-[#FAF7F2] text-[#120B07] font-bold text-xs transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer border border-[#D49B42]/50"
        >
          <svg class="w-4 h-4 text-[#120B07]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
          <span>${isEn ? 'Copy Recipe Text' : 'Salin Teks Resep'}</span>
        </button>
      </div>

      <!-- RICH AI RECIPE DOCUMENT -->
      <article class="space-y-8">
        
        <!-- Story & Philosophy Card -->
        <div class="bg-white p-6 sm:p-10 rounded-3xl border-2 border-[#D49B42]/35 shadow-lg space-y-6">
          <div class="space-y-3 pb-6 border-b border-[#E8DEC8]">
            <h2 class="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#120B07] leading-tight">
              ${escapeHtml(recipe.title)}
            </h2>

            ${(isEn ? (recipe.subtitleEn || recipe.subtitleId || recipe.javaneseTitle) : (recipe.subtitleId || recipe.javaneseTitle)) ? `
              <div class="flex items-center gap-2.5 flex-wrap">
                <p class="font-serif italic text-base sm:text-lg text-[#C84C24]">
                  "${escapeHtml(isEn ? (recipe.subtitleEn || recipe.subtitleId || recipe.javaneseTitle) : (recipe.subtitleId || recipe.javaneseTitle))}"
                </p>
                <span class="text-[10px] font-bold text-[#8C6D58] bg-[#FAF7F2] border border-[#E8DEC8] px-2 py-0.5 rounded-md">
                  ${isEn ? 'English Version' : 'Indonesian Version'}
                </span>
              </div>
            ` : ''}

            <p class="text-xs text-[#5C3622]">
              ${isEn ? 'Recipe Creator:' : 'Pencipta Resep:'} <strong class="text-[#120B07] font-bold">${escapeHtml(recipe.creatorName || (isEn ? 'LarasRasa Culinary Hearth' : 'Dapur Tradisi LarasRasa'))}</strong>
            </p>
          </div>

          ${((isEn ? (recipe.descriptionEn || recipe.description || recipe.philosophy) : (recipe.descriptionId || recipe.description || recipe.philosophy))) ? `
            <!-- Overview & Flavor Profile -->
            <div class="p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 space-y-3">
              <span class="text-[10px] uppercase font-bold text-[#2E4D38] tracking-wider block">
                ${isEn ? 'Recipe Overview & Flavor Character' : 'Karakter Rasa & Konsep Olahan'}
              </span>
              <div class="space-y-3 text-xs sm:text-sm text-[#5C3622] leading-relaxed">
                ${((isEn ? (recipe.descriptionEn || recipe.description || recipe.philosophy) : (recipe.descriptionId || recipe.description || recipe.philosophy)) || '').split('\n\n').filter(Boolean).map(p => `
                  <p>${escapeHtml(p.trim())}</p>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Two-Column Details Grid: Ingredients & Steps -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- LEFT COLUMN: Ingredients, Equipment (5 cols) -->
          <div class="lg:col-span-5 space-y-6">
            
            <!-- Scaled Ingredients Card -->
            <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#D49B42]/35 shadow-sm space-y-4">
              <div class="flex items-center justify-between border-b border-[#E8DEC8] pb-3">
                <div>
                  <span class="text-[10px] font-bold uppercase tracking-wider text-[#C84C24] block">${isEn ? 'Authentic Spice Ensemble' : 'Bahan Rempah Tradisi'}</span>
                  <h3 class="font-editorial-serif text-lg font-bold text-[#120B07]">
                    ${isEn ? 'Ingredients & Kitchen Spices' : 'Bahan & Bumbu Dapur'}
                  </h3>
                </div>
                <span class="text-xs px-2.5 py-1 rounded-lg bg-[#FAF7F2] text-[#2E4D38] font-bold border border-[#D49B42]/30">
                  ${escapeHtml(recipe.servings || 4)} ${isEn ? 'portions' : 'porsi'}
                </span>
              </div>

              <!-- Ingredients List Rows -->
              <div class="space-y-2.5 pt-1">
                ${(recipe.ingredients || []).map(ing => `
                  <div class="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8]/80 text-xs text-[#120B07] hover:border-[#D49B42]/50 transition-colors">
                    <div class="flex items-center gap-2.5">
                      <span class="w-2 h-2 rounded-full bg-[#C84C24] shrink-0"></span>
                      <div>
                        <span class="font-semibold block">${escapeHtml(isEn ? (ing.nameEn || ing.nameId || ing.name) : (ing.nameId || ing.name))}</span>
                        ${(isEn ? (ing.noteEn || ing.noteId || ing.note) : (ing.noteId || ing.note)) ? `<span class="text-[10px] text-[#5C3622] italic block">${escapeHtml(isEn ? (ing.noteEn || ing.noteId || ing.note) : (ing.noteId || ing.note))}</span>` : ''}
                      </div>
                    </div>
                    <span class="font-mono text-[11px] font-bold text-[#120B07] bg-white px-2.5 py-1 rounded-lg border border-[#E8DEC8] shrink-0">
                      ${ing.amount !== undefined && ing.amount !== null && ing.amount !== '' ? `${escapeHtml(ing.amount)} ${escapeHtml(isEn ? (ing.unitEn || ing.unitId || ing.unit) : (ing.unitId || ing.unit))}` : '-'}
                    </span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Cooking Equipment Used -->
            ${Array.isArray(recipe.equipment) && recipe.equipment.length > 0 ? `
              <div class="bg-white p-5 sm:p-6 rounded-3xl border border-[#D49B42]/35 shadow-sm space-y-3">
                <span class="text-[10px] font-bold uppercase tracking-wider text-[#2E4D38] block">
                  ${isEn ? 'Traditional Kitchen Equipment' : 'Peralatan Dapur Tradisional'}
                </span>
                <div class="flex flex-wrap gap-2">
                  ${recipe.equipment.map(eq => {
                    const eqLabel = typeof eq === 'object' ? (isEn ? (eq.labelEn || eq.labelId) : (eq.labelId || eq.labelEn)) : eq;
                    return `
                      <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] text-xs font-semibold text-[#120B07]">
                        <span class="w-1.5 h-1.5 rounded-full bg-[#C84C24]"></span>
                        <span>${escapeHtml(eqLabel)}</span>
                      </span>
                    `;
                  }).join('')}
                </div>
              </div>
            ` : ''}

          </div>

          <!-- RIGHT COLUMN: Step-by-Step Cooking Steps (7 cols) -->
          <div class="lg:col-span-7 space-y-6">
            
            <!-- Cooking Steps Card -->
            <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#D49B42]/35 shadow-sm space-y-5">
              <div class="border-b border-[#E8DEC8] pb-3 flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-bold uppercase tracking-wider text-[#C84C24] block">${isEn ? 'Culinary Workflow' : 'Tahapan Memasak'}</span>
                  <h3 class="font-editorial-serif text-lg font-bold text-[#120B07]">
                    ${isEn ? 'Step-by-Step Cooking Guide' : 'Panduan Langkah Memasak'}
                  </h3>
                </div>
                <span class="text-xs text-[#5C3622]">
                  ${resolvedSteps.length} ${isEn ? 'steps' : 'tahap'}
                </span>
              </div>

              <!-- Steps List -->
              <div class="space-y-4 pt-1">
                ${resolvedSteps.map((step, idx) => `
                  <div class="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-2 text-xs hover:border-[#D49B42]/50 transition-colors">
                    <div class="flex items-center gap-2.5">
                      <span class="w-6 h-6 rounded-full bg-[#120B07] text-[#D49B42] font-bold text-xs flex items-center justify-center font-mono shrink-0">
                        ${escapeHtml(step.stepNumber || idx + 1)}
                      </span>
                      <strong class="text-[#120B07] font-bold font-editorial-serif text-sm sm:text-base">
                        ${escapeHtml(step.title)}
                      </strong>
                    </div>
                    <p class="text-[#5C3622] leading-relaxed text-xs sm:text-sm pl-8.5">
                      ${escapeHtml(step.instruction)}
                    </p>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>

        </div>

        <!-- Bottom Action CTA -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#120B07] via-[#1E120A] to-[#120B07] border-2 border-[#D49B42]/45 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-left space-y-1">
            <h4 class="font-editorial-serif text-lg sm:text-xl font-bold text-white">
              ${isEn ? 'Ready to craft another heritage creation?' : 'Siap meracik kreasi olahan tradisi lainnya?'}
            </h4>
            <p class="text-xs text-[#FAF7F2]/80">
              ${isEn 
                ? 'Return to the studio to explore new spice combinations, techniques, and flavor harmonies.' 
                : 'Kembali ke studio racik untuk menjelajahi kombinasi rempah, teknik masak, dan harmoni rasa baru.'}
            </p>
          </div>

          <button 
            type="button" 
            id="bottom-create-another-btn"
            class="px-6 py-3.5 rounded-2xl bg-[#C84C24] hover:bg-[#AE3E1B] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer border border-[#E05A30] shrink-0"
          >
            <svg class="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>${isEn ? 'Return to Recipe Studio' : 'Kembali ke Studio Racik'}</span>
          </button>
        </div>

      </article>

    </div>
  `;
}

export function initAiFoodCreatorInteractions() {
  const form = document.getElementById('ai-creator-form');
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';

  if (isGenerating) {
    if (window.__larasRasaProgressTimer) {
      return;
    }
    const progressBar = document.getElementById('generating-progress-bar');
    const percentEl = document.getElementById('generating-progress-percent');
    const stageEl = document.getElementById('generating-progress-stage');

    window.__larasRasaProgressTimer = setInterval(() => {
      const activeIsEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
      const stages = activeIsEn ? GENERATING_STAGES_EN : GENERATING_STAGES_ID;
      currentGeneratingStageIdx++;
      if (currentGeneratingStageIdx < stages.length) {
        const item = stages[currentGeneratingStageIdx];
        currentGeneratingPercent = item.pct;
        if (progressBar) progressBar.style.width = `${item.pct}%`;
        if (percentEl) percentEl.textContent = `${item.pct}%`;
        if (stageEl) stageEl.textContent = item.text;
      }
    }, 700);
    return;
  }

  function bindRemovePills() {
    document.querySelectorAll('[data-remove-ingredient]').forEach(pill => {
      pill.onclick = (e) => {
        e.stopPropagation();
        if (isVerifying || isGenerating) return;
        const id = pill.getAttribute('data-remove-ingredient');
        if (formState.selectedIngredientIds.length <= MIN_INGREDIENTS) {
          ingredientError = 'min';
          updateIngredientSection(true);
          return;
        }
        ingredientError = null;
        formState.selectedIngredientIds = formState.selectedIngredientIds.filter(i => i !== id);
        updateIngredientSection(true);
      };
    });
  }

  function bindIngredientGridEvents() {
    document.querySelectorAll('[data-ingredient-id]').forEach(card => {
      card.onclick = () => {
        if (isVerifying || isGenerating) return;
        const id = card.getAttribute('data-ingredient-id');
        if (formState.selectedIngredientIds.includes(id)) {
          if (formState.selectedIngredientIds.length <= MIN_INGREDIENTS) {
            ingredientError = 'min';
            updateIngredientSection(true);
            return;
          }
          ingredientError = null;
          formState.selectedIngredientIds = formState.selectedIngredientIds.filter(i => i !== id);
        } else {
          if (formState.selectedIngredientIds.length >= MAX_INGREDIENTS) {
            ingredientError = 'max';
            updateIngredientSection(true);
            return;
          }
          ingredientError = null;
          formState.selectedIngredientIds.push(id);
        }
        updateIngredientSection(true);
      };
    });

    const clearSearchBtn = document.getElementById('clear-ingredient-search-btn');
    if (clearSearchBtn) {
      clearSearchBtn.onclick = () => {
        if (isVerifying || isGenerating) return;
        clearTimeout(searchDebounce);
        searchQuery = '';
        const inputEl = document.getElementById('ingredient-search-input');
        if (inputEl) {
          inputEl.value = '';
          inputEl.focus();
        }
        updateIngredientGrid(false);
      };
    }
  }

  function updateIngredientGrid(preserveGridScroll = false) {
    if (isVerifying || isGenerating) return;
    const grid = document.getElementById('ingredient-grid-container');
    if (!grid) return;
    const activeIsEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
    const prevScroll = grid.scrollTop;
    grid.innerHTML = renderIngredientGridItems(getFilteredIngredients(), activeIsEn, isVerifying);
    if (preserveGridScroll) {
      grid.scrollTop = prevScroll;
    } else {
      grid.scrollTop = 0;
    }
    bindIngredientGridEvents();
  }

  function updateIngredientSection(preserveGridScroll = true) {
    if (isVerifying || isGenerating) return;
    const activeIsEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
    const chipsBox = document.getElementById('ingredient-chips-box');
    if (chipsBox) {
      chipsBox.outerHTML = renderIngredientChipsBox(activeIsEn, isVerifying);
      bindRemovePills();
    }
    updateIngredientGrid(preserveGridScroll);
  }

  // Search input for ingredients (updates grid only so focus/cursor stay uninterrupted)
  const searchInput = document.getElementById('ingredient-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      if (isVerifying || isGenerating) return;
      searchQuery = e.target.value;
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        updateIngredientGrid(false);
      }, 250);
    };
  }

  bindRemovePills();
  bindIngredientGridEvents();

  // Creator inputs binding
  const nameInput = document.getElementById('creator-name-input');
  if (nameInput) {
    nameInput.oninput = (e) => {
      if (isVerifying || isGenerating) return;
      formState.creatorName = e.target.value;
      if (e.target.value.trim().length > 0) {
        if (nameError) nameError = false;
        const label = document.getElementById('creator-name-label');
        if (label) {
          label.classList.remove('text-rose-700');
          label.classList.add('text-[#120B07]');
        }
        const errEl = document.getElementById('creator-name-error');
        if (errEl) errEl.classList.add('hidden');
        const helpEl = document.getElementById('creator-name-help');
        if (helpEl) helpEl.classList.remove('hidden');
        nameInput.classList.remove('border-rose-500', 'ring-2', 'ring-rose-300', 'bg-rose-50/30');
        nameInput.classList.add('border-[#E8DEC8]', 'focus:ring-2', 'focus:ring-[#C84C24]');
        const box = document.getElementById('creator-name-box');
        if (box) {
          box.classList.remove('border-rose-400', 'bg-rose-50/20', 'ring-2', 'ring-rose-200');
          box.classList.add('border-[#D49B42]/35');
        }
      }
    };
  }

  const notesInput = document.getElementById('custom-notes-input');
  if (notesInput) {
    notesInput.oninput = (e) => {
      if (isVerifying || isGenerating) return;
      formState.customNotes = e.target.value;
    };
  }

  const tasteSelect = document.getElementById('taste-profile-select');
  if (tasteSelect) {
    tasteSelect.onchange = (e) => {
      if (isVerifying || isGenerating) return;
      formState.tasteProfile = e.target.value;
    };
  }

  // Radio groups
  setupRadioGroup('cookingMethod', val => { formState.cookingMethod = val; });
  setupRadioGroup('spiceLevel', val => { formState.spiceLevel = parseInt(val, 10); });

  // Standard Servings (Fixed 4 Portions)
  formState.servings = 4;

  // Form Submit: Synthesize AI Recipe & Generate Frontend Certificate
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      if (isVerifying || isGenerating) {
        return;
      }
      sessionAlert = null;
      const existingAlert = document.getElementById('ai-creator-session-alert');
      if (existingAlert) existingAlert.remove();

      // 1. Author Name Validation: Scroll up to creator name input
      if (!formState.creatorName.trim()) {
        nameError = true;
        await reRenderCurrentView(false);
        const nameBox = document.getElementById('creator-name-box');
        if (nameBox) {
          nameBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        const input = document.getElementById('creator-name-input');
        if (input) {
          setTimeout(() => {
            input.focus({ preventScroll: true });
          }, 450);
        }
        return;
      }

      // 2. Tampered Ingredient Count Guard (< 5 or > 10 via Inspect/Console triggers backend error alert)
      const uniqueSelectedIds = Array.isArray(formState.selectedIngredientIds)
        ? Array.from(new Set(formState.selectedIngredientIds.filter(id => typeof id === 'string' && id.trim().length > 0)))
        : [];
      if (uniqueSelectedIds.length < MIN_INGREDIENTS || uniqueSelectedIds.length > MAX_INGREDIENTS) {
        ingredientError = null;
        sessionAlert = { type: 'backend_error' };
        await reRenderCurrentView(true);
        const alertBox = document.getElementById('ai-creator-session-alert');
        if (alertBox) {
          alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // 3. 10-Minute Client UX Cooldown Check (persists across refresh/page switch, displayed only on retry submit)
      const activeCooldown = getCooldownStorageState();
      if (activeCooldown) {
        sessionAlert = {
          type: 'cooldown',
          minutes: activeCooldown.minutes
        };
        await reRenderCurrentView(true);
        const alertBox = document.getElementById('ai-creator-session-alert');
        if (alertBox) {
          alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // 4. Persist cooldown immediately when generation begins and lock all form controls during verification
      const prevCooldownTs = getCooldownStorageState()?.timestamp || null;
      safeSetStorage(COOLDOWN_KEY, Date.now().toString());
      if (searchDebounce) {
        clearTimeout(searchDebounce);
        searchDebounce = null;
      }
      nameError = false;
      ingredientError = null;
      sessionAlert = null;
      isVerifying = true;
      const myRunId = ++generationRunId;

      await reRenderCurrentView(true);
      if (myRunId !== generationRunId || !isOnAiFoodCreatorRoute()) {
        if (myRunId === generationRunId) {
          isVerifying = false;
        }
        return;
      }

      // 5. Call secured backend generation directly (if rate-limited/rejected, unlock form and stay in place)
      let recipe = null;
      try {
        recipe = await aiFoodCreatorService.generateRecipe({
          ...formState,
          selectedIngredientIds: uniqueSelectedIds,
          outputLanguage: isEn ? 'en' : 'id'
        });
        if (!recipe || !recipe.title || getLocalizedRecipeSteps(recipe, isEn).length === 0) {
          throw new Error('Empty recipe response');
        }
      } catch (err) {
        // Ignore DOM updates if user navigated away (keep cooldown timestamp active)
        if (myRunId !== generationRunId) {
          return;
        }
        isVerifying = false;
        isGenerating = false;
        currentGeneratingPercent = 20;
        currentGeneratingStageIdx = 0;
        currentGeneratedRecipe = null;
        if (!isOnAiFoodCreatorRoute()) {
          return;
        }
        if (err.code === 'RATE_LIMITED') {
          const retryMs = Math.min(COOLDOWN_MS, Math.max(60_000, (Number(err.retryAfterSeconds) || 60) * 1000));
          const syntheticStart = Date.now() - (COOLDOWN_MS - retryMs);
          safeSetStorage(COOLDOWN_KEY, syntheticStart.toString());
          const waitMinutes = Math.max(1, Math.ceil(retryMs / 60000));
          sessionAlert = {
            type: 'cooldown',
            minutes: waitMinutes
          };
        } else if (err.code === 'CREDIT_EXHAUSTED') {
          restoreCooldownStorage(prevCooldownTs);
          sessionAlert = { type: 'credit' };
        } else {
          restoreCooldownStorage(prevCooldownTs);
          sessionAlert = { type: 'backend_error' };
        }
        await reRenderCurrentView(true);
        return;
      }

      // Refresh client cooldown timestamp once backend succeeds, even if user switched pages mid-request
      safeSetStorage(COOLDOWN_KEY, Date.now().toString());
      if (myRunId !== generationRunId) {
        return;
      }
      if (!isOnAiFoodCreatorRoute()) {
        isVerifying = false;
        return;
      }

      // 6. Backend Succeeded: Transition smoothly through the formulating showcase and display recipe
      isVerifying = false;
      isGenerating = true;
      currentGeneratingPercent = 20;
      currentGeneratingStageIdx = 0;
      await reRenderCurrentView(false);
      scrollToTop('smooth');

      await new Promise(resolve => setTimeout(resolve, 2600));
      if (myRunId !== generationRunId || !isOnAiFoodCreatorRoute()) {
        return;
      }

      currentGeneratedRecipe = recipe;

      if (typeof window !== 'undefined' && window.__larasRasaProgressTimer) {
        clearInterval(window.__larasRasaProgressTimer);
        window.__larasRasaProgressTimer = null;
      }

      const progressBar = document.getElementById('generating-progress-bar');
      const percentEl = document.getElementById('generating-progress-percent');
      const stageEl = document.getElementById('generating-progress-stage');
      const latestIsEn = i18n?.getLanguage ? i18n.getLanguage() === 'en' : isEn;
      if (progressBar) progressBar.style.width = '100%';
      if (percentEl) percentEl.textContent = '100%';
      if (stageEl) stageEl.textContent = latestIsEn ? 'Heritage recipe formulated!' : 'Resep pusaka siap disajikan!';

      await new Promise(resolve => setTimeout(resolve, 400));
      if (myRunId !== generationRunId || !isOnAiFoodCreatorRoute()) {
        return;
      }

      isGenerating = false;
      currentGeneratingPercent = 20;
      currentGeneratingStageIdx = 0;
      await reRenderCurrentView(false);
      scrollToTop('smooth');
    };
  }

  // Recipe PDF Download
  const downloadRecipeBtn = document.getElementById('download-recipe-pdf-btn');
  if (downloadRecipeBtn && currentGeneratedRecipe) {
    downloadRecipeBtn.onclick = async () => {
      const activeIsEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
      try {
        downloadRecipeBtn.disabled = true;
        downloadRecipeBtn.innerHTML = `
          <svg class="w-4 h-4 text-white animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>${activeIsEn ? 'Preparing PDF...' : 'Menyiapkan PDF...'}</span>
        `;
        await aiFoodCreatorService.generateRecipePdf(currentGeneratedRecipe, null, activeIsEn);
        downloadRecipeBtn.innerHTML = `
          <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          <span>${activeIsEn ? 'Downloaded (PDF)' : 'Berhasil Diunduh (PDF)'}</span>
        `;
        setTimeout(() => {
          downloadRecipeBtn.disabled = false;
          downloadRecipeBtn.innerHTML = `
            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            <span>${activeIsEn ? 'Download Recipe (PDF)' : 'Unduh Resep (PDF)'}</span>
          `;
        }, 2500);
      } catch (err) {
        console.error('PDF error:', err);
        downloadRecipeBtn.innerHTML = `<span>${activeIsEn ? 'Download Failed (PDF)' : 'Gagal Mengunduh (PDF)'}</span>`;
        setTimeout(() => {
          downloadRecipeBtn.disabled = false;
          downloadRecipeBtn.innerHTML = `
            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            <span>${activeIsEn ? 'Download Recipe (PDF)' : 'Unduh Resep (PDF)'}</span>
          `;
        }, 2500);
      }
    };
  }

  // Copy Full Recipe Text Button
  const copyRecipeBtn = document.getElementById('copy-recipe-text-btn');
  if (copyRecipeBtn && currentGeneratedRecipe) {
    copyRecipeBtn.onclick = () => {
      const activeIsEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
      const fullText = formatRecipeAsText(currentGeneratedRecipe, activeIsEn);
      navigator.clipboard.writeText(fullText).then(() => {
        copyRecipeBtn.disabled = true;
        copyRecipeBtn.innerHTML = `
          <svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          <span class="text-emerald-700 font-bold">${activeIsEn ? 'Copied Successfully' : 'Berhasil Disalin'}</span>
        `;
        setTimeout(() => {
          copyRecipeBtn.disabled = false;
          copyRecipeBtn.innerHTML = `
            <svg class="w-4 h-4 text-[#120B07]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
            </svg>
            <span>${activeIsEn ? 'Copy Recipe Text' : 'Salin Teks Resep'}</span>
          `;
        }, 2500);
      }).catch(err => {
        console.error('Copy error:', err);
      });
    };
  }

  // Create Another / Back to Studio
  const createAnotherBtns = [
    document.getElementById('create-another-recipe-btn'),
    document.getElementById('bottom-create-another-btn')
  ].filter(Boolean);

  createAnotherBtns.forEach(btn => {
    btn.onclick = () => {
      resetAiFoodCreatorState();
      reRenderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  });
}

function setupRadioGroup(name, onChange) {
  const radios = document.querySelectorAll(`input[name="${name}"]`);
  radios.forEach(r => {
    r.onchange = () => {
      if (isVerifying || isGenerating) return;
      if (r.checked) {
        onChange(r.value);
        reRenderCurrentView();
      }
    };
  });
}

async function reRenderCurrentView(preserveScroll = true) {
  if (!isOnAiFoodCreatorRoute()) {
    return;
  }
  const container = document.getElementById('page-main-content');
  if (container) {
    const savedY = preserveScroll ? window.scrollY : null;
    const prevGridScroll = preserveScroll
      ? (document.getElementById('ingredient-grid-container')?.scrollTop ?? null)
      : null;
    container.innerHTML = await renderAiFoodCreatorPage();
    initAiFoodCreatorInteractions();
    if (preserveScroll) {
      const newGrid = document.getElementById('ingredient-grid-container');
      if (newGrid && prevGridScroll !== null) {
        newGrid.scrollTop = prevGridScroll;
      }
      if (savedY !== null) {
        window.scrollTo({ top: savedY, behavior: 'instant' });
      }
    }
  }
}
