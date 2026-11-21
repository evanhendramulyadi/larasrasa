import './style.css';
import { Router } from './router.js';

// Ensure browser scroll restoration is disabled so refreshing always lands at top instantly without animation
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  if (document.documentElement) document.documentElement.scrollTop = 0;
  if (document.body) document.body.scrollTop = 0;
}

/**
 * LarasRasa Main Application Entry Point
 */
document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  if (!appContainer) {
    console.error('Root element #app not found');
    return;
  }

  const router = new Router(appContainer);
  router.init();
});