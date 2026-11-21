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
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10 border-b border-[#FAF7F2]/10 items-start">
          
          <!-- Column 1: Brand Identity & Philosophy (3 cols) -->
          <div class="lg:col-span-3 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 flex items-center justify-center shrink-0">
                <img src="/assets/images/logo-larasrasa.png" 
                     alt="LarasRasa Logo" 
                     class="w-full h-full object-contain" />
              </div>
              <div>
                <span class="font-editorial-serif text-2xl font-bold tracking-tight text-white block">
                  Laras<span class="text-[#C84C24]">Rasa</span>
                </span>
                <span class="text-[9px] text-[#D49B42] uppercase tracking-widest font-bold block mt-0.5">
                  ${isEn ? 'Central Javanese Culinary Heritage' : 'Pusaka Warisan Kuliner Jawa Tengah'}
                </span>
              </div>
            </div>

            <p class="text-xs text-[#FAF7F2]/80 leading-relaxed">
              ${isEn 
                ? 'Laras symbolizes moral harmony and flavor balance; Rasa encapsulates sensory richness and hearth traditions of Central Java.' 
                : 'Laras melambangkan keselarasan budi pekerti dan keseimbangan rasa; Rasa merangkum kekayaan indra dan kehangatan tradisi dapur Jawa Tengah.'}
            </p>

            <div class="p-3 rounded-xl bg-white/5 border border-[#D49B42]/30 text-[11px] text-[#D49B42] italic font-editorial-serif shadow-xs">
              "Nguri-uri kabudayan lumantar raos lan bumbu nuswantara."
            </div>
          </div>

          <!-- Column 2: Culinary Encyclopedia Navigation (2 cols) -->
          <div class="lg:col-span-2 space-y-3.5">
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#D49B42] pb-1.5 border-b border-[#D49B42]/30 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#C84C24]"></span>
              <span>${isEn ? 'Culinary Index' : 'Ensiklopedia'}</span>
            </h3>
            <ul class="space-y-2 text-xs text-[#FAF7F2]/85 font-medium">
              <li><a href="${isEn ? '#/recipes' : '#/resep'}" class="hover:text-[#D49B42] transition-colors flex items-center gap-1.5"><span>›</span> ${t('nav.recipes')}</a></li>
              <li><a href="${isEn ? '#/flavor-map' : '#/peta-rasa'}" class="hover:text-[#D49B42] transition-colors flex items-center gap-1.5"><span>›</span> ${t('nav.flavorMap')}</a></li>
              <li><a href="${isEn ? '#/spices' : '#/jelajah-rempah'}" class="hover:text-[#D49B42] transition-colors flex items-center gap-1.5"><span>›</span> ${t('nav.spices')}</a></li>
              <li><a href="${isEn ? '#/restaurants' : '#/restoran-legendaris'}" class="hover:text-[#D49B42] transition-colors flex items-center gap-1.5"><span>›</span> ${t('nav.restaurants')}</a></li>
              <li><a href="${isEn ? '#/recommendations' : '#/rekomendasi'}" class="hover:text-[#D49B42] transition-colors flex items-center gap-1.5"><span>›</span> ${t('nav.recommendations')}</a></li>
              <li><a href="#/ai-food-creator" class="hover:text-[#D49B42] text-[#D49B42] font-bold transition-colors flex items-center gap-1.5"><span>✨</span> ${t('nav.aiFoodCreator')}</a></li>
            </ul>
          </div>

          <!-- Column 3: 8 Regional Culinary Centers (3 cols) -->
          <div class="lg:col-span-3 space-y-3.5">
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#D49B42] pb-1.5 border-b border-[#D49B42]/30 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#C84C24]"></span>
              <span>${isEn ? '8 Culinary Regions' : '8 Sentra Wilayah'}</span>
            </h3>
            <div class="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-[#FAF7F2]/80">
              <a href="${isEn ? '#/recipes?region=semarang' : '#/resep?region=semarang'}" class="hover:text-[#D49B42] transition-colors">• Kota Semarang</a>
              <a href="${isEn ? '#/recipes?region=surakarta' : '#/resep?region=surakarta'}" class="hover:text-[#D49B42] transition-colors">• Solo (Surakarta)</a>
              <a href="${isEn ? '#/recipes?region=kudus' : '#/resep?region=kudus'}" class="hover:text-[#D49B42] transition-colors">• Kab. Kudus</a>
              <a href="${isEn ? '#/recipes?region=banyumas' : '#/resep?region=banyumas'}" class="hover:text-[#D49B42] transition-colors">• Kab. Banyumas</a>
              <a href="${isEn ? '#/recipes?region=pekalongan' : '#/resep?region=pekalongan'}" class="hover:text-[#D49B42] transition-colors">• Pekalongan</a>
              <a href="${isEn ? '#/recipes?region=magelang' : '#/resep?region=magelang'}" class="hover:text-[#D49B42] transition-colors">• Magelang</a>
              <a href="${isEn ? '#/recipes?region=tegal' : '#/resep?region=tegal'}" class="hover:text-[#D49B42] transition-colors">• Kota/Kab Tegal</a>
              <a href="${isEn ? '#/recipes?region=wonosobo' : '#/resep?region=wonosobo'}" class="hover:text-[#D49B42] transition-colors">• Kab. Wonosobo</a>
            </div>
            <p class="text-[10px] text-[#FAF7F2]/50 pt-0.5 italic">
              ${isEn ? 'Click any region to filter regional dishes.' : 'Pilih wewengkon kagem nyaring resep khas daerah.'}
            </p>
          </div>

          <!-- Column 4: PjBL IT Team & Academic Project (4 cols, balanced horizontally) -->
          <div class="lg:col-span-4 space-y-3.5">
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#D49B42] pb-1.5 border-b border-[#D49B42]/30 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#C84C24]"></span>
              <span>${isEn ? 'Academic Project (PjBL IT)' : 'Proyek Pembelajaran (PjBL IT)'}</span>
            </h3>
            <div class="p-3.5 rounded-2xl bg-white/5 border border-[#D49B42]/25 space-y-2.5">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <span class="inline-block px-2.5 py-0.5 rounded-full bg-[#C84C24] text-white font-bold text-[9px] uppercase tracking-wider">
                  SMK Pariwisata Metland School — IT
                </span>
                <span class="text-[10px] font-semibold text-[#D49B42]">
                  ${isEn ? 'Group 2 • Semester 1 Blocking 2' : 'Kelompok 2 • Semester 1 Blocking 2'}
                </span>
              </div>

              <div>
                <p class="text-xs font-bold text-white leading-snug">
                  ${isEn 
                    ? 'Group 2 IT Department PjBL — Academic Year 2026/2027' 
                    : 'Kelompok 2 PjBL Jurusan IT — Tahun Ajaran 2026/2027'}
                </p>
                <p class="text-[11px] text-[#FAF7F2]/75 leading-relaxed mt-0.5">
                  ${isEn 
                    ? 'Group 2 is tasked with creating an interactive website about Central Java.' 
                    : 'Kelompok 2 kebagian tugas membuat website tentang Jawa Tengah.'}
                </p>
              </div>

              <!-- Team Members in a balanced 2-column grid -->
              <div class="pt-2 border-t border-white/10">
                <span class="text-[10px] font-bold text-[#D49B42] uppercase tracking-wider block mb-1.5">
                  ${isEn ? 'Team Members:' : 'Anggota Kelompok:'}
                </span>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-[#FAF7F2]/90 font-medium">
                  <div class="flex items-start gap-1 leading-snug">
                    <span class="text-[#D49B42] font-bold">&bull;</span>
                    <div>
                      <strong class="text-white block">Evan Hendra Mulyadi</strong>
                      <span class="text-[#FAF7F2]/65 text-[10px] block">${isEn ? 'Web Developer & Leader' : 'Web Developer & Leader'}</span>
                    </div>
                  </div>
                  <div class="flex items-start gap-1 leading-snug">
                    <span class="text-[#D49B42] font-bold">&bull;</span>
                    <div>
                      <strong class="text-white block">Keisha Nabilah Ar Rahmah</strong>
                      <span class="text-[#FAF7F2]/65 text-[10px] block">UI/UX Designer</span>
                    </div>
                  </div>
                  <div class="flex items-start gap-1 leading-snug">
                    <span class="text-[#D49B42] font-bold">&bull;</span>
                    <div>
                      <strong class="text-white block">M. Azka Derin Sulaeman</strong>
                      <span class="text-[#FAF7F2]/65 text-[10px] block">Flowchart Designer</span>
                    </div>
                  </div>
                  <div class="flex items-start gap-1 leading-snug">
                    <span class="text-[#D49B42] font-bold">&bull;</span>
                    <div>
                      <strong class="text-white block">Darrel Satya Laksono</strong>
                      <span class="text-[#FAF7F2]/65 text-[10px] block">${isEn ? 'Proposal Writer' : 'Pembuat Proposal'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Bottom Copyright & Back to Top Bar -->
        <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60">
          <p class="text-center sm:text-left leading-relaxed">
            &copy; 2026–Present ${isEn ? 'Group 2 IT Department PjBL Semester 1 Blocking 2 Academic Year 2026/2027.' : 'Kelompok 2 PjBL Jurusan IT Semester 1 Blocking 2 Tahun Ajaran 2026/2027.'} All Rights Reserved.
          </p>
          <div class="flex items-center gap-4 text-xs">
            <button type="button" 
                    id="footer-back-to-top"
                    onclick="window.scrollTo({top: 0, behavior: 'smooth'})"
                    class="inline-flex items-center gap-1.5 text-xs text-[#D49B42] hover:text-white transition-colors font-bold cursor-pointer group"
                    aria-label="${isEn ? 'Back to top' : 'Kembali ke atas'}">
              <span>${isEn ? 'Back to Top' : 'Kembali ke Atas'}</span>
              <svg class="w-3.5 h-3.5 transform group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="m18 15-6-6-6 6"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </footer>
  `;
}
