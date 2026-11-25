import { renderNavbar, initNavbarInteractions, setActiveNavbarLink } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderHomePage, initHomePageInteractions } from './pages/home.js';
import { renderRecipesPage, initRecipesPageInteractions, resetRecipesPageState, setPendingFlavorFilter, setPendingRegionFilter } from './pages/recipes.js';
import { renderFlavorMapPage, initFlavorMapInteractions } from './pages/flavor-map.js';
import { renderSpicesPage, initSpicesPageInteractions, closeSpiceModal, openSpiceModal, getActiveSpiceModalId, resetSpicesPageState } from './pages/spices.js';
import { renderLegendaryRestaurantsPage, initLegendaryRestaurantsInteractions } from './pages/legendary-restaurants.js';
import { renderRecommendationsPage, initRecommendationsInteractions, resetRecommendationsWizard } from './pages/recommendations.js';
import { 
  renderAiFoodCreatorPage, 
  initAiFoodCreatorInteractions, 
  resetAiFoodCreatorState,
  isAiFoodCreatorGenerating,
  updateAiFoodCreatorGeneratingLanguage
} from './pages/ai-food-creator.js';
import { openRecipeModal, closeRecipeModal, getActiveRecipeModalSlug } from './components/recipe-modal.js';
import { recipeService, localizeRecipe } from './services/recipeService.js';
import { scrollToTop } from './utils/dom.js';
import { translateHashRoute, resolveNearestRoute } from './utils/routes.js';

export { resolveNearestRoute };

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
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    scrollToTop('instant');

    // Harmonize initial hash with active language on boot and resolve to nearest clean route
    const initialLang = i18n.getLanguage();
    const initialRaw = window.location.hash || '#/';
    const [initialPathPart] = initialRaw.split('?');
    const isEn = initialLang === 'en';
    const resolvedNearest = resolveNearestRoute(initialPathPart.replace(/^#/, ''), isEn);
    const harmonizedHash = translateHashRoute(`#${resolvedNearest}`, initialLang);
    if (harmonizedHash !== initialRaw) {
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

    // Delegated Recipe & Spice Card click & keyboard accessibility (triggers pop-up modal like rempah)
    document.addEventListener('click', (e) => {
      const flavorCard = e.target.closest('[data-flavor-spectrum]');
      if (flavorCard) {
        const flavorId = flavorCard.getAttribute('data-flavor-spectrum');
        if (flavorId) {
          setPendingFlavorFilter(flavorId);
        }
      }

      const regionCard = e.target.closest('[data-region-filter]');
      if (regionCard) {
        const regionId = regionCard.getAttribute('data-region-filter');
        if (regionId) {
          setPendingRegionFilter(regionId);
        }
      }

      const spiceCard = e.target.closest('[data-spice-id]');
      if (spiceCard) {
        e.preventDefault();
        const spiceId = spiceCard.getAttribute('data-spice-id');
        if (spiceId) {
          openSpiceModal(spiceId);
        }
        return;
      }

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
        closeRecipeModal(false);
        closeSpiceModal();
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const flavorCard = e.target.closest('[data-flavor-spectrum]');
        if (flavorCard && e.target === flavorCard) {
          const flavorId = flavorCard.getAttribute('data-flavor-spectrum');
          if (flavorId) {
            setPendingFlavorFilter(flavorId);
          }
        }

        const regionCard = e.target.closest('[data-region-filter]');
        if (regionCard && e.target === regionCard) {
          const regionId = regionCard.getAttribute('data-region-filter');
          if (regionId) {
            setPendingRegionFilter(regionId);
          }
        }

        const spiceCard = e.target.closest('[data-spice-id]');
        if (spiceCard && e.target === spiceCard) {
          e.preventDefault();
          const spiceId = spiceCard.getAttribute('data-spice-id');
          if (spiceId) {
            openSpiceModal(spiceId);
          }
          return;
        }

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

    const allowedQueryKeys = new Set(['flavor', 'region', 'search']);
    const queryParams = {};
    if (queryPart) {
      const searchParams = new URLSearchParams(queryPart);
      for (const [key, val] of searchParams.entries()) {
        if (allowedQueryKeys.has(key)) {
          queryParams[key] = val.slice(0, 100);
        }
      }
      // If the URL contained query parameters (like ?flavor=pedas or ?region=...),
      // immediately remove query parameters and normalize URL to the clean route
      const cleanHash = `#${path}`;
      if (window.location.hash !== cleanHash) {
        history.replaceState(null, '', cleanHash);
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
      closeRecipeModal(false);
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

    // 4. Parse current route & resolve nearest valid clean route
    let { path, queryParams } = this.parseHash();
    const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
    const nearestPath = resolveNearestRoute(path, isEn);

    if (nearestPath !== path) {
      path = nearestPath;
      history.replaceState(null, '', `#${nearestPath}`);
    }

    // Instant visual update for navbar active indicator
    setActiveNavbarLink(path);

    // Special handling for AI Food Creator while generating:
    // When language changes mid-process, update texts and shell in-place without re-rendering or resetting progress!
    if (isLanguageChange && (path === '/ai-food-creator') && isAiFoodCreatorGenerating()) {
      const currentLang = i18n?.getLanguage ? i18n.getLanguage() : 'id';
      i18n.updateDocumentTitle(t('nav.aiFoodCreator'));
      updateAiFoodCreatorGeneratingLanguage(currentLang);

      const navEl = document.getElementById('main-header');
      if (navEl) {
        const temp = document.createElement('div');
        temp.innerHTML = renderNavbar(path);
        const newNav = temp.firstElementChild;
        if (newNav) {
          navEl.replaceWith(newNav);
          initNavbarInteractions();
        }
      }

      const footerEl = document.querySelector('footer');
      if (footerEl) {
        const temp = document.createElement('div');
        temp.innerHTML = renderFooter();
        const newFooter = temp.firstElementChild;
        if (newFooter) {
          footerEl.replaceWith(newFooter);
        }
      }

      return;
    }

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
      const slug = path.replace(/^\/(resep|recipes)\//, '').replace(/\/$/, '');
      let recipe = null;
      try {
        recipe = await recipeService.getRecipeBySlug(slug);
      } catch (err) {
        recipe = null;
      }
      if (!recipe) {
        // Nearest valid route is the recipe catalog
        const fallbackPath = isEn ? '/recipes' : '/resep';
        history.replaceState(null, '', `#${fallbackPath}`);
        this.handleRouteChange();
        return;
      }
      pageHtml = await renderRecipesPage(queryParams);
      postRenderAction = () => {
        initRecipesPageInteractions();
        openRecipeModal(slug);
        const catalogPath = isEn ? '/recipes' : '/resep';
        history.replaceState(null, '', `#${catalogPath}`);
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
      // Any other unrecognized route immediately redirects to Home
      history.replaceState(null, '', '#/');
      this.handleRouteChange();
      return;
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
      // Scroll to top instantly on actual page navigation or reload
      scrollToTop('instant');
      requestAnimationFrame(() => {
        scrollToTop('instant');
      });
    }
  }
}

