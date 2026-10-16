import { restaurants } from '../data/restaurants.js';
import { restaurantTranslationsEn } from '../data/translations-en.js';
import { i18n } from '../i18n/index.js';
import { API_CONFIG, apiRequest } from './api.js';

export function localizeRestaurant(restaurant) {
  if (!restaurant) return restaurant;
  const lang = i18n?.getLanguage ? i18n.getLanguage() : 'id';
  if (lang !== 'en') return { ...restaurant };

  const trans = restaurantTranslationsEn[restaurant.id];
  if (!trans) return { ...restaurant };

  return {
    ...restaurant,
    signatureDish: trans.signatureDish || restaurant.signatureDish,
    category: trans.category || restaurant.category,
    openingHours: trans.openingHours || restaurant.openingHours,
    description: trans.description || restaurant.description,
    historicalContext: trans.historicalContext || restaurant.historicalContext,
    specialties: trans.specialties || restaurant.specialties,
  };
}

export const restaurantService = {
  /**
   * Mengambil daftar restoran legendaris terverifikasi dengan filter.
   * Disiapkan untuk memanggil GET /api/restaurants jika mode Laravel aktif.
   */
  async getRestaurants(params = {}) {
    if (!API_CONFIG.useMock) {
      try {
        const queryString = new URLSearchParams(params).toString();
        const response = await apiRequest(`/restaurants${queryString ? `?${queryString}` : ''}`);
        return (response.data || []).map(localizeRestaurant);
      } catch (err) {
        console.warn('Gagal memuat restoran dari Laravel API, beralih ke data lokal:', err);
      }
    }

    let result = restaurants.map(localizeRestaurant);

    // Filter kota / wilayah
    if (params.city && params.city !== 'semua') {
      result = result.filter(r => r.city.toLowerCase().includes(params.city.toLowerCase()) || r.regionId === params.city);
    }

    // Filter kategori
    if (params.category && params.category !== 'semua') {
      result = result.filter(r => r.category.toLowerCase().includes(params.category.toLowerCase()));
    }

    // Filter pencarian teks
    if (params.search && params.search.trim()) {
      const q = params.search.toLowerCase().trim();
      result = result.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.signatureDish.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    }

    return result;
  },

  /**
   * Mengambil detail restoran berdasarkan ID unik.
   */
  async getRestaurantById(id) {
    if (!API_CONFIG.useMock) {
      try {
        const response = await apiRequest(`/restaurants/${id}`);
        return localizeRestaurant(response.data);
      } catch (err) {
        console.warn(`Gagal memuat restoran ${id} dari Laravel API:`, err);
      }
    }

    const restaurant = restaurants.find(r => r.id === id);
    if (!restaurant) {
      throw new Error(`Restoran dengan ID "${id}" tidak ditemukan.`);
    }
    return localizeRestaurant(restaurant);
  },

  /**
   * Mengambil restoran unggulan untuk ditampilkan di beranda.
   */
  async getFeaturedRestaurants(limit = 3) {
    const all = await this.getRestaurants();
    return all.slice(0, limit);
  }
};

