import { restaurants } from '../data/restaurants.js';
import { regions } from '../data/regions.js';
import { localizeRegion } from './regionService.js';
import { restaurantTranslationsEn } from '../data/translations-en.js';
import { i18n } from '../i18n/index.js';
import { API_CONFIG, apiRequest } from './api.js';

export function localizeRestaurant(restaurant) {
  if (!restaurant) return restaurant;
  const lang = i18n?.getLanguage ? i18n.getLanguage() : 'id';
  const region = regions.find(r => r.id === restaurant.regionId);
  const localizedCity = (lang === 'en' && region) ? localizeRegion(region).name : restaurant.city;

  if (lang !== 'en') return { ...restaurant, city: localizedCity };

  const trans = restaurantTranslationsEn[restaurant.id];
  if (!trans) return { ...restaurant, city: localizedCity };

  return {
    ...restaurant,
    city: localizedCity,
    description: trans.description || restaurant.description,
  };
}

export const restaurantService = {
  /**
   * Retrieves list of legendary restaurants with filters.
   */
  async getRestaurants(params = {}) {
    if (!API_CONFIG.useMock) {
      try {
        const queryString = new URLSearchParams(params).toString();
        const response = await apiRequest(`/restaurants${queryString ? `?${queryString}` : ''}`);
        return (response.data || []).map(localizeRestaurant);
      } catch (err) {
        console.warn('Failed to load restaurants from Laravel API, falling back to local data:', err);
      }
    }

    let result = restaurants.map(localizeRestaurant);

    // Filter by city / region
    if (params.city && params.city !== 'semua') {
      result = result.filter(r => r.city.toLowerCase().includes(params.city.toLowerCase()) || r.regionId === params.city);
    }

    // Text search filter: restaurant name or description content
    if (params.search && params.search.trim()) {
      const q = params.search.toLowerCase().trim();
      result = result.filter(r => 
        r.name.toLowerCase().includes(q) || 
        (r.description && r.description.toLowerCase().includes(q))
      );
    }

    return result;
  },

  /**
   * Retrieves restaurant details by unique ID.
   */
  async getRestaurantById(id) {
    if (!API_CONFIG.useMock) {
      try {
        const response = await apiRequest(`/restaurants/${id}`);
        return localizeRestaurant(response.data);
      } catch (err) {
        console.warn(`Failed to load restaurant ${id} from Laravel API:`, err);
      }
    }

    const restaurant = restaurants.find(r => r.id === id);
    if (!restaurant) {
      throw new Error(`Restaurant with ID "${id}" not found.`);
    }
    return localizeRestaurant(restaurant);
  },

  /**
   * Retrieves featured restaurants to display on home page.
   */
  async getFeaturedRestaurants(limit = 3) {
    const all = await this.getRestaurants();
    return all.slice(0, limit);
  }
};
