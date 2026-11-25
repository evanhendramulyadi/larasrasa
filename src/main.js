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

  // Delegated smooth scroll for footer back to top button
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#footer-back-to-top');
    if (btn) {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  });

  // CSP-safe delegated image fallback handler (avoids inline onerror attributes)
  document.addEventListener('error', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLImageElement)) return;
    const fallback = target.getAttribute('data-fallback-src');
    if (fallback && target.getAttribute('src') !== fallback) {
      target.removeAttribute('data-fallback-src');
      target.src = fallback;
    }
  }, true);
});