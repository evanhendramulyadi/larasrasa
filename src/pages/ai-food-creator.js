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
 * - Culinary preferences: method, category, taste profile, spice level, duration, equipment, dietary
 * - Empty state output dashboard ready for Supabase backend integration
 * - Zero bugs, responsive design, intuitive UX
 */

// Transient Page State
let activeTab = 'all'; // 'all', 'protein', 'spice', 'vegetable'
let searchQuery = '';
let currentStudioView = 'form'; // 'form' | 'output'
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

let validationMessage = null;
let toastMessage = null;

export async function renderAiFoodCreatorPage() {
  const currentLang = i18n?.getLanguage ? i18n.getLanguage() : 'id';

  if (currentStudioView === 'output') {
    return renderEmptyOutputView(currentLang);
  }

  return renderFormView(currentLang);
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
      
      <!-- Studio Header with Traditional Javanese Kitchen Backdrop -->
      <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto border border-[#C49A58]/35 shadow-xl bg-[#24140D] text-[#FAF6EF]">
        <img 
          src="/assets/images/hero/javanese-kitchen-master.jpg" 
          alt="Pawon Dapur Jawa Tengah" 
          class="absolute inset-0 w-full h-full object-cover opacity-35 filter brightness-[0.8] contrast-[1.1] pointer-events-none"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#24140D] via-[#24140D]/80 to-[#24140D]/90 pointer-events-none"></div>
        
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
              ? 'Select authentic regional ingredients, calibrate traditional flavors, and configure your culinary blueprint ready for Supabase backend synthesis.'
              : 'Pilih bahan & rempah otentik Jawa Tengah, atur karakter rasa khas pawon tradisional, dan siapkan parameter resep yang siap disinkronkan ke backend Supabase.'}
          </p>
        </div>
      </div>

      <!-- Studio Mode Navigation Tabs -->
      <div class="flex items-center justify-center gap-3">
        <div class="inline-flex p-1.5 rounded-2xl bg-white/90 border border-[#C49A58]/30 shadow-xs text-xs font-bold">
          <button 
            type="button" 
            id="tab-view-form-btn"
            class="px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              currentStudioView === 'form' 
                ? 'bg-[#24140D] text-white shadow-xs' 
                : 'text-[#523424] hover:text-[#B85C38]'
            }"
          >
            <span>🎨</span>
            <span>${isEn ? '1. Recipe Parameters & Spices' : '1. Racik Bahan & Preferensi'}</span>
          </button>
          
          <button 
            type="button" 
            id="tab-view-output-btn"
            class="px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              currentStudioView === 'output' 
                ? 'bg-[#24140D] text-white shadow-xs' 
                : 'text-[#523424] hover:text-[#B85C38]'
            }"
          >
            <span>⚡</span>
            <span>${isEn ? '2. AI Output (Supabase Ready)' : '2. Output Resep AI (Supabase)'}</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] bg-[#B85C38] text-white">Standby</span>
          </button>
        </div>
      </div>

      <!-- Validation Error Banner -->
      ${validationMessage ? `
        <div class="max-w-4xl mx-auto p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between shadow-xs animate-shake">
          <div class="flex items-center gap-2 font-medium">
            <span class="text-base">⚠️</span>
            <span>${validationMessage}</span>
          </div>
          <button type="button" id="dismiss-val-btn" class="text-rose-600 hover:text-rose-900 font-bold ml-2 text-sm">&times;</button>
        </div>
      ` : ''}

      <!-- Interactive Studio Form -->
      <form id="ai-creator-form" class="space-y-8 max-w-4xl mx-auto">
        
        <!-- SECTION 1: Creator Identity -->
        <section class="pawon-glass p-6 sm:p-8 rounded-3xl space-y-6">
          <div class="pb-4 border-b border-[#E5D9C5] flex items-center justify-between">
            <div>
              <span class="text-[11px] font-bold text-[#B85C38] uppercase tracking-wider">Langkah 1 • Hak Cipta Resep</span>
              <h2 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#24140D]">
                ${isEn ? '1. Creator Attribution' : '1. Identitas Pencipta Resep'}
              </h2>
            </div>
            <span class="text-xs px-2.5 py-1 rounded-full bg-[#FAF6EF] text-[#B85C38] border border-[#C49A58]/30 font-semibold">
              Wajib Diisi
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
                  ? 'This name will be saved in the Supabase user_recipes table.' 
                  : 'Nama ini disimpan pada record tabel database Supabase dan dicantumkan pada poster kreasi.'}
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
              <span class="text-[11px] font-bold text-[#B85C38] uppercase tracking-wider">Langkah 2 • Ramuan Rempah & Bahan</span>
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
                    <img src="${item.image || `/assets/images/ingredients/${item.id}.jpg`}" alt="${item.nameId}" class="w-4 h-4 rounded-full object-cover"/>
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
                  class="rempah-pill-btn group p-2.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 relative overflow-hidden cursor-pointer ${
                    isSelected 
                      ? 'bg-[#24140D] text-[#FAF6EF] border-[#B85C38] shadow-md ring-2 ring-[#B85C38]' 
                      : 'bg-white hover:bg-[#FAF6EF] text-[#24140D] border-[#E5D9C5] hover:border-[#C49A58] shadow-2xs'
                  }"
                >
                  <div class="relative w-full h-24 rounded-xl overflow-hidden bg-[#FAF6EF] border border-[#E5D9C5]/60 mb-2">
                    <img 
                      src="${imgSrc}" 
                      alt="${escapeHtml(item.nameId)}" 
                      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                      onerror="this.src='/assets/images/hero/hero-culinary.jpg'"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                    <div class="absolute top-1.5 right-1.5 w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold shadow-xs transition-colors ${
                      isSelected ? 'bg-[#B85C38] border-white text-white' : 'bg-white/80 border-[#C49A58]/50 text-transparent'
                    }">✓</div>
                    <span class="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md bg-[#24140D]/80 backdrop-blur-xs text-[9px] text-white">
                      ${item.category === 'spice' ? 'Rempah' : item.category === 'protein' ? 'Protein' : 'Pelengkap'}
                    </span>
                  </div>
                  <div class="px-1 flex-1 flex flex-col justify-between">
                    <div class="text-xs font-bold leading-tight line-clamp-1">
                      ${isEn ? (item.nameEn || item.nameId) : item.nameId}
                    </div>
                    <span class="text-[10px] ${isSelected ? 'text-[#C49A58]' : 'text-[#656C42]'} line-clamp-1 mt-1 block">
                      ${item.flavorNote || item.description || ''}
                    </span>
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </section>

        <!-- SECTION 3: Culinary Preferences -->
        <section class="pawon-glass p-6 sm:p-8 rounded-3xl space-y-8">
          <div class="pb-4 border-b border-[#E5D9C5]">
            <span class="text-[11px] font-bold text-[#B85C38] uppercase tracking-wider">Langkah 3 • Filosofi Dapur & Teknik Masak</span>
            <h2 class="font-editorial-serif text-xl sm:text-2xl font-bold text-[#24140D]">
              ${isEn ? '3. Cooking Method & Flavor Profile' : '3. Karakter Rasa & Teknik Pengolahan'}
            </h2>
          </div>

          <!-- Cooking Method -->
          <div class="space-y-3">
            <label class="block text-xs font-bold text-[#24140D] uppercase tracking-wider">
              ${isEn ? 'Cooking Method' : 'Metode Utama Pengolahan Tradisional'}
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

          <!-- Servings & Target Duration -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <!-- Servings -->
            <div class="space-y-2">
              <label class="block text-xs font-bold text-[#24140D] uppercase tracking-wider">
                ${isEn ? 'Target Servings' : 'Porsi Santapan'}
              </label>
              <div class="grid grid-cols-5 gap-2">
                ${PREFERENCE_OPTIONS.servings.map(s => {
                  const isSelected = formState.servings === s;
                  return `
                    <label class="p-2.5 rounded-xl border text-center font-bold text-xs cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-[#B85C38] text-white border-[#B85C38] shadow-xs' 
                        : 'bg-white text-[#24140D] border-[#E5D9C5]'
                    }">
                      <input type="radio" name="servings" value="${s}" ${isSelected ? 'checked' : ''} class="sr-only"/>
                      <div>${s}</div>
                      <div class="text-[9px] font-normal opacity-85">${isEn ? 'srv' : 'porsi'}</div>
                    </label>
                  `;
                }).join('')}
              </div>
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
            </div>
          </div>
        </section>

        <!-- CTA Action Bar -->
        <div class="p-6 rounded-3xl bg-gradient-to-r from-[#24140D] via-[#351C12] to-[#1B0F09] border border-[#C49A58]/35 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-left space-y-1">
            <h3 class="font-editorial-serif text-lg font-bold text-[#FAF6EF]">
              ${isEn ? 'Ready to sync with Supabase backend?' : 'Siap menyusun blueprint resep Anda?'}
            </h3>
            <p class="text-xs text-[#FAF6EF]/75">
              ${isEn 
                ? 'Your parameters will be formatted and prepared for backend API & Supabase ingestion.' 
                : 'Parameter bahan dan preferensi akan disiapkan untuk endpoint API backend dan database Supabase.'}
            </p>
          </div>

          <button 
            type="submit" 
            id="generate-recipe-submit-btn"
            class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#B85C38] hover:bg-[#A04A27] text-[#FAF6EF] font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>✨</span>
            <span>${isEn ? 'Prepare Supabase Payload' : 'Kirim Parameter ke Backend Supabase'}</span>
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
 * Output View: Clean Empty State ready for Supabase Backend
 */
function renderEmptyOutputView(currentLang) {
  const isEn = currentLang === 'en';
  const selectedCount = formState.selectedIngredientIds.length;
  const selectedIngredients = ALL_INGREDIENTS.filter(i => formState.selectedIngredientIds.includes(i.id));

  return `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      <!-- View Switcher Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5D9C5]">
        <div class="flex items-center gap-2">
          <button 
            type="button" 
            id="back-to-studio-btn"
            class="px-4 py-2 rounded-xl bg-white border border-[#C49A58]/40 hover:bg-[#FAF6EF] text-[#24140D] text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>&larr;</span>
            <span>${isEn ? 'Back to Studio Parameters' : 'Kembali ke Studio Racik'}</span>
          </button>
        </div>

        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold shadow-2xs">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>${isEn ? 'Supabase Table Contract Ready' : 'Kontrak Database Supabase Siap'}</span>
        </div>
      </div>

      <!-- Toast Feedback Message -->
      ${toastMessage ? `
        <div class="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between shadow-xs">
          <div class="flex items-center gap-2 font-medium">
            <span>✓</span>
            <span>${toastMessage}</span>
          </div>
          <button type="button" id="dismiss-toast-btn" class="font-bold text-emerald-700 text-sm">&times;</button>
        </div>
      ` : ''}

      <!-- Main Empty State Hero Card -->
      <div class="pawon-glass p-8 sm:p-12 rounded-3xl text-center space-y-6 max-w-3xl mx-auto border border-[#C49A58]/35 shadow-lg">
        <div class="relative w-24 h-24 mx-auto">
          <div class="absolute inset-0 rounded-3xl bg-[#C49A58]/20 animate-ping"></div>
          <div class="w-24 h-24 rounded-3xl bg-[#24140D] border-2 border-[#C49A58] text-[#C49A58] flex items-center justify-center mx-auto shadow-xl text-4xl">
            🏺
          </div>
        </div>

        <div class="space-y-2.5 max-w-lg mx-auto">
          <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FAF6EF] border border-[#E5D9C5] text-[11px] font-bold text-[#B85C38] uppercase tracking-wider">
            ${isEn ? 'Backend Ingestion Queue' : 'Output Masih Kosong • Menunggu Response Supabase'}
          </span>
          <h2 class="font-editorial-serif text-2xl sm:text-4xl font-bold text-[#24140D]">
            ${isEn ? 'AI Recipe Output is Currently Empty' : 'Output Resep AI Dikosongkan'}
          </h2>
          <p class="text-xs sm:text-sm text-[#523424] leading-relaxed">
            ${isEn 
              ? 'Real recipes, high-DPI canvas posters, and chef certificates will be fetched live from your backend service connected to the Supabase database.'
              : 'Output resep, komposisi takaran gramasi, poster resmi, dan piagam pencipta akan diterima langsung dari integrasi endpoint backend dan database Supabase Anda.'}
          </p>
        </div>

        <!-- Prepared Payload Summary -->
        <div class="p-5 rounded-2xl bg-[#FAF6EF] border border-[#E5D9C5] text-left space-y-4 max-w-xl mx-auto">
          <div class="flex items-center justify-between border-b border-[#E5D9C5] pb-2.5">
            <span class="text-xs font-bold text-[#24140D] uppercase tracking-wider flex items-center gap-1.5">
              <span>📋</span>
              <span>${isEn ? 'Prepared Parameter Blueprint' : 'Ringkasan Parameter Racikan yang Siap Dikirim:'}</span>
            </span>
            <span class="text-[10px] font-mono text-[#656C42] bg-white px-2 py-0.5 rounded-md border border-[#E5D9C5]">
              status: ready
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span class="text-[10px] text-[#656C42] block">${isEn ? 'Creator:' : 'Pencipta:'}</span>
              <strong class="text-[#24140D]">${formState.creatorName || (isEn ? '(Not yet specified)' : '(Belum diisi)')}</strong>
            </div>
            <div>
              <span class="text-[10px] text-[#656C42] block">${isEn ? 'Method:' : 'Metode Masak:'}</span>
              <strong class="text-[#24140D] capitalize">${formState.cookingMethod}</strong>
            </div>
            <div>
              <span class="text-[10px] text-[#656C42] block">${isEn ? 'Taste Profile:' : 'Karakter Rasa:'}</span>
              <strong class="text-[#24140D]">${formState.tasteProfile}</strong>
            </div>
            <div>
              <span class="text-[10px] text-[#656C42] block">${isEn ? 'Spice Level:' : 'Level Pedas:'}</span>
              <strong class="text-[#24140D]">Level ${formState.spiceLevel}</strong>
            </div>
            <div>
              <span class="text-[10px] text-[#656C42] block">${isEn ? 'Servings:' : 'Target Porsi:'}</span>
              <strong class="text-[#24140D]">${formState.servings} Porsi</strong>
            </div>
            <div>
              <span class="text-[10px] text-[#656C42] block">${isEn ? 'Language:' : 'Bahasa:'}</span>
              <strong class="text-[#24140D] uppercase">${formState.outputLanguage}</strong>
            </div>
          </div>

          <!-- Selected Ingredients Chips Preview -->
          <div class="pt-2 border-t border-[#E5D9C5] space-y-1.5">
            <span class="text-[10px] font-bold text-[#523424] block">${isEn ? 'Selected Ingredients in Payload:' : 'Bahan Terpilih (' + selectedCount + '):'}</span>
            <div class="flex flex-wrap gap-1.5">
              ${selectedIngredients.map(item => `
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-[#C49A58]/30 text-[11px] text-[#24140D]">
                  <img src="${item.image || `/assets/images/ingredients/${item.id}.jpg`}" alt="${item.nameId}" class="w-3.5 h-3.5 rounded-full object-cover"/>
                  <span>${item.nameId}</span>
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Supabase Database Integration Schema Info Card -->
        <div class="p-5 rounded-2xl bg-[#24140D] border border-[#C49A58]/35 text-left text-xs text-[#FAF6EF] space-y-3 max-w-xl mx-auto shadow-md">
          <div class="flex items-center justify-between text-[#C49A58]">
            <span class="font-bold flex items-center gap-2">
              <svg class="w-4 h-4 text-[#C49A58]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"/>
              </svg>
              <span>Skema Integrasi Supabase: \`public.user_recipes\`</span>
            </span>
            <span class="text-[10px] font-mono text-[#D4AA6A]">REST API Contract</span>
          </div>

          <pre class="bg-black/40 p-3 rounded-xl font-mono text-[11px] text-[#FAF6EF]/90 overflow-x-auto leading-relaxed border border-[#C49A58]/20">
// Siap dipanggil saat backend aktif:
const { data, error } = await supabase
  .from('user_recipes')
  .insert([{
    creator_name: "${escapeHtml(formState.creatorName || 'Chef')}",
    ingredients: ${JSON.stringify(formState.selectedIngredientIds)},
    cooking_method: "${formState.cookingMethod}",
    taste_profile: "${formState.tasteProfile}",
    spice_level: ${formState.spiceLevel},
    servings: ${formState.servings}
  }]);
          </pre>

          <p class="text-[11px] text-[#FAF6EF]/75">
            ${isEn 
              ? 'When your Supabase credentials are configured in .env, recipe generation output will automatically stream and render here.' 
              : 'Ketika credential Supabase dikonfigurasi di environment backend, output hasil racikan AI akan langsung muncul di panel ini tanpa perlu refresh.'}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button 
            type="button" 
            id="simulate-sync-btn"
            class="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#B85C38] hover:bg-[#A04A27] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <span>⚡</span>
            <span>${isEn ? 'Test Supabase Payload Dispatch' : 'Uji Validasi Payload Supabase'}</span>
          </button>

          <button 
            type="button" 
            id="reset-creator-form-btn"
            class="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-[#FAF6EF] text-[#24140D] border border-[#E5D9C5] text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            ${isEn ? 'Reset Parameters' : 'Reset Form Racikan'}
          </button>
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

  // Tab View Switchers
  const tabFormBtn = document.getElementById('tab-view-form-btn');
  const tabOutputBtn = document.getElementById('tab-view-output-btn');
  const backToStudioBtn = document.getElementById('back-to-studio-btn');

  if (tabFormBtn) {
    tabFormBtn.onclick = () => {
      currentStudioView = 'form';
      reRenderCurrentView();
    };
  }

  if (tabOutputBtn) {
    tabOutputBtn.onclick = () => {
      currentStudioView = 'output';
      reRenderCurrentView();
    };
  }

  if (backToStudioBtn) {
    backToStudioBtn.onclick = () => {
      currentStudioView = 'form';
      reRenderCurrentView();
    };
  }

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
  setupRadioGroup('servings', (val) => { formState.servings = parseInt(val) || 4; });

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
    form.onsubmit = (e) => {
      e.preventDefault();

      // Validation 1: Creator Name
      if (!formState.creatorName || formState.creatorName.trim().length === 0) {
        validationMessage = 'Nama lengkap pencipta resep wajib diisi sebelum mengirim data ke Supabase.';
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

      // Transition smoothly to output view
      validationMessage = null;
      toastMessage = `Parameter resep "${formState.creatorName}" berhasil diselaraskan! Output dikosongkan siap menerima data dari backend & Supabase.`;
      currentStudioView = 'output';
      reRenderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

  // Output View Buttons: Simulate payload
  const simulateBtn = document.getElementById('simulate-sync-btn');
  if (simulateBtn) {
    simulateBtn.onclick = () => {
      toastMessage = '✓ Payload JSON tervalidasi dengan sukses! Siap diinjeksikan ke tabel Supabase public.user_recipes.';
      reRenderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

  // Reset form
  const resetBtn = document.getElementById('reset-creator-form-btn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      formState.creatorName = '';
      formState.creatorNickname = '';
      formState.selectedIngredientIds = ['ayam-kampung', 'bawang-merah', 'bawang-putih', 'kemiri', 'serai', 'daun-salam', 'gula-jawa'];
      formState.cookingMethod = 'ungkep';
      formState.tasteProfile = 'manis-gurih';
      formState.spiceLevel = 1;
      formState.servings = 4;
      formState.customNotes = '';
      validationMessage = null;
      toastMessage = null;
      currentStudioView = 'form';
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
