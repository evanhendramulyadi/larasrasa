import L from 'leaflet';
import { regionService } from '../services/regionService.js';
import { i18n, t } from '../i18n/index.js';

/**
 * Peta Rasa (Interactive Central Java Flavor Map)
 * Royal heritage palette, GeoJSON district boundaries, and full bilingual support.
 */

let mapInstance = null;
let regionMarkers = {};
let activeRegionId = 'semarang';

export async function renderFlavorMapPage() {
  const regions = await regionService.getRegions();
  const currentRegion = regions.find(r => r.id === activeRegionId) || regions[0];

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <!-- Page Header with Javanese Heritage Gradient -->
      <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-14 border-2 border-[#D49B42]/40 shadow-2xl bg-gradient-to-r from-[#120B07] via-[#1E120A] to-[#120B07] text-[#FAF7F2]">
        <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#D49B42]/15 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#C84C24]/18 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div class="space-y-3.5 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#D49B42]/40 text-xs font-bold text-[#D49B42] uppercase tracking-wider shadow-xs">
              <svg class="w-3.5 h-3.5 text-[#C84C24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                <line x1="9" x2="9" y1="3" y2="18"/>
                <line x1="15" x2="15" y1="6" y2="21"/>
              </svg>
              <span>${t('map.badge')}</span>
            </div>
            <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              ${t('map.title')}
            </h1>
            <p class="text-sm sm:text-base text-[#FAF7F2]/85 leading-relaxed">
              ${t('map.desc')}
            </p>
          </div>

          <!-- Quick Region Selector Pills -->
          <div class="flex flex-wrap gap-2 max-w-md md:justify-end">
            ${regions.map(r => `
              <button type="button" 
                      data-region-pill="${r.id}"
                      class="region-pill px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        r.id === activeRegionId 
                          ? 'bg-[#C84C24] text-white shadow-md ring-2 ring-[#D49B42]/50' 
                          : 'bg-white/10 text-[#FAF7F2] border border-[#D49B42]/40 hover:bg-[#C84C24]/50 backdrop-blur-md'
                      }">
                ${r.name.replace('Kota ', '').replace('Kabupaten ', '')}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Map & Detail Panel Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left: Interactive Leaflet Map -->
        <div class="lg:col-span-7 bg-white rounded-3xl border border-[#D49B42]/35 p-5 shadow-xs overflow-hidden flex flex-col">
          <!-- Map Title Bar -->
          <div class="px-2 py-2 flex items-center justify-between text-xs text-[#5C3622] border-b border-[#E8DEC8] mb-3">
            <span class="font-bold uppercase tracking-wider text-[#120B07] flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#C84C24]"></span>
              <span>${t('map.mapTitle')}</span>
            </span>
            <span class="text-[11px] italic text-[#2E4D38] font-semibold">${t('map.mapInstruction')}</span>
          </div>

          <!-- Leaflet Container -->
          <div id="central-java-map" class="w-full h-[480px] sm:h-[560px] rounded-2xl overflow-hidden z-10 bg-[#FAF7F2] border border-[#E8DEC8]"></div>

          <!-- Map Legend -->
          <div class="pt-4 px-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5C3622]">
            <div class="flex items-center gap-2">
              <span class="w-3.5 h-3.5 rounded-full bg-[#C84C24] border-2 border-white shadow-xs"></span>
              <span class="font-bold text-[#120B07]">${t('map.legendCenter')}</span>
            </div>
            <span class="text-[11px] text-[#5C3622] italic">${t('map.mapInstruction')}</span>
          </div>
        </div>

        <!-- Right: Region Culinary Profile Panel -->
        <div id="region-detail-panel" class="lg:col-span-5 bg-white rounded-3xl border border-[#D49B42]/35 p-6 sm:p-8 shadow-xs space-y-6">
          ${renderRegionDetailContent(currentRegion)}
        </div>

      </div>

    </div>
  `;
}

function renderRegionDetailContent(region) {
  return `
    <div class="space-y-6">
      
      <!-- Region Image Banner -->
      <div class="relative rounded-2xl overflow-hidden aspect-16/9 bg-[#120B07]/10 border border-[#D49B42]/35 shadow-sm">
        <img src="${region.image}" 
             alt="${region.name}" 
             class="w-full h-full object-cover"
             onerror="this.onerror=null; this.src='/assets/images/regions/semarang.jpg';"/>
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
        <div class="absolute bottom-3.5 left-4 right-4 text-white">
          <span class="text-[10px] font-bold uppercase tracking-wider text-[#D49B42] bg-black/60 px-2.5 py-0.5 rounded-md border border-[#D49B42]/30">
            ${i18n?.getLanguage && i18n.getLanguage() === 'en' ? `${region.type} in Central Java` : `${region.type} di Jawa Tengah`}
          </span>
          <h2 class="font-editorial-serif text-2xl font-bold leading-tight mt-1 text-white">
            ${region.name}
          </h2>
        </div>
      </div>

      <!-- Tagline & Description -->
      <div class="space-y-2">
        <p class="font-editorial-serif italic text-base text-[#C84C24] font-semibold leading-snug">
          "${region.tagline}"
        </p>
        <p class="text-xs sm:text-sm text-[#5C3622] leading-relaxed">
          ${region.description}
        </p>
      </div>

      ${region.specialNote ? `
        <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/30 text-xs text-[#120B07] leading-relaxed flex items-start gap-2.5">
          <svg class="w-4 h-4 text-[#C84C24] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <span><strong>${t('map.regionNote')}</strong> ${region.specialNote}</span>
        </div>
      ` : ''}

      <!-- Cultural Identity -->
      <div class="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D49B42]/25 space-y-1">
        <span class="block text-[11px] font-bold uppercase tracking-wider text-[#120B07]">
          ${t('map.identity')}
        </span>
        <p class="text-xs text-[#5C3622] leading-relaxed">
          ${region.culturalIdentity}
        </p>
      </div>

      <!-- Culinary Tendencies -->
      <div class="space-y-2">
        <span class="block text-xs font-bold uppercase tracking-wider text-[#120B07]">
          ${t('map.flavorCharacteristics')}
        </span>
        <div class="flex flex-wrap gap-1.5">
          ${region.culinaryTendencies.map(tend => `
            <span class="px-3 py-1 rounded-xl text-xs bg-[#FAF7F2] text-[#120B07] font-semibold border border-[#D49B42]/35 shadow-2xs">
              ${tend}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Signature Dishes -->
      <div class="space-y-2">
        <span class="block text-xs font-bold uppercase tracking-wider text-[#120B07]">
          ${t('map.signatureDishes')}
        </span>
        <ul class="space-y-2 text-xs">
          ${region.signatureDishes.map(dish => `
            <li class="flex items-center justify-between py-1.5 border-b border-[#E8DEC8] text-[#120B07]">
              <span class="font-semibold">&bull; ${dish}</span>
              <a href="#/resep?search=${encodeURIComponent(dish)}" class="text-[#C84C24] hover:text-[#120B07] hover:underline font-bold text-[11px] transition-colors flex items-center gap-1">
                <span>${t('map.findRecipe')}</span>
                <span>&rarr;</span>
              </a>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Key Ingredients -->
      <div class="space-y-1.5">
        <span class="block text-xs font-bold uppercase tracking-wider text-[#120B07]">
          ${t('map.keyIngredients')}
        </span>
        <p class="text-xs text-[#5C3622] leading-relaxed">
          ${region.keyIngredients.join(', ')}
        </p>
      </div>

      <!-- CTA Action -->
      <div class="pt-2">
        <a href="#/resep?region=${region.id}" 
           class="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-full text-xs font-bold bg-[#120B07] hover:bg-[#C84C24] text-[#FAF7F2] transition-all shadow-md border border-[#D49B42]/40">
          <span>${t('map.viewAllRecipes', { region: region.name })}</span>
          <svg class="w-4 h-4 text-[#D49B42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

    </div>
  `;
}

export async function initFlavorMapInteractions() {
  const mapElement = document.getElementById('central-java-map');
  if (!mapElement) return;

  const regions = await regionService.getRegions();

  // Clean existing map instance if any
  if (mapInstance) {
    try {
      mapInstance.remove();
    } catch (_) {}
    mapInstance = null;
  }

  try {
    mapInstance = L.map('central-java-map', {
      center: [-7.15, 110.15],
      zoom: 8,
      minZoom: 7,
      maxZoom: 14,
      scrollWheelZoom: false
    });

    const primaryTiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    });
    
    primaryTiles.addTo(mapInstance);

    requestAnimationFrame(() => {
      mapInstance.invalidateSize();
    });

    // Custom Icon for Central Java Culinary Epicenters
    const createMarkerIcon = (isActive = false) => {
      return L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div class="w-7 h-7 rounded-full ${isActive ? 'bg-[#D49B42] scale-125' : 'bg-[#C84C24]'} border-2 border-white shadow-lg flex items-center justify-center text-white text-[11px] font-bold transition-all duration-300">
            <span>🍲</span>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -16]
      });
    };

    // Add Markers for Each Region
    regions.forEach(region => {
      if (region.coordinates && region.coordinates.lat && region.coordinates.lng) {
        const marker = L.marker([region.coordinates.lat, region.coordinates.lng], {
          icon: createMarkerIcon(region.id === activeRegionId)
        }).addTo(mapInstance);

        marker.bindPopup(`
          <div class="p-2 space-y-1.5 text-left min-w-[180px]">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#C84C24] block">${region.type}</span>
            <h4 class="font-bold text-sm text-[#120B07]">${region.name}</h4>
            <p class="text-[11px] text-[#5C3622] leading-tight">${region.tagline}</p>
            <div class="pt-1.5 border-t border-[#E8DEC8]">
              <a href="#/resep?region=${region.id}" class="text-[11px] font-bold text-[#C84C24] hover:underline flex items-center gap-1">
                <span>${t('map.findRecipe')}</span> &rarr;
              </a>
            </div>
          </div>
        `);

        marker.on('click', () => {
          selectRegion(region.id);
        });

        regionMarkers[region.id] = marker;
      }
    });

    // Wire Region Pill Buttons
    const pills = document.querySelectorAll('[data-region-pill]');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const rId = pill.getAttribute('data-region-pill');
        if (rId) selectRegion(rId);
      });
    });

    function selectRegion(id) {
      activeRegionId = id;
      const targetRegion = regions.find(r => r.id === id);
      if (!targetRegion) return;

      // Update pills
      pills.forEach(p => {
        const isCurrent = p.getAttribute('data-region-pill') === id;
        p.className = `region-pill px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
          isCurrent 
            ? 'bg-[#C84C24] text-white shadow-md ring-2 ring-[#D49B42]/50' 
            : 'bg-white/10 text-[#FAF7F2] border border-[#D49B42]/40 hover:bg-[#C84C24]/50 backdrop-blur-md'
        }`;
      });

      // Update detail panel
      const panel = document.getElementById('region-detail-panel');
      if (panel) {
        panel.innerHTML = renderRegionDetailContent(targetRegion);
      }

      // Fly map to coordinates
      if (targetRegion.coordinates && mapInstance) {
        mapInstance.flyTo([targetRegion.coordinates.lat, targetRegion.coordinates.lng], 10, {
          duration: 1.2
        });

        // Open popup
        const m = regionMarkers[id];
        if (m) m.openPopup();
      }
    }

  } catch (err) {
    console.error('Error initializing Leaflet map:', err);
  }
}
