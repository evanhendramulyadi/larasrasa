import { jsPDF } from 'jspdf';
import { API_CONFIG, apiRequest } from './api.js';
import { 
  LOCAL_INGREDIENT_CATALOG, 
  ALL_LOCAL_INGREDIENTS, 
  ingredientService 
} from './ingredientService.js';

/**
 * LarasRasa AI Food Creator Service
 * 
 * Intelligent culinary synthesis engine for authentic Central Javanese cuisine.
 * Combines Javanese flavor balance principles, exact measurements,
 * HTML5 Canvas poster composition, and client-side PDF document & certificate generation.
 * 
 * Future Laravel REST API Contracts:
 *   - GET  /api/ingredients
 *   - POST /api/ai/food-creator/generate-recipe
 *   - POST /api/ai/food-creator/generate-image
 */

export const INGREDIENT_CATALOG = LOCAL_INGREDIENT_CATALOG;
export const ALL_INGREDIENTS = ALL_LOCAL_INGREDIENTS;
export { ingredientService };

export const SUPABASE_CONFIG = {
  url: 'https://fkenbpopcgghadbcresj.supabase.co',
  functionUrl: 'https://fkenbpopcgghadbcresj.supabase.co/functions/v1/generate-recipe',
  publishableKey: 'sb_publishable_Q2sMqA6Kk3oZhnMOSFSGlA_OpYKlV-j'
};

/**
 * Builds the comprehensive AI recipe formulation prompt.
 * Aggregates all user inputs from the frontend into a structured, culturally authentic template.
 * Demands authentic Central Javanese cuisine flair ("berbau jateng") and bilingual outputs.
 * CRITICAL: In English, the dish name is strictly untranslated.
 */
export function buildRecipePrompt(inputs) {
  const {
    creatorName,
    selectedIngredientIds = [],
    cookingMethod = 'ungkep',
    tasteProfile = 'manis-gurih',
    spiceLevel = 1,
    servings = 4,
    equipment = ['wajan', 'cobek'],
    customNotes = ''
  } = inputs;

  const ingredientNames = selectedIngredientIds.map(id => {
    const found = ALL_INGREDIENTS.find(i => i.id === id);
    return found ? found.nameId : id;
  });

  const methodObj = PREFERENCE_OPTIONS.cookingMethods.find(m => m.id === cookingMethod);
  const methodLabel = methodObj ? `${methodObj.labelId} (${methodObj.descId})` : cookingMethod;

  const tasteObj = PREFERENCE_OPTIONS.tasteProfiles.find(t => t.id === tasteProfile);
  const tasteLabel = tasteObj ? tasteObj.labelId : tasteProfile;

  const spiceObj = PREFERENCE_OPTIONS.spiceLevels.find(s => s.id === spiceLevel);
  const spiceLabel = spiceObj ? spiceObj.labelId : `Level ${spiceLevel}`;

  const eqLabels = equipment.map(eq => {
    const found = PREFERENCE_OPTIONS.equipmentList.find(e => e.id === eq);
    return found ? found.labelId : eq;
  });

  return `Kamu adalah AI Culinary Intelligence LarasRasa, pakar peracik kuliner pusaka Jawa Tengah.
Tugasmu adalah meracik resep masakan tradisional autentik Jawa Tengah berdasarkan pilihan bahan dan teknik berikut:

DATA INPUT PENGGUNA:
- Nama Pencipta Resep: ${creatorName || 'Dapur Tradisi LarasRasa'}
- Bahan Pilihan: ${ingredientNames.join(', ')}
- Metode Memasak: ${methodLabel}
- Harmoni Karakter Rasa: ${tasteLabel}
- Tingkat Kehangatan Lombok: ${spiceLabel}
- Porsi: ${servings} porsi santapan
- Peralatan Dapur: ${eqLabels.join(', ')}
${customNotes ? `- Catatan Selera Tambahan: "${customNotes}"` : ''}

PEDOMAN PERACIKAN RESEP:
1. NAMA MASAKAN (TITLE):
   - Wajib memiliki cita rasa dan aura khas tradisi kuliner Jawa Tengah yang kental ("berbau jateng").
   - Contoh nama autentik: "Ungkep Gurih Udang Belimbing", "Garang Asem Ayam Bumbung", "Mangut Bandeng Asap Brebes", "Gecok Daging Sapi Pawon", "Brongkos Tahu Tempe Pedas", "Semur Solo Telur Bebek".
   - Nama masakan HANYA SATU nama baku yang padat dan anggun. Jangan gunakan kata "atau", garis miring (/), tanda kurung, atau label wilayah langsung di judul.
   - PENTING / CRITICAL: Dalam versi terjemahan Bahasa Inggris (English Version), NAMA MASAKAN TIDAK BOLEH DITERJEMAHKAN! Tetap gunakan nama masakan asli berbahasa Indonesia/Jawa tersebut (contoh: tetap "Ungkep Gurih Udang Belimbing").

2. DUA VERSI TERJEMAHAN (INDONESIA & INGGRIS):
   - Buat 2 versi lengkap: versi Bahasa Indonesia (ID) dan versi Bahasa Inggris (EN).
   - Seluruh teks pengantar, bahan, bumbu, alat, dan langkah memasak harus diterjemahkan secara fasih dan natural, KECUALI nama masakan yang tetap asli Jawa Tengah.

3. SUBTITLE:
   - Bahasa Indonesia: "Racikan Resep Dapur Tradisi"
   - Bahasa Inggris: "Authentic Heritage Recipe"

4. KARAKTER RASA & KONSEP OLAHAN (3 PARAGRAF NARATIF):
   - Paragraf 1: Mengisahkan perpaduan teknik memasak dengan kekayaan aroma rempah-rempah yang dipilih.
   - Paragraf 2: Menggambarkan karakter rasa yang dihadirkan (gurih, manis, mantap) yang ditakar presisi untuk 4 porsi santapan keluarga, memasukkan catatan selera pengguna jika ada.
   - Paragraf 3: Saran penyajian hangat bersama nasi putih pulen, lalapan segar, dan sambal pelengkap.
   - Sediakan dalam versi Indonesia (descriptionId) dan versi Inggris (descriptionEn).

5. BAHAN & BUMBU DAPUR (INGREDIENTS):
   - Seluruh bahan ditakar presisi untuk ${servings} porsi.
   - Setiap bahan menyertakan nama (nameId & nameEn), takaran (amount angka), satuan (unitId & unitEn), dan petunjuk persiapan (noteId & noteEn, contoh: "siap olah", "dihaluskan", "memarkan").

6. PERALATAN DAPUR (EQUIPMENT):
   - Tentukan seluruh peralatan dapur tradisional khas Jawa Tengah yang relevan dan dibutuhkan untuk memasak resep ini secara optimal.
   - Jumlah peralatan BEBAS dan fleksibel (tidak dibatasi 2, bisa 2, 3, 4, atau lebih sesuai kebutuhan masakan, contoh: Wajan Penggorengan Cekung, Cobek Batu & Ulekan, Spatula Kayu, Panci Kukusan, Kuali Tanah Liat, dll).
   - Setiap peralatan menyertakan labelId dan labelEn. DILARANG menyertakan emoji apa pun di nama peralatan.

7. PANDUAN LANGKAH MEMASAK (5 TAHAP):
   - Terdiri dari tepat 5 tahapan memasak berurutan dari persiapan bumbu hingga penyajian.
   - Setiap nomor langkah HANYA memiliki stepNumber, judul langkah (titleId & titleEn), dan uraian instruksi (instructionId & instructionEn).
   - DILARANG menyertakan kiat, tips olah, teknik terpisah, atau kartu tambahan di dalam langkah. Buat sangat simpel: hanya judul dan keterangan instruksi.

FORMAT LUARAN HARUS MENGHASILKAN JSON VALID:
{
  "title": "Nama Masakan Berbau Jateng",
  "subtitleId": "Racikan Resep Dapur Tradisi",
  "subtitleEn": "Authentic Heritage Recipe",
  "creatorName": "${creatorName || 'Dapur Tradisi LarasRasa'}",
  "descriptionId": "Paragraf 1\\n\\nParagraf 2\\n\\nParagraf 3",
  "descriptionEn": "Paragraph 1\\n\\nParagraph 2\\n\\nParagraph 3",
  "ingredients": [
    {
      "nameId": "Udang Jerbung Segar",
      "nameEn": "Fresh Wild Prawns",
      "amount": 350,
      "unitId": "g",
      "unitEn": "g",
      "noteId": "siap olah",
      "noteEn": "cleaned and prepped"
    }
  ],
  "equipment": [
    { "labelId": "Wajan Penggorengan Cekung", "labelEn": "Deep Cooking Wok" },
    { "labelId": "Cobek Batu & Ulekan", "labelEn": "Stone Mortar & Pestle" },
    { "labelId": "Spatula Kayu", "labelEn": "Wooden Spatula" }
  ],
  "stepsId": [
    {
      "stepNumber": 1,
      "titleId": "Persiapan Bahan & Penumbukan Bumbu Halus",
      "instructionId": "Siapkan cobek batu. Haluskan bawang merah, bawang putih, kemiri sangrai, dan ketumbar hingga lembut merata selama sekitar 10 menit..."
    }
  ],
  "stepsEn": [
    {
      "stepNumber": 1,
      "titleEn": "Ingredient Prep & Grinding Spice Paste",
      "instructionEn": "Prepare a stone mortar. Grind shallots, garlic, toasted candlenuts, and coriander seeds until uniformly smooth for about 10 minutes..."
    }
  ]
}`;
}

export const PREFERENCE_OPTIONS = {
  cookingMethods: [
    { id: 'tumis', labelId: 'Tumis Cepat Beraroma', labelEn: 'Quick Aromatic Stir-fry', descId: 'Minyak panas, bumbu rajang halus, tekstur renyah segar.', descEn: 'Hot oil, finely sliced aromatic spices, crisp and fresh texture.' },
    { id: 'ungkep', labelId: 'Ungkep & Rebus Kuah Kaldu', labelEn: 'Slow Braise & Savory Broth', descId: 'Api kecil, kuah meresap hingga ke serat terdalam.', descEn: 'Low flame, broth deeply infusing into every fiber.' },
    { id: 'kukus', labelId: 'Kukus Bungkus Daun Pisang', labelEn: 'Steam in Banana Leaf', descId: 'Aroma daun pisang layu menyatu dengan sari bumbu alami.', descEn: 'Aroma of wilted banana leaf melds with natural spice essences.' },
    { id: 'bakar', labelId: 'Panggang / Bakar Arang Batok', labelEn: 'Charcoal Grill & Glaze', descId: 'Karamelisasi kecap manis dan asap arang menggoda selera.', descEn: 'Sweet soy sauce caramelization and tantalizing coconut charcoal smoke.' },
    { id: 'goreng', labelId: 'Goreng Krispi / Mendoan Lembut', labelEn: 'Crispy / Soft Pan-fry', descId: 'Lapisan tepung berempah gurih dengan sentuhan daun bawang.', descEn: 'Crisp spiced batter layer with fragrant scallion touches.' }
  ],
  dishCategories: [
    { id: 'lauk', labelId: 'Lauk Utama Dapur', labelEn: 'Main Dish' },
    { id: 'sayur', labelId: 'Sayur & Kuah Hangat', labelEn: 'Soups & Warm Broths' },
    { id: 'kudapan', labelId: 'Kudapan Tradisional', labelEn: 'Traditional Snack' },
    { id: 'nasi-campur', labelId: 'Hidangan Nasi Komplet', labelEn: 'Complete Rice Platter' },
    { id: 'sambal', labelId: 'Sambal & Pendamping Bumbu', labelEn: 'Sambal & Condiments' }
  ],
  tasteProfiles: [
    { id: 'manis-gurih', labelId: 'Manis Gurih Harmonis', labelEn: 'Harmonious Sweet & Savory' },
    { id: 'gurih-segar', labelId: 'Gurih Segar Berkaldu', labelEn: 'Savory & Fresh Broth' },
    { id: 'pedas-gurih', labelId: 'Pedas Gurih Mantap', labelEn: 'Spicy & Savory Rich' },
    { id: 'asam-segar', labelId: 'Asam Segar Belimbing & Tomat Hijau', labelEn: 'Tangy Fresh Bilimbi & Green Tomato' },
    { id: 'pekat-rempah', labelId: 'Pekat Kaya Rempah Tradisi', labelEn: 'Rich Spiced Heritage' }
  ],
  spiceLevels: [
    { id: 0, labelId: 'Tanpa Pedas (Ramah Anak)', labelEn: 'Mild (Child Friendly)', icon: '🟢' },
    { id: 1, labelId: 'Hangat Lembut (Level 1)', labelEn: 'Gentle Warmth (Level 1)', icon: '🟡' },
    { id: 2, labelId: 'Pedas Mantap (Level 2)', labelEn: 'Medium Hot (Level 2)', icon: '🟠' },
    { id: 3, labelId: 'Pedas Nendang Mercon (Level 3)', labelEn: 'Fiery Mercon (Level 3)', icon: '🔴' }
  ],
  cookingDurations: [
    { id: 'quick', labelId: 'Praktis (≤ 30 Menit)', labelEn: 'Quick (≤ 30 Mins)' },
    { id: 'standard', labelId: 'Standar (30 - 60 Menit)', labelEn: 'Standard (30 - 60 Mins)' },
    { id: 'slow', labelId: 'Ungkep Sabar (> 60 Menit)', labelEn: 'Slow Braise (> 60 Mins)' }
  ],
  servings: [1, 2, 4, 6, 8],
  equipmentList: [
    { id: 'wajan', labelId: 'Wajan Penggorengan / Wok', labelEn: 'Cooking Wok' },
    { id: 'panci', labelId: 'Panci Kaldu / Sup', labelEn: 'Stockpot' },
    { id: 'kukusan', labelId: 'Kukusan Tradisional', labelEn: 'Steamer' },
    { id: 'cobek', labelId: 'Cobek Batu & Ulekan', labelEn: 'Stone Mortar & Pestle' },
    { id: 'panggangan', labelId: 'Wajan Panggangan / Bakaran', labelEn: 'Grill Pan' }
  ],
  dietaryOptions: [
    { id: 'tanpa-santan', labelId: 'Tanpa Santan', labelEn: 'Coconut-free' },
    { id: 'bebas-seafood', labelId: 'Tanpa Terasi / Seafood', labelEn: 'Seafood-free' },
    { id: 'rendah-gula', labelId: 'Rendah Gula Kelapa', labelEn: 'Low Sugar' },
    { id: 'tanpa-daging-merah', labelId: 'Bebas Daging Merah', labelEn: 'No Red Meat' },
    { id: 'vegetarian', labelId: 'Vegetarian / Nabati', labelEn: 'Plant-based' }
  ],
  imageStyles: [
    { id: 'editorial', labelId: 'Fotografi Editorial Dapur Jawa', labelEn: 'Warm Rustic Editorial Photo', descId: 'Pencahayaan natural lembut, meja kayu jati antik, dan piring gerabah.' },
    { id: 'oil-painting', labelId: 'Lukisan Cat Minyak Hindia Belanda', labelEn: 'Vintage Oil Painting', descId: 'Nuansa klasik abad ke-19, sapuan kuas hangat, dan patina emas.' },
    { id: 'batik-art', labelId: 'Seni Ilustrasi Batik & Cukil Kayu', labelEn: 'Contemporary Batik Woodcut', descId: 'Garis motif parang/kawung geometris khas tradisi keraton Jawa.' },
    { id: 'fine-dining', labelId: 'Visual Studio Fine Dining Modern', labelEn: 'Modern Fine Dining Studio', descId: 'Latar gelap dramatis, tata piring presisi, dan garnish daun mikro.' }
  ],
  aspectRatios: [
    { id: '1:1', label: '1:1 Persegi (1200 x 1200)', width: 1200, height: 1200, ratioClass: 'aspect-square' },
    { id: '4:3', label: '4:3 Klasik (1200 x 900)', width: 1200, height: 900, ratioClass: 'aspect-4/3' },
    { id: '16:9', label: '16:9 Sinematik (1200 x 675)', width: 1200, height: 675, ratioClass: 'aspect-video' }
  ]
};

export const aiFoodCreatorService = {
  /**
   * Check remaining credits with Supabase Edge Function
   */
  async checkCredits() {
    try {
      const response = await fetch(SUPABASE_CONFIG.functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_CONFIG.publishableKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.publishableKey}`
        },
        body: JSON.stringify({ action: 'check-credits' })
      });

      if (response.status === 402 || response.status === 429) {
        return { ok: false, error: 'no_credits', message: 'Kredit peracikan resep global telah habis. Silakan tunggu sampai kuota kredit tersedia kembali.' };
      }

      if (response.status === 403) {
        return { 
          ok: false, 
          error: 'forbidden', 
          status: 403, 
          message: 'Gagal terhubung ke server backend (403).' 
        };
      }

      if (!response.ok) {
        return { ok: false, error: 'request_failed', status: response.status };
      }

      const data = await response.json().catch(() => ({}));
      if (data.credits !== undefined && data.credits <= 0) {
        return { ok: false, error: 'no_credits', credits: 0 };
      }
      if (data.hasCredit === false || data.hasCredits === false) {
        return { ok: false, error: 'no_credits', credits: 0 };
      }

      return { ok: true, credits: data.credits ?? 999 };
    } catch (err) {
      console.warn('Backend credit check connection error:', err);
      return { 
        ok: false, 
        error: 'forbidden', 
        status: 403, 
        message: 'Gagal terhubung ke server backend.' 
      };
    }
  },

  /**
   * Synthesize a structured recipe with the AI engine via Supabase Edge Function (Gemini API)
   * with high-fidelity deterministic culinary intelligence fallback.
   */
  async generateRecipe(payload) {
    const {
      creatorName,
      creatorNickname,
      selectedIngredientIds = [],
      cookingMethod = 'tumis',
      dishCategory = 'lauk',
      tasteProfile = 'manis-gurih',
      spiceLevel = 1,
      cookingDuration = 'standard',
      servings = 4,
      equipment = ['wajan', 'cobek'],
      dietary = [],
      customNotes = '',
      imageStyle = 'editorial',
      aspectRatio = '1:1',
      outputLanguage = 'id'
    } = payload;

    // Creator name is optional
    const resolvedCreatorName = (creatorName && creatorName.trim().length > 0)
      ? creatorName.trim()
      : (outputLanguage === 'en' ? 'LarasRasa Culinary Hearth' : 'Dapur Tradisi LarasRasa');

    if (!Array.isArray(selectedIngredientIds) || selectedIngredientIds.length < 5) {
      throw new Error(outputLanguage === 'en'
        ? 'Select at least 5 ingredients or spices to begin culinary synthesis.'
        : 'Pilih minimal 5 bahan atau rempah untuk memulai penciptaan resep kuliner.');
    }

    // 1. Build prompt template containing all input parameters
    const promptTemplate = buildRecipePrompt({
      creatorName: resolvedCreatorName,
      selectedIngredientIds,
      cookingMethod,
      tasteProfile,
      spiceLevel,
      servings: parseInt(servings) || 4,
      equipment,
      customNotes
    });

    // 2. Transmit prompt to Supabase Edge Function -> Google Gemini API
    try {
      const response = await fetch(SUPABASE_CONFIG.functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_CONFIG.publishableKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.publishableKey}`
        },
        body: JSON.stringify({
          prompt: promptTemplate,
          action: 'generate',
          inputs: {
            creatorName: resolvedCreatorName,
            selectedIngredientIds,
            cookingMethod,
            dishCategory,
            tasteProfile,
            spiceLevel,
            cookingDuration,
            servings: parseInt(servings) || 4,
            equipment,
            dietary,
            customNotes
          }
        })
      });

      if (response.status === 402 || response.status === 429) {
        const creditErr = new Error('CREDIT_EXHAUSTED');
        creditErr.code = 'CREDIT_EXHAUSTED';
        throw creditErr;
      }

      if (response.status === 403) {
        const forbiddenErr = new Error('EDGE_FORBIDDEN');
        forbiddenErr.code = 'EDGE_FORBIDDEN';
        throw forbiddenErr;
      }

      if (response.ok) {
        const resultData = await response.json().catch(() => null);
        if (!resultData) {
          throw new Error('BACKEND_EMPTY_RESPONSE');
        }
        const parsed = this._parseGeminiRecipeResponse(resultData, payload, resolvedCreatorName);
        if (parsed && parsed.title && Array.isArray(parsed.ingredients) && parsed.ingredients.length > 0) {
          return parsed;
        }
        throw new Error('BACKEND_INVALID_RECIPE_FORMAT');
      } else {
        const errText = await response.text().catch(() => '');
        console.warn(`Supabase function status ${response.status}: ${errText}`);
        if (response.status === 403) {
          const forbiddenErr = new Error('EDGE_FORBIDDEN');
          forbiddenErr.code = 'EDGE_FORBIDDEN';
          throw forbiddenErr;
        }
        throw new Error(`Edge Function returned ${response.status}: ${errText}`);
      }
    } catch (err) {
      if (err.code === 'CREDIT_EXHAUSTED' || err.code === 'EDGE_FORBIDDEN') {
        throw err;
      }
      if (err.name === 'TypeError' || err.message?.includes('fetch')) {
        const forbiddenErr = new Error('EDGE_FORBIDDEN');
        forbiddenErr.code = 'EDGE_FORBIDDEN';
        throw forbiddenErr;
      }
      throw err;
    }
  },

  /**
   * Parse and extract recipe from Gemini API response
   */
  _parseGeminiRecipeResponse(resultData, payload, resolvedCreatorName) {
    if (!resultData) return null;

    let textContent = '';
    if (typeof resultData === 'string') {
      textContent = resultData;
    } else if (resultData.recipe) {
      if (typeof resultData.recipe === 'object') {
        return this._normalizeRecipeObject(resultData.recipe, payload, resolvedCreatorName);
      } else if (typeof resultData.recipe === 'string') {
        textContent = resultData.recipe;
      }
    } else if (resultData.title && (resultData.ingredients || resultData.stepsId)) {
      return this._normalizeRecipeObject(resultData, payload, resolvedCreatorName);
    } else if (resultData.candidates?.[0]?.content?.parts?.[0]?.text) {
      textContent = resultData.candidates[0].content.parts[0].text;
    } else if (resultData.text) {
      textContent = resultData.text;
    } else if (resultData.response) {
      textContent = typeof resultData.response === 'string' ? resultData.response : JSON.stringify(resultData.response);
    } else {
      textContent = JSON.stringify(resultData);
    }

    try {
      let jsonStr = textContent.trim();
      const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (codeBlockMatch && codeBlockMatch[1]) {
        jsonStr = codeBlockMatch[1].trim();
      } else {
        const startBrace = jsonStr.indexOf('{');
        const endBrace = jsonStr.lastIndexOf('}');
        if (startBrace !== -1 && endBrace !== -1 && endBrace > startBrace) {
          jsonStr = jsonStr.slice(startBrace, endBrace + 1);
        }
      }

      const parsed = JSON.parse(jsonStr);
      if (parsed && (parsed.title || parsed.dishName)) {
        return this._normalizeRecipeObject(parsed, payload, resolvedCreatorName);
      }
    } catch (parseErr) {
      console.warn('Could not parse JSON from Gemini text output:', parseErr);
    }

    return null;
  },

  _normalizeRecipeObject(raw, payload, resolvedCreatorName) {
    const rawTitle = (raw.title || raw.dishName || 'Racikan Pusaka Jawa Tengah').trim();
    const cleanTitle = rawTitle.split('/')[0].split(' atau ')[0].trim();

    const subtitleId = raw.subtitleId || 'Racikan Resep Dapur Tradisi';
    const subtitleEn = raw.subtitleEn || 'Authentic Heritage Recipe';

    const descId = (raw.descriptionId || raw.description || '').trim();
    const descEn = (raw.descriptionEn || raw.description || descId).trim();

    const rawIngs = Array.isArray(raw.ingredients) ? raw.ingredients : [];
    const normalizedIngs = rawIngs.map(i => ({
      nameId: i.nameId || i.name || 'Bahan Tradisi',
      nameEn: i.nameEn || i.nameId || i.name || 'Heritage Ingredient',
      amount: i.amount || 1,
      unitId: i.unitId || i.unit || 'secukupnya',
      unitEn: i.unitEn || i.unitId || i.unit || 'to taste',
      noteId: i.noteId || i.note || '',
      noteEn: i.noteEn || i.noteId || i.note || ''
    }));

    const rawEq = Array.isArray(raw.equipment) ? raw.equipment : [];
    const normalizedEq = rawEq.map(eq => {
      if (typeof eq === 'object') {
        return {
          id: eq.id || 'alat',
          labelId: eq.labelId || eq.name || 'Wajan Penggorengan',
          labelEn: eq.labelEn || eq.labelId || eq.name || 'Cooking Wok'
        };
      }
      return { id: String(eq), labelId: String(eq), labelEn: String(eq) };
    });

    const rawStepsId = Array.isArray(raw.stepsId) ? raw.stepsId : (Array.isArray(raw.steps) ? raw.steps : []);
    const normalizedStepsId = rawStepsId.map((st, idx) => ({
      stepNumber: st.stepNumber || idx + 1,
      title: st.titleId || st.title || `Tahap ${idx + 1}`,
      titleId: st.titleId || st.title || `Tahap ${idx + 1}`,
      instruction: st.instructionId || st.instruction || st.desc || '',
      instructionId: st.instructionId || st.instruction || st.desc || '',
      techniqueId: st.techniqueId || st.technique || '',
      tipId: st.tipId || st.tip || ''
    }));

    const rawStepsEn = Array.isArray(raw.stepsEn) ? raw.stepsEn : rawStepsId;
    const normalizedStepsEn = rawStepsEn.map((st, idx) => ({
      stepNumber: st.stepNumber || idx + 1,
      title: st.titleEn || st.title || `Step ${idx + 1}`,
      titleEn: st.titleEn || st.title || `Step ${idx + 1}`,
      instruction: st.instructionEn || st.instruction || st.desc || '',
      instructionEn: st.instructionEn || st.instruction || st.desc || '',
      techniqueEn: st.techniqueEn || st.technique || '',
      tipEn: st.tipEn || st.tip || ''
    }));

    const slug = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return {
      id: `ai-food-${Date.now()}`,
      slug,
      title: cleanTitle,
      shortTitle: cleanTitle,
      javaneseTitle: subtitleId,
      subtitleId,
      subtitleEn,
      creatorName: resolvedCreatorName,
      creatorNickname: resolvedCreatorName,
      creatorCredit: `Diciptakan Resmi oleh: ${resolvedCreatorName}`,
      description: descId,
      descriptionId: descId,
      descriptionEn: descEn,
      regionName: 'Kreasi Dapur Tradisi',
      servings: payload.servings || 4,
      prepTime: '15 Menit',
      cookTime: '35 Menit',
      totalTime: '50 Menit',
      difficulty: 'Sedang',
      calories: '320 kkal / porsi',
      spiceLevel: payload.spiceLevel || 1,
      cookingMethod: payload.cookingMethod || 'ungkep',
      dishCategory: payload.dishCategory || 'lauk',
      tasteProfile: payload.tasteProfile || 'manis-gurih',
      outputLanguage: 'id',
      ingredients: normalizedIngs,
      equipment: normalizedEq,
      steps: normalizedStepsId,
      stepsId: normalizedStepsId,
      stepsEn: normalizedStepsEn,
      createdAt: new Date().toISOString()
    };
  },

  /**
   * Composes a professional culinary poster using HTML5 Canvas.
   * Renders the food imagery, decorative Javanese border, Playfair Display typography,
   * badges, and crisp "Created by [Creator Name]" attribution.
   */
  async composePosterCanvas(canvas, recipe, options = {}) {
    if (!canvas || !recipe) return;

    const ratioConfig = PREFERENCE_OPTIONS.aspectRatios.find(r => r.id === (options.aspectRatio || recipe.aspectRatio)) || PREFERENCE_OPTIONS.aspectRatios[0];
    const width = ratioConfig.width;
    const height = ratioConfig.height;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Solid Pure Black / Dark Elegant Background Fill (Clean minimal black fill)
    ctx.fillStyle = '#0F0C0A';
    ctx.fillRect(0, 0, width, height);

    // Subtle dark radial depth
    const darkGrad = ctx.createRadialGradient(width / 2, height / 2, width * 0.1, width / 2, height / 2, width * 0.75);
    darkGrad.addColorStop(0, '#1A1410');
    darkGrad.addColorStop(1, '#080605');
    ctx.fillStyle = darkGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Black Placeholder Center Box for Food Photograph (Clean minimal black container)
    const photoBoxW = Math.round(width * 0.72);
    const photoBoxH = Math.round(photoBoxW * 0.58);
    const photoBoxX = Math.round((width - photoBoxW) / 2);
    const photoBoxY = Math.round(height * 0.22);

    ctx.save();
    ctx.fillStyle = '#050403';
    ctx.fillRect(photoBoxX, photoBoxY, photoBoxW, photoBoxH);
    ctx.strokeStyle = 'rgba(196, 154, 88, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(photoBoxX, photoBoxY, photoBoxW, photoBoxH);

    // Placeholder Camera Icon & Text inside box
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(196, 154, 88, 0.6)';
    ctx.font = '28px sans-serif';
    ctx.fillText('📷', width / 2, photoBoxY + (photoBoxH / 2) - 10);

    ctx.fillStyle = '#C49A58';
    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('[AREA GAMBAR HIDANGAN - KOSONG HITAM]', width / 2, photoBoxY + (photoBoxH / 2) + 22);

    ctx.fillStyle = 'rgba(250, 246, 239, 0.45)';
    ctx.font = '11px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Default Template Placeholder • Siap Diisi Data Visual', width / 2, photoBoxY + (photoBoxH / 2) + 40);
    ctx.restore();

    // 4. Traditional Javanese Ornamental Borders
    const padding = 34;
    ctx.save();
    ctx.strokeStyle = '#C49A58';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(padding, padding, width - (padding * 2), height - (padding * 2));

    ctx.strokeStyle = 'rgba(250, 246, 239, 0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(padding + 8, padding + 8, width - ((padding + 8) * 2), height - ((padding + 8) * 2));

    // Corner decorative diamonds
    const corners = [
      [padding, padding],
      [width - padding, padding],
      [padding, height - padding],
      [width - padding, height - padding]
    ];
    corners.forEach(([cx, cy]) => {
      ctx.fillStyle = '#C49A58';
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // 5. Header Brand & Heritage Emblem
    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#C49A58';
    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('LARASRASA • PUSAKA DAPUR JAWA TENGAH', width / 2, padding + 36);

    ctx.fillStyle = 'rgba(250, 246, 239, 0.7)';
    ctx.font = 'italic 12px "Playfair Display", serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('Harmonisasi Bumbu Tradisi & Kreativitas Kuliner Modern', width / 2, padding + 56);
    ctx.restore();

    // 6. Creator Official Attribution Banner
    ctx.save();
    const creatorBoxY = height - 310;
    const creatorBoxWidth = Math.min(width - 120, 680);
    const creatorBoxX = (width - creatorBoxWidth) / 2;

    // Capsule background
    ctx.fillStyle = 'rgba(184, 92, 56, 0.92)';
    ctx.beginPath();
    ctx.roundRect(creatorBoxX, creatorBoxY, creatorBoxWidth, 48, [24]);
    ctx.fill();
    ctx.strokeStyle = '#FAF6EF';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Creator Label and Name
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FAF6EF';
    ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('KREASI RESEP RESMI • DICIPTAKAN OLEH:', width / 2, creatorBoxY + 18);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px "Playfair Display", Georgia, serif';
    ctx.fillText(recipe.creatorName || 'Kreator LarasRasa', width / 2, creatorBoxY + 38);
    ctx.restore();

    // 7. Recipe Title in Playfair Display Typography
    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 3;

    ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
    const titleText = recipe.shortTitle || recipe.title;

    // Wrap title if needed
    const maxTitleWidth = width - 140;
    const words = titleText.split(' ');
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const testLine = currentLine + ' ' + words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width < maxTitleWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = words[i];
      }
    }
    lines.push(currentLine);

    const titleStartY = height - 240;
    lines.forEach((line, idx) => {
      ctx.fillText(line, width / 2, titleStartY + (idx * 44));
    });

    // Subtitle / Regional Flair
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#C49A58';
    ctx.font = 'italic 16px "Playfair Display", Georgia, serif';
    ctx.fillText(recipe.javaneseTitle || 'Racikan Khas Dapur Jawa Tengah', width / 2, height - 128);
    ctx.restore();

    // 8. Metadata Badges Row (Duration, Servings, Spice, Method)
    ctx.save();
    const badgeY = height - 86;
    const badges = [
      `⏱ ${recipe.totalTime}`,
      `👥 ${recipe.servings} Porsi`,
      `🌶 Pedas ${recipe.spiceLevel}`,
      `🔥 ${recipe.cookingMethod.toUpperCase()}`
    ];

    const totalBadgesWidth = badges.length * 120;
    const startBadgeX = (width - totalBadgesWidth) / 2;

    badges.forEach((bText, bIdx) => {
      const bx = startBadgeX + (bIdx * 120);
      ctx.fillStyle = 'rgba(48, 32, 24, 0.85)';
      ctx.strokeStyle = 'rgba(196, 154, 88, 0.6)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(bx, badgeY, 110, 28, [14]);
      ctx.fill();
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#FAF6EF';
      ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(bText, bx + 55, badgeY + 18);
    });
    ctx.restore();

    // 9. Watermark Seal Footer
    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(250, 246, 239, 0.55)';
    ctx.font = '10px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Kreasi Mandiri Teruji • LarasRasa Khasanah Rasa Jawa Tengah • Hak Cipta Terpelihara', width / 2, height - (padding + 10));
    ctx.restore();
  },

  /**
   * Download the food poster canvas as a high-resolution PNG or JPEG file.
   */
  downloadPoster(canvas, recipeTitle, format = 'png') {
    if (!canvas) return false;

    const safeTitle = (recipeTitle || 'larasrasa-poster')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const isJpeg = format === 'jpeg' || format === 'jpg';
    const mimeType = isJpeg ? 'image/jpeg' : 'image/png';
    const ext = isJpeg ? 'jpg' : 'png';
    const quality = isJpeg ? 0.95 : undefined;

    const triggerDownload = (url) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = `larasrasa-${safeTitle}-poster.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    try {
      const dataUrl = canvas.toDataURL(mimeType, quality);
      triggerDownload(dataUrl);
      return true;
    } catch (err) {
      console.warn('Direct toDataURL failed, attempting toBlob fallback:', err);
      try {
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            triggerDownload(url);
            setTimeout(() => URL.revokeObjectURL(url), 5000);
          }
        }, mimeType, quality);
        return true;
      } catch (blobErr) {
        console.error('Canvas export error:', blobErr);
        return false;
      }
    }
  },

  /**
   * Export recipe data as a clean JSON schema document ready for database mapping.
   */
  downloadRecipeJson(recipe) {
    if (!recipe) return false;
    const safeTitle = (recipe.shortTitle || recipe.title || 'resep')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const payload = {
      template_version: '1.0',
      schema: 'larasrasa_recipe_entity',
      data: {
        id: recipe.id,
        slug: recipe.slug,
        title: recipe.title,
        short_title: recipe.shortTitle,
        javanese_title: recipe.javaneseTitle,
        creator_name: recipe.creatorName,
        creator_nickname: recipe.creatorNickname,
        description: recipe.description,
        region_name: recipe.regionName,
        servings: recipe.servings,
        prep_time: recipe.prepTime,
        cook_time: recipe.cookTime,
        total_time: recipe.totalTime,
        difficulty: recipe.difficulty,
        spice_level: recipe.spiceLevel,
        cooking_method: recipe.cookingMethod,
        dish_category: recipe.dishCategory,
        taste_profile: recipe.tasteProfile,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        chef_tips: recipe.chefTips,
        safety_notes: recipe.safetyNotes,
        created_at: recipe.createdAt || new Date().toISOString()
      }
    };

    try {
      const jsonStr = JSON.stringify(payload, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `larasrasa-${safeTitle}-template.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      return true;
    } catch (err) {
      console.error('JSON export error:', err);
      return false;
    }
  },

  /**
   * Download recipe document as PDF using jsPDF.
   * Clean, minimal, plain layout matching the exact on-screen recipe structure.
   */
  async generateRecipePdf(recipe, posterCanvas, isEn = false) {
    if (!recipe) return;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 18;
    const contentWidth = pageWidth - (margin * 2);

    let curY = margin;

    // Helper to check vertical space and add clean new page if needed
    const checkPageBreak = (neededHeight) => {
      if (curY + neededHeight > pageHeight - margin - 15) {
        doc.addPage();
        curY = margin + 5;
      }
    };

    // 1. Top Minimal Header
    doc.setTextColor(200, 76, 36); // #C84C24 Terracotta
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('LARASRASA • CULINARY INTELLIGENCE', margin, curY);

    doc.setTextColor(130, 120, 110);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(
      isEn ? 'Authentic Heritage Culinary Document • English Version' : 'Dokumen Resep Pusaka Autentik • Indonesian Version',
      margin,
      curY + 4.5
    );

    doc.text(
      'larasrasa.vercel.app',
      pageWidth - margin,
      curY + 4.5,
      { align: 'right' }
    );
    curY += 7.5;

    // Subtle divider
    doc.setDrawColor(220, 215, 205);
    doc.setLineWidth(0.3);
    doc.line(margin, curY, pageWidth - margin, curY);
    curY += 8;

    // 2. Recipe Title (Authentic Indonesian Title, Large & Bold)
    doc.setTextColor(25, 25, 25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    const titleLines = doc.splitTextToSize(recipe.title || '', contentWidth);
    doc.text(titleLines, margin, curY);
    curY += (titleLines.length * 7) + 2;

    // Subtitle in quotes with version info
    const subtitle = isEn 
      ? (recipe.subtitleEn || 'Authentic Heritage Recipe') 
      : (recipe.subtitleId || 'Racikan Resep Dapur Tradisi');
    const versionLabel = isEn ? 'English Version' : 'Indonesian Version';

    doc.setTextColor(200, 76, 36);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    const subText = `"${subtitle}"`;
    doc.text(subText, margin, curY);

    const subWidth = doc.getTextWidth(subText);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(140, 120, 105);
    doc.text(`(${versionLabel})`, margin + subWidth + 3, curY);
    curY += 6;

    // Creator Meta
    const creator = recipe.creatorName || (isEn ? 'LarasRasa Culinary Hearth' : 'Dapur Tradisi LarasRasa');
    const creatorText = isEn ? `Recipe Creator: ${creator}` : `Pencipta Resep: ${creator}`;
    doc.setTextColor(85, 75, 70);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(creatorText, margin, curY);
    curY += 8;

    // 3. Karakter Rasa & Konsep Olahan / Recipe Overview & Flavor Character
    const descText = isEn 
      ? (recipe.descriptionEn || recipe.description || recipe.philosophy)
      : (recipe.descriptionId || recipe.description || recipe.philosophy);
    
    if (descText) {
      doc.setDrawColor(230, 225, 215);
      doc.line(margin, curY, pageWidth - margin, curY);
      curY += 6;

      doc.setTextColor(25, 25, 25);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.text(isEn ? 'Recipe Overview & Flavor Character' : 'Karakter Rasa & Konsep Olahan', margin, curY);
      curY += 5.5;

      const paragraphs = descText.replace(/\*\*/g, '').split('\n\n').filter(Boolean);
      paragraphs.forEach(p => {
        const pLines = doc.splitTextToSize(p.trim(), contentWidth);
        checkPageBreak((pLines.length * 4.4) + 3);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(55, 45, 40);
        doc.text(pLines, margin, curY);
        curY += (pLines.length * 4.4) + 2.5;
      });
      curY += 2;
    }

    // 4. Ingredients & Kitchen Spices
    if (recipe.ingredients && recipe.ingredients.length > 0) {
      checkPageBreak(20);
      doc.setDrawColor(230, 225, 215);
      doc.line(margin, curY, pageWidth - margin, curY);
      curY += 6;

      doc.setTextColor(25, 25, 25);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.text(`${isEn ? 'Ingredients & Kitchen Spices' : 'Bahan & Bumbu Dapur'} (${recipe.servings || 4} ${isEn ? 'portions' : 'porsi'})`, margin, curY);
      curY += 6;

      const colWidth = (contentWidth - 8) / 2;
      const ings = recipe.ingredients;
      ings.forEach((ing, i) => {
        const col = i % 2;
        const isLeft = col === 0;
        if (isLeft) checkPageBreak(6.5);

        const x = margin + (col * (colWidth + 8));
        const y = curY;

        const name = isEn ? (ing.nameEn || ing.nameId || ing.name) : (ing.nameId || ing.name);
        const amt = ing.amount ? `${ing.amount} ${isEn ? (ing.unitEn || ing.unitId || ing.unit || '') : (ing.unitId || ing.unit || '')}` : '-';
        const note = isEn ? (ing.noteEn || ing.noteId || ing.note) : (ing.noteId || ing.note);
        const noteStr = note ? ` (${note})` : '';

        // Bullet point
        doc.setTextColor(200, 76, 36);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.text('•', x, y);

        // Ingredient line
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.2);
        doc.setTextColor(45, 35, 30);
        const fullIngText = `${name} — ${amt}${noteStr}`;
        const wrapped = doc.splitTextToSize(fullIngText, colWidth - 5);
        doc.text(wrapped[0] || fullIngText, x + 3.5, y);

        if (!isLeft || i === ings.length - 1) {
          curY += 5.8;
        }
      });
      curY += 3;
    }

    // 5. Traditional Kitchen Equipment
    if (recipe.equipment && recipe.equipment.length > 0) {
      checkPageBreak(14);
      doc.setTextColor(25, 25, 25);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(isEn ? 'Traditional Kitchen Equipment:' : 'Peralatan Dapur Tradisional:', margin, curY);
      curY += 4.5;

      const eqNames = recipe.equipment.map(eq => typeof eq === 'object' ? (isEn ? (eq.labelEn || eq.labelId) : (eq.labelId || eq.labelEn)) : eq).join('   •   ');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(70, 60, 55);
      doc.text(`•   ${eqNames}`, margin, curY);
      curY += 7;
    }

    // 6. Step-by-Step Cooking Guide
    const stepsList = isEn ? (recipe.stepsEn || recipe.steps) : (recipe.stepsId || recipe.steps) || [];
    if (stepsList.length > 0) {
      checkPageBreak(25);
      doc.setDrawColor(230, 225, 215);
      doc.line(margin, curY, pageWidth - margin, curY);
      curY += 6;

      doc.setTextColor(25, 25, 25);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.text(`${isEn ? 'Step-by-Step Cooking Guide' : 'Panduan Langkah Memasak'} (${stepsList.length} ${isEn ? 'steps' : 'tahap'})`, margin, curY);
      curY += 7;

      stepsList.forEach((st, idx) => {
        const stepNum = st.stepNumber || idx + 1;
        const sTitle = isEn ? (st.titleEn || st.titleId || st.title) : (st.titleId || st.title);
        const sDesc = isEn 
          ? (st.instructionEn || st.instructionId || st.instruction || st.descriptionEn || st.description)
          : (st.instructionId || st.instruction || st.descriptionId || st.description);
        const descLines = doc.splitTextToSize(sDesc, contentWidth - 6);
        const needed = 6 + (descLines.length * 4.2) + 3;

        checkPageBreak(needed);

        // Step number and title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(25, 25, 25);
        doc.text(`${stepNum}. ${sTitle}`, margin, curY);
        curY += 4.8;

        // Step Instruction
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.3);
        doc.setTextColor(55, 45, 40);
        doc.text(descLines, margin + 4, curY);
        curY += (descLines.length * 4.2) + 2.5;
      });
    }

    // 7. Page Footers for all pages
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setDrawColor(225, 220, 210);
      doc.setLineWidth(0.3);
      doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(140, 130, 120);
      doc.text(
        'LarasRasa • larasrasa.vercel.app',
        margin,
        pageHeight - 7
      );
      doc.text(
        isEn ? `Page ${i} of ${totalPages}` : `Halaman ${i} dari ${totalPages}`,
        pageWidth - margin,
        pageHeight - 7,
        { align: 'right' }
      );
    }

    // Save PDF
    const safeTitle = (recipe.shortTitle || recipe.title || 'larasrasa-resep')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const langSuffix = isEn ? '-en' : '-id';
    doc.save(`larasrasa-${safeTitle}-resep${langSuffix}.pdf`);
  },

};
