import L from 'leaflet';
import { regionService } from '../services/regionService.js';
import { i18n, t } from '../i18n/index.js';

/**
 * Peta Rasa (Interactive Central Java Flavor Map)
 * Refined palette, GeoJSON district boundaries, and full bilingual support.
 */

let mapInstance = null;
let geoJsonLayer = null;
let activeRegionId = 'semarang';

export async function renderFlavorMapPage() {
  const regions = await regionService.getRegions();
  const currentRegion = regions.find(r => r.id === activeRegionId) || regions[0];

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#C49A58]/20">
        <div class="space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2E8D8] text-xs font-semibold text-[#B85C38] uppercase tracking-wider">
            <svg class="w-3.5 h-3.5 text-[#B85C38]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
              <line x1="9" x2="9" y1="3" y2="18"/>
              <line x1="15" x2="15" y1="6" y2="21"/>
            </svg>
            ${t('map.badge')}
          </div>
          <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-[#302018] tracking-tight">
            ${t('map.title')}
          </h1>
          <p class="text-sm sm:text-base text-[#654332] max-w-2xl leading-relaxed">
            ${t('map.desc')}
          </p>
        </div>

        <!-- Quick Region Selector Pills -->
        <div class="flex flex-wrap gap-1.5 max-w-md md:justify-end">
          ${regions.map(r => `
            <button type="button" 
                    data-region-pill="${r.id}"
                    class="region-pill px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      r.id === activeRegionId 
                        ? 'bg-[#B85C38] text-white shadow-sm' 
                        : 'bg-white text-[#302018] border border-[#C49A58]/30 hover:bg-[#F2E8D8]'
                    }">
              ${r.name.replace('Kota ', '').replace('Kabupaten ', '')}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Map & Detail Panel Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left: Interactive Leaflet Map -->
        <div class="lg:col-span-7 bg-white rounded-3xl border border-[#C49A58]/20 p-4 shadow-sm overflow-hidden flex flex-col">
          <!-- Map Title Bar -->
          <div class="px-3 py-2 flex items-center justify-between text-xs text-[#654332] border-b border-[#F2E8D8] mb-3">
            <span class="font-bold uppercase tracking-wider text-[#302018] flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#B85C38]"></span>
              ${t('map.mapTitle')}
            </span>
            <span class="text-[11px] italic text-[#654332]/80">${t('map.mapInstruction')}</span>
          </div>

          <!-- Leaflet Container -->
          <div id="central-java-map" class="w-full h-[460px] sm:h-[540px] rounded-2xl overflow-hidden z-10 bg-[#F2E8D8]/40"></div>

          <!-- Map Legend -->
          <div class="pt-4 px-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#654332]">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1.5">
                <span class="w-3.5 h-3.5 rounded-sm bg-[#B85C38]/40 border border-[#B85C38]"></span>
                ${t('map.legendRegion')}
              </span>
              <span class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded-full bg-[#B85C38] border border-white shadow-xs"></span>
                ${t('map.legendCenter')}
              </span>
            </div>
            <span class="italic text-[10px] text-[#654332]/70">${t('map.tileAttribution')}</span>
          </div>
        </div>

        <!-- Right: Region Culinary Profile Panel -->
        <div id="region-detail-panel" class="lg:col-span-5 bg-white rounded-3xl border border-[#C49A58]/20 p-6 sm:p-7 shadow-sm space-y-6">
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
      <div class="relative rounded-2xl overflow-hidden aspect-16/9 bg-[#302018]/10 border border-[#C49A58]/20">
        <img src="${region.image}" 
             alt="${region.name}" 
             class="w-full h-full object-cover"
             onerror="this.onerror=null; this.src='/assets/images/regions/semarang.jpg';"/>
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div class="absolute bottom-3 left-4 right-4 text-white">
          <span class="text-[10px] font-bold uppercase tracking-wider text-[#C49A58] bg-black/50 px-2 py-0.5 rounded-md">
            ${i18n?.getLanguage && i18n.getLanguage() === 'en' ? `${region.type} in Central Java` : `${region.type} di Jawa Tengah`}
          </span>
          <h2 class="font-editorial-serif text-2xl font-bold leading-tight mt-1 text-white">
            ${region.name}
          </h2>
        </div>
      </div>

      <!-- Tagline & Description -->
      <div class="space-y-2">
        <p class="font-editorial-serif italic text-base text-[#B85C38] font-semibold leading-snug">
          "${region.tagline}"
        </p>
        <p class="text-xs sm:text-sm text-[#654332] leading-relaxed">
          ${region.description}
        </p>
      </div>

      ${region.specialNote ? `
        <div class="p-3.5 rounded-xl bg-[#F2E8D8]/70 border border-[#C49A58]/30 text-xs text-[#302018] leading-relaxed flex items-start gap-2.5">
          <svg class="w-4 h-4 text-[#B85C38] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          <span><strong>${t('map.regionNote')}</strong> ${region.specialNote}</span>
        </div>
      ` : ''}

      <!-- Cultural Identity -->
      <div class="p-4 rounded-xl bg-[#FAF6EF] border border-[#C49A58]/20 space-y-1">
        <span class="block text-[11px] font-bold uppercase tracking-wider text-[#302018]">
          ${t('map.identity')}
        </span>
        <p class="text-xs text-[#654332] leading-relaxed">
          ${region.culturalIdentity}
        </p>
      </div>

      <!-- Culinary Tendencies -->
      <div class="space-y-2">
        <span class="block text-xs font-bold uppercase tracking-wider text-[#302018]">
          ${t('map.flavorCharacteristics')}
        </span>
        <div class="flex flex-wrap gap-1.5">
          ${region.culinaryTendencies.map(tend => `
            <span class="px-2.5 py-1 rounded-md text-xs bg-[#F2E8D8] text-[#302018] font-medium border border-[#C49A58]/30">
              ${tend}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Signature Dishes -->
      <div class="space-y-2">
        <span class="block text-xs font-bold uppercase tracking-wider text-[#302018]">
          ${t('map.signatureDishes')}
        </span>
        <ul class="space-y-1.5 text-xs">
          ${region.signatureDishes.map(dish => `
            <li class="flex items-center justify-between py-1.5 border-b border-[#F2E8D8] text-[#302018]">
              <span class="font-medium">&bull; ${dish}</span>
              <a href="#/resep?search=${encodeURIComponent(dish)}" class="text-[#B85C38] hover:text-[#302018] hover:underline font-bold text-[11px] transition-colors">
                ${t('map.findRecipe')} &rarr;
              </a>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Key Ingredients -->
      <div class="space-y-1.5">
        <span class="block text-xs font-bold uppercase tracking-wider text-[#302018]">
          ${t('map.keyIngredients')}
        </span>
        <p class="text-xs text-[#654332] leading-relaxed">
          ${region.keyIngredients.join(', ')}
        </p>
      </div>

      <!-- CTA Action -->
      <div class="pt-2">
        <a href="#/resep?region=${region.id}" 
           class="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-bold bg-[#302018] hover:bg-[#654332] text-[#FAF6EF] transition-all shadow-sm">
          <span>${t('map.viewAllRecipes', { region: region.name })}</span>
          <svg class="w-4 h-4 text-[#C49A58]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
    // Initialize Leaflet map centered on Central Java
    mapInstance = L.map('central-java-map', {
      center: [-7.15, 110.15],
      zoom: 8,
      minZoom: 7,
      maxZoom: 14,
      scrollWheelZoom: false
    });

    // Primary OpenStreetMap tile layer - 100% free, reliable, no API key required
    const primaryTiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
      maxZoom: 19
    });
    
    primaryTiles.on('tileerror', () => {
      if (!mapInstance._hasFallbackTiles) {
        mapInstance._hasFallbackTiles = true;
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors, Humanitarian OpenStreetMap Team',
          subdomains: 'abc',
          maxZoom: 19
        }).addTo(mapInstance);
      }
    });
    primaryTiles.addTo(mapInstance);

    // Invalidate size after layout settles to guarantee tile visibility
    requestAnimationFrame(() => {
      if (mapInstance) mapInstance.invalidateSize();
    });
    setTimeout(() => {
      if (mapInstance) mapInstance.invalidateSize();
    }, 200);
    setTimeout(() => {
      if (mapInstance) mapInstance.invalidateSize();
    }, 500);

  // Load Central Java GeoJSON
  try {
    const geoData = await regionService.getGeoJson();

    function styleFeature(feature) {
      const isSelected = feature.properties.id === activeRegionId;
      return {
        fillColor: feature.properties.color || '#B85C38',
        weight: isSelected ? 3 : 1.5,
        opacity: 1,
        color: isSelected ? '#302018' : '#B85C38',
        dashArray: isSelected ? '' : '3',
        fillOpacity: isSelected ? 0.65 : 0.35
      };
    }

    function highlightFeature(e) {
      const layer = e.target;
      layer.setStyle({
        weight: 3,
        color: '#302018',
        dashArray: '',
        fillOpacity: 0.7
      });
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }

    function resetHighlight(e) {
      if (geoJsonLayer) {
        geoJsonLayer.resetStyle(e.target);
      }
    }

    function selectRegion(regionId) {
      activeRegionId = regionId;
      const reg = regions.find(r => r.id === regionId);
      if (reg) {
        // Update Side Panel
        const panel = document.getElementById('region-detail-panel');
        if (panel) {
          panel.innerHTML = renderRegionDetailContent(reg);
        }

        // Update pills
        document.querySelectorAll('.region-pill').forEach(btn => {
          const pillId = btn.getAttribute('data-region-pill');
          if (pillId === regionId) {
            btn.className = 'region-pill px-3 py-1.5 rounded-full text-xs font-semibold transition-all bg-[#B85C38] text-white shadow-sm';
          } else {
            btn.className = 'region-pill px-3 py-1.5 rounded-full text-xs font-semibold transition-all bg-white text-[#302018] border border-[#C49A58]/30 hover:bg-[#F2E8D8]';
          }
        });

        // Re-style geojson
        if (geoJsonLayer) {
          geoJsonLayer.eachLayer(l => {
            geoJsonLayer.resetStyle(l);
          });
        }

        // Pan map gently
        mapInstance.panTo([reg.lat, reg.lng], { animate: true, duration: 0.8 });
      }
    }

    geoJsonLayer = L.geoJSON(geoData, {
      style: styleFeature,
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: () => selectRegion(feature.properties.id)
        });

        // Rich Tooltip
        layer.bindTooltip(`
          <div class="text-xs font-sans">
            <strong class="text-[#302018]">${feature.properties.name}</strong><br/>
            <span class="text-[#B85C38] font-medium">${feature.properties.flavorProfile}</span>
          </div>
        `, { sticky: true, className: 'leaflet-tooltip-laras' });
      }
    }).addTo(mapInstance);

    // Add Custom City Center Pins with refined terracotta styling
    regions.forEach(reg => {
      const pinIcon = L.divIcon({
        className: 'custom-city-pin',
        html: `
          <div style="background-color: #B85C38; border: 2px solid #FAF6EF; color: #FAF6EF; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
            ●
          </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      const marker = L.marker([reg.lat, reg.lng], { icon: pinIcon }).addTo(mapInstance);
      marker.on('click', () => selectRegion(reg.id));
      marker.bindPopup(`
        <div class="p-1 text-center font-sans">
          <strong class="text-sm font-bold text-[#302018] font-editorial-serif">${reg.name}</strong>
          <p class="text-xs text-[#B85C38] font-semibold mt-0.5">${reg.signatureDishes.slice(0, 2).join(', ')}</p>
        </div>
      `);
    });

  } catch (err) {
    console.error('Gagal menginisialisasi GeoJSON:', err);
  }
} catch (mapErr) {
  console.warn('Leaflet map initialization warning:', mapErr);
  if (mapElement) {
    mapElement.innerHTML = `
      <div class="h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#FAF6EF]">
        <span class="w-12 h-12 rounded-full bg-[#F2E8D8] text-[#B85C38] flex items-center justify-center text-xl">🗺</span>
        <h4 class="font-editorial-serif text-lg font-bold text-[#302018]">${t('map.fallbackTitle')}</h4>
        <p class="text-xs text-[#654332] max-w-sm leading-relaxed">${t('map.fallbackDesc')}</p>
      </div>
    `;
  }
}

  // Bind Quick Region Pills
  document.querySelectorAll('.region-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const regId = btn.getAttribute('data-region-pill');
      if (regId) {
        activeRegionId = regId;
        const reg = regions.find(r => r.id === regId);
        if (reg) {
          const panel = document.getElementById('region-detail-panel');
          if (panel) panel.innerHTML = renderRegionDetailContent(reg);

          document.querySelectorAll('.region-pill').forEach(b => {
            b.className = 'region-pill px-3 py-1.5 rounded-full text-xs font-semibold transition-all bg-white text-[#302018] border border-[#C49A58]/30 hover:bg-[#F2E8D8]';
          });
          btn.className = 'region-pill px-3 py-1.5 rounded-full text-xs font-semibold transition-all bg-[#B85C38] text-white shadow-sm';

          if (mapInstance && typeof mapInstance.flyTo === 'function') {
            mapInstance.flyTo([reg.lat, reg.lng], 11, { duration: 1.2 });
          }
        }
      }
    });
  });
}
