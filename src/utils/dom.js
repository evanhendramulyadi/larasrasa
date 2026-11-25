/**
 * DOM Utility Helpers for Vanilla JS
 */

export const $ = (selector, context = document) => context.querySelector(selector);
export const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

export function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Validates URLs before inserting into href/src attributes to block javascript:, data:, or vbscript: payloads.
 */
export function safeUrl(url, fallback = '#') {
  if (typeof url !== 'string') return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;

  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return escapeHtml(trimmed);
  }
  if (trimmed.startsWith('#')) {
    return escapeHtml(trimmed);
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return escapeHtml(parsed.toString());
    }
  } catch {
    return fallback;
  }

  return fallback;
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
 * Scroll window immediately or smoothly to top
 */
export function scrollToTop(behavior = 'instant') {
  if (behavior === 'smooth') {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  } else {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }
}

