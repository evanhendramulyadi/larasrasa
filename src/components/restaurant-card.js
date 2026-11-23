import { i18n } from '../i18n/index.js';

/**
 * Editorial Royal Heritage Restaurant Card Component
 * Verified city badge, year, Google Maps link, and authentic concise description.
 */
export function renderRestaurantCard(restaurant) {
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';

  return `
    <article class="restaurant-card bg-white rounded-3xl overflow-hidden border border-[#D49B42]/30 shadow-xs hover:shadow-2xl hover:border-[#D49B42] transition-all duration-300 flex flex-col card-hover-lift group">
      <!-- Image Header -->
      <div class="relative aspect-16/10 bg-[#120B07]/10 overflow-hidden">
        <img src="${restaurant.image}" 
             alt="${restaurant.name}" 
             loading="lazy"
             class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
             onerror="this.onerror=null; this.src='/assets/images/hero/hero-culinary.jpg';"/>
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

        <div class="absolute bottom-3.5 left-3.5 right-3.5 text-white">
          <h3 class="font-editorial-serif text-xl sm:text-2xl font-bold leading-tight drop-shadow-md group-hover:text-[#F2BD68] transition-colors">
            ${restaurant.name}
          </h3>
        </div>
      </div>

      <!-- Content Details -->
      <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p class="text-xs sm:text-sm text-[#5C3622] leading-relaxed">
            ${restaurant.description}
          </p>
        </div>

        <!-- Action Bar: City & Map Navigation -->
        <div class="pt-3.5 border-t border-[#E8DEC8] flex items-center justify-between gap-2">
          <span class="text-xs text-[#8C6D52] font-semibold flex items-center gap-1.5 truncate">
            <svg class="w-3.5 h-3.5 text-[#C84C24] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span class="truncate">${restaurant.city}</span>
          </span>
          <a href="${restaurant.googleMapsUrl}" 
             target="_blank" 
             rel="noopener noreferrer"
             class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#120B07] text-[#FAF7F2] hover:bg-[#C84C24] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 shrink-0">
            <span>${isEn ? 'Open Map' : 'Buka di Peta'}</span>
            <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `;
}
