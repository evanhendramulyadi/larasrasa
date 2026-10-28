import { id } from './id.js';
import { en } from './en.js';

const dictionaries = { id, en };

class I18nManager {
  constructor() {
    let saved = null;
    try {
      if (typeof window !== 'undefined' && window.location && window.location.search) {
        const urlLang = new URLSearchParams(window.location.search).get('lang');
        if (urlLang === 'en' || urlLang === 'id') {
          saved = urlLang;
        }
      }
      if (!saved && typeof localStorage !== 'undefined') {
        saved = localStorage.getItem('larasrasa_lang');
      }
    } catch (_) {}
    this.currentLang = (saved === 'en' || saved === 'id') ? saved : 'id';
    this.currentPagePrefix = '';
    if (typeof document !== 'undefined') {
      if (document.documentElement) {
        document.documentElement.lang = this.currentLang;
      }
      this.updateDocumentTitle();
    }
  }

  updateDocumentTitle(pagePrefix = null) {
    if (pagePrefix !== null) {
      this.currentPagePrefix = pagePrefix;
    }
    if (typeof document === 'undefined') return;

    let currentHash = '';
    if (typeof window !== 'undefined' && window.location && window.location.hash) {
      currentHash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
    }
    const isHomeHash = !currentHash || currentHash === '';

    const isHome = isHomeHash || 
      !this.currentPagePrefix || 
      this.currentPagePrefix === 'Beranda' || 
      this.currentPagePrefix === 'Home' ||
      this.currentPagePrefix.trim() === '';

    if (!isHome) {
      document.title = `${this.currentPagePrefix} — LarasRasa`;
    } else {
      document.title = this.currentLang === 'en'
        ? 'LarasRasa — Central Java Cuisine'
        : 'LarasRasa — Kuliner Jawa Tengah';
    }
  }

  getLanguage() {
    return this.currentLang;
  }

  setLanguage(lang) {
    if (lang !== 'id' && lang !== 'en') return;
    if (this.currentLang === lang) return;

    this.currentLang = lang;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('larasrasa_lang', lang);
      }
    } catch (_) {}
    if (typeof document !== 'undefined') {
      if (document.documentElement) {
        document.documentElement.lang = lang;
      }
      this.updateDocumentTitle();
    }

    // Dispatch global event for instant reactive UI rerender without browser reload
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('larasrasa:languagechange', { detail: { lang } }));
    }
  }

  toggleLanguage() {
    const next = this.currentLang === 'id' ? 'en' : 'id';
    this.setLanguage(next);
  }

  /**
   * Translate key with dotted path notation, e.g. t('nav.recipes')
   */
  t(path, params = {}) {
    const dict = dictionaries[this.currentLang] || dictionaries.id;
    const parts = path.split('.');
    let val = dict;

    for (const part of parts) {
      if (val && typeof val === 'object' && part in val) {
        val = val[part];
      } else {
        // Fallback to Indonesian if missing in English
        let fallbackVal = dictionaries.id;
        for (const fPart of parts) {
          if (fallbackVal && typeof fallbackVal === 'object' && fPart in fallbackVal) {
            fallbackVal = fallbackVal[fPart];
          } else {
            fallbackVal = null;
            break;
          }
        }
        val = fallbackVal || path;
        break;
      }
    }

    if (typeof val === 'string' && Object.keys(params).length > 0) {
      for (const [k, v] of Object.entries(params)) {
        val = val.replace(new RegExp(`{${k}}`, 'g'), v);
      }
    }

    return val;
  }
}

export const i18n = new I18nManager();
export const t = (key, params) => i18n.t(key, params);

