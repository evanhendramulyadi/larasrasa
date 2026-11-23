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

    // Precise and personalized Central Javanese cultural culinary harmony scoring engine
    const dishCategories = {
      'kuah-segar': {
        exact: ['soto-kudus', 'timlo-solo', 'garang-asem-kudus', 'selat-solo', 'sroto-sokaraja-banyumas', 'tauto-pekalongan'],
        partial: ['mie-ongklok-wonosobo', 'kupat-tahu-magelang']
      },
      'kuah-santan': {
        exact: ['gudeg-komplit', 'nasi-liwet-solo', 'mangut-lele-asap', 'kupat-glabed-tegal'],
        partial: ['sroto-sokaraja-banyumas', 'serabi-notosuman-solo']
      },
      'kering-bakar': {
        exact: ['sate-buntel-solo', 'sate-kambing-batibul-tegal', 'tempe-bacem', 'tengkleng-kambing-solo', 'bakmi-jawa-godhog'],
        partial: ['lumpia-semarang', 'mendoan-banyumas']
      },
      'kudapan-lauk': {
        exact: ['mendoan-banyumas', 'lumpia-semarang', 'tahu-gimbal-semarang', 'serabi-notosuman-solo', 'wingko-babat-semarang', 'getuk-trio-magelang', 'tahu-aci-slawi-tegal', 'tempe-kemul-wonosobo', 'kupat-tahu-magelang', 'nasi-megono-pekalongan', 'tempe-bacem'],
        partial: ['selat-solo', 'bakmi-jawa-godhog']
      }
    };

    const scoredRecipes = recipes.map(recipe => {
      let score = 0;
      const matchReasons = [];
      const regName = (isEn && regionTranslationsEn?.[recipe.regionId]?.name) || recipe.regionName;

      // 1. Flavor Character Profile Dimension (Max: 44 Points)
      const flavors = recipe.flavorProfiles || [];
      const flavorIndex = flavors.indexOf(preferences.flavor);
      const ingText = (recipe.ingredients || []).map(i => (typeof i === 'string' ? i : (i.name || ''))).join(' ').toLowerCase();

      if (flavorIndex === 0) {
        score += 39;
        // Authentic regional ingredient nuances
        if (preferences.flavor === 'manis' && (ingText.includes('gula jawa') || ingText.includes('gula merah') || ingText.includes('kelapa') || ingText.includes('kecap'))) score += 3;
        else if (preferences.flavor === 'gurih' && (ingText.includes('santan') || ingText.includes('bawang') || ingText.includes('kemiri'))) score += 3;
        else if (preferences.flavor === 'pedas' && (ingText.includes('cabai') || ingText.includes('rawit'))) score += 3;
        else if (preferences.flavor === 'segar' && (ingText.includes('belimbing') || ingText.includes('jeruk') || ingText.includes('tomat') || ingText.includes('kencur'))) score += 3;
        else if (preferences.flavor === 'kaya-rempah' && (recipe.spices || []).length >= 5) score += 3;
        else score += 1;

        if (flavors.length > 1) score += 2;

        matchReasons.push(isEn
          ? `Primary ${flavorLabel} flavor character is prominently and authentically expressed`
          : `Karakter rasa utama ${flavorLabel} sangat dominan, autentik, dan meresap sempurna`);
      } else if (flavorIndex === 1) {
        score += 32;
        if (flavors.length > 2) score += 2;
        matchReasons.push(isEn
          ? `Harmoniously infused with authentic ${flavorLabel} flavor notes`
          : `Menghadirkan harmoni sentuhan rasa ${flavorLabel} yang memikat selera`);
      } else if (flavorIndex > 1) {
        score += 26;
        matchReasons.push(isEn
          ? `Subtle traditional background of ${flavorLabel} flavor`
          : `Menghadirkan latar rasa tradisional ${flavorLabel} yang seimbang`);
      } else {
        const compPairs = {
          manis: ['gurih'],
          gurih: ['manis', 'kaya-rempah'],
          pedas: ['gurih', 'segar'],
          segar: ['asam', 'gurih'],
          asam: ['segar', 'pedas'],
          'kaya-rempah': ['gurih', 'hangat']
        };
        const comp = compPairs[preferences.flavor] || [];
        if (flavors.some(f => comp.includes(f))) score += 16;
        else score += 7;
      }

      // 2. Dining Experience & Dish Style Dimension (Max: 36 Points)
      if (preferences.dishType) {
        const cat = dishCategories[preferences.dishType];
        if (cat?.exact.includes(recipe.id)) {
          score += 32;
          const mt = (recipe.mealType || '').toLowerCase();
          if (preferences.dishType === 'kudapan-lauk' && (mt.includes('kudapan') || mt.includes('camilan') || mt.includes('lauk'))) score += 2;
          if (preferences.dishType === 'kuah-segar' && (mt.includes('soto') || mt.includes('sarapan') || mt.includes('sup'))) score += 2;
          if (preferences.dishType === 'kuah-santan' && (mt.includes('tradisional') || mt.includes('utama'))) score += 2;
          if (preferences.dishType === 'kering-bakar' && (mt.includes('bakar') || mt.includes('malam') || mt.includes('sate'))) score += 2;

          matchReasons.push(isEn
            ? 'Serving format aligns precisely with your desired dining experience'
            : 'Format sajian tepat sesuai gaya santapan yang Anda inginkan');
        } else if (cat?.partial.includes(recipe.id)) {
          score += 24;
          matchReasons.push(isEn
            ? 'Closely aligns with your texture and dining comfort preference'
            : 'Mendekati preferensi tekstur dan kenyamanan santap Anda');
        } else {
          const text = (recipe.name + ' ' + (recipe.mealType || '')).toLowerCase();
          if (text.includes('kuah') || text.includes('lauk') || text.includes('sate') || text.includes('goreng')) score += 14;
          else score += 6;
        }
      }

      // 3. Cultural Zone Exploration Dimension (Max: 20 Points)
      const regId = (recipe.regionId || '').toLowerCase();
      if (preferences.regionPreference === 'keraton') {
        if (regId === 'surakarta' || regId.includes('solo')) {
          score += 18;
          if (recipe.javaneseName) score += 2;
          matchReasons.push(isEn
            ? `Reflects the noble culinary heritage of Surakarta Royal Court in ${regName}`
            : `Mencerminkan warisan kuliner Keraton Surakarta khas Kota Surakarta (Solo) yang kaya tata krama rasa`);
        } else if (['magelang', 'banyumas'].includes(regId)) {
          score += 11;
          matchReasons.push(isEn
            ? `Shares culinary traditions of inland Central Java from ${regName}`
            : `Memiliki kedekatan nilai tradisi dapur Jawa pedalaman khas ${recipe.regionName}`);
        } else {
          score += 5;
        }
      } else if (preferences.regionPreference === 'pantura') {
        if (['semarang', 'pekalongan', 'tegal', 'kudus'].includes(regId)) {
          score += 18;
          if (regId === 'semarang' || regId === 'kudus') score += 2;
          matchReasons.push(isEn
            ? `Represents the vibrant coastal spice dynamics of Pantura from ${regName}`
            : `Mewakili dinamika bumbu pesisir Pantura khas ${recipe.regionName} yang kaya aroma rempah`);
        } else {
          score += 5;
        }
      } else if (preferences.regionPreference === 'pegunungan') {
        if (['wonosobo', 'magelang', 'banyumas'].includes(regId)) {
          score += 18;
          if (regId === 'wonosobo' || regId === 'banyumas') score += 2;
          matchReasons.push(isEn
            ? `Brings forth the comforting hearth spices of highlands and valleys in ${regName}`
            : `Menghadirkan kehangatan rempah bumi pegunungan khas ${recipe.regionName}`);
        } else {
          score += 5;
        }
      } else {
        // All Central Java Culinary Centers
        score += 16;
        if (recipe.javaneseName) score += 2;
        matchReasons.push(isEn
          ? `Signature traditional culinary specialty from ${regName}`
          : `Pusaka kuliner unggulan khas ${recipe.regionName} yang sarat nilai tradisi`);
      }

      return {
        recipe,
        score: Math.min(Math.max(score, 50), 98),
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

