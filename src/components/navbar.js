import { i18n, t } from '../i18n/index.js';

/**
 * Professional Responsive Navbar Component
 * Guaranteed single-line layout with concise labels, compact language switcher,
 * and seamless mobile drawer.
 */

export function renderNavbar(activeRoute = '/') {
  const currentLang = i18n.getLanguage();

  const navItems = [
    { label: t('nav.home'), href: '#/' },
    { label: t('nav.recipes'), href: '#/resep' },
    { label: t('nav.flavorMap'), href: '#/peta-rasa' },
    { label: t('nav.spices'), href: '#/jelajah-rempah' },
    { label: t('nav.restaurants'), href: '#/restoran-legendaris' },
    { label: t('nav.recommendations'), href: '#/rekomendasi' },
    { label: t('nav.aiFoodCreator'), href: '#/ai-food-creator', isSpecial: true },
    { label: t('nav.about'), href: '#/tentang' }
  ];

  return `
    <header id="main-header" class="sticky top-0 z-50 transition-all duration-300 bg-[#FAF6EF]/95 backdrop-blur-md border-b border-[#E5D9C5] shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-18 sm:h-20 gap-2">
          
          <!-- Brand Logo -->
          <a href="#/" class="flex items-center gap-3 shrink-0 group focus:outline-hidden focus:ring-2 focus:ring-[#B85C38] rounded-xl p-1" aria-label="LarasRasa Beranda">
            <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white p-1 border border-[#C49A58]/35 shadow-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img src="/assets/images/logo-larasrasa.jpeg" 
                   alt="LarasRasa Logo" 
                   class="w-full h-full object-contain rounded-lg" />
            </div>
            <div class="flex flex-col">
              <span class="font-editorial-serif text-2xl font-bold tracking-tight text-[#302018] leading-none">
                Laras<span class="text-[#B85C38]">Rasa</span>
              </span>
              <span class="text-[9px] uppercase tracking-widest font-semibold text-[#777B52] mt-1 whitespace-nowrap">
                ${currentLang === 'id' ? 'Kuliner Jawa Tengah' : 'Central Javanese Culinary'}
              </span>
            </div>
          </a>

          <!-- Desktop Horizontal Navigation (Strictly Non-Wrapping) -->
          <nav class="hidden lg:flex items-center gap-0.5 xl:gap-1.5 font-editorial-sans" aria-label="Menu Utama">
            ${navItems.map(item => {
              const isActive = activeRoute === item.href.replace('#', '') || (item.href === '#/' && activeRoute === '/');
              return `
                <a href="${item.href}" 
                   class="whitespace-nowrap px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-semibold tracking-normal transition-all duration-200 rounded-full shrink-0 flex items-center gap-1 ${
                     isActive
                       ? 'bg-[#302018] text-[#FAF6EF] shadow-xs'
                       : item.isSpecial
                         ? 'text-[#B85C38] bg-[#F2E8D8]/70 hover:bg-[#F2E8D8] border border-[#C49A58]/35 font-bold'
                         : 'text-[#654332] hover:text-[#B85C38] hover:bg-[#F2E8D8]/70'
                   }">
                  ${item.isSpecial ? '<span class="text-xs">✨</span>' : ''}
                  <span>${item.label}</span>
                </a>
              `;
            }).join('')}
          </nav>

          <!-- Right Action: Language Switcher & Quick CTA -->
          <div class="hidden sm:flex items-center gap-2.5 shrink-0">
            <!-- Compact Language Selector [ID | EN] -->
            <div class="inline-flex rounded-full p-0.5 bg-[#F2E8D8] border border-[#E5D9C5] text-xs font-bold" role="group" aria-label="Language Selector">
              <button type="button" 
                      id="lang-btn-id" 
                      data-lang="id"
                      class="px-2.5 py-1 rounded-full transition-all text-[11px] ${
                        currentLang === 'id' 
                          ? 'bg-[#302018] text-white shadow-xs' 
                          : 'text-[#654332] hover:text-[#B85C38]'
                      }">
                ID
              </button>
              <button type="button" 
                      id="lang-btn-en" 
                      data-lang="en"
                      class="px-2.5 py-1 rounded-full transition-all text-[11px] ${
                        currentLang === 'en' 
                          ? 'bg-[#302018] text-white shadow-xs' 
                          : 'text-[#654332] hover:text-[#B85C38]'
                      }">
                EN
              </button>
            </div>

            <!-- Recommendation Quick CTA -->
            <a href="#/rekomendasi" 
               class="whitespace-nowrap hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-[#B85C38] hover:bg-[#A04A27] text-white transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
              </svg>
              <span>${t('nav.findMenuCTA')}</span>
            </a>
          </div>

          <!-- Mobile Actions (Language + Hamburger) -->
          <div class="flex items-center gap-2 lg:hidden">
            <!-- Mobile Language Switcher -->
            <div class="inline-flex rounded-full p-0.5 bg-[#F2E8D8] border border-[#E5D9C5] text-[10px] font-bold sm:hidden">
              <button type="button" data-lang="id" class="mobile-lang-btn px-2 py-0.5 rounded-full ${currentLang === 'id' ? 'bg-[#302018] text-white' : 'text-[#654332]'}">ID</button>
              <button type="button" data-lang="en" class="mobile-lang-btn px-2 py-0.5 rounded-full ${currentLang === 'en' ? 'bg-[#302018] text-white' : 'text-[#654332]'}">EN</button>
            </div>

            <button id="mobile-menu-btn" 
                    type="button" 
                    aria-label="Toggle navigation menu"
                    aria-expanded="false"
                    class="p-2 rounded-xl text-[#302018] bg-[#F2E8D8]/60 hover:bg-[#F2E8D8] focus:outline-hidden focus:ring-2 focus:ring-[#B85C38]">
              <svg id="hamburger-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg id="close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Dropdown Drawer -->
      <div id="mobile-menu-drawer" class="lg:hidden hidden border-b border-[#E5D9C5] bg-[#FAF6EF] px-4 pt-3 pb-6 space-y-1.5 shadow-xl transition-all duration-300">
        ${navItems.map(item => {
          const isActive = activeRoute === item.href.replace('#', '') || (item.href === '#/' && activeRoute === '/');
          return `
            <a href="${item.href}" 
               class="mobile-nav-link px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                 isActive
                   ? 'bg-[#302018] text-[#FAF6EF]'
                   : item.isSpecial
                     ? 'text-[#B85C38] bg-[#F2E8D8] font-bold'
                     : 'text-[#302018] hover:bg-[#F2E8D8]'
               }">
              <span>${item.label}</span>
              ${item.isSpecial ? '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B85C38] text-white">✨ AI Studio</span>' : ''}
            </a>
          `;
        }).join('')}
        
        <div class="pt-3 border-t border-[#E5D9C5] mt-3 space-y-3">
          <div class="flex items-center justify-between px-2">
            <span class="text-xs font-bold text-[#654332]">${t('common.language')}:</span>
            <div class="inline-flex rounded-full p-0.5 bg-[#F2E8D8] border border-[#E5D9C5] text-xs font-bold">
              <button type="button" data-lang="id" class="mobile-drawer-lang px-3 py-1 rounded-full ${currentLang === 'id' ? 'bg-[#302018] text-white' : 'text-[#654332]'}">Bahasa Indonesia</button>
              <button type="button" data-lang="en" class="mobile-drawer-lang px-3 py-1 rounded-full ${currentLang === 'en' ? 'bg-[#302018] text-white' : 'text-[#654332]'}">English</button>
            </div>
          </div>

          <a href="#/rekomendasi" class="mobile-nav-link w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-[#B85C38] text-white shadow-xs">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
            </svg>
            ${t('nav.findMenuCTA')}
          </a>
        </div>
      </div>
    </header>
  `;
}

export function initNavbarInteractions() {
  const btn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-menu-drawer');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (btn && drawer) {
    btn.onclick = () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isExpanded);
      drawer.classList.toggle('hidden');
      hamburgerIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    };

    // Close on clicking a link
    const links = drawer.querySelectorAll('.mobile-nav-link');
    links.forEach(l => {
      l.addEventListener('click', () => {
        drawer.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Language buttons handler (Desktop & Mobile)
  const langButtons = document.querySelectorAll('[data-lang]');
  langButtons.forEach(btnEl => {
    btnEl.addEventListener('click', () => {
      const targetLang = btnEl.getAttribute('data-lang');
      if (targetLang) {
        i18n.setLanguage(targetLang);
      }
    });
  });
}
