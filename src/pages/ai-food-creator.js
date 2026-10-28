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
 * - Searchable, categorized Central Javanese ingredient catalog with authentic photography
 * - Culinary calibration: traditional method, taste profile, spice warmth, free servings input (1-100), custom notes
 * - Empty template output view awaiting backend API integration (Laravel REST / Supabase)
 * - Raw JSON parameter payload inspector & copy action for backend engineers
 * - 100% reactive bilingual support (ID with Javanese touch & EN)
 */

let activeTab = 'all'; // 'all', 'protein', 'spice', 'vegetable'
let searchQuery = '';
let formState = {
  creatorName: '',
  creatorNickname: '',
  selectedIngredientIds: ['ayam-kampung', 'bawang-merah', 'bawang-putih', 'kemiri', 'serai', 'daun-salam', 'gula-jawa'],
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

export async function renderAiFoodCreatorPage() {
  const currentLang = i18n?.getLanguage ? i18n.getLanguage() : 'id';

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
        <div class="absolute inset-0 rounded-3xl bg-[#D49B42]/20 animate-ping"></div>
        <div class="w-24 h-24 rounded-3xl bg-[#120B07] border-2 border-[#D49B42] text-[#D49B42] flex items-center justify-center mx-auto shadow-2xl text-4xl">
          <svg class="w-12 h-12 text-[#D49B42] animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10"/>
          </svg>
        </div>
      </div>

      <div class="space-y-3">
        <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#D49B42]/50 text-xs font-bold text-[#C84C24] uppercase tracking-wider shadow-xs">
          <span>✨</span>
          <span>${isEn ? 'Culinary Synthesis in Progress' : 'Studio Sintesis Rasa LarasRasa'}</span>
        </span>
        <h2 class="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#120B07]">
          ${isEn ? 'Preparing Recipe Template & Binding Payload...' : 'Menyiapkan Template Resep & Meracik Parameter...'}
        </h2>
        <p class="text-xs sm:text-sm text-[#5C3622] max-w-md mx-auto leading-relaxed">
          ${isEn 
            ? 'Structuring recipe blueprint container, calculating portion ratios, and preparing payload schema for backend REST API.'
            : 'Menyusun struktur template resep, menghitung proporsi takaran porsi, dan menyiapkan skema payload untuk integrasi backend REST API.'}
        </p>
      </div>

      <div class="max-w-xs mx-auto pawon-glass p-4 rounded-2xl border border-[#D49B42]/35 text-xs text-[#5C3622] space-y-2 shadow-sm">
        <div class="flex items-center justify-between font-bold">
          <span>${isEn ? 'Template Structure Ready' : 'Struktur Template Siap'}</span>
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

  // Filter ingredients based on active category tab & search query
  let filteredIngredients = ALL_INGREDIENTS;
  if (activeTab === 'protein') {
    filteredIngredients = INGREDIENT_CATALOG.proteins;
  } else if (activeTab === 'spice') {
    filteredIngredients = INGREDIENT_CATALOG.spices;
  } else if (activeTab === 'vegetable') {
    filteredIngredients = INGREDIENT_CATALOG.vegetables;
  }

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
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#D49B42]/40 shadow-xs">
            <span class="w-2 h-2 rounded-full bg-[#C84C24] animate-ping"></span>
            <span class="text-xs font-bold text-[#D49B42] uppercase tracking-wider">
              ${isEn ? 'AI Culinary Studio • Central Java' : 'Studio Eksperimen Kuliner AI • Jawa Tengah'}
            </span>
          </div>
          
          <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            ${isEn ? 'Craft Your Authentic Javanese Recipe' : 'Racik Bumbu & Rancang Konsep Masakan Anda'}
          </h1>
          
          <p class="text-sm sm:text-base text-[#FAF7F2]/85 leading-relaxed">
            ${isEn
              ? 'Select authentic regional ingredients, calibrate traditional flavors, set your custom portions, and generate an official recipe template ready for backend integration.'
              : 'Pilih bahan rempah otentik Jawa Tengah, tentukan watek rasa tradisi, atur porsi santapan bebas, lan susun cithakan resep kosongan ingkang siap dipun-integrasikaken kaliyan backend.'}
          </p>
        </div>
      </div>

      <!-- Toast Feedback Message -->
      ${toastMessage ? `
        <div class="max-w-4xl mx-auto p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between shadow-xs">
          <div class="flex items-center gap-2 font-medium">
            <span>✓</span>
            <span>${toastMessage}</span>
          </div>
          <button type="button" id="dismiss-toast-btn" class="font-bold text-emerald-700 text-sm cursor-pointer">&times;</button>
        </div>
      ` : ''}

      <!-- Validation Error Banner -->
      ${validationMessage ? `
        <div class="max-w-4xl mx-auto p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-center justify-between shadow-xs animate-shake">
          <div class="flex items-center gap-2 font-semibold">
            <span class="text-base">⚠️</span>
            <span>${validationMessage}</span>
          </div>
          <button type="button" id="dismiss-val-btn" class="text-rose-600 hover:text-rose-900 font-bold ml-2 text-sm cursor-pointer">&times;</button>
        </div>
      ` : ''}

      <!-- Interactive Studio Form -->
      <form id="ai-creator-form" class="space-y-8 max-w-4xl mx-auto">
        
        <!-- SECTION 1: Creator Identity -->
        <section class="pawon-glass p-6 sm:p-8 rounded-3xl space-y-6 border border-[#D49B42]/35 shadow-xs">
          <div class="pb-4 border-b border-[#E8DEC8] flex items-center justify-between">
            <div>
              <span class="text-[11px] font-bold text-[#C84C24] uppercase tracking-wider">${t('aiCreator.step1Title')}</span>
              <h2 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#120B07]">
                ${isEn ? '1. Creator Attribution' : '1. Identitas Pencipta Resep'}
              </h2>
            </div>
            <span class="text-xs px-3 py-1 rounded-full bg-[#FAF7F2] text-[#C84C24] border border-[#D49B42]/40 font-bold">
              ${t('aiCreator.step1Required')}
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label for="creator-name-input" class="block text-xs font-bold text-[#120B07]">
                ${t('aiCreator.creatorNameLabel')} <span class="text-rose-600">*</span>
              </label>
              <input 
                type="text" 
                id="creator-name-input" 
                name="creatorName"
                value="${escapeHtml(formState.creatorName)}"
                placeholder="${isEn ? 'e.g., Hendra Mulyadi' : 'Contoh: Evan Hendra Mulyadi'}"
                required
                class="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#E8DEC8] focus:outline-hidden focus:ring-2 focus:ring-[#C84C24] text-sm text-[#120B07] transition-all shadow-inner"
              />
              <p class="text-[11px] text-[#5C3622]/80">
                ${isEn 
                  ? 'This name will be credited on the official recipe blueprint and backend payload.' 
                  : 'Nama ini dicantumkan pada template resep resmi dan parameter payload backend.'}
              </p>
            </div>

            <div class="space-y-1.5">
              <label for="creator-nickname-input" class="block text-xs font-bold text-[#120B07]">
                ${t('aiCreator.creatorNicknameLabel')}
              </label>
              <input 
                type="text" 
                id="creator-nickname-input" 
                name="creatorNickname"
                value="${escapeHtml(formState.creatorNickname)}"
                placeholder="${isEn ? 'e.g., Chef Hendra' : 'Contoh: Mas Hendra / Chef Evan'}"
                class="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#E8DEC8] focus:outline-hidden focus:ring-2 focus:ring-[#C84C24] text-sm text-[#120B07] transition-all shadow-inner"
              />
              <p class="text-[11px] text-[#5C3622]/80">
                ${isEn ? 'Appears in culinary narrative notes.' : 'Dicantumkan sebagai catatan personal pembuat.'}
              </p>
            </div>
          </div>
        </section>

        <!-- SECTION 2: Ingredient Selection -->
        <section class="pawon-glass p-6 sm:p-8 rounded-3xl space-y-6 border border-[#D49B42]/35 shadow-xs">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8DEC8]">
            <div class="space-y-0.5">
              <span class="text-[11px] font-bold text-[#C84C24] uppercase tracking-wider">${t('aiCreator.step2Title')}</span>
              <h2 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#120B07]">
                ${isEn ? '2. Select Regional Ingredients' : '2. Pilih Bahan & Rempah Otentik Jawa'}
              </h2>
            </div>
            
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold px-3 py-1 rounded-full ${selectedCount >= 1 ? 'bg-[#120B07] text-[#FAF7F2]' : 'bg-rose-100 text-rose-800'}">
                ${selectedCount} ${t('aiCreator.step2Count')}
              </span>
              ${selectedCount > 0 ? `
                <button type="button" id="clear-all-ingredients-btn" class="text-xs font-bold text-rose-600 hover:text-rose-800 underline cursor-pointer">
                  ${isEn ? 'Clear All' : 'Hapus Semua'}
                </button>
              ` : ''}
            </div>
          </div>

          <!-- Active Ingredients Chips Bar -->
          <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 space-y-2">
            <div class="text-[11px] font-bold text-[#5C3622] uppercase tracking-wider flex items-center justify-between">
              <span>${isEn ? 'Selected Ingredients for Synthesis:' : 'Bahan yang Siap Masuk ke Racikan:'}</span>
              <span class="text-[#2E4D38] font-bold">${selectedCount === 0 ? (isEn ? 'Select at least 1 ingredient' : 'Pilih minimal 1 bahan') : (isEn ? 'Ready for backend' : 'Siap')}</span>
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${selectedCount === 0 ? `
                <span class="text-xs italic text-[#5C3622]">
                  ${isEn ? 'No ingredients selected yet. Click any ingredient card below to add.' : 'Belum ada bahan yang dipilih. Klik kartu bahan atau rempah di bawah untuk menambahkan.'}
                </span>
              ` : formState.selectedIngredientIds.map(id => {
                const item = ALL_INGREDIENTS.find(i => i.id === id);
                if (!item) return '';
                return `
                  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D49B42]/45 text-xs font-bold text-[#120B07] shadow-2xs">
                    <img src="${item.image || `/assets/images/ingredients/${item.id}.jpg`}" alt="${item.nameId}" class="w-4 h-4 rounded-full object-cover" onerror="this.src='/assets/images/hero/hero-culinary.jpg'"/>
                    <span>${isEn ? (item.nameEn || item.nameId) : item.nameId}</span>
                    <button type="button" data-remove-ingredient="${item.id}" class="text-[#C84C24] hover:text-rose-700 font-bold ml-1 text-sm cursor-pointer">&times;</button>
                  </span>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Tabs & Search Bar -->
          <div class="flex flex-col md:flex-row gap-3 items-stretch justify-between">
            <div class="inline-flex p-1 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 overflow-x-auto text-xs font-bold text-[#5C3622]">
              <button type="button" data-tab="all" class="px-4 py-2 rounded-xl transition-all cursor-pointer ${activeTab === 'all' ? 'bg-[#120B07] text-[#FAF7F2] shadow-xs' : 'hover:text-[#C84C24]'}">
                ${isEn ? 'All Ingredients' : 'Semua Bahan'}
              </button>
              <button type="button" data-tab="protein" class="px-4 py-2 rounded-xl transition-all cursor-pointer ${activeTab === 'protein' ? 'bg-[#120B07] text-[#FAF7F2] shadow-xs' : 'hover:text-[#C84C24]'}">
                🥩 ${isEn ? 'Proteins' : 'Protein & Pokok'}
              </button>
              <button type="button" data-tab="spice" class="px-4 py-2 rounded-xl transition-all cursor-pointer ${activeTab === 'spice' ? 'bg-[#120B07] text-[#FAF7F2] shadow-xs' : 'hover:text-[#C84C24]'}">
                🌿 ${isEn ? 'Aromatic Spices' : 'Rempah Aromatik'}
              </button>
              <button type="button" data-tab="vegetable" class="px-4 py-2 rounded-xl transition-all cursor-pointer ${activeTab === 'vegetable' ? 'bg-[#120B07] text-[#FAF7F2] shadow-xs' : 'hover:text-[#C84C24]'}">
                🥬 ${isEn ? 'Vegetables' : 'Sayur & Pelengkap'}
              </button>
            </div>

            <!-- Instant Search Input -->
            <div class="relative w-full md:w-64">
              <input 
                type="text" 
                id="ingredient-search-input" 
                placeholder="${isEn ? 'Search ingredients...' : 'Cari bahan atau rempah...'}" 
                value="${escapeHtml(searchQuery)}"
                class="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#E8DEC8] text-xs text-[#120B07] focus:outline-hidden focus:ring-2 focus:ring-[#C84C24] shadow-inner"
              />
              <svg class="w-4 h-4 text-[#C84C24] absolute left-3.5 top-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </div>
          </div>

          <!-- Ingredients Grid with Authentic Macro Photos -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 max-h-[32rem] overflow-y-auto p-1.5 custom-scrollbar">
            ${filteredIngredients.map(item => {
              const isSelected = formState.selectedIngredientIds.includes(item.id);
              const imgSrc = item.image || `/assets/images/ingredients/${item.id}.jpg`;
              return `
                <button 
                  type="button" 
                  data-ingredient-id="${item.id}"
                  class="group relative text-left p-3 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer card-hover-lift ${
                    isSelected 
                      ? 'bg-[#120B07] text-white border-[#C84C24] ring-2 ring-[#C84C24] shadow-md' 
                      : 'bg-white hover:bg-[#FAF7F2] text-[#120B07] border-[#E8DEC8] hover:border-[#D49B42]'
                  }"
                >
                  <div class="relative w-full aspect-square rounded-xl overflow-hidden mb-2 bg-[#FAF7F2] border border-[#E8DEC8]">
                    <img 
                      src="${imgSrc}" 
                      alt="${item.nameId}" 
                      class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                      loading="lazy"
                      onerror="this.src='/assets/images/hero/hero-culinary.jpg'"
                    />
                    <span class="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isSelected ? 'bg-[#C84C24] text-white shadow-xs' : 'bg-black/50 text-white backdrop-blur-xs'
                    }">
                      ${isSelected ? '✓' : '+'}
                    </span>
                  </div>

                  <div class="space-y-0.5">
                    <span class="text-[10px] font-mono uppercase tracking-wider block font-bold ${isSelected ? 'text-[#D49B42]' : 'text-[#2E4D38]'}">
                      ${item.category}
                    </span>
                    <strong class="text-xs font-bold block line-clamp-1 leading-snug">
                      ${isEn ? (item.nameEn || item.nameId) : item.nameId}
                    </strong>
                    <span class="text-[10px] block line-clamp-1 ${isSelected ? 'text-white/80' : 'text-[#5C3622]/80'}">
                      ${item.flavorNote || ''}
                    </span>
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </section>

        <!-- SECTION 3: Culinary Calibration & Portions -->
        <section class="pawon-glass p-6 sm:p-8 rounded-3xl space-y-6 border border-[#D49B42]/35 shadow-xs">
          <div class="pb-4 border-b border-[#E8DEC8]">
            <span class="text-[11px] font-bold text-[#C84C24] uppercase tracking-wider">${t('aiCreator.step3Title')}</span>
            <h2 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#120B07]">
              ${isEn ? '3. Culinary Calibration & Portions' : '3. Kalibrasi Watak Rasa & Porsi'}
            </h2>
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
                      ${m.descId}
                    </p>
                  </label>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Taste Profile & Spice Level -->
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
            </div>

            <!-- Spice Level -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-[#120B07] uppercase tracking-wider">
                ${isEn ? 'Spice Warmth Level' : 'Tingkat Kehangatan Lombok'}
              </label>
              <div class="grid grid-cols-4 gap-2">
                ${PREFERENCE_OPTIONS.spiceLevels.map(sl => {
                  const isSelected = formState.spiceLevel === sl.id;
                  return `
                    <label class="p-3 rounded-2xl border text-center text-xs font-bold cursor-pointer transition-all card-hover-lift ${
                      isSelected 
                        ? 'bg-[#C84C24] text-white border-[#C84C24] shadow-xs' 
                        : 'bg-white text-[#120B07] border-[#E8DEC8]'
                    }">
                      <input type="radio" name="spiceLevel" value="${sl.id}" ${isSelected ? 'checked' : ''} class="sr-only"/>
                      <div class="text-base">${sl.icon}</div>
                      <div class="text-[10px] font-bold mt-1">Lvl ${sl.id}</div>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- FREE NUMERIC SERVINGS INPUT & CUSTOM NOTES -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <!-- Fixed Standard 4 People Servings Info (No Configuration Needed) -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="block text-xs font-bold text-[#120B07] uppercase tracking-wider">
                  ${isEn ? 'Servings Scale (Fixed)' : 'Porsi Santapan (Standar Otomatis)'}
                </span>
                <span class="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ${isEn ? '✓ 4 People (Family Scale)' : '✓ 4 Orang (Standar Keluarga)'}
                </span>
              </div>

              <div class="p-4 rounded-2xl border border-[#D49B42]/35 bg-white flex items-center gap-3.5 shadow-2xs">
                <div class="w-10 h-10 rounded-xl bg-[#1E120A] text-[#D49B42] flex items-center justify-center shrink-0 font-bold text-base">
                  👥
                </div>
                <div>
                  <strong class="text-sm text-[#120B07] font-bold block">${isEn ? '4 People (Family Standard)' : '4 Orang (Standar Santap Keluarga)'}</strong>
                  <span class="text-xs text-[#5C3622] leading-tight block mt-0.5">
                    ${isEn 
                      ? 'Ingredient measurements and spice ratios are calibrated automatically for 4 people.' 
                      : 'Komposisi bumbu dan takaran bahan otomatis diselaraskan secara pas untuk santap 4 orang.'}
                  </span>
                </div>
              </div>
            </div>

            <!-- Custom Notes -->
            <div class="space-y-2">
              <label for="custom-notes-input" class="block text-xs font-bold text-[#120B07] uppercase tracking-wider">
                ${isEn ? 'Culinary Vision / Special Notes' : 'Catatan Selera Tambahan'}
              </label>
              <input 
                type="text" 
                id="custom-notes-input" 
                name="customNotes"
                value="${escapeHtml(formState.customNotes)}"
                placeholder="${isEn ? 'e.g., Rich coconut milk with subtle lime fragrance...' : 'Contoh: Kuah areh gurih lembut beraroma daun jeruk...'}"
                class="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#E8DEC8] text-xs text-[#120B07] focus:ring-2 focus:ring-[#C84C24] shadow-inner"
              />
              <p class="text-[11px] text-[#5C3622]/80">
                ${isEn ? 'Personal preference or touch for the backend AI prompt.' : 'Sentuhan pribadi yang akan diteruskan ke payload backend.'}
              </p>
            </div>
          </div>
        </section>

        <!-- CTA Action Bar -->
        <div class="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#120B07] via-[#1E120A] to-[#120B07] border-2 border-[#D49B42]/45 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-5">
          <div class="text-left space-y-1.5">
            <h3 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#FAF7F2]">
              ${isEn ? 'Ready to formulate recipe blueprint?' : 'Siap meracik cetak biru resep orisinal Anda?'}
            </h3>
            <p class="text-xs text-[#FAF7F2]/80 max-w-lg">
              ${isEn 
                ? 'Your parameters will generate an official empty blueprint template ready to be bound with the backend API.' 
                : 'Parameter pilihan panjenengan badhe nyusun template kosongan resmi ingkang siap disambungaken kaliyan backend API.'}
            </p>
          </div>

          <button 
            type="submit" 
            id="generate-recipe-submit-btn"
            class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C84C24] hover:bg-[#AE3E1B] text-[#FAF7F2] font-bold text-sm tracking-wide transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center justify-center gap-2.5 shrink-0 cursor-pointer border border-[#E05A30]"
          >
            <span>✨</span>
            <span>${isEn ? 'Generate Recipe Template' : 'Hasilkan Template Resep'}</span>
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
 * Output Template View: STRICTLY EMPTY TEMPLATE AS REQUESTED BY USER
 * "untuk ai food creator outuputnya ksoongan aja template itu nnti dr back end"
 */
function renderResultView(recipe, currentLang) {
  const isEn = currentLang === 'en';
  const creationId = recipe.id || `REC-${Date.now().toString().slice(-6)}`;
  const creationDate = new Date().toLocaleDateString(isEn ? 'en-US' : 'id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const payloadString = JSON.stringify({
    recipeId: creationId,
    creatorName: formState.creatorName,
    creatorNickname: formState.creatorNickname || null,
    targetServings: formState.servings,
    cookingMethod: formState.cookingMethod,
    tasteProfile: formState.tasteProfile,
    spiceLevel: formState.spiceLevel,
    selectedIngredientIds: formState.selectedIngredientIds,
    customNotes: formState.customNotes || null,
    outputLanguage: currentLang
  }, null, 2);

  return `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      <!-- Top Navigation & Integration Status Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D49B42]/30">
        <div class="space-y-1.5">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold shadow-2xs">
              ✦ ${t('aiCreator.emptyTemplateBadge')}
            </span>
            <span class="text-[11px] font-mono uppercase tracking-wider text-[#2E4D38] bg-[#FAF7F2] px-3 py-1 rounded-md border border-[#D49B42]/30 font-bold">
              ID: ${creationId}
            </span>
          </div>
          <h1 class="font-editorial-serif text-2xl sm:text-4xl font-bold text-[#120B07]">
            ${t('aiCreator.emptyTemplateHeading')}
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
            <span>←</span>
            <span>${t('aiCreator.backToStudioBtn')}</span>
          </button>
        </div>
      </div>

      <!-- Live Toast Feedback Notification -->
      <div id="live-toast-banner" class="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between shadow-xs ${toastMessage ? '' : 'hidden'}">
        <div class="flex items-center gap-2 font-bold">
          <span class="text-base">✓</span>
          <span class="toast-text">${toastMessage || ''}</span>
        </div>
        <button type="button" id="dismiss-toast-btn" class="font-bold text-emerald-700 text-sm cursor-pointer hover:text-emerald-950">&times;</button>
      </div>

      <!-- Developer Integration Notice Banner -->
      <div class="p-5 sm:p-6 rounded-3xl bg-amber-50/80 border-2 border-[#D49B42]/40 text-[#120B07] space-y-2 shadow-xs">
        <div class="flex items-center gap-2 font-bold text-sm text-[#C84C24]">
          <span class="text-lg">ℹ️</span>
          <span>${t('aiCreator.apiReadyBadge')}</span>
        </div>
        <p class="text-xs leading-relaxed text-[#5C3622]">
          ${t('aiCreator.emptyTemplateNotice')}
        </p>
      </div>

      <!-- Main Two-Column Layout (Left: Empty Visual Area & Payload | Right: Empty Recipe Blueprint Slots) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- LEFT COLUMN: Empty Generative Frame & Parameter Payload (5 cols) -->
        <div class="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          <!-- Visual Container -->
          <div class="bg-white p-6 rounded-3xl border border-[#D49B42]/35 shadow-lg space-y-4">
            <div class="flex items-center justify-between text-xs font-bold text-[#120B07] px-1">
              <span class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#C84C24]"></span>
                <span>${t('aiCreator.emptyVisualTitle')}</span>
              </span>
              <span class="text-[10px] text-[#2E4D38] uppercase font-mono px-2.5 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E8DEC8] font-bold">
                1:1 Aspect
              </span>
            </div>

            <!-- EMPTY GENERATIVE VISUAL AREA - PRECISELY AN EMPTY TEMPLATE READY FOR BACKEND IMAGE -->
            <div class="relative w-full aspect-square rounded-2xl bg-gradient-to-br from-[#120B07] to-[#1E120A] border-2 border-dashed border-[#D49B42]/50 shadow-xl overflow-hidden flex flex-col items-center justify-center p-6 text-center text-[#FAF7F2]">
              <div class="w-16 h-16 rounded-3xl bg-white/10 border border-[#D49B42]/40 flex items-center justify-center mb-3 text-2xl shadow-inner">
                <svg class="w-8 h-8 text-[#D49B42] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
              <h4 class="font-editorial-serif text-base font-bold text-[#D49B42]">
                ${isEn ? '[Generative Image Frame]' : '[Bingkai Foto Hasil Sintesis AI]'}
              </h4>
              <p class="text-[11px] text-[#FAF7F2]/75 max-w-xs mt-1.5 leading-relaxed">
                ${t('aiCreator.emptyVisualDesc')}
              </p>
              <div class="mt-4 px-3 py-1 rounded-full bg-white/10 border border-[#D49B42]/30 text-[10px] font-mono text-[#FAF7F2]/90">
                POST /api/ai/food-creator/generate-image
              </div>
            </div>

            <!-- Creator & Form Parameters Summary -->
            <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-[#120B07] flex items-center gap-1.5">
                  <span class="text-[#D49B42]">✦</span>
                  <span>${isEn ? 'Attribution & Portions' : 'Hak Cipta & Takaran'}</span>
                </span>
                <span class="text-[10px] font-mono text-[#C84C24] font-bold">
                  ${creationId}
                </span>
              </div>
              
              <div class="space-y-1 text-xs text-[#5C3622]">
                <p><strong>${isEn ? 'Creator:' : 'Pencipta:'}</strong> ${escapeHtml(formState.creatorName || (isEn ? 'Anonymous' : 'Anonim'))}</p>
                ${formState.creatorNickname ? `<p><strong>${isEn ? 'Title:' : 'Gelar:'}</strong> ${escapeHtml(formState.creatorNickname)}</p>` : ''}
                <p><strong>${isEn ? 'Servings:' : 'Porsi:'}</strong> ${formState.servings || 4} ${isEn ? 'People (Standard)' : 'Orang (Standar Kebutuhan)'}</p>
                <p><strong>${isEn ? 'Method:' : 'Metode:'}</strong> ${escapeHtml(formState.cookingMethod)}</p>
                <p><strong>${isEn ? 'Spice Warmth:' : 'Kepedasan:'}</strong> Level ${formState.spiceLevel}</p>
                <p><strong>${isEn ? 'Ingredients Count:' : 'Jumlah Bahan:'}</strong> ${formState.selectedIngredientIds.length} bahan</p>
              </div>
            </div>

            <!-- Backend JSON Payload Inspector -->
            <div class="p-4 rounded-2xl bg-[#120B07] border border-[#D49B42]/40 text-[#FAF7F2] space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold text-[#D49B42] font-mono">
                  ${t('aiCreator.apiPayloadTitle')}
                </span>
                <button 
                  type="button" 
                  id="copy-payload-btn"
                  class="text-[10px] font-bold text-[#C84C24] hover:text-[#FAF7F2] transition-colors cursor-pointer underline"
                >
                  ${t('aiCreator.copyPayloadBtn')}
                </button>
              </div>
              <pre class="text-[10px] font-mono text-[#FAF7F2]/80 max-h-40 overflow-y-auto custom-scrollbar p-2 rounded-xl bg-black/50 border border-white/10 leading-tight">${escapeHtml(payloadString)}</pre>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-2 pt-1">
              <button 
                type="button" 
                id="bottom-create-another-btn"
                class="w-full py-3.5 px-4 rounded-2xl bg-[#C84C24] hover:bg-[#AE3E1B] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#E05A30]"
              >
                <span>←</span>
                <span>${t('aiCreator.backToStudioBtn')}</span>
              </button>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN: EMPTY RECIPE BLUEPRINT SLOTS (7 cols) -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- Slot 1: Recipe Identity & Narrative Wireframe -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#D49B42]/35 shadow-sm space-y-5">
            <div class="space-y-2.5">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#C84C24] bg-[#FDF4EE] px-3 py-1 rounded-full border border-[#C84C24]/20">
                  ${t('aiCreator.emptyTitlePlaceholder')}
                </span>
                <span class="text-[11px] text-[#2E4D38] font-bold">
                  ${isEn ? 'Awaiting Backend API' : 'Ngentosi Respon Backend'}
                </span>
              </div>
              
              <h2 class="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#120B07] italic">
                ${t('aiCreator.emptyTitlePlaceholder')}
              </h2>
              
              <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-dashed border-[#D49B42]/40 text-xs text-[#5C3622] leading-relaxed">
                ${t('aiCreator.emptyDescPlaceholder')}
              </div>
            </div>

            <!-- Metrics Wireframe Badges -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#E8DEC8] text-xs">
              <div class="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8]/80 text-center space-y-1">
                <span class="text-[#2E4D38] block text-[10px] font-bold uppercase tracking-wider">
                  ${isEn ? 'Total Time' : 'Wektu Olah'}
                </span>
                <strong class="text-[#120B07] font-bold text-sm block">[-- Menit]</strong>
              </div>
              <div class="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8]/80 text-center space-y-1">
                <span class="text-[#2E4D38] block text-[10px] font-bold uppercase tracking-wider">
                  ${isEn ? 'Servings' : 'Porsi'}
                </span>
                <strong class="text-[#120B07] font-bold text-sm block">${formState.servings || 4} ${isEn ? 'People' : 'Orang'}</strong>
              </div>
              <div class="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8]/80 text-center space-y-1">
                <span class="text-[#2E4D38] block text-[10px] font-bold uppercase tracking-wider">
                  ${isEn ? 'Difficulty' : 'Tingkat'}
                </span>
                <strong class="text-[#120B07] font-bold text-sm block">[--]</strong>
              </div>
              <div class="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8]/80 text-center space-y-1">
                <span class="text-[#2E4D38] block text-[10px] font-bold uppercase tracking-wider">
                  ${isEn ? 'Est. Budget' : 'Prakiran Biaya'}
                </span>
                <strong class="text-[#C84C24] font-bold text-sm block">[Rp --]</strong>
              </div>
            </div>
          </div>

          <!-- Slot 2: Scaled Ingredients Wireframe Slots -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#D49B42]/35 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-[#E8DEC8] pb-3">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-[#C84C24] block">${isEn ? 'Recipe Ingredients Slot' : 'Slot Reroncen Bahan & Bumbu'}</span>
                <h3 class="font-editorial-serif text-lg font-bold text-[#120B07]">
                  ${t('aiCreator.emptyIngredientsPlaceholder')}
                </h3>
              </div>
              <span class="text-xs px-2.5 py-1 rounded-lg bg-[#FAF7F2] text-[#2E4D38] font-bold border border-[#D49B42]/30">
                ${formState.servings || 4} ${isEn ? 'people scale' : 'orang'}
              </span>
            </div>

            <!-- Wireframe Skeleton Rows -->
            <div class="space-y-2.5 pt-1">
              ${[1, 2, 3, 4, 5].map(idx => `
                <div class="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF7F2] border border-dashed border-[#D49B42]/35 text-xs text-[#5C3622]">
                  <div class="flex items-center gap-2.5">
                    <span class="w-2 h-2 rounded-full bg-[#D49B42]"></span>
                    <span>${isEn ? `[Ingredient ${idx} — Gram measurement calculated by backend]` : `[Bahan ${idx} — Takaran gramasi presisi saking backend]`}</span>
                  </div>
                  <span class="font-mono text-[11px] font-bold text-[#120B07] bg-white px-2.5 py-1 rounded-lg border border-[#E8DEC8]">
                    [-- gr/sdm]
                  </span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Slot 3: Step-by-Step Cooking Steps Wireframe Slots -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#D49B42]/35 shadow-sm space-y-4">
            <div class="border-b border-[#E8DEC8] pb-3">
              <span class="text-[10px] font-bold uppercase tracking-wider text-[#C84C24] block">${isEn ? 'Cooking Steps Slot' : 'Slot Urut-urutan Olah-olah'}</span>
              <h3 class="font-editorial-serif text-lg font-bold text-[#120B07]">
                ${t('aiCreator.emptyStepsPlaceholder')}
              </h3>
            </div>

            <!-- Step Wireframe Cards -->
            <div class="space-y-3 pt-1">
              ${[1, 2, 3, 4].map(sNum => `
                <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-dashed border-[#D49B42]/35 space-y-1.5 text-xs">
                  <div class="flex items-center justify-between">
                    <strong class="text-[#120B07] font-bold font-editorial-serif text-sm">
                      ${isEn ? `Step ${sNum}: [Instruction Title from Backend]` : `Langkah ${sNum}: [Judul Tahapan Masak saking Backend]`}
                    </strong>
                    <span class="text-[10px] font-mono text-[#2E4D38] bg-white px-2 py-0.5 rounded-md border border-[#E8DEC8]">
                      [-- Min]
                    </span>
                  </div>
                  <p class="text-[#5C3622] leading-relaxed">
                    ${isEn 
                      ? `[Detailed procedural cooking instruction and chef notes will be returned by the backend API]` 
                      : `[Pituduh cara olah-olah jangkep lan wektu masak badhe katampi saking respon backend API]`}
                  </p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Slot 4: Chef Secret & Nutrition Estimations Wireframe -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-5 rounded-3xl bg-[#FAF7F2] border border-dashed border-[#D49B42]/35 space-y-2 text-xs">
              <strong class="text-[#120B07] font-bold flex items-center gap-1.5">
                <span class="text-[#C84C24]">✦</span>
                <span>${isEn ? 'Chef Tips Slot' : 'Slot Wewadi Pawon (Kiat Chef)'}</span>
              </strong>
              <p class="text-[#5C3622] leading-relaxed">
                ${t('aiCreator.emptyTipsPlaceholder')}
              </p>
            </div>

            <div class="p-5 rounded-3xl bg-[#FAF7F2] border border-dashed border-[#D49B42]/35 space-y-2 text-xs">
              <strong class="text-[#120B07] font-bold flex items-center gap-1.5">
                <span class="text-[#2E4D38]">✦</span>
                <span>${isEn ? 'Nutrition Estimates Slot' : 'Slot Estimasi Gizi & Nutrisi'}</span>
              </strong>
              <p class="text-[#5C3622] leading-relaxed">
                ${isEn 
                  ? '[Nutritional calculation per serving will be generated by backend]' 
                  : '[Kalkulasi kalori, protein, lan karbohidrat badhe kapetung dening backend]'}
              </p>
            </div>
          </div>

        </div>

      </div>

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
    }
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

  // Dismiss Validation
  const dismissValBtn = document.getElementById('dismiss-val-btn');
  if (dismissValBtn) {
    dismissValBtn.onclick = () => {
      validationMessage = null;
      reRenderCurrentView();
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
        formState.selectedIngredientIds = formState.selectedIngredientIds.filter(i => i !== id);
      } else {
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
      formState.selectedIngredientIds = formState.selectedIngredientIds.filter(i => i !== id);
      reRenderCurrentView();
    };
  });

  // Clear All Ingredients
  const clearAllBtn = document.getElementById('clear-all-ingredients-btn');
  if (clearAllBtn) {
    clearAllBtn.onclick = () => {
      formState.selectedIngredientIds = [];
      reRenderCurrentView();
    };
  }

  // Creator inputs binding
  const nameInput = document.getElementById('creator-name-input');
  if (nameInput) {
    nameInput.oninput = (e) => {
      formState.creatorName = e.target.value;
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

  // Standard Servings (Fixed 4 People)
  formState.servings = 4;

  // Form Submit: Render Empty Template Output
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();

      if (!formState.creatorName.trim()) {
        validationMessage = isEn 
          ? 'Please provide your Creator Full Name before formulating the blueprint.' 
          : 'Mangga isi Asma Lengkap Pencipta saderengipun nyusun cithakan resep.';
        reRenderCurrentView();
        window.scrollTo({ top: 300, behavior: 'smooth' });
        return;
      }

      if (formState.selectedIngredientIds.length === 0) {
        validationMessage = isEn 
          ? 'Please select at least 1 ingredient or spice.' 
          : 'Mangga pilih paling mboten 1 bahan utawi rempah.';
        reRenderCurrentView();
        window.scrollTo({ top: 400, behavior: 'smooth' });
        return;
      }

      validationMessage = null;
      isGenerating = true;
      reRenderCurrentView();
      window.scrollTo({ top: 150, behavior: 'smooth' });

      // Synthesis state delay (800ms) to simulate preparation of the template blueprint
      setTimeout(() => {
        isGenerating = false;
        currentGeneratedRecipe = {
          id: `REC-${Date.now().toString().slice(-6)}`,
          title: `[Blueprint Resep: ${formState.creatorName}]`,
          creatorName: formState.creatorName,
          servings: formState.servings,
          cookingMethod: formState.cookingMethod,
          tasteProfile: formState.tasteProfile,
          spiceLevel: formState.spiceLevel
        };
        reRenderCurrentView();
        window.scrollTo({ top: 100, behavior: 'smooth' });
      }, 750);
    };
  }

  // Copy JSON Payload
  const copyPayloadBtn = document.getElementById('copy-payload-btn');
  if (copyPayloadBtn) {
    copyPayloadBtn.onclick = () => {
      const payloadString = JSON.stringify({
        recipeId: currentGeneratedRecipe?.id || `REC-${Date.now().toString().slice(-6)}`,
        creatorName: formState.creatorName,
        creatorNickname: formState.creatorNickname || null,
        targetServings: formState.servings,
        cookingMethod: formState.cookingMethod,
        tasteProfile: formState.tasteProfile,
        spiceLevel: formState.spiceLevel,
        selectedIngredientIds: formState.selectedIngredientIds,
        customNotes: formState.customNotes || null,
        outputLanguage: isEn ? 'en' : 'id'
      }, null, 2);

      navigator.clipboard.writeText(payloadString).then(() => {
        showToast(isEn ? '✓ JSON payload parameters copied!' : '✓ Parameter payload JSON kasalin!');
      }).catch(() => {
        showToast(isEn ? '✓ Payload ready!' : '✓ Payload siap!');
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
