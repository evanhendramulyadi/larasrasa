import './style.css';
import { Router } from './router.js';

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