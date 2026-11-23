import { recipes } from '../data/recipes.js';
import { API_CONFIG, apiRequest } from './api.js';
import { i18n } from '../i18n/index.js';
import { regionTranslationsEn } from '../data/translations-en.js';
import { flavorProfiles } from '../data/flavorProfiles.js';

/**
 * Recommendation Service
 * 
 * Central Javanese culinary curation system based on palate preferences and cultural exploration.
 * Matches flavor profiles, meal types, and regional heritages
 * to introduce authentic traditional dishes (calibrated standard 4 servings).
 */

export const recommendationService = {
  /**
   * Submits user preferences and returns structured culinary recommendations.
   * 
   * @param {Object} preferences Flavor preferences: { flavor, dishType, regionPreference }
   * @returns {Promise<Object>} Recommendation object with primary pick, cultural narrative, and alternatives
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

    const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
    const flavorObj = flavorProfiles.find(f => f.id === preferences.flavor);
    const flavorLabel = isEn ? (flavorObj?.nameEn || preferences.flavor) : (flavorObj?.name || preferences.flavor);

    // Engine Penilaian Keselarasan Kuliner Budaya Jawa Tengah
    const scoredRecipes = recipes.map(recipe => {
      let score = 0;
      const matchReasons = [];
      const regName = (isEn && regionTranslationsEn?.[recipe.regionId]?.name) || recipe.regionName;

      // 1. Keselarasan Karakter Cita Rasa (Bobot utama: 40 poin)
      const flavors = recipe.flavorProfiles || [];
      if (flavors.length > 0 && flavors[0] === preferences.flavor) {
        score += 40;
        matchReasons.push(isEn
          ? `Primary ${flavorLabel} flavor character is prominently and authentically expressed`
          : `Karakter rasa utama ${flavorLabel} sangat dominan dan autentik`);
      } else if (flavors.includes(preferences.flavor)) {
        score += 35;
        matchReasons.push(isEn
          ? `Features a harmonious nuance of ${flavorLabel} flavor`
          : `Menghadirkan sentuhan rasa ${flavorLabel} yang selaras`);
      } else {
        score += 5;
      }

      // 2. Keselarasan Tipe Santapan & Pengalaman Menikmati (Bobot: 35 poin)
      if (preferences.dishType) {
        const textToSearch = (recipe.name + ' ' + (recipe.mealType || '') + ' ' + (recipe.intro || '')).toLowerCase();
        let dishMatch = false;
        let dishSecondary = false;

        if (preferences.dishType === 'kuah-segar') {
          if (textToSearch.includes('soto') || textToSearch.includes('sup') || textToSearch.includes('asem') || textToSearch.includes('sroto') || textToSearch.includes('tauto')) {
            dishMatch = true;
          } else if (textToSearch.includes('kuah') || textToSearch.includes('selat') || textToSearch.includes('segar')) {
            dishSecondary = true;
          }
        } else if (preferences.dishType === 'kuah-santan') {
          if (textToSearch.includes('santan') || textToSearch.includes('gudeg') || textToSearch.includes('opor') || textToSearch.includes('mangut') || textToSearch.includes('liwet') || textToSearch.includes('glabed')) {
            dishMatch = true;
          } else if (textToSearch.includes('kuah') || textToSearch.includes('gurih')) {
            dishSecondary = true;
          }
        } else if (preferences.dishType === 'kering-bakar') {
          if (textToSearch.includes('sate') || textToSearch.includes('bakar') || textToSearch.includes('bacem') || textToSearch.includes('panggang') || textToSearch.includes('tengkleng')) {
            dishMatch = true;
          } else if (textToSearch.includes('goreng') || textToSearch.includes('ungkep')) {
            dishSecondary = true;
          }
        } else if (preferences.dishType === 'kudapan-lauk') {
          if (textToSearch.includes('mendoan') || textToSearch.includes('tahu') || textToSearch.includes('tempe') || textToSearch.includes('getuk') || textToSearch.includes('serabi') || textToSearch.includes('wingko') || textToSearch.includes('lumpia')) {
            dishMatch = true;
          } else if (textToSearch.includes('kudapan') || textToSearch.includes('camilan') || textToSearch.includes('lauk')) {
            dishSecondary = true;
          }
        }

        if (dishMatch) {
          score += 35;
          matchReasons.push(isEn
            ? 'Serving format aligns precisely with your desired dining experience'
            : 'Format sajian tepat sesuai gaya santapan yang Anda inginkan');
        } else if (dishSecondary) {
          score += 22;
          matchReasons.push(isEn
            ? 'Closely aligns with your texture and dining comfort preference'
            : 'Mendekati preferensi tekstur dan pengalaman bersantap Anda');
        } else {
          score += 8;
        }
      }

      // 3. Keselarasan Eksplorasi Kawasan Budaya (Bobot: 25 poin)
      const regId = (recipe.regionId || '').toLowerCase();
      if (preferences.regionPreference === 'keraton') {
        if (regId.includes('surakarta') || regId.includes('solo')) {
          score += 25;
          matchReasons.push(isEn
            ? `Reflects the noble culinary heritage of Surakarta Royal Court (${regName})`
            : `Mencerminkan warisan kuliner Keraton Surakarta (${recipe.regionName}) yang kaya tata krama rasa`);
        } else {
          score += 6;
        }
      } else if (preferences.regionPreference === 'pantura') {
        if (regId.includes('semarang') || regId.includes('pekalongan') || regId.includes('tegal') || regId.includes('kudus')) {
          score += 25;
          matchReasons.push(isEn
            ? `Represents the vibrant coastal spice dynamics of Central Java's Pantura (${regName})`
            : `Mewakili dinamika bumbu pesisir Pantura Jawa Tengah (${recipe.regionName})`);
        } else {
          score += 6;
        }
      } else if (preferences.regionPreference === 'pegunungan') {
        if (regId.includes('wonosobo') || regId.includes('magelang') || regId.includes('banyumas')) {
          score += 25;
          matchReasons.push(isEn
            ? `Brings forth the comforting hearth spices of highlands and valleys (${regName})`
            : `Menghadirkan kehangatan rempah bumi pegunungan dan lembah (${recipe.regionName})`);
        } else {
          score += 6;
        }
      } else {
        // Semua Sentra Jawa Tengah
        score += 22;
        matchReasons.push(isEn
          ? `Signature traditional culinary specialty from ${regName}`
          : `Pusaka kuliner unggulan dari sentra ${recipe.regionName}`);
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
      isEn ? 'Central Javanese culinary specialty harmonizing with your taste' : 'Pilihan hidangan tradisional Jawa Tengah yang selaras dengan selera Anda',
      isEn ? 'Steeped in rich gastronomic heritage and ancestral lore' : 'Memiliki kekayaan sejarah dan filosofi dapur yang mendalam',
      isEn ? 'Calibrated standard recipe proportioned for 4 servings' : 'Dilengkapi panduan takaran bumbu standar untuk 4 porsi'
    ];

    // Generate elegant cultural narrative without boilerplate
    const rationaleNarrative = this._generateNarrative(topPick, preferences, isEn);

    const calculatedScore = scoredRecipes[0]?.score || 85;

    return {
      primary: topPick,
      primaryRecommendation: topPick,
      matchScore: Math.min(Math.max(calculatedScore, 50), 100),
      rationale: rationaleNarrative,
      matchHighlights: topReasons,
      suggestedServings: 4,
      alternatives: [],
      timestamp: new Date().toISOString()
    };
  },

  async getRecommendation(preferences) {
    return this.getRecommendations(preferences);
  },

  /**
   * Generates cultural appreciation narrative for Central Javanese cuisine.
   */
  _generateNarrative(recipe, preferences, isEn = false) {
    if (isEn) {
      const flavorText = preferences.flavor ? `${preferences.flavor} flavor` : 'traditional warmth';
      return `Based on your chosen preferences, **${recipe.name}** is the traditional specialty of ${recipe.regionName} that resonates most harmoniously today. This culinary creation highlights the balance of ${flavorText} intertwined with ancestral spices. Proportioned precisely for 4 servings.`;
    }

    const flavorText = preferences.flavor ? `cita rasa ${preferences.flavor}` : 'kehangatan rasa tradisional';

    return `Berdasarkan selera yang Anda pilih, **${recipe.name}** adalah hidangan khas ${recipe.regionName} yang paling selaras untuk dinikmati hari ini. Kuliner ini menonjolkan harmoni ${flavorText} berpadu dengan rempah autentik leluhur. Selain memiliki cerita sejarah yang panjang dalam kebudayaan Jawa Tengah, resep ini juga telah terkalibrasi dengan takaran bahan yang pas untuk 4 porsi.`;
  }
};

