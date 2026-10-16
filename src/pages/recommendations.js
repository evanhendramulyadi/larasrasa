import { recommendationService } from '../services/recommendationService.js';
import { flavorProfiles } from '../data/flavorProfiles.js';
import { renderRecipeCard } from '../components/recipe-card.js';
import { t } from '../i18n/index.js';

/**
 * Rekomendasi Untukmu (Personalized Food Finder)
 * 5-Step guided questionnaire with progress bar, robust validation, curated results, and full i18n.
 */

let wizardStep = 1;
let currentAnswers = {
  flavor: '',
  timeAvailable: 'sedang',
  servings: 4,
  budget: 'menengah',
  availableIngredients: []
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
      <div class="w-16 h-16 rounded-full bg-[#302018] text-[#C49A58] flex items-center justify-center mx-auto shadow-md animate-pulse">
        <svg class="w-8 h-8 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10"/>
        </svg>
      </div>
      <div class="space-y-2">
        <h2 class="font-editorial-serif text-3xl font-bold text-[#302018]">
          ${t('recommendations.processingTitle')}
        </h2>
        <p class="text-sm text-[#654332]">
          ${t('recommendations.processingSub')}
        </p>
      </div>
    </div>
  `;
}

function renderWizardView(step) {
  const totalSteps = 5;
  const progressPercent = Math.round((step / totalSteps) * 100);

  return `
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      <!-- Wizard Header -->
      <div class="text-center space-y-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2E8D8] text-xs font-semibold text-[#B85C38] uppercase tracking-wider">
          ${t('recommendations.badge')}
        </span>
        <h1 class="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#302018]">
          ${t('recommendations.title')}
        </h1>
        <p class="text-xs sm:text-sm text-[#654332]">
          ${t('recommendations.subtitle')}
        </p>
      </div>

      <!-- Progress Indicator -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-xs font-bold text-[#654332]">
          <span>${t('recommendations.stepOf')} ${step} ${t('recommendations.of')} ${totalSteps}</span>
          <span>${progressPercent}% ${t('recommendations.completed')}</span>
        </div>
        <div class="w-full h-2 rounded-full bg-[#F2E8D8] overflow-hidden">
          <div class="h-full bg-[#B85C38] transition-all duration-300" style="width: ${progressPercent}%;"></div>
        </div>
      </div>

      <!-- Step Card Container -->
      <div class="bg-white p-6 sm:p-10 rounded-3xl border border-[#C49A58]/20 shadow-sm space-y-8">
        
        <!-- Inline Validation Alert (if any) -->
        ${validationError ? `
          <div id="wizard-validation-alert" class="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center gap-3 animate-shake">
            <svg class="w-5 h-5 text-amber-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span class="font-semibold">${validationError}</span>
          </div>
        ` : ''}

        ${renderStepContent(step)}

        <!-- Navigation Buttons -->
        <div class="pt-6 border-t border-[#F2E8D8] flex items-center justify-between">
          ${step > 1 ? `
            <button id="wizard-prev-btn" type="button" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#302018] hover:bg-[#F2E8D8] transition-colors">
              &larr; ${t('recommendations.prevBtn')}
            </button>
          ` : `<div></div>`}

          <button id="wizard-next-btn" type="button" class="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold bg-[#302018] hover:bg-[#654332] text-[#FAF6EF] transition-all shadow-sm">
            <span>${step === totalSteps ? t('recommendations.submitBtn') : t('recommendations.nextBtn')}</span>
            <svg class="w-4 h-4 text-[#C49A58]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- AI Food Creator Link Callout -->
      <div class="p-4 rounded-2xl bg-[#F2E8D8]/70 border border-[#C49A58]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div class="flex items-center gap-2 text-[#302018]">
          <span class="text-base">✨</span>
          <span>Ingin meracik kreasi resep orisinal Anda sendiri dengan bumbu pilihan?</span>
        </div>
        <a href="#/ai-food-creator" class="px-4 py-2 rounded-xl bg-[#B85C38] hover:bg-[#A04A27] text-white font-bold shrink-0 transition-colors shadow-2xs">
          Coba AI Food Creator &rarr;
        </a>
      </div>

    </div>
  `;
}

function renderStepContent(step) {
  switch (step) {
    case 1:
      return `
        <div class="space-y-4">
          <div>
            <h2 class="font-editorial-serif text-2xl font-bold text-[#302018]">
              ${t('recommendations.q1Title')}
            </h2>
            <p class="text-xs text-[#654332]">${t('recommendations.q1Sub')}</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            ${flavorProfiles.map(f => {
              const isChecked = currentAnswers.flavor === f.id;
              return `
                <label class="wizard-option-card flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  isChecked 
                    ? 'border-[#B85C38] bg-[#B85C38]/10 shadow-xs ring-1 ring-[#B85C38]' 
                    : 'border-[#C49A58]/20 bg-white hover:bg-[#FAF6EF]'
                }">
                  <input type="radio" name="flavor" value="${f.id}" class="sr-only" ${isChecked ? 'checked' : ''}/>
                  <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs" style="background-color: ${f.color}20; color: ${f.color};">
                    ●
                  </div>
                  <div>
                    <strong class="block text-sm text-[#302018] font-bold">${f.name}</strong>
                    <span class="text-xs text-[#654332] leading-snug">${f.tagline}</span>
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
            <h2 class="font-editorial-serif text-2xl font-bold text-[#302018]">
              ${t('recommendations.q2Title')}
            </h2>
            <p class="text-xs text-[#654332]">${t('recommendations.q2Sub')}</p>
          </div>
          <div class="space-y-3 pt-2">
            ${[
              { id: 'cepat', title: 'Praktis & Kilat', desc: 'Kurang dari 35 menit (seperti mendoan atau tahu gimbal dadakan)', duration: '≤ 35 Menit' },
              { id: 'sedang', title: 'Waktu Standar', desc: '35 hingga 60 menit (memasak soto kuah kencur atau selat bistik)', duration: '35 – 60 Menit' },
              { id: 'leluasa', title: 'Leluasa & Khidmat', desc: 'Lebih dari 60 menit (mengungkep liwet santan atau bacem legit)', duration: '> 60 Menit' }
            ].map(tim => {
              const isChecked = currentAnswers.timeAvailable === tim.id;
              return `
                <label class="wizard-option-card flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  isChecked 
                    ? 'border-[#B85C38] bg-[#B85C38]/10 shadow-xs ring-1 ring-[#B85C38]' 
                    : 'border-[#C49A58]/20 bg-white hover:bg-[#FAF6EF]'
                }">
                  <div class="flex items-center gap-3">
                    <input type="radio" name="timeAvailable" value="${tim.id}" class="sr-only" ${isChecked ? 'checked' : ''}/>
                    <div>
                      <strong class="block text-sm text-[#302018] font-bold">${tim.title}</strong>
                      <span class="text-xs text-[#654332]">${tim.desc}</span>
                    </div>
                  </div>
                  <span class="text-xs font-mono font-bold text-[#B85C38] bg-[#F2E8D8] px-2.5 py-1 rounded-md border border-[#C49A58]/20">
                    ${tim.duration}
                  </span>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;

    case 3:
      return `
        <div class="space-y-4">
          <div>
            <h2 class="font-editorial-serif text-2xl font-bold text-[#302018]">
              ${t('recommendations.q3Title')}
            </h2>
            <p class="text-xs text-[#654332]">${t('recommendations.q3Sub')}</p>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            ${[2, 4, 6, 8].map(p => {
              const isChecked = currentAnswers.servings === p;
              return `
                <label class="wizard-option-card p-5 rounded-2xl border text-center cursor-pointer transition-all ${
                  isChecked 
                    ? 'border-[#B85C38] bg-[#B85C38]/10 shadow-xs ring-1 ring-[#B85C38]' 
                    : 'border-[#C49A58]/20 bg-white hover:bg-[#FAF6EF]'
                }">
                  <input type="radio" name="servings" value="${p}" class="sr-only" ${isChecked ? 'checked' : ''}/>
                  <span class="block font-editorial-serif text-3xl font-bold text-[#302018] mb-1">${p}</span>
                  <span class="text-xs font-semibold uppercase tracking-wider text-[#654332]">Porsi</span>
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
            <h2 class="font-editorial-serif text-2xl font-bold text-[#302018]">
              ${t('recommendations.q4Title')}
            </h2>
            <p class="text-xs text-[#654332]">${t('recommendations.q4Sub')}</p>
          </div>
          <div class="space-y-3 pt-2">
            ${[
              { id: 'hemat', title: 'Hemat & Ekonomis', desc: 'Bahan olahan kedelai lokal (tempe mendoan, tahu gimbal, megono)', est: 'Rp 15.000 – Rp 35.000' },
              { id: 'menengah', title: 'Menengah Sehari-hari', desc: 'Olahan ayam kampung & sayur berkuah (Soto Kudus, Garang Asem, Nasi Liwet)', est: 'Rp 40.000 – Rp 65.000' },
              { id: 'istimewa', title: 'Sajian Istimewa Ningrat', desc: 'Olahan daging sapi atau kambing berempah (Selat Solo, Sate Buntel)', est: 'Rp 70.000 – Rp 95.000' }
            ].map(b => {
              const isChecked = currentAnswers.budget === b.id;
              return `
                <label class="wizard-option-card flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  isChecked 
                    ? 'border-[#B85C38] bg-[#B85C38]/10 shadow-xs ring-1 ring-[#B85C38]' 
                    : 'border-[#C49A58]/20 bg-white hover:bg-[#FAF6EF]'
                }">
                  <div class="flex items-center gap-3">
                    <input type="radio" name="budget" value="${b.id}" class="sr-only" ${isChecked ? 'checked' : ''}/>
                    <div>
                      <strong class="block text-sm text-[#302018] font-bold">${b.title}</strong>
                      <span class="text-xs text-[#654332]">${b.desc}</span>
                    </div>
                  </div>
                  <span class="text-xs font-bold text-[#B85C38] bg-[#F2E8D8] px-2.5 py-1 rounded-md border border-[#C49A58]/20">
                    ${b.est}
                  </span>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;

    case 5:
      return `
        <div class="space-y-4">
          <div>
            <h2 class="font-editorial-serif text-2xl font-bold text-[#302018]">
              ${t('recommendations.q5Title')}
            </h2>
            <p class="text-xs text-[#654332]">${t('recommendations.q5Sub')}</p>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
            ${[
              { id: 'ayam', label: 'Daging Ayam' },
              { id: 'tempe', label: 'Tempe / Kedelai' },
              { id: 'tahu', label: 'Tahu Putih' },
              { id: 'sapi', label: 'Daging Sapi' },
              { id: 'kambing', label: 'Daging Kambing' },
              { id: 'telur', label: 'Telur Ayam' },
              { id: 'santan', label: 'Kelapa / Santan' },
              { id: 'rebung', label: 'Rebung / Nangka' },
              { id: 'sayur', label: 'Labu Siam / Buncis' }
            ].map(ing => {
              const isChecked = currentAnswers.availableIngredients.includes(ing.id);
              return `
                <label class="wizard-checkbox-card flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                  isChecked 
                    ? 'border-[#B85C38] bg-[#B85C38]/10 font-bold' 
                    : 'border-[#C49A58]/20 bg-white hover:bg-[#FAF6EF]'
                }">
                  <input type="checkbox" name="ingredients" value="${ing.id}" class="rounded text-[#B85C38]" ${isChecked ? 'checked' : ''}/>
                  <span class="text-xs text-[#302018]">${ing.label}</span>
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

function renderResultView(res) {
  const p = res.primaryRecommendation;

  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      <!-- Top Success Alert -->
      <div class="text-center space-y-3">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B85C38]/15 text-xs font-bold text-[#B85C38] uppercase tracking-wider">
          ${t('recommendations.resultBadge')}
        </span>
        <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-[#302018]">
          ${t('recommendations.resultTitle')}
        </h1>
        <p class="text-xs sm:text-sm text-[#654332] max-w-xl mx-auto">
          ${t('recommendations.resultSub')}
        </p>
      </div>

      <!-- Main Recommendation Showcase Card -->
      <div class="bg-white rounded-3xl border-2 border-[#B85C38] shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
        
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <!-- Food Image with Match Badge -->
          <div class="md:col-span-5 relative aspect-4/3 rounded-2xl overflow-hidden border border-[#C49A58]/20 shadow-md bg-[#302018]/10">
            <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover"/>
            <div class="absolute top-3 left-3 bg-[#B85C38] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              ${res.matchScore}% ${t('recommendations.matchBadge')}
            </div>
          </div>

          <!-- Summary & Highlights -->
          <div class="md:col-span-7 space-y-4">
            <div class="space-y-1">
              <span class="text-xs font-bold text-[#B85C38] uppercase tracking-wider">
                Khas ${p.regionName} &bull; ${p.mealType}
              </span>
              <h2 class="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#302018]">
                ${p.name}
              </h2>
            </div>

            <!-- Narrative Rationale in Natural Language -->
            <div class="p-4 rounded-xl bg-[#FAF6EF] border border-[#C49A58]/20 text-xs sm:text-sm text-[#654332] leading-relaxed">
              ${res.rationale}
            </div>

            <!-- Highlights Checklist -->
            <div class="space-y-1.5 text-xs text-[#302018]">
              ${res.matchHighlights.map(h => `
                <div class="flex items-center gap-2">
                  <span class="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">&check;</span>
                  <span>${h}</span>
                </div>
              `).join('')}
            </div>

            <!-- Meta Quick Badges -->
            <div class="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span class="px-3 py-1 rounded-lg bg-[#FAF6EF] border border-[#C49A58]/20 font-semibold text-[#302018]">
                ⏱ Waktu: ${p.cookingDuration}
              </span>
              <span class="px-3 py-1 rounded-lg bg-[#FAF6EF] border border-[#C49A58]/20 font-semibold text-[#302018]">
                👥 ${res.suggestedServings} Porsi
              </span>
              <span class="px-3 py-1 rounded-lg bg-[#FAF6EF] border border-[#C49A58]/20 font-semibold text-[#B85C38]">
                💰 Est. ${res.estimatedCostForServings}
              </span>
            </div>
          </div>
        </div>

        <!-- Action CTAs -->
        <div class="pt-6 border-t border-[#F2E8D8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button id="wizard-restart-btn" type="button" class="text-xs font-semibold text-[#654332] hover:text-[#302018] underline transition-colors cursor-pointer">
            &larr; ${t('recommendations.restartBtn')}
          </button>
          
          <a href="#/resep/${p.slug}" 
             class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-bold bg-[#302018] hover:bg-[#654332] text-[#FAF6EF] transition-all shadow-md">
            <span>${t('recommendations.openRecipeBtn')}</span>
            <svg class="w-4 h-4 text-[#C49A58]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

      </div>

      <!-- Alternative Suggestions -->
      ${res.alternatives && res.alternatives.length > 0 ? `
        <div class="space-y-4 pt-6">
          <div class="space-y-1">
            <h3 class="font-editorial-serif text-2xl font-bold text-[#302018]">
              ${t('recommendations.alternativesTitle')}
            </h3>
            <p class="text-xs text-[#654332]">${t('recommendations.alternativesSub')}</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            ${res.alternatives.map(alt => renderRecipeCard(alt)).join('')}
          </div>
        </div>
      ` : ''}

    </div>
  `;
}

export function initRecommendationsInteractions(onRerender) {
  // Listen to change on all radio inputs directly
  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      validationError = null;
      const name = radio.name;
      const val = radio.value;

      if (name === 'flavor') currentAnswers.flavor = val;
      if (name === 'timeAvailable') currentAnswers.timeAvailable = val;
      if (name === 'servings') currentAnswers.servings = parseInt(val, 10);
      if (name === 'budget') currentAnswers.budget = val;

      // Update styling
      document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
        const pCard = r.closest('.wizard-option-card');
        if (pCard) {
          if (r.checked) {
            pCard.classList.add('border-[#B85C38]', 'bg-[#B85C38]/10', 'shadow-xs', 'ring-1', 'ring-[#B85C38]');
            pCard.classList.remove('border-[#C49A58]/20', 'bg-white');
          } else {
            pCard.classList.remove('border-[#B85C38]', 'bg-[#B85C38]/10', 'shadow-xs', 'ring-1', 'ring-[#B85C38]');
            pCard.classList.add('border-[#C49A58]/20', 'bg-white');
          }
        }
      });
    });
  });

  // Checkbox ingredients change
  document.querySelectorAll('input[name="ingredients"]').forEach(chk => {
    chk.addEventListener('change', () => {
      const parent = chk.closest('.wizard-checkbox-card');
      if (chk.checked) {
        if (!currentAnswers.availableIngredients.includes(chk.value)) {
          currentAnswers.availableIngredients.push(chk.value);
        }
        parent?.classList.add('border-[#B85C38]', 'bg-[#B85C38]/10', 'font-bold');
      } else {
        currentAnswers.availableIngredients = currentAnswers.availableIngredients.filter(v => v !== chk.value);
        parent?.classList.remove('border-[#B85C38]', 'bg-[#B85C38]/10', 'font-bold');
      }
    });
  });

  // Next Button
  const nextBtn = document.getElementById('wizard-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      
      // Step 1 Validation
      if (wizardStep === 1 && !currentAnswers.flavor) {
        validationError = t('recommendations.validationFlavor');
        if (typeof onRerender === 'function') onRerender();
        return;
      }
      validationError = null;

      // Step defaults fallback
      if (wizardStep === 2 && !currentAnswers.timeAvailable) {
        currentAnswers.timeAvailable = 'sedang';
      }
      if (wizardStep === 3 && !currentAnswers.servings) {
        currentAnswers.servings = 4;
      }
      if (wizardStep === 4 && !currentAnswers.budget) {
        currentAnswers.budget = 'menengah';
      }

      if (wizardStep < 5) {
        wizardStep++;
        if (typeof onRerender === 'function') onRerender();
      } else {
        // Step 5 Submit: generate recommendations
        isProcessing = true;
        if (typeof onRerender === 'function') onRerender();

        try {
          activeResult = await recommendationService.getRecommendations(currentAnswers);
        } catch (err) {
          validationError = 'Terjadi kendala saat meracik rekomendasi. Silakan coba lagi.';
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
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      validationError = null;
      if (wizardStep > 1) {
        wizardStep--;
        if (typeof onRerender === 'function') onRerender();
      }
    });
  }

  // Restart Button
  const restartBtn = document.getElementById('wizard-restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      wizardStep = 1;
      activeResult = null;
      validationError = null;
      currentAnswers = {
        flavor: '',
        timeAvailable: 'sedang',
        servings: 4,
        budget: 'menengah',
        availableIngredients: []
      };
      if (typeof onRerender === 'function') onRerender();
    });
  }
}
