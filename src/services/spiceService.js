import { spices } from '../data/spices.js';
import { spiceTranslationsEn } from '../data/translations-en.js';
import { i18n } from '../i18n/index.js';
import { API_CONFIG, apiRequest } from './api.js';

/**
 * Localize a single spice entity if English is active.
 */
export function localizeSpice(spice) {
  if (!spice) return spice;
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
  if (!isEn) return { ...spice };

  const enTrans = spiceTranslationsEn[spice.id];
  if (!enTrans) return { ...spice };

  return {
    ...spice,
    name: enTrans.name || spice.name,
    categoryName: enTrans.categoryName || spice.categoryName,
    role: enTrans.role || spice.role,
    aromaProfile: enTrans.aromaProfile || spice.aromaProfile,
    flavorNote: enTrans.flavorNote || spice.flavorNote,
    preparationMethod: enTrans.preparationMethod || spice.preparationMethod,
    culturalWisdom: enTrans.culturalWisdom || spice.culturalWisdom,
    substitutes: enTrans.substitutes || spice.substitutes
  };
}

export const spiceService = {
  /**
   * Mengambil daftar rempah & bumbu aromatik khas Jawa Tengah.
   */
  async getSpices(category = 'semua') {
    if (!API_CONFIG.useMock) {
      try {
        const query = category !== 'semua' ? `?category=${category}` : '';
        const response = await apiRequest(`/spices${query}`);
        if (response?.data) {
          return response.data.map(localizeSpice);
        }
      } catch (err) {
        console.warn('Gagal memuat rempah dari Laravel API, beralih ke data lokal:', err);
      }
    }

    const baseList = category === 'semua' 
      ? spices 
      : spices.filter(s => s.category === category);

    return baseList.map(localizeSpice);
  },

  /**
   * Mengambil satu rempah berdasarkan ID.
   */
  async getSpiceById(id) {
    const spice = spices.find(s => s.id === id);
    if (!spice) {
      throw new Error(`Rempah dengan ID "${id}" tidak ditemukan.`);
    }
    return localizeSpice(spice);
  },

  /**
   * Pencarian rempah berdasarkan nama, aroma, atau masakan terkait.
   */
  async searchSpices(query = '') {
    const localized = spices.map(localizeSpice);
    if (!query.trim()) return localized;
    const q = query.toLowerCase().trim();
    return localized.filter(s =>
      s.name.toLowerCase().includes(q) ||
      (s.latinName && s.latinName.toLowerCase().includes(q)) ||
      (s.role && s.role.toLowerCase().includes(q)) ||
      (s.aromaProfile && s.aromaProfile.toLowerCase().includes(q)) ||
      (s.iconicDishes && s.iconicDishes.some(d => d.toLowerCase().includes(q)))
    );
  }
};
