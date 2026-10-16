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

      // 2. Kecocokan Waktu Memasak (Bobot: 25 poin)
      const durationMin = parseInt(recipe.cookingDuration) || 60;
      if (preferences.timeAvailable === 'cepat' && durationMin <= 35) {
        score += 25;
        matchReasons.push(`Waktu olah singkat (${recipe.cookingDuration}), pas untuk jadwal memasak Anda`);
      } else if (preferences.timeAvailable === 'sedang' && durationMin <= 60) {
        score += 25;
        matchReasons.push(`Durasi memasak ideal (${recipe.cookingDuration}) untuk hidangan berkuah keluarga`);
      } else if (preferences.timeAvailable === 'leluasa') {
        score += 20;
        matchReasons.push(`Proses ungkep lambat (${recipe.cookingDuration}) menghasilkan bumbu meresap sempurna`);
      }

      // 3. Kecocokan Tingkat Kesulitan (Bobot: 15 poin)
      if (preferences.difficulty) {
        if (preferences.difficulty === 'mudah' && (recipe.difficulty === 'Mudah' || recipe.difficulty === 'Sangat Mudah')) {
          score += 15;
          matchReasons.push('Tahapan memasak sangat ramah bagi pemula tanpa teknik rumit');
        } else if (preferences.difficulty === 'sedang') {
          score += 15;
        }
      }

      // 4. Kecocokan Bahan yang Tersedia di Dapur (Bobot: 20 poin)
      if (Array.isArray(preferences.availableIngredients) && preferences.availableIngredients.length > 0) {
        const hasMatchedIngredient = preferences.availableIngredients.some(ing => {
          return recipe.ingredientGroups.some(g =>
            g.items.some(i => i.name.toLowerCase().includes(ing.toLowerCase()))
          );
        });
        if (hasMatchedIngredient) {
          score += 20;
          matchReasons.push('Dapat memanfaatkan bahan segar yang sudah siap di dapur Anda');
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
      primaryRecommendation: topPick,
      matchScore: Math.min(Math.max(scoredRecipes[0]?.score || 75, 75), 98),
      rationale: rationaleNarrative,
      matchHighlights: topReasons,
      estimatedCostForServings: this._calculateServingCost(topPick, preferences.servings || 4),
      suggestedServings: preferences.servings || topPick.baseServings,
      alternatives: alternatives,
      timestamp: new Date().toISOString()
    };
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

