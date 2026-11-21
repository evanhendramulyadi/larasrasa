import { renderNavbar, initNavbarInteractions, setActiveNavbarLink } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderHomePage, initHomePageInteractions } from './pages/home.js';
import { renderRecipesPage, initRecipesPageInteractions, resetRecipesPageState } from './pages/recipes.js';
import { renderRecipeDetailPage, initRecipeDetailInteractions } from './pages/recipe-detail.js';
import { renderFlavorMapPage, initFlavorMapInteractions } from './pages/flavor-map.js';
import { renderSpicesPage, initSpicesPageInteractions, closeSpiceModal, openSpiceModal, getActiveSpiceModalId, resetSpicesPageState } from './pages/spices.js';
import { renderLegendaryRestaurantsPage, initLegendaryRestaurantsInteractions } from './pages/legendary-restaurants.js';
import { renderRecommendationsPage, initRecommendationsInteractions, resetRecommendationsWizard } from './pages/recommendations.js';
import { renderAiFoodCreatorPage, initAiFoodCreatorInteractions, resetAiFoodCreatorState } from './pages/ai-food-creator.js';
import { openRecipeModal, closeRecipeModal, getActiveRecipeModalSlug } from './components/recipe-modal.js';
import { recipeService, localizeRecipe } from './services/recipeService.js';
import { scrollToTop } from './utils/dom.js';
import { translateHashRoute } from './utils/routes.js';

/**
 * Client-Side Router for LarasRasa SPA
 */

import { t, i18n } from './i18n/index.js';

export class Router {
  constructor(appContainer) {
    this.app = appContainer;
    this.currentCleanups = [];
    this.handleRouteChange = this.handleRouteChange.bind(this);
  }

  init() {
    // Harmonize initial hash with active language on boot
    const initialLang = i18n.getLanguage();
    const initialHash = window.location.hash || '#/';
    const harmonizedHash = translateHashRoute(initialHash, initialLang);
    if (harmonizedHash !== initialHash) {
      history.replaceState(null, '', harmonizedHash);
    }

    window.addEventListener('hashchange', () => {
      const { path } = this.parseHash();
      setActiveNavbarLink(path);
      this.handleRouteChange();
    });
    window.addEventListener('larasrasa:languagechange', (e) => {
      const savedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const activeRecipeSlug = getActiveRecipeModalSlug ? getActiveRecipeModalSlug() : null;
      const activeSpiceId = getActiveSpiceModalId ? getActiveSpiceModalId() : null;

      const targetLang = e?.detail?.lang || i18n.getLanguage();
      const currentHash = window.location.hash || '#/';
      const translatedHash = translateHashRoute(currentHash, targetLang);
      if (translatedHash !== currentHash) {
        history.replaceState(null, '', translatedHash);
      }

      this.handleRouteChange({
        isLanguageChange: true,
        savedScrollY,
        activeRecipeSlug,
        activeSpiceId
      });
    });

    // Delegated Recipe Card click & keyboard accessibility (triggers pop-up modal like rempah)
    document.addEventListener('click', (e) => {
      const card = e.target.closest('[data-recipe-slug]');
      if (card) {
        e.preventDefault();
        const slug = card.getAttribute('data-recipe-slug');
        if (slug) {
          openRecipeModal(slug);
        }
        return;
      }

      // Any navigation link click immediately closes open modals and resets state
      const navLink = e.target.closest('a[href^="#/"]');
      if (navLink) {
        closeRecipeModal();
        closeSpiceModal();
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('[data-recipe-slug]');
        if (card && e.target === card) {
          e.preventDefault();
          const slug = card.getAttribute('data-recipe-slug');
          if (slug) {
            openRecipeModal(slug);
          }
        }
      }
    });

    this.handleRouteChange();
  }

  parseHash() {
    const rawHash = window.location.hash.slice(1) || '/';
    const [pathPart, queryPart] = rawHash.split('?');
    const path = pathPart.startsWith('/') ? pathPart : `/${pathPart}`;

    const queryParams = {};
    if (queryPart) {
      const searchParams = new URLSearchParams(queryPart);
      for (const [key, val] of searchParams.entries()) {
        queryParams[key] = val;
      }
    }

    return { path, queryParams };
  }

  async handleRouteChange(options = {}) {
    const isLanguageChange = options.isLanguageChange || false;
    const savedScrollY = options.savedScrollY ?? (window.scrollY || document.documentElement.scrollTop || 0);
    const activeRecipeSlug = options.activeRecipeSlug || null;
    const activeSpiceId = options.activeSpiceId || null;

    // 1. Immediately clear any input text or textarea before destroying old page (only on actual page navigation)
    if (!isLanguageChange && this.app) {
      this.app.querySelectorAll('input, textarea').forEach(el => {
        el.value = '';
      });
    }

    // 2. Run cleanups for previous view: close modals, reset scroll locks, close mobile drawer
    if (!isLanguageChange) {
      closeRecipeModal();
      closeSpiceModal();
    }

    const drawer = document.getElementById('mobile-menu-drawer');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');
    if (drawer && !drawer.classList.contains('hidden')) {
      drawer.classList.add('hidden');
      if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
      if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    }

    if (!activeRecipeSlug && !activeSpiceId) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    if (window._currentHeroShowcase) {
      window._currentHeroShowcase.dispose();
      window._currentHeroShowcase = null;
    }

    // 3. Reset module states ONLY on actual route navigation, NOT on language translation
    if (!isLanguageChange) {
      resetAiFoodCreatorState();
      resetRecommendationsWizard();
      resetRecipesPageState();
      resetSpicesPageState();
    }

    // 4. Parse current route
    const { path, queryParams } = this.parseHash();

    // Instant visual update for navbar active indicator
    setActiveNavbarLink(path);

    // 3. Match Route & Render Page Content
    let pageHtml = '';
    let postRenderAction = null;
    let pageTitlePrefix = '';

    if (path === '/' || path === '') {
      pageHtml = await renderHomePage();
      postRenderAction = () => initHomePageInteractions();
      pageTitlePrefix = '';
    } else if (path === '/resep' || path === '/recipes') {
      pageHtml = await renderRecipesPage(queryParams);
      postRenderAction = () => initRecipesPageInteractions();
      pageTitlePrefix = t('nav.recipes');
    } else if (path.startsWith('/resep/') || path.startsWith('/recipes/')) {
      const slug = path.replace(/^\/(resep|recipes)\//, '');
      pageHtml = await renderRecipesPage(queryParams);
      postRenderAction = () => {
        initRecipesPageInteractions();
        openRecipeModal(slug);
      };
      pageTitlePrefix = t('nav.recipes');
    } else if (path === '/peta-rasa' || path === '/flavor-map') {
      pageHtml = await renderFlavorMapPage();
      postRenderAction = () => initFlavorMapInteractions();
      pageTitlePrefix = t('nav.flavorMap');
    } else if (path === '/jelajah-rempah' || path === '/spices') {
      pageHtml = await renderSpicesPage();
      postRenderAction = () => initSpicesPageInteractions();
      pageTitlePrefix = t('nav.spices');
    } else if (path === '/restoran-legendaris' || path === '/restaurants') {
      pageHtml = await renderLegendaryRestaurantsPage();
      postRenderAction = () => initLegendaryRestaurantsInteractions();
      pageTitlePrefix = t('nav.restaurants');
    } else if (path === '/rekomendasi' || path === '/recommendations') {
      pageHtml = await renderRecommendationsPage();
      pageTitlePrefix = t('nav.recommendations');
      const renderWizard = async () => {
        const updatedHtml = await renderRecommendationsPage();
        const pageMain = document.getElementById('page-main-content');
        if (pageMain) {
          pageMain.innerHTML = updatedHtml;
          initRecommendationsInteractions(renderWizard);
        }
      };
      postRenderAction = () => {
        initRecommendationsInteractions(renderWizard);
      };
    } else if (path === '/ai-food-creator') {
      pageHtml = await renderAiFoodCreatorPage();
      postRenderAction = () => initAiFoodCreatorInteractions();
      pageTitlePrefix = t('nav.aiFoodCreator');
    } else {
      pageTitlePrefix = '404';
      // 404 Fallback with bilingual & Javanese touch
      const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
      pageHtml = `
        <div class="max-w-xl mx-auto px-4 py-28 text-center space-y-5">
          <span class="font-editorial-serif text-7xl font-bold text-[#C84C24] block drop-shadow-sm">404</span>
          <h2 class="font-editorial-serif text-3xl font-bold text-[#120B07]">
            ${isEn ? 'Page Not Found' : 'Halaman Tidak Ditemukan'}
          </h2>
          <p class="text-sm text-[#5C3622] leading-relaxed max-w-md mx-auto">
            ${isEn 
              ? 'The culinary page you are looking for does not exist in LarasRasa.' 
              : 'Mohon maaf, halaman kuliner yang Anda tuju tidak ditemukan di khasanah LarasRasa.'}
          </p>
          <div class="pt-3">
            <a href="#/" class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#120B07] hover:bg-[#C84C24] text-[#FAF7F2] text-xs font-bold transition-all shadow-md border border-[#D49B42]/40">
              &larr; ${t('nav.home')}
            </a>
          </div>
        </div>
      `;
    }

    // Update document title reactively
    i18n.updateDocumentTitle(pageTitlePrefix);

    // 4. Assemble Shell (Navbar + Main Content + Footer)
    this.app.innerHTML = `
      ${renderNavbar(path)}
      <main id="page-main-content" class="flex-1 transition-opacity duration-300">
        ${pageHtml}
      </main>
      ${renderFooter()}
    `;

    // 5. Initialize Navbar Interactions
    initNavbarInteractions();

    // 6. Execute View-specific JS
    if (typeof postRenderAction === 'function') {
      requestAnimationFrame(() => postRenderAction());
    }

    // 7. Scroll handling & Modal preservation
    if (isLanguageChange) {
      if (activeRecipeSlug) {
        openRecipeModal(activeRecipeSlug);
      } else if (activeSpiceId) {
        openSpiceModal(activeSpiceId);
      }

      window.scrollTo({ top: savedScrollY, left: 0, behavior: 'instant' });
      if (document.documentElement) document.documentElement.scrollTop = savedScrollY;
      if (document.body) document.body.scrollTop = savedScrollY;

      requestAnimationFrame(() => {
        window.scrollTo({ top: savedScrollY, left: 0, behavior: 'instant' });
        if (document.documentElement) document.documentElement.scrollTop = savedScrollY;
        if (document.body) document.body.scrollTop = savedScrollY;
      });
    } else {
      // Scroll to top smoothly on actual page navigation
      scrollToTop();
    }
  }
}

