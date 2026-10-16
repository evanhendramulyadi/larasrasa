import { regions } from '../data/regions.js';
import { regionTranslationsEn } from '../data/translations-en.js';
import { i18n } from '../i18n/index.js';
import { API_CONFIG, apiRequest } from './api.js';

export function localizeRegion(region) {
  if (!region) return region;
  const lang = i18n?.getLanguage ? i18n.getLanguage() : 'id';
  if (lang !== 'en') return { ...region };

  const trans = regionTranslationsEn[region.id];
  if (!trans) return { ...region };

  return {
    ...region,
    tagline: trans.tagline || region.tagline,
    description: trans.description || region.description,
    culturalIdentity: trans.culturalIdentity || region.culturalIdentity,
    culinaryTendencies: trans.culinaryTendencies || region.culinaryTendencies,
  };
}

export const regionService = {
  /**
   * Mengambil daftar wilayah Jawa Tengah beserta identitas kulinernya.
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
   * Mengambil satu wilayah berdasarkan ID.
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
   * Mengambil data GeoJSON batas geografis Jawa Tengah untuk peta interaktif Leaflet.
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

