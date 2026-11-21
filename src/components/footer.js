import { t, i18n } from '../i18n/index.js';

/**
 * Rich & Informative Royal Heritage Footer Component
 * PjBL Project: SMK Pariwisata Metland School (Information Technology Department • Kelompok 2)
 */
export function renderFooter() {
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';

  const navLinks = [
    { label: t('nav.recipes'), href: isEn ? '#/recipes' : '#/resep' },
    { label: t('nav.flavorMap'), href: isEn ? '#/flavor-map' : '#/peta-rasa' },
    { label: t('nav.spices'), href: isEn ? '#/spices' : '#/jelajah-rempah' },
    { label: t('nav.restaurants'), href: isEn ? '#/restaurants' : '#/restoran-legendaris' },
    { label: t('nav.recommendations'), href: isEn ? '#/recommendations' : '#/rekomendasi' },
    { label: t('nav.aiFoodCreator'), href: '#/ai-food-creator', isSpecial: true },
    { label: isEn ? 'About LarasRasa' : 'Tentang LarasRasa', href: isEn ? '#/about' : '#/tentang' }
  ];

  const regions = [
    { id: 'semarang', name: 'Kota Semarang' },
    { id: 'surakarta', name: 'Surakarta (Solo)' },
    { id: 'kudus', name: 'Kab. Kudus' },
    { id: 'banyumas', name: 'Kab. Banyumas' },
    { id: 'pekalongan', name: 'Kota Pekalongan' },
    { id: 'magelang', name: 'Kab. Magelang' },
    { id: 'tegal', name: 'Kota & Kab. Tegal' },
    { id: 'wonosobo', name: 'Kab. Wonosobo' }
  ];

  const teamMembers = [
    { name: 'Evan Hendra Mulyadi', role: isEn ? 'Website Developer & Team Leader' : 'Website Developer & Team Leader', icon: '💻' },
    { name: 'Keisha Nabilah Ar Rahmah', role: 'UI/UX Designer', icon: '🎨' },
    { name: 'M. Azka Derin Sulaeman', role: 'Flowchart Designer', icon: '📊' },
    { name: 'Darrel Satya Laksono', role: 'Proposal Writer', icon: '📝' }
  ];

  return `
    <footer class="bg-[#120B07] text-[#FAF7F2] border-t-2 border-[#D49B42]/50 mt-auto relative overflow-hidden">
      <!-- Royal Heritage Ambient Background Glows -->
      <div class="absolute -top-20 right-1/4 w-96 h-96 bg-[#D49B42]/8 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-20 left-10 w-96 h-96 bg-[#C84C24]/8 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10 space-y-12">
        
        <!-- Main Structured Grid: Symmetrical 12 Columns on Desktop -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          <!-- Column 1 (4 cols): Brand Identity, Name Etymology (Laras & Rasa), & Cultural Proverb -->
          <div class="lg:col-span-4 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-white/5 border border-[#D49B42]/40 flex items-center justify-center p-2 shadow-xs shrink-0">
                <img src="/assets/images/logo-larasrasa.png" 
                     alt="LarasRasa Logo" 
                     class="w-full h-full object-contain" />
              </div>
              <div>
                <span class="font-editorial-serif text-2xl font-bold tracking-tight text-white block leading-tight">
                  Laras<span class="text-[#C84C24]">Rasa</span>
                </span>
                <span class="text-[9.5px] text-[#D49B42] uppercase tracking-widest font-bold block mt-0.5">
                  ${isEn ? 'Central Javanese Culinary Heritage' : 'Pusaka Warisan Kuliner Jawa Tengah'}
                </span>
              </div>
            </div>

            <!-- Etymology of Laras & Rasa -->
            <p class="text-xs text-[#FAF7F2]/80 leading-relaxed max-w-sm">
              ${isEn 
                ? 'LarasRasa combines two meaningful words: <strong>Laras</strong>, representing harmony, balance, and cultural values; and <strong>Rasa</strong>, representing taste, culinary experiences, and traditional culinary identity. Together, it reflects the harmony of flavors and cultural heritage found across Central Java.' 
                : 'Nama LarasRasa memadukan dua makna luhur: <strong>Laras</strong> yang melambangkan harmoni, keseimbangan, serta nilai budaya; dan <strong>Rasa</strong> yang mencerminkan cita rasa, pengalaman bersantap, serta jati diri panganan tradisional. Keduanya berpadu merawat keharmonisan rasa dan warisan budaya Jawa Tengah.'}
            </p>

            <!-- Philosophical Proverb Pill -->
            <div class="p-3.5 rounded-2xl bg-white/[0.04] border border-[#D49B42]/30 space-y-1">
              <p class="text-[11px] text-[#D49B42] italic font-editorial-serif font-semibold leading-snug">
                "Nguri-uri kabudayan lumantar raos lan bumbu nuswantara."
              </p>
              <p class="text-[10px] text-[#FAF7F2]/60 leading-tight">
                ${isEn 
                  ? 'Preserving ancestral culture through taste and archipelago spices.' 
                  : 'Melestarikan kebudayaan leluhur melalui citarasa dan rempah Nusantara.'}
              </p>
            </div>
          </div>

          <!-- Column 2 (2 cols): Culinary Index / Directory -->
          <div class="lg:col-span-2 space-y-3.5">
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#D49B42] pb-2 border-b border-[#D49B42]/30 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#C84C24]"></span>
              <span>${isEn ? 'Culinary Index' : 'Ensiklopedia'}</span>
            </h3>
            <ul class="space-y-2.5 text-xs font-medium text-[#FAF7F2]/85">
              ${navLinks.map(link => `
                <li>
                  <a href="${link.href}" 
                     class="group flex items-center gap-2 hover:text-[#D49B42] transition-colors py-0.5">
                    <span class="text-[#C84C24] group-hover:translate-x-0.5 transition-transform text-[11px]">›</span>
                    <span class="${link.isSpecial ? 'text-[#D49B42] font-bold flex items-center gap-1' : ''}">
                      ${link.isSpecial ? '<span class="text-[11px]">✨</span>' : ''}
                      ${link.label}
                    </span>
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Column 3 (3 cols): 8 Sentra Wilayah (Balanced 2-col mini grid) -->
          <div class="lg:col-span-3 space-y-3.5">
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#D49B42] pb-2 border-b border-[#D49B42]/30 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#C84C24]"></span>
              <span>${isEn ? '8 Culinary Regions' : '8 Sentra Wilayah'}</span>
            </h3>
            <div class="grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-[#FAF7F2]/80">
              ${regions.map(r => `
                <a href="${isEn ? `#/recipes` : `#/resep`}" 
                   data-region-filter="${r.id}"
                   class="group flex items-center gap-1.5 hover:text-[#D49B42] transition-colors py-0.5">
                  <span class="text-[#D49B42]/70 group-hover:text-[#C84C24] transition-colors text-[10px]">&bull;</span>
                  <span class="truncate">${r.name}</span>
                </a>
              `).join('')}
            </div>
            <p class="text-[10px] text-[#FAF7F2]/50 pt-1 italic leading-relaxed">
              ${isEn 
                ? 'Select any culinary region to filter authentic local dishes.' 
                : 'Pilih wewengkon kagem nyaring resep khas daerah.'}
            </p>
          </div>

          <!-- Column 4 (3 cols): Project Background & Group 2 Team Contributions (PjBL IT) -->
          <div class="lg:col-span-3 space-y-3.5">
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#D49B42] pb-2 border-b border-[#D49B42]/30 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#C84C24]"></span>
              <span>${isEn ? 'Project Background & Team' : 'Latar Belakang & Tim'}</span>
            </h3>

            <div class="p-4 rounded-2xl bg-white/[0.04] border border-[#D49B42]/30 space-y-3 shadow-inner">
              <div class="space-y-1">
                <span class="inline-block px-2.5 py-0.5 rounded-full bg-[#C84C24] text-white font-bold text-[9px] uppercase tracking-wider">
                  SMK Pariwisata Metland School
                </span>
                <p class="text-[11.5px] font-bold text-white pt-1">
                  ${isEn ? 'IT Department • Group 2' : 'Jurusan IT (PPLG) • Kelompok 2'}
                </p>
                <p class="text-[10px] text-[#D49B42] font-semibold">
                  ${isEn ? 'Central Java Cultural Project Assignment' : 'Penugasan Website Budaya Jawa Tengah'}
                </p>
              </div>

              <!-- PjBL Narrative & Why LarasRasa -->
              <p class="text-[10.5px] text-[#FAF7F2]/80 leading-relaxed pt-2 border-t border-white/10">
                ${isEn 
                  ? 'LarasRasa originated from a <strong>Project-Based Learning (PjBL)</strong> program in the IT Department at SMK Pariwisata Metland School. <strong>Group 2</strong> was assigned to develop a website about Central Java, choosing LarasRasa to showcase and preserve authentic Javanese culinary heritage, recipes, and spices.' 
                  : 'LarasRasa lahir dari program <strong>Project-Based Learning (PjBL)</strong> Jurusan IT di SMK Pariwisata Metland School. <strong>Kelompok 2</strong> mendapat tugas membuat website Jawa Tengah, dan memilih LarasRasa untuk mendokumentasikan serta melestarikan pusaka kuliner, resep otentik, dan rempah daerah.'}
              </p>

              <!-- Team Members & Contributions -->
              <div class="pt-2 border-t border-white/10 space-y-1.5">
                <span class="text-[9.5px] font-bold text-[#D49B42] uppercase tracking-wider block">
                  ${isEn ? 'Group 2 Contributors:' : 'Kontributor Kelompok 2:'}
                </span>
                <div class="grid grid-cols-1 gap-1 text-[11px]">
                  ${teamMembers.map(m => `
                    <div class="flex items-center justify-between py-0.5">
                      <div class="flex items-center gap-1.5 truncate">
                        <span class="text-[11px] shrink-0">${m.icon}</span>
                        <strong class="text-white font-semibold text-[11px] truncate">${m.name}</strong>
                      </div>
                      <span class="text-[#D49B42] text-[9.5px] font-medium shrink-0 ml-2">${m.role}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="pt-2 border-t border-white/10 text-right">
                <a href="${isEn ? '#/about' : '#/tentang'}" class="text-[10.5px] font-bold text-[#D49B42] hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>${isEn ? 'View Full Project Story' : 'Baca Kisah Selengkapnya'}</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        <!-- Bottom Copyright & Back to Top Bar (CR) -->
        <div class="pt-6 border-t border-[#FAF7F2]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60">
          <p class="text-center sm:text-left leading-relaxed">
            &copy; 2026–Present ${isEn ? 'Group 2' : 'Kelompok 2'}. All Rights Reserved.
          </p>
          <div class="flex items-center gap-5 shrink-0">
            <button type="button" 
                    id="footer-back-to-top"
                    onclick="window.scrollTo({top: 0, behavior: 'instant'}); if(document.documentElement) document.documentElement.scrollTop = 0;"
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
