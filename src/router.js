import { renderNavbar, initNavbarInteractions } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderHomePage, initHomePageInteractions } from './pages/home.js';
import { renderRecipesPage, initRecipesPageInteractions } from './pages/recipes.js';
import { renderRecipeDetailPage, initRecipeDetailInteractions } from './pages/recipe-detail.js';
import { renderFlavorMapPage, initFlavorMapInteractions } from './pages/flavor-map.js';
import { renderSpicesPage, initSpicesPageInteractions } from './pages/spices.js';
import { renderLegendaryRestaurantsPage, initLegendaryRestaurantsInteractions } from './pages/legendary-restaurants.js';
import { renderRecommendationsPage, initRecommendationsInteractions } from './pages/recommendations.js';
import { renderAboutPage } from './pages/about.js';
import { renderAiFoodCreatorPage, initAiFoodCreatorInteractions } from './pages/ai-food-creator.js';
import { recipeService } from './services/recipeService.js';
import { scrollToTop } from './utils/dom.js';

/**
 * Client-Side Router for LarasRasa SPA
 */

import { t } from './i18n/index.js';

export class Router {
  constructor(appContainer) {
    this.app = appContainer;
    this.currentCleanups = [];
    this.handleRouteChange = this.handleRouteChange.bind(this);
  }

  init() {
    window.addEventListener('hashchange', this.handleRouteChange);
    window.addEventListener('larasrasa:languagechange', () => {
      this.handleRouteChange();
    });

    // Delegated Recipe Card click & keyboard accessibility
    document.addEventListener('click', (e) => {
      const card = e.target.closest('[data-recipe-slug]');
      if (card && !e.target.closest('a')) {
        const slug = card.getAttribute('data-recipe-slug');
        if (slug) {
          window.location.hash = `#/resep/${slug}`;
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('[data-recipe-slug]');
        if (card && e.target === card) {
          e.preventDefault();
          const slug = card.getAttribute('data-recipe-slug');
          if (slug) {
            window.location.hash = `#/resep/${slug}`;
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

  async handleRouteChange() {
    // 1. Run cleanups for previous view (e.g. Three.js scenes, Leaflet maps)
    if (window._currentHeroShowcase) {
      window._currentHeroShowcase.dispose();
      window._currentHeroShowcase = null;
    }

    // 2. Parse current route
    const { path, queryParams } = this.parseHash();

    // 3. Match Route & Render Page Content
    let pageHtml = '';
    let postRenderAction = null;

    if (path === '/' || path === '') {
      pageHtml = await renderHomePage();
      postRenderAction = () => initHomePageInteractions();
    } else if (path === '/resep') {
      pageHtml = await renderRecipesPage(queryParams);
      postRenderAction = () => initRecipesPageInteractions();
    } else if (path.startsWith('/resep/')) {
      const slug = path.replace('/resep/', '');
      pageHtml = await renderRecipeDetailPage(slug, queryParams);
      postRenderAction = async () => {
        try {
          const rec = await recipeService.getRecipeBySlug(slug);
          initRecipeDetailInteractions(rec);
        } catch (e) {
          console.warn(e);
        }
      };
    } else if (path === '/peta-rasa') {
      pageHtml = await renderFlavorMapPage();
      postRenderAction = () => initFlavorMapInteractions();
    } else if (path === '/jelajah-rempah') {
      pageHtml = await renderSpicesPage();
      postRenderAction = () => initSpicesPageInteractions();
    } else if (path === '/restoran-legendaris') {
      pageHtml = await renderLegendaryRestaurantsPage();
      postRenderAction = () => initLegendaryRestaurantsInteractions();
    } else if (path === '/rekomendasi') {
      pageHtml = await renderRecommendationsPage();
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
    } else if (path === '/tentang') {
      pageHtml = await renderAboutPage();
    } else {
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

    // 7. Scroll to top smoothly
    scrollToTop();
  }
}

