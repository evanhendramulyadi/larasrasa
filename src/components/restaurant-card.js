import { t } from '../i18n/index.js';

/**
 * Upgraded Restaurant Card Component
 */
export function renderRestaurantCard(restaurant) {
  return `
    <article class="restaurant-card bg-white rounded-2xl overflow-hidden border border-[#E5D9C5] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col card-hover-lift group">
      <!-- Image Header with Year Badge -->
      <div class="relative aspect-16/9 bg-[#302018]/10 overflow-hidden">
        <img src="${restaurant.image}" 
             alt="${restaurant.name}" 
             loading="lazy"
             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
             onerror="this.onerror=null; this.src='/assets/images/hero/hero-culinary.jpg';"/>
        <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
        
        <div class="absolute top-3 left-3 flex gap-2">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#C49A58] text-[#302018] shadow-xs">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Est. ${restaurant.yearEstablished}
          </span>
          <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#302018]/90 text-[#FAF6EF] backdrop-blur-xs">
            ${restaurant.city}
          </span>
        </div>

        <div class="absolute bottom-3 left-3 right-3 text-white">
          <h3 class="font-editorial-serif text-xl font-bold leading-tight drop-shadow-sm">
            ${restaurant.name}
          </h3>
          <p class="text-xs text-[#F2E8D8] line-clamp-1 mt-0.5 font-medium">
            ${restaurant.signatureDish}
          </p>
        </div>
      </div>

      <!-- Content Details -->
      <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div class="space-y-3">
          <p class="text-xs text-[#654332]/90 line-clamp-3 leading-relaxed">
            ${restaurant.description}
          </p>

          <div class="space-y-2 text-xs text-[#302018] pt-3 border-t border-[#E5D9C5]">
            <div class="flex items-start gap-2">
              <svg class="w-4 h-4 text-[#B85C38] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span class="line-clamp-2 text-[#654332]">${restaurant.address}</span>
            </div>
            <div class="flex items-center gap-2 text-[#777B52] font-medium">
              <svg class="w-4 h-4 text-[#777B52] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>${restaurant.openingHours}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="pt-3 border-t border-[#E5D9C5] flex items-center justify-between">
          <span class="text-[11px] font-semibold text-[#B85C38]">
            ${restaurant.priceRange}
          </span>
          <a href="${restaurant.googleMapsUrl}" 
             target="_blank" 
             rel="noopener noreferrer"
             class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#302018] text-[#FAF6EF] hover:bg-[#B85C38] transition-colors shadow-xs">
            <span>${t('common.openInMap')}</span>
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `;
}
