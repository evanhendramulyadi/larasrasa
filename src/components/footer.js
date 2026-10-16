import { t } from '../i18n/index.js';

/**
 * Upgraded Footer Component
 */
export function renderFooter() {
  return `
    <footer class="bg-[#302018] text-[#FAF6EF] border-t-4 border-[#B85C38] mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          <!-- Brand & Philosophy -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-xl bg-white p-1 border border-[#C49A58]/40 shadow-xs flex items-center justify-center shrink-0">
                <img src="/assets/images/logo-larasrasa.jpeg" 
                     alt="LarasRasa Logo" 
                     class="w-full h-full object-contain rounded-lg" />
              </div>
              <span class="font-editorial-serif text-2xl font-bold tracking-tight text-[#FAF6EF]">
                Laras<span class="text-[#B85C38]">Rasa</span>
              </span>
            </div>
            <p class="text-xs text-[#F2E8D8]/85 leading-relaxed">
              ${t('footer.philosophy')}
            </p>
            <div class="pt-2 text-[11px] text-[#C49A58] italic font-editorial-serif">
              "${t('footer.javaneseMotto')}"
            </div>
          </div>

          <!-- Jelajah Menu -->
          <div>
            <h4 class="font-editorial-serif text-sm font-bold text-[#C49A58] mb-4 uppercase tracking-wider">
              ${t('footer.exploreTitle')}
            </h4>
            <ul class="space-y-2.5 text-xs text-[#F2E8D8]/90">
              <li><a href="#/resep" class="hover:text-white transition-colors flex items-center gap-2"><span>&bull;</span> ${t('nav.recipes')}</a></li>
              <li><a href="#/peta-rasa" class="hover:text-white transition-colors flex items-center gap-2"><span>&bull;</span> ${t('nav.flavorMap')}</a></li>
              <li><a href="#/jelajah-rempah" class="hover:text-white transition-colors flex items-center gap-2"><span>&bull;</span> ${t('nav.spices')}</a></li>
              <li><a href="#/restoran-legendaris" class="hover:text-white transition-colors flex items-center gap-2"><span>&bull;</span> ${t('nav.restaurants')}</a></li>
              <li><a href="#/rekomendasi" class="hover:text-white transition-colors flex items-center gap-2"><span>&bull;</span> ${t('nav.recommendations')}</a></li>
              <li><a href="#/ai-food-creator" class="hover:text-white text-[#C49A58] transition-colors flex items-center gap-2 font-bold"><span>✨</span> ${t('nav.aiFoodCreator')}</a></li>
              <li><a href="#/tentang" class="hover:text-white transition-colors flex items-center gap-2"><span>&bull;</span> ${t('nav.about')}</a></li>
            </ul>
          </div>

          <!-- Wilayah Kuliner Terkemuka -->
          <div>
            <h4 class="font-editorial-serif text-sm font-bold text-[#C49A58] mb-4 uppercase tracking-wider">
              ${t('footer.regionsTitle')}
            </h4>
            <ul class="space-y-2.5 text-xs text-[#F2E8D8]/90">
              <li><span class="text-white font-medium">Kota Semarang</span> — Lumpia & Petis Pesisir</li>
              <li><span class="text-white font-medium">Kota Surakarta (Solo)</span> — Liwet Santan & Selat Ningrat</li>
              <li><span class="text-white font-medium">Kabupaten Kudus</span> — Soto Bening & Garang Asem</li>
              <li><span class="text-white font-medium">Kabupaten Banyumas</span> — Tempe Mendoan Kedelai Asli</li>
              <li><span class="text-white font-medium">Pekalongan & Magelang</span> — Nasi Megono & Kupat Tahu</li>
            </ul>
          </div>

          <!-- Integritas & Keterangan Budaya -->
          <div>
            <h4 class="font-editorial-serif text-sm font-bold text-[#C49A58] mb-4 uppercase tracking-wider">
              ${t('footer.commitmentTitle')}
            </h4>
            <p class="text-xs text-[#F2E8D8]/85 leading-relaxed mb-3">
              ${t('footer.commitmentDesc')}
            </p>
            <div class="p-3 rounded-xl bg-[#654332]/50 border border-[#C49A58]/20 text-[11px] text-[#F2E8D8]/80">
              ${t('footer.backendReadyBadge')}
            </div>
          </div>

        </div>

        <div class="mt-12 pt-8 border-t border-[#654332] flex flex-col sm:flex-row items-center justify-between text-xs text-[#F2E8D8]/60 gap-4">
          <p>&copy; ${new Date().getFullYear()} ${t('footer.copyright')}</p>
          <div class="flex items-center space-x-6">
            <a href="#/tentang" class="hover:text-[#C49A58] transition-colors">${t('nav.about')}</a>
            <span class="text-[#654332]">&bull;</span>
            <span class="text-[#F2E8D8]/80 font-medium">${t('common.language')}: ID / EN</span>
          </div>
        </div>

      </div>
    </footer>
  `;
}
