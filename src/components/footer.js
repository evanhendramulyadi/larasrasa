import { t, i18n } from '../i18n/index.js';
import { regions } from '../data/regions.js';
import { localizeRegion } from '../services/regionService.js';

/**
 * Harmonious & Balanced Royal Heritage Footer Component
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
    { label: t('nav.aiFoodCreator'), href: '#/ai-food-creator', isSpecial: true }
  ];

  const regionsList = regions.map(r => ({
    id: r.id,
    name: localizeRegion(r).name
  }));

  const teamMembers = [
    { name: 'Evan Hendra Mulyadi', role: isEn ? 'Web Developer & Team Leader' : 'Web Developer & Team Leader', isLeader: true },
    { name: 'Keisha Nabilah Ar Rahmah', role: 'UI/UX Designer', isLeader: false },
    { name: 'M. Azka Derin Sulaeman', role: 'Flowchart Designer', isLeader: false },
    { name: 'Darrel Satya Laksono', role: 'Proposal Writer', isLeader: false }
  ];

  return `
    <footer class="bg-[#120B07] text-[#FAF7F2] border-t-2 border-[#D49B42]/50 mt-auto relative overflow-hidden">
      <!-- Royal Heritage Ambient Background Glows -->
      <div class="absolute -top-20 right-1/4 w-96 h-96 bg-[#D49B42]/8 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-20 left-10 w-96 h-96 bg-[#C84C24]/8 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12 relative z-10 space-y-8">
        
        <!-- TOP TIER: Balanced 3-Column Navigation & Brand Directory -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Column 1 (5 cols): Brand Identity, Name Etymology (Laras & Rasa), & Proverb -->
          <div class="lg:col-span-5 space-y-3.5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-white/5 border border-[#D49B42]/40 flex items-center justify-center p-2 shadow-xs shrink-0">
                <img src="/assets/images/larasrasa-logo.png" 
                     alt="${isEn ? 'LarasRasa Logo' : 'Logo LarasRasa'}" 
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

            <!-- Concise Etymology of Laras & Rasa -->
            <p class="text-xs text-[#FAF7F2]/80 leading-relaxed max-w-md">
              ${isEn 
                ? '<strong>Laras</strong> (harmony & cultural balance) and <strong>Rasa</strong> (taste & culinary identity) unite in LarasRasa to celebrate Central Java’s rich gastronomic heritage.' 
                : 'Perpaduan <strong>Laras</strong> (harmoni & keseimbangan nilai budaya) serta <strong>Rasa</strong> (citarasa & identitas makanan tradisional) kagem nguri-uri pusaka kuliner Jawa Tengah.'}
            </p>

            <!-- Philosophical Proverb Pill -->
            <div class="p-3 rounded-2xl bg-white/[0.04] border border-[#D49B42]/30 space-y-0.5">
              <p class="text-[10.5px] text-[#D49B42] italic font-editorial-serif font-semibold leading-snug">
                "Nguri-uri kabudayan lumantar raos lan bumbu nuswantara."
              </p>
              <p class="text-[9.5px] text-[#FAF7F2]/60 leading-tight">
                ${isEn 
                  ? 'Preserving ancestral culture through taste and archipelago spices.' 
                  : 'Melestarikan kebudayaan leluhur melalui citarasa dan rempah Nusantara.'}
              </p>
            </div>
          </div>

          <!-- Column 2 (3 cols): Culinary Index / Directory -->
          <div class="lg:col-span-3 space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#D49B42] pb-2 border-b border-[#D49B42]/30 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#C84C24]"></span>
              <span>${isEn ? 'Culinary Directory' : 'Ensiklopedia Kuliner'}</span>
            </h3>
            <ul class="space-y-2 text-xs font-medium text-[#FAF7F2]/85">
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

          <!-- Column 3 (4 cols): 8 Sentra Wilayah (Balanced 2-col mini grid) -->
          <div class="lg:col-span-4 space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#D49B42] pb-2 border-b border-[#D49B42]/30 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#C84C24]"></span>
              <span>${isEn ? '8 Culinary Regions' : '8 Sentra Wilayah'}</span>
            </h3>
            <div class="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-[#FAF7F2]/80">
              ${regionsList.map(r => `
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
                ? 'Explore authentic dishes filtered by historical Central Javanese cultural regions.' 
                : 'Pilih sentra wilayah kagem nyaring resep khas daerah kuliner Jawa Tengah.'}
            </p>
          </div>

        </div>

        <!-- MIDDLE TIER: Balanced Horizontal Heritage Card for PjBL & Group 2 (Zero Vertical Bloat) -->
        <div class="p-5 sm:p-6 lg:p-7 rounded-3xl bg-white/[0.03] border border-[#D49B42]/35 shadow-inner">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <!-- Left Side (7 cols): Full PjBL Background Narrative -->
            <div class="lg:col-span-7 space-y-2.5">
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center px-3 py-0.5 rounded-full bg-[#C84C24]/15 border border-[#C84C24]/40 text-[#D49B42] text-[10.5px] font-bold uppercase tracking-wider">
                  ${isEn ? 'PjBL IT • SMK Pariwisata Metland School' : 'Karya PjBL Jurusan IT • SMK Pariwisata Metland School'}
                </span>
              </div>
              <h4 class="font-editorial-serif text-lg sm:text-xl font-bold text-white tracking-tight">
                ${isEn ? 'PjBL Project • Group 2' : 'Karya PjBL • Kelompok 2'}
              </h4>
              <p class="text-xs text-[#FAF7F2]/85 leading-relaxed text-justify sm:text-left">
                ${isEn 
                  ? 'As part of the <em>Project-Based Learning (PjBL)</em> program in the IT Department at <strong>SMK Pariwisata Metland School</strong>, Group 2 was tasked with creating a website showcasing Central Java. Group 2 chose to develop <strong>LarasRasa</strong>, a culinary platform celebrating the rich flavors, traditional recipes, and culinary heritage of Central Java. The culinary theme was chosen because of Central Java’s rich culinary diversity, imbued with cultural, historical, and unique values that deserve to be discovered and preserved through modern digital media.'
                  : 'Dalam program <em>Project-Based Learning (PjBL)</em> Jurusan IT di <strong>SMK Pariwisata Metland School</strong>, Kelompok 2 mendapat tugas membuat website bertema Jawa Tengah. Kelompok 2 memilih mengembangkan <strong>LarasRasa</strong>, sebuah website kuliner yang mengangkat kekayaan cita rasa, resep tradisional, dan warisan kuliner Jawa Tengah. Pemilihan tema kuliner didasari oleh keberagaman makanan tradisional Jawa Tengah yang memiliki nilai budaya, sejarah, dan keunikan tersendiri, sehingga perlu dikenal dan dilestarikan melalui media digital.'}
              </p>
            </div>

            <!-- Right Side (5 cols): 2x2 Grid of Group 2 Members & Contributions -->
            <div class="lg:col-span-5 space-y-2.5 lg:border-l lg:border-[#D49B42]/20 lg:pl-6">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold text-[#D49B42] uppercase tracking-wider flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#C84C24]"></span>
                  <span>${isEn ? 'Group 2 Members & Roles:' : 'Anggota Kelompok 2:'}</span>
                </span>
                <span class="text-[9.5px] text-[#FAF7F2]/50 font-mono">4 Contributor</span>
              </div>

              <!-- Sleek 2x2 Member Grid (Compact & Perfectly Balanced) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                ${teamMembers.map(m => `
                  <div class="p-2.5 rounded-2xl bg-white/[0.04] border border-[#D49B42]/25 hover:border-[#D49B42]/50 hover:bg-white/[0.06] transition-all flex flex-col justify-between">
                    <div>
                      <strong class="text-white font-semibold text-xs block leading-tight truncate">
                        ${m.name}
                      </strong>
                      <span class="text-[10px] block mt-0.5 leading-snug font-medium ${m.isLeader ? 'text-[#D49B42] font-bold' : 'text-[#FAF7F2]/70'}">
                        ${m.role}
                      </span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>
        </div>

        <!-- BOTTOM TIER: Copyright & Back to Top Bar (CR) -->
        <div class="pt-4 border-t border-[#FAF7F2]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FAF7F2]/60">
          <p class="text-center sm:text-left leading-relaxed">
            &copy; 2026–Present ${isEn ? 'Group 2' : 'Kelompok 2'}. All Rights Reserved.
          </p>
          <div class="flex items-center gap-5 shrink-0">
            <button type="button" 
                    id="footer-back-to-top"
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
