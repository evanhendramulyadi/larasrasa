import { t, i18n } from '../i18n/index.js';

/**
 * Tentang LarasRasa (Brand Philosophy, Cultural Heritage, & Developer Team)
 * Fully bilingual, featuring:
 * - Brand Philosophy (Laras & Rasa)
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
      colorBg: 'bg-[#302018]',
      colorText: 'text-[#C49A58]',
      badgeBorder: 'border-[#C49A58]',
      skills: ['Cultural Research', 'Product Strategy', 'Design Systems', 'Team Leadership']
    },
    {
      id: 'dev2',
      name: t('about.dev2Name'),
      role: t('about.dev2Role'),
      bio: t('about.dev2Bio'),
      initials: 'FE',
      colorBg: 'bg-[#B85C38]',
      colorText: 'text-[#FAF6EF]',
      badgeBorder: 'border-[#B85C38]',
      skills: ['Vanilla JS (ESM)', 'Tailwind CSS', 'Visual Art Direction', 'Canvas 2D Engine']
    },
    {
      id: 'dev3',
      name: t('about.dev3Name'),
      role: t('about.dev3Role'),
      bio: t('about.dev3Bio'),
      initials: 'BE',
      colorBg: 'bg-[#777B52]',
      colorText: 'text-[#FAF6EF]',
      badgeBorder: 'border-[#777B52]',
      skills: ['Laravel Framework', 'MySQL Relational', 'RESTful API', 'Database Optimization']
    },
    {
      id: 'dev4',
      name: t('about.dev4Name'),
      role: t('about.dev4Role'),
      bio: t('about.dev4Bio'),
      initials: 'AI',
      colorBg: 'bg-[#654332]',
      colorText: 'text-[#C49A58]',
      badgeBorder: 'border-[#654332]',
      skills: ['Culinary AI Prompting', 'Recipe Synthesis', 'High-DPI Export', 'jsPDF Generation']
    }
  ];

  return `
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      <!-- Editorial Hero Header with Javanese Heritage Gradient -->
      <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto border border-[#C49A58]/35 shadow-xl bg-gradient-to-br from-[#24140D] via-[#351C12] to-[#1A0F0A] text-[#FAF6EF]">
        <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#C49A58]/10 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#B85C38]/15 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 space-y-4 max-w-2xl mx-auto">
          <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF6EF]/10 text-xs font-bold text-[#C49A58] uppercase tracking-wider border border-[#C49A58]/40 shadow-xs">
            ${t('about.badge')}
          </span>
          <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
            ${t('about.title')}
          </h1>
          <p class="text-sm sm:text-base text-[#FAF6EF]/85 leading-relaxed">
            ${t('about.intro')}
          </p>
        </div>
      </div>

      <!-- Core Philosophy: Laras & Rasa -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div class="bg-white p-8 rounded-3xl border border-[#C49A58]/25 shadow-xs space-y-4 flex flex-col justify-between card-hover-lift">
          <div class="space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-[#302018] text-[#C49A58] flex items-center justify-center font-editorial-serif text-2xl font-bold shadow-xs">
              L
            </div>
            <h2 class="font-editorial-serif text-2xl font-bold text-[#302018]">
              ${t('about.larasTitle')}
            </h2>
            <p class="text-sm text-[#654332] leading-relaxed">
              ${t('about.larasDesc')}
            </p>
          </div>
          <div class="p-3.5 rounded-xl bg-[#FAF6EF] border border-[#C49A58]/15 text-xs text-[#B85C38] italic font-medium">
            ${i18n?.getLanguage && i18n.getLanguage() === 'en'
              ? '"A harmonious family begins at a dining table where flavors are in balance."'
              : '"Keluarga yang rukun berawal dari meja makan yang selaras rasanya."'}
          </div>
        </div>

        <div class="bg-white p-8 rounded-3xl border border-[#C49A58]/25 shadow-xs space-y-4 flex flex-col justify-between card-hover-lift">
          <div class="space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-[#B85C38] text-white flex items-center justify-center font-editorial-serif text-2xl font-bold shadow-xs">
              R
            </div>
            <h2 class="font-editorial-serif text-2xl font-bold text-[#302018]">
              ${t('about.rasaTitle')}
            </h2>
            <p class="text-sm text-[#654332] leading-relaxed">
              ${t('about.rasaDesc')}
            </p>
          </div>
          <div class="p-3.5 rounded-xl bg-[#FAF6EF] border border-[#C49A58]/15 text-xs text-[#B85C38] italic font-medium">
            ${i18n?.getLanguage && i18n.getLanguage() === 'en'
              ? '"Every bite is a bridge of memory to the warmth of our ancestral land."'
              : '"Setiap gigitan adalah jembatan ingatan pada kehangatan tanah leluhur."'}
          </div>
        </div>
      </section>

      <!-- SECTION: Why Central Javanese Culinary Heritage Matters -->
      <section class="bg-white p-8 sm:p-10 rounded-3xl border border-[#C49A58]/25 shadow-xs space-y-8">
        <div class="max-w-3xl space-y-2">
          <span class="text-xs font-bold uppercase tracking-widest text-[#B85C38]">
            ${t('about.whyMattersBadge')}
          </span>
          <h2 class="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#302018]">
            ${t('about.whyMattersTitle')}
          </h2>
          <p class="text-xs sm:text-sm text-[#654332] leading-relaxed">
            ${t('about.whyMattersDesc')}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl bg-[#FAF6EF] border border-[#E5D9C5] space-y-3 flex flex-col justify-between">
            <div class="space-y-2">
              <span class="text-2xl">🌿</span>
              <h3 class="font-editorial-serif text-base font-bold text-[#302018]">
                ${t('about.heritagePillar1Title')}
              </h3>
              <p class="text-xs text-[#654332] leading-relaxed">
                ${t('about.heritagePillar1Desc')}
              </p>
            </div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#777B52]">
              ${isEn ? 'Natural Balance Principle' : 'Prinsip Keseimbangan Alam'}
            </span>
          </div>

          <div class="p-6 rounded-2xl bg-[#FAF6EF] border border-[#E5D9C5] space-y-3 flex flex-col justify-between">
            <div class="space-y-2">
              <span class="text-2xl">🔥</span>
              <h3 class="font-editorial-serif text-base font-bold text-[#302018]">
                ${t('about.heritagePillar2Title')}
              </h3>
              <p class="text-xs text-[#654332] leading-relaxed">
                ${t('about.heritagePillar2Desc')}
              </p>
            </div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#777B52]">
              ${isEn ? 'Traditional Cooking Techniques' : 'Teknik Memasak Tradisional'}
            </span>
          </div>

          <div class="p-6 rounded-2xl bg-[#FAF6EF] border border-[#E5D9C5] space-y-3 flex flex-col justify-between">
            <div class="space-y-2">
              <span class="text-2xl">🤝</span>
              <h3 class="font-editorial-serif text-base font-bold text-[#302018]">
                ${t('about.heritagePillar3Title')}
              </h3>
              <p class="text-xs text-[#654332] leading-relaxed">
                ${t('about.heritagePillar3Desc')}
              </p>
            </div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#777B52]">
              ${isEn ? 'Socio-Cultural Values' : 'Nilai Sosial Budaya'}
            </span>
          </div>
        </div>
      </section>

      <!-- SECTION: The 4 Developer Cards -->
      <section class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2">
          <div class="space-y-1">
            <span class="text-xs font-bold uppercase tracking-widest text-[#B85C38]">
              ${t('about.teamBadge')}
            </span>
            <h2 class="font-editorial-serif text-3xl font-bold text-[#302018]">
              ${t('about.teamTitle')}
            </h2>
            <p class="text-xs sm:text-sm text-[#654332] max-w-2xl leading-relaxed">
              ${t('about.teamSubtitle')}
            </p>
          </div>
          <span class="text-[11px] text-[#777B52] italic bg-[#F2E8D8] px-3 py-1 rounded-full border border-[#C49A58]/20 self-start sm:self-auto">
            ${t('about.teamEditNotice')}
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${teamMembers.map((dev) => `
            <div class="bg-white rounded-3xl border border-[#E5D9C5] p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 card-hover-lift">
              <div class="space-y-4">
                <!-- Avatar with Badge -->
                <div class="flex items-center justify-between">
                  <div class="w-14 h-14 rounded-2xl ${dev.colorBg} ${dev.colorText} font-editorial-serif text-xl font-bold flex items-center justify-center shadow-md border-2 border-white">
                    ${dev.initials}
                  </div>
                  <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FAF6EF] text-[#654332] border border-[#E5D9C5]">
                    LarasRasa Core
                  </span>
                </div>

                <!-- Info -->
                <div class="space-y-1">
                  <h3 class="font-editorial-serif text-lg font-bold text-[#302018]">
                    ${dev.name}
                  </h3>
                  <div class="text-xs font-bold text-[#B85C38] leading-tight">
                    ${dev.role}
                  </div>
                </div>

                <!-- Bio -->
                <p class="text-xs text-[#654332] leading-relaxed">
                  ${dev.bio}
                </p>
              </div>

              <!-- Skills tags -->
              <div class="pt-3 border-t border-[#E5D9C5] space-y-2">
                <span class="text-[10px] font-bold uppercase tracking-wider text-[#777B52] block">${isEn ? 'Core Skills:' : 'Keahlian Utama:'}</span>
                <div class="flex flex-wrap gap-1">
                  ${dev.skills.map(s => `
                    <span class="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-[#FAF6EF] text-[#302018] border border-[#C49A58]/20">
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
      <section class="bg-gradient-to-br from-[#302018] to-[#1F140F] text-[#FAF6EF] p-8 sm:p-12 rounded-3xl shadow-xl space-y-8">
        <div class="max-w-2xl space-y-3">
          <span class="text-xs font-bold uppercase tracking-widest text-[#C49A58]">${t('about.goalsBadge')}</span>
          <h2 class="font-editorial-serif text-3xl font-bold text-white">
            ${t('about.goalsTitle')}
          </h2>
          <p class="text-sm sm:text-base text-[#FAF6EF]/85 leading-relaxed">
            ${t('about.missionDesc')}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#654332] text-xs text-[#FAF6EF]/80">
          <div class="space-y-2">
            <div class="w-8 h-8 rounded-xl bg-[#C49A58]/20 text-[#C49A58] flex items-center justify-center font-bold text-sm">
              01
            </div>
            <strong class="text-white block font-bold text-sm">${t('about.goal1Title')}</strong>
            <p class="leading-relaxed">${t('about.goal1Desc')}</p>
          </div>
          <div class="space-y-2">
            <div class="w-8 h-8 rounded-xl bg-[#C49A58]/20 text-[#C49A58] flex items-center justify-center font-bold text-sm">
              02
            </div>
            <strong class="text-white block font-bold text-sm">${t('about.goal2Title')}</strong>
            <p class="leading-relaxed">${t('about.goal2Desc')}</p>
          </div>
          <div class="space-y-2">
            <div class="w-8 h-8 rounded-xl bg-[#C49A58]/20 text-[#C49A58] flex items-center justify-center font-bold text-sm">
              03
            </div>
            <strong class="text-white block font-bold text-sm">${t('about.goal3Title')}</strong>
            <p class="leading-relaxed">${t('about.goal3Desc')}</p>
          </div>
        </div>
      </section>

      <!-- Editorial Curation Standards -->
      <section class="bg-white p-8 sm:p-10 rounded-3xl border border-[#C49A58]/20 space-y-6 shadow-sm">
        <div class="space-y-2">
          <span class="text-xs font-bold uppercase tracking-widest text-[#B85C38]">${isEn ? 'Editorial Standards' : 'Standar Editorial'}</span>
          <h2 class="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#302018]">
            ${t('about.standardsTitle')}
          </h2>
          <p class="text-xs sm:text-sm text-[#654332] leading-relaxed max-w-3xl">
            ${t('about.standardsDesc')}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div class="p-6 rounded-2xl bg-[#FAF6EF] border border-[#C49A58]/20 space-y-2.5">
            <div class="w-8 h-8 rounded-xl bg-[#B85C38]/15 text-[#B85C38] flex items-center justify-center font-bold text-sm">
              ✓
            </div>
            <h3 class="font-bold text-[#302018] text-sm">${t('about.standards1Title')}</h3>
            <p class="text-[#654332] leading-relaxed text-xs">
              ${t('about.standards1Desc')}
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-[#FAF6EF] border border-[#C49A58]/20 space-y-2.5">
            <div class="w-8 h-8 rounded-xl bg-[#C49A58]/20 text-[#302018] flex items-center justify-center font-bold text-sm">
              ★
            </div>
            <h3 class="font-bold text-[#302018] text-sm">${t('about.standards2Title')}</h3>
            <p class="text-[#654332] leading-relaxed text-xs">
              ${t('about.standards2Desc')}
            </p>
          </div>
        </div>
      </section>

      <!-- Closing Call To Action -->
      <section class="p-8 sm:p-12 rounded-3xl bg-[#FAF6EF] border-2 border-[#C49A58]/35 text-center space-y-6 shadow-xs">
        <div class="max-w-2xl mx-auto space-y-3">
          <h2 class="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#302018]">
            ${t('about.closingTitle')}
          </h2>
          <p class="font-editorial-serif italic text-base sm:text-lg text-[#B85C38]">
            ${t('about.closingDesc')}
          </p>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a href="#/resep" class="px-6 py-3 rounded-full bg-[#302018] hover:bg-[#1F140F] text-[#FAF6EF] text-xs font-bold transition-all shadow-xs hover:shadow-md">
            ${t('about.closingExploreBtn')}
          </a>
          <a href="#/ai-food-creator" class="px-6 py-3 rounded-full bg-[#B85C38] hover:bg-[#A04A27] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md flex items-center gap-2">
            <span>✨</span>
            <span>${t('about.closingAiBtn')}</span>
          </a>
        </div>
      </section>

    </div>
  `;
}
