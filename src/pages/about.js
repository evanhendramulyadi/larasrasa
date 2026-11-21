import { t, i18n } from '../i18n/index.js';

/**
 * About & Full Credits Page Component (Tentang LarasRasa & Kelompok 2)
 * Complete documentation of Project-Based Learning (PjBL) IT SMK Pariwisata Metland School,
 * rationale for selecting LarasRasa, name philosophy, and full Group 2 contributions.
 */
export async function renderAboutPage() {
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';

  const teamMembers = [
    {
      name: 'Evan Hendra Mulyadi',
      role: isEn ? 'Website Developer & Team Leader' : 'Website Developer & Team Leader',
      tag: isEn ? 'Lead Architecture & Engineering' : 'Arsitektur Sistem & Pengembangan Web',
      icon: '💻',
      desc: isEn
        ? 'Led overall project coordination and technical strategy; architected the high-performance Single Page Application (SPA); developed modern responsive interfaces with Tailwind CSS and Vanilla ES Modules; engineered the interactive Three.js 3D Kasongan Showcase; built the AI Food Creator studio; curated data models for 29 heritage recipes and 19 spices; and managed production deployment.'
        : 'Memimpin koordinasi proyek dan arahan teknis keseluruhan; merancang arsitektur sistem Single Page Application (SPA); membangun antarmuka web modern dengan Tailwind CSS & Vanilla ES Modules; mengembangkan fitur interaktif Three.js 3D Showcase Gerabah Kasongan; mengintegrasikan Studio AI Food Creator; mengelola tata data 29 resep dan 19 rempah pusaka; serta mengawal performa dan deployment produksi.'
    },
    {
      name: 'Keisha Nabilah Ar Rahmah',
      role: 'UI/UX Designer',
      tag: isEn ? 'Visual Heritage & User Experience' : 'Identitas Visual & Pengalaman Pengguna',
      icon: '🎨',
      desc: isEn
        ? 'Conceived the royal heritage visual identity; formulated the warm Central Javanese color palette (Terracotta #C84C24, Gold Ochre #D49B42, Deep Charcoal #120B07, and Soft Ivory #FAF7F2); established editorial serif typography hierarchies; and crafted intuitive, accessible responsive layouts across mobile and desktop viewports.'
        : 'Merancang konsep desain visual bertema Royal Heritage Jawa Tengah; merumuskan palet warna khas Jawa (Terracotta #C84C24, Gold Ochre #D49B42, Deep Charcoal #120B07, dan Ivory #FAF7F2); menata hierarki tipografi editorial serif; serta menyusun tata letak antarmuka responsif yang elegan, ergonomis, dan ramah pengguna di berbagai perangkat.'
    },
    {
      name: 'M. Azka Derin Sulaeman',
      role: isEn ? 'Flowchart Designer' : 'Flowchart Designer',
      tag: isEn ? 'System Logic & User Flow' : 'Logika Sistem & Alur Interaksi',
      icon: '📊',
      desc: isEn
        ? 'Designed end-to-end system logic flowcharts; mapped comprehensive user interaction journeys; structured data navigation flows for flavor spectrum filtering, interactive regional culinary maps, 4-portion calculation logic, and AI recipe synthesis pathways.'
        : 'Menyusun diagram alur logika sistem (flowchart) secara menyeluruh; memetakan perjalanan alur interaksi pengguna (user journey); memodelkan navigasi filter spektrum rasa, penelusuran sentra wilayah pada peta interaktif, sistem takaran porsi, serta logika alur kerja generator resep AI.'
    },
    {
      name: 'Darrel Satya Laksono',
      role: isEn ? 'Proposal Writer' : 'Proposal Writer',
      tag: isEn ? 'Project Documentation & Research' : 'Dokumentasi Akademik & Proposal',
      icon: '📝',
      desc: isEn
        ? 'Authored the formal Project-Based Learning (PjBL) academic proposal; structured research problem statements, project objectives, and developmental methodologies; drafted project timeline schedules; and curated academic documentation archives.'
        : 'Menyusun naskah proposal proyek akademik PjBL; merumuskan latar belakang masalah, tujuan pengembangan, ruang lingkup proyek, dan metodologi perancangan; melakukan penyusunan laporan tertulis; serta mengelola arsip administrasi dan dokumentasi proposal proyek.'
    }
  ];

  return `
    <div class="w-full bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        <!-- HERO HEADER: Project Attribution & Royal Banner -->
        <section class="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D49B42]/40 shadow-2xs text-xs font-bold text-[#C84C24] uppercase tracking-wider">
            <span>🏫</span>
            <span>${isEn ? 'Project-Based Learning (PjBL) • IT Department' : 'Project-Based Learning (PjBL) • Jurusan IT'}</span>
          </div>
          
          <h1 class="font-editorial-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#120B07] tracking-tight leading-[1.15]">
            ${isEn ? 'The Story of' : 'Kisah di Balik'} <span class="italic text-terracotta-gradient">LarasRasa</span>
          </h1>

          <p class="text-sm sm:text-base text-[#5C3622] leading-relaxed max-w-2xl mx-auto">
            ${isEn
              ? 'A digital culinary archive born from the dedication of Group 2 at SMK Pariwisata Metland School, celebrating and preserving the timeless gastronomic heritage of Central Java.'
              : 'Arsip digital khasanah kuliner pusaka yang lahir dari dedikasi Kelompok 2 Jurusan IT SMK Pariwisata Metland School, didedikasikan kagem merawat warisan gastronomi agung tanah Jawa Tengah.'}
          </p>
        </section>

        <!-- NARRATIVE SECTION: Origins & Rationale -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          <!-- Card 1: PjBL Assignment Origin -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white border border-[#D49B42]/35 shadow-xs space-y-4 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 flex items-center justify-center text-2xl shadow-inner">
                🎓
              </div>
              <span class="text-xs font-bold uppercase tracking-widest text-[#C84C24] block">
                ${isEn ? 'Academic Origin' : 'Awal Mula Proyek PjBL'}
              </span>
              <h2 class="font-editorial-serif text-2xl font-bold text-[#120B07]">
                ${isEn ? 'PjBL IT at SMK Pariwisata Metland School' : 'PjBL Jurusan IT di SMK Pariwisata Metland School'}
              </h2>
              <p class="text-xs sm:text-sm text-[#5C3622] leading-relaxed">
                ${isEn
                  ? 'LarasRasa was developed as part of the <strong>Project-Based Learning (PjBL)</strong> curriculum in the Information Technology Department (PPLG / IT) at <strong>SMK Pariwisata Metland School</strong>. Within this program, <strong>Group 2</strong> was tasked with developing an interactive digital platform showcasing the cultural treasures of <strong>Central Java (Jawa Tengah)</strong>.'
                  : 'LarasRasa berawal dari penugasan kurikulum <strong>Project-Based Learning (PjBL)</strong> yang diselenggarakan oleh Jurusan Teknologi Informasi / PPLG di <strong>SMK Pariwisata Metland School</strong>. Melalui program ini, <strong>Kelompok 2</strong> dipercaya mengemban tugas merancang dan membangun platform digital bertema kebudayaan dan potensi unggulan <strong>Provinsi Jawa Tengah</strong>.'}
              </p>
            </div>
            <div class="pt-3 border-t border-[#E8DEC8] text-[11px] font-semibold text-[#2E4D38] flex items-center gap-1.5">
              <span>✓</span>
              <span>${isEn ? 'Curriculum: PjBL Semester 1 Blocking 2' : 'Kurikulum: PjBL Semester 1 Blocking 2'}</span>
            </div>
          </div>

          <!-- Card 2: Why Group 2 Chose LarasRasa -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white border border-[#D49B42]/35 shadow-xs space-y-4 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 flex items-center justify-center text-2xl shadow-inner">
                🍲
              </div>
              <span class="text-xs font-bold uppercase tracking-widest text-[#C84C24] block">
                ${isEn ? 'Culinary Mission' : 'Alasan Memilih Kuliner Tradisional'}
              </span>
              <h2 class="font-editorial-serif text-2xl font-bold text-[#120B07]">
                ${isEn ? 'Why Group 2 Created LarasRasa' : 'Mengapa Kelompok 2 Memilih LarasRasa'}
              </h2>
              <p class="text-xs sm:text-sm text-[#5C3622] leading-relaxed">
                ${isEn
                  ? 'Among various cultural dimensions, <strong>Group 2</strong> chose to focus on Central Javanese gastronomy. Javanese cuisine is a profound living heritage that mirrors centuries of cultural exchange—from royal courts to northern coastal seaports. We built LarasRasa to introduce, celebrate, and preserve authentic regional recipes, aromatic spices, and culinary techniques for future generations.'
                  : 'Dari sekian banyak potensi budaya, <strong>Kelompok 2</strong> secara khusus memilih fokus pada khasanah kuliner dan rempah Jawa Tengah. Kuliner tradisional adalah warisan budaya hidup yang sarat filosofi, mengakar dalam tradisi peradaban keraton hingga pesisir. Kami membangun LarasRasa untuk mendokumentasikan serta melestarikan pusaka kuliner, resep otentik, dan bumbu rempah daerah agar tidak luntur tergerus zaman.'}
              </p>
            </div>
            <div class="pt-3 border-t border-[#E8DEC8] text-[11px] font-semibold text-[#2E4D38] flex items-center gap-1.5">
              <span>✓</span>
              <span>${isEn ? 'Preserving 29 Heritage Dishes & 19 Authentic Spices' : 'Melestarikan 29 Resep Pusaka & 19 Rempah Asli'}</span>
            </div>
          </div>

        </section>

        <!-- PHILOSOPHY BANNER: The Etymology of Laras & Rasa -->
        <section class="p-8 sm:p-12 rounded-3xl bg-[#120B07] text-[#FAF7F2] border border-[#D49B42]/40 shadow-xl relative overflow-hidden">
          <div class="absolute -top-16 -right-16 w-64 h-64 bg-[#D49B42]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="relative z-10 max-w-3xl space-y-4">
            <span class="text-xs font-bold uppercase tracking-widest text-[#D49B42] block">
              ${isEn ? 'Name Philosophy' : 'Falsafah Nama'}
            </span>
            <h2 class="font-editorial-serif text-2xl sm:text-4xl font-bold text-white">
              ${isEn ? 'The Harmony of Laras and Rasa' : 'Keselarasan Laras lan Raos'}
            </h2>
            <p class="text-xs sm:text-base text-[#FAF7F2]/85 leading-relaxed">
              ${isEn
                ? 'The name <strong>LarasRasa</strong> bridges two foundational Javanese concepts: <strong>Laras</strong> embodies balance, moral harmony, and cultural refinement; while <strong>Rasa</strong> encompasses taste, sensory appreciation, and the soul of ancestral hearth cooking. Together, LarasRasa represents the harmonious synthesis of Central Java’s culinary wisdom.'
                : 'Nama <strong>LarasRasa</strong> memadukan dua konsep falsafah Jawa adiluhung: <strong>Laras</strong> yang mencerminkan harmoni, keselarasan budi pekerti (luhuring budi), dan keseimbangan rasa batin; serta <strong>Rasa</strong> yang melambangkan kepekaan cita rasa, pengalaman bersantap, dan kehangatan tradisi dapur Nusantara. Keduanya menyatu merawat keharmonisan kuliner Jawa Tengah.'}
            </p>
            <div class="pt-2 text-xs italic text-[#D49B42] font-editorial-serif">
              "Nguri-uri kabudayan lumantar raos lan bumbu nuswantara."
            </div>
          </div>
        </section>

        <!-- TEAM STRUCTURE & CONTRIBUTIONS: Kelompok 2 -->
        <section class="space-y-8">
          <div class="text-center max-w-2xl mx-auto space-y-2">
            <span class="text-xs uppercase font-bold tracking-widest text-[#C84C24] block">
              ${isEn ? 'Team Attribution' : 'Struktur Tim & Kontribusi'}
            </span>
            <h2 class="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#120B07]">
              ${isEn ? 'Kelompok 2 Contributors' : 'Tim Pengembang Kelompok 2'}
            </h2>
            <p class="text-xs sm:text-sm text-[#5C3622]">
              ${isEn 
                ? 'The collaborative creators responsible for conceptualizing, engineering, designing, and documenting LarasRasa.' 
                : 'Sinergi kolaboratif dalam merancang, membangun, mendesain, dan menyusun dokumentasi resmi proyek LarasRasa.'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${teamMembers.map(m => `
              <div class="p-6 sm:p-7 rounded-3xl bg-white border border-[#D49B42]/35 shadow-xs hover:shadow-md transition-all space-y-3.5 flex flex-col justify-between">
                <div>
                  <div class="flex items-start justify-between gap-3 mb-2">
                    <div class="w-11 h-11 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 flex items-center justify-center text-xl shadow-inner shrink-0">
                      ${m.icon}
                    </div>
                    <span class="inline-block px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#D49B42]/30 text-[10px] font-bold text-[#C84C24] tracking-wide">
                      ${m.tag}
                    </span>
                  </div>
                  <h3 class="font-editorial-serif text-xl font-bold text-[#120B07] mb-0.5">
                    ${m.name}
                  </h3>
                  <p class="text-xs font-semibold text-[#D49B42] uppercase tracking-wider mb-3">
                    ${m.role}
                  </p>
                  <p class="text-xs text-[#5C3622] leading-relaxed">
                    ${m.desc}
                  </p>
                </div>
                <div class="pt-3 border-t border-[#E8DEC8] flex items-center justify-between text-[11px] text-[#5C3622]">
                  <span>PjBL IT • SMK Pariwisata Metland School</span>
                  <span class="text-[#2E4D38] font-bold">Kelompok 2</span>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- CTA TO EXPLORE -->
        <section class="text-center pt-4 pb-8">
          <div class="inline-flex flex-col sm:flex-row items-center gap-3">
            <a href="${isEn ? '#/recipes' : '#/resep'}" 
               class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#C84C24] hover:bg-[#AE3E1B] text-white transition-all shadow-md hover:shadow-xl cursor-pointer">
              <span>${isEn ? 'Explore Heritage Recipes' : 'Jelajahi Resep Pusaka'}</span>
              <span>&rarr;</span>
            </a>
            <a href="${isEn ? '#/flavor-map' : '#/peta-rasa'}" 
               class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-white hover:bg-[#FAF7F2] text-[#120B07] border border-[#D49B42]/40 shadow-xs cursor-pointer">
              <span>${isEn ? 'Discover 8 Regions' : 'Telusuri 8 Sentra Wilayah'}</span>
            </a>
          </div>
          <p class="text-xs text-[#5C3622]/70 mt-6">
            &copy; 2026–Present Kelompok 2. All Rights Reserved.
          </p>
        </section>

      </div>
    </div>
  `;
}

export function initAboutPageInteractions() {
  // Smooth scroll to top on load
  window.scrollTo({ top: 0, behavior: 'instant' });
}
