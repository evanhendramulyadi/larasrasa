import { t } from '../i18n/index.js';

/**
 * Simplified & Elegant Footer Component
 * Copyright: Kelompok 2 Website Development
 */
export function renderFooter() {
  const year = new Date().getFullYear();

  return `
    <footer class="bg-[#24140D] text-[#FAF6EF] border-t-2 border-[#C49A58]/40 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <!-- Main Footer Row -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#FAF6EF]/10 text-center md:text-left">
          
          <!-- Brand & Short Identity -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-white p-1 border border-[#C49A58]/40 shadow-xs flex items-center justify-center shrink-0">
              <img src="/assets/images/logo-larasrasa.jpeg" 
                   alt="LarasRasa Logo" 
                   class="w-full h-full object-contain rounded-lg" />
            </div>
            <div>
              <span class="font-editorial-serif text-xl font-bold tracking-tight text-white block">
                Laras<span class="text-[#B85C38]">Rasa</span>
              </span>
              <span class="text-[10px] text-[#C49A58] uppercase tracking-wider font-semibold block">
                Warisan Kuliner Jawa Tengah
              </span>
            </div>
          </div>

          <!-- Concise Navigation Links -->
          <nav class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-[#FAF6EF]/85">
            <a href="#/resep" class="hover:text-[#C49A58] transition-colors">${t('nav.recipes')}</a>
            <a href="#/peta-rasa" class="hover:text-[#C49A58] transition-colors">${t('nav.flavorMap')}</a>
            <a href="#/jelajah-rempah" class="hover:text-[#C49A58] transition-colors">${t('nav.spices')}</a>
            <a href="#/restoran-legendaris" class="hover:text-[#C49A58] transition-colors">${t('nav.restaurants')}</a>
            <a href="#/rekomendasi" class="hover:text-[#C49A58] transition-colors">${t('nav.recommendations')}</a>
            <a href="#/ai-food-creator" class="hover:text-[#C49A58] text-[#C49A58] transition-colors font-bold flex items-center gap-1">
              <span>✨</span>
              <span>${t('nav.aiFoodCreator')}</span>
            </a>
            <a href="#/tentang" class="hover:text-[#C49A58] transition-colors">${t('nav.about')}</a>
          </nav>

        </div>

        <!-- Bottom Copyright Row -->
        <div class="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF6EF]/65 gap-3 text-center sm:text-left">
          <p class="font-medium">
            &copy; ${year} Kelompok 2 Website Development. All rights reserved.
          </p>
          <div class="flex items-center gap-3 text-[11px] text-[#C49A58]">
            <span>LarasRasa Web Application</span>
            <span>&bull;</span>
            <span>Bilingual (ID / EN)</span>
          </div>
        </div>

      </div>
    </footer>
  `;
}
