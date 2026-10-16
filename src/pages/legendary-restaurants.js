import L from 'leaflet';
import { restaurantService } from '../services/restaurantService.js';
import { renderRestaurantCard } from '../components/restaurant-card.js';
import { t } from '../i18n/index.js';

/**
 * Restoran Legendaris (Verified Historic Culinary Destinations & Real Map)
 * Refined palette, Leaflet real coordinates, and i18n support.
 */

let rMapInstance = null;
let rMarkers = [];
let currentFilter = {
  city: 'semua',
  category: 'semua',
  search: ''
};

export async function renderLegendaryRestaurantsPage() {
  const restaurantsList = await restaurantService.getRestaurants(currentFilter);

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <!-- Page Header -->
      <div class="space-y-3 pb-6 border-b border-[#C49A58]/20">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2E8D8] text-xs font-semibold text-[#B85C38] uppercase tracking-wider">
          <svg class="w-3.5 h-3.5 text-[#B85C38]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          ${t('restaurantsSection.badge')}
        </div>
        <h1 class="font-editorial-serif text-3xl sm:text-5xl font-bold text-[#302018] tracking-tight">
          ${t('restaurantsSection.title')}
        </h1>
        <p class="text-sm sm:text-base text-[#654332] max-w-2xl leading-relaxed">
          ${t('restaurantsSection.description')}
        </p>
      </div>

      <!-- Real Geographic Map Container -->
      <div class="bg-white p-4 rounded-3xl border border-[#C49A58]/20 shadow-sm space-y-3">
        <div class="px-2 py-1 flex items-center justify-between text-xs text-[#654332] border-b border-[#F2E8D8] pb-2">
          <span class="font-bold text-[#302018] flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#B85C38]"></span>
            ${t('restaurantsSection.mapTitle')}
          </span>
          <span class="text-[11px] italic text-[#654332]/80">${t('restaurantsSection.mapHint')}</span>
        </div>
        
        <div id="restaurants-real-map" class="w-full h-80 sm:h-[420px] rounded-2xl overflow-hidden bg-[#F2E8D8]/40 z-10"></div>
      </div>

      <!-- Search & Filters -->
      <div class="bg-white p-5 rounded-2xl border border-[#C49A58]/20 shadow-xs flex flex-col md:flex-row items-center gap-4">
        <!-- Search -->
        <div class="relative flex-1 w-full">
          <input type="text" 
                 id="restaurant-search-input" 
                 value="${currentFilter.search}"
                 placeholder="${t('restaurantsSection.searchPlaceholder')}" 
                 class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#C49A58]/30 bg-[#FAF6EF] text-xs text-[#302018] placeholder-[#654332]/50 focus:outline-hidden focus:ring-2 focus:ring-[#B85C38]"/>
          <svg class="w-4 h-4 text-[#654332] absolute left-3.5 top-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
        </div>

        <!-- City Dropdown -->
        <div class="w-full md:w-auto flex items-center gap-2">
          <label class="text-xs font-bold uppercase tracking-wider text-[#654332] shrink-0">${t('restaurantsSection.cityFilter')}</label>
          <select id="restaurant-city-select" class="w-full md:w-auto py-2.5 px-3.5 rounded-xl border border-[#C49A58]/30 bg-[#FAF6EF] text-xs text-[#302018] focus:outline-hidden focus:ring-2 focus:ring-[#B85C38]">
            <option value="semua">${t('restaurantsSection.allCities')}</option>
            <option value="Semarang" ${currentFilter.city === 'Semarang' ? 'selected' : ''}>Semarang</option>
            <option value="Surakarta" ${currentFilter.city === 'Surakarta' ? 'selected' : ''}>Surakarta (Solo)</option>
            <option value="Kudus" ${currentFilter.city === 'Kudus' ? 'selected' : ''}>Kudus</option>
            <option value="Banyumas" ${currentFilter.city === 'Banyumas' ? 'selected' : ''}>Banyumas (Purwokerto)</option>
            <option value="Pekalongan" ${currentFilter.city === 'Pekalongan' ? 'selected' : ''}>Pekalongan</option>
            <option value="Magelang" ${currentFilter.city === 'Magelang' ? 'selected' : ''}>Magelang</option>
          </select>
        </div>

        <!-- Reset Button -->
        <button id="restaurant-reset-btn" type="button" class="shrink-0 text-xs font-bold text-[#B85C38] hover:text-[#302018] underline transition-colors">
          ${t('common.reset')}
        </button>
      </div>

      <!-- Directory Grid -->
      <div id="restaurants-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${restaurantsList.map(r => renderRestaurantCard(r)).join('')}
      </div>

      <!-- Verifiable Sources Box -->
      <div class="p-6 rounded-2xl bg-[#F2E8D8]/70 border border-[#C49A58]/30 space-y-2 text-xs text-[#654332]">
        <h4 class="font-bold text-[#302018] uppercase tracking-wider flex items-center gap-2">
          <svg class="w-4 h-4 text-[#B85C38]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          ${t('restaurantsSection.integrityTitle')}
        </h4>
        <p class="leading-relaxed">
          ${t('restaurantsSection.integrityText')}
        </p>
      </div>

    </div>
  `;
}

export async function initLegendaryRestaurantsInteractions() {
  const mapEl = document.getElementById('restaurants-real-map');
  if (!mapEl) return;

  if (rMapInstance) {
    rMapInstance.remove();
    rMapInstance = null;
  }

  try {
    // Initialize Map centered on Central Java
    rMapInstance = L.map('restaurants-real-map', {
      center: [-7.25, 110.2],
      zoom: 8,
      minZoom: 7,
      maxZoom: 16,
      scrollWheelZoom: false
    });

    const primaryTiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
      maxZoom: 19
    });

    primaryTiles.on('tileerror', () => {
      if (!rMapInstance._hasFallbackTiles) {
        rMapInstance._hasFallbackTiles = true;
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors, Humanitarian OpenStreetMap Team',
          subdomains: 'abc',
          maxZoom: 19
        }).addTo(rMapInstance);
      }
    });
    primaryTiles.addTo(rMapInstance);

    requestAnimationFrame(() => {
      if (rMapInstance) rMapInstance.invalidateSize();
    });
    setTimeout(() => {
      if (rMapInstance) rMapInstance.invalidateSize();
    }, 200);
    setTimeout(() => {
      if (rMapInstance) rMapInstance.invalidateSize();
    }, 500);

  const restaurants = await restaurantService.getRestaurants();

  // Populate Markers
  rMarkers = [];
  restaurants.forEach(rest => {
    const pin = L.divIcon({
      className: 'rest-map-pin',
      html: `
        <div style="background-color: #B85C38; border: 2px solid #FAF6EF; color: #FAF6EF; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; box-shadow: 0 4px 10px rgba(0,0,0,0.25);">
          🍴
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const marker = L.marker([rest.coordinates.lat, rest.coordinates.lng], { icon: pin }).addTo(rMapInstance);
    
    marker.bindPopup(`
      <div class="p-2 max-w-[220px] font-sans">
        <span class="text-[10px] uppercase font-bold text-[#B85C38]">Est. ${rest.yearEstablished} &bull; ${rest.city}</span>
        <h4 class="font-editorial-serif text-sm font-bold text-[#302018] leading-tight my-1">${rest.name}</h4>
        <p class="text-[11px] text-[#654332] line-clamp-2">${rest.signatureDish}</p>
        <div class="mt-2 pt-2 border-t border-[#F2E8D8] flex justify-between items-center text-[10px]">
          <span class="text-[#654332]">${rest.openingHours}</span>
          <a href="${rest.googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="font-bold text-[#B85C38] hover:text-[#302018] hover:underline">Rute &rarr;</a>
        </div>
      </div>
    `);

    rMarkers.push({ id: rest.id, marker });
  });
  } catch (mapErr) {
    console.warn('Restaurant map initialization warning:', mapErr);
    if (mapEl) {
      mapEl.innerHTML = `
        <div class="h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-[#FAF6EF]">
          <span class="w-12 h-12 rounded-full bg-[#F2E8D8] text-[#B85C38] flex items-center justify-center text-xl">🗺</span>
          <h4 class="font-editorial-serif text-lg font-bold text-[#302018]">Peta Lokasi Tersedia</h4>
          <p class="text-xs text-[#654332] max-w-sm leading-relaxed">Daftar warung dan restoran legendaris tetap dapat dieksplorasi secara lengkap melalui kartu di bawah.</p>
        </div>
      `;
    }
  }

  // Filter Bindings
  const searchInput = document.getElementById('restaurant-search-input');
  const citySelect = document.getElementById('restaurant-city-select');
  const resetBtn = document.getElementById('restaurant-reset-btn');

  async function updateList() {
    const list = await restaurantService.getRestaurants(currentFilter);
    const grid = document.getElementById('restaurants-grid');
    if (grid) {
      grid.innerHTML = list.map(r => renderRestaurantCard(r)).join('');
    }
  }

  if (searchInput) {
    let tSearch;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(tSearch);
      tSearch = setTimeout(() => {
        currentFilter.search = e.target.value;
        updateList();
      }, 250);
    });
  }

  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      currentFilter.city = e.target.value;
      updateList();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentFilter = { city: 'semua', category: 'semua', search: '' };
      if (searchInput) searchInput.value = '';
      if (citySelect) citySelect.value = 'semua';
      updateList();
    });
  }
}
