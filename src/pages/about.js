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
      initials: 'EH',
      colorBg: 'bg-[#120B07]',
      colorText: 'text-[#D49B42]',
      badgeBorder: 'border-[#D49B42]',
      skills: ['Cultural Research', 'Product Architecture', 'Creative Direction', 'Team Leadership']
    },
    {
      id: 'dev2',
      name: t('about.dev2Name'),
      role: t('about.dev2Role'),
      bio: t('about.dev2Bio'),
      initials: 'FD',
      colorBg: 'bg-[#C84C24]',
      colorText: 'text-[#FAF7F2]',
      badgeBorder: 'border-[#C84C24]',
      skills: ['Vite & ESM', 'Tailwind CSS', 'Editorial UI/UX', 'Interactive Canvas']
    },
    {
      id: 'dev3',
      name: t('about.dev3Name'),
      role: t('about.dev3Role'),
      bio: t('about.dev3Bio'),
      initials: 'BA',
      colorBg: 'bg-[#2E4D38]',
      colorText: 'text-[#FAF7F2]',
      badgeBorder: 'border-[#2E4D38]',
      skills: ['Laravel Framework', 'MySQL Relational', 'RESTful API Contracts', 'Data Architecture']
    },
    {
      id: 'dev4',
      name: t('about.dev4Name'),
      role: t('about.dev4Role'),
      bio: t('about.dev4Bio'),
      initials: 'RN',
      colorBg: 'bg-[#1E120A]',
      colorText: 'text-[#D49B42]',
      badgeBorder: 'border-[#D49B42]',
      skills: ['Culinary AI Synthesis', 'Portion Calibration', 'Blueprint Generation', 'jsPDF Engine']
    }
  ];

  return `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      <!-- Editorial Hero Header with Javanese Heritage Gradient -->
      <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-14 text-center max-w-4xl mx-auto border-2 border-[#D49B42]/45 shadow-2xl bg-gradient-to-br from-[#120B07] via-[#1E120A] to-[#120B07] text-[#FAF7F2]">
        <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#D49B42]/15 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#C84C24]/18 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 space-y-4 max-w-2xl mx-auto">
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#D49B42] uppercase tracking-wider border border-[#D49B42]/40 shadow-xs">
            <span class="w-2 h-2 rounded-full bg-[#C84C24] animate-pulse"></span>
            <span>${t('about.badge')}</span>
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
      <section class="bg-white rounded-3xl border border-[#D49B42]/35 shadow-sm p-6 sm:p-10 space-y-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DEC8] pb-5">
          <div class="space-y-1">
            <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDF4EE] text-[#C84C24] text-xs font-bold uppercase tracking-wider border border-[#C84C24]/20">
              <span>🎓</span>
              <span>${t('about.pjblBadge')}</span>
            </span>
            <h2 class="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#120B07]">
              ${t('about.pjblTitle')}
            </h2>
          </div>
          <span class="text-xs font-mono font-bold text-[#2E4D38] bg-[#FAF7F2] px-4 py-2 rounded-xl border border-[#D49B42]/35 self-start md:self-auto shadow-2xs">
            PjBL 2026 • Kelompok 2
          </span>
        </div>

        <p class="text-xs sm:text-sm text-[#5C3622] leading-relaxed">
          ${t('about.pjblDesc')}
        </p>

        <!-- Academic Info Box -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 space-y-1">
            <span class="text-[10px] uppercase font-bold text-[#2E4D38] tracking-wider block">Institusi Pendidikan</span>
            <strong class="text-xs font-bold text-[#120B07] block">${t('about.pjblSchool')}</strong>
          </div>
          <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 space-y-1">
            <span class="text-[10px] uppercase font-bold text-[#2E4D38] tracking-wider block">Konsentrasi Keahlian</span>
            <strong class="text-xs font-bold text-[#120B07] block">${t('about.pjblMajor')}</strong>
          </div>
          <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 space-y-1">
            <span class="text-[10px] uppercase font-bold text-[#2E4D38] tracking-wider block">Divisi Pengembang</span>
            <strong class="text-xs font-bold text-[#120B07] block">${t('about.pjblGroup')}</strong>
          </div>
          <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 space-y-1">
            <span class="text-[10px] uppercase font-bold text-[#2E4D38] tracking-wider block">Tema Karya Proyek</span>
            <strong class="text-xs font-bold text-[#C84C24] block">${t('about.pjblProjectTitle')}</strong>
          </div>
        </div>
      </section>

      <!-- SECTION: FILOSOFI LARAS & RASA -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <!-- Laras -->
        <div class="bg-gradient-to-br from-[#120B07] to-[#1E120A] text-[#FAF7F2] p-8 sm:p-10 rounded-3xl border-2 border-[#D49B42]/40 shadow-xl flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#D49B42] uppercase tracking-wider border border-[#D49B42]/30">
              <span>✦</span>
              <span>Filosofi Mataram</span>
            </div>
            <h2 class="font-editorial-serif text-3xl font-bold text-white">
              ${t('about.larasTitle')}
            </h2>
            <p class="text-xs sm:text-sm text-[#FAF7F2]/85 leading-relaxed">
              ${t('about.larasDesc')}
            </p>
          </div>
          <div class="pt-4 border-t border-white/10 text-[11px] text-[#D49B42] italic font-editorial-serif">
            "Laras ing raos, tenteram ing batin."
          </div>
        </div>

        <!-- Rasa -->
        <div class="bg-white p-8 sm:p-10 rounded-3xl border-2 border-[#D49B42]/40 shadow-xl flex flex-col justify-between space-y-4">
          <div class="space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF4EE] text-xs font-bold text-[#C84C24] uppercase tracking-wider border border-[#C84C24]/20">
              <span>✦</span>
              <span>Kearifan Leluhur</span>
            </div>
            <h2 class="font-editorial-serif text-3xl font-bold text-[#120B07]">
              ${t('about.rasaTitle')}
            </h2>
            <p class="text-xs sm:text-sm text-[#5C3622] leading-relaxed">
              ${t('about.rasaDesc')}
            </p>
          </div>
          <div class="pt-4 border-t border-[#E8DEC8] text-[11px] text-[#C84C24] italic font-editorial-serif font-bold">
            "Raos sejati nguripake tradisi dapur Jawa."
          </div>
        </div>
      </section>

      <!-- SECTION: MENGAPA KULINER JAWA TENGAH BERHARGA -->
      <section class="bg-white rounded-3xl border border-[#D49B42]/35 shadow-sm p-6 sm:p-10 space-y-8">
        <div class="max-w-3xl space-y-2 border-b border-[#E8DEC8] pb-5">
          <span class="text-xs uppercase font-bold tracking-widest text-[#C84C24] flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#C84C24]"></span>
            <span>${t('about.whyMattersBadge')}</span>
          </span>
          <h2 class="font-editorial-serif text-2xl sm:text-4xl font-bold text-[#120B07]">
            ${t('about.whyMattersTitle')}
          </h2>
          <p class="text-xs sm:text-sm text-[#5C3622] leading-relaxed pt-1">
            ${t('about.whyMattersDesc')}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 space-y-2.5">
            <span class="text-2xl">🍯</span>
            <h3 class="font-editorial-serif text-lg font-bold text-[#120B07]">${t('about.heritagePillar1Title')}</h3>
            <p class="text-xs text-[#5C3622] leading-relaxed">${t('about.heritagePillar1Desc')}</p>
          </div>

          <div class="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 space-y-2.5">
            <span class="text-2xl">🔥</span>
            <h3 class="font-editorial-serif text-lg font-bold text-[#120B07]">${t('about.heritagePillar2Title')}</h3>
            <p class="text-xs text-[#5C3622] leading-relaxed">${t('about.heritagePillar2Desc')}</p>
          </div>

          <div class="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 space-y-2.5">
            <span class="text-2xl">👥</span>
            <h3 class="font-editorial-serif text-lg font-bold text-[#120B07]">${t('about.heritagePillar3Title')}</h3>
            <p class="text-xs text-[#5C3622] leading-relaxed">${t('about.heritagePillar3Desc')}</p>
          </div>
        </div>
      </section>

      <!-- SECTION: 4 MODULAR DEVELOPER CARDS (SMK Metland School Kelompok 2) -->
      <section class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#D49B42]/25">
          <div class="space-y-1.5">
            <span class="text-xs uppercase font-bold tracking-widest text-[#C84C24] flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#C84C24]"></span>
              <span>${t('about.teamBadge')}</span>
            </span>
            <h2 class="font-editorial-serif text-2xl sm:text-4xl font-bold text-[#120B07]">
              ${t('about.teamTitle')}
            </h2>
            <p class="text-xs sm:text-sm text-[#5C3622]">
              ${t('about.teamSubtitle')}
            </p>
          </div>
          <span class="text-[11px] text-[#2E4D38] font-bold italic shrink-0">
            ${t('about.teamEditNotice')}
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${teamMembers.map(dev => `
            <div class="bg-white rounded-3xl border border-[#D49B42]/35 shadow-xs p-6 space-y-4 flex flex-col justify-between card-hover-lift">
              <div class="space-y-3.5">
                <!-- Avatar & Initials Badge -->
                <div class="w-14 h-14 rounded-2xl ${dev.colorBg} ${dev.colorText} border-2 ${dev.badgeBorder} flex items-center justify-center font-editorial-serif font-bold text-xl shadow-md">
                  ${dev.initials}
                </div>

                <div>
                  <h3 class="font-editorial-serif text-lg font-bold text-[#120B07] leading-snug">
                    ${dev.name}
                  </h3>
                  <p class="text-[11px] font-bold text-[#C84C24] mt-0.5">
                    ${dev.role}
                  </p>
                </div>

                <p class="text-xs text-[#5C3622] leading-relaxed">
                  ${dev.bio}
                </p>
              </div>

              <!-- Skill Badges -->
              <div class="pt-3 border-t border-[#E8DEC8]">
                <div class="flex flex-wrap gap-1">
                  ${dev.skills.map(s => `
                    <span class="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#120B07] border border-[#E8DEC8]">
                      ${s}
                    </span>
                  `).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- SECTION: KOMITMEN BERKELANJUTAN -->
      <section class="bg-white rounded-3xl border border-[#D49B42]/35 shadow-sm p-6 sm:p-10 space-y-6">
        <div class="border-b border-[#E8DEC8] pb-4">
          <span class="text-xs uppercase font-bold tracking-widest text-[#C84C24]">${t('about.goalsBadge')}</span>
          <h2 class="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#120B07] mt-1">
            ${t('about.goalsTitle')}
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-1.5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8]">
            <strong class="text-sm font-bold text-[#120B07] block">${t('about.goal1Title')}</strong>
            <p class="text-xs text-[#5C3622] leading-relaxed">${t('about.goal1Desc')}</p>
          </div>
          <div class="space-y-1.5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8]">
            <strong class="text-sm font-bold text-[#120B07] block">${t('about.goal2Title')}</strong>
            <p class="text-xs text-[#5C3622] leading-relaxed">${t('about.goal2Desc')}</p>
          </div>
          <div class="space-y-1.5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC8]">
            <strong class="text-sm font-bold text-[#120B07] block">${t('about.goal3Title')}</strong>
            <p class="text-xs text-[#5C3622] leading-relaxed">${t('about.goal3Desc')}</p>
          </div>
        </div>
      </section>

      <!-- CLOSING STATEMENT & CALL TO ACTION -->
      <section class="text-center max-w-2xl mx-auto space-y-6 py-6">
        <h2 class="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#120B07]">
          ${t('about.closingTitle')}
        </h2>
        <p class="text-xs sm:text-sm text-[#5C3622] italic font-editorial-serif leading-relaxed">
          ${t('about.closingDesc')}
        </p>
        <div class="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a href="#/resep" class="px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#C84C24] hover:bg-[#AE3E1B] text-white transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 border border-[#E05A30]">
            ${t('about.closingExploreBtn')}
          </a>
          <a href="#/ai-food-creator" class="px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#120B07] hover:bg-[#1E120A] text-[#FAF7F2] transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 border border-[#D49B42]/40">
            ${t('about.closingAiBtn')}
          </a>
        </div>
      </section>

    </div>
  `;
}
