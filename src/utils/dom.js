/**
 * DOM Utility Helpers for Vanilla JS
 */

export const $ = (selector, context = document) => context.querySelector(selector);
export const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Render HTML string into a container element and run optional post-render callback.
 */
export function render(container, htmlString, postRenderCallback = null) {
  if (!container) return;
  container.innerHTML = htmlString;
  if (typeof postRenderCallback === 'function') {
    requestAnimationFrame(() => postRenderCallback(container));
  }
}

/**
 * Smoothly scroll window to top
 */
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

