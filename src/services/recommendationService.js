import { recipes } from '../data/recipes.js';
import { API_CONFIG, apiRequest } from './api.js';

/**
 * Recommendation Service
 * 
 * Sistem kurasi rekomendasi kuliner Jawa Tengah berbasis selera dan eksplorasi budaya.
 * Menghubungkan preferensi cita rasa, tipe santapan, dan kawasan budaya
 * untuk memperkenalkan hidangan tradisional autentik paling selaras (standar porsi 4 orang).
 */

export const recommendationService = {
  /**
   * Mengirim preferensi pengguna dan menerima rekomendasi kuliner terstruktur.
   * 
   * @param {Object} preferences Preferensi selera: { flavor, dishType, regionPreference }
   * @returns {Promise<Object>} Objek rekomendasi utama, narasi budaya, dan alternatif hidangan
   */
  async getRecommendations(preferences) {
    if (!API_CONFIG.useMock) {
      try {
        const response = await apiRequest('/recommendations', {
          method: 'POST',
          body: JSON.stringify({ preferences })
        });
        return response.data;
      } catch (err) {
        console.warn('Gagal memproses rekomendasi via API, beralih ke kurasi lokal:', err);
      }
    }

    // Simulasi jeda kurasi wajar (400ms)
    await new Promise(resolve => setTimeout(resolve, 400));

    // Validasi input preferensi
    if (!preferences || !preferences.flavor) {
      throw new Error('Preferensi cita rasa wajib dipilih untuk menemukan rekomendasi kuliner.');
    }

    // Engine Penilaian Keselarasan Kuliner Budaya Jawa Tengah
    const scoredRecipes = recipes.map(recipe => {
      let score = 0;
      const matchReasons = [];

      // 1. Keselarasan Karakter Cita Rasa (Bobot utama: 45 poin)
      if (recipe.flavorProfiles && recipe.flavorProfiles.includes(preferences.flavor)) {
        score += 45;
        matchReasons.push(`Menghadirkan karakter rasa ${preferences.flavor} autentik yang Anda dambakan`);
      } else {
        score += 15;
      }

      // 2. Keselarasan Tipe Santapan & Pengalaman Menikmati (Bobot: 30 poin)
      if (preferences.dishType) {
        const textToSearch = (recipe.name + ' ' + (recipe.mealType || '') + ' ' + (recipe.intro || '')).toLowerCase();
        if (preferences.dishType === 'kuah-segar') {
          if (textToSearch.includes('soto') || textToSearch.includes('sup') || textToSearch.includes('asem') || textToSearch.includes('segar') || textToSearch.includes('selat') || textToSearch.includes('tauto') || textToSearch.includes('sroto')) {
            score += 30;
            matchReasons.push('Sajian berkuah segar kaya rempah yang melegakan dan menenangkan');
          } else {
            score += 10;
          }
        } else if (preferences.dishType === 'kuah-santan') {
          if (textToSearch.includes('santan') || textToSearch.includes('gudeg') || textToSearch.includes('opor') || textToSearch.includes('mangut') || textToSearch.includes('gandul') || textToSearch.includes('liwet') || textToSearch.includes('glabed')) {
            score += 30;
            matchReasons.push('Kuah santan gurih lembut yang meresap sarat kehangatan dapur leluhur');
          } else {
            score += 10;
          }
        } else if (preferences.dishType === 'kering-bakar') {
          if (textToSearch.includes('sate') || textToSearch.includes('bakar') || textToSearch.includes('bacem') || textToSearch.includes('panggang') || textToSearch.includes('tengkleng')) {
            score += 30;
            matchReasons.push('Olahan bakar & ungkep beraroma sedap dengan karamelisasi bumbu khas');
          } else {
            score += 10;
          }
        } else if (preferences.dishType === 'kudapan-lauk') {
          if (textToSearch.includes('mendoan') || textToSearch.includes('tahu') || textToSearch.includes('tempe') || textToSearch.includes('camilan') || textToSearch.includes('kudapan') || textToSearch.includes('getuk') || textToSearch.includes('serabi') || textToSearch.includes('wingko') || textToSearch.includes('lumpia')) {
            score += 30;
            matchReasons.push('Kudapan pusaka legendaris yang renyah dan nikmat disantap santai');
          } else {
            score += 10;
          }
        }
      }

      // 3. Keselarasan Eksplorasi Kawasan Budaya (Bobot: 25 poin)
      const regId = (recipe.regionId || '').toLowerCase();
      if (preferences.regionPreference === 'keraton') {
        if (regId.includes('surakarta') || regId.includes('solo')) {
          score += 25;
          matchReasons.push(`Mencerminkan warisan kuliner Keraton Surakarta (${recipe.regionName}) yang kaya tata krama rasa`);
        } else {
          score += 12;
        }
      } else if (preferences.regionPreference === 'pantura') {
        if (regId.includes('semarang') || regId.includes('pekalongan') || regId.includes('tegal') || regId.includes('kudus')) {
          score += 25;
          matchReasons.push(`Mewakili dinamika bumbu pesisir Pantura Jawa Tengah (${recipe.regionName})`);
        } else {
          score += 12;
        }
      } else if (preferences.regionPreference === 'pegunungan') {
        if (regId.includes('wonosobo') || regId.includes('magelang') || regId.includes('banyumas')) {
          score += 25;
          matchReasons.push(`Menghadirkan kehangatan rempah bumi pegunungan dan lembah (${recipe.regionName})`);
        } else {
          score += 12;
        }
      } else {
        // Semua Sentra Jawa Tengah
        score += 25;
        matchReasons.push(`Pusaka kuliner unggulan dari khasanah sentra ${recipe.regionName}`);
      }

      return {
        recipe,
        score,
        matchReasons
      };
    });

    // Urutkan berdasarkan skor keselarasan tertinggi
    scoredRecipes.sort((a, b) => b.score - a.score);

    const topPick = scoredRecipes[0]?.recipe || recipes[0];
    const topReasons = scoredRecipes[0]?.matchReasons || [
      'Pilihan hidangan tradisional Jawa Tengah yang selaras dengan selera Anda',
      'Memiliki kekayaan sejarah dan filosofi dapur yang mendalam',
      'Dilengkapi panduan takaran bumbu standar untuk 4 orang keluarga'
    ];
    const alternatives = scoredRecipes.slice(1, 4).map(sr => sr.recipe);

    // Pembuatan narasi kurasi yang elegan bernuansa budaya (tanpa AI slop)
    const rationaleNarrative = this._generateNarrative(topPick, preferences);

    return {
      primary: topPick,
      primaryRecommendation: topPick,
      matchScore: Math.min(Math.max(scoredRecipes[0]?.score || 80, 80), 98),
      rationale: rationaleNarrative,
      matchHighlights: topReasons,
      suggestedServings: 4,
      alternatives: alternatives,
      timestamp: new Date().toISOString()
    };
  },

  async getRecommendation(preferences) {
    return this.getRecommendations(preferences);
  },

  /**
   * Menghasilkan narasi apresiasi budaya dan kurasi selera kuliner Jawa Tengah.
   */
  _generateNarrative(recipe, preferences) {
    const flavorText = preferences.flavor ? `cita rasa ${preferences.flavor}` : 'kehangatan rasa tradisional';

    return `Berdasarkan selera yang Anda pilih, **${recipe.name}** adalah hidangan khas ${recipe.regionName} yang paling selaras untuk dinikmati hari ini. Kuliner ini menonjolkan harmoni ${flavorText} berpadu dengan rempah autentik leluhur. Selain memiliki cerita sejarah yang panjang dalam kebudayaan Jawa Tengah, resep ini juga telah terkalibrasi dengan takaran bahan yang pas untuk santap 4 orang keluarga.`;
  }
};

