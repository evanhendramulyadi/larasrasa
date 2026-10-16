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
 * Interactive culinary laboratory:
 * - Creator identity input (Full Name required, nickname optional)
 * - Searchable, categorized ingredient selection with multi-select & validation
 * - Rich culinary preferences (method, category, taste, spice, equipment, notes, visual style)
 * - High-DPI HTML5 Canvas poster composer
 * - One-click PNG poster download & jsPDF recipe document download
 * - In-memory image regeneration with style & ratio switching
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

export async function renderAiFoodCreatorPage() {
  const currentLang = i18n.getLanguage();

  if (isGenerating) {
    return renderGeneratingState();
  }

  if (currentGeneratedRecipe) {
    return renderResultView(currentGeneratedRecipe, currentLang);
  }

  return renderFormView(currentLang);
}

function renderGeneratingState() {
  const isEn = i18n.getLanguage() === 'en';
  return `
    <div class="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
      <div class="relative w-20 h-20 mx-auto">
        <div class="absolute inset-0 rounded-full border-4 border-[#C49A58]/20 animate-ping"></div>
        <div class="w-20 h-20 rounded-full bg-[#302018] border-2 border-[#C49A58] text-[#C49A58] flex items-center justify-center mx-auto shadow-xl">
          <svg class="w-10 h-10 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10"/>
          </svg>
        </div>
      </div>

      <div class="space-y-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2E8D8] text-xs font-bold text-[#B85C38] uppercase tracking-wider">
          ${isEn ? 'AI Culinary Engine' : 'Engine Kuliner LarasRasa'}
        </span>
        <h2 class="font-editorial-serif text-3xl font-bold text-[#302018]">
          ${isEn ? 'Harmonizing Your Original Recipe...' : 'Menyelaraskan Bumbu & Meracik Resep...'}
        </h2>
        <p class="text-sm text-[#654332] max-w-md mx-auto leading-relaxed">
          ${isEn 
            ? 'Analyzing traditional spice ratios, calibrating cooking steps, and composing high-resolution artwork for your culinary concept.'
            : 'Menganalisis keseimbangan rempah, menakar gramasi porsi, dan merajut poster kanvas resolusi tinggi untuk kreasi Anda.'}
        </p>
      </div>

      <div class="max-w-xs mx-auto bg-white/70 backdrop-blur-xs p-3.5 rounded-2xl border border-[#C49A58]/30 text-xs text-[#777B52] space-y-1">
        <div class="flex items-center justify-between font-bold">
          <span>${isEn ? 'Synthesizing Flavors' : 'Meracik Profil Rasa'}</span>
          <span>92%</span>
        </div>
        <div class="w-full bg-[#FAF6EF] h-2 rounded-full overflow-hidden">
          <div class="bg-[#B85C38] h-full rounded-full animate-pulse" style="width: 92%"></div>
        </div>
      </div>
    </div>
  `;
}

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
      (i.flavorNote && i.flavorNote.toLowerCase().includes(q))
    );
  }

  const selectedCount = formState.selectedIngredientIds.length;

  return `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <!-- Studio Header with Traditional Javanese Kitchen Backdrop -->
      <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto border border-[#C49A58]/35 shadow-xl bg-[#302018] text-[#FAF6EF]">
        <img 
          src="/assets/images/hero/javanese-kitchen-master.jpg" 
          alt="Pawon Dapur Jawa Tengah" 
          class="absolute inset-0 w-full h-full object-cover opacity-25 filter brightness-[0.8] contrast-[1.1] pointer-events-none"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#302018] via-[#302018]/85 to-[#302018]/90 pointer-events-none"></div>
        
        <div class="relative z-10 space-y-3 max-w-2xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF6EF]/10 border border-[#C49A58]/40 shadow-xs">
            <span class="w-2 h-2 rounded-full bg-[#B85C38] animate-ping"></span>
            <span class="text-xs font-bold text-[#C49A58] uppercase tracking-wider">
              ${isEn ? 'LarasRasa AI Culinary Studio' : 'Studio Eksperimen Kuliner AI LarasRasa'}
            </span>
          </div>
          <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            ${isEn ? 'Create Your Original Central Javanese Recipe' : 'Ciptakan Resep & Poster Kuliner Jawa Tengah Anda'}
          </h1>
          <p class="text-sm sm:text-base text-[#FAF6EF]/85 leading-relaxed">
            ${isEn
              ? 'Input your culinary vision, select authentic regional ingredients, and let the AI generate a complete traditional recipe with an official high-resolution poster credited in your name.'
              : 'Pilih bahan favorit, atur karakter rasa khas Jawa Tengah, dan biarkan AI menyusun takaran presisi, panduan masak, serta poster resmi bertuliskan nama Anda.'}
          </p>
        </div>
      </div>

      <!-- Validation Banner -->
      ${validationMessage ? `
        <div class="max-w-3xl mx-auto p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-xs">
          <div class="flex items-center gap-2.5">
            <svg class="w-5 h-5 text-rose-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>${validationMessage}</span>
          </div>
          <button type="button" id="dismiss-val-btn" class="font-bold text-rose-600 hover:text-rose-900 text-base">&times;</button>
        </div>
      ` : ''}

      <form id="ai-creator-form" class="space-y-10" novalidate>
        
        <!-- SECTION 1: Creator Identity (Required for attribution & poster) -->
        <section class="bg-white p-6 sm:p-8 rounded-3xl border border-[#C49A58]/25 shadow-xs space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E5D9C5]">
            <div class="space-y-0.5">
              <span class="text-[11px] font-bold text-[#B85C38] uppercase tracking-wider">Bagian 1 • Identitas Kreator</span>
              <h2 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#302018]">
                ${isEn ? '1. Creator Identity & Credit' : '1. Identitas Pencipta Resep'}
              </h2>
            </div>
            <span class="text-xs text-[#777B52] bg-[#FAF6EF] px-3 py-1 rounded-full border border-[#C49A58]/20 self-start sm:self-auto">
              ${isEn ? 'No registration required' : 'Tanpa perlu daftar akun / login'}
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label for="creator-name-input" class="block text-xs font-bold text-[#302018]">
                ${isEn ? 'Full Creator Name *' : 'Nama Lengkap Pencipta Resep *'}
                <span class="text-rose-600 font-bold">*</span>
              </label>
              <input 
                type="text" 
                id="creator-name-input" 
                name="creatorName"
                value="${escapeHtml(formState.creatorName)}"
                placeholder="${isEn ? 'e.g., Evan Hendra Mulyadi' : 'Contoh: Evan Hendra Mulyadi'}"
                required
                class="w-full px-4 py-3 rounded-xl bg-[#FAF6EF] border border-[#E5D9C5] focus:outline-hidden focus:ring-2 focus:ring-[#B85C38] text-sm text-[#302018] transition-all"
              />
              <p class="text-[11px] text-[#654332]/80">
                ${isEn 
                  ? 'This name will be formally credited on your recipe document and high-DPI food poster.' 
                  : 'Nama ini akan tertera resmi pada judul resep, sertifikat dokumen PDF, dan poster kanvas.'}
              </p>
            </div>

            <div class="space-y-1.5">
              <label for="creator-nickname-input" class="block text-xs font-bold text-[#302018]">
                ${isEn ? 'Preferred Title / Nickname (Optional)' : 'Nama Panggilan / Gelar Dapur (Opsional)'}
              </label>
              <input 
                type="text" 
                id="creator-nickname-input" 
                name="creatorNickname"
                value="${escapeHtml(formState.creatorNickname)}"
                placeholder="${isEn ? 'e.g., Chef Evan / Mas Evan' : 'Contoh: Chef Evan / Mas Hendra'}"
                class="w-full px-4 py-3 rounded-xl bg-[#FAF6EF] border border-[#E5D9C5] focus:outline-hidden focus:ring-2 focus:ring-[#B85C38] text-sm text-[#302018] transition-all"
              />
              <p class="text-[11px] text-[#654332]/80">
                ${isEn ? 'Used for intimate culinary storytelling notes.' : 'Digunakan dalam catatan narasi cerita dapur nusantara.'}
              </p>
            </div>
          </div>

          <!-- Recipe Output Language Selector -->
          <div class="pt-4 border-t border-[#E5D9C5] space-y-2.5">
            <div class="flex items-center justify-between">
              <label class="block text-xs font-bold text-[#302018] uppercase tracking-wider">
                ${isEn ? 'Recipe Output Language' : 'Bahasa Output Dokumen Resep'}
              </label>
              <span class="text-[11px] text-[#777B52]">
                ${isEn ? 'Determines language of generated recipe text' : 'Bahasa penyusunan resep, takaran & langkah'}
              </span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
              <label class="p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                formState.outputLanguage === 'id'
                  ? 'bg-[#302018] text-[#FAF6EF] border-[#B85C38] ring-2 ring-[#B85C38]'
                  : 'bg-[#FAF6EF]/60 hover:bg-[#FAF6EF] text-[#302018] border-[#E5D9C5]'
              }">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">🇮🇩</span>
                  <div>
                    <span class="text-xs font-bold block">Bahasa Indonesia</span>
                    <span class="text-[10px] ${formState.outputLanguage === 'id' ? 'text-[#C49A58]' : 'text-[#654332]'} block">
                      Resep, takaran gramasi & instruksi Indonesia
                    </span>
                  </div>
                </div>
                <input type="radio" name="outputLanguage" value="id" ${formState.outputLanguage === 'id' ? 'checked' : ''} class="sr-only"/>
              </label>

              <label class="p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                formState.outputLanguage === 'en'
                  ? 'bg-[#302018] text-[#FAF6EF] border-[#B85C38] ring-2 ring-[#B85C38]'
                  : 'bg-[#FAF6EF]/60 hover:bg-[#FAF6EF] text-[#302018] border-[#E5D9C5]'
              }">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">🇬🇧</span>
                  <div>
                    <span class="text-xs font-bold block">English</span>
                    <span class="text-[10px] ${formState.outputLanguage === 'en' ? 'text-[#C49A58]' : 'text-[#654332]'} block">
                      Titles, metric measurements & English steps
                    </span>
                  </div>
                </div>
                <input type="radio" name="outputLanguage" value="en" ${formState.outputLanguage === 'en' ? 'checked' : ''} class="sr-only"/>
              </label>
            </div>
          </div>
        </section>

        <!-- SECTION 2: Ingredient Selection (Searchable, categorized, multi-select) -->
        <section class="bg-white p-6 sm:p-8 rounded-3xl border border-[#C49A58]/25 shadow-xs space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5D9C5]">
            <div class="space-y-0.5">
              <span class="text-[11px] font-bold text-[#B85C38] uppercase tracking-wider">Bagian 2 • Seleksi Bahan & Rempah</span>
              <h2 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#302018]">
                ${isEn ? '2. Select Authentic Ingredients' : '2. Pilih Bahan & Rempah Pilihan'}
              </h2>
            </div>
            
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold px-3 py-1 rounded-full ${selectedCount >= 1 ? 'bg-[#302018] text-[#FAF6EF]' : 'bg-rose-100 text-rose-800'}">
                ${selectedCount} ${isEn ? 'Items Selected' : 'Bahan Dipilih'}
              </span>
              ${selectedCount > 0 ? `
                <button type="button" id="clear-all-ingredients-btn" class="text-xs font-bold text-rose-600 hover:text-rose-800 underline">
                  ${isEn ? 'Clear All' : 'Hapus Semua'}
                </button>
              ` : ''}
            </div>
          </div>

          <!-- Active Ingredients Chips Bar -->
          <div class="p-3.5 rounded-2xl bg-[#FAF6EF] border border-[#E5D9C5] space-y-2">
            <div class="text-[11px] font-bold text-[#654332] uppercase tracking-wider flex items-center justify-between">
              <span>${isEn ? 'Active Selection in Pot:' : 'Bahan yang Masuk ke Wajan Eksperimen:'}</span>
              <span class="text-[#777B52]">${selectedCount === 0 ? (isEn ? 'Select at least 1 ingredient' : 'Pilih minimal 1 bahan') : (isEn ? 'Ready to blend' : 'Siap diracik')}</span>
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${selectedCount === 0 ? `
                <span class="text-xs italic text-[#855C47]">
                  ${isEn ? 'Belum ada bahan dipilih. Klik pada bahan di bawah untuk menambahkan.' : 'Belum ada bahan dipilih. Silakan pilih bahan dari katalog di bawah.'}
                </span>
              ` : formState.selectedIngredientIds.map(id => {
                const item = ALL_INGREDIENTS.find(i => i.id === id);
                if (!item) return '';
                return `
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#C49A58]/40 text-xs font-semibold text-[#302018] shadow-2xs">
                    <span>${item.icon || '🌿'}</span>
                    <span>${isEn ? (item.nameEn || item.nameId) : item.nameId}</span>
                    <button type="button" data-remove-ingredient="${item.id}" class="text-[#B85C38] hover:text-rose-700 font-bold ml-1 text-sm">&times;</button>
                  </span>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Controls: Category Tabs & Search Bar -->
          <div class="flex flex-col md:flex-row gap-3 items-stretch justify-between">
            <!-- Tabs -->
            <div class="inline-flex p-1 rounded-xl bg-[#FAF6EF] border border-[#E5D9C5] overflow-x-auto text-xs font-bold text-[#654332]">
              <button type="button" data-tab="all" class="px-3.5 py-1.5 rounded-lg transition-all ${activeTab === 'all' ? 'bg-[#302018] text-[#FAF6EF] shadow-xs' : 'hover:text-[#B85C38]'}">
                ${isEn ? 'All Ingredients' : 'Semua Bahan'}
              </button>
              <button type="button" data-tab="protein" class="px-3.5 py-1.5 rounded-lg transition-all ${activeTab === 'protein' ? 'bg-[#302018] text-[#FAF6EF] shadow-xs' : 'hover:text-[#B85C38]'}">
                🥩 ${isEn ? 'Proteins & Staples' : 'Protein & Pokok'}
              </button>
              <button type="button" data-tab="spice" class="px-3.5 py-1.5 rounded-lg transition-all ${activeTab === 'spice' ? 'bg-[#302018] text-[#FAF6EF] shadow-xs' : 'hover:text-[#B85C38]'}">
                🌿 ${isEn ? 'Spices & Aromatics' : 'Rempah Aromatik'}
              </button>
              <button type="button" data-tab="vegetable" class="px-3.5 py-1.5 rounded-lg transition-all ${activeTab === 'vegetable' ? 'bg-[#302018] text-[#FAF6EF] shadow-xs' : 'hover:text-[#B85C38]'}">
                🥬 ${isEn ? 'Vegetables & Extras' : 'Sayur & Pelengkap'}
              </button>
            </div>

            <!-- Instant Filter Search Input -->
            <div class="relative w-full md:w-72">
              <input 
                type="text" 
                id="ingredient-search-input" 
                placeholder="${isEn ? 'Search ingredients...' : 'Cari bahan / rempah...'}" 
                value="${escapeHtml(searchQuery)}"
                class="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF6EF] border border-[#E5D9C5] text-xs text-[#302018] focus:outline-hidden focus:ring-2 focus:ring-[#B85C38]"
              />
              <svg class="w-4 h-4 text-[#777B52] absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </div>
          </div>

          <!-- Ingredients Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-[32rem] overflow-y-auto p-1.5 custom-scrollbar">
            ${filteredIngredients.map(item => {
              const isSelected = formState.selectedIngredientIds.includes(item.id);
              const imgSrc = item.image || `/assets/images/ingredients/${item.id}.jpg`;
              return `
                <button 
                  type="button" 
                  data-ingredient-id="${item.id}"
                  class="ingredient-select-card group p-2 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 relative overflow-hidden ${
                    isSelected 
                      ? 'bg-[#302018] text-[#FAF6EF] border-[#B85C38] shadow-md ring-2 ring-[#B85C38]' 
                      : 'bg-white hover:bg-[#FAF6EF] text-[#302018] border-[#E5D9C5] hover:border-[#C49A58] shadow-2xs'
                  }"
                >
                  <div class="relative w-full h-24 rounded-xl overflow-hidden bg-[#FAF6EF] border border-[#E5D9C5]/60 mb-2">
                    <img 
                      src="${imgSrc}" 
                      alt="${escapeHtml(item.nameId)}" 
                      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');"
                    />
                    <div class="hidden w-full h-full flex items-center justify-center text-2xl bg-[#E5D9C5]/40">
                      ${item.icon || '🌿'}
                    </div>
                    <div class="absolute top-1.5 right-1.5 w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold shadow-xs transition-colors ${
                      isSelected ? 'bg-[#B85C38] border-white text-white' : 'bg-white/80 border-[#C49A58]/50 text-transparent'
                    }">✓</div>
                    <div class="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md bg-[#302018]/75 backdrop-blur-xs text-[10px] text-white flex items-center gap-1">
                      <span>${item.icon || '🌿'}</span>
                    </div>
                  </div>
                  <div class="px-1 flex-1 flex flex-col justify-between">
                    <div class="text-xs font-bold leading-tight line-clamp-2">
                      ${isEn ? (item.nameEn || item.nameId) : item.nameId}
                    </div>
                    ${(item.flavorNote || item.description) ? `
                      <span class="text-[9px] ${isSelected ? 'text-[#C49A58]' : 'text-[#777B52]'} line-clamp-1 mt-1 block">
                        ${item.flavorNote || item.description}
                      </span>
                    ` : ''}
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </section>

        <!-- SECTION 3: Culinary Preferences (Method, Category, Taste, Spice, Duration, Servings, Equipment) -->
        <section class="bg-white p-6 sm:p-8 rounded-3xl border border-[#C49A58]/25 shadow-xs space-y-8">
          <div class="pb-4 border-b border-[#E5D9C5]">
            <span class="text-[11px] font-bold text-[#B85C38] uppercase tracking-wider">Bagian 3 • Preferensi & Filosofi Dapur</span>
            <h2 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#302018]">
              ${isEn ? '3. Cooking Preferences & Technique' : '3. Karakter Rasa & Teknik Pengolahan'}
            </h2>
          </div>

          <!-- Cooking Method -->
          <div class="space-y-3">
            <label class="block text-xs font-bold text-[#302018] uppercase tracking-wider">
              ${isEn ? 'Cooking Method' : 'Metode Utama Pengolahan'}
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              ${PREFERENCE_OPTIONS.cookingMethods.map(m => {
                const isSelected = formState.cookingMethod === m.id;
                return `
                  <label class="p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-[#302018] text-[#FAF6EF] border-[#B85C38] ring-2 ring-[#B85C38]' 
                      : 'bg-[#FAF6EF]/60 hover:bg-[#FAF6EF] text-[#302018] border-[#E5D9C5]'
                  }">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold">${isEn ? m.labelEn : m.labelId}</span>
                      <input type="radio" name="cookingMethod" value="${m.id}" ${isSelected ? 'checked' : ''} class="sr-only"/>
                    </div>
                    <p class="text-[10px] ${isSelected ? 'text-[#C49A58]' : 'text-[#654332]'} mt-2 leading-relaxed">
                      ${m.descId}
                    </p>
                  </label>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Dish Category & Taste Profile -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Category -->
            <div class="space-y-2">
              <label for="dish-category-select" class="block text-xs font-bold text-[#302018] uppercase tracking-wider">
                ${isEn ? 'Dish Category' : 'Kategori Sajian'}
              </label>
              <select 
                id="dish-category-select" 
                name="dishCategory"
                class="w-full px-4 py-3 rounded-xl bg-[#FAF6EF] border border-[#E5D9C5] text-xs sm:text-sm font-semibold text-[#302018] focus:ring-2 focus:ring-[#B85C38]"
              >
                ${PREFERENCE_OPTIONS.dishCategories.map(c => `
                  <option value="${c.id}" ${formState.dishCategory === c.id ? 'selected' : ''}>
                    ${isEn ? c.labelEn : c.labelId}
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- Taste Profile -->
            <div class="space-y-2">
              <label for="taste-profile-select" class="block text-xs font-bold text-[#302018] uppercase tracking-wider">
                ${isEn ? 'Target Taste Profile' : 'Profil Spektrum Rasa yang Diinginkan'}
              </label>
              <select 
                id="taste-profile-select" 
                name="tasteProfile"
                class="w-full px-4 py-3 rounded-xl bg-[#FAF6EF] border border-[#E5D9C5] text-xs sm:text-sm font-semibold text-[#302018] focus:ring-2 focus:ring-[#B85C38]"
              >
                ${PREFERENCE_OPTIONS.tasteProfiles.map(tp => `
                  <option value="${tp.id}" ${formState.tasteProfile === tp.id ? 'selected' : ''}>
                    ${isEn ? tp.labelEn : tp.labelId}
                  </option>
                `).join('')}
              </select>
            </div>
          </div>

          <!-- Spice Level, Duration, and Servings -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <!-- Spice Level -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-[#302018] uppercase tracking-wider">
                ${isEn ? 'Spice Level' : 'Tingkat Kepedasan'}
              </label>
              <div class="grid grid-cols-2 gap-2">
                ${PREFERENCE_OPTIONS.spiceLevels.map(sl => {
                  const isSelected = formState.spiceLevel === sl.id;
                  return `
                    <label class="p-2.5 rounded-xl border text-xs font-semibold cursor-pointer text-center transition-all ${
                      isSelected 
                        ? 'bg-[#302018] text-[#FAF6EF] border-[#B85C38] ring-1 ring-[#B85C38]' 
                        : 'bg-[#FAF6EF] text-[#654332] border-[#E5D9C5]'
                    }">
                      <input type="radio" name="spiceLevel" value="${sl.id}" ${isSelected ? 'checked' : ''} class="sr-only"/>
                      <span>${sl.icon} ${isEn ? sl.labelEn : sl.labelId}</span>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Duration -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-[#302018] uppercase tracking-wider">
                ${isEn ? 'Target Duration' : 'Waktu Memasak'}
              </label>
              <div class="space-y-2">
                ${PREFERENCE_OPTIONS.cookingDurations.map(cd => {
                  const isSelected = formState.cookingDuration === cd.id;
                  return `
                    <label class="block p-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-[#302018] text-[#FAF6EF] border-[#B85C38]' 
                        : 'bg-[#FAF6EF] text-[#654332] border-[#E5D9C5]'
                    }">
                      <input type="radio" name="cookingDuration" value="${cd.id}" ${isSelected ? 'checked' : ''} class="sr-only"/>
                      <span>⏱ ${isEn ? cd.labelEn : cd.labelId}</span>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Servings -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-[#302018] uppercase tracking-wider">
                ${isEn ? 'Servings Size' : 'Jumlah Porsi Santap'}
              </label>
              <div class="grid grid-cols-5 gap-1.5">
                ${PREFERENCE_OPTIONS.servings.map(s => {
                  const isSelected = formState.servings === s;
                  return `
                    <label class="p-3 rounded-xl border text-center font-bold text-xs cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-[#B85C38] text-white border-[#B85C38] shadow-xs' 
                        : 'bg-[#FAF6EF] text-[#302018] border-[#E5D9C5]'
                    }">
                      <input type="radio" name="servings" value="${s}" ${isSelected ? 'checked' : ''} class="sr-only"/>
                      <div>${s}</div>
                      <div class="text-[9px] font-normal opacity-80">${isEn ? 'srv' : 'porsi'}</div>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Equipment & Dietary Notes -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E5D9C5]">
            <!-- Equipment -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-[#302018] uppercase tracking-wider">
                ${isEn ? 'Kitchen Equipment Available' : 'Peralatan Dapur yang Digunakan'}
              </label>
              <div class="grid grid-cols-2 gap-2">
                ${PREFERENCE_OPTIONS.equipmentList.map(eq => {
                  const isChecked = formState.equipment.includes(eq.id);
                  return `
                    <label class="p-2.5 rounded-xl border text-xs font-semibold cursor-pointer flex items-center gap-2 ${
                      isChecked ? 'bg-[#302018] text-[#FAF6EF] border-[#B85C38]' : 'bg-[#FAF6EF] text-[#654332] border-[#E5D9C5]'
                    }">
                      <input type="checkbox" name="equipment" value="${eq.id}" ${isChecked ? 'checked' : ''} class="rounded text-[#B85C38]"/>
                      <span>${isEn ? eq.labelEn : eq.labelId}</span>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Dietary Requirements -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-[#302018] uppercase tracking-wider">
                ${isEn ? 'Dietary / Restrictions' : 'Preferensi Diet & Pantangan'}
              </label>
              <div class="grid grid-cols-2 gap-2">
                ${PREFERENCE_OPTIONS.dietaryOptions.map(diet => {
                  const isChecked = formState.dietary.includes(diet.id);
                  return `
                    <label class="p-2.5 rounded-xl border text-xs font-semibold cursor-pointer flex items-center gap-2 ${
                      isChecked ? 'bg-[#302018] text-[#FAF6EF] border-[#B85C38]' : 'bg-[#FAF6EF] text-[#654332] border-[#E5D9C5]'
                    }">
                      <input type="checkbox" name="dietary" value="${diet.id}" ${isChecked ? 'checked' : ''} class="rounded text-[#B85C38]"/>
                      <span>${isEn ? diet.labelEn : diet.labelId}</span>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Custom Notes / Creative Vision -->
          <div class="space-y-2 pt-2">
            <label for="custom-notes-input" class="block text-xs font-bold text-[#302018] uppercase tracking-wider">
              ${isEn ? 'Creative Vision & Custom Notes (Optional)' : 'Visi Rasa & Catatan Kreatif Anda (Opsional)'}
            </label>
            <textarea 
              id="custom-notes-input" 
              name="customNotes"
              rows="2"
              placeholder="${isEn ? 'e.g., I want an aromatic torch ginger kick with a creamy yet light golden coconut sauce...' : 'Contoh: Ingin aroma kecombrang yang kuat, kuah santan tidak terlalu kental, dan rasa pedas yang hangat di tenggorokan...'}"
              class="w-full px-4 py-3 rounded-xl bg-[#FAF6EF] border border-[#E5D9C5] text-xs sm:text-sm text-[#302018] focus:ring-2 focus:ring-[#B85C38]"
            >${escapeHtml(formState.customNotes)}</textarea>
          </div>
        </section>

        <!-- SECTION 4: Poster Art Direction (Visual Style & Aspect Ratio) -->
        <section class="bg-white p-6 sm:p-8 rounded-3xl border border-[#C49A58]/25 shadow-xs space-y-6">
          <div class="pb-4 border-b border-[#E5D9C5]">
            <span class="text-[11px] font-bold text-[#B85C38] uppercase tracking-wider">Bagian 4 • Tata Artistik Poster Kanvas</span>
            <h2 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#302018]">
              ${isEn ? '4. High-DPI Poster Style & Aspect Ratio' : '4. Gaya Ilustrasi & Format Rasio Poster'}
            </h2>
          </div>

          <!-- Style Picker -->
          <div class="space-y-2">
            <label class="block text-xs font-bold text-[#302018] uppercase tracking-wider">
              ${isEn ? 'Illustration Artwork Style' : 'Gaya Visual Karya Poster'}
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              ${PREFERENCE_OPTIONS.imageStyles.map(st => {
                const isSelected = formState.imageStyle === st.id;
                return `
                  <label class="p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-[#302018] text-[#FAF6EF] border-[#B85C38] ring-2 ring-[#B85C38]' 
                      : 'bg-[#FAF6EF]/60 hover:bg-[#FAF6EF] text-[#302018] border-[#E5D9C5]'
                  }">
                    <div>
                      <div class="flex items-center justify-between mb-1.5">
                        <span class="text-xs font-bold">${isEn ? st.labelEn : st.labelId}</span>
                        <input type="radio" name="imageStyle" value="${st.id}" ${isSelected ? 'checked' : ''} class="sr-only"/>
                      </div>
                      <p class="text-[10px] ${isSelected ? 'text-[#C49A58]' : 'text-[#654332]'} leading-relaxed">
                        ${st.descId}
                      </p>
                    </div>
                  </label>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Aspect Ratio Picker -->
          <div class="space-y-2 pt-2">
            <label class="block text-xs font-bold text-[#302018] uppercase tracking-wider">
              ${isEn ? 'Poster Canvas Aspect Ratio' : 'Rasio Kanvas Poster'}
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              ${PREFERENCE_OPTIONS.aspectRatios.map(ar => {
                const isSelected = formState.aspectRatio === ar.id;
                return `
                  <label class="p-3.5 rounded-xl border text-xs font-bold cursor-pointer text-center transition-all ${
                    isSelected 
                      ? 'bg-[#B85C38] text-white border-[#B85C38] shadow-xs' 
                      : 'bg-[#FAF6EF] text-[#302018] border-[#E5D9C5]'
                  }">
                    <input type="radio" name="aspectRatio" value="${ar.id}" ${isSelected ? 'checked' : ''} class="sr-only"/>
                    <div>${ar.label}</div>
                    <div class="text-[10px] font-normal opacity-85 mt-0.5">
                      ${ar.width} x ${ar.height} px
                    </div>
                  </label>
                `;
              }).join('')}
            </div>
          </div>
        </section>

        <!-- CTA Action Bar -->
        <div class="p-6 rounded-3xl bg-gradient-to-r from-[#302018] to-[#1F140F] border border-[#C49A58]/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-left space-y-1">
            <h3 class="font-editorial-serif text-lg font-bold text-[#FAF6EF]">
              ${isEn ? 'Ready to synthesize your original dish?' : 'Sudah siap meracik hidangan orisinal Anda?'}
            </h3>
            <p class="text-xs text-[#FAF6EF]/75">
              ${isEn 
                ? 'Your experiment is generated on-demand without permanent database writes.' 
                : 'Eksperimen Anda diracik secara instan dan dapat diunduh langsung sebagai poster PNG & panduan resep PDF.'}
            </p>
          </div>

          <button 
            type="submit" 
            id="generate-recipe-submit-btn"
            class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#B85C38] hover:bg-[#A04A27] text-[#FAF6EF] font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <svg class="w-5 h-5 text-[#FAF6EF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
            </svg>
            <span>${isEn ? 'Synthesize Recipe & Poster' : '✨ Ciptakan Resep & Poster Sekarang'}</span>
          </button>
        </div>

      </form>

    </div>
  `;
}

function renderResultView(recipe, currentLang) {
  const isEn = currentLang === 'en';

  return `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <!-- Top Navigation & Success Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5D9C5]">
        <div class="space-y-1">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            ✓ ${isEn ? 'Recipe & Poster Synthesized Successfully' : 'Resep & Poster Berhasil Diciptakan'}
          </span>
          <h1 class="font-editorial-serif text-2xl sm:text-4xl font-bold text-[#302018]">
            ${recipe.title}
          </h1>
          <p class="text-xs text-[#777B52]">
            ${isEn ? 'Official Culinary Document' : 'Koleksi Eksperimen Dapur Orisinal'} • ID: ${recipe.id}
          </p>
        </div>

        <div class="flex items-center gap-2.5">
          <button 
            type="button" 
            id="create-another-recipe-btn"
            class="px-4 py-2.5 rounded-xl border border-[#C49A58] bg-white hover:bg-[#FAF6EF] text-[#302018] text-xs font-bold transition-all shadow-2xs"
          >
            ← ${isEn ? 'Create Another Recipe' : 'Ciptakan Resep Lain'}
          </button>
        </div>
      </div>

      <!-- Main Two-Column Layout (Left: Canvas Poster & Downloads | Right: Complete Recipe) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        <!-- LEFT COLUMN: Canvas Poster & Actions (5 cols) -->
        <div class="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          <!-- Poster Preview Container -->
          <div class="bg-white p-4 rounded-3xl border border-[#C49A58]/30 shadow-lg space-y-4">
            <div class="flex items-center justify-between text-xs font-bold text-[#654332] px-1">
              <span class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-[#B85C38]"></span>
                ${isEn ? 'High-DPI Canvas Poster' : 'Poster Resmi Kanvas HTML5'}
              </span>
              <span class="text-[10px] text-[#777B52] uppercase font-mono">${recipe.aspectRatio}</span>
            </div>

            <div class="relative rounded-2xl overflow-hidden bg-[#302018] border border-[#E5D9C5] shadow-inner flex items-center justify-center">
              <canvas 
                id="food-poster-canvas" 
                class="w-full h-auto max-h-[520px] object-contain block"
              ></canvas>
            </div>

            <!-- Download Buttons Grid (PNG, JPEG, PDF Guide, and Certificate) -->
            <div class="space-y-2.5 pt-2">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button 
                  type="button" 
                  id="download-poster-btn"
                  class="w-full px-4 py-3 rounded-xl bg-[#302018] hover:bg-[#1F140F] text-[#FAF6EF] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  <svg class="w-4 h-4 text-[#C49A58]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  <span>${isEn ? 'Poster (PNG)' : 'Unduh Poster (PNG)'}</span>
                </button>

                <button 
                  type="button" 
                  id="download-poster-jpeg-btn"
                  class="w-full px-4 py-3 rounded-xl bg-[#654332] hover:bg-[#4A2C1A] text-[#FAF6EF] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
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
                  class="w-full px-4 py-3 rounded-xl bg-[#B85C38] hover:bg-[#A04A27] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                  </svg>
                  <span>${isEn ? 'Recipe Guide (PDF)' : 'Unduh Resep (PDF)'}</span>
                </button>

                <button 
                  type="button" 
                  id="download-cert-btn"
                  class="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#C49A58] via-[#B85C38] to-[#654332] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="8" r="6"/>
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                  </svg>
                  <span>${t('certificate.downloadBtn')}</span>
                </button>
              </div>
            </div>

            <!-- In-Memory Image Regeneration Control Panel -->
            <div class="pt-4 border-t border-[#E5D9C5] space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-[#302018]">
                  ${isEn ? 'Regenerate Poster Art' : 'Regenerasi Poster / Gambar'}
                </span>
                <span class="text-[10px] text-[#777B52]">${isEn ? 'Preserves recipe data' : 'Resep tetap tersimpan'}</span>
              </div>

              <div class="grid grid-cols-2 gap-2 text-xs">
                <select id="regen-style-select" class="px-2.5 py-1.5 rounded-lg bg-[#FAF6EF] border border-[#E5D9C5] text-xs font-medium text-[#302018]">
                  ${PREFERENCE_OPTIONS.imageStyles.map(st => `
                    <option value="${st.id}" ${recipe.imageStyle === st.id ? 'selected' : ''}>
                      ${isEn ? st.labelEn : st.labelId}
                    </option>
                  `).join('')}
                </select>

                <select id="regen-ratio-select" class="px-2.5 py-1.5 rounded-lg bg-[#FAF6EF] border border-[#E5D9C5] text-xs font-medium text-[#302018]">
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
                class="w-full py-2 px-3 rounded-lg bg-[#F2E8D8] hover:bg-[#E5D9C5] text-[#302018] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
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

          <!-- Creator Certificate Badge -->
          <div class="p-5 rounded-2xl bg-gradient-to-br from-[#302018] to-[#1F140F] text-[#FAF6EF] border border-[#C49A58]/30 space-y-3">
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
                ? `This original recipe concept is credited to <strong>${escapeHtml(recipe.creatorName)}</strong> in celebration of Central Javanese flavor exploration.` 
                : `Konsep resep orisinal ini secara resmi tercatat diciptakan oleh <strong>${escapeHtml(recipe.creatorName)}</strong> sebagai wujud apresiasi eksplorasi rasa Jawa Tengah.`}
            </p>
            <button 
              type="button" 
              id="download-cert-badge-btn"
              class="w-full py-2.5 px-3 rounded-xl bg-[#FAF6EF]/10 hover:bg-[#FAF6EF]/20 text-[#FAF6EF] text-xs font-bold border border-[#C49A58]/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg class="w-4 h-4 text-[#C49A58]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="8" r="6"/>
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
              </svg>
              <span>${isEn ? 'Download Certificate (PDF)' : 'Unduh Piagam Apresiasi (PDF)'}</span>
            </button>
          </div>

        </div>

        <!-- RIGHT COLUMN: Structured Recipe Details (7 cols) -->
        <div class="lg:col-span-7 space-y-8">
          
          <!-- Recipe Overview Card -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#C49A58]/25 shadow-xs space-y-5">
            <div class="space-y-2">
              <span class="text-xs font-bold text-[#B85C38] uppercase tracking-wider">
                ${recipe.javaneseTitle}
              </span>
              <h2 class="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#302018]">
                ${recipe.shortTitle}
              </h2>
              <p class="text-xs sm:text-sm text-[#654332] leading-relaxed">
                ${recipe.description}
              </p>
            </div>

            <!-- Metadata Metrics Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#E5D9C5] text-xs">
              <div class="p-3 rounded-xl bg-[#FAF6EF] space-y-0.5">
                <span class="text-[#777B52] block text-[10px] font-semibold">${isEn ? 'Total Time' : 'Total Waktu'}</span>
                <strong class="text-[#302018] font-bold">${recipe.totalTime}</strong>
              </div>
              <div class="p-3 rounded-xl bg-[#FAF6EF] space-y-0.5">
                <span class="text-[#777B52] block text-[10px] font-semibold">${isEn ? 'Servings' : 'Porsi'}</span>
                <strong class="text-[#302018] font-bold">${recipe.servings} ${isEn ? 'Servings' : 'Porsi'}</strong>
              </div>
              <div class="p-3 rounded-xl bg-[#FAF6EF] space-y-0.5">
                <span class="text-[#777B52] block text-[10px] font-semibold">${isEn ? 'Difficulty' : 'Tingkat'}</span>
                <strong class="text-[#302018] font-bold">${recipe.difficulty}</strong>
              </div>
              <div class="p-3 rounded-xl bg-[#FAF6EF] space-y-0.5">
                <span class="text-[#777B52] block text-[10px] font-semibold">${isEn ? 'Est. Cost' : 'Estimasi Biaya'}</span>
                <strong class="text-[#302018] font-bold">${recipe.estimatedCost}</strong>
              </div>
            </div>
          </div>

          <!-- Scaled Ingredients with Checkboxes -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#C49A58]/25 shadow-xs space-y-5">
            <div class="flex items-center justify-between pb-3 border-b border-[#E5D9C5]">
              <div class="space-y-0.5">
                <h3 class="font-editorial-serif text-xl font-bold text-[#302018]">
                  ${isEn ? 'Ingredients & Precise Quantities' : 'Daftar Bahan & Takaran Presisi'}
                </h3>
                <span class="text-xs text-[#777B52]">
                  ${isEn ? `Calibrated for ${recipe.servings} family servings` : `Dikalibrasi untuk ${recipe.servings} porsi keluarga`}
                </span>
              </div>
              <span class="text-xs font-bold text-[#B85C38] bg-[#F2E8D8] px-3 py-1 rounded-full">
                ${recipe.ingredients.length} ${isEn ? 'Items' : 'Bahan'}
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              ${recipe.ingredients.map((ing, i) => `
                <label class="p-3 rounded-xl bg-[#FAF6EF]/60 hover:bg-[#FAF6EF] border border-[#E5D9C5] text-xs flex items-center justify-between gap-3 cursor-pointer transition-colors">
                  <div class="flex items-center gap-2.5">
                    <input type="checkbox" class="rounded text-[#B85C38] focus:ring-[#B85C38]"/>
                    <div>
                      <strong class="text-[#302018] block">${ing.name}</strong>
                      <span class="text-[10px] text-[#777B52]">${ing.note}</span>
                    </div>
                  </div>
                  <span class="font-bold text-[#B85C38] shrink-0 text-right">
                    ${ing.amount} ${ing.unit}
                  </span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- Cooking Steps with Sensory Milestones -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#C49A58]/25 shadow-xs space-y-6">
            <div class="pb-3 border-b border-[#E5D9C5]">
              <h3 class="font-editorial-serif text-xl font-bold text-[#302018]">
                ${isEn ? 'Step-by-Step Cooking Guide' : 'Tahapan Memasak Berurutan'}
              </h3>
              <p class="text-xs text-[#654332]">
                ${isEn ? 'Follow the sensory cues to achieve authentic Javanese flavor harmony.' : 'Perhatikan isyarat panca indera agar bumbu meresap sempurna.'}
              </p>
            </div>

            <div class="space-y-5">
              ${recipe.steps.map(step => `
                <div class="flex items-start gap-4 p-4 rounded-2xl bg-[#FAF6EF]/40 border border-[#E5D9C5]">
                  <div class="w-8 h-8 rounded-full bg-[#302018] text-[#C49A58] font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                    ${step.stepNumber}
                  </div>
                  <div class="space-y-2 flex-1">
                    <h4 class="font-bold text-sm text-[#302018]">${step.title}</h4>
                    <p class="text-xs text-[#654332] leading-relaxed">
                      ${step.instruction}
                    </p>
                    <div class="p-2 rounded-lg bg-white border border-[#C49A58]/25 text-[11px] text-[#777B52] italic flex items-center gap-1.5">
                      <span class="text-[#B85C38] font-bold">Isyarat:</span>
                      <span>"${step.sensoryMilestone}"</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Chef Secrets & Safety Notes -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="p-5 rounded-2xl bg-[#FAF6EF] border border-[#C49A58]/30 space-y-2 text-xs">
              <div class="flex items-center gap-1.5 font-bold text-[#B85C38]">
                <span>★</span>
                <span>${isEn ? 'Chef\'s Kitchen Secret' : 'Rahasia Dapur Chef'}</span>
              </div>
              <p class="text-[#654332] leading-relaxed">
                ${recipe.chefTips}
              </p>
            </div>

            <div class="p-5 rounded-2xl bg-white border border-[#E5D9C5] space-y-2 text-xs">
              <div class="flex items-center gap-1.5 font-bold text-[#302018]">
                <span>🛡</span>
                <span>${isEn ? 'Food Safety & Storage' : 'Keamanan & Penyimpanan'}</span>
              </div>
              <p class="text-[#654332] leading-relaxed">
                ${recipe.safetyNotes}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
}

/**
 * Initialize all interactive listeners for the AI Food Creator page.
 */
export function initAiFoodCreatorInteractions() {
  const form = document.getElementById('ai-creator-form');

  // Dismiss validation banner
  const dismissBtn = document.getElementById('dismiss-val-btn');
  if (dismissBtn) {
    dismissBtn.onclick = () => {
      validationMessage = null;
      reRenderCurrentView();
    };
  }

  // Name Inputs
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
      // Keep focus on input
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

  // Radio button groups and dropdowns
  setupRadioGroup('outputLanguage', (val) => { formState.outputLanguage = val; });
  setupRadioGroup('cookingMethod', (val) => { formState.cookingMethod = val; });
  setupRadioGroup('spiceLevel', (val) => { formState.spiceLevel = parseInt(val) || 0; });
  setupRadioGroup('cookingDuration', (val) => { formState.cookingDuration = val; });
  setupRadioGroup('servings', (val) => { formState.servings = parseInt(val) || 4; });
  setupRadioGroup('imageStyle', (val) => { formState.imageStyle = val; });
  setupRadioGroup('aspectRatio', (val) => { formState.aspectRatio = val; });

  const catSelect = document.getElementById('dish-category-select');
  if (catSelect) {
    catSelect.onchange = (e) => { formState.dishCategory = e.target.value; };
  }

  const tasteSelect = document.getElementById('taste-profile-select');
  if (tasteSelect) {
    tasteSelect.onchange = (e) => { formState.tasteProfile = e.target.value; };
  }

  const notesText = document.getElementById('custom-notes-input');
  if (notesText) {
    notesText.oninput = (e) => { formState.customNotes = e.target.value; };
  }

  // Checkboxes (Equipment & Dietary)
  const eqChecks = document.querySelectorAll('input[name="equipment"]');
  eqChecks.forEach(cb => {
    cb.onchange = () => {
      formState.equipment = Array.from(eqChecks).filter(c => c.checked).map(c => c.value);
    };
  });

  const dietChecks = document.querySelectorAll('input[name="dietary"]');
  dietChecks.forEach(cb => {
    cb.onchange = () => {
      formState.dietary = Array.from(dietChecks).filter(c => c.checked).map(c => c.value);
    };
  });

  // Form Submit Handler
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();

      // Validation 1: Creator Name
      if (!formState.creatorName || formState.creatorName.trim().length === 0) {
        validationMessage = 'Nama lengkap pencipta resep wajib diisi untuk tanda bukti kepemilikan cipta resep.';
        reRenderCurrentView();
        window.scrollTo({ top: 120, behavior: 'smooth' });
        return;
      }

      // Validation 2: Ingredients count
      if (!formState.selectedIngredientIds || formState.selectedIngredientIds.length === 0) {
        validationMessage = 'Pilih minimal 1 bahan atau rempah untuk memulai penciptaan resep kuliner.';
        reRenderCurrentView();
        window.scrollTo({ top: 350, behavior: 'smooth' });
        return;
      }

      // Trigger generation
      isGenerating = true;
      reRenderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });

      try {
        const recipe = await aiFoodCreatorService.generateRecipe(formState);
        currentGeneratedRecipe = recipe;
        isGenerating = false;
        reRenderCurrentView();

        // Render Canvas after DOM update
        requestAnimationFrame(() => {
          const canvas = document.getElementById('food-poster-canvas');
          if (canvas) {
            aiFoodCreatorService.composePosterCanvas(canvas, recipe);
          }
        });
      } catch (err) {
        console.error('Error generating recipe:', err);
        validationMessage = err.message || 'Gagal meracik resep. Silakan coba lagi.';
        isGenerating = false;
        reRenderCurrentView();
      }
    };
  }

  // --- RESULT VIEW LISTENERS ---
  const canvas = document.getElementById('food-poster-canvas');
  if (canvas && currentGeneratedRecipe) {
    aiFoodCreatorService.composePosterCanvas(canvas, currentGeneratedRecipe);
  }

  // Download Poster (PNG)
  const downloadPosterBtn = document.getElementById('download-poster-btn');
  if (downloadPosterBtn && canvas && currentGeneratedRecipe) {
    downloadPosterBtn.onclick = () => {
      aiFoodCreatorService.downloadPoster(canvas, currentGeneratedRecipe.shortTitle, 'png');
    };
  }

  // Download Poster (JPEG)
  const downloadPosterJpegBtn = document.getElementById('download-poster-jpeg-btn');
  if (downloadPosterJpegBtn && canvas && currentGeneratedRecipe) {
    downloadPosterJpegBtn.onclick = () => {
      aiFoodCreatorService.downloadPoster(canvas, currentGeneratedRecipe.shortTitle, 'jpeg');
    };
  }

  // Download PDF
  const downloadPdfBtn = document.getElementById('download-pdf-btn');
  if (downloadPdfBtn && currentGeneratedRecipe) {
    downloadPdfBtn.onclick = async () => {
      downloadPdfBtn.disabled = true;
      downloadPdfBtn.innerText = 'Menyusun PDF...';
      try {
        await aiFoodCreatorService.generateRecipePdf(currentGeneratedRecipe, canvas);
      } finally {
        downloadPdfBtn.disabled = false;
        downloadPdfBtn.innerHTML = `
          <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
          </svg>
          <span>Unduh Resep (PDF)</span>
        `;
      }
    };
  }

  // Download Certificate
  const certBtns = [
    document.getElementById('download-cert-btn'),
    document.getElementById('download-cert-badge-btn')
  ].filter(Boolean);

  certBtns.forEach(btn => {
    btn.onclick = async () => {
      const isEn = (currentGeneratedRecipe?.outputLanguage === 'en') || (i18n?.getLanguage && i18n.getLanguage() === 'en');
      const origHtml = btn.innerHTML;
      btn.disabled = true;
      btn.innerText = isEn ? 'Composing Certificate (PDF)...' : 'Menyusun Piagam (PDF)...';
      try {
        await aiFoodCreatorService.generateCertificatePdf(currentGeneratedRecipe, {
          lang: isEn ? 'en' : 'id'
        });
      } finally {
        btn.disabled = false;
        btn.innerHTML = origHtml;
      }
    };
  });

  // Regenerate Poster
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
    };
  }

  // Create Another Recipe
  const resetBtn = document.getElementById('create-another-recipe-btn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      currentGeneratedRecipe = null;
      reRenderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }
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

