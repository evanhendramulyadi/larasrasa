import { recipes } from '../data/recipes.js';
import { API_CONFIG, apiRequest } from './api.js';

/**
 * Recommendation Service
 * 
 * Abstraksi modular untuk sistem rekomendasi LarasRasa.
 * Di masa depan, fungsi `getRecommendations` akan mengirim POST request ke endpoint Laravel:
 * POST /api/recommendations
 * Payload: { preferences: { flavor, timeAvailable, budget, difficulty, servings, availableIngredients } }
 */

export const recommendationService = {
  /**
   * Mengirim preferensi pengguna dan menerima rekomendasi terstruktur.
   * 
   * @param {Object} preferences Preferensi pengguna dari kuesioner
   * @returns {Promise<Object>} Objek rekomendasi utama, alasan kurasi, dan alternatif hidangan
   */
  async getRecommendations(preferences) {
    // Jalur integrasi masa depan: Laravel API + AI Endpoint
    if (!API_CONFIG.useMock) {
      try {
        const response = await apiRequest('/recommendations', {
          method: 'POST',
          body: JSON.stringify({ preferences })
        });
        return response.data;
      } catch (err) {
        console.warn('Gagal memproses rekomendasi via Laravel API, beralih ke engine lokal:', err);
      }
    }

    // Simulasi pemrosesan (latency wajar 600ms)
    await new Promise(resolve => setTimeout(resolve, 600));

    // Validasi input preferensi
    if (!preferences || !preferences.flavor) {
      throw new Error('Preferensi rasa wajib dipilih untuk menemukan rekomendasi hidangan.');
    }

    // Engine Penilaian Kecocokan Resep Lokal
    const scoredRecipes = recipes.map(recipe => {
      let score = 0;
      const matchReasons = [];

      // 1. Kecocokan Profil Rasa (Bobot terbesar: 40 poin)
      if (recipe.flavorProfiles.includes(preferences.flavor)) {
        score += 40;
        matchReasons.push(`Memiliki karakter rasa ${preferences.flavor} khas Jawa Tengah yang Anda idamkan`);
      }

      // 2. Kecocokan Waktu Memasak (Bobot: 20 poin)
      const durationMin = parseInt(recipe.cookingDuration) || 60;
      if (preferences.timeAvailable === 'cepat' && durationMin <= 35) {
        score += 20;
        matchReasons.push(`Waktu olah singkat (${recipe.cookingDuration}), pas untuk jadwal memasak Anda`);
      } else if (preferences.timeAvailable === 'sedang' && durationMin <= 60) {
        score += 20;
        matchReasons.push(`Durasi memasak ideal (${recipe.cookingDuration}) untuk hidangan berkuah keluarga`);
      } else if (preferences.timeAvailable === 'leluasa') {
        score += 15;
        matchReasons.push(`Proses ungkep lambat (${recipe.cookingDuration}) menghasilkan bumbu meresap sempurna`);
      }

      // 3. Kecocokan Tipe Olahan / Sajian (Bobot: 25 poin)
      if (preferences.dishType) {
        const textToSearch = (recipe.name + ' ' + (recipe.mealType || '') + ' ' + (recipe.intro || '')).toLowerCase();
        if (preferences.dishType === 'kuah-segar' && (textToSearch.includes('soto') || textToSearch.includes('sup') || textToSearch.includes('asem') || textToSearch.includes('segar') || textToSearch.includes('selat') || textToSearch.includes('tauto') || textToSearch.includes('sroto'))) {
          score += 25;
          matchReasons.push('Sajian berkuah segar kaya rempah yang menghangatkan suasana');
        } else if (preferences.dishType === 'kuah-santan' && (textToSearch.includes('santan') || textToSearch.includes('gudeg') || textToSearch.includes('opor') || textToSearch.includes('mangut') || textToSearch.includes('gandul') || textToSearch.includes('liwet') || textToSearch.includes('glabed'))) {
          score += 25;
          matchReasons.push('Kuah santan gurih meresap dengan kehangatan khas dapur Mataram');
        } else if (preferences.dishType === 'kering-bakar' && (textToSearch.includes('sate') || textToSearch.includes('bakar') || textToSearch.includes('bacem') || textToSearch.includes('panggang') || textToSearch.includes('tengkleng'))) {
          score += 25;
          matchReasons.push('Karamelisasi bumbu manis gurih dengan aroma panggangan arang sedap');
        } else if (preferences.dishType === 'kudapan-lauk' && (textToSearch.includes('mendoan') || textToSearch.includes('tahu') || textToSearch.includes('tempe') || textToSearch.includes('camilan') || textToSearch.includes('kudapan') || textToSearch.includes('getuk') || textToSearch.includes('serabi') || textToSearch.includes('wingko'))) {
          score += 25;
          matchReasons.push('Olahan lauk pendamping atau kudapan renyah gurih bersahabat');
        }
      }

      // 4. Kecocokan Alokasi Anggaran Belanja (Bobot: 25 poin)
      if (preferences.budget) {
        if (preferences.budget === 'hemat' && (recipe.budgetCategory === 'Sangat Terjangkau' || recipe.budgetCategory === 'Terjangkau')) {
          score += 25;
          matchReasons.push('Bahan-bahan ekonomis berbasis kedelai dan bumbu pasar harian');
        } else if (preferences.budget === 'menengah' && (recipe.budgetCategory === 'Terjangkau' || recipe.budgetCategory === 'Menengah')) {
          score += 25;
          matchReasons.push('Anggaran bersahabat untuk sajian lauk utama keluarga harian');
        } else if (preferences.budget === 'istimewa') {
          score += 25;
          matchReasons.push('Kombinasi bahan premium untuk santap khidmat istimewa');
        } else {
          score += 15;
        }
      }

      return {
        recipe,
        score,
        matchReasons
      };
    });

    // Urutkan berdasarkan skor tertinggi
    scoredRecipes.sort((a, b) => b.score - a.score);

    const topPick = scoredRecipes[0]?.recipe || recipes[0];
    const topReasons = scoredRecipes[0]?.matchReasons || ['Pilihan hidangan otentik khas Jawa Tengah paling seimbang untuk keluarga Anda'];
    const alternatives = scoredRecipes.slice(1, 4).map(sr => sr.recipe);

    // Pembuatan Narasi Penjelasan Rekomendasi dalam Bahasa Indonesia Natural
    const rationaleNarrative = this._generateNarrative(topPick, preferences, topReasons);

    return {
      primary: topPick,
      primaryRecommendation: topPick,
      matchScore: Math.min(Math.max(scoredRecipes[0]?.score || 75, 75), 98),
      rationale: rationaleNarrative,
      matchHighlights: topReasons,
      estimatedCostForServings: this._calculateServingCost(topPick, 4),
      suggestedServings: 4,
      alternatives: alternatives,
      timestamp: new Date().toISOString()
    };
  },

  async getRecommendation(preferences) {
    return this.getRecommendations(preferences);
  },

  /**
   * Menghasilkan teks narasi panduan ramah untuk ibu rumah tangga & juru masak keluarga.
   */
  _generateNarrative(recipe, preferences, reasons) {
    const servingsText = preferences.servings ? `${preferences.servings} porsi` : 'keluarga tercinta';
    const flavorText = preferences.flavor ? `cita rasa ${preferences.flavor}` : 'kehangatan kuliner';

    return `Berdasarkan preferensi yang Anda tentukan, **${recipe.name}** adalah pilihan paling selaras untuk sajian hari ini. Hidangan ini memadukan ${flavorText} khas ${recipe.regionName} dengan waktu memasak sekitar ${recipe.cookingDuration}. Komposisi bumbu rempah ${recipe.flavorProfiles.join(', ')} sangat bersahabat untuk dinikmati bersama ${servingsText}, serta bahan-bahannya mudah didapat di pasar tradisional maupun supermarket terdekat.`;
  },

  /**
   * Estimasi biaya bahan berdasarkan jumlah porsi yang dipilih.
   */
  _calculateServingCost(recipe, servings) {
    const multiplier = servings / recipe.baseServings;
    if (recipe.budgetCategory === 'Sangat Terjangkau') {
      const min = Math.round(15000 * multiplier / 1000) * 1000;
      const max = Math.round(25000 * multiplier / 1000) * 1000;
      return `Rp ${min.toLocaleString('id-ID')} – Rp ${max.toLocaleString('id-ID')}`;
    } else if (recipe.budgetCategory === 'Terjangkau') {
      const min = Math.round(30000 * multiplier / 1000) * 1000;
      const max = Math.round(45000 * multiplier / 1000) * 1000;
      return `Rp ${min.toLocaleString('id-ID')} – Rp ${max.toLocaleString('id-ID')}`;
    } else {
      const min = Math.round(50000 * multiplier / 1000) * 1000;
      const max = Math.round(75000 * multiplier / 1000) * 1000;
      return `Rp ${min.toLocaleString('id-ID')} – Rp ${max.toLocaleString('id-ID')}`;
    }
  }
};

