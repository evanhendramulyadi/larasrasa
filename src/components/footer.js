import { t, i18n } from '../i18n/index.js';

/**
 * Rich & Informative Royal Heritage Footer Component
 * PjBL Project: SMK Pariwisata Metland School (PPLG - Kelompok 2 Web Development)
 */
export function renderFooter() {
  const year = new Date().getFullYear();
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';

  return `
    <footer class="bg-[#120B07] text-[#FAF7F2] border-t-2 border-[#D49B42]/50 mt-auto relative overflow-hidden">
      <!-- Background subtle glow -->
      <div class="absolute top-0 right-1/4 w-96 h-96 bg-[#D49B42]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 left-10 w-80 h-80 bg-[#C84C24]/5 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Main Structured Footer Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-14 border-b border-[#FAF7F2]/10">
          
          <!-- Column 1: Brand Identity & Philosophy (4 cols) -->
          <div class="lg:col-span-4 space-y-5">
            <div class="flex items-center gap-3.5">
              <div class="w-13 h-13 rounded-2xl bg-white p-1.5 border-2 border-[#D49B42]/60 shadow-lg flex items-center justify-center shrink-0">
                <img src="/assets/images/logo-larasrasa.jpeg" 
                     alt="LarasRasa Logo" 
                     class="w-full h-full object-contain rounded-xl" />
              </div>
              <div>
                <span class="font-editorial-serif text-2xl sm:text-3xl font-bold tracking-tight text-white block">
                  Laras<span class="text-[#C84C24]">Rasa</span>
                </span>
                <span class="text-[10px] text-[#D49B42] uppercase tracking-widest font-bold block mt-0.5">
                  ${isEn ? 'Central Javanese Culinary Heritage' : 'Pusaka Warisan Kuliner Jawa Tengah'}
                </span>
              </div>
            </div>

            <p class="text-xs text-[#FAF7F2]/80 leading-relaxed max-w-sm">
              ${isEn 
                ? 'Laras symbolizes moral harmony and balance of flavor; Rasa encapsulates sensory richness and hearth traditions. An interactive culinary encyclopedia celebrating Central Java’s ancestral recipes.' 
                : 'Laras melambangkan keselarasan budi pekerti dan keseimbangan rasa; Rasa merangkum kekayaan indra dan kehangatan tradisi dapur Jawa Tengah. Ensiklopedia kuliner interaktif pelestari rasa leluhur.'}
            </p>

            <div class="p-4 rounded-2xl bg-white/5 border border-[#D49B42]/30 text-xs text-[#D49B42] italic font-editorial-serif shadow-xs">
              "Nguri-uri kabudayan lumantar raos lan bumbu nuswantara."
            </div>
          </div>

          <!-- Column 2: Culinary Encyclopedia Navigation (2 cols) -->
          <div class="lg:col-span-2 space-y-4">
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#D49B42] pb-1.5 border-b border-[#D49B42]/30 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#C84C24]"></span>
              <span>${isEn ? 'Culinary Index' : 'Ensiklopedia'}</span>
            </h3>
            <ul class="space-y-2.5 text-xs text-[#FAF7F2]/85 font-medium">
              <li><a href="#/resep" class="hover:text-[#D49B42] transition-colors flex items-center gap-2"><span>›</span> ${t('nav.recipes')}</a></li>
              <li><a href="#/peta-rasa" class="hover:text-[#D49B42] transition-colors flex items-center gap-2"><span>›</span> ${t('nav.flavorMap')}</a></li>
              <li><a href="#/jelajah-rempah" class="hover:text-[#D49B42] transition-colors flex items-center gap-2"><span>›</span> ${t('nav.spices')}</a></li>
              <li><a href="#/restoran-legendaris" class="hover:text-[#D49B42] transition-colors flex items-center gap-2"><span>›</span> ${t('nav.restaurants')}</a></li>
              <li><a href="#/rekomendasi" class="hover:text-[#D49B42] transition-colors flex items-center gap-2"><span>›</span> ${t('nav.recommendations')}</a></li>
              <li><a href="#/ai-food-creator" class="hover:text-[#D49B42] text-[#D49B42] font-bold transition-colors flex items-center gap-2"><span>✨</span> ${t('nav.aiFoodCreator')}</a></li>
              <li><a href="#/tentang" class="hover:text-[#D49B42] transition-colors flex items-center gap-2"><span>›</span> ${t('nav.about')}</a></li>
            </ul>
          </div>

          <!-- Column 3: 8 Regional Culinary Centers (3 cols) -->
          <div class="lg:col-span-3 space-y-4">
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#D49B42] pb-1.5 border-b border-[#D49B42]/30 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#C84C24]"></span>
              <span>${isEn ? '8 Culinary Regions' : '8 Sentra Wilayah'}</span>
            </h3>
            <div class="grid grid-cols-2 gap-x-2 gap-y-2 text-xs text-[#FAF7F2]/80">
              <a href="#/resep?region=semarang" class="hover:text-[#D49B42] transition-colors">• Kota Semarang</a>
              <a href="#/resep?region=surakarta" class="hover:text-[#D49B42] transition-colors">• Solo (Surakarta)</a>
              <a href="#/resep?region=kudus" class="hover:text-[#D49B42] transition-colors">• Kab. Kudus</a>
              <a href="#/resep?region=banyumas" class="hover:text-[#D49B42] transition-colors">• Kab. Banyumas</a>
              <a href="#/resep?region=pekalongan" class="hover:text-[#D49B42] transition-colors">• Pekalongan</a>
              <a href="#/resep?region=magelang" class="hover:text-[#D49B42] transition-colors">• Magelang</a>
              <a href="#/resep?region=tegal" class="hover:text-[#D49B42] transition-colors">• Kota/Kab Tegal</a>
              <a href="#/resep?region=wonosobo" class="hover:text-[#D49B42] transition-colors">• Kab. Wonosobo</a>
            </div>
            <p class="text-[10px] text-[#FAF7F2]/50 pt-1 italic">
              ${isEn ? 'Click any region to explore authentic regional dishes.' : 'Pilih wewengkon kagem nyaring resep khas daerah.'}
            </p>
          </div>

          <!-- Column 4: PjBL School & Team Information (3 cols) -->
          <div class="lg:col-span-3 space-y-4">
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#D49B42] pb-1.5 border-b border-[#D49B42]/30 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#C84C24]"></span>
              <span>${isEn ? 'Academic Project (PjBL)' : 'Proyek Pembelajaran (PjBL)'}</span>
            </h3>
            <div class="p-4 rounded-2xl bg-white/5 border border-[#D49B42]/25 space-y-2.5">
              <span class="inline-block px-3 py-1 rounded-full bg-[#C84C24] text-white font-bold text-[10px] uppercase tracking-wider">
                SMK Pariwisata Metland School
              </span>
              <p class="text-xs font-bold text-white leading-snug">
                PPLG — Pengembangan Perangkat Lunak & Gim
              </p>
              <p class="text-[11px] text-[#FAF7F2]/75 leading-relaxed">
                ${isEn 
                  ? 'Project Based Learning (PjBL) assignment themed on Central Javanese culinary heritage. Crafted with care by <strong>Group 2 (Website Development)</strong>.'
                  : 'Karya Project Based Learning (PjBL) bertema kebudayaan & kuliner Jawa Tengah dening <strong>Kelompok 2 (Website Development)</strong>.'}
              </p>
              <div class="pt-1.5">
                <a href="#/tentang" class="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#D49B42] hover:text-white transition-colors underline">
                  <span>${isEn ? 'Read team story' : 'Waos bab tim pangembang'} &rarr;</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        <!-- Bottom Copyright & Attributions Bar -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60">
          <p class="text-center sm:text-left">
            &copy; ${year} <strong class="text-white">LarasRasa</strong>. ${isEn ? 'All rights reserved.' : 'Sedaya hak cipta kaayomi.'} • SMK Pariwisata Metland School (PPLG)
          </p>
          <div class="flex items-center gap-4 text-[11px]">
            <a href="#/tentang" class="hover:text-white transition-colors">${t('nav.about')}</a>
            <span>•</span>
            <a href="#/resep" class="hover:text-white transition-colors">${t('nav.recipes')}</a>
            <span>•</span>
            <a href="#/peta-rasa" class="hover:text-white transition-colors">${t('nav.flavorMap')}</a>
          </div>
        </div>

      </div>
    </footer>
  `;
}
