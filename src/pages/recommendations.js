import { recommendationService } from '../services/recommendationService.js';
import { flavorProfiles } from '../data/flavorProfiles.js';
import { renderRecipeCard } from '../components/recipe-card.js';
import { t, i18n } from '../i18n/index.js';

/**
 * Rekomendasi Untukmu (Personalized Food Finder)
 * 4-step guided culinary questionnaire.
 * Q1: Karakter Rasa (Flavor Profile)
 * Q2: Durasi Memasak (Available Cooking Time)
 * Q3: Jumlah Porsi (Servings)
 * Q4: Alokasi Anggaran (Budget)
 */

let wizardStep = 1;
const TOTAL_STEPS = 4;

let currentAnswers = {
  flavor: '',
  timeAvailable: 'sedang',
  dishType: 'kuah-segar',
  budget: 'menengah',
  servings: 4
};
let validationError = null;
let activeResult = null;
let isProcessing = false;

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
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#D49B42] uppercase tracking-wider border border-[#D49B42]/40 shadow-xs">
            <span class="w-2 h-2 rounded-full bg-[#C84C24] animate-pulse"></span>
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
        
        <!-- Inline Validation Alert (if any) -->
        ${validationError ? `
          <div id="wizard-validation-alert" class="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-center gap-3 animate-shake">
            <svg class="w-5 h-5 text-rose-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span class="font-bold">${validationError}</span>
          </div>
        ` : ''}

        ${renderStepContent(step)}

        <!-- Navigation Buttons -->
        <div class="pt-6 border-t border-[#E8DEC8] flex items-center justify-between">
          ${step > 1 ? `
            <button id="wizard-prev-btn" type="button" class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-[#120B07] bg-white border border-[#D49B42]/40 hover:bg-[#FAF7F2] transition-colors cursor-pointer shadow-xs">
              &larr; ${t('recommendations.prevBtn')}
            </button>
          ` : `<div></div>`}

          <button id="wizard-next-btn" type="button" class="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold bg-[#C84C24] hover:bg-[#AE3E1B] text-white transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer border border-[#E05A30]">
            <span>${step === TOTAL_STEPS ? t('recommendations.submitBtn') : t('recommendations.nextBtn')}</span>
            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- AI Food Creator Link Callout -->
      <div class="p-5 rounded-3xl bg-[#FAF7F2] border border-[#D49B42]/35 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xs">
        <div class="flex items-center gap-2.5 text-[#120B07] font-medium">
          <span class="text-lg">✨</span>
          <span>${isEn ? 'Want to synthesize your own custom recipe blueprint?' : 'Ingin meracik kreasi resep orisinal Anda sendiri dengan bumbu pilihan?'}</span>
        </div>
        <a href="#/ai-food-creator" class="px-5 py-2.5 rounded-full bg-[#120B07] hover:bg-[#C84C24] text-white font-bold shrink-0 transition-colors shadow-xs">
          ${isEn ? 'Try AI Food Creator &rarr;' : 'Coba AI Food Creator &rarr;'}
        </a>
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
      return `
        <div class="space-y-4">
          <div>
            <h2 class="font-editorial-serif text-2xl font-bold text-[#120B07]">
              ${t('recommendations.q2Title')}
            </h2>
            <p class="text-xs text-[#5C3622] mt-1">${t('recommendations.q2Sub')}</p>
          </div>
          <div class="space-y-3 pt-2">
            ${[
              { 
                id: 'cepat', 
                title: isEn ? 'Quick & Practical' : 'Praktis & Kilat', 
                desc: isEn ? 'Under 35 mins (such as crispy mendoan or fresh tahu gimbal)' : 'Kurang dari 35 menit (seperti mendoan atau tahu gimbal dadakan)', 
                duration: isEn ? '≤ 35 Mins' : '≤ 35 Menit' 
              },
              { 
                id: 'sedang', 
                title: isEn ? 'Standard Timing' : 'Waktu Standar Pawon', 
                desc: isEn ? '35 to 60 mins (cooking fragrant soto or royal beef stew)' : '35 hingga 60 menit (memasak soto kuah kencur atau selat bistik)', 
                duration: isEn ? '35 – 60 Mins' : '35 – 60 Menit' 
              },
              { 
                id: 'leluasa', 
                title: isEn ? 'Slow & Patient Simmer' : 'Ungkep Sabar & Khidmat', 
                desc: isEn ? 'Over 60 mins (slow-braising coconut liwet or authentic bacem)' : 'Lebih dari 60 menit (mengungkep liwet santan atau bacem legit)', 
                duration: isEn ? '> 60 Mins' : '> 60 Menit' 
              }
            ].map(tim => {
              const isChecked = currentAnswers.timeAvailable === tim.id;
              return `
                <label class="wizard-option-card flex items-center justify-between p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all card-hover-lift ${
                  isChecked 
                    ? 'border-[#C84C24] bg-[#FDF4EE] shadow-md ring-2 ring-[#C84C24]/30' 
                    : 'border-[#D49B42]/30 bg-white hover:bg-[#FAF7F2]'
                }">
                  <div class="flex items-center gap-3.5">
                    <input type="radio" name="timeAvailable" value="${tim.id}" class="sr-only" ${isChecked ? 'checked' : ''}/>
                    <div>
                      <strong class="block text-sm text-[#120B07] font-bold">${tim.title}</strong>
                      <span class="text-xs text-[#5C3622]">${tim.desc}</span>
                    </div>
                  </div>
                  <span class="text-xs font-mono font-bold text-[#C84C24] bg-[#FAF7F2] px-3 py-1.5 rounded-xl border border-[#D49B42]/35 shadow-2xs">
                    ${tim.duration}
                  </span>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;

    case 3:
      const dishTypes = [
        {
          id: 'kuah-segar',
          icon: '🍲',
          title: isEn ? 'Fresh & Clear Broths' : 'Berkuah Segar & Bening',
          desc: isEn ? 'Soto, fresh soups, and light herbal broths (Soto Kudus, Sup Matahari, Garang Asem)' : 'Soto, sup bening, dan kaldu rempah segar tanpa santan berat (Soto Kudus, Sup Matahari)',
          tag: isEn ? 'Light & Refreshing' : 'Segar & Hangat'
        },
        {
          id: 'kuah-santan',
          icon: '🥥',
          title: isEn ? 'Rich Coconut Stews & Curries' : 'Berkuah Santan Gurih & Medok',
          desc: isEn ? 'Gudeg, opor, mangut, and liwet simmered slowly in rich seasoned coconut milk' : 'Gudeg, opor, mangut pedas, nasi gandul, atau nasi liwet berbalut santan areh gurih',
          tag: isEn ? 'Rich & Savory' : 'Gurih Meresap'
        },
        {
          id: 'kering-bakar',
          icon: '🍢',
          title: isEn ? 'Grilled, Roasted & Caramelized' : 'Olahan Bakar, Panggang & Ungkep',
          desc: isEn ? 'Smoky skewered satay, slow-braised sweet bacem, and charcoal grilled meats' : 'Sate buntel, ayam bacem, sate batibul, olahan arang atau ungkepan bumbu karamel',
          tag: isEn ? 'Smoky & Sweet' : 'Aroma Bakaran'
        },
        {
          id: 'kudapan-lauk',
          icon: '🥟',
          title: isEn ? 'Crispy Delights & Traditional Bites' : 'Lauk Gorengan & Kudapan Tradisional',
          desc: isEn ? 'Warm tempe mendoan, savory tahu aci, or classic heritage teatime bites' : 'Tempe mendoan purwokerto, tahu aci slawi, atau kudapan klasik teman santap keluarga',
          tag: isEn ? 'Crispy & Casual' : 'Renyah & Praktis'
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
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            ${dishTypes.map(d => {
              const isChecked = currentAnswers.dishType === d.id;
              return `
                <label class="wizard-option-card flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all duration-200 card-hover-lift ${
                  isChecked 
                    ? 'border-[#C84C24] bg-[#FDF4EE] shadow-md ring-2 ring-[#C84C24]/30' 
                    : 'border-[#D49B42]/30 bg-white hover:bg-[#FAF7F2]'
                }">
                  <input type="radio" name="dishType" value="${d.id}" class="sr-only" ${isChecked ? 'checked' : ''}/>
                  <div class="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 bg-white border border-[#D49B42]/35 shadow-2xs text-lg">
                    ${d.icon}
                  </div>
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <strong class="block text-sm text-[#120B07] font-bold">${d.title}</strong>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#C84C24] border border-[#D49B42]/30">
                        ${d.tag}
                      </span>
                    </div>
                    <span class="text-xs text-[#5C3622] leading-snug block">${d.desc}</span>
                  </div>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;

    case 4:
      return `
        <div class="space-y-4">
          <div>
            <h2 class="font-editorial-serif text-2xl font-bold text-[#120B07]">
              ${t('recommendations.q4Title')}
            </h2>
            <p class="text-xs text-[#5C3622] mt-1">${t('recommendations.q4Sub')}</p>
          </div>
          <div class="space-y-3 pt-2">
            ${[
              { 
                id: 'hemat', 
                title: isEn ? 'Economical & Frugal' : 'Hemat & Praktis', 
                desc: isEn ? 'Under Rp 35.000 (dishes featuring tempeh, tofu, or seasonal produce)' : 'Di bawah Rp 35.000 (aneka olahan tempe, tahu, atau sayuran kebun)', 
                range: '< Rp 35k' 
              },
              { 
                id: 'menengah', 
                title: isEn ? 'Standard Family Budget' : 'Standar Keluarga', 
                desc: isEn ? 'Rp 35.000 – Rp 75.000 (chicken, fresh eggs, or warm savory soups)' : 'Rp 35.000 – Rp 75.000 (ayam kampung, telur bebek, atau sup kaldu)', 
                range: 'Rp 35k – 75k' 
              },
              { 
                id: 'spesial', 
                title: isEn ? 'Royal Feast / Special Occasion' : 'Jamuan Spesial', 
                desc: isEn ? 'Above Rp 75.000 (tender beef steaks, royal stews, or complete platters)' : 'Di atas Rp 75.000 (daging sapi empuk, selat keraton, atau olahan istimewa)', 
                range: '> Rp 75k' 
              }
            ].map(b => {
              const isChecked = currentAnswers.budget === b.id;
              return `
                <label class="wizard-option-card flex items-center justify-between p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all card-hover-lift ${
                  isChecked 
                    ? 'border-[#C84C24] bg-[#FDF4EE] shadow-md ring-2 ring-[#C84C24]/30' 
                    : 'border-[#D49B42]/30 bg-white hover:bg-[#FAF7F2]'
                }">
                  <div class="flex items-center gap-3.5">
                    <input type="radio" name="budget" value="${b.id}" class="sr-only" ${isChecked ? 'checked' : ''}/>
                    <div>
                      <strong class="block text-sm text-[#120B07] font-bold">${b.title}</strong>
                      <span class="text-xs text-[#5C3622]">${b.desc}</span>
                    </div>
                  </div>
                  <span class="text-xs font-mono font-bold text-[#2E4D38] bg-[#FAF7F2] px-3 py-1.5 rounded-xl border border-[#D49B42]/35 shadow-2xs">
                    ${b.range}
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

  return `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10 animate-fade-in">
      
      <!-- Result Banner -->
      <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto border-2 border-[#D49B42]/40 shadow-2xl bg-gradient-to-br from-[#120B07] via-[#1E120A] to-[#120B07] text-[#FAF7F2]">
        <div class="relative z-10 space-y-3">
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <span>✓</span>
            <span>${t('recommendations.resultBadge')}</span>
          </span>
          <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-white">
            ${t('recommendations.resultTitle')}
          </h1>
          <p class="text-xs sm:text-sm text-[#FAF7F2]/85 max-w-lg mx-auto leading-relaxed">
            ${t('recommendations.resultSub')}
          </p>
          
          <!-- Fixed Standard 4 People & Preference Pills -->
          <div class="pt-2 flex flex-wrap items-center justify-center gap-2">
            <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-[#D49B42]/40 text-xs font-bold text-[#D49B42]">
              <span>👥</span>
              <span>${isEn ? 'Standard Servings:' : 'Standar Porsi:'} <strong class="text-white">4 ${isEn ? 'People' : 'Orang'}</strong></span>
            </span>
            ${currentAnswers.flavor ? `
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#C84C24]/30 border border-[#C84C24]/50 text-xs font-bold text-white capitalize">
                <span>●</span>
                <span>${currentAnswers.flavor}</span>
              </span>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- Primary Recommended Match -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-[#C84C24]"></span>
            <span class="text-xs font-bold uppercase tracking-wider text-[#C84C24]">${t('recommendations.matchBadge')}</span>
          </div>
          <span class="text-xs font-bold text-[#2E4D38]">
            ${isEn ? 'Calibrated for 4 people (family standard)' : 'Terkalibrasi pas untuk 4 orang'}
          </span>
        </div>
        <div class="max-w-xl mx-auto">
          ${renderRecipeCard(result.primary)}
        </div>
        <div class="text-center pt-2">
          <a href="#/resep/${result.primary.slug}" class="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C84C24] hover:bg-[#AE3E1B] text-white text-xs font-bold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 border border-[#E05A30]">
            <span>${t('recommendations.openRecipeBtn')} (4 ${isEn ? 'People' : 'Orang'})</span>
            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Action: Restart Quiz or View All -->
      <div class="pt-6 border-t border-[#E8DEC8] flex flex-col sm:flex-row items-center justify-center gap-4">
        <button id="wizard-restart-btn" type="button" class="w-full sm:w-auto px-6 py-3 rounded-full border border-[#D49B42]/50 bg-white hover:bg-[#FAF7F2] text-[#120B07] text-xs font-bold transition-all shadow-xs cursor-pointer">
          &larr; ${t('recommendations.restartBtn')}
        </button>
        <a href="#/resep" class="w-full sm:w-auto px-6 py-3 rounded-full bg-[#120B07] hover:bg-[#C84C24] text-white text-xs font-bold transition-all shadow-md text-center">
          ${t('recipesSection.viewAll')} &rarr;
        </a>
      </div>

    </div>
  `;
}

export function initRecommendationsInteractions(onRerender) {
  // Option Card Radios (Step 1, 2, 3, 4)
  const optionCards = document.querySelectorAll('.wizard-option-card');
  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        const name = radio.name;
        const val = radio.value;
        currentAnswers[name] = val;
        validationError = null;

        // Visual update
        const siblings = document.querySelectorAll(`input[name="${name}"]`);
        siblings.forEach(s => {
          const parent = s.closest('.wizard-option-card');
          if (parent) {
            if (s.checked) {
              parent.className = 'wizard-option-card flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all duration-200 card-hover-lift border-[#C84C24] bg-[#FDF4EE] shadow-md ring-2 ring-[#C84C24]/30';
            } else {
              parent.className = 'wizard-option-card flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all duration-200 card-hover-lift border-[#D49B42]/30 bg-white hover:bg-[#FAF7F2]';
            }
          }
        });
      }
    });
  });

  // Next Button
  const nextBtn = document.getElementById('wizard-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', async () => {
      // Validate step 1
      if (wizardStep === 1 && !currentAnswers.flavor) {
        validationError = t('recommendations.validationFlavor');
        if (typeof onRerender === 'function') onRerender();
        return;
      }

      if (wizardStep < TOTAL_STEPS) {
        wizardStep++;
        if (typeof onRerender === 'function') onRerender();
      } else {
        // Processing recommendation
        isProcessing = true;
        if (typeof onRerender === 'function') onRerender();

        try {
          const res = await recommendationService.getRecommendation(currentAnswers);
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
        validationError = null;
        if (typeof onRerender === 'function') onRerender();
      }
    });
  }

  // Restart Button
  const restartBtn = document.getElementById('wizard-restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      activeResult = null;
      wizardStep = 1;
      currentAnswers = { flavor: '', timeAvailable: 'sedang', dishType: 'kuah-segar', budget: 'menengah', servings: 4 };
      if (typeof onRerender === 'function') onRerender();
    });
  }
}
