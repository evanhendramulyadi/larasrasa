import { 
  aiFoodCreatorService, 
  INGREDIENT_CATALOG, 
  ALL_INGREDIENTS, 
  PREFERENCE_OPTIONS 
} from '../services/aiFoodCreatorService.js';
import { i18n, t } from '../i18n/index.js';

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

let activeTab = 'all'; // 'all', 'protein', 'spice', 'vegetable'
let searchQuery = '';
let formState = {
  creatorName: '',
  creatorNickname: '',
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
  imageStyle: 'editorial',
  aspectRatio: '1:1',
  outputLanguage: 'id'
};

const COOLDOWN_KEY = 'larasrasa_last_ai_recipe_timestamp';
const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes limit per session

let currentGeneratedRecipe = null;
let isGenerating = false;
let validationMessage = null;
let sessionAlert = null; // { type: 'cooldown' | 'credit' | 'forbidden' | 'error', minutes?: number }
let toastMessage = null;
let nameError = false;
let ingredientError = false;

export function resetAiFoodCreatorState() {
  activeTab = 'all';
  searchQuery = '';
  formState = {
    creatorName: '',
    creatorNickname: '',
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
    imageStyle: 'editorial',
    aspectRatio: '1:1',
    outputLanguage: 'id'
  };
  currentGeneratedRecipe = null;
  isGenerating = false;
  validationMessage = null;
  sessionAlert = null;
  toastMessage = null;
  nameError = false;
  ingredientError = false;
}

export async function renderAiFoodCreatorPage() {
  const currentLang = i18n?.getLanguage ? i18n.getLanguage() : 'id';

  if (!formState.selectedIngredientIds || formState.selectedIngredientIds.length < 5) {
    formState.selectedIngredientIds = getRandomFiveIngredients();
  }

  if (isGenerating) {
    return renderGeneratingState(currentLang);
  }

  if (currentGeneratedRecipe) {
    return renderResultView(currentGeneratedRecipe, currentLang);
  }

  return renderFormView(currentLang);
}

/**
 * Generating State with Javanese Culinary Animation
 */
function renderGeneratingState(currentLang) {
  const isEn = currentLang === 'en';
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
          <span>${isEn ? 'LarasRasa AI Culinary Experiment Studio' : 'Studio Eksperimen Kuliner AI LarasRasa'}</span>
        </span>
        <h2 class="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#120B07]">
          ${isEn ? 'Formulating Authentic Culinary Creation...' : 'Meracik Kreasi Resep Pusaka Otentik...'}
        </h2>
        <p class="text-xs sm:text-sm text-[#5C3622] max-w-md mx-auto leading-relaxed">
          ${isEn 
            ? 'Harmonizing regional spices, calculating precise ingredient grammage, and formulating your authentic recipe document.'
            : 'Menyelaraskan rempah tradisi, menghitung takaran bumbu presisi, dan menyusun dokumen resep pusaka autentik.'}
        </p>
      </div>

      <div class="max-w-xs mx-auto pawon-glass p-4 rounded-2xl border border-[#D49B42]/35 text-xs text-[#5C3622] space-y-2 shadow-sm">
        <div class="flex items-center justify-between font-bold">
          <span>${isEn ? 'Recipe Formulation & Culinary Document' : 'Peracikan Resep & Dokumen Kuliner'}</span>
          <span class="text-[#C84C24] font-mono">100%</span>
        </div>
        <div class="w-full bg-[#FAF7F2] h-2.5 rounded-full overflow-hidden border border-[#E8DEC8]">
          <div class="bg-gradient-to-r from-[#D49B42] via-[#C84C24] to-[#2E4D38] h-full rounded-full animate-pulse" style="width: 100%"></div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Form View: Interactive Studio Configuration
 */
function renderFormView(currentLang) {
  const isEn = currentLang === 'en';

  // Compute session alert content reactively based on active language (strictly zero emoji)
  function getSessionAlertContent() {
    if (!sessionAlert) return null;
    if (sessionAlert.type === 'cooldown') {
      const minutes = sessionAlert.minutes || 10;
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
    if (sessionAlert.type === 'credit') {
      return {
        badge: isEn ? 'Credit Limit Notice' : 'Pemberitahuan Kuota Resep',
        title: isEn ? 'Credits Exhausted' : 'Kredit Peracikan Habis',
        text: isEn
          ? 'Recipe creation credits are exhausted. Please contact the administrator for additional credits.'
          : 'Kredit peracikan resep telah habis. Silakan hubungi pengelola untuk penambahan kredit.',
        isWarning: false
      };
    }
    if (sessionAlert.type === 'forbidden') {
      return {
        badge: isEn ? 'Service Authorization Notice' : 'Pemberitahuan Otorisasi Layanan',
        title: isEn ? 'Access Denied (403 Forbidden)' : 'Akses Ditolak (403 Forbidden)',
        text: isEn
          ? 'Supabase service access denied (403 Forbidden). Please ensure Enforce JWT Verification is disabled in Supabase Dashboard to allow the publishable key.'
          : 'Akses layanan Supabase ditolak (403 Forbidden). Pastikan Enforce JWT Verification dinonaktifkan di Dashboard Supabase untuk mengizinkan kunci publishable.',
        isWarning: false
      };
    }
    return {
      badge: isEn ? 'Service Notice' : 'Pemberitahuan Layanan',
      title: isEn ? 'Generation Error' : 'Kendala Peracikan',
      text: sessionAlert.text || (isEn ? 'Failed to process recipe generation with AI. Please check your connection and try again.' : 'Gagal memproses peracikan resep dengan AI. Silakan periksa koneksi dan coba lagi.'),
      isWarning: false
    };
  }

  const alertContent = getSessionAlertContent();

  // Filter ingredients directly by search query (no category tabs)
  let filteredIngredients = ALL_INGREDIENTS;
  if (searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase().trim();
    filteredIngredients = filteredIngredients.filter(i => 
      (i.nameId && i.nameId.toLowerCase().includes(q)) ||
      (i.nameEn && i.nameEn.toLowerCase().includes(q)) ||
      (i.flavorNote && i.flavorNote.toLowerCase().includes(q)) ||
      (i.description && i.description.toLowerCase().includes(q))
    );
  }

  const selectedCount = formState.selectedIngredientIds.length;

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
      <form id="ai-creator-form" class="space-y-8 max-w-4xl mx-auto">
        
        <!-- Input Nama Lengkap User (Pencipta Resep) -->
        <div id="creator-name-box" class="pawon-glass p-5 sm:p-6 rounded-3xl border ${nameError ? 'border-rose-400 bg-rose-50/20 ring-2 ring-rose-200' : 'border-[#D49B42]/35'} shadow-xs space-y-2 transition-all scroll-mt-24">
          <div class="flex items-center justify-between">
            <label for="creator-name-input" id="creator-name-label" class="block text-xs font-bold ${nameError ? 'text-rose-700' : 'text-[#120B07]'} uppercase tracking-wider transition-colors">
              ${isEn ? 'Your Full Name' : 'Nama Lengkap Anda'} <span class="text-[#C84C24]">*</span>
            </label>
            <span class="text-[10px] font-bold text-[#C84C24] bg-[#FDF4EE] px-2.5 py-0.5 rounded-full border border-[#C84C24]/30">
              ${isEn ? 'Recipe Author' : 'Pencipta Resep'}
            </span>
          </div>
          <input 
            type="text" 
            id="creator-name-input" 
            name="creatorName"
            value="${escapeHtml(formState.creatorName)}"
            placeholder="${isEn ? 'e.g., Evan Hendra Mulyadi' : 'Contoh: Evan Hendra Mulyadi'}"
            class="w-full px-4 py-3 rounded-2xl bg-white border ${
              nameError 
                ? 'border-rose-500 ring-2 ring-rose-300 bg-rose-50/30' 
                : 'border-[#E8DEC8] focus:ring-2 focus:ring-[#C84C24]'
            } focus:outline-hidden text-sm text-[#120B07] transition-all shadow-inner"
          />
          <p id="creator-name-error" class="text-xs text-rose-600 font-semibold flex items-center gap-1.5 animate-shake ${nameError ? '' : 'hidden'}">
            <span>${isEn ? 'Full name is required. Please fill in your name.' : 'Nama lengkap harus diisi sebelum meracik resep.'}</span>
          </p>
          <p id="creator-name-help" class="text-[11px] text-[#5C3622]/80 ${nameError ? 'hidden' : ''}">
            ${isEn 
              ? 'Your name will be inscribed as the author of this original recipe in the document and downloadable PDF.' 
              : 'Nama Anda akan dicantumkan sebagai peracik resep pada dokumen pusaka dan berkas unduhan PDF.'}
          </p>
        </div>
        
        <!-- SECTION 1: Ingredient Selection -->
        <section class="pawon-glass p-6 sm:p-8 rounded-3xl space-y-6 border border-[#D49B42]/35 shadow-xs">
          <div class="space-y-0.5 pb-4 border-b border-[#E8DEC8]">
            <h2 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#120B07]">
              ${isEn ? 'Step 1 • Select Authentic Central Javanese Ingredients' : 'Langkah 1 • Pilih Bahan & Rempah Otentik Jawa Tengah'}
            </h2>
            <p class="text-xs text-[#5C3622]">
              ${isEn ? 'Select authentic Central Javanese ingredients and spices' : 'Pilih aneka bahan pokok dan bumbu dapur autentik khas Jawa Tengah'}
            </p>
          </div>

          <!-- Active Ingredients Chips Bar -->
          <div id="ingredient-chips-box" class="p-4 rounded-2xl bg-[#FAF7F2] border ${ingredientError ? 'border-rose-400 bg-rose-50/25 ring-1 ring-rose-300' : 'border-[#D49B42]/30'} space-y-2 transition-all">
            <div class="text-[11px] font-bold uppercase tracking-wider flex items-center justify-between">
              <span class="${ingredientError ? 'text-rose-700' : 'text-[#5C3622]'}">
                ${isEn ? 'Selected Ingredients (Min. 5):' : 'Bahan yang Siap Masuk ke Racikan (Min. 5):'}
              </span>
              <span class="font-bold ${ingredientError ? 'text-rose-600' : 'text-emerald-700'}">
                ✓ ${selectedCount} ${isEn ? 'ingredients ready' : 'bahan siap diracik'}
              </span>
            </div>
            ${ingredientError ? `
              <p id="ingredient-min-error" class="text-xs text-rose-600 font-semibold flex items-center gap-1.5 animate-shake">
                <span>${isEn ? 'Minimum 5 ingredients must be selected.' : 'Minimal 5 bahan harus tetap dipilih.'}</span>
              </p>
            ` : ''}
            <div class="flex flex-wrap gap-1.5">
              ${selectedCount === 0 ? `
                <span class="text-xs italic text-[#5C3622]">
                  ${isEn ? 'No ingredients selected yet. Click ingredients below to select.': 'Belum ada bahan yang dipilih. Klik bahan-bahan di bawah untuk memilih.'}
                </span>
              ` : formState.selectedIngredientIds.map(id => {
                const item = ALL_INGREDIENTS.find(i => i.id === id);
                if (!item) return '';
                return `
                  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D49B42]/45 text-xs font-bold text-[#120B07] shadow-2xs">
                    <span>${isEn ? (item.nameEn || item.nameId) : item.nameId}</span>
                    <button type="button" data-remove-ingredient="${item.id}" class="text-[#C84C24] hover:text-rose-700 font-bold ml-1 text-sm cursor-pointer">&times;</button>
                  </span>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Instant Search Input (Single Clean Search Bar) -->
          <div class="relative w-full">
            <input 
              type="text" 
              id="ingredient-search-input" 
              placeholder="${isEn ? 'Search ingredients or spices (e.g. Ayam, Kemiri, Bawang, Lengkuas)...' : 'Cari nama bahan atau rempah dapur (contoh: Ayam, Kemiri, Bawang, Serai)...'}" 
              value="${escapeHtml(searchQuery)}"
              class="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#E8DEC8] text-xs sm:text-sm text-[#120B07] focus:outline-hidden focus:ring-2 focus:ring-[#C84C24] shadow-inner"
            />
            <svg class="w-4 h-4 text-[#C84C24] absolute left-4 top-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </div>

          <!-- Ingredients Grid (Pure Text Names, Zero Photos/Emojis/Categories) -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 max-h-[32rem] overflow-y-auto pt-3 pb-4 px-2 custom-scrollbar">
            ${filteredIngredients.length === 0 ? `
              <div class="col-span-full py-12 px-4 text-center space-y-3 bg-[#FAF7F2] rounded-3xl border border-dashed border-[#D49B42]/50">
                <div class="w-12 h-12 rounded-full bg-[#120B07] text-[#D49B42] flex items-center justify-center mx-auto text-xl font-bold">
                  🔍
                </div>
                <div class="space-y-1">
                  <h3 class="font-editorial-serif text-base sm:text-lg font-bold text-[#120B07]">
                    ${isEn ? 'Ingredient Not Found' : 'Bahan Tidak Ditemukan'}
                  </h3>
                  <p class="text-xs text-[#5C3622] max-w-sm mx-auto leading-relaxed">
                    ${isEn 
                      ? `No authentic ingredients match "${escapeHtml(searchQuery)}". Try searching for another keyword like Ayam, Bawang, or Cabai.` 
                      : `Tidak ada bahan atau bumbu yang cocok dengan kata kunci "${escapeHtml(searchQuery)}". Silakan coba kata kunci lain seperti Ayam, Bawang, atau Cabai.`}
                  </p>
                </div>
                <button 
                  type="button" 
                  id="clear-ingredient-search-btn" 
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#D49B42]/50 text-xs font-bold text-[#C84C24] hover:bg-[#FAF7F2] shadow-2xs cursor-pointer transition-colors"
                >
                  <span>✕</span>
                  <span>${isEn ? 'Clear Search Keyword' : 'Bersihkan Kata Kunci'}</span>
                </button>
              </div>
            ` : filteredIngredients.map(item => {
              const isSelected = formState.selectedIngredientIds.includes(item.id);
              return `
                <button 
                  type="button" 
                  data-ingredient-id="${item.id}"
                  class="group relative text-left p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 cursor-pointer card-hover-lift min-h-[3.75rem] ${
                    isSelected 
                      ? 'bg-[#120B07] text-white border-[#C84C24] ring-2 ring-[#C84C24] shadow-sm' 
                      : 'bg-white hover:bg-[#FAF7F2] text-[#120B07] border-[#E8DEC8] hover:border-[#D49B42]'
                  }"
                >
                  <strong class="text-xs sm:text-sm font-bold block whitespace-normal break-words leading-tight flex-1">
                    ${isEn ? (item.nameEn || item.nameId) : item.nameId}
                  </strong>
                  <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${
                    isSelected ? 'bg-[#C84C24] text-white' : 'bg-black/10 text-[#5C3622] group-hover:bg-[#C84C24]/20'
                  }">
                    ${isSelected ? '✓' : '+'}
                  </span>
                </button>
              `;
            }).join('')}
          </div>
        </section>

        <!-- SECTION 2: Culinary Calibration & Portions -->
        <section class="pawon-glass p-6 sm:p-8 rounded-3xl space-y-6 border border-[#D49B42]/35 shadow-xs">
          <div class="pb-4 border-b border-[#E8DEC8] space-y-0.5">
            <h2 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#120B07]">
              ${isEn ? 'Step 2 • Culinary Calibration & Portions' : 'Langkah 2 • Kalibrasi Karakter Rasa & Teknik Dapur'}
            </h2>
            <p class="text-xs text-[#5C3622]">
              ${isEn ? 'Calibrate cooking technique, flavor profile, and chili warmth level' : 'Tentukan metode olah bumbu, karakter rasa pusaka, dan tingkat kehangatan lombok'}
            </p>
          </div>

          <!-- Cooking Method -->
          <div class="space-y-2.5">
            <label class="block text-xs font-bold text-[#120B07] uppercase tracking-wider">
              ${isEn ? 'Traditional Cooking Method' : 'Metode Olah Tradisional'}
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              ${PREFERENCE_OPTIONS.cookingMethods.map(m => {
                const isSelected = formState.cookingMethod === m.id;
                return `
                  <label class="p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between card-hover-lift ${
                    isSelected 
                      ? 'bg-[#120B07] text-[#FAF7F2] border-[#C84C24] ring-2 ring-[#C84C24]' 
                      : 'bg-white hover:bg-[#FAF7F2] text-[#120B07] border-[#E8DEC8]'
                  }">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold">${isEn ? m.labelEn : m.labelId}</span>
                      <input type="radio" name="cookingMethod" value="${m.id}" ${isSelected ? 'checked' : ''} class="sr-only"/>
                    </div>
                    <p class="text-[10px] ${isSelected ? 'text-[#D49B42]' : 'text-[#5C3622]'} mt-2 leading-relaxed">
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
              <label class="block text-xs font-bold text-[#120B07] uppercase tracking-wider">
                ${isEn ? 'Flavor Character Balance' : 'Harmoni Karakter Rasa'}
              </label>
              <select 
                id="taste-profile-select" 
                class="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#E8DEC8] text-xs font-bold text-[#120B07] focus:ring-2 focus:ring-[#C84C24]"
              >
                ${PREFERENCE_OPTIONS.tasteProfiles.map(tp => `
                  <option value="${tp.id}" ${formState.tasteProfile === tp.id ? 'selected' : ''}>
                    ${isEn ? tp.labelEn : tp.labelId}
                  </option>
                `).join('')}
              </select>
              <p class="text-[11px] text-[#5C3622]/80">
                ${isEn ? 'Calibrates authentic flavor balance and spice harmony.' : 'Menyesuaikan racikan harmoni rasa dan rempah tradisi.'}
              </p>
            </div>

            <!-- Fixed Standard 4 Portions Servings Info -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="block text-xs font-bold text-[#120B07] uppercase tracking-wider">
                  ${isEn ? 'Servings Scale (Fixed)' : 'Porsi Santapan (Standar Otomatis)'}
                </span>
                <span class="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ${isEn ? '✓ 4 Portions' : '✓ 4 Porsi'}
                </span>
              </div>

              <div class="p-3 rounded-2xl border border-[#D49B42]/35 bg-white flex items-center gap-3 shadow-2xs">
                <div class="w-9 h-9 rounded-xl bg-[#1E120A] text-[#D49B42] flex items-center justify-center shrink-0 font-bold text-sm">
                  🍽️
                </div>
                <div>
                  <strong class="text-xs sm:text-sm text-[#120B07] font-bold block">${isEn ? '4 Portions (Standard Serving)' : '4 Porsi (Takaran Standar)'}</strong>
                  <span class="text-[11px] text-[#5C3622] leading-tight block">
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
              <label class="block text-xs font-bold text-[#120B07] uppercase tracking-wider">
                ${isEn ? 'Chili Warmth Level (Lombok)' : 'Tingkat Kehangatan Lombok'}
              </label>
              <span class="text-[11px] text-[#5C3622]">
                ${isEn ? '4 Warmth Scales' : '4 Skala Tingkat Pedas'}
              </span>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              ${[
                { id: 0, title: isEn ? 'No Spice' : 'Tanpa Pedas', desc: isEn ? 'Child friendly, no chili' : 'Ramah anak, tanpa cabai', badge: 'Level 0' },
                { id: 1, title: isEn ? 'Mild Warmth' : 'Hangat Lembut', desc: isEn ? 'Red chili aroma, subtle' : 'Cabai merah besar beraroma', badge: 'Level 1' },
                { id: 2, title: isEn ? 'Medium Hot' : 'Pedas Sedang', desc: isEn ? 'Curly chili, balanced' : 'Cabai keriting lauk harian', badge: 'Level 2' },
                { id: 3, title: isEn ? 'Fiery Hot' : 'Pedas Mantap', desc: isEn ? 'Bird’s eye chili kick' : 'Cabai rawit ulek mantap', badge: 'Level 3' }
              ].map(sl => {
                const isSelected = formState.spiceLevel === sl.id;
                return `
                  <label class="p-4 rounded-2xl border text-left text-xs font-bold cursor-pointer transition-all card-hover-lift flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-[#120B07] text-white border-[#C84C24] ring-2 ring-[#C84C24] shadow-sm' 
                      : 'bg-white hover:bg-[#FAF7F2] text-[#120B07] border-[#E8DEC8]'
                  }">
                    <input type="radio" name="spiceLevel" value="${sl.id}" ${isSelected ? 'checked' : ''} class="sr-only"/>
                    <div class="flex items-center justify-between">
                      <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-[#C84C24] text-white' : 'bg-[#FAF7F2] text-[#C84C24]'
                      }">${sl.badge}</span>
                      <span class="text-xs ${isSelected ? 'text-[#D49B42]' : 'text-emerald-700'} font-bold">
                        ${isSelected ? '●' : '○'}
                      </span>
                    </div>
                    <div class="mt-3 space-y-0.5">
                      <strong class="block text-xs font-bold ${isSelected ? 'text-white' : 'text-[#120B07]'}">${sl.title}</strong>
                      <span class="block text-[10px] ${isSelected ? 'text-white/80' : 'text-[#5C3622]'} font-normal leading-tight">${sl.desc}</span>
                    </div>
                  </label>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Row 3: Custom Culinary Notes -->
          <div class="space-y-2 pt-2">
            <label for="custom-notes-input" class="block text-xs font-bold text-[#120B07] uppercase tracking-wider">
              ${isEn ? 'Culinary Vision / Special Notes (Optional)' : 'Catatan Selera Tambahan (Opsional)'}
            </label>
            <input 
              type="text" 
              id="custom-notes-input" 
              name="customNotes"
              value="${escapeHtml(formState.customNotes)}"
              placeholder="${isEn ? 'e.g., Rich coconut milk with subtle lime fragrance...' : 'Contoh: Kuah areh gurih lembut beraroma daun jeruk...'}"
              class="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#E8DEC8] text-xs sm:text-sm text-[#120B07] focus:ring-2 focus:ring-[#C84C24] shadow-inner"
            />
            <p class="text-[11px] text-[#5C3622]/80">
              ${isEn ? 'Personal preference or creative touch for the recipe formulation.' : 'Sentuhan pribadi atau catatan khusus untuk menyempurnakan racikan rasa.'}
            </p>
          </div>
        </section>

        <!-- CTA Action Bar -->
        <div class="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#120B07] via-[#1E120A] to-[#120B07] border-2 border-[#D49B42]/45 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-5">
          <div class="text-left space-y-1.5">
            <h3 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#FAF7F2]">
              ${isEn ? 'Ready to craft your heritage recipe?' : 'Siap meracik kreasi resep pusaka Anda?'}
            </h3>
            <p class="text-xs text-[#FAF7F2]/80 max-w-lg">
              ${isEn 
                ? 'LarasRasa AI will formulate calibrated spice measurements, cooking techniques, and step-by-step instructions ready to download.' 
                : 'Kecerdasan buatan LarasRasa akan meracik takaran bumbu presisi, teknik memasak, dan panduan olah lengkap yang siap diunduh.'}
            </p>
          </div>

          <button 
            type="submit" 
            id="generate-recipe-submit-btn"
            class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C84C24] hover:bg-[#AE3E1B] text-[#FAF7F2] font-bold text-sm tracking-wide transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2.5 shrink-0 cursor-pointer border border-[#E05A30]"
          >
            <span>${isEn ? 'Craft Heritage Recipe' : 'Racik Resep Pusaka'}</span>
            <svg class="w-4 h-4 text-[#FAF7F2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
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

  // 3. Bahan & Bumbu Dapur / Ingredients
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

  // 4. Peralatan Dapur Tradisional / Equipment
  if (recipe.equipment && recipe.equipment.length > 0) {
    const eqHeader = isEn ? 'Traditional Kitchen Equipment:' : 'Peralatan Dapur Tradisional:';
    const eqLines = recipe.equipment.map(eq => {
      const label = typeof eq === 'object' ? (isEn ? (eq.labelEn || eq.labelId) : (eq.labelId || eq.labelEn)) : eq;
      return `• ${label}`;
    }).join('\n');

    sections.push(`${eqHeader}\n\n${eqLines}`);
  }

  // 5. Panduan Langkah Memasak / Cooking Steps
  const stepsList = isEn ? (recipe.stepsEn || recipe.steps) : (recipe.stepsId || recipe.steps);
  if (stepsList && stepsList.length > 0) {
    const stepsHeader = isEn 
      ? `Step-by-Step Cooking Guide (${stepsList.length} steps):` 
      : `Panduan Langkah Memasak (${stepsList.length} tahap):`;

    const formattedSteps = stepsList.map((st, idx) => {
      const stepNum = st.stepNumber || idx + 1;
      const sTitle = isEn ? (st.titleEn || st.titleId || st.title) : (st.titleId || st.title);
      const sDesc = isEn 
        ? (st.instructionEn || st.instructionId || st.instruction || st.descriptionEn || st.description)
        : (st.instructionId || st.instruction || st.descriptionId || st.description);
      return `${stepNum}. ${sTitle}\n${sDesc}`;
    }).join('\n\n');

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
  const isEn = currentLang === 'en';
  const creationDate = new Date(recipe.createdAt || Date.now()).toLocaleDateString(isEn ? 'en-US' : 'id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      <!-- Top Navigation & Action Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D49B42]/30 no-print">
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
            class="px-5 py-2.5 rounded-2xl border border-[#D49B42]/50 bg-white hover:bg-[#FAF7F2] text-[#120B07] text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <svg class="w-4 h-4 text-[#120B07] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>${t('aiCreator.backToStudioBtn')}</span>
          </button>
        </div>
      </div>

      <!-- Action Toolbar (PDF, Copy) -->
      <div class="flex flex-wrap items-center justify-center gap-3 pt-2 no-print">
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
                  ${recipe.servings || 4} ${isEn ? 'portions' : 'porsi'}
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
                      ${ing.amount ? `${ing.amount} ${isEn ? (ing.unitEn || ing.unitId || ing.unit) : (ing.unitId || ing.unit)}` : '-'}
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
                      <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] text-xs font-semibold text-[#120B07]">
                        <span>🍳</span>
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
                  ${((isEn ? (recipe.stepsEn || recipe.steps) : (recipe.stepsId || recipe.steps)) || []).length} ${isEn ? 'steps' : 'tahap'}
                </span>
              </div>

              <!-- Steps List -->
              <div class="space-y-4 pt-1">
                ${((isEn ? (recipe.stepsEn || recipe.steps) : (recipe.stepsId || recipe.steps)) || []).map((step, idx) => `
                  <div class="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-2.5 text-xs hover:border-[#D49B42]/50 transition-colors">
                    <div class="flex items-center justify-between flex-wrap gap-2">
                      <div class="flex items-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-[#120B07] text-[#D49B42] font-bold text-xs flex items-center justify-center font-mono">
                          ${step.stepNumber || idx + 1}
                        </span>
                        <strong class="text-[#120B07] font-bold font-editorial-serif text-sm sm:text-base">
                          ${escapeHtml(isEn ? (step.titleEn || step.titleId || step.title) : (step.titleId || step.title))}
                        </strong>
                      </div>
                      ${(isEn ? (step.techniqueEn || step.techniqueId || step.technique) : (step.techniqueId || step.technique)) ? `
                        <div class="flex items-center gap-2">
                          <span class="text-[10px] font-semibold text-[#C84C24] bg-[#FDF4EE] px-2.5 py-0.5 rounded-md border border-[#C84C24]/20">
                            ${escapeHtml(isEn ? (step.techniqueEn || step.techniqueId || step.technique) : (step.techniqueId || step.technique))}
                          </span>
                        </div>
                      ` : ''}
                    </div>
                    <p class="text-[#5C3622] leading-relaxed text-xs sm:text-sm pl-8">
                      ${escapeHtml(isEn ? (step.instructionEn || step.instructionId || step.instruction || step.descriptionEn || step.description) : (step.instructionId || step.instruction || step.descriptionId || step.description))}
                    </p>
                    ${(isEn ? (step.tipEn || step.tipId || step.tip) : (step.tipId || step.tip)) ? `
                      <div class="mt-2 ml-8 p-3 rounded-xl bg-white border border-[#D49B42]/30 text-[11px] text-[#2E4D38] flex items-start gap-2">
                        <span class="text-[#D49B42] font-bold">★</span>
                        <span><strong>${isEn ? 'Technique Tip:' : 'Tips Olah:'}</strong> ${escapeHtml(isEn ? (step.tipEn || step.tipId || step.tip) : (step.tipId || step.tip))}</span>
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>

          </div>

        </div>

        <!-- Bottom Action CTA -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#120B07] via-[#1E120A] to-[#120B07] border-2 border-[#D49B42]/45 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
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
            class="px-6 py-3.5 rounded-2xl bg-[#C84C24] hover:bg-[#AE3E1B] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer border border-[#E05A30] shrink-0"
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

  // Tabs for ingredients
  const tabBtns = document.querySelectorAll('[data-tab]');
  tabBtns.forEach(btn => {
    btn.onclick = () => {
      activeTab = btn.getAttribute('data-tab');
      reRenderCurrentView();
    };
  });

  // Search input for ingredients
  const searchInput = document.getElementById('ingredient-search-input');
  if (searchInput) {
    let debounce;
    searchInput.oninput = (e) => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        searchQuery = e.target.value;
        reRenderCurrentView();
      }, 250);
    };
  }

  // Ingredient Card Selection Toggle
  const ingCards = document.querySelectorAll('[data-ingredient-id]');
  ingCards.forEach(card => {
    card.onclick = () => {
      const id = card.getAttribute('data-ingredient-id');
      if (formState.selectedIngredientIds.includes(id)) {
        if (formState.selectedIngredientIds.length <= 5) {
          ingredientError = true;
          reRenderCurrentView();
          return;
        }
        ingredientError = false;
        formState.selectedIngredientIds = formState.selectedIngredientIds.filter(i => i !== id);
      } else {
        ingredientError = false;
        formState.selectedIngredientIds.push(id);
      }
      reRenderCurrentView();
    };
  });

  // Remove Ingredient Pill
  const removePills = document.querySelectorAll('[data-remove-ingredient]');
  removePills.forEach(pill => {
    pill.onclick = (e) => {
      e.stopPropagation();
      const id = pill.getAttribute('data-remove-ingredient');
      if (formState.selectedIngredientIds.length <= 5) {
        ingredientError = true;
        reRenderCurrentView();
        return;
      }
      ingredientError = false;
      formState.selectedIngredientIds = formState.selectedIngredientIds.filter(i => i !== id);
      reRenderCurrentView();
    };
  });

  // Clear Ingredient Search Keyword
  const clearSearchBtn = document.getElementById('clear-ingredient-search-btn');
  if (clearSearchBtn) {
    clearSearchBtn.onclick = () => {
      searchQuery = '';
      reRenderCurrentView();
    };
  }

  // Creator inputs binding
  const nameInput = document.getElementById('creator-name-input');
  if (nameInput) {
    nameInput.oninput = (e) => {
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

  const nickInput = document.getElementById('creator-nickname-input');
  if (nickInput) {
    nickInput.oninput = (e) => {
      formState.creatorNickname = e.target.value;
    };
  }

  const notesInput = document.getElementById('custom-notes-input');
  if (notesInput) {
    notesInput.oninput = (e) => {
      formState.customNotes = e.target.value;
    };
  }

  const tasteSelect = document.getElementById('taste-profile-select');
  if (tasteSelect) {
    tasteSelect.onchange = (e) => {
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

      if (!formState.creatorName.trim()) {
        nameError = true;
        await reRenderCurrentView();
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

      if (formState.selectedIngredientIds.length < 5) {
        ingredientError = true;
        await reRenderCurrentView();
        const chipsBox = document.getElementById('ingredient-chips-box');
        if (chipsBox) {
          chipsBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // 2. 10-Minute Cooldown Check
      const lastGenTimestamp = localStorage.getItem(COOLDOWN_KEY);
      if (lastGenTimestamp) {
        const elapsed = Date.now() - parseInt(lastGenTimestamp, 10);
        if (elapsed < COOLDOWN_MS) {
          const remainingMinutes = Math.max(1, Math.ceil((COOLDOWN_MS - elapsed) / 60000));
          sessionAlert = {
            type: 'cooldown',
            minutes: remainingMinutes
          };
          await reRenderCurrentView();
          const alertEl = document.getElementById('ai-creator-session-alert');
          if (alertEl) {
            alertEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          return;
        }
      }

      // 3. Supabase Credit Check
      try {
        const creditCheck = await aiFoodCreatorService.checkCredits();
        if (!creditCheck.ok) {
          if (creditCheck.error === 'no_credits') {
            sessionAlert = { type: 'credit' };
            await reRenderCurrentView();
            const alertEl = document.getElementById('ai-creator-session-alert');
            if (alertEl) {
              alertEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
          } else if (creditCheck.error === 'forbidden' || creditCheck.status === 403) {
            sessionAlert = { type: 'forbidden' };
            await reRenderCurrentView();
            const alertEl = document.getElementById('ai-creator-session-alert');
            if (alertEl) {
              alertEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
          }
        }
      } catch (checkErr) {
        console.warn('Credit check error:', checkErr);
      }

      nameError = false;
      ingredientError = false;
      sessionAlert = null;
      isGenerating = true;
      reRenderCurrentView();
      window.scrollTo({ top: 150, behavior: 'smooth' });

      try {
        const recipe = await aiFoodCreatorService.generateRecipe({
          ...formState,
          outputLanguage: isEn ? 'en' : 'id'
        });
        currentGeneratedRecipe = recipe;
        localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
      } catch (err) {
        isGenerating = false;
        if (err.code === 'CREDIT_EXHAUSTED') {
          sessionAlert = { type: 'credit' };
        } else if (err.code === 'EDGE_FORBIDDEN') {
          sessionAlert = { type: 'forbidden' };
        } else {
          sessionAlert = { 
            type: 'error',
            text: isEn 
              ? 'Failed to connect to Supabase Gemini Edge Function. Please verify that your Edge Function is deployed and accessible.'
              : 'Gagal terhubung ke Supabase Gemini Edge Function. Pastikan fungsi Edge Function Supabase telah terpasang dan dapat diakses.'
          };
        }
        await reRenderCurrentView();
        const alertEl = document.getElementById('ai-creator-session-alert');
        if (alertEl) {
          alertEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      } finally {
        isGenerating = false;
        reRenderCurrentView();
        window.scrollTo({ top: 100, behavior: 'smooth' });
      }
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
      if (r.checked) {
        onChange(r.value);
        reRenderCurrentView();
      }
    };
  });
}

async function reRenderCurrentView() {
  const container = document.getElementById('page-main-content');
  if (container) {
    container.innerHTML = await renderAiFoodCreatorPage();
    initAiFoodCreatorInteractions();
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
