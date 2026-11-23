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

let currentGeneratedRecipe = null;
let isGenerating = false;
let validationMessage = null;
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
          <span>${isEn ? 'Culinary Synthesis in Progress' : 'Studio Sintesis Rasa LarasRasa'}</span>
        </span>
        <h2 class="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#120B07]">
          ${isEn ? 'Synthesizing Authentic Culinary Creation...' : 'Meracik Kreasi Resep Pusaka Autentik...'}
        </h2>
        <p class="text-xs sm:text-sm text-[#5C3622] max-w-md mx-auto leading-relaxed">
          ${isEn 
            ? 'Harmonizing regional spices, calculating precise ingredient grammage, and formulating your authentic recipe document.'
            : 'Menyelaraskan rempah tradisi, menghitung takaran bumbu presisi, dan menyusun dokumen resep pusaka autentik.'}
        </p>
      </div>

      <div class="max-w-xs mx-auto pawon-glass p-4 rounded-2xl border border-[#D49B42]/35 text-xs text-[#5C3622] space-y-2 shadow-sm">
        <div class="flex items-center justify-between font-bold">
          <span>${isEn ? 'Culinary Synthesis & Recipe Document' : 'Sintesis Rasa & Dokumen Resep'}</span>
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
        <div class="pawon-glass p-5 sm:p-6 rounded-3xl border ${nameError ? 'border-rose-400 bg-rose-50/20' : 'border-[#D49B42]/35'} shadow-xs space-y-2 transition-all">
          <div class="flex items-center justify-between">
            <label for="creator-name-input" class="block text-xs font-bold ${nameError ? 'text-rose-700' : 'text-[#120B07]'} uppercase tracking-wider">
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
          ${nameError ? `
            <p id="creator-name-error" class="text-xs text-rose-600 font-semibold flex items-center gap-1.5 animate-shake">
              <span>${isEn ? 'Please enter your full name.' : 'Nama lengkap wajib diisi.'}</span>
            </p>
          ` : `
            <p class="text-[11px] text-[#5C3622]/80">
              ${isEn 
                ? 'Your name will be inscribed as the author of this original recipe in the document and downloadable PDF.' 
                : 'Nama Anda akan dicantumkan sebagai peracik resep pada dokumen pusaka dan berkas unduhan PDF.'}
            </p>
          `}
        </div>
        
        <!-- SECTION 1: Ingredient Selection -->
        <section class="pawon-glass p-6 sm:p-8 rounded-3xl space-y-6 border border-[#D49B42]/35 shadow-xs">
          <div class="space-y-0.5 pb-4 border-b border-[#E8DEC8]">
            <h2 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#120B07]">
              ${isEn ? 'Step 1 • Select Regional Ingredients' : 'Langkah 1 • Pilih Bahan & Rempah Otentik Jawa'}
            </h2>
            <p class="text-xs text-[#5C3622]">
              ${isEn ? 'Select authentic Central Javanese ingredients and spices (minimum 5 ingredients)' : 'Pilih aneka bahan pokok dan bumbu dapur autentik khas Jawa Tengah (minimal 5 bahan)'}
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
                  ${isEn ? 'No ingredients selected yet. Click ingredients below to select (minimum 5 ingredients).': 'Belum ada bahan yang dipilih. Klik bahan-bahan di bawah untuk memilih (minimal 5 bahan).'}
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
                ${isEn ? 'Regional Flavor Balance' : 'Harmoni Rasa Jawa Tengah'}
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
                ${isEn ? 'Calibrates the authentic regional nuance of Central Javanese cuisine.' : 'Menyesuaikan pakem harmoni rasa khas sentra kuliner Jawa Tengah.'}
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
              ${isEn ? 'Ready to synthesize your heritage recipe?' : 'Siap meracik kreasi resep pusaka Anda?'}
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
            <span>${isEn ? 'Synthesize Heritage Recipe' : 'Racik Resep Pusaka'}</span>
            <svg class="w-4 h-4 text-[#FAF7F2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

      </form>

    </div>
  `;
}

/**
 * Formats full recipe into a structured, clean text string for clipboard copy.
 */
function formatRecipeAsText(recipe, isEn) {
  const lines = [];
  lines.push('====================================================');
  lines.push('LARASRASA • PUSAKA RASA JAWA TENGAH');
  lines.push(isEn ? `RECIPE DOCUMENT: ${(recipe.title || '').toUpperCase()}` : `DOKUMEN RESEP: ${(recipe.title || '').toUpperCase()}`);
  if (recipe.javaneseTitle) {
    lines.push(recipe.aksaraJawa ? `${recipe.javaneseTitle} (${recipe.aksaraJawa})` : recipe.javaneseTitle);
  }
  lines.push('====================================================');
  if (recipe.creatorName && recipe.creatorName !== 'Dapur Tradisi LarasRasa') {
    lines.push(`${isEn ? 'Creator' : 'Pencipta'}: ${recipe.creatorName}${recipe.creatorNickname ? ` (${recipe.creatorNickname})` : ''}`);
  }
  lines.push(`${isEn ? 'Portions' : 'Porsi'}: ${recipe.servings || 4} ${isEn ? 'Portions' : 'Porsi'}`);
  lines.push(`${isEn ? 'Cooking Time' : 'Waktu Olah'}: ${recipe.totalTime || '45 Menit'}`);
  lines.push(`${isEn ? 'Method' : 'Metode Masak'}: ${recipe.cookingMethod || ''}`);
  lines.push(`${isEn ? 'Taste Profile' : 'Karakter Rasa'}: ${recipe.tasteProfile || ''}`);
  lines.push(`${isEn ? 'Registration ID' : 'Nomor Seri Registrasi'}: ${recipe.id || ''}`);
  lines.push('');
  if (recipe.description || recipe.philosophy) {
    lines.push(isEn ? '--- RECIPE OVERVIEW ---' : '--- RINGKASAN RESEP ---');
    lines.push(recipe.description || recipe.philosophy || '');
    lines.push('');
  }
  lines.push(isEn ? `--- INGREDIENTS (${recipe.servings || 4} PORTIONS) ---` : `--- RERONCEN BAHAN & BUMBU (${recipe.servings || 4} PORSI) ---`);
  (recipe.ingredients || []).forEach(ing => {
    lines.push(`• ${ing.amount ? `${ing.amount} ${ing.unit || ''}` : ''} ${ing.name}${ing.note ? ` (${ing.note})` : ''}`);
  });
  lines.push('');
  lines.push(isEn ? '--- COOKING STEPS ---' : '--- PANDUAN LANGKAH MEMASAK ---');
  (recipe.steps || []).forEach((st, idx) => {
    lines.push(`${st.stepNumber || idx + 1}. ${st.title} (${st.durationMinutes || 10} ${isEn ? 'min' : 'menit'})`);
    lines.push(`   ${st.description}`);
    if (st.technique) lines.push(`   [${isEn ? 'Technique' : 'Teknik'}: ${st.technique}]`);
    if (st.tip) lines.push(`   [${isEn ? 'Tip' : 'Tips'}: ${st.tip}]`);
    lines.push('');
  });
  if (recipe.chefTips && recipe.chefTips.length > 0) {
    lines.push(isEn ? '--- CHEF SECRETS ---' : '--- WEWADI PAWON (RAHASIA CHEF) ---');
    recipe.chefTips.forEach(tip => lines.push(`• ${tip}`));
    lines.push('');
  }
  if (recipe.safetyNotes) {
    lines.push(isEn ? '--- STORAGE & SAFETY ---' : '--- CATATAN KEAMANAN & PENYIMPANAN ---');
    lines.push(recipe.safetyNotes);
    lines.push('');
  }
  lines.push('====================================================');
  lines.push('LarasRasa • Menyelaraskan Rasa Warisan Leluhur Jawa Tengah');
  return lines.join('\n');
}

/**
 * Output Result View: Pure AI text recipe with Frontend Certificate. Zero photos.
 */
function renderResultView(recipe, currentLang) {
  const isEn = currentLang === 'en';
  const creationId = recipe.id || `REC-${Date.now().toString().slice(-6)}`;
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
            <span class="text-[11px] font-mono uppercase tracking-wider text-[#2E4D38] bg-[#FAF7F2] px-3 py-1 rounded-md border border-[#D49B42]/30 font-bold">
              ID: ${creationId}
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

      <!-- Live Toast Feedback Notification -->
      <div id="live-toast-banner" class="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between shadow-xs ${toastMessage ? '' : 'hidden'} no-print">
        <div class="flex items-center gap-2 font-bold">
          <span class="text-base">✓</span>
          <span class="toast-text">${toastMessage || ''}</span>
        </div>
        <button type="button" id="dismiss-toast-btn" class="font-bold text-emerald-700 text-sm cursor-pointer hover:text-emerald-950">&times;</button>
      </div>

      

      <!-- Action Toolbar (PDF, Print, Copy) -->
      <div class="flex flex-wrap items-center justify-center gap-3 pt-2 no-print">
        <button 
          type="button" 
          id="download-recipe-pdf-btn"
          class="px-5 py-2.5 rounded-2xl bg-[#C84C24] hover:bg-[#AE3E1B] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer border border-[#E05A30]"
        >
          <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          <span>${t('aiCreator.downloadPdf') || (isEn ? 'Download Recipe (PDF)' : 'Unduh Resep (PDF)')}</span>
        </button>

        <button 
          type="button" 
          id="print-recipe-btn"
          class="px-5 py-2.5 rounded-2xl bg-white hover:bg-[#FAF7F2] text-[#120B07] font-bold text-xs transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer border border-[#D49B42]/50"
        >
          <svg class="w-4 h-4 text-[#120B07]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z"/>
          </svg>
          <span>${t('aiCreator.printRecipe') || (isEn ? 'Print Recipe Document' : 'Cetak Dokumen Resep')}</span>
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
          <span>${t('aiCreator.copyRecipeText')}</span>
        </button>
      </div>

      <!-- RICH AI RECIPE DOCUMENT (PURE TEXT FROM AI, ZERO PHOTOS) -->
      <article class="space-y-8">
        
        <!-- Story & Philosophy Card -->
        <div class="bg-white p-6 sm:p-10 rounded-3xl border-2 border-[#D49B42]/35 shadow-lg space-y-6">
          <div class="space-y-3 pb-6 border-b border-[#E8DEC8]">
            <div class="flex items-center justify-between gap-3 flex-wrap">
              <span class="text-xs px-3.5 py-1 rounded-full bg-[#FDF4EE] text-[#C84C24] font-bold border border-[#C84C24]/30">
                ${escapeHtml(recipe.dishCategory || 'Pusaka Jawa Tengah')}
              </span>
              <span class="text-xs text-[#5C3622]">
                ${isEn ? 'Calibrated by LarasRasa Culinary Intelligence' : 'Dikalibrasi dening LarasRasa Culinary Intelligence'}
              </span>
            </div>

            <h2 class="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#120B07] leading-tight">
              ${escapeHtml(recipe.title)}
            </h2>

            ${recipe.javaneseTitle ? `
              <p class="font-serif italic text-base sm:text-lg text-[#C84C24]">
                "${escapeHtml(recipe.javaneseTitle)}" ${recipe.aksaraJawa ? `<span class="text-sm font-mono text-[#2E4D38] ml-1">(${escapeHtml(recipe.aksaraJawa)})</span>` : ''}
              </p>
            ` : ''}

            <p class="text-xs text-[#5C3622]">
              ${isEn ? 'Recipe Formulated by:' : 'Pencipta Resep:'} <strong class="text-[#120B07] font-bold">${escapeHtml(recipe.creatorName || (isEn ? 'LarasRasa Culinary Hearth' : 'Dapur Tradisi LarasRasa'))}</strong>
            </p>

            
          </div>

          ${(recipe.description || recipe.philosophy) ? `
            <!-- Overview & Flavor Profile -->
            <div class="p-5 sm:p-6 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 space-y-2">
              <span class="text-[10px] uppercase font-bold text-[#2E4D38] tracking-wider block">
                ${isEn ? 'Recipe Overview & Flavor Character' : 'Karakter Rasa & Konsep Olahan'}
              </span>
              <p class="text-xs sm:text-sm text-[#5C3622] leading-relaxed">
                ${escapeHtml(recipe.description || recipe.philosophy || '')}
              </p>
            </div>
          ` : ''}

          <!-- 4 Recipe Metrics Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] text-center space-y-1">
              <span class="text-[#2E4D38] block text-[10px] font-bold uppercase tracking-wider">
                ${isEn ? 'Total Time' : 'Waktu Olah'}
              </span>
              <strong class="text-[#120B07] font-bold text-sm block">${recipe.totalTime || '45 Menit'}</strong>
              <span class="text-[10px] text-[#5C3622] block">${isEn ? 'Prep:' : 'Persiapan:'} ${recipe.prepTime || (isEn ? '15m' : '15 menit')} • ${isEn ? 'Cook:' : 'Masak:'} ${recipe.cookTime || (isEn ? '30m' : '30 menit')}</span>
            </div>
            
            <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] text-center space-y-1">
              <span class="text-[#2E4D38] block text-[10px] font-bold uppercase tracking-wider">
                ${isEn ? 'Portions' : 'Porsi Standar'}
              </span>
              <strong class="text-[#120B07] font-bold text-sm block">${recipe.servings || 4} ${isEn ? 'Portions' : 'Porsi'}</strong>
              <span class="text-[10px] text-[#5C3622] block">${isEn ? 'Standard Table' : 'Takaran Pas Kuliner'}</span>
            </div>

            <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] text-center space-y-1">
              <span class="text-[#2E4D38] block text-[10px] font-bold uppercase tracking-wider">
                ${isEn ? 'Spice Warmth' : 'Tingkat Pedas'}
              </span>
              <strong class="text-[#C84C24] font-bold text-sm block">Level ${recipe.spiceLevel || 1} / 5</strong>
              <span class="text-[10px] text-[#5C3622] block">${recipe.spiceLevel > 2 ? (isEn ? 'Warm & Fiery' : 'Hangat Menggigit') : (isEn ? 'Mild & Savory' : 'Lembut & Pas')}</span>
            </div>

            <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] text-center space-y-1">
              <span class="text-[#2E4D38] block text-[10px] font-bold uppercase tracking-wider">
                ${isEn ? 'Difficulty' : 'Tingkat Olah'}
              </span>
              <strong class="text-[#120B07] font-bold text-sm block">${recipe.difficulty || (isEn ? 'Medium' : 'Sedang')}</strong>
              <span class="text-[10px] text-[#5C3622] block">${recipe.calories ? recipe.calories.split('/')[0] : (isEn ? '360 kcal' : '360 kkal')}</span>
            </div>
          </div>
        </div>

        <!-- Two-Column Details Grid: Ingredients & Steps -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- LEFT COLUMN: Ingredients, Equipment, Chef Tips (5 cols) -->
          <div class="lg:col-span-5 space-y-6">
            
            <!-- Scaled Ingredients Card -->
            <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#D49B42]/35 shadow-sm space-y-4">
              <div class="flex items-center justify-between border-b border-[#E8DEC8] pb-3">
                <div>
                  <span class="text-[10px] font-bold uppercase tracking-wider text-[#C84C24] block">${isEn ? 'Authentic Ensemble' : 'Reroncen Bahan'}</span>
                  <h3 class="font-editorial-serif text-lg font-bold text-[#120B07]">
                    ${t('aiCreator.ingredientsTitle')}
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
                        <span class="font-semibold block">${escapeHtml(ing.name)}</span>
                        ${ing.note ? `<span class="text-[10px] text-[#5C3622] italic block">${escapeHtml(ing.note)}</span>` : ''}
                      </div>
                    </div>
                    <span class="font-mono text-[11px] font-bold text-[#120B07] bg-white px-2.5 py-1 rounded-lg border border-[#E8DEC8] shrink-0">
                      ${ing.amount ? `${ing.amount} ${ing.unit || ''}` : '-'}
                    </span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Cooking Equipment Used -->
            ${Array.isArray(recipe.equipment) && recipe.equipment.length > 0 ? `
              <div class="bg-white p-5 sm:p-6 rounded-3xl border border-[#D49B42]/35 shadow-sm space-y-3">
                <span class="text-[10px] font-bold uppercase tracking-wider text-[#2E4D38] block">
                  ${isEn ? 'Traditional Kitchen Equipment' : 'Piranti Pawon ingkang Dipunginaaken'}
                </span>
                <div class="flex flex-wrap gap-2">
                  ${recipe.equipment.map(eq => `
                    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] text-xs font-semibold text-[#120B07]">
                      <span>🍳</span>
                      <span>${escapeHtml(eq)}</span>
                    </span>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Chef Secrets & Pawon Tips -->
            ${Array.isArray(recipe.chefTips) && recipe.chefTips.length > 0 ? `
              <div class="bg-[#FAF7F2] p-5 sm:p-6 rounded-3xl border border-[#D49B42]/40 shadow-sm space-y-3 text-xs">
                <div class="flex items-center gap-2 font-bold text-[#C84C24]">
                  <span class="text-base">💡</span>
                  <span class="font-editorial-serif text-sm">${t('aiCreator.chefTipsTitle')}</span>
                </div>
                <div class="space-y-2 text-[#5C3622]">
                  ${recipe.chefTips.map(tip => `
                    <p class="flex items-start gap-2 leading-relaxed">
                      <span class="text-[#D49B42] font-bold">•</span>
                      <span>${escapeHtml(tip)}</span>
                    </p>
                  `).join('')}
                </div>
              </div>
            ` : ''}

          </div>

          <!-- RIGHT COLUMN: Step-by-Step Cooking Steps & Safety Notes (7 cols) -->
          <div class="lg:col-span-7 space-y-6">
            
            <!-- Cooking Steps Card -->
            <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#D49B42]/35 shadow-sm space-y-5">
              <div class="border-b border-[#E8DEC8] pb-3 flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-bold uppercase tracking-wider text-[#C84C24] block">${isEn ? 'Culinary Workflow' : 'Urut-urutan Olah-olah'}</span>
                  <h3 class="font-editorial-serif text-lg font-bold text-[#120B07]">
                    ${t('aiCreator.stepsTitle')}
                  </h3>
                </div>
                <span class="text-xs text-[#5C3622]">
                  ${(recipe.steps || []).length} ${isEn ? 'steps' : 'tahap'}
                </span>
              </div>

              <!-- Steps List -->
              <div class="space-y-4 pt-1">
                ${(recipe.steps || []).map((step, idx) => `
                  <div class="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-2.5 text-xs hover:border-[#D49B42]/50 transition-colors">
                    <div class="flex items-center justify-between flex-wrap gap-2">
                      <div class="flex items-center gap-2">
                        <span class="w-6 h-6 rounded-full bg-[#120B07] text-[#D49B42] font-bold text-xs flex items-center justify-center font-mono">
                          ${step.stepNumber || idx + 1}
                        </span>
                        <strong class="text-[#120B07] font-bold font-editorial-serif text-sm sm:text-base">
                          ${escapeHtml(step.title)}
                        </strong>
                      </div>
                      <div class="flex items-center gap-2">
                        ${step.technique ? `
                          <span class="text-[10px] font-semibold text-[#C84C24] bg-[#FDF4EE] px-2.5 py-0.5 rounded-md border border-[#C84C24]/20">
                            ${escapeHtml(step.technique)}
                          </span>
                        ` : ''}
                        <span class="text-[10px] font-mono text-[#2E4D38] bg-white px-2.5 py-0.5 rounded-md border border-[#E8DEC8] font-bold">
                          ⏱️ ${step.durationMinutes || 10} ${isEn ? 'Min' : 'Menit'}
                        </span>
                      </div>
                    </div>
                    <p class="text-[#5C3622] leading-relaxed text-xs sm:text-sm pl-8">
                      ${escapeHtml(step.description)}
                    </p>
                    ${step.tip ? `
                      <div class="mt-2 ml-8 p-3 rounded-xl bg-white border border-[#D49B42]/30 text-[11px] text-[#2E4D38] flex items-start gap-2">
                        <span class="text-[#D49B42] font-bold">★</span>
                        <span><strong>${isEn ? 'Technique Tip:' : 'Pitedah Olah:'}</strong> ${escapeHtml(step.tip)}</span>
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Food Safety & Storage Notes Card -->
            ${recipe.safetyNotes ? `
              <div class="p-5 sm:p-6 rounded-3xl bg-[#FAF7F2] border border-[#D49B42]/35 space-y-2 text-xs">
                <div class="flex items-center gap-2 font-bold text-[#2E4D38]">
                  <span class="text-base">🌿</span>
                  <span class="font-editorial-serif text-sm">${t('aiCreator.safetyTitle')}</span>
                </div>
                <p class="text-[#5C3622] leading-relaxed">
                  ${escapeHtml(recipe.safetyNotes)}
                </p>
              </div>
            ` : ''}

          </div>

        </div>

        <!-- Bottom Action CTA -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#120B07] via-[#1E120A] to-[#120B07] border-2 border-[#D49B42]/45 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
          <div class="text-left space-y-1">
            <h4 class="font-editorial-serif text-lg sm:text-xl font-bold text-white">
              ${isEn ? 'Ready to craft another traditional dish?' : 'Kersa ngripta kreasi olahan tradisi sanesipun?'}
            </h4>
            <p class="text-xs text-[#FAF7F2]/80">
              ${isEn ? 'Return to the studio to explore new spices, methods, and flavors.' : 'Wangsul dhateng studio racik kagem njajaki rempah lan rasa enggal.'}
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
            <span>${t('aiCreator.backToStudioBtn')}</span>
          </button>
        </div>

      </article>

    </div>
  `;
}

export function initAiFoodCreatorInteractions() {
  const form = document.getElementById('ai-creator-form');
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';

  function showToast(msg) {
    toastMessage = msg;
    const banner = document.getElementById('live-toast-banner');
    if (banner) {
      const txt = banner.querySelector('.toast-text');
      if (txt) txt.textContent = msg;
      banner.classList.remove('hidden');
    } else {
      reRenderCurrentView();
    }
    setTimeout(() => {
      if (toastMessage === msg) {
        toastMessage = null;
        const b = document.getElementById('live-toast-banner');
        if (b) b.classList.add('hidden');
      }
    }, 3500);
  }

  // Dismiss Toast on Form
  const dismissToastBtn = document.getElementById('dismiss-toast-btn');
  if (dismissToastBtn) {
    dismissToastBtn.onclick = () => {
      toastMessage = null;
      const banner = document.getElementById('live-toast-banner');
      if (banner) banner.classList.add('hidden');
    };
  }

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
      if (nameError && e.target.value.trim().length > 0) {
        nameError = false;
        const errEl = document.getElementById('creator-name-error');
        if (errEl) errEl.classList.add('hidden');
        nameInput.classList.remove('border-rose-500', 'ring-2', 'ring-rose-300', 'bg-rose-50/30');
        nameInput.classList.add('border-[#E8DEC8]');
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
        reRenderCurrentView();
        const input = document.getElementById('creator-name-input');
        if (input) {
          input.focus();
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      if (formState.selectedIngredientIds.length < 5) {
        ingredientError = true;
        reRenderCurrentView();
        const chipsBox = document.getElementById('ingredient-chips-box');
        if (chipsBox) {
          chipsBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      nameError = false;
      ingredientError = false;
      isGenerating = true;
      reRenderCurrentView();
      window.scrollTo({ top: 150, behavior: 'smooth' });

      try {
        const recipe = await aiFoodCreatorService.generateRecipe({
          ...formState,
          outputLanguage: isEn ? 'en' : 'id'
        });
        currentGeneratedRecipe = recipe;
      } catch (err) {
        console.warn('Fallback to local synthesis:', err);
        currentGeneratedRecipe = aiFoodCreatorService._synthesizeLocalRecipe({
          ...formState,
          outputLanguage: isEn ? 'en' : 'id'
        });
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
      try {
        downloadRecipeBtn.disabled = true;
        downloadRecipeBtn.innerHTML = `<span>⏳</span><span>${isEn ? 'Preparing PDF...' : 'Menyiapkan PDF...'}</span>`;
        await aiFoodCreatorService.generateRecipePdf(currentGeneratedRecipe);
        showToast(isEn ? '✓ Recipe document PDF downloaded successfully!' : '✓ Dokumen resep (PDF) kasil ka-undhuh!');
      } catch (err) {
        console.error('PDF error:', err);
        showToast(isEn ? 'Failed to download recipe PDF.' : 'Gagal ngundhuh resep PDF.');
      } finally {
        downloadRecipeBtn.disabled = false;
        downloadRecipeBtn.innerHTML = `
          <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          <span>${t('aiCreator.downloadPdf') || (isEn ? 'Download Recipe (PDF)' : 'Unduh Resep (PDF)')}</span>
        `;
      }
    };
  }

  // Print Certificate Button
  const printRecipeBtn = document.getElementById('print-recipe-btn');
  if (printRecipeBtn) {
    printRecipeBtn.onclick = () => {
      window.print();
    };
  }

  // Copy Full Recipe Text Button
  const copyRecipeBtn = document.getElementById('copy-recipe-text-btn');
  if (copyRecipeBtn && currentGeneratedRecipe) {
    copyRecipeBtn.onclick = () => {
      const fullText = formatRecipeAsText(currentGeneratedRecipe, isEn);
      navigator.clipboard.writeText(fullText).then(() => {
        showToast(isEn ? '✓ Full recipe text copied to clipboard!' : '✓ Teks resep jangkep kasalin dhateng clipboard!');
      }).catch(() => {
        showToast(isEn ? '✓ Recipe text ready!' : '✓ Teks resep siap!');
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
      currentGeneratedRecipe = null;
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
