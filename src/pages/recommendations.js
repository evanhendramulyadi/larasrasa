import { recommendationService } from '../services/recommendationService.js';
import { flavorProfiles, getLocalizedFlavorProfiles } from '../data/flavorProfiles.js';
import { openRecipeModal } from '../components/recipe-modal.js';
import { localizeRecipe } from '../services/recipeService.js';
import { t, i18n } from '../i18n/index.js';

/**
 * Rekomendasi Kuliner Jawa Tengah (Cultural Culinary Taste Matcher)
 * 3-step cultural gastronomic curation:
 * Q1: Karakter Rasa (Flavor Profile)
 * Q2: Tipe Santapan (Dining Experience & Dish Style)
 * Q3: Kawasan Budaya (Regional Heritage Exploration)
 */

let wizardStep = 1;
const TOTAL_STEPS = 3;

let currentAnswers = {
  flavor: flavorProfiles[0]?.id || 'manis',
  dishType: 'kuah-segar',
  regionPreference: 'keraton',
  servings: 4
};
let activeResult = null;
let isProcessing = false;

export function resetRecommendationsWizard() {
  wizardStep = 1;
  currentAnswers = {
    flavor: flavorProfiles[0]?.id || 'manis',
    dishType: 'kuah-segar',
    regionPreference: 'keraton',
    servings: 4
  };
  activeResult = null;
  isProcessing = false;
}

export async function renderRecommendationsPage() {
  if (isProcessing) {
    return renderLoadingView();
  }

  if (activeResult) {
    return renderResultView(activeResult);
  }

  return renderWizardView(wizardStep);
}

function renderLoadingView() {
  return `
    <div class="max-w-2xl mx-auto px-4 py-28 text-center space-y-6">
      <div class="w-20 h-20 rounded-3xl bg-[#120B07] text-[#D49B42] border-2 border-[#D49B42]/50 flex items-center justify-center mx-auto shadow-xl animate-pulse">
        <svg class="w-10 h-10 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10"/>
        </svg>
      </div>
      <div class="space-y-2">
        <h2 class="font-editorial-serif text-3xl font-bold text-[#120B07]">
          ${t('recommendations.processingTitle')}
        </h2>
        <p class="text-sm text-[#5C3622]">
          ${t('recommendations.processingSub')}
        </p>
      </div>
    </div>
  `;
}

function renderWizardView(step) {
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
  const progressPercent = Math.round((step / TOTAL_STEPS) * 100);

  return `
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      <!-- Wizard Header with Javanese Heritage Gradient -->
      <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto border-2 border-[#D49B42]/40 shadow-2xl bg-gradient-to-br from-[#120B07] via-[#1E120A] to-[#120B07] text-[#FAF7F2]">
        <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#D49B42]/15 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#C84C24]/18 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 space-y-3">
          <span class="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#D49B42] uppercase tracking-wider border border-[#D49B42]/40 shadow-xs">
            <span>${t('recommendations.badge')}</span>
          </span>
          <h1 class="font-editorial-serif text-3xl sm:text-4xl font-bold text-white">
            ${t('recommendations.title')}
          </h1>
          <p class="text-xs sm:text-sm text-[#FAF7F2]/85 max-w-xl mx-auto leading-relaxed">
            ${t('recommendations.subtitle')}
          </p>
        </div>
      </div>

      <!-- Progress Indicator -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-xs font-bold text-[#5C3622]">
          <span>${t('recommendations.stepOf')} ${step} ${t('recommendations.of')} ${TOTAL_STEPS}</span>
          <span class="text-[#C84C24]">${progressPercent}% ${t('recommendations.completed')}</span>
        </div>
        <div class="w-full h-2.5 rounded-full bg-[#EFE8DA] overflow-hidden border border-[#D49B42]/20">
          <div class="h-full bg-gradient-to-r from-[#D49B42] to-[#C84C24] transition-all duration-300 rounded-full" style="width: ${progressPercent}%;"></div>
        </div>
      </div>

      <!-- Step Card Container -->
      <div class="pawon-glass p-6 sm:p-10 rounded-3xl border border-[#D49B42]/40 shadow-lg space-y-8">
        ${renderStepContent(step)}

        <!-- Navigation Buttons -->
        <div class="pt-6 border-t border-[#E8DEC8] flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 ${step > 1 ? 'sm:justify-between' : 'sm:justify-end'}">
          ${step > 1 ? `
            <button id="wizard-prev-btn" type="button" class="w-full sm:w-64 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-[#120B07] bg-white border border-[#D49B42]/40 hover:bg-[#FAF7F2] transition-colors cursor-pointer shadow-xs whitespace-nowrap">
              &larr; <span>${t('recommendations.prevBtn')}</span>
            </button>
          ` : ''}

          <button id="wizard-next-btn" type="button" class="w-full sm:w-64 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#C84C24] hover:bg-[#AE3E1B] text-white transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer border border-[#E05A30] whitespace-nowrap">
            <span>${step === TOTAL_STEPS ? t('recommendations.submitBtn') : t('recommendations.nextBtn')}</span>
            <svg class="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

    </div>
  `;
}

function renderStepContent(step) {
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';

  switch (step) {
    case 1:
      return `
        <div class="space-y-4">
          <div>
            <h2 class="font-editorial-serif text-2xl font-bold text-[#120B07]">
              ${t('recommendations.q1Title')}
            </h2>
            <p class="text-xs text-[#5C3622] mt-1">${t('recommendations.q1Sub')}</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            ${flavorProfiles.map(f => {
              const isChecked = currentAnswers.flavor === f.id;
              const fName = isEn ? (f.nameEn || f.name) : f.name;
              const fTagline = isEn ? (f.taglineEn || f.tagline) : f.tagline;
              return `
                <label class="wizard-option-card flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all duration-200 card-hover-lift ${
                  isChecked 
                    ? 'border-[#C84C24] bg-[#FDF4EE] shadow-md ring-2 ring-[#C84C24]/30' 
                    : 'border-[#D49B42]/30 bg-white hover:bg-[#FAF7F2]'
                }">
                  <input type="radio" name="flavor" value="${f.id}" class="sr-only" ${isChecked ? 'checked' : ''}/>
                  <div class="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 shadow-2xs font-bold" style="background-color: ${f.color}20; color: ${f.color}; border: 1px solid ${f.color}35;">
                    ●
                  </div>
                  <div>
                    <strong class="block text-sm text-[#120B07] font-bold">${fName}</strong>
                    <span class="text-xs text-[#5C3622] leading-snug">${fTagline}</span>
                  </div>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;

    case 2:
      const dishTypes = [
        {
          id: 'kuah-segar',
          title: isEn ? 'Fresh & Clear Broths' : 'Santapan Berkuah Segar Bening',
          desc: isEn ? 'Comforting soups and herbal broths without heavy creaminess (Soto Kudus, Sup Matahari, Garang Asem)' : 'Soto bening, sup kaldu rempah, dan olahan asam segar yang melegakan serta menenangkan (Soto Kudus, Sup Matahari)',
          tag: isEn ? 'Light & Refreshing' : 'Segar & Menenangkan'
        },
        {
          id: 'kuah-santan',
          title: isEn ? 'Rich Coconut Stews & Curries' : 'Berkuah Santan Gurih & Medok',
          desc: isEn ? 'Simmered seasoned coconut milk stews (Gudeg, Mangut Lele, Opor, Nasi Liwet)' : 'Gudeg, opor ayam kampung, mangut lele asap, atau nasi liwet berbalut areh gurih lembut',
          tag: isEn ? 'Rich & Savory' : 'Gurih Meresap'
        },
        {
          id: 'kering-bakar',
          title: isEn ? 'Grilled, Roasted & Caramelized' : 'Olahan Bakar, Panggang & Ungkep',
          desc: isEn ? 'Charcoal skewered meats, slow-braised sweet bacem, and caramelized heritage specialties' : 'Sate buntel Solo, daging bacem legit manis, sate batibul Tegal, dan olahan ungkepan bumbu karamel sedap',
          tag: isEn ? 'Smoky & Sweet' : 'Aroma Bakaran'
        },
        {
          id: 'kudapan-lauk',
          title: isEn ? 'Crispy Delights & Traditional Bites' : 'Lauk Gorengan & Kudapan Tradisional',
          desc: isEn ? 'Warm tempe mendoan, savory tahu gimbal, crispy spring rolls, or classic teatime snacks' : 'Tempe mendoan Banyumas hangat, tahu gimbal Semarang, lumpia renyah, atau kudapan khas teman santap',
          tag: isEn ? 'Crispy & Casual' : 'Renyah & Santai'
        }
      ];

      return `
        <div class="space-y-4">
          <div>
            <h2 class="font-editorial-serif text-2xl font-bold text-[#120B07]">
              ${t('recommendations.q2Title')}
            </h2>
            <p class="text-xs text-[#5C3622] mt-1">${t('recommendations.q2Sub')}</p>
          </div>
          <div class="space-y-3 pt-2">
            ${dishTypes.map(d => {
              const isChecked = currentAnswers.dishType === d.id;
              return `
                <label class="wizard-option-card flex items-start justify-between p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all card-hover-lift ${
                  isChecked 
                    ? 'border-[#C84C24] bg-[#FDF4EE] shadow-md ring-2 ring-[#C84C24]/30' 
                    : 'border-[#D49B42]/30 bg-white hover:bg-[#FAF7F2]'
                }">
                  <div class="space-y-0.5 pr-3">
                    <input type="radio" name="dishType" value="${d.id}" class="sr-only" ${isChecked ? 'checked' : ''}/>
                    <strong class="block text-sm text-[#120B07] font-bold">${d.title}</strong>
                    <span class="text-xs text-[#5C3622] leading-relaxed block">${d.desc}</span>
                  </div>
                  <span class="text-[10px] font-bold text-[#C84C24] bg-[#FAF7F2] px-3 py-1.5 rounded-xl border border-[#D49B42]/35 shadow-2xs shrink-0 whitespace-nowrap">
                    ${d.tag}
                  </span>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;

    case 3:
      const regions = [
        {
          id: 'keraton',
          title: isEn ? 'Royal Court & Interior (Surakarta / Solo)' : 'Keraton & Pedalaman (Surakarta / Solo)',
          desc: isEn ? 'Elegance of savory areh coconut cream, subtle sweetness, and refined noble hearth heritage' : 'Keanggunan santan areh gurih lembut, manis berkelas, dan warisan dapur bangsawan Kasunanan Surakarta',
          badge: isEn ? 'Royal Heritage' : 'Pusaka Keraton'
        },
        {
          id: 'pantura',
          title: isEn ? 'Northern Coast / Pantura (Semarang, Pekalongan, Tegal, Kudus)' : 'Pesisir Pantura (Semarang, Pekalongan, Tegal, Kudus)',
          desc: isEn ? 'Coastal vibrancy infused with fragrant shrimp paste (petis), fermented soybeans (tauco), and bamboo shoots' : 'Dinamika bumbu pesisir kaya aroma petis udang, rebung manis, tauco harum, dan kaldu daging rempah',
          badge: isEn ? 'Coastal Trade' : 'Jalur Rempah Pesisir'
        },
        {
          id: 'pegunungan',
          title: isEn ? 'Mountain Valleys (Wonosobo, Magelang, Banyumas)' : 'Lembah & Pegunungan (Wonosobo, Magelang, Banyumas)',
          desc: isEn ? 'Highland comfort driven by aromatic kencur ginger, crispy mendoan, and warming thick broths' : 'Kearifan bumbu bumi dingin, kehangatan kencur, mie ongklok berkuah kental, kupat tahu, dan tempe mendoan',
          badge: isEn ? 'Highland Hearth' : 'Rempah Pegunungan'
        },
        {
          id: 'semua',
          title: isEn ? 'All Central Javanese Regions' : 'Seluruh Sentra Jawa Tengah',
          desc: isEn ? 'Open across all 8 cultural culinary centers without regional boundaries' : 'Buka rekomendasi lintas seluruh 8 sentra kuliner untuk menemukan hidangan tradisional paling selaras',
          badge: isEn ? 'Broad Discovery' : 'Lintas Sentra'
        }
      ];

      return `
        <div class="space-y-4">
          <div>
            <h2 class="font-editorial-serif text-2xl font-bold text-[#120B07]">
              ${t('recommendations.q3Title')}
            </h2>
            <p class="text-xs text-[#5C3622] mt-1">${t('recommendations.q3Sub')}</p>
          </div>
          <div class="space-y-3 pt-2">
            ${regions.map(r => {
              const isChecked = currentAnswers.regionPreference === r.id;
              return `
                <label class="wizard-option-card flex items-start justify-between p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all card-hover-lift ${
                  isChecked 
                    ? 'border-[#C84C24] bg-[#FDF4EE] shadow-md ring-2 ring-[#C84C24]/30' 
                    : 'border-[#D49B42]/30 bg-white hover:bg-[#FAF7F2]'
                }">
                  <div class="space-y-0.5 pr-3">
                    <input type="radio" name="regionPreference" value="${r.id}" class="sr-only" ${isChecked ? 'checked' : ''}/>
                    <strong class="block text-sm text-[#120B07] font-bold">${r.title}</strong>
                    <span class="text-xs text-[#5C3622] leading-relaxed block">${r.desc}</span>
                  </div>
                  <span class="text-[10px] font-bold text-[#C84C24] bg-[#FAF7F2] px-3 py-1.5 rounded-xl border border-[#D49B42]/35 shadow-2xs shrink-0 whitespace-nowrap">
                    ${r.badge}
                  </span>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;

    default:
      return '';
  }
}

function renderResultView(result) {
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
  const rawPrimary = result.primary || result.primaryRecommendation;
  const primary = isEn ? localizeRecipe(rawPrimary) : rawPrimary;
  const localizedFlavors = getLocalizedFlavorProfiles();
  const flavorMap = {};
  localizedFlavors.forEach(f => {
    flavorMap[f.id] = isEn ? (f.nameEn || f.name) : f.name;
  });

  const dishTypeLabels = {
    'kuah-segar': isEn ? 'Fresh & Clear Broths' : 'Santapan Berkuah Segar Bening',
    'kuah-santan': isEn ? 'Rich Coconut Stews & Curries' : 'Berkuah Santan Gurih & Medok',
    'kering-bakar': isEn ? 'Grilled, Roasted & Caramelized' : 'Olahan Bakar, Panggang & Ungkep',
    'kudapan-lauk': isEn ? 'Crispy Delights & Traditional Bites' : 'Lauk Gorengan & Kudapan Tradisional'
  };

  const regionLabels = {
    keraton: isEn ? 'Royal Court & Interior (Solo)' : 'Keraton & Pedalaman (Solo)',
    pantura: isEn ? 'Northern Coast (Pantura)' : 'Pesisir Pantura',
    pegunungan: isEn ? 'Mountain Valleys' : 'Pegunungan & Lembah',
    semua: isEn ? 'All Central Java' : 'Seluruh Jawa Tengah'
  };

  const chosenFlavorName = flavorMap[currentAnswers.flavor] || currentAnswers.flavor;
  const chosenDishTypeName = dishTypeLabels[currentAnswers.dishType] || currentAnswers.dishType;
  const chosenRegionName = regionLabels[currentAnswers.regionPreference] || currentAnswers.regionPreference;

  const getLocalizedHighlights = () => {
    if (isEn) {
      if (Array.isArray(result.matchHighlights) && result.matchHighlights.length > 0) {
        return result.matchHighlights.map(h => {
          if (h.includes('sangat dominan') || h.includes('Karakter rasa utama') || h.includes('Primary')) {
            return `Primary ${chosenFlavorName || 'flavor'} character is prominently and authentically expressed`;
          }
          if (h.includes('sentuhan rasa') || h.includes('Menghadirkan sentuhan') || h.includes('nuance')) {
            return `Harmoniously infused with authentic ${chosenFlavorName || 'flavor'} notes`;
          }
          if (h.includes('Format sajian') || h.includes('gaya santapan') || h.includes('Serving format')) {
            return 'Serving format aligns precisely with your desired dining experience';
          }
          if (h.includes('tekstur dan pengalaman') || h.includes('texture')) {
            return 'Closely resonates with your preferred texture and dining experience';
          }
          if (h.includes('Keraton Surakarta') || h.includes('Royal Court')) {
            return `Reflects the noble culinary heritage of Surakarta Royal Court (${primary.regionName})`;
          }
          if (h.includes('Pantura') || h.includes('coastal')) {
            return `Represents the vibrant coastal spice dynamics of Central Java's Pantura (${primary.regionName})`;
          }
          if (h.includes('pegunungan') || h.includes('highlands')) {
            return `Brings forth the comforting hearth spices of highlands and valleys (${primary.regionName})`;
          }
          if (h.includes('Pusaka kuliner') || h.includes('culinary treasure') || h.includes('specialty')) {
            return `Signature traditional culinary specialty from ${primary.regionName}`;
          }
          return h;
        });
      }
      return [
        `Signature ${chosenFlavorName || 'Central Javanese'} flavor profile matching your preference`,
        `Rich cultural heritage and gastronomic tradition from ${primary.regionName}`,
        'Traditional recipe calibrated for 4 standard portions'
      ];
    }
    return (result.matchHighlights && result.matchHighlights.length > 0)
      ? result.matchHighlights
      : [
          'Karakter bumbu rempah autentik khas Jawa Tengah yang paling selaras dengan selera',
          'Memiliki kekayaan cerita sejarah dan tradisi luhur dari sentra asalnya',
          'Resep dengan takaran pas untuk 4 porsi'
        ];
  };

  const matchHighlights = getLocalizedHighlights();
  const primaryFlavorLabel = (primary.flavorProfiles || []).map(f => flavorMap[f] || f).join(' • ');

  return `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-fade-in">
      
      <!-- 1. Royal Celebration Header & Parameter Summary -->
      <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center max-w-5xl mx-auto border-2 border-[#D49B42]/40 shadow-2xl bg-gradient-to-br from-[#120B07] via-[#1E120A] to-[#120B07] text-[#FAF7F2]">
        <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#D49B42]/15 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#C84C24]/18 blur-3xl pointer-events-none"></div>

        <!-- Close Button (X) Top-Right -->
        <button type="button" 
                id="result-close-top-btn" 
                class="absolute top-4 right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md hover:scale-105" 
                aria-label="${t('spicesSection.closeModal') || 'Tutup'}">
          <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="relative z-10 space-y-4">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/35 shadow-xs">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>${t('recommendations.resultBadge')}</span>
            <span class="text-white/40">|</span>
            <span class="text-white font-mono">${result.matchScore || 96}% ${isEn ? 'Match' : 'Harmonis'}</span>
          </div>

          <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            ${t('recommendations.resultTitle')}
          </h1>

          <p class="text-xs sm:text-sm text-[#FAF7F2]/85 max-w-xl mx-auto leading-relaxed">
            ${t('recommendations.resultSub')}
          </p>
          
          <!-- Criteria Recap Chips (3 User Selected Inputs) -->
          <div class="pt-3 flex flex-wrap items-center justify-center gap-2">
            ${chosenFlavorName ? `
              <span class="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/10 border border-[#D49B42]/40 text-xs font-semibold text-[#D49B42] shadow-xs">
                <span>${chosenFlavorName}</span>
              </span>
            ` : ''}
            ${chosenDishTypeName ? `
              <span class="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white shadow-xs">
                <span>${chosenDishTypeName}</span>
              </span>
            ` : ''}
            ${chosenRegionName ? `
              <span class="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white shadow-xs">
                <span>${chosenRegionName}</span>
              </span>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- 2. Spotlight Hero Feature Card (2 Columns: Authentic Culture, History & Recipe) -->
      <div class="bg-white rounded-3xl border-2 border-[#D49B42]/35 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10 card-hover-lift">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          <!-- Left Column: Hero Macro Image Showcase (5 Cols) -->
          <div class="lg:col-span-5 relative group">
            <div class="relative aspect-4/3 lg:aspect-4/5 w-full rounded-3xl overflow-hidden bg-[#120B07] border border-[#D49B42]/30 shadow-md cursor-pointer" data-recipe-slug="${primary.slug}">
              <img src="${primary.image}" 
                   alt="${primary.name}" 
                   class="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out" 
                   onerror="this.src='/assets/images/hero/hero-culinary.jpg'"/>
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
              
              <!-- Floating Top Badges -->
              <div class="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#120B07]/85 backdrop-blur-md text-[11px] font-bold text-[#FAF7F2] border border-[#D49B42]/40 shadow-xs">
                  <svg class="w-3.5 h-3.5 text-[#D49B42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>${primary.regionName}</span>
                </span>

                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-[11px] font-bold text-white shadow-sm border border-emerald-400/40">
                  <span>★</span>
                  <span>${result.matchScore || 96}% ${isEn ? 'Match' : 'Harmonis'}</span>
                </span>
              </div>

              <!-- Floating Bottom Overlay -->
              <div class="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                ${primary.javaneseName ? `
                  <p class="font-editorial-serif italic text-xs text-[#D49B42] font-semibold">
                    "${primary.javaneseName}"
                  </p>
                ` : ''}
                <div class="flex items-center gap-2 pt-1 text-[11px] font-semibold text-white/90">
                  <span class="px-2.5 py-0.5 rounded-lg bg-white/20 backdrop-blur-xs border border-white/20">
                    ${primary.mealType || (isEn ? 'Traditional Cuisine' : 'Kuliner Tradisional')}
                  </span>
                  <span class="px-2.5 py-0.5 rounded-lg bg-white/20 backdrop-blur-xs border border-white/20">
                    4 ${isEn ? 'Portions' : 'Porsi'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Editorial Cultural Intro & Match Highlights (7 Cols) -->
          <div class="lg:col-span-7 space-y-5">
            
            <!-- Category & Flavor Badges -->
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs px-3 py-1 rounded-full bg-[#FAF7F2] text-[#120B07] font-bold border border-[#D49B42]/30 shadow-2xs">
                ${primary.mealType || (isEn ? 'Traditional Cuisine' : 'Kuliner Tradisional')}
              </span>
              ${primaryFlavorLabel ? `
                <span class="text-xs px-3 py-1 rounded-full bg-[#FDF4EE] text-[#C84C24] font-bold border border-[#C84C24]/30 shadow-2xs">
                  ${primaryFlavorLabel}
                </span>
              ` : ''}
              <span class="text-xs px-3 py-1 rounded-full bg-[#FAF7F2] text-[#2E4D38] font-bold border border-[#2E4D38]/30 shadow-2xs">
                ${isEn ? 'Standard 4 Portions' : 'Takaran Standar 4 Porsi'}
              </span>
            </div>

            <!-- Title & Regional Lore Excerpt -->
            <div class="space-y-1.5">
              <h2 class="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#120B07] leading-tight">
                ${primary.name}
              </h2>
              <p class="text-xs sm:text-sm text-[#5C3622] leading-relaxed line-clamp-3">
                ${primary.intro}
              </p>
            </div>

            <!-- Rationale & Match Highlights Box -->
            <div class="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 space-y-3">
              <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C84C24]">
                <svg class="w-4 h-4 text-[#C84C24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>${isEn ? 'Culinary Harmony & Cultural Context' : 'Harmoni Rasa & Cerita Kuliner Hari Ini'}</span>
              </div>
              
              <div class="space-y-2">
                ${matchHighlights.map(h => `
                  <div class="flex items-start gap-2.5 text-xs text-[#120B07] leading-relaxed">
                    <span class="w-4 h-4 rounded-full bg-[#C84C24]/15 text-[#C84C24] flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">✓</span>
                    <span>${h}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- 4-Metric Cultural Summary (Sentra, Karakter, Porsi, Kategori) -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center pt-1">
              <div class="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8]">
                <span class="block text-[10px] uppercase font-bold text-[#2E4D38] tracking-wider">${isEn ? 'Origin' : 'Sentra Asal'}</span>
                <span class="font-bold text-xs sm:text-sm text-[#120B07] block mt-0.5">${primary.regionName}</span>
              </div>
              <div class="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8]">
                <span class="block text-[10px] uppercase font-bold text-[#2E4D38] tracking-wider">${isEn ? 'Flavor' : 'Karakter'}</span>
                <span class="font-bold text-xs sm:text-sm text-[#120B07] block mt-0.5 truncate">${primaryFlavorLabel || (isEn ? 'Authentic' : 'Autentik')}</span>
              </div>
              <div class="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8]">
                <span class="block text-[10px] uppercase font-bold text-[#2E4D38] tracking-wider">${isEn ? 'Servings' : 'Porsi Resep'}</span>
                <span class="font-bold text-xs sm:text-sm text-[#120B07] block mt-0.5">4 ${isEn ? 'Portions' : 'Porsi'}</span>
              </div>
              <div class="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8]">
                <span class="block text-[10px] uppercase font-bold text-[#2E4D38] tracking-wider">${isEn ? 'Tradition' : 'Kategori'}</span>
                <span class="font-bold text-xs sm:text-sm text-[#120B07] block mt-0.5 truncate">${primary.mealType || (isEn ? 'Traditional' : 'Tradisional')}</span>
              </div>
            </div>

            <!-- Action CTAs -->
            <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button type="button" 
                      id="open-recommendation-recipe-btn" 
                      data-recipe-slug="${primary.slug}"
                      class="flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C84C24] hover:bg-[#AE3E1B] text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 border border-[#E05A30] text-center cursor-pointer">
                <span>${t('recommendations.openRecipeBtn')}</span>
                <span class="text-base">&rarr;</span>
              </button>

              <button type="button" 
                      id="result-close-action-btn" 
                      class="sm:w-36 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#120B07] text-xs sm:text-sm font-bold border border-[#D49B42]/40 transition-all shadow-xs cursor-pointer text-center">
                <svg class="w-4 h-4 text-[#C84C24]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>${t('spicesSection.closeModal') || 'Tutup'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  `;
}

export function initRecommendationsInteractions(onRerender) {
  // Option Card Radios (Step 1, 2, 3)
  const optionCards = document.querySelectorAll('.wizard-option-card');
  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        const name = radio.name;
        const val = radio.value;
        currentAnswers[name] = val;

        // Visual update preserving layout classes & explicitly setting checked state
        const siblings = document.querySelectorAll(`input[name="${name}"]`);
        siblings.forEach(s => {
          s.checked = (s === radio);
          const parent = s.closest('.wizard-option-card');
          if (parent) {
            if (s === radio) {
              parent.classList.add('border-[#C84C24]', 'bg-[#FDF4EE]', 'shadow-md', 'ring-2', 'ring-[#C84C24]/30');
              parent.classList.remove('border-[#D49B42]/30', 'bg-white', 'hover:bg-[#FAF7F2]');
            } else {
              parent.classList.remove('border-[#C84C24]', 'bg-[#FDF4EE]', 'shadow-md', 'ring-2', 'ring-[#C84C24]/30');
              parent.classList.add('border-[#D49B42]/30', 'bg-white', 'hover:bg-[#FAF7F2]');
            }
          }
        });
      }
    });
  });

  // Listen directly to radio change as fallback
  const radios = document.querySelectorAll('.wizard-option-card input[type="radio"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        currentAnswers[radio.name] = radio.value;
      }
    });
  });

  // Next Button
  const nextBtn = document.getElementById('wizard-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', async () => {
      if (wizardStep < TOTAL_STEPS) {
        wizardStep++;
        if (typeof onRerender === 'function') onRerender();
      } else {
        // Processing recommendation
        isProcessing = true;
        if (typeof onRerender === 'function') onRerender();

        try {
          const res = await recommendationService.getRecommendations(currentAnswers);
          activeResult = res;
        } catch (err) {
          console.warn('Recommendation failed:', err);
        } finally {
          isProcessing = false;
          if (typeof onRerender === 'function') onRerender();
        }
      }
    });
  }

  // Prev Button
  const prevBtn = document.getElementById('wizard-prev-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (wizardStep > 1) {
        wizardStep--;
        if (typeof onRerender === 'function') onRerender();
      }
    });
  }

  // Open Recipe In-Place Modal
  const openRecipeBtn = document.getElementById('open-recommendation-recipe-btn');
  if (openRecipeBtn) {
    openRecipeBtn.addEventListener('click', () => {
      const slug = openRecipeBtn.getAttribute('data-recipe-slug');
      if (slug) {
        openRecipeModal(slug);
      }
    });
  }

  // Close Result View Handlers
  const handleCloseResult = () => {
    activeResult = null;
    wizardStep = 1;
    currentAnswers = {
      flavor: flavorProfiles[0]?.id || 'manis',
      dishType: 'kuah-segar',
      regionPreference: 'keraton',
      servings: 4
    };
    if (typeof onRerender === 'function') onRerender();
  };

  const closeTopBtn = document.getElementById('result-close-top-btn');
  if (closeTopBtn) {
    closeTopBtn.addEventListener('click', handleCloseResult);
  }

  const closeActionBtn = document.getElementById('result-close-action-btn');
  if (closeActionBtn) {
    closeActionBtn.addEventListener('click', handleCloseResult);
  }
}
