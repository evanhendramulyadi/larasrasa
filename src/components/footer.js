import { t, i18n } from '../i18n/index.js';

/**
 * Rich & Informative Heritage Footer Component
 * PjBL Project: SMK Pariwisata Metland School (PPLG - Kelompok 2 Web Development)
 */
export function renderFooter() {
  const year = new Date().getFullYear();
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';

  return `
    <footer class="bg-[#1F120B] text-[#FAF6EF] border-t-2 border-[#C49A58]/40 mt-auto">
      <!-- Main Structured Footer Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#FAF6EF]/10">
          
          <!-- Column 1: Brand Identity & Philosophy (4 cols) -->
          <div class="lg:col-span-4 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-white p-1.5 border border-[#C49A58]/50 shadow-md flex items-center justify-center shrink-0">
                <img src="/assets/images/logo-larasrasa.jpeg" 
                     alt="LarasRasa Logo" 
                     class="w-full h-full object-contain rounded-xl" />
              </div>
              <div>
                <span class="font-editorial-serif text-2xl font-bold tracking-tight text-white block">
                  Laras<span class="text-[#B85C38]">Rasa</span>
                </span>
                <span class="text-[10px] text-[#C49A58] uppercase tracking-wider font-semibold block">
                  ${isEn ? 'Central Javanese Culinary Heritage' : 'Pusaka Warisan Kuliner Jawa Tengah'}
                </span>
              </div>
            </div>

            <p class="text-xs text-[#FAF6EF]/80 leading-relaxed max-w-sm">
              ${isEn 
                ? 'Laras symbolizes moral harmony and balance of flavor; Rasa encapsulates sensory richness and hearth traditions. An interactive culinary encyclopedia celebrating Central Java’s ancestral recipes.' 
                : 'Laras melambangkan keselarasan budi pekerti dan keseimbangan rasa; Rasa merangkum kekayaan indra dan kehangatan tradisi dapur Jawa Tengah. Ensiklopedia kuliner interaktif pelestari rasa leluhur.'}
            </p>

            <div class="p-3 rounded-xl bg-[#FAF6EF]/5 border border-[#C49A58]/25 text-[11px] text-[#C49A58] italic font-editorial-serif">
              "Nguri-uri kabudayan lumantar raos lan bumbu nuswantara."
            </div>
          </div>

          <!-- Column 2: Culinary Encyclopedia Navigation (2 cols) -->
          <div class="lg:col-span-2 space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#C49A58] pb-1 border-b border-[#C49A58]/30">
              ${isEn ? 'Culinary Index' : 'Ensiklopedia'}
            </h3>
            <ul class="space-y-2 text-xs text-[#FAF6EF]/85 font-medium">
              <li><a href="#/resep" class="hover:text-[#C49A58] transition-colors flex items-center gap-1.5"><span>›</span> ${t('nav.recipes')}</a></li>
              <li><a href="#/peta-rasa" class="hover:text-[#C49A58] transition-colors flex items-center gap-1.5"><span>›</span> ${t('nav.flavorMap')}</a></li>
              <li><a href="#/jelajah-rempah" class="hover:text-[#C49A58] transition-colors flex items-center gap-1.5"><span>›</span> ${t('nav.spices')}</a></li>
              <li><a href="#/restoran-legendaris" class="hover:text-[#C49A58] transition-colors flex items-center gap-1.5"><span>›</span> ${t('nav.restaurants')}</a></li>
              <li><a href="#/rekomendasi" class="hover:text-[#C49A58] transition-colors flex items-center gap-1.5"><span>›</span> ${t('nav.recommendations')}</a></li>
              <li><a href="#/ai-food-creator" class="hover:text-[#C49A58] text-[#C49A58] font-bold transition-colors flex items-center gap-1.5"><span>✨</span> ${t('nav.aiFoodCreator')}</a></li>
            </ul>
          </div>

          <!-- Column 3: 8 Regional Culinary Centers (3 cols) -->
          <div class="lg:col-span-3 space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#C49A58] pb-1 border-b border-[#C49A58]/30">
              ${isEn ? '8 Culinary Regions' : '8 Sentra Wilayah'}
            </h3>
            <div class="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-[#FAF6EF]/80">
              <a href="#/resep?region=semarang" class="hover:text-[#C49A58] transition-colors">• Kota Semarang</a>
              <a href="#/resep?region=surakarta" class="hover:text-[#C49A58] transition-colors">• Solo (Surakarta)</a>
              <a href="#/resep?region=kudus" class="hover:text-[#C49A58] transition-colors">• Kab. Kudus</a>
              <a href="#/resep?region=banyumas" class="hover:text-[#C49A58] transition-colors">• Kab. Banyumas</a>
              <a href="#/resep?region=pekalongan" class="hover:text-[#C49A58] transition-colors">• Pekalongan</a>
              <a href="#/resep?region=magelang" class="hover:text-[#C49A58] transition-colors">• Magelang</a>
              <a href="#/resep?region=tegal" class="hover:text-[#C49A58] transition-colors">• Kota/Kab Tegal</a>
              <a href="#/resep?region=wonosobo" class="hover:text-[#C49A58] transition-colors">• Kab. Wonosobo</a>
            </div>
            <p class="text-[10px] text-[#FAF6EF]/50 pt-1 italic">
              ${isEn ? 'Click any region to explore authentic signature dishes.' : 'Klik nama wilayah untuk menyaring resep khas daerah.'}
            </p>
          </div>

          <!-- Column 4: PjBL School & Team Information (3 cols) -->
          <div class="lg:col-span-3 space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#C49A58] pb-1 border-b border-[#C49A58]/30">
              ${isEn ? 'Academic Project (PjBL)' : 'Proyek Pembelajaran (PjBL)'}
            </h3>
            <div class="p-3.5 rounded-2xl bg-[#FAF6EF]/5 border border-[#C49A58]/20 space-y-2">
              <span class="inline-block px-2.5 py-0.5 rounded-full bg-[#B85C38] text-white font-bold text-[10px] uppercase tracking-wider">
                SMK Pariwisata Metland School
              </span>
              <p class="text-xs font-bold text-white leading-snug">
                PPLG — Pengembangan Perangkat Lunak & Gim
              </p>
              <p class="text-[11px] text-[#FAF6EF]/75 leading-relaxed">
                ${isEn 
                  ? 'Project Based Learning (PjBL) assignment themed on Central Javanese cultural heritage. Developed by <strong>Group 2 (Website Development)</strong>.'
                  : 'Karya Project Based Learning (PjBL) bertema kebudayaan & kuliner Jawa Tengah oleh <strong>Kelompok 2 (Website Development)</strong>.'}
              </p>
              <div class="pt-1">
                <a href="#/tentang" class="inline-flex items-center gap-1 text-[11px] font-bold text-[#C49A58] hover:text-white transition-colors underline">
                  <span>${isEn ? 'Read full team story' : 'Baca kisah lengkap tim'} &rarr;</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        <!-- Bottom Copyright Row -->
        <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAF6EF]/70 text-center md:text-left">
          <p class="font-medium">
            &copy; ${year} ${isEn ? 'Group 2 Web Development — PPLG SMK Pariwisata Metland School. All rights reserved.' : 'Kelompok 2 Web Development — PPLG SMK Pariwisata Metland School. Seluruh hak cipta dilindungi.'}
          </p>
          <div class="flex items-center gap-3 text-[11px] text-[#C49A58]">
            <span>LarasRasa Culinary Portal</span>
            <span>&bull;</span>
            <span>PjBL Metland School</span>
            <span>&bull;</span>
            <span>Bilingual (ID / EN)</span>
          </div>
        </div>

      </div>
    </footer>
  `;
}
