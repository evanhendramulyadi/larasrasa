import { regions } from '../data/regions.js';
import { regionTranslationsEn, regionNameTranslationsEn } from '../data/translations-en.js';
import { i18n } from '../i18n/index.js';
import { API_CONFIG, apiRequest } from './api.js';

export function localizeRegion(region) {
  if (!region) return region;
  const lang = i18n?.getLanguage ? i18n.getLanguage() : 'id';
  if (lang !== 'en') return { ...region };

  const trans = regionTranslationsEn[region.id];
  const enName = trans?.name || regionNameTranslationsEn?.[region.name] || region.name;
  const enType = trans?.type || (region.type === 'Kota' ? 'City' : (region.type === 'Kabupaten' ? 'Regency' : region.type));

  return {
    ...region,
    name: enName,
    type: enType,
    tagline: trans?.tagline || region.tagline,
    description: trans?.description || region.description,
    culturalIdentity: trans?.culturalIdentity || region.culturalIdentity,
    culinaryTendencies: trans?.culinaryTendencies || region.culinaryTendencies,
    keyIngredients: trans?.keyIngredients || region.keyIngredients,
  };
}

export const regionService = {
  /**
   * Retrieves list of Central Java regions and their culinary identities.
   */
  async getRegions() {
    if (!API_CONFIG.useMock) {
      try {
        const response = await apiRequest('/regions');
        return (response.data || []).map(localizeRegion);
      } catch (err) {
        console.warn('Gagal memuat wilayah dari Laravel API, beralih ke data lokal:', err);
      }
    }
    return regions.map(localizeRegion);
  },

  /**
   * Retrieves a single region by ID.
   */
  async getRegionById(id) {
    if (!API_CONFIG.useMock) {
      try {
        const response = await apiRequest(`/regions/${id}`);
        return localizeRegion(response.data);
      } catch (err) {
        console.warn(`Gagal memuat wilayah ${id}:`, err);
      }
    }

    const region = regions.find(r => r.id === id);
    if (!region) {
      throw new Error(`Wilayah "${id}" tidak ditemukan.`);
    }
    return localizeRegion(region);
  },

  /**
   * Retrieves GeoJSON boundary data for Central Java interactive Leaflet map.
   */
  async getGeoJson() {
    try {
      const response = await fetch('/assets/geo/central-java.json');
      if (!response.ok) {
        throw new Error('Gagal memuat file GeoJSON Jawa Tengah');
      }
      return await response.json();
    } catch (err) {
      console.error('Error loading GeoJSON:', err);
      throw err;
    }
  }
};

