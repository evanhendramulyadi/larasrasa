import { 
  aiFoodCreatorService, 
  INGREDIENT_CATALOG, 
  ALL_INGREDIENTS, 
  PREFERENCE_OPTIONS 
} from '../services/aiFoodCreatorService.js';
import { i18n, t } from '../i18n/index.js';

/**
 * LarasRasa AI Food Creator Page
 * 
 * Interactive Culinary Studio:
 * - Creator identity input with real-time feedback
 * - Searchable, categorized authentic Central Javanese ingredient selection with real photographs
 * - Culinary preferences: method, category, taste profile, spice level, free servings input (1-100), equipment, notes
 * - High-DPI HTML5 Canvas poster composer
 * - 100% Functional download actions: PNG, JPEG, PDF Recipe Document, and A4 Creator Certificate
 * - Zero external backend dependencies or database placeholders (Pure polished frontend)
 */

// Transient Page State
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
        <div class="absolute inset-0 rounded-3xl bg-[#C49A58]/20 animate-ping"></div>
        <div class="w-24 h-24 rounded-3xl bg-[#24140D] border-2 border-[#C49A58] text-[#C49A58] flex items-center justify-center mx-auto shadow-2xl text-4xl">
          <svg class="w-12 h-12 text-[#C49A58] animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10"/>
          </svg>
        </div>
      </div>

      <div class="space-y-3">
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF6EF] border border-[#C49A58]/40 text-xs font-bold text-[#B85C38] uppercase tracking-wider shadow-2xs">
          <span>✨</span>
          <span>${isEn ? 'Culinary Synthesis in Progress' : 'Studio Sintesis Rasa LarasRasa'}</span>
        </span>
        <h2 class="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#24140D]">
          ${isEn ? 'Harmonizing Your Original Recipe...' : 'Menyelaraskan Bumbu & Meracik Resep...'}
        </h2>
        <p class="text-xs sm:text-sm text-[#523424] max-w-md mx-auto leading-relaxed">
          ${isEn 
            ? 'Analyzing traditional spice ratios, calculating exact gram measurements for your servings, and preparing high-DPI canvas visuals.'
            : 'Menganalisis keseimbangan rempah, menakar gramasi takaran bahan, dan menyusun template resep resmi untuk kreasi Anda.'}
        </p>
      </div>

      <div class="max-w-xs mx-auto pawon-glass p-4 rounded-2xl border border-[#C49A58]/35 text-xs text-[#523424] space-y-2 shadow-sm">
        <div class="flex items-center justify-between font-bold">
          <span>${isEn ? 'Balancing Palate Spectrum' : 'Penyelarasan Spektrum Bumbu'}</span>
          <span class="text-[#B85C38] font-mono">100%</span>
        </div>
        <div class="w-full bg-[#FAF6EF] h-2.5 rounded-full overflow-hidden border border-[#E5D9C5]">
          <div class="bg-gradient-to-r from-[#C49A58] via-[#B85C38] to-[#656C42] h-full rounded-full animate-pulse" style="width: 100%"></div>
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

  // Filter ingredients based on tab & search query
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
      
      <!-- Studio Header with Traditional Javanese Ambient Motif -->
      <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto border border-[#C49A58]/35 shadow-xl bg-gradient-to-br from-[#24140D] via-[#351C12] to-[#1A0F0A] text-[#FAF6EF]">
        <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#C49A58]/10 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#B85C38]/15 blur-3xl pointer-events-none"></div>
        <div class="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#FAF6EF_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        
        <div class="relative z-10 space-y-3 max-w-2xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EF]/10 border border-[#C49A58]/40 shadow-xs">
            <span class="w-2 h-2 rounded-full bg-[#B85C38] animate-ping"></span>
            <span class="text-xs font-bold text-[#C49A58] uppercase tracking-wider">
              ${isEn ? 'AI Culinary Studio • Central Java' : 'Studio Eksperimen Kuliner AI • Jawa Tengah'}
            </span>
          </div>
          <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            ${isEn ? 'Craft Your Authentic Javanese Recipe' : 'Ciptakan Resep & Komposisi Bumbu Anda'}
          </h1>
          <p class="text-sm sm:text-base text-[#FAF6EF]/85 leading-relaxed">
            ${isEn
              ? 'Select authentic regional ingredients, calibrate traditional flavors, set your custom portions, and generate an official recipe template complete with poster and certificates.'
              : 'Pilih bahan & rempah otentik Jawa Tengah, atur karakter rasa khas pawon tradisional, tentukan porsi bebas sesuai selera, dan hasilkan blueprint resep siap masak beserta poster kanvas resmi.'}
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
        <div class="max-w-4xl mx-auto p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between shadow-xs animate-shake">
          <div class="flex items-center gap-2 font-medium">
            <span class="text-base">⚠️</span>
            <span>${validationMessage}</span>
          </div>
          <button type="button" id="dismiss-val-btn" class="text-rose-600 hover:text-rose-900 font-bold ml-2 text-sm cursor-pointer">&times;</button>
        </div>
      ` : ''}

      <!-- Interactive Studio Form -->
      <form id="ai-creator-form" class="space-y-8 max-w-4xl mx-auto">
        
        <!-- SECTION 1: Creator Identity -->
        <section class="pawon-glass p-6 sm:p-8 rounded-3xl space-y-6">
          <div class="pb-4 border-b border-[#E5D9C5] flex items-center justify-between">
            <div>
              <span class="text-[11px] font-bold text-[#B85C38] uppercase tracking-wider">${isEn ? 'Step 1 • Recipe Attribution' : 'Langkah 1 • Hak Cipta Resep'}</span>
              <h2 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#24140D]">
                ${isEn ? '1. Creator Attribution' : '1. Identitas Pencipta Resep'}
              </h2>
            </div>
            <span class="text-xs px-2.5 py-1 rounded-full bg-[#FAF6EF] text-[#B85C38] border border-[#C49A58]/30 font-semibold">
              ${isEn ? 'Required' : 'Wajib Diisi'}
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label for="creator-name-input" class="block text-xs font-bold text-[#24140D]">
                ${isEn ? 'Creator Full Name' : 'Nama Lengkap Pencipta'} <span class="text-rose-600">*</span>
              </label>
              <input 
                type="text" 
                id="creator-name-input" 
                name="creatorName"
                value="${escapeHtml(formState.creatorName)}"
                placeholder="${isEn ? 'e.g., Hendra Mulyadi' : 'Contoh: Evan Hendra Mulyadi'}"
                required
                class="w-full px-4 py-3 rounded-xl bg-white border border-[#E5D9C5] focus:outline-hidden focus:ring-2 focus:ring-[#B85C38] text-sm text-[#24140D] transition-all"
              />
              <p class="text-[11px] text-[#523424]/80">
                ${isEn 
                  ? 'This name will be credited on the official recipe document and creator certificate.' 
                  : 'Nama ini dicantumkan pada poster kreasi resmi dan piagam apresiasi pencipta resep.'}
              </p>
            </div>

            <div class="space-y-1.5">
              <label for="creator-nickname-input" class="block text-xs font-bold text-[#24140D]">
                ${isEn ? 'Culinary Title / Nickname (Optional)' : 'Gelar Dapur / Nama Panggilan (Opsional)'}
              </label>
              <input 
                type="text" 
                id="creator-nickname-input" 
                name="creatorNickname"
                value="${escapeHtml(formState.creatorNickname)}"
                placeholder="${isEn ? 'e.g., Chef Evan' : 'Contoh: Mas Hendra / Chef Evan'}"
                class="w-full px-4 py-3 rounded-xl bg-white border border-[#E5D9C5] focus:outline-hidden focus:ring-2 focus:ring-[#B85C38] text-sm text-[#24140D] transition-all"
              />
              <p class="text-[11px] text-[#523424]/80">
                ${isEn ? 'Appears in culinary narrative notes.' : 'Dicantumkan sebagai catatan personal di resep.'}
              </p>
            </div>
          </div>
        </section>

        <!-- SECTION 2: Ingredient Selection -->
        <section class="pawon-glass p-6 sm:p-8 rounded-3xl space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5D9C5]">
            <div class="space-y-0.5">
              <span class="text-[11px] font-bold text-[#B85C38] uppercase tracking-wider">${isEn ? 'Step 2 • Regional Ingredients' : 'Langkah 2 • Ramuan Rempah & Bahan'}</span>
              <h2 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#24140D]">
                ${isEn ? '2. Select Regional Ingredients' : '2. Pilih Bahan & Rempah Otentik Jawa'}
              </h2>
            </div>
            
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold px-3 py-1 rounded-full ${selectedCount >= 1 ? 'bg-[#24140D] text-[#FAF6EF]' : 'bg-rose-100 text-rose-800'}">
                ${selectedCount} ${isEn ? 'Items Selected' : 'Bahan Dipilih'}
              </span>
              ${selectedCount > 0 ? `
                <button type="button" id="clear-all-ingredients-btn" class="text-xs font-bold text-rose-600 hover:text-rose-800 underline cursor-pointer">
                  ${isEn ? 'Clear All' : 'Hapus Semua'}
                </button>
              ` : ''}
            </div>
          </div>

          <!-- Active Ingredients Chips Bar -->
          <div class="p-3.5 rounded-2xl bg-[#FAF6EF] border border-[#E5D9C5] space-y-2">
            <div class="text-[11px] font-bold text-[#523424] uppercase tracking-wider flex items-center justify-between">
              <span>${isEn ? 'Active Selection in Wajan:' : 'Bahan yang Siap Masuk ke Wajan Racikan:'}</span>
              <span class="text-[#656C42]">${selectedCount === 0 ? (isEn ? 'Select at least 1 ingredient' : 'Pilih minimal 1 bahan') : (isEn ? 'Ready to blend' : 'Siap diproses')}</span>
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${selectedCount === 0 ? `
                <span class="text-xs italic text-[#6B3C27]">
                  ${isEn ? 'No ingredients selected yet. Click any ingredient card below to add.' : 'Belum ada bahan dipilih. Klik kartu rempah/bahan di bawah untuk memasukkan.'}
                </span>
              ` : formState.selectedIngredientIds.map(id => {
                const item = ALL_INGREDIENTS.find(i => i.id === id);
                if (!item) return '';
                return `
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#C49A58]/40 text-xs font-semibold text-[#24140D] shadow-2xs">
                    <img src="${item.image || `/assets/images/ingredients/${item.id}.jpg`}" alt="${item.nameId}" class="w-4 h-4 rounded-full object-cover" onerror="this.src='/assets/images/hero/hero-culinary.jpg'"/>
                    <span>${isEn ? (item.nameEn || item.nameId) : item.nameId}</span>
                    <button type="button" data-remove-ingredient="${item.id}" class="text-[#B85C38] hover:text-rose-700 font-bold ml-1 text-sm cursor-pointer">&times;</button>
                  </span>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Tabs & Search Bar -->
          <div class="flex flex-col md:flex-row gap-3 items-stretch justify-between">
            <div class="inline-flex p-1 rounded-xl bg-[#FAF6EF] border border-[#E5D9C5] overflow-x-auto text-xs font-bold text-[#523424]">
              <button type="button" data-tab="all" class="px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'all' ? 'bg-[#24140D] text-[#FAF6EF] shadow-xs' : 'hover:text-[#B85C38]'}">
                ${isEn ? 'All Ingredients' : 'Semua Bahan'}
              </button>
              <button type="button" data-tab="protein" class="px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'protein' ? 'bg-[#24140D] text-[#FAF6EF] shadow-xs' : 'hover:text-[#B85C38]'}">
                🥩 ${isEn ? 'Proteins' : 'Protein & Pokok'}
              </button>
              <button type="button" data-tab="spice" class="px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'spice' ? 'bg-[#24140D] text-[#FAF6EF] shadow-xs' : 'hover:text-[#B85C38]'}">
                🌿 ${isEn ? 'Aromatic Spices' : 'Rempah Aromatik'}
              </button>
              <button type="button" data-tab="vegetable" class="px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'vegetable' ? 'bg-[#24140D] text-[#FAF6EF] shadow-xs' : 'hover:text-[#B85C38]'}">
                🥬 ${isEn ? 'Vegetables' : 'Sayur & Pelengkap'}
              </button>
            </div>

            <!-- Instant Search Input -->
            <div class="relative w-full md:w-64">
              <input 
                type="text" 
                id="ingredient-search-input" 
                placeholder="${isEn ? 'Search ingredients...' : 'Cari bahan / rempah...'}" 
                value="${escapeHtml(searchQuery)}"
                class="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#E5D9C5] text-xs text-[#24140D] focus:outline-hidden focus:ring-2 focus:ring-[#B85C38]"
              />
              <svg class="w-4 h-4 text-[#656C42] absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                  class="group relative text-left p-2.5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected 
                      ? 'bg-[#24140D] text-white border-[#B85C38] ring-2 ring-[#B85C38] shadow-md' 
                      : 'bg-white hover:bg-[#FAF6EF] text-[#24140D] border-[#E5D9C5] hover:border-[#C49A58]'
                  }"
                >
                  <div class="relative w-full aspect-square rounded-xl overflow-hidden mb-2 bg-[#FAF6EF] border border-[#E5D9C5]">
                    <img 
                      src="${imgSrc}" 
                      alt="${item.nameId}" 
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onerror="this.src='/assets/images/hero/hero-culinary.jpg'"
                    />
                    <span class="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isSelected ? 'bg-[#B85C38] text-white shadow-xs' : 'bg-black/40 text-white backdrop-blur-xs'
                    }">
                      ${isSelected ? '✓' : '+'}
                    </span>
                  </div>

                  <div class="space-y-0.5">
                    <span class="text-[10px] font-mono uppercase tracking-wider block ${isSelected ? 'text-[#C49A58]' : 'text-[#656C42]'}">
                      ${item.category}
                    </span>
                    <strong class="text-xs font-bold block line-clamp-1 leading-snug">
                      ${isEn ? (item.nameEn || item.nameId) : item.nameId}
                    </strong>
                    <span class="text-[10px] block line-clamp-1 ${isSelected ? 'text-white/70' : 'text-[#523424]/75'}">
                      ${item.flavorNote || ''}
                    </span>
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </section>

        <!-- SECTION 3: Culinary Style & Portions -->
        <section class="pawon-glass p-6 sm:p-8 rounded-3xl space-y-6">
          <div class="pb-4 border-b border-[#E5D9C5]">
            <span class="text-[11px] font-bold text-[#B85C38] uppercase tracking-wider">${isEn ? 'Step 3 • Culinary Technique & Servings' : 'Langkah 3 • Teknik Olah & Takaran Bebas'}</span>
            <h2 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#24140D]">
              ${isEn ? '3. Culinary Technique & Servings' : '3. Karakter Olahan Pawon & Porsi'}
            </h2>
          </div>

          <!-- Cooking Method -->
          <div class="space-y-2">
            <label class="block text-xs font-bold text-[#24140D] uppercase tracking-wider">
              ${isEn ? 'Cooking Technique' : 'Metode Memasak Tradisional'}
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              ${PREFERENCE_OPTIONS.cookingMethods.map(m => {
                const isSelected = formState.cookingMethod === m.id;
                return `
                  <label class="p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-[#24140D] text-[#FAF6EF] border-[#B85C38] ring-2 ring-[#B85C38]' 
                      : 'bg-white hover:bg-[#FAF6EF] text-[#24140D] border-[#E5D9C5]'
                  }">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold">${isEn ? m.labelEn : m.labelId}</span>
                      <input type="radio" name="cookingMethod" value="${m.id}" ${isSelected ? 'checked' : ''} class="sr-only"/>
                    </div>
                    <p class="text-[10px] ${isSelected ? 'text-[#C49A58]' : 'text-[#523424]'} mt-2 leading-relaxed">
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
              <label class="block text-xs font-bold text-[#24140D] uppercase tracking-wider">
                ${isEn ? 'Regional Flavor Balance' : 'Harmoni Rasa Jawa Tengah'}
              </label>
              <select 
                id="taste-profile-select" 
                class="w-full px-4 py-3 rounded-xl bg-white border border-[#E5D9C5] text-xs font-semibold text-[#24140D] focus:ring-2 focus:ring-[#B85C38]"
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
              <label class="block text-xs font-bold text-[#24140D] uppercase tracking-wider">
                ${isEn ? 'Spice Warmth Level' : 'Tingkat Kehangatan Cabai'}
              </label>
              <div class="grid grid-cols-4 gap-2">
                ${PREFERENCE_OPTIONS.spiceLevels.map(sl => {
                  const isSelected = formState.spiceLevel === sl.id;
                  return `
                    <label class="p-2.5 rounded-xl border text-center text-xs font-semibold cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-[#B85C38] text-white border-[#B85C38] shadow-xs' 
                        : 'bg-white text-[#24140D] border-[#E5D9C5]'
                    }">
                      <input type="radio" name="spiceLevel" value="${sl.id}" ${isSelected ? 'checked' : ''} class="sr-only"/>
                      <div class="text-sm">${sl.icon}</div>
                      <div class="text-[10px] font-bold mt-1">Lvl ${sl.id}</div>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- FREE NUMERIC SERVINGS INPUT & CUSTOM NOTES -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <!-- Free Custom Servings Input (No restrictive buttons, freely typed with reasonable min-max) -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label for="creator-servings-input" class="block text-xs font-bold text-[#24140D] uppercase tracking-wider">
                  ${isEn ? 'Target Servings (Free Input)' : 'Porsi Santapan (Bebas Masukkan)'}
                </label>
                <span class="text-[10px] text-[#B85C38] font-bold">
                  ${isEn ? 'Min 1 – Max 100' : 'Batas: Min. 1 s/d 100 Porsi'}
                </span>
              </div>

              <!-- Interactive Stepper with Direct Input -->
              <div class="flex items-center gap-3">
                <div class="inline-flex items-center rounded-xl border border-[#E5D9C5] bg-white p-1 shadow-xs">
                  <button 
                    type="button" 
                    id="creator-servings-dec-btn"
                    class="w-10 h-10 rounded-lg flex items-center justify-center text-[#654332] hover:bg-[#FAF6EF] active:bg-[#E5D9C5] font-bold text-base transition-all cursor-pointer"
                    aria-label="Kurangi porsi"
                  >
                    &minus;
                  </button>

                  <div class="relative flex items-center px-2">
                    <input 
                      type="number" 
                      id="creator-servings-input" 
                      name="servings"
                      min="1" 
                      max="100" 
                      value="${formState.servings || 4}"
                      class="w-20 text-center font-bold text-base text-[#24140D] bg-transparent outline-none py-1.5 focus:ring-1 focus:ring-[#B85C38] rounded-md"
                    />
                    <span class="text-xs font-bold text-[#8C624D] pr-2 pointer-events-none">
                      ${isEn ? 'servings' : 'porsi'}
                    </span>
                  </div>

                  <button 
                    type="button" 
                    id="creator-servings-inc-btn"
                    class="w-10 h-10 rounded-lg flex items-center justify-center text-[#654332] hover:bg-[#FAF6EF] active:bg-[#E5D9C5] font-bold text-base transition-all cursor-pointer"
                    aria-label="Tambah porsi"
                  >
                    &#43;
                  </button>
                </div>

                <!-- Quick Preset Pills -->
                <div class="flex items-center flex-wrap gap-1.5">
                  ${[2, 4, 8, 20].map(p => `
                    <button 
                      type="button" 
                      data-creator-quick-porsi="${p}"
                      class="px-2.5 py-1.5 rounded-lg border border-[#E5D9C5] bg-white hover:bg-[#FAF6EF] text-[#523424] text-xs font-semibold shadow-2xs transition-all cursor-pointer ${
                        formState.servings === p ? 'border-[#B85C38] text-[#B85C38] font-bold' : ''
                      }"
                    >
                      ${p}
                    </button>
                  `).join('')}
                </div>
              </div>
              <p class="text-[11px] text-[#523424]/80">
                ${isEn 
                  ? 'Feel free to enter any portion count from 1 (single person) up to 100 (traditional feast / hajatan).' 
                  : 'Bebas ketik berapa pun porsi yang Anda inginkan (1 porsi pribadi hingga 100 porsi acara syukuran). Gramasi bahan akan dihitung otomatis.'}
              </p>
            </div>

            <!-- Custom Notes -->
            <div class="space-y-2">
              <label for="custom-notes-input" class="block text-xs font-bold text-[#24140D] uppercase tracking-wider">
                ${isEn ? 'Culinary Vision / Special Notes' : 'Catatan Selera Tambahan'}
              </label>
              <input 
                type="text" 
                id="custom-notes-input" 
                name="customNotes"
                value="${escapeHtml(formState.customNotes)}"
                placeholder="${isEn ? 'e.g., Rich coconut milk with subtle lime fragrance...' : 'Contoh: Kuah areh gurih lembut beraroma daun jeruk...'}"
                class="w-full px-4 py-3 rounded-xl bg-white border border-[#E5D9C5] text-xs text-[#24140D] focus:ring-2 focus:ring-[#B85C38]"
              />
              <p class="text-[11px] text-[#523424]/80">
                ${isEn ? 'Personal preference or touch to inspire the AI cooking narrative.' : 'Sentuhan pribadi yang akan diintegrasikan ke narasi cerita resep.'}
              </p>
            </div>
          </div>
        </section>

        <!-- CTA Action Bar -->
        <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#24140D] via-[#351C12] to-[#1B0F09] border border-[#C49A58]/35 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-left space-y-1">
            <h3 class="font-editorial-serif text-xl font-bold text-[#FAF6EF]">
              ${isEn ? 'Ready to craft your authentic recipe?' : 'Siap meracik kreasi resep orisinal Anda?'}
            </h3>
            <p class="text-xs text-[#FAF6EF]/75">
              ${isEn 
                ? 'Your parameters will generate an official culinary blueprint, scaled ingredients, cooking guide, and downloadable poster.' 
                : 'Parameter pilihan Anda akan langsung menghasilkan blueprint resep resmi, takaran bahan presisi, panduan memasak, serta poster kanvas siap unduh.'}
            </p>
          </div>

          <button 
            type="submit" 
            id="generate-recipe-submit-btn"
            class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#B85C38] hover:bg-[#A04A27] text-[#FAF6EF] font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>✨</span>
            <span>${isEn ? 'Craft Recipe & Generate Visuals' : 'Ciptakan Resep & Komposisi Bumbu'}</span>
            <svg class="w-4 h-4 text-[#FAF6EF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

      </form>

    </div>
  `;
}

/**
 * Output Template View: Full Final Recipe, Pure Dark Placeholder Image, Working Downloads, Ready for DB mapping
 */
function renderResultView(recipe, currentLang) {
  const isEn = currentLang === 'en';

  return `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      <!-- Top Navigation & Success Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5D9C5]">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold shadow-2xs">
              ✓ ${isEn ? 'Recipe & Poster Blueprint Ready' : 'Resep & Poster Resmi Berhasil Disusun'}
            </span>
            <span class="text-[11px] font-mono uppercase tracking-wider text-[#656C42] bg-[#FAF6EF] px-2.5 py-0.5 rounded-md border border-[#E5D9C5]">
              ${isEn ? '[Default Template]' : '[Template Baku]'}
            </span>
          </div>
          <h1 class="font-editorial-serif text-2xl sm:text-4xl font-bold text-[#24140D]">
            ${escapeHtml(recipe.title)}
          </h1>
          <p class="text-xs text-[#523424]">
            ${isEn ? 'Culinary Architecture Output' : 'Koleksi Eksperimen Dapur Orisinal'} • ID: <span class="font-mono">${escapeHtml(recipe.id)}</span>
          </p>
        </div>

        <div class="flex items-center gap-2.5">
          <button 
            type="button" 
            id="create-another-recipe-btn"
            class="px-5 py-2.5 rounded-xl border border-[#C49A58] bg-white hover:bg-[#FAF6EF] text-[#24140D] text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>←</span>
            <span>${isEn ? 'Craft Another Recipe' : 'Ciptakan Resep Lain'}</span>
          </button>
        </div>
      </div>

      <!-- Live Toast Feedback Notification -->
      <div id="live-toast-banner" class="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between shadow-xs ${toastMessage ? '' : 'hidden'}">
        <div class="flex items-center gap-2 font-medium">
          <span class="text-sm">✓</span>
          <span class="toast-text">${toastMessage || ''}</span>
        </div>
        <button type="button" id="dismiss-toast-btn" class="font-bold text-emerald-700 text-sm cursor-pointer hover:text-emerald-950">&times;</button>
      </div>

      <!-- Main Two-Column Layout (Left: Canvas Poster & Working Downloads | Right: Complete Recipe) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        <!-- LEFT COLUMN: Canvas Poster & Action Buttons (5 cols) -->
        <div class="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          <!-- Poster Preview Container -->
          <div class="bg-white p-5 rounded-3xl border border-[#C49A58]/35 shadow-lg space-y-4">
            <div class="flex items-center justify-between text-xs font-bold text-[#24140D] px-1">
              <span class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-[#B85C38]"></span>
                ${isEn ? 'High-DPI Canvas Poster' : 'Poster Resmi Kanvas HTML5'}
              </span>
              <span class="text-[10px] text-[#656C42] uppercase font-mono px-2 py-0.5 rounded-md bg-[#FAF6EF] border border-[#E5D9C5]">
                ${recipe.aspectRatio}
              </span>
            </div>

            <!-- Canvas Element for Visual Composition -->
            <div class="relative rounded-2xl overflow-hidden bg-[#0F0C0A] border border-[#E5D9C5] shadow-inner flex items-center justify-center min-h-[340px]">
              <canvas 
                id="food-poster-canvas" 
                class="w-full h-auto max-h-[500px] object-contain block"
              ></canvas>
            </div>

            <!-- Complete Working Download Actions (PNG, JPEG, PDF Recipe, Certificate, JSON Schema, Copy Text) -->
            <div class="space-y-2.5 pt-2">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button 
                  type="button" 
                  id="download-poster-btn"
                  class="w-full px-4 py-3 rounded-xl bg-[#24140D] hover:bg-[#351C12] active:scale-98 text-[#FAF6EF] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  <svg class="w-4 h-4 text-[#C49A58]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  <span>${isEn ? 'Poster (PNG)' : 'Unduh Poster (PNG)'}</span>
                </button>

                <button 
                  type="button" 
                  id="download-poster-jpeg-btn"
                  class="w-full px-4 py-3 rounded-xl bg-[#523424] hover:bg-[#3E2416] active:scale-98 text-[#FAF6EF] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  <svg class="w-4 h-4 text-[#C49A58]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  <span>${isEn ? 'Poster (JPEG)' : 'Unduh Poster (JPEG)'}</span>
                </button>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button 
                  type="button" 
                  id="download-pdf-btn"
                  class="w-full px-4 py-3 rounded-xl bg-[#B85C38] hover:bg-[#A04A27] active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                  </svg>
                  <span>${isEn ? 'Recipe Guide (PDF)' : 'Unduh Resep (PDF)'}</span>
                </button>

                <button 
                  type="button" 
                  id="download-cert-btn"
                  class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#C49A58] via-[#B85C38] to-[#523424] hover:opacity-95 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="8" r="6"/>
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                  </svg>
                  <span>${isEn ? 'Certificate (PDF)' : 'Unduh Piagam (PDF)'}</span>
                </button>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <!-- JSON Schema Export Button -->
                <button 
                  type="button" 
                  id="download-json-btn"
                  class="w-full py-2.5 px-3 rounded-xl border border-[#C49A58]/50 bg-[#FAF6EF] hover:bg-[#EAE1D1] text-[#24140D] text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Unduh data terstruktur JSON untuk mapping database"
                >
                  <span class="text-xs">💾</span>
                  <span>${isEn ? 'Schema (JSON)' : 'Unduh Schema (JSON)'}</span>
                </button>

                <!-- Copy Text Button -->
                <button 
                  type="button" 
                  id="copy-recipe-text-btn"
                  class="w-full py-2.5 px-3 rounded-xl border border-[#E5D9C5] bg-white hover:bg-[#FAF6EF] text-[#24140D] text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span class="text-xs">📋</span>
                  <span>${isEn ? 'Copy Full Text' : 'Salin Teks Resep'}</span>
                </button>
              </div>
            </div>

            <!-- In-Memory Image Regeneration Control Panel -->
            <div class="pt-4 border-t border-[#E5D9C5] space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-[#24140D]">
                  ${isEn ? 'Regenerate Poster Art' : 'Regenerasi Poster / Gambar'}
                </span>
                <span class="text-[10px] text-[#656C42]">${isEn ? 'Preserves recipe data' : 'Resep tetap tersimpan'}</span>
              </div>

              <div class="grid grid-cols-2 gap-2 text-xs">
                <select id="regen-style-select" class="px-2.5 py-1.5 rounded-lg bg-[#FAF6EF] border border-[#E5D9C5] text-xs font-medium text-[#24140D]">
                  ${PREFERENCE_OPTIONS.imageStyles.map(st => `
                    <option value="${st.id}" ${recipe.imageStyle === st.id ? 'selected' : ''}>
                      ${isEn ? st.labelEn : st.labelId}
                    </option>
                  `).join('')}
                </select>

                <select id="regen-ratio-select" class="px-2.5 py-1.5 rounded-lg bg-[#FAF6EF] border border-[#E5D9C5] text-xs font-medium text-[#24140D]">
                  ${PREFERENCE_OPTIONS.aspectRatios.map(ar => `
                    <option value="${ar.id}" ${recipe.aspectRatio === ar.id ? 'selected' : ''}>
                      ${ar.label}
                    </option>
                  `).join('')}
                </select>
              </div>

              <button 
                type="button" 
                id="regenerate-art-btn"
                class="w-full py-2 px-3 rounded-lg bg-[#FAF6EF] hover:bg-[#E5D9C5] text-[#24140D] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#C49A58]/30"
              >
                <svg class="w-3.5 h-3.5 text-[#B85C38]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                  <path d="M16 16h5v5"/>
                </svg>
                <span>${isEn ? 'Apply New Style & Redraw' : 'Terapkan Gaya Baru & Gambar Ulang'}</span>
              </button>
            </div>

          </div>

          <!-- Creator Certificate Teaser Badge -->
          <div class="p-5 rounded-2xl bg-gradient-to-br from-[#24140D] to-[#1B0F09] text-[#FAF6EF] border border-[#C49A58]/35 space-y-3 shadow-md">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-base text-[#C49A58]">★</span>
                <span class="text-xs font-bold text-[#C49A58] uppercase tracking-wider">
                  ${isEn ? 'Creative Recognition Certificate' : 'Piagam Apresiasi Kreasi'}
                </span>
              </div>
              <span class="text-[10px] bg-[#C49A58]/20 text-[#C49A58] border border-[#C49A58]/40 px-2 py-0.5 rounded-full font-mono">
                A4 LANDSCAPE
              </span>
            </div>
            <p class="text-xs text-[#FAF6EF]/85 leading-relaxed">
              ${isEn 
                ? `An official achievement certificate has been minted for <strong>${escapeHtml(recipe.creatorName)}</strong> celebrating the invention of this culinary masterpiece.`
                : `Piagam apresiasi resmi telah diterbitkan untuk <strong>${escapeHtml(recipe.creatorName)}</strong> atas perancangan mahakarya resep ini.`}
            </p>
          </div>

        </div>

        <!-- RIGHT COLUMN: Structured Recipe Details & Solid Dark Placeholder Image (7 cols) -->
        <div class="lg:col-span-7 space-y-8">
          
          <!-- Dish Visual Banner: Empty Solid Black Box Placeholder (Sesuai Permintaan) -->
          <div class="relative rounded-3xl overflow-hidden border border-[#C49A58]/35 shadow-lg bg-[#0A0806] aspect-16/9 sm:h-72 flex flex-col items-center justify-center p-6 text-center space-y-3">
            <div class="w-14 h-14 rounded-2xl bg-white/5 border border-[#C49A58]/35 flex items-center justify-center text-2xl text-[#C49A58] shadow-inner">
              📷
            </div>
            <div class="space-y-1">
              <span class="text-xs font-mono uppercase tracking-widest text-[#FAF6EF]/80 font-bold block">
                ${isEn ? '[Dish Visual Placeholder - Solid Dark Area]' : '[Area Placeholder Gambar Hidangan - Kosong Hitam]'}
              </span>
              <p class="text-[11px] text-[#FAF6EF]/45 max-w-sm mx-auto leading-relaxed">
                ${isEn 
                  ? 'Empty solid black visual area • Default template ready for database image URL binding' 
                  : 'Area gambar kosong hitam pekat • Format default template siap dihubungkan dengan data gambar'}
              </p>
            </div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-[#C49A58] font-mono">
              <span>🏷️</span>
              <span>${escapeHtml(recipe.shortTitle)}</span>
            </div>
          </div>

          <!-- Recipe Overview Card -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#C49A58]/30 shadow-xs space-y-5">
            <div class="space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-[10px] font-mono uppercase tracking-wider text-[#656C42] bg-[#FAF6EF] px-2.5 py-0.5 rounded-md border border-[#E5D9C5]">
                  ${isEn ? '[Recipe Template]' : '[Template Resep]'}
                </span>
                <span class="text-xs font-bold text-[#B85C38] uppercase tracking-wider">
                  ${escapeHtml(recipe.javaneseTitle)}
                </span>
              </div>
              <h2 class="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#24140D]">
                ${escapeHtml(recipe.shortTitle)}
              </h2>
              <p class="text-xs sm:text-sm text-[#523424] leading-relaxed">
                ${escapeHtml(recipe.description)}
              </p>
            </div>

            <!-- Metadata Metrics Grid (Template Fields) -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#E5D9C5] text-xs">
              <div class="p-3 rounded-xl bg-[#FAF6EF] space-y-0.5 border border-[#E5D9C5]/60">
                <span class="text-[#656C42] block text-[10px] font-semibold">${isEn ? '[Total Time]' : '[Total Waktu]'}</span>
                <strong class="text-[#24140D] font-bold">${recipe.totalTime}</strong>
              </div>
              <div class="p-3 rounded-xl bg-[#FAF6EF] space-y-0.5 border border-[#E5D9C5]/60">
                <span class="text-[#656C42] block text-[10px] font-semibold">${isEn ? '[Servings]' : '[Porsi]'}</span>
                <strong class="text-[#24140D] font-bold">${recipe.servings} ${isEn ? 'Servings' : 'Porsi'}</strong>
              </div>
              <div class="p-3 rounded-xl bg-[#FAF6EF] space-y-0.5 border border-[#E5D9C5]/60">
                <span class="text-[#656C42] block text-[10px] font-semibold">${isEn ? '[Difficulty]' : '[Tingkat]'}</span>
                <strong class="text-[#24140D] font-bold">${recipe.difficulty}</strong>
              </div>
              <div class="p-3 rounded-xl bg-[#FAF6EF] space-y-0.5 border border-[#E5D9C5]/60">
                <span class="text-[#656C42] block text-[10px] font-semibold">${isEn ? '[Est. Cost]' : '[Estimasi Biaya]'}</span>
                <strong class="text-[#B85C38] font-bold">${recipe.estimatedCost}</strong>
              </div>
            </div>
          </div>

          <!-- Scaled Ingredients with Checkboxes -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#C49A58]/30 shadow-xs space-y-5">
            <div class="flex items-center justify-between pb-3 border-b border-[#E5D9C5]">
              <div class="space-y-0.5">
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-mono uppercase tracking-wider text-[#656C42] bg-[#FAF6EF] px-2 py-0.5 rounded-md border border-[#E5D9C5]">
                    ${isEn ? '[Ingredients Template]' : '[Template Bahan]'}
                  </span>
                  <h3 class="font-editorial-serif text-xl font-bold text-[#24140D]">
                    ${isEn ? 'Ingredients & Quantities' : 'Daftar Bahan & Takaran'}
                  </h3>
                </div>
                <span class="text-xs text-[#656C42]">
                  ${isEn ? `Calibrated for ${recipe.servings} servings` : `Dikalibrasi untuk ${recipe.servings} porsi santapan`}
                </span>
              </div>
              <span class="text-xs font-bold text-[#B85C38] bg-[#FAF6EF] border border-[#E5D9C5] px-3 py-1 rounded-full">
                ${recipe.ingredients.length} ${isEn ? 'Items' : 'Bahan'}
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              ${recipe.ingredients.map((ing) => `
                <label class="p-3 rounded-xl bg-[#FAF6EF]/60 hover:bg-[#FAF6EF] border border-[#E5D9C5] text-xs flex items-center justify-between gap-3 cursor-pointer transition-colors">
                  <div class="flex items-center gap-2.5">
                    <input type="checkbox" class="rounded text-[#B85C38] focus:ring-[#B85C38] cursor-pointer"/>
                    <div>
                      <strong class="text-[#24140D] block">${escapeHtml(ing.name)}</strong>
                      <span class="text-[10px] text-[#656C42] italic">${escapeHtml(ing.note || '')}</span>
                    </div>
                  </div>
                  <span class="font-mono text-xs font-bold text-[#B85C38] shrink-0 bg-white px-2 py-0.5 rounded-md border border-[#E5D9C5]">
                    ${ing.amount} ${ing.unit}
                  </span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- Step-by-Step Cooking Guide -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#C49A58]/30 shadow-xs space-y-6">
            <div class="flex items-center justify-between pb-3 border-b border-[#E5D9C5]">
              <div class="space-y-0.5">
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-mono uppercase tracking-wider text-[#656C42] bg-[#FAF6EF] px-2 py-0.5 rounded-md border border-[#E5D9C5]">
                    ${isEn ? '[Steps Template]' : '[Template Langkah]'}
                  </span>
                  <h3 class="font-editorial-serif text-xl font-bold text-[#24140D]">
                    ${isEn ? 'Cooking Steps & Milestones' : 'Tahapan Memasak Langkah Demi Langkah'}
                  </h3>
                </div>
                <span class="text-xs text-[#656C42]">
                  ${isEn ? 'Sequential instructions with sensory cues' : 'Instruksi bertahap dengan tanda kematangan sensorik'}
                </span>
              </div>
              <span class="text-xs font-bold text-[#24140D] bg-[#FAF6EF] border border-[#E5D9C5] px-3 py-1 rounded-full">
                ${recipe.steps.length} ${isEn ? 'Steps' : 'Langkah'}
              </span>
            </div>

            <div class="space-y-4">
              ${recipe.steps.map((st) => `
                <div class="p-4 sm:p-5 rounded-2xl bg-[#FAF6EF]/70 border border-[#E5D9C5] space-y-2">
                  <div class="flex items-center gap-3">
                    <span class="w-7 h-7 rounded-full bg-[#24140D] text-[#C49A58] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      ${st.stepNumber}
                    </span>
                    <h4 class="font-bold text-sm text-[#24140D]">
                      ${escapeHtml(st.title)}
                    </h4>
                  </div>
                  <p class="text-xs text-[#523424] leading-relaxed pl-10">
                    ${escapeHtml(st.instruction)}
                  </p>
                  ${st.sensoryMilestone ? `
                    <div class="pl-10 pt-1">
                      <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#656C42] bg-white px-2.5 py-1 rounded-lg border border-[#E5D9C5]">
                        <span>👃</span>
                        <span>${isEn ? 'Sensory Milestone:' : 'Tanda Sensorik:'} ${escapeHtml(st.sensoryMilestone)}</span>
                      </span>
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Chef's Traditional Tips & Food Safety -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-5 sm:p-6 rounded-3xl bg-[#FAF6EF] border border-[#C49A58]/35 space-y-3">
              <h4 class="font-editorial-serif text-base font-bold text-[#24140D] flex items-center gap-2">
                <span>💡</span>
                <span>${isEn ? '[Chef Notes]' : '[Rahasia Dapur Pawon]'}</span>
              </h4>
              <p class="text-xs text-[#523424] leading-relaxed">
                ${escapeHtml(recipe.chefTips)}
              </p>
            </div>

            <div class="p-5 sm:p-6 rounded-3xl bg-[#FAF6EF] border border-[#C49A58]/35 space-y-3">
              <h4 class="font-editorial-serif text-base font-bold text-[#24140D] flex items-center gap-2">
                <span>🛡️</span>
                <span>${isEn ? '[Food Safety & Storage]' : '[Higienitas & Penyimpanan]'}</span>
              </h4>
              <p class="text-xs text-[#523424] leading-relaxed">
                ${escapeHtml(recipe.safetyNotes)}
              </p>
            </div>
          </div>

          <!-- Bottom Return Action -->
          <div class="pt-4 text-center">
            <button 
              type="button" 
              id="bottom-create-another-btn"
              class="px-8 py-3.5 rounded-full bg-[#B85C38] hover:bg-[#A04A27] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              ${isEn ? '← Craft Another Recipe' : '← Ciptakan Resep Lain'}
            </button>
          </div>

        </div>

      </div>

    </div>
  `;
}

/**
 * Initialize event listeners for AI Food Creator
 */
export function initAiFoodCreatorInteractions() {
  const form = document.getElementById('ai-creator-form');

  // Dismiss Validation Banner
  const dismissBtn = document.getElementById('dismiss-val-btn');
  if (dismissBtn) {
    dismissBtn.onclick = () => {
      validationMessage = null;
      reRenderCurrentView();
    };
  }

  // Dismiss Toast Message
  const dismissToastBtn = document.getElementById('dismiss-toast-btn');
  if (dismissToastBtn) {
    dismissToastBtn.onclick = () => {
      toastMessage = null;
      reRenderCurrentView();
    };
  }

  // Creator Name Input
  const nameInput = document.getElementById('creator-name-input');
  if (nameInput) {
    nameInput.oninput = (e) => {
      formState.creatorName = e.target.value;
      if (validationMessage) validationMessage = null;
    };
  }

  const nicknameInput = document.getElementById('creator-nickname-input');
  if (nicknameInput) {
    nicknameInput.oninput = (e) => {
      formState.creatorNickname = e.target.value;
    };
  }

  // Category Tabs
  const tabButtons = document.querySelectorAll('[data-tab]');
  tabButtons.forEach(btn => {
    btn.onclick = () => {
      activeTab = btn.getAttribute('data-tab');
      reRenderCurrentView();
    };
  });

  // Ingredient Search Filter
  const searchInput = document.getElementById('ingredient-search-input');
  if (searchInput) {
    searchInput.oninput = (e) => {
      searchQuery = e.target.value;
      reRenderCurrentView();
      const newSearchInput = document.getElementById('ingredient-search-input');
      if (newSearchInput) {
        newSearchInput.focus();
        newSearchInput.setSelectionRange(searchQuery.length, searchQuery.length);
      }
    };
  }

  // Ingredient Card Selection
  const ingredientCards = document.querySelectorAll('[data-ingredient-id]');
  ingredientCards.forEach(card => {
    card.onclick = () => {
      const id = card.getAttribute('data-ingredient-id');
      if (!id) return;

      const idx = formState.selectedIngredientIds.indexOf(id);
      if (idx > -1) {
        formState.selectedIngredientIds.splice(idx, 1);
      } else {
        formState.selectedIngredientIds.push(id);
      }
      validationMessage = null;
      reRenderCurrentView();
    };
  });

  // Remove Ingredient Chip
  const removeButtons = document.querySelectorAll('[data-remove-ingredient]');
  removeButtons.forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-remove-ingredient');
      formState.selectedIngredientIds = formState.selectedIngredientIds.filter(i => i !== id);
      reRenderCurrentView();
    };
  });

  // Clear All Ingredients
  const clearBtn = document.getElementById('clear-all-ingredients-btn');
  if (clearBtn) {
    clearBtn.onclick = () => {
      formState.selectedIngredientIds = [];
      reRenderCurrentView();
    };
  }

  // Radio button groups
  setupRadioGroup('cookingMethod', (val) => { formState.cookingMethod = val; });
  setupRadioGroup('spiceLevel', (val) => { formState.spiceLevel = parseInt(val) || 0; });

  // Servings Stepper & Free Numeric Input
  const servingsInput = document.getElementById('creator-servings-input');
  const servingsDecBtn = document.getElementById('creator-servings-dec-btn');
  const servingsIncBtn = document.getElementById('creator-servings-inc-btn');
  const quickPorsiBtns = document.querySelectorAll('[data-creator-quick-porsi]');

  const updateServings = (val) => {
    let parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed < 1) parsed = 1;
    if (parsed > 100) parsed = 100;
    formState.servings = parsed;
    if (servingsInput) servingsInput.value = parsed;
  };

  if (servingsInput) {
    servingsInput.oninput = (e) => {
      if (e.target.value === '') return;
      let val = parseInt(e.target.value, 10);
      if (!isNaN(val)) {
        if (val > 100) e.target.value = 100;
        formState.servings = Math.max(1, Math.min(100, val));
      }
    };
    servingsInput.onblur = (e) => {
      updateServings(e.target.value);
    };
    servingsInput.onchange = (e) => {
      updateServings(e.target.value);
    };
  }

  if (servingsDecBtn) {
    servingsDecBtn.onclick = () => {
      updateServings((formState.servings || 4) - 1);
    };
  }

  if (servingsIncBtn) {
    servingsIncBtn.onclick = () => {
      updateServings((formState.servings || 4) + 1);
    };
  }

  quickPorsiBtns.forEach(btn => {
    btn.onclick = () => {
      const p = parseInt(btn.getAttribute('data-creator-quick-porsi'), 10);
      if (!isNaN(p)) {
        updateServings(p);
        reRenderCurrentView();
      }
    };
  });

  const tasteSelect = document.getElementById('taste-profile-select');
  if (tasteSelect) {
    tasteSelect.onchange = (e) => { formState.tasteProfile = e.target.value; };
  }

  const notesInput = document.getElementById('custom-notes-input');
  if (notesInput) {
    notesInput.oninput = (e) => { formState.customNotes = e.target.value; };
  }

  // Form Submit Handler
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();

      // Validation 1: Creator Name
      if (!formState.creatorName || formState.creatorName.trim().length === 0) {
        validationMessage = 'Nama lengkap pencipta resep wajib diisi untuk hak cipta karya kuliner.';
        reRenderCurrentView();
        window.scrollTo({ top: 180, behavior: 'smooth' });
        return;
      }

      // Validation 2: Ingredients count
      if (!formState.selectedIngredientIds || formState.selectedIngredientIds.length === 0) {
        validationMessage = 'Pilih minimal 1 bahan atau rempah untuk meracik resep.';
        reRenderCurrentView();
        window.scrollTo({ top: 380, behavior: 'smooth' });
        return;
      }

      // Transition with realistic synthesis animation
      validationMessage = null;
      isGenerating = true;
      reRenderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });

      try {
        const recipe = await aiFoodCreatorService.generateRecipe(formState);
        currentGeneratedRecipe = recipe;
        toastMessage = `Resep "${recipe.shortTitle}" berhasil diracik secara orisinal oleh ${recipe.creatorName}!`;
      } catch (err) {
        console.error('Recipe synthesis error:', err);
        validationMessage = err.message || 'Gagal meracik resep. Silakan coba kembali.';
      } finally {
        isGenerating = false;
        reRenderCurrentView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
  }

  // --- RESULT VIEW LISTENERS ---
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
  const showToast = (msg) => {
    toastMessage = msg;
    const banner = document.getElementById('live-toast-banner');
    if (banner) {
      const textSpan = banner.querySelector('.toast-text');
      if (textSpan) textSpan.innerText = msg;
      banner.classList.remove('hidden');
    }
  };

  const canvas = document.getElementById('food-poster-canvas');
  if (canvas && currentGeneratedRecipe) {
    aiFoodCreatorService.composePosterCanvas(canvas, currentGeneratedRecipe);
  }

  // Dismiss Toast on Result View
  const dismissToastResultBtn = document.getElementById('dismiss-toast-btn');
  if (dismissToastResultBtn) {
    dismissToastResultBtn.onclick = () => {
      toastMessage = null;
      const banner = document.getElementById('live-toast-banner');
      if (banner) banner.classList.add('hidden');
    };
  }

  // Download Poster (PNG)
  const downloadPosterBtn = document.getElementById('download-poster-btn');
  if (downloadPosterBtn && canvas && currentGeneratedRecipe) {
    downloadPosterBtn.onclick = () => {
      const ok = aiFoodCreatorService.downloadPoster(canvas, currentGeneratedRecipe.shortTitle, 'png');
      if (ok !== false) {
        showToast(isEn ? '✓ Poster (PNG) successfully downloaded!' : '✓ Poster (PNG) berhasil diunduh!');
      }
    };
  }

  // Download Poster (JPEG)
  const downloadPosterJpegBtn = document.getElementById('download-poster-jpeg-btn');
  if (downloadPosterJpegBtn && canvas && currentGeneratedRecipe) {
    downloadPosterJpegBtn.onclick = () => {
      const ok = aiFoodCreatorService.downloadPoster(canvas, currentGeneratedRecipe.shortTitle, 'jpeg');
      if (ok !== false) {
        showToast(isEn ? '✓ Poster (JPEG) successfully downloaded!' : '✓ Poster (JPEG) berhasil diunduh!');
      }
    };
  }

  // Download Recipe Guide (PDF)
  const downloadPdfBtn = document.getElementById('download-pdf-btn');
  if (downloadPdfBtn && currentGeneratedRecipe) {
    downloadPdfBtn.onclick = async () => {
      const origHtml = downloadPdfBtn.innerHTML;
      downloadPdfBtn.disabled = true;
      downloadPdfBtn.innerText = isEn ? 'Generating PDF...' : 'Menyusun Dokumen PDF...';
      try {
        await aiFoodCreatorService.generateRecipePdf(currentGeneratedRecipe, canvas);
        showToast(isEn ? '✓ Recipe document (PDF) successfully downloaded!' : '✓ Dokumen resep (PDF) berhasil diunduh!');
      } catch (err) {
        console.error('PDF generation error:', err);
        showToast(isEn ? 'Failed to download PDF.' : 'Gagal mengunduh PDF.');
      } finally {
        downloadPdfBtn.disabled = false;
        downloadPdfBtn.innerHTML = origHtml;
      }
    };
  }

  // Download Certificate (PDF)
  const downloadCertBtn = document.getElementById('download-cert-btn');
  if (downloadCertBtn && currentGeneratedRecipe) {
    downloadCertBtn.onclick = async () => {
      const origHtml = downloadCertBtn.innerHTML;
      downloadCertBtn.disabled = true;
      downloadCertBtn.innerText = isEn ? 'Generating Certificate...' : 'Menyusun Piagam (PDF)...';
      try {
        await aiFoodCreatorService.generateCertificatePdf(currentGeneratedRecipe, {
          lang: isEn ? 'en' : 'id'
        });
        showToast(isEn ? '✓ Creator certificate (PDF) successfully downloaded!' : '✓ Piagam apresiasi (PDF) berhasil diunduh!');
      } catch (err) {
        console.error('Certificate generation error:', err);
        showToast(isEn ? 'Failed to download certificate.' : 'Gagal mengunduh piagam.');
      } finally {
        downloadCertBtn.disabled = false;
        downloadCertBtn.innerHTML = origHtml;
      }
    };
  }

  // Download JSON Schema Template
  const downloadJsonBtn = document.getElementById('download-json-btn');
  if (downloadJsonBtn && currentGeneratedRecipe) {
    downloadJsonBtn.onclick = () => {
      const ok = aiFoodCreatorService.downloadRecipeJson(currentGeneratedRecipe);
      if (ok !== false) {
        showToast(isEn ? '✓ JSON Schema template successfully downloaded!' : '✓ Schema JSON template resep berhasil diunduh!');
      }
    };
  }

  // Copy Full Recipe Text
  const copyBtn = document.getElementById('copy-recipe-text-btn');
  if (copyBtn && currentGeneratedRecipe) {
    copyBtn.onclick = async () => {
      const ingredientsText = currentGeneratedRecipe.ingredients
        .map(i => `• ${i.name}: ${i.amount} ${i.unit}${i.note ? ` (${i.note})` : ''}`)
        .join('\n');

      const stepsText = currentGeneratedRecipe.steps
        .map(s => `${s.stepNumber}. ${s.title}\n   ${s.instruction}`)
        .join('\n\n');

      const fullText = `=== LARASRASA TEMPLATE RESEP ===\n${currentGeneratedRecipe.title}\n[Pencipta]: ${currentGeneratedRecipe.creatorName}\n[Porsi]: ${currentGeneratedRecipe.servings} | [Durasi]: ${currentGeneratedRecipe.totalTime}\n\n[DAFTAR BAHAN]\n${ingredientsText}\n\n[LANGKAH MEMASAK]\n${stepsText}\n\n[TIPS DAPUR]\n${currentGeneratedRecipe.chefTips}\n\n[KEAMANAN & PENYIMPANAN]\n${currentGeneratedRecipe.safetyNotes}\n\nDokumen template resmi LarasRasa.`;

      try {
        await navigator.clipboard.writeText(fullText);
        showToast(isEn ? '✓ Full template recipe text copied to clipboard!' : '✓ Teks lengkap template resep berhasil disalin ke clipboard!');
      } catch (err) {
        console.warn('Clipboard write fallback:', err);
        showToast(isEn ? '✓ Recipe text ready to use!' : '✓ Teks resep siap digunakan!');
      }
    };
  }

  // Regenerate Poster Artwork
  const regenBtn = document.getElementById('regenerate-art-btn');
  const regenStyleSelect = document.getElementById('regen-style-select');
  const regenRatioSelect = document.getElementById('regen-ratio-select');

  if (regenBtn && canvas && currentGeneratedRecipe) {
    regenBtn.onclick = () => {
      const newStyle = regenStyleSelect?.value || currentGeneratedRecipe.imageStyle;
      const newRatio = regenRatioSelect?.value || currentGeneratedRecipe.aspectRatio;

      currentGeneratedRecipe.imageStyle = newStyle;
      currentGeneratedRecipe.aspectRatio = newRatio;

      aiFoodCreatorService.composePosterCanvas(canvas, currentGeneratedRecipe, {
        imageStyle: newStyle,
        aspectRatio: newRatio
      });
      showToast(isEn ? '✓ Poster art redrawn!' : '✓ Poster berhasil digambar ulang!');
    };
  }

  // Create Another Recipe Buttons
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
