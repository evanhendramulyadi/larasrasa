import { recipeService, localizeRecipe } from '../services/recipeService.js';
import { getLocalizedFlavorProfiles } from '../data/flavorProfiles.js';
import { i18n, t } from '../i18n/index.js';
import { setActiveNavbarLink } from './navbar.js';

/**
 * Cultural Culinary Recipe Pop-up Modal Component
 * Styled identically to the beloved Rempah Modal with high-fidelity editorial craftsmanship,
 * inner vertical scrolling, authentic 4-porsi measurements, and cultural storytelling.
 */

export function renderRecipeModal(rawRecipe) {
  if (!rawRecipe) return '';
  const recipe = localizeRecipe(rawRecipe);
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';

  const localizedFlavors = getLocalizedFlavorProfiles();
  const flavorMap = {};
  localizedFlavors.forEach(f => {
    flavorMap[f.id] = f.name;
  });

  const flavorText = (recipe.flavorProfiles || []).map(f => flavorMap[f] || f).join(' • ');
  const cookingSteps = recipe.steps || recipe.instructions || [];

  return `
    <div id="recipe-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm spice-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-recipe-title">
      <div id="recipe-modal-dialog" class="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-2 border-[#D49B42]/40 overflow-hidden flex flex-col max-h-[88vh] my-auto spice-modal-card">
        
        <!-- Close Button (X) Top-Right -->
        <button type="button" 
                id="close-recipe-modal-btn" 
                class="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg" 
                aria-label="${t('spicesSection.closeModal') || 'Tutup'}">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Modal Header with Food Photograph (Shrink 0) -->
        <div class="relative w-full h-52 sm:h-64 shrink-0 overflow-hidden bg-[#120B07]">
          <img src="${recipe.image}" 
               alt="${recipe.name}" 
               class="w-full h-full object-cover filter brightness-[0.96] contrast-[1.04]"
               onerror="this.onerror=null; this.src='/assets/images/hero/hero-culinary.jpg'"/>
          <div class="absolute inset-0 bg-gradient-to-t from-[#120B07] via-black/45 to-transparent"></div>
          
          <div class="absolute bottom-3.5 left-5 right-14 text-white space-y-1.5">
            <div class="flex flex-wrap items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#120B07]/90 text-[#FAF7F2] backdrop-blur-md border border-[#D49B42]/50 shadow-md">
                <svg class="w-3.5 h-3.5 text-[#D49B42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>${recipe.regionName}</span>
              </span>

              <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/20 text-white backdrop-blur-md border border-white/20 shadow-xs">
                <span>${recipe.mealType || (isEn ? 'Traditional Cuisine' : 'Kuliner Tradisional')}</span>
              </span>
            </div>

            <h2 id="modal-recipe-title" class="font-editorial-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              ${recipe.name}
            </h2>

            ${recipe.javaneseName ? `
              <p class="text-xs sm:text-sm text-[#D49B42] italic font-editorial-serif font-semibold">
                "${recipe.javaneseName}"
              </p>
            ` : ''}
          </div>
        </div>

        <!-- Modal Body: Vertical Scrollable Content ("Vertikal & Cukup Pop Up Saja yang Di-scroll") -->
        <div class="p-5 sm:p-7 overflow-y-auto space-y-6 text-[#120B07]">
          
          <!-- Section 1: Ringkasan Citarasa & Porsi Resep (Strict 4 Porsi) -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-4 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 text-center">
            <div class="p-1">
              <span class="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#2E4D38] font-bold">${isEn ? 'Region' : 'Sentra Wilayah'}</span>
              <span class="font-bold text-xs sm:text-sm text-[#120B07] block mt-0.5 leading-snug">${recipe.regionName}</span>
            </div>
            <div class="p-1 sm:border-l sm:border-[#D49B42]/25">
              <span class="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#2E4D38] font-bold">${isEn ? 'Flavor' : 'Karakter Rasa'}</span>
              <span class="font-bold text-xs sm:text-sm text-[#120B07] block mt-0.5 leading-snug">${flavorText || 'Autentik'}</span>
            </div>
            <div class="p-1 sm:border-l sm:border-[#D49B42]/25">
              <span class="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#2E4D38] font-bold">${isEn ? 'Servings' : 'Takaran Porsi'}</span>
              <span class="font-bold text-xs sm:text-sm text-[#C84C24] block mt-0.5 leading-snug">${isEn ? '4 Servings' : '4 Porsi'}</span>
            </div>
            <div class="p-1 sm:border-l sm:border-[#D49B42]/25">
              <span class="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#2E4D38] font-bold">${isEn ? 'Tradition' : 'Ragam Pusaka'}</span>
              <span class="font-bold text-xs sm:text-sm text-[#120B07] block mt-0.5 leading-snug">${recipe.mealType || 'Tradisional'}</span>
            </div>
          </div>

          <!-- Section 2: Narasi Pengantar & Sejarah Warisan Leluhur -->
          <div class="space-y-3 p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30">
            <span class="text-[11px] font-bold text-[#C84C24] uppercase tracking-wider flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-[#C84C24]"></span>
              <span>${isEn ? 'Culinary Chronicle & Lore' : 'Catatan Sejarah & Warisan Budaya'}</span>
            </span>
            <p class="text-xs sm:text-sm text-[#120B07] leading-relaxed">
              ${recipe.intro}
            </p>
            ${recipe.history ? `
              <div class="pt-2.5 mt-2.5 border-t border-[#D49B42]/25 text-xs text-[#5C3622] leading-relaxed italic">
                "${recipe.history}"
              </div>
            ` : ''}
          </div>

          <!-- Section 3: Takaran Bahan & Komposisi Bumbu (Kalibrasi 4 Porsi) -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-editorial-serif text-lg sm:text-xl font-bold text-[#120B07] flex items-center gap-2">
                <span class="w-2 h-5 bg-[#C84C24] rounded-full inline-block"></span>
                <span>${t('recipeDetail.ingredientsTitle')}</span>
              </h3>
              <span class="text-xs font-bold text-[#C84C24] bg-[#FDF4EE] px-3 py-1 rounded-full border border-[#C84C24]/30">
                ${isEn ? 'For 4 Servings' : 'Untuk 4 Porsi'}
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${(recipe.ingredientGroups || []).map(group => `
                <div class="p-4 rounded-2xl bg-white border border-[#D49B42]/30 shadow-2xs space-y-2.5">
                  <h4 class="text-xs font-bold uppercase tracking-wider text-[#C84C24] border-b border-[#D49B42]/20 pb-1.5">
                    ${group.name}
                  </h4>
                  <ul class="space-y-2 text-xs">
                    ${(group.items || []).map(item => `
                      <li class="flex items-start justify-between gap-2 py-1 border-b border-[#E8DEC8]/50 last:border-0">
                        <span class="text-[#120B07] font-medium leading-tight">
                          ${item.name}
                          ${item.notes ? `<span class="block text-[10px] text-[#2E4D38] italic">${item.notes}</span>` : ''}
                        </span>
                        <span class="shrink-0 font-bold text-[#120B07] bg-[#FAF7F2] px-2.5 py-0.5 rounded-lg border border-[#D49B42]/30 text-[11px]">
                          ${item.amount} ${item.unit}
                        </span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Section 4: Langkah-Langkah Memasak Interaktif -->
          <div class="space-y-4">
            <h3 class="font-editorial-serif text-lg sm:text-xl font-bold text-[#120B07] flex items-center gap-2">
              <span class="w-2 h-5 bg-[#C84C24] rounded-full inline-block"></span>
              <span>${t('recipeDetail.stepsTitle')}</span>
            </h3>

            <div class="space-y-3">
              ${cookingSteps.map((step, idx) => `
                <div class="modal-step-card p-4 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 transition-all flex items-start gap-3.5" id="modal-step-${idx}">
                  <button type="button" 
                          data-modal-step-idx="${idx}"
                          class="modal-step-check shrink-0 mt-0.5 w-6 h-6 rounded-lg border-2 border-[#C84C24] flex items-center justify-center transition-all bg-white hover:bg-[#FAF7F2] cursor-pointer"
                          aria-label="Tandai langkah ${step.stepNumber || idx + 1}">
                    <svg class="modal-step-check-icon w-3.5 h-3.5 text-white hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </button>

                  <div class="flex-1 space-y-1">
                    <h4 class="font-editorial-serif text-sm font-bold text-[#120B07]">
                      ${t('common.step')} ${step.stepNumber || idx + 1}: ${step.title || ''}
                    </h4>
                    <p class="text-xs text-[#5C3622] leading-relaxed modal-step-text">
                      ${step.instruction || step.description || ''}
                    </p>
                    ${step.tip ? `
                      <p class="text-[11px] text-[#2E4D38] italic pt-1">
                        <strong>Tips:</strong> ${step.tip}
                      </p>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Section 5: Tips Pawon / Chef Tips -->
          ${recipe.cookingTips && recipe.cookingTips.length > 0 ? `
            <div class="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2">
              <span class="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <span>💡</span>
                <span>${t('recipeDetail.tipsTitle') || 'Kunci Kenikmatan Tradisional:'}</span>
              </span>
              <ul class="space-y-1.5 text-xs text-amber-900 leading-relaxed font-medium">
                ${(Array.isArray(recipe.cookingTips) ? recipe.cookingTips : [recipe.cookingTips]).map(tip => `
                  <li class="flex items-start gap-1.5">
                    <span class="text-amber-700 font-bold">&bull;</span>
                    <span>${tip}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

        </div>

        <!-- Modal Footer: Share & Close Action Buttons (Shrink 0) -->
        <div class="p-3.5 sm:p-4 bg-[#FAF7F2] border-t border-[#D49B42]/20 flex items-center justify-between gap-3 shrink-0">
          <button type="button" 
                  id="modal-recipe-share-btn" 
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#D49B42]/40 hover:bg-[#FAF7F2] text-[#120B07] text-xs font-bold transition-all cursor-pointer shadow-2xs">
            <svg class="w-3.5 h-3.5 text-[#C84C24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            <span id="modal-share-text">${t('recipeDetail.shareBtn') || 'Bagikan Resep'}</span>
          </button>

          <button type="button" 
                  id="modal-close-footer-btn" 
                  class="px-8 py-2 rounded-full text-xs font-bold text-white bg-[#120B07] hover:bg-[#C84C24] transition-all cursor-pointer shadow-xs border border-[#D49B42]/40">
            ${t('spicesSection.closeModal') || 'Tutup'}
          </button>
        </div>

      </div>
    </div>
  `;
}

let currentRecipeKeyDownHandler = null;
let activeRecipeModalSlug = null;
let previousRouteHash = null;

export function getActiveRecipeModalSlug() {
  const root = document.getElementById('recipe-modal-root');
  if (root && root.innerHTML.trim() !== '') {
    return activeRecipeModalSlug;
  }
  return null;
}

export function closeRecipeModal() {
  activeRecipeModalSlug = null;
  const root = document.getElementById('recipe-modal-root');
  if (root) {
    root.innerHTML = '';
  }
  document.querySelectorAll('#recipe-modal-backdrop').forEach(el => el.remove());
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  if (currentRecipeKeyDownHandler) {
    window.removeEventListener('keydown', currentRecipeKeyDownHandler);
    currentRecipeKeyDownHandler = null;
  }

  // If currently showing a recipe slug in the URL hash, return to standard recipes page (or previous hash)
  const currentHash = window.location.hash || '';
  if (currentHash.startsWith('#/recipes/') || currentHash.startsWith('#/resep/')) {
    const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
    const defaultRecipesHash = isEn ? '#/recipes' : '#/resep';
    const targetHash = (previousRouteHash && !previousRouteHash.startsWith('#/recipes/') && !previousRouteHash.startsWith('#/resep/'))
      ? previousRouteHash
      : defaultRecipesHash;
    previousRouteHash = null;

    if (window.location.hash !== targetHash) {
      history.replaceState(null, '', targetHash);
    }
    const targetPath = targetHash.replace(/^#/, '').split('?')[0] || '/';
    if (typeof setActiveNavbarLink === 'function') {
      setActiveNavbarLink(targetPath);
    }
  }
}

export async function openRecipeModal(slug) {
  activeRecipeModalSlug = slug;

  const currentHash = window.location.hash || '';
  if (!currentHash.startsWith('#/recipes/') && !currentHash.startsWith('#/resep/')) {
    previousRouteHash = currentHash || '#/';
  }

  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
  const detailHash = `${isEn ? '#/recipes' : '#/resep'}/${slug}`;
  if (window.location.hash !== detailHash) {
    history.replaceState(null, '', detailHash);
  }

  let root = document.getElementById('recipe-modal-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'recipe-modal-root';
    document.body.appendChild(root);
  }

  let recipe;
  try {
    recipe = await recipeService.getRecipeBySlug(slug);
  } catch (err) {
    console.error('Failed to load recipe for modal:', err);
    return;
  }

  if (!recipe) return;

  root.innerHTML = renderRecipeModal(recipe);

  // Lock background page scroll strictly (both html and body)
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  if (currentRecipeKeyDownHandler) {
    window.removeEventListener('keydown', currentRecipeKeyDownHandler);
  }
  currentRecipeKeyDownHandler = (e) => {
    if (e.key === 'Escape') {
      closeRecipeModal();
    }
  };
  window.addEventListener('keydown', currentRecipeKeyDownHandler);

  const closeBtn = document.getElementById('close-recipe-modal-btn');
  const closeFooterBtn = document.getElementById('modal-close-footer-btn');
  const backdrop = document.getElementById('recipe-modal-backdrop');

  if (closeBtn) closeBtn.addEventListener('click', closeRecipeModal);
  if (closeFooterBtn) closeFooterBtn.addEventListener('click', closeRecipeModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeRecipeModal();
    });
  }

  // Interactive Checklist Steps
  const stepChecks = root.querySelectorAll('[data-modal-step-idx]');
  stepChecks.forEach(btn => {
    btn.addEventListener('click', () => {
      const isChecked = btn.classList.contains('bg-[#C84C24]');
      const checkIcon = btn.querySelector('.modal-step-check-icon');
      const stepCard = btn.closest('.modal-step-card');
      const stepText = stepCard?.querySelector('.modal-step-text');

      if (isChecked) {
        btn.classList.remove('bg-[#C84C24]');
        btn.classList.add('bg-white');
        checkIcon?.classList.add('hidden');
        stepCard?.classList.remove('opacity-60', 'bg-emerald-50/50');
        stepText?.classList.remove('line-through', 'text-stone-400');
      } else {
        btn.classList.add('bg-[#C84C24]');
        btn.classList.remove('bg-white');
        checkIcon?.classList.remove('hidden');
        stepCard?.classList.add('opacity-60', 'bg-emerald-50/50');
        stepText?.classList.add('line-through', 'text-stone-400');
      }
    });
  });

  // Share Link Handler
  const shareBtn = document.getElementById('modal-recipe-share-btn');
  const shareText = document.getElementById('modal-share-text');
  if (shareBtn && shareText) {
    shareBtn.addEventListener('click', () => {
      const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
      const shareUrl = `${window.location.origin}${window.location.pathname}${isEn ? '#/recipes' : '#/resep'}/${slug}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        shareText.textContent = t('recipeDetail.linkCopied') || 'Tautan Disalin!';
        setTimeout(() => {
          shareText.textContent = t('recipeDetail.shareBtn') || 'Bagikan Resep';
        }, 2500);
      }).catch(() => {
        shareText.textContent = 'Copy failed';
      });
    });
  }
}
