import './style.css';
import { Router } from './router.js';

// Ensure browser scroll restoration is disabled so refreshing always lands at top
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
  window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
  });
  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  });
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