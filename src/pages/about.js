import { t, i18n } from '../i18n/index.js';

/**
 * Tentang LarasRasa (Brand Philosophy, Cultural Heritage, & Developer Team)
 * Fully bilingual, featuring:
 * - Brand Philosophy (Laras & Rasa)
 * - Metland School PjBL Background Story (Kelompok 2 Web Development)
 * - Why Central Javanese Culinary Heritage Matters
 * - 4 Modular & Editable Developer Cards
 * - Editorial Standards, Long-term Goals & Closing CTA
 */

export async function renderAboutPage() {
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
  const teamMembers = [
    {
      id: 'dev1',
      name: t('about.dev1Name'),
      role: t('about.dev1Role'),
      bio: t('about.dev1Bio'),
      initials: 'PL',
      colorBg: 'bg-[#140C07]',
      colorText: 'text-[#D49B42]',
      badgeBorder: 'border-[#D49B42]',
      skills: ['Cultural Research', 'Product Strategy', 'Design Systems', 'Team Leadership']
    },
    {
      id: 'dev2',
      name: t('about.dev2Name'),
      role: t('about.dev2Role'),
      bio: t('about.dev2Bio'),
      initials: 'FE',
      colorBg: 'bg-[#C84C24]',
      colorText: 'text-[#FAF7F2]',
      badgeBorder: 'border-[#C84C24]',
      skills: ['Vanilla JS (ESM)', 'Tailwind CSS', 'Visual Art Direction', 'Canvas 2D Engine']
    },
    {
      id: 'dev3',
      name: t('about.dev3Name'),
      role: t('about.dev3Role'),
      bio: t('about.dev3Bio'),
      initials: 'BE',
      colorBg: 'bg-[#4A5834]',
      colorText: 'text-[#FAF7F2]',
      badgeBorder: 'border-[#4A5834]',
      skills: ['Laravel Framework', 'MySQL Relational', 'RESTful API', 'Database Optimization']
    },
    {
      id: 'dev4',
      name: t('about.dev4Name'),
      role: t('about.dev4Role'),
      bio: t('about.dev4Bio'),
      initials: 'AI',
      colorBg: 'bg-[#22150E]',
      colorText: 'text-[#D49B42]',
      badgeBorder: 'border-[#D49B42]',
      skills: ['Culinary AI Prompting', 'Recipe Synthesis', 'High-DPI Export', 'jsPDF Generation']
    }
  ];

  return `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      <!-- Editorial Hero Header with Javanese Heritage Gradient -->
      <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto border border-[#D49B42]/35 shadow-xl bg-gradient-to-br from-[#140C07] via-[#22150E] to-[#140C07] text-[#FAF7F2]">
        <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#D49B42]/10 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#C84C24]/15 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 space-y-4 max-w-2xl mx-auto">
          <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#D49B42] uppercase tracking-wider border border-[#D49B42]/40 shadow-xs">
            ${t('about.badge')}
          </span>
          <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
            ${t('about.title')}
          </h1>
          <p class="text-sm sm:text-base text-[#FAF7F2]/85 leading-relaxed">
            ${t('about.intro')}
          </p>
        </div>
      </div>

      <!-- SECTION: Latar Belakang PjBL SMK Pariwisata Metland School -->
      <section class="bg-white rounded-3xl border border-[#E8DEC8] shadow-sm p-6 sm:p-10 space-y-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DEC8] pb-5">
          <div class="space-y-1">
            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF4EE] text-[#C84C24] text-xs font-bold uppercase tracking-wider border border-[#C84C24]/20">
              <span>🎓</span>
              <span>${t('about.pjblBadge')}</span>
            </span>
            <h2 class="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#140C07]">
              ${t('about.pjblTitle')}
            </h2>
          </div>
          <span class="text-xs font-mono font-bold text-[#4A5834] bg-[#FAF7F2] px-3.5 py-1.5 rounded-xl border border-[#E8DEC8] self-start md:self-auto">
            PjBL 2026 • Kelompok 2
          </span>
        </div>

        <p class="text-xs sm:text-sm text-[#5C3622] leading-relaxed">
          ${t('about.pjblDesc')}
        </p>

        <!-- 4 Key Highlights of the School Project -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-1">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#4A5834] block">${isEn ? 'Institution' : 'Institusi Pendidikan'}</span>
            <strong class="text-xs text-[#140C07] font-bold block">${t('about.pjblSchool')}</strong>
          </div>
          <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-1">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#4A5834] block">${isEn ? 'Department / Major' : 'Program Keahlian'}</span>
            <strong class="text-xs text-[#140C07] font-bold block">${t('about.pjblMajor')}</strong>
          </div>
          <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-1">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#4A5834] block">${isEn ? 'Project Group' : 'Tim Pelaksana'}</span>
            <strong class="text-xs text-[#C84C24] font-bold block">${t('about.pjblGroup')}</strong>
          </div>
          <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-1">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#4A5834] block">${isEn ? 'Core Project' : 'Karya Digital'}</span>
            <strong class="text-xs text-[#140C07] font-bold block">LarasRasa Web Application</strong>
          </div>
        </div>
      </section>

      <!-- Core Philosophy: Laras & Rasa -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div class="bg-white p-8 rounded-3xl border border-[#E8DEC8] shadow-sm space-y-4 flex flex-col justify-between card-hover-lift">
          <div class="space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-[#140C07] text-[#D49B42] flex items-center justify-center font-editorial-serif text-2xl font-bold shadow-xs">
              L
            </div>
            <h2 class="font-editorial-serif text-2xl font-bold text-[#140C07]">
              ${t('about.larasTitle')}
            </h2>
            <p class="text-sm text-[#5C3622] leading-relaxed">
              ${t('about.larasDesc')}
            </p>
          </div>
          <div class="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] text-xs text-[#C84C24] italic font-medium">
            ${i18n?.getLanguage && i18n.getLanguage() === 'en'
              ? '"A harmonious family begins at a dining table where flavors are in balance."'
              : '"Keluarga yang rukun berawal dari meja makan yang selaras rasanya."'}
          </div>
        </div>

        <div class="bg-white p-8 rounded-3xl border border-[#E8DEC8] shadow-sm space-y-4 flex flex-col justify-between card-hover-lift">
          <div class="space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-[#C84C24] text-white flex items-center justify-center font-editorial-serif text-2xl font-bold shadow-xs">
              R
            </div>
            <h2 class="font-editorial-serif text-2xl font-bold text-[#140C07]">
              ${t('about.rasaTitle')}
            </h2>
            <p class="text-sm text-[#5C3622] leading-relaxed">
              ${t('about.rasaDesc')}
            </p>
          </div>
          <div class="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] text-xs text-[#C84C24] italic font-medium">
            ${i18n?.getLanguage && i18n.getLanguage() === 'en'
              ? '"Every bite is a bridge of memory to the warmth of our ancestral land."'
              : '"Setiap gigitan adalah jembatan ingatan pada kehangatan tanah leluhur."'}
          </div>
        </div>
      </section>

      <!-- SECTION: Why Central Javanese Culinary Heritage Matters -->
      <section class="bg-white p-8 sm:p-10 rounded-3xl border border-[#E8DEC8] shadow-sm space-y-8">
        <div class="max-w-3xl space-y-2">
          <span class="text-xs font-bold uppercase tracking-widest text-[#C84C24]">
            ${t('about.whyMattersBadge')}
          </span>
          <h2 class="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#140C07]">
            ${t('about.whyMattersTitle')}
          </h2>
          <p class="text-xs sm:text-sm text-[#5C3622] leading-relaxed">
            ${t('about.whyMattersDesc')}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-3 flex flex-col justify-between">
            <div class="space-y-2">
              <span class="text-2xl">🌿</span>
              <h3 class="font-editorial-serif text-base font-bold text-[#140C07]">
                ${t('about.heritagePillar1Title')}
              </h3>
              <p class="text-xs text-[#5C3622] leading-relaxed">
                ${t('about.heritagePillar1Desc')}
              </p>
            </div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#4A5834]">
              ${isEn ? 'Natural Balance Principle' : 'Prinsip Keseimbangan Alam'}
            </span>
          </div>

          <div class="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-3 flex flex-col justify-between">
            <div class="space-y-2">
              <span class="text-2xl">🔥</span>
              <h3 class="font-editorial-serif text-base font-bold text-[#140C07]">
                ${t('about.heritagePillar2Title')}
              </h3>
              <p class="text-xs text-[#5C3622] leading-relaxed">
                ${t('about.heritagePillar2Desc')}
              </p>
            </div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#4A5834]">
              ${isEn ? 'Traditional Cooking Techniques' : 'Teknik Memasak Tradisional'}
            </span>
          </div>

          <div class="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-3 flex flex-col justify-between">
            <div class="space-y-2">
              <span class="text-2xl">🤝</span>
              <h3 class="font-editorial-serif text-base font-bold text-[#140C07]">
                ${t('about.heritagePillar3Title')}
              </h3>
              <p class="text-xs text-[#5C3622] leading-relaxed">
                ${t('about.heritagePillar3Desc')}
              </p>
            </div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#4A5834]">
              ${isEn ? 'Socio-Cultural Values' : 'Nilai Sosial Budaya'}
            </span>
          </div>
        </div>
      </section>

      <!-- SECTION: The 4 Developer Cards -->
      <section class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2">
          <div class="space-y-1">
            <span class="text-xs font-bold uppercase tracking-widest text-[#C84C24]">
              ${t('about.teamBadge')}
            </span>
            <h2 class="font-editorial-serif text-3xl font-bold text-[#140C07]">
              ${t('about.teamTitle')}
            </h2>
            <p class="text-xs sm:text-sm text-[#5C3622] max-w-2xl leading-relaxed">
              ${t('about.teamSubtitle')}
            </p>
          </div>
          <span class="text-[11px] text-[#4A5834] italic bg-[#EFE8DA] px-3 py-1 rounded-full border border-[#D49B42]/20 self-start sm:self-auto">
            ${t('about.teamEditNotice')}
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${teamMembers.map((dev) => `
            <div class="bg-white rounded-3xl border border-[#E8DEC8] p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 card-hover-lift">
              <div class="space-y-4">
                <!-- Avatar with Badge -->
                <div class="flex items-center justify-between">
                  <div class="w-14 h-14 rounded-2xl ${dev.colorBg} ${dev.colorText} font-editorial-serif text-xl font-bold flex items-center justify-center shadow-md border-2 border-white">
                    ${dev.initials}
                  </div>
                  <span class="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#C84C24] border border-[#C84C24]/20 font-mono">
                    Kelompok 2 PPLG
                  </span>
                </div>

                <!-- Info -->
                <div class="space-y-1">
                  <h3 class="font-editorial-serif text-lg font-bold text-[#140C07]">
                    ${dev.name}
                  </h3>
                  <div class="text-xs font-bold text-[#C84C24] leading-tight">
                    ${dev.role}
                  </div>
                </div>

                <!-- Bio -->
                <p class="text-xs text-[#5C3622] leading-relaxed">
                  ${dev.bio}
                </p>
              </div>

              <!-- Skills tags -->
              <div class="pt-3 border-t border-[#E8DEC8] space-y-2">
                <span class="text-[10px] font-bold uppercase tracking-wider text-[#4A5834] block">${isEn ? 'Core Skills:' : 'Keahlian Utama:'}</span>
                <div class="flex flex-wrap gap-1">
                  ${dev.skills.map(s => `
                    <span class="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#140C07] border border-[#E8DEC8]">
                      ${s}
                    </span>
                  `).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- SECTION: Goals & Long-Term Commitments -->
      <section class="bg-gradient-to-br from-[#140C07] to-[#22150E] text-[#FAF7F2] p-8 sm:p-12 rounded-3xl shadow-xl space-y-8 border border-[#D49B42]/30">
        <div class="max-w-2xl space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-[#D49B42]">${t('about.goalsBadge')}</span>
          <h2 class="font-editorial-serif text-3xl font-bold text-white">
            ${t('about.goalsTitle')}
          </h2>
          <p class="text-sm sm:text-base text-[#FAF7F2]/85 leading-relaxed">
            ${t('about.missionDesc')}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-xs text-[#FAF7F2]/80">
          <div class="space-y-2">
            <div class="w-8 h-8 rounded-xl bg-[#D49B42]/20 text-[#D49B42] flex items-center justify-center font-bold text-sm">
              01
            </div>
            <strong class="text-white block font-bold text-sm">${t('about.goal1Title')}</strong>
            <p class="leading-relaxed">${t('about.goal1Desc')}</p>
          </div>
          <div class="space-y-2">
            <div class="w-8 h-8 rounded-xl bg-[#D49B42]/20 text-[#D49B42] flex items-center justify-center font-bold text-sm">
              02
            </div>
            <strong class="text-white block font-bold text-sm">${t('about.goal2Title')}</strong>
            <p class="leading-relaxed">${t('about.goal2Desc')}</p>
          </div>
          <div class="space-y-2">
            <div class="w-8 h-8 rounded-xl bg-[#D49B42]/20 text-[#D49B42] flex items-center justify-center font-bold text-sm">
              03
            </div>
            <strong class="text-white block font-bold text-sm">${t('about.goal3Title')}</strong>
            <p class="leading-relaxed">${t('about.goal3Desc')}</p>
          </div>
        </div>
      </section>

      <!-- Editorial Curation Standards -->
      <section class="bg-white p-8 sm:p-10 rounded-3xl border border-[#E8DEC8] space-y-6 shadow-sm">
        <div class="space-y-2">
          <span class="text-xs font-bold uppercase tracking-widest text-[#C84C24]">${isEn ? 'Editorial Standards' : 'Standar Editorial'}</span>
          <h2 class="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#140C07]">
            ${t('about.standardsTitle')}
          </h2>
          <p class="text-xs sm:text-sm text-[#5C3622] leading-relaxed max-w-3xl">
            ${t('about.standardsDesc')}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div class="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-2.5">
            <div class="w-8 h-8 rounded-xl bg-[#C84C24]/15 text-[#C84C24] flex items-center justify-center font-bold text-sm">
              ✓
            </div>
            <h3 class="font-bold text-[#140C07] text-sm">${t('about.standards1Title')}</h3>
            <p class="text-[#5C3622] leading-relaxed text-xs">
              ${t('about.standards1Desc')}
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-2.5">
            <div class="w-8 h-8 rounded-xl bg-[#D49B42]/20 text-[#140C07] flex items-center justify-center font-bold text-sm">
              ★
            </div>
            <h3 class="font-bold text-[#140C07] text-sm">${t('about.standards2Title')}</h3>
            <p class="text-[#5C3622] leading-relaxed text-xs">
              ${t('about.standards2Desc')}
            </p>
          </div>
        </div>
      </section>

      <!-- Closing Call To Action -->
      <section class="p-8 sm:p-12 rounded-3xl bg-[#FAF7F2] border-2 border-[#D49B42]/35 text-center space-y-6 shadow-xs">
        <div class="max-w-2xl mx-auto space-y-3">
          <h2 class="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#140C07]">
            ${t('about.closingTitle')}
          </h2>
          <p class="font-editorial-serif italic text-base sm:text-lg text-[#C84C24]">
            ${t('about.closingDesc')}
          </p>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a href="#/resep" class="px-6 py-3 rounded-full bg-[#140C07] hover:bg-[#22150E] text-[#FAF7F2] text-xs font-bold transition-all shadow-xs hover:shadow-md">
            ${t('about.closingExploreBtn')}
          </a>
          <a href="#/ai-food-creator" class="px-6 py-3 rounded-full bg-[#C84C24] hover:bg-[#AE3E1B] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md flex items-center gap-2">
            <span>✨</span>
            <span>${t('about.closingAiBtn')}</span>
          </a>
        </div>
      </section>

    </div>
  `;
}
