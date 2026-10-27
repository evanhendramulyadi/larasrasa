import { i18n, t } from '../i18n/index.js';

/**
 * Ultra-Elevated Royal Javanese Heritage Navbar
 * Sticky luxury header with frosted glassmorphism, gold accents,
 * responsive navigation, and seamless bilingual reactivity.
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
    <header id="main-header" class="sticky top-0 z-50 transition-all duration-300 bg-[#FAF7F2]/90 backdrop-blur-xl border-b border-[#D49B42]/25 shadow-xs">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20 sm:h-22 gap-3">
          
          <!-- Brand Logo with Royal Crest Style -->
          <a href="#/" class="flex items-center gap-3.5 shrink-0 group focus:outline-hidden focus:ring-2 focus:ring-[#C84C24] rounded-2xl p-1" aria-label="LarasRasa Beranda">
            <div class="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-white p-1.5 border-2 border-[#D49B42]/50 shadow-md flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#C84C24] transition-all duration-300 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-tr from-[#D49B42]/10 to-transparent pointer-events-none"></div>
              <img src="/assets/images/logo-larasrasa.jpeg" 
                   alt="LarasRasa Logo" 
                   class="w-full h-full object-contain rounded-xl" />
            </div>
            <div class="flex flex-col">
              <span class="font-editorial-serif text-2xl sm:text-[26px] font-bold tracking-tight text-[#120B07] leading-none group-hover:text-[#C84C24] transition-colors">
                Laras<span class="text-[#C84C24]">Rasa</span>
              </span>
              <span class="text-[10px] tracking-widest font-bold text-[#D49B42] uppercase mt-1 flex items-center gap-1.5 whitespace-nowrap">
                <span class="w-1.5 h-1.5 rounded-full bg-[#C84C24] animate-pulse"></span>
                <span>${currentLang === 'id' ? 'Dapur Pusaka Jawa Tengah' : 'Central Javanese Heritage'}</span>
              </span>
            </div>
          </a>

          <!-- Desktop Navigation Menu -->
          <nav class="hidden lg:flex items-center gap-1 xl:gap-1.5 font-editorial-sans" aria-label="Menu Utama">
            ${navItems.map(item => {
              const isActive = activeRoute === item.href.replace('#', '') || (item.href === '#/' && activeRoute === '/');
              return `
                <a href="${item.href}" 
                   class="whitespace-nowrap px-3 xl:px-3.5 py-2 text-xs xl:text-sm font-semibold tracking-normal transition-all duration-200 rounded-full shrink-0 flex items-center gap-1.5 ${
                     isActive
                       ? 'bg-[#1E120A] text-[#FAF7F2] ring-1 ring-[#D49B42]/45 shadow-sm'
                       : item.isSpecial
                         ? 'text-[#C84C24] bg-[#FDF4EE] hover:bg-[#FBE8DD] border border-[#C84C24]/35 font-bold shadow-2xs hover:scale-102'
                         : 'text-[#5C3622] hover:text-[#C84C24] hover:bg-[#EFE8DA]/80'
                   }">
                  ${item.isSpecial ? '<span class="text-xs">✨</span>' : ''}
                  <span>${item.label}</span>
                </a>
              `;
            }).join('')}
          </nav>

          <!-- Right Action: Language Switcher & Quick Concierge CTA -->
          <div class="hidden sm:flex items-center gap-3 shrink-0">
            <!-- Sleek Language Selector Pill [ID | EN] -->
            <div class="inline-flex rounded-full p-1 bg-[#EFE8DA] border border-[#D49B42]/30 shadow-inner text-xs font-bold" role="group" aria-label="Language Selector">
              <button type="button" 
                      id="lang-btn-id" 
                      data-lang="id"
                      class="px-3 py-1 rounded-full transition-all text-[11px] font-bold cursor-pointer ${
                        currentLang === 'id' 
                          ? 'bg-[#1E120A] text-[#FAF7F2] shadow-xs' 
                          : 'text-[#5C3622] hover:text-[#C84C24]'
                      }">
                ID
              </button>
              <button type="button" 
                      id="lang-btn-en" 
                      data-lang="en"
                      class="px-3 py-1 rounded-full transition-all text-[11px] font-bold cursor-pointer ${
                        currentLang === 'en' 
                          ? 'bg-[#1E120A] text-[#FAF7F2] shadow-xs' 
                          : 'text-[#5C3622] hover:text-[#C84C24]'
                      }">
                EN
              </button>
            </div>

            <!-- Quick Concierge CTA Button -->
            <a href="#/rekomendasi" 
               class="whitespace-nowrap hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold bg-[#C84C24] hover:bg-[#AE3E1B] text-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5 border border-[#E05A30]">
              <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
              </svg>
              <span>${t('nav.findMenuCTA')}</span>
            </a>
          </div>

          <!-- Mobile Actions (Language Switcher & Hamburger) -->
          <div class="flex items-center gap-2 lg:hidden">
            <!-- Mobile Language Switcher -->
            <div class="inline-flex rounded-full p-0.5 bg-[#EFE8DA] border border-[#D49B42]/30 text-[10px] font-bold sm:hidden">
              <button type="button" data-lang="id" class="mobile-lang-btn px-2.5 py-0.5 rounded-full ${currentLang === 'id' ? 'bg-[#1E120A] text-white' : 'text-[#5C3622]'}">ID</button>
              <button type="button" data-lang="en" class="mobile-lang-btn px-2.5 py-0.5 rounded-full ${currentLang === 'en' ? 'bg-[#1E120A] text-white' : 'text-[#5C3622]'}">EN</button>
            </div>

            <button id="mobile-menu-btn" 
                    type="button" 
                    aria-label="Toggle navigation menu"
                    aria-expanded="false"
                    class="p-2.5 rounded-2xl text-[#120B07] bg-[#EFE8DA]/80 hover:bg-[#EFE8DA] border border-[#D49B42]/30 focus:outline-hidden focus:ring-2 focus:ring-[#C84C24] cursor-pointer">
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

      <!-- Mobile Dropdown Drawer with Polished Heritage Styling -->
      <div id="mobile-menu-drawer" class="lg:hidden hidden border-b border-[#D49B42]/25 bg-[#FAF7F2]/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 shadow-2xl transition-all duration-300">
        ${navItems.map(item => {
          const isActive = activeRoute === item.href.replace('#', '') || (item.href === '#/' && activeRoute === '/');
          return `
            <a href="${item.href}" 
               class="mobile-nav-link px-4 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center justify-between ${
                 isActive
                   ? 'bg-[#1E120A] text-[#FAF7F2] shadow-xs'
                   : item.isSpecial
                     ? 'text-[#C84C24] bg-[#FDF4EE] border border-[#C84C24]/30 font-bold'
                     : 'text-[#120B07] hover:bg-[#EFE8DA]'
               }">
              <span>${item.label}</span>
              ${item.isSpecial ? '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C84C24] text-white">✨ Studio AI</span>' : ''}
            </a>
          `;
        }).join('')}
        
        <div class="pt-4 border-t border-[#E8DEC8] mt-3 space-y-3">
          <div class="flex items-center justify-between px-2">
            <span class="text-xs font-bold text-[#5C3622]">${t('common.language')}:</span>
            <div class="inline-flex rounded-full p-1 bg-[#EFE8DA] border border-[#D49B42]/30 text-xs font-bold">
              <button type="button" data-lang="id" class="mobile-drawer-lang px-3 py-1 rounded-full ${currentLang === 'id' ? 'bg-[#1E120A] text-white' : 'text-[#5C3622]'}">Bahasa Indonesia</button>
              <button type="button" data-lang="en" class="mobile-drawer-lang px-3 py-1 rounded-full ${currentLang === 'en' ? 'bg-[#1E120A] text-white' : 'text-[#5C3622]'}">English</button>
            </div>
          </div>

          <a href="#/rekomendasi" class="mobile-nav-link w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-xs font-bold bg-[#C84C24] text-white shadow-md">
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
