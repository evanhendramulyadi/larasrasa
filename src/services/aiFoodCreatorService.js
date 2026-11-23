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

// Culinary Asset pool for composite rendering
const RECIPE_IMAGE_POOL = {
  ayam: '/assets/images/recipes/garang-asem.jpg',
  sapi: '/assets/images/recipes/selat-solo.jpg',
  kambing: '/assets/images/recipes/sate-buntel.jpg',
  ikan: '/assets/images/recipes/soto-kudus.jpg',
  udang: '/assets/images/recipes/tahu-gimbal.jpg',
  tempe: '/assets/images/recipes/mendoan.jpg',
  tahu: '/assets/images/recipes/tempe-bacem.jpg',
  telur: '/assets/images/recipes/nasi-liwet.jpg',
  beras: '/assets/images/recipes/megono.jpg',
  sayur: '/assets/images/recipes/garang-asem.jpg',
  kudapan: '/assets/images/recipes/lumpia-semarang.jpg',
  default: '/assets/images/hero/hero-culinary.jpg'
};

export const aiFoodCreatorService = {
  /**
   * Synthesize a structured recipe with the AI engine.
   * Uses future Laravel API if available; otherwise uses deterministic Javanese culinary intelligence.
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

    // Try future Laravel REST AI endpoint if configured
    if (!API_CONFIG.useMock) {
      try {
        const response = await apiRequest('/ai/food-creator', {
          method: 'POST',
          body: JSON.stringify({
            ...payload,
            creatorName: resolvedCreatorName
          })
        });
        if (response?.data) return response.data;
      } catch (err) {
        console.warn('API backend belum aktif, menjalankan Smart Culinary Intelligence Engine:', err);
      }
    }

    // Realistic processing pause (800ms) for professional AI feel
    await new Promise(resolve => setTimeout(resolve, 800));

    return this._synthesizeLocalRecipe({
      creatorName: resolvedCreatorName,
      creatorNickname: (creatorNickname || resolvedCreatorName).trim(),
      selectedIngredientIds,
      cookingMethod,
      dishCategory,
      tasteProfile,
      spiceLevel,
      cookingDuration,
      servings: parseInt(servings) || 4,
      equipment,
      dietary,
      customNotes: (customNotes || '').trim(),
      imageStyle,
      aspectRatio,
      outputLanguage: outputLanguage || 'id'
    });
  },

  /**
   * Deterministic Culinary Intelligence Synthesizer
   */
  _synthesizeLocalRecipe(params) {
    const {
      creatorName,
      creatorNickname,
      selectedIngredientIds,
      cookingMethod,
      dishCategory,
      tasteProfile,
      spiceLevel,
      cookingDuration,
      servings,
      equipment,
      dietary,
      customNotes,
      imageStyle,
      aspectRatio,
      outputLanguage = 'id'
    } = params;

    const isEn = outputLanguage === 'en';

    const selectedIngredients = selectedIngredientIds
      .map(id => ALL_INGREDIENTS.find(i => i.id === id))
      .filter(Boolean);

    // Identify main protein / focus ingredient
    const proteinItem = selectedIngredients.find(i => i.category === 'protein') ||
      selectedIngredients.find(i => i.category === 'staple') ||
      selectedIngredients.find(i => i.category === 'vegetable') ||
      { id: 'tempe-kedelai', nameId: 'Tempe & Tahu Kedelai', nameEn: 'Soybean Tempeh & Tofu' };

    // Identify key aromatics
    const aromaticSpices = selectedIngredients.filter(i => i.category === 'spice');
    const keySpice1Id = aromaticSpices[0]?.nameId || 'Kemiri & Ketumbar Sangrai';
    const keySpice2Id = aromaticSpices[1]?.nameId || 'Bawang Merah Brebes';
    const keySpice1En = aromaticSpices[0]?.nameEn || 'Toasted Candlenut & Coriander';
    const keySpice2En = aromaticSpices[1]?.nameEn || 'Brebes Shallots';

    // Recipe is purely formulated in Indonesian as requested
    const keySpice1 = keySpice1Id;
    const keySpice2 = keySpice2Id;

    // Cooking method verbs
    const methodVerbMapId = {
      tumis: 'Tumis Wangi',
      ungkep: 'Ungkep Gurih',
      kukus: 'Kukus Daun Pisang',
      bakar: 'Panggang Bakar',
      goreng: 'Goreng Renyah'
    };
    const methodVerbMapEn = {
      tumis: 'Aromatic Stir-fried',
      ungkep: 'Savory Braised',
      kukus: 'Banana-Leaf Steamed',
      bakar: 'Charcoal-Grilled',
      goreng: 'Golden-Crisped'
    };
    const methodVerb = methodVerbMapId[cookingMethod] || 'Olahan';

    // Regional style flair
    const regionFlairMapId = {
      'manis-gurih': 'Manis Gurih Tradisi',
      'gurih-segar': 'Gurih Segar Berkaldu',
      'pedas-gurih': 'Pedas Gurih Mantap',
      'asam-segar': 'Segar Belimbing Wuluh',
      'pekat-rempah': 'Pusaka Rempah Tradisi'
    };
    const regionFlair = regionFlairMapId[tasteProfile] || 'Racikan Tradisi';

    const proteinMap = {
      'daging-sapi': 'Sapi',
      'ayam-kampung': 'Ayam',
      'daging-kambing': 'Kambing',
      'ikan-bandeng': 'Bandeng',
      'udang-jerbung': 'Udang',
      'tempe-kedelai': 'Tempe',
      'tahu-kuning': 'Tahu',
      'telur-bebek': 'Telur',
      'beras-pulen': 'Nasi',
      'mi-telur': 'Mi'
    };
    let proteinName = proteinMap[proteinItem.id];
    if (!proteinName) {
      proteinName = (proteinItem.nameId || '')
        .replace(/^Daging\s+/i, '')
        .replace(/^Ikan\s+/i, '')
        .replace(/\s+Segar$/i, '')
        .replace(/\s+Asli$/i, '')
        .split('/')[0]
        .split('&')[0]
        .split(' atau ')[0]
        .trim();
    }
    const methodVerbId = methodVerbMapId[cookingMethod] || 'Olahan';
    const keySpice1Clean = (keySpice1Id.split(' ')[0] || '').replace(/[^a-zA-Z]/g, '');

    // Single concise dish name without slashes, 'atau', or regional identifiers
    const dishBaseName = `${methodVerbId} ${proteinName} ${keySpice1Clean}`.trim();
    const fullTitle = dishBaseName;

    const subtitleId = 'Racikan Resep Dapur Tradisi';
    const subtitleEn = 'Authentic Heritage Recipe';
    const javaneseTitle = subtitleId;

    const slug = dishBaseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Prep & Cook durations
    const durationMap = {
      quick: { prep: 12, cook: 18, totalText: '30 Menit' },
      standard: { prep: 15, cook: 35, totalText: '50 Menit' },
      slow: { prep: 20, cook: 55, totalText: '75 Menit' }
    };
    const durationData = durationMap[cookingDuration] || durationMap.standard;

    // Generate Ingredients list scaled with exact amounts (pure Indonesian)
    const scaledIngredients = this._generateScaledIngredients(proteinItem, selectedIngredients, servings, dietary, false);

    // Generate Step by Step in Indonesian for authentic pure language output
    const stepsId = this._generateCookingSteps(methodVerbMapId[cookingMethod] || 'Olahan', proteinItem, selectedIngredients, servings, spiceLevel, tasteProfile, false);
    const stepsEn = this._generateCookingSteps(methodVerbMapEn[cookingMethod] || 'Artisanal', proteinItem, selectedIngredients, servings, spiceLevel, tasteProfile, true);
    const steps = stepsId;

    // Pick appropriate base food image
    let baseImage = RECIPE_IMAGE_POOL.default;
    if (proteinItem.id.includes('ayam')) baseImage = RECIPE_IMAGE_POOL.ayam;
    else if (proteinItem.id.includes('sapi')) baseImage = RECIPE_IMAGE_POOL.sapi;
    else if (proteinItem.id.includes('kambing')) baseImage = RECIPE_IMAGE_POOL.kambing;
    else if (proteinItem.id.includes('ikan')) baseImage = RECIPE_IMAGE_POOL.ikan;
    else if (proteinItem.id.includes('udang')) baseImage = RECIPE_IMAGE_POOL.udang;
    else if (proteinItem.id.includes('tempe')) baseImage = RECIPE_IMAGE_POOL.tempe;
    else if (proteinItem.id.includes('tahu')) baseImage = RECIPE_IMAGE_POOL.tahu;
    else if (dishCategory === 'sayur') baseImage = RECIPE_IMAGE_POOL.sayur;
    else if (dishCategory === 'kudapan') baseImage = RECIPE_IMAGE_POOL.kudapan;

    // Narrative Description in both ID and EN
    const p1Id = `Sebuah olahan resep pusaka tradisi yang mengawinkan teknik olah ${cookingMethod} dengan kemegahan aroma rempah ${keySpice1Id} dan ${keySpice2Id}. Komposisi bumbu pawon ini diracik secara saksama agar bumbu meresap sempurna dan mengeluarkan sari rasa terbaik.`;
    const p2Id = `Karakter rasa yang dihadirkan menonjolkan harmoni ${tasteProfile.replace('-', ' ')} yang gurih, mantap, dan lembut di lidah. Ditakar presisi untuk ${servings} porsi santapan hangat bersama keluarga tercinta.${customNotes ? ` Catatan selera khusus: "${customNotes}".` : ''}`;
    const p3Id = `Paling pas disajikan hangat mengepul bersama nasi putih pulen, lalapan segar, serta sambal pelengkap untuk menyempurnakan kelezatan cita rasa tradisi.`;
    const descriptionId = `${p1Id}\n\n${p2Id}\n\n${p3Id}`;

    const cookingMethodNounEn = {
      tumis: 'aromatic stir-frying',
      ungkep: 'slow braising',
      kukus: 'banana-leaf steaming',
      bakar: 'charcoal grilling',
      goreng: 'crisp frying'
    }[cookingMethod] || 'traditional cooking';

    const tasteProfileEnMap = {
      'manis-gurih': 'sweet and savory',
      'gurih-segar': 'savory and fresh',
      'pedas-gurih': 'spicy and savory',
      'asam-segar': 'tangy and fresh',
      'pekat-rempah': 'rich aromatic spice'
    };
    const tasteProfileEn = tasteProfileEnMap[tasteProfile] || 'harmonious sweet and savory';

    const p1En = `An authentic culinary creation marrying the heritage technique of ${cookingMethodNounEn} with the aromatic depth of ${keySpice1En} and ${keySpice2En}. Every spice proportion has been calibrated to draw out genuine warmth and rich flavors from the ingredients.`;
    const p2En = `The flavor journey presents a distinct ${tasteProfileEn} harmony that is smooth and comforting on the palate. Designed for ${servings} generous servings, this dish carries the timeless wisdom of traditional family meals.${customNotes ? ` Special flavor touch: "${customNotes}".` : ''}`;
    const p3En = `Best served hot alongside fluffy white rice, fresh raw vegetables (lalapan), and authentic sambal for a complete traditional culinary experience.`;
    const descriptionEn = `${p1En}\n\n${p2En}\n\n${p3En}`;

    const description = descriptionId;

    const chefTipsId = `Untuk mendapatkan sari rasa optimal, sangrai rempah kering (ketumbar dan kemiri) di atas wajan tanah liat atau wajan tebal tanpa minyak hingga semerbak wangi sebelum diulek halus. Jika menggunakan santan atau kaldu, gunakan api lilin kecil agar santan tidak pecah dan minyak aromatik terbit perlahan.`;
    const chefTipsEn = `To achieve optimal essential oil extraction, toast dry whole spices (coriander and candlenuts) on an ungreased heavy pan until fragrant before crushing in a stone mortar. If using coconut milk, maintain a gentle low simmer so the coconut cream does not separate and the spiced oils emerge smoothly.`;
    const chefTips = chefTipsId;

    const safetyNotesId = `Pastikan bahan protein dicuci bersih dan dimasak hingga matang merata (suhu internal minimal 74°C untuk unggas). Simpan sisa masakan dalam wadah tertutup di lemari pendingin dan hangatkan kembali secara menyeluruh sebelum disantap.`;
    const safetyNotesEn = `Ensure raw proteins are prepared hygienically and cooked to a safe internal temperature (minimum 74°C for poultry). Store leftovers in an airtight container under refrigeration and reheat thoroughly before savoring.`;
    const safetyNotes = safetyNotesId;

    return {
      id: `ai-food-${Date.now()}`,
      slug,
      title: fullTitle,
      shortTitle: dishBaseName,
      javaneseTitle,
      subtitleId,
      subtitleEn,
      creatorName,
      creatorNickname: creatorNickname || creatorName,
      creatorCredit: `Diciptakan Resmi oleh: ${creatorName}`,
      description,
      descriptionId,
      descriptionEn,
      regionName: 'Kreasi Dapur Tradisi',
      servings,
      prepTime: `${durationData.prep} Menit`,
      cookTime: `${durationData.cook} Menit`,
      totalTime: durationData.totalText,
      difficulty: cookingDuration === 'quick' ? 'Mudah' : 'Sedang',
      calories: `${Math.round(260 + (servings * 25))} kkal / porsi`,
      spiceLevel,
      cookingMethod,
      dishCategory,
      tasteProfile,
      outputLanguage: 'id',
      imageStyle,
      aspectRatio,
      baseImage,
      selectedIngredients: selectedIngredients.map(i => i.nameId),
      ingredients: scaledIngredients,
      equipment: equipment.map(eq => {
        const found = PREFERENCE_OPTIONS.equipmentList.find(e => e.id === eq);
        return {
          id: eq,
          labelId: found ? found.labelId : eq,
          labelEn: found ? found.labelEn : eq
        };
      }),
      steps,
      stepsId,
      stepsEn,
      chefTips,
      chefTipsId,
      chefTipsEn,
      safetyNotes,
      safetyNotesId,
      safetyNotesEn,
      createdAt: new Date().toISOString()
    };
  },

  _generateScaledIngredients(protein, selectedList, servings, dietary, isEn = false) {
    const items = [];
    const scale = servings / 4;

    const pushItem = (nameId, nameEn, amount, unitId, unitEn, noteId, noteEn) => {
      items.push({
        name: isEn ? nameEn : nameId,
        nameId,
        nameEn,
        amount,
        unit: isEn ? unitEn : unitId,
        unitId,
        unitEn,
        note: isEn ? noteEn : noteId,
        noteId,
        noteEn
      });
    };

    // Protein amount
    const pNameId = protein.nameId;
    const pNameEn = protein.nameEn || protein.nameId;
    if (protein.id.includes('daging') || protein.id.includes('ayam') || protein.id.includes('ikan')) {
      pushItem(pNameId, pNameEn, Math.round(500 * scale), 'g', 'g', 'potong sesuai selera', 'cut into medium serving pieces');
    } else if (protein.id.includes('tempe') || protein.id.includes('tahu')) {
      pushItem(pNameId, pNameEn, Math.max(1, Math.round(2 * scale)), 'papan / blok', 'blocks', 'potong dadu atau iris lebar', 'cubed or sliced into slabs');
    } else if (protein.id.includes('telur')) {
      pushItem(pNameId, pNameEn, Math.max(2, Math.round(4 * scale)), 'butir', 'pcs', 'rebus matang atau goreng mata sapi', 'hard-boiled or fried');
    } else {
      pushItem(pNameId, pNameEn, Math.round(350 * scale), 'g', 'g', 'siap olah', 'cleaned and prepped');
    }

    // Always essential aromatics
    pushItem('Bawang Merah Lokal Brebes', 'Brebes Red Shallots', Math.max(3, Math.round(6 * scale)), 'siung', 'cloves', 'kupas, 4 dihaluskan, 2 diiris tipis', 'peeled, 4 ground in paste, 2 sliced thin for frying');
    pushItem('Bawang Putih Kating', 'Kating Garlic', Math.max(2, Math.round(4 * scale)), 'siung', 'cloves', 'haluskan bersama bumbu dasar', 'finely ground in spice paste');

    // Include selected spices with precise measurements
    selectedList.forEach(item => {
      const iNameId = item.nameId;
      const iNameEn = item.nameEn || item.nameId;
      if (item.category === 'spice' && !item.id.includes('bawang')) {
        if (item.id === 'ketumbar') pushItem('Ketumbar Sangrai', 'Toasted Coriander Seeds', (1 * scale).toFixed(1), 'sdt', 'tsp', 'ulek halus', 'crushed fine');
        else if (item.id === 'kemiri') pushItem('Kemiri Sangrai', 'Toasted Candlenuts', Math.max(2, Math.round(3 * scale)), 'butir', 'pcs', 'haluskan', 'ground in paste');
        else if (item.id === 'lengkuas') pushItem('Lengkuas Muda', 'Young Galangal', 3, 'cm', 'cm', 'memarkan', 'bruised lightly');
        else if (item.id === 'jahe') pushItem('Jahe Emprit', 'Fresh Ginger', 2, 'cm', 'cm', 'memarkan', 'bruised');
        else if (item.id === 'kunyit') pushItem('Kunyit Bakar', 'Roasted Turmeric', 2, 'cm', 'cm', 'haluskan', 'finely ground');
        else if (item.id === 'serai') pushItem('Serai Wangi', 'Fragrant Lemongrass', Math.max(1, Math.round(2 * scale)), 'batang', 'stalks', 'memarkan ikat simpul', 'bruised and knotted');
        else if (item.id === 'daun-salam') pushItem('Daun Salam Kering', 'Indonesian Bay Leaves', Math.max(2, Math.round(3 * scale)), 'lembar', 'leaves', 'segar atau kering', 'fresh or dried');
        else if (item.id === 'daun-jeruk') pushItem('Daun Jeruk Purut', 'Kaffir Lime Leaves', Math.max(2, Math.round(4 * scale)), 'lembar', 'leaves', 'buang tulang daunnya', 'center rib removed');
        else if (item.id === 'gula-jawa') pushItem('Gula Kelapa Jawa Asli', 'Javanese Coconut Palm Sugar', Math.round(35 * scale), 'g', 'g', 'sisir halus', 'finely shaved');
        else if (item.id === 'asam-jawa') pushItem('Air Asam Jawa Matang', 'Tamarind Pulp Water', Math.max(1, Math.round(1.5 * scale)), 'sdm', 'tbsp', 'larutkan air hangat', 'dissolved in warm water');
        else if (item.id === 'kencur') pushItem('Kencur Segar', 'Fresh Kencur (Aromatic Ginger)', 2, 'cm', 'cm', 'ulek bersama bumbu', 'ground in spice paste');
        else if (item.id === 'kecombrang') pushItem('Bunga Kecombrang', 'Torch Ginger Flower', 1, 'kuntum', 'bud', 'iris tipis memanjang', 'thinly sliced');
        else pushItem(iNameId, iNameEn, 1, 'porsi secukupnya', 'portion as needed', 'sesuai selera', 'to taste');
      } else if (item.category === 'vegetable' && item.id !== 'santan-kelapa') {
        pushItem(iNameId, iNameEn, Math.round(100 * scale), 'g', 'g', 'bersihkan dan potong serasi', 'cleaned and sliced');
      }
    });

    // Coconut / broth liquid
    if (!dietary.includes('tanpa-santan')) {
      pushItem('Santan Kelapa Segar', 'Fresh Coconut Milk', Math.round(250 * scale), 'ml', 'ml', 'perasan pertama untuk kekentalan pas', 'first pressing for rich consistency');
    } else {
      pushItem('Air Kaldu Gurih Bening', 'Clear Savory Stock', Math.round(300 * scale), 'ml', 'ml', 'rebusan tulang / sayur alami', 'natural vegetable or bone broth');
    }

    // Seasonings
    pushItem(
      'Garam Laut & Merica Bubuk',
      'Sea Salt & White Pepper',
      1,
      'sdt / secukupnya',
      'tsp / to taste',
      'koreksi rasa di akhir',
      'adjust at final tasting'
    );
    pushItem(
      'Minyak Kelapa / Kelapa Sawit',
      'Coconut / Cooking Oil',
      2,
      'sdm',
      'tbsp',
      'untuk menumis bumbu halus',
      'for sautéing aromatic spice paste'
    );

    return items;
  },

  _generateCookingSteps(methodVerb, protein, selectedList, servings, spiceLevel, tasteProfile, isEn = false) {
    const steps = [];
    const pName = isEn ? (protein.nameEn || protein.nameId) : protein.nameId;

    if (isEn) {
      steps.push({
        stepNumber: 1,
        title: 'Ingredient Prep & Grinding Spice Paste',
        instruction: `Prepare a stone mortar. For about 10 minutes, grind the shallots, garlic, toasted candlenuts, coriander seeds, and sea salt into a smooth, fragrant paste. Lightly bruise the lemongrass stalk and galangal separately to release their volatile aromatic oils without tearing the stalk structure.`,
        sensoryMilestone: 'The sharp pungency of raw alliums softens into the warm nutty aroma of toasted candlenuts.'
      });

      steps.push({
        stepNumber: 2,
        title: 'Sautéing Spice Base & Releasing Aromatics',
        instruction: `Heat cooking oil in a wok over medium heat. Add the spice paste, bruised lemongrass, Indonesian bay leaves, and kaffir lime leaves. Sauté gently for 5 to 7 minutes with a wooden spoon until the paste turns golden-amber and fragrant spiced oil beads emerge to the surface.`,
        sensoryMilestone: 'A deeply comforting savory aroma envelopes the kitchen, indicating the paste is cooked through without raw edge.'
      });

      steps.push({
        stepNumber: 3,
        title: `Primary Cooking of ${pName}`,
        instruction: `Add ${pName} into the wok. Toss gently for about 5 minutes until every piece is coated in the rich spiced paste. Pour in the broth or coconut milk in batches, stirring smoothly in concentric circles from the wok edge.`,
        sensoryMilestone: 'The broth arrives at a gentle simmer with glistening golden spice droplets dancing along the rim.'
      });

      steps.push({
        stepNumber: 4,
        title: 'Simmering & Balancing the Flavor Profile',
        instruction: `Lower the stove flame to low. Stir in the shaved Javanese palm sugar, sliced chilies, and secondary ingredients. Cover and simmer patiently for 15 to 20 minutes until the broth reduces, infusing deeply for ${servings} family servings.`,
        sensoryMilestone: 'The protein turns wonderfully tender, soaked with spices through to the deepest fiber.'
      });

      steps.push({
        stepNumber: 5,
        title: 'Plating & Warm Finishing Garnish',
        instruction: `Taste and adjust final seasoning for 3 to 5 minutes to achieve a comforting harmony of sweet, savory, and warm spices. Transfer onto an earthenware platter lined with a clean banana leaf. Crown with crispy golden Brebes shallots while piping hot.`,
        sensoryMilestone: 'A glossy presentation with subtle steam carrying comforting notes of pandan and warm banana leaf.'
      });
    } else {
      steps.push({
        stepNumber: 1,
        title: 'Persiapan Bahan & Penumbukan Bumbu Halus',
        instruction: `Siapkan cobek batu. Selama sekitar 10 menit, haluskan bawang merah, bawang putih, kemiri sangrai, ketumbar, dan garam hingga lembut bertekstur. Memarkan serai dan lengkuas secara terpisah agar minyak atsirinya merekah tanpa merusak struktur batang.`,
        sensoryMilestone: 'Aroma tajam bawang mulai melunak dan bercampur harum kacang kemiri sangrai.'
      });

      steps.push({
        stepNumber: 2,
        title: 'Penumisan Bumbu Dasar & Pelepasan Minyak Aromatik',
        instruction: `Panaskan minyak dalam wajan di atas api sedang. Masukkan bumbu halus, serai, daun salam, dan daun jeruk. Tumis perlahan selama 5 hingga 7 menit dengan spatula kayu hingga bumbu matang kecokelatan dan minyak bumbu terbit ke permukaan (tanak).`,
        sensoryMilestone: 'Aroma wangi gurih memenuhi seisi dapur, menandakan bumbu tidak langu lagi.'
      });

      steps.push({
        stepNumber: 3,
        title: `Pengolahan Utama ${pName}`,
        instruction: `Masukkan ${pName} ke dalam wajan bumbu. Aduk merata selama sekitar 5 menit hingga seluruh permukaannya terbalut bumbu pekat. Tuangkan cairan (kaldu / santan) secara bertahap sambil diaduk perlahan dari pinggir wajan.`,
        sensoryMilestone: 'Kuah mulai mendidih lembut dengan gelembung-gelembung minyak keemasan di tepian.'
      });

      steps.push({
        stepNumber: 4,
        title: 'Ungkep & Penyelarasan Spektrum Rasa',
        instruction: `Kecilkan api kompor. Masukkan gula kelapa Jawa, irisan cabai, dan bahan pelengkap lainnya. Tutup wajan dan biarkan bumbu meresap serta mengungkep perlahan selama 15 hingga 20 menit hingga kuah mengental dan menyusut pas untuk sajian ${servings} porsi.`,
        sensoryMilestone: 'Daging menjadi sangat empuk dan bumbu meresap hingga ke lapisan serat terdalam.'
      });

      steps.push({
        stepNumber: 5,
        title: 'Penyajian Khidmat & Taburan Akhir',
        instruction: `Cicipi dan koreksi rasa akhir selama 3 hingga 5 menit agar seimbang antara manis, gurih, dan hangat rempah. Angkat dan tata dengan anggun di atas piring tanah liat atau piring keramik beralas daun pisang. Taburi bawang merah goreng renyah Brebes saat masih hangat.`,
        sensoryMilestone: 'Penampilan mengilap mengundang selera dengan asap tipis beraroma pandan dan daun pisang.'
      });
    }

    return steps;
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

    // 1. Solid Pure Black / Dark Elegant Background Fill (Sesuai instruksi: kosongin hitam aja)
    ctx.fillStyle = '#0F0C0A';
    ctx.fillRect(0, 0, width, height);

    // Subtle dark radial depth
    const darkGrad = ctx.createRadialGradient(width / 2, height / 2, width * 0.1, width / 2, height / 2, width * 0.75);
    darkGrad.addColorStop(0, '#1A1410');
    darkGrad.addColorStop(1, '#080605');
    ctx.fillStyle = darkGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Black Placeholder Center Box for Food Photograph (Kosongin hitam aja)
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
   * Download printable recipe document as PDF using jsPDF.
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
      isEn ? 'Authentic Heritage Culinary Document' : 'Dokumen Resep Pusaka Autentik',
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

    // Subtitle in quotes
    const subtitle = isEn 
      ? (recipe.subtitleEn || 'Authentic Heritage Recipe') 
      : (recipe.subtitleId || 'Racikan Resep Dapur Tradisi');
    doc.setTextColor(200, 76, 36);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.text(`"${subtitle}"`, margin, curY);
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

    // 4. Bahan & Bumbu Dapur / Ingredients & Kitchen Spices
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

    // 5. Peralatan Dapur Tradisional / Traditional Kitchen Equipment
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

    // 6. Tahapan Memasak / Panduan Langkah Memasak
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
        const technique = isEn ? (st.techniqueEn || st.techniqueId || st.technique) : (st.techniqueId || st.technique);
        const tip = isEn ? (st.tipEn || st.tipId || st.tip) : (st.tipId || st.tip);

        const descLines = doc.splitTextToSize(sDesc, contentWidth - 6);
        const tipLines = tip ? doc.splitTextToSize(`${isEn ? 'Technique Tip:' : 'Tips Olah:'} ${tip}`, contentWidth - 6) : [];
        const needed = 6 + (descLines.length * 4.2) + (tipLines.length ? (tipLines.length * 3.8) + 2 : 0) + 4;

        checkPageBreak(needed);

        // Step number and title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(25, 25, 25);
        doc.text(`${stepNum}. ${sTitle}`, margin, curY);

        if (technique) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(200, 76, 36);
          doc.text(`[${technique}]`, pageWidth - margin, curY, { align: 'right' });
        }
        curY += 4.8;

        // Step Instruction
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.3);
        doc.setTextColor(55, 45, 40);
        doc.text(descLines, margin + 4, curY);
        curY += (descLines.length * 4.2) + 1.5;

        // Technique tip if exists
        if (tipLines.length) {
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(7.8);
          doc.setTextColor(46, 77, 56);
          doc.text(tipLines, margin + 4, curY);
          curY += (tipLines.length * 3.8) + 1.5;
        }

        curY += 3.5;
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

    doc.save(`larasrasa-${safeTitle}-resep.pdf`);
  },

  /**
   * Generate an exquisite A4 Landscape achievement certificate for the creator.
   * Recognizes original concept exploration with AI assistance without false accreditation.
   */
  async generateCertificatePdf(recipe, options = {}) {
    if (!recipe) return;

    const isEn = options.lang === 'en';
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth(); // 297mm
    const pageHeight = doc.internal.pageSize.getHeight(); // 210mm
    const centerX = pageWidth / 2;

    // 1. Warm Ivory Background Fill
    doc.setFillColor(250, 246, 239); // #FAF6EF
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // 2. Dual Ornamental Borders
    // Outer Gold Border
    doc.setDrawColor(196, 154, 88); // #C49A58 Antique Gold
    doc.setLineWidth(1.8);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'S');

    // Inner Deep Espresso Border
    doc.setDrawColor(48, 32, 24); // #302018 Deep Espresso
    doc.setLineWidth(0.6);
    doc.rect(13.5, 13.5, pageWidth - 27, pageHeight - 27, 'S');

    // Decorative Corner Motifs (Double angle brackets)
    const corners = [
      [13.5, 13.5, 1, 1],
      [pageWidth - 13.5, 13.5, -1, 1],
      [13.5, pageHeight - 13.5, 1, -1],
      [pageWidth - 13.5, pageHeight - 13.5, -1, -1]
    ];
    doc.setDrawColor(184, 92, 56); // #B85C38 Terracotta
    doc.setLineWidth(1);
    corners.forEach(([cx, cy, dx, dy]) => {
      doc.line(cx, cy, cx + (dx * 6), cy);
      doc.line(cx, cy, cx, cy + (dy * 6));
      doc.setFillColor(196, 154, 88);
      doc.circle(cx + (dx * 3), cy + (dy * 3), 0.8, 'F');
    });

    // 3. Header Crest & Brand
    doc.setFillColor(48, 32, 24);
    doc.roundedRect(centerX - 45, 18, 90, 7, 1.5, 1.5, 'F');
    doc.setTextColor(196, 154, 88);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('★ LARASRASA • PUSAKA RASA JAWA TENGAH ★', centerX, 22.8, { align: 'center' });

    // 4. Certificate Title
    doc.setTextColor(48, 32, 24);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    const certTitle = isEn 
      ? 'CERTIFICATE OF CULINARY CREATION' 
      : 'PIAGAM APRESIASI KREASI KULINER';
    doc.text(certTitle, centerX, 36, { align: 'center' });

    // Subtitle
    doc.setTextColor(184, 92, 56);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10.5);
    const certSubtitle = isEn
      ? 'Recognition of Creative Recipe Exploration & Central Javanese Culinary Harmony'
      : 'Eksplorasi Konsep Rasa & Harmoni Dapur Pusaka Jawa Tengah';
    doc.text(certSubtitle, centerX, 43, { align: 'center' });

    // Decorative divider line under header
    doc.setDrawColor(229, 217, 197);
    doc.setLineWidth(0.4);
    doc.line(centerX - 60, 47, centerX + 60, 47);

    // 5. Presentation Lead-in
    doc.setTextColor(101, 67, 50);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const presentText = isEn
      ? 'This creative achievement is proudly presented with honor to:'
      : 'Piagam apresiasi kreativitas ini dengan bangga dan hormat diberikan kepada:';
    doc.text(presentText, centerX, 55, { align: 'center' });

    // 6. Creator Name (Prominent & Elegant)
    doc.setTextColor(48, 32, 24);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    const creatorName = (recipe.creatorName || 'Koki Kreator Nusantara').toUpperCase();
    doc.text(creatorName, centerX, 67, { align: 'center' });

    // Golden underline below name
    doc.setDrawColor(184, 92, 56);
    doc.setLineWidth(0.8);
    doc.line(centerX - 50, 71, centerX + 50, 71);

    // 7. Achievement Citation
    doc.setTextColor(80, 50, 35);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const citation = isEn
      ? 'In recognition of inventive dedication to the principles of Central Javanese flavor harmony (Laras Rasa), having synthesized an authentic original recipe concept and sensory profile titled:'
      : 'Atas dedikasi, kepekaan rasa, dan eksplorasi berlandaskan prinsip keselarasan bumbu Jawa (Laras Rasa), berhasil meracik konsep resep masakan orisinal bertajuk:';
    const citationLines = doc.splitTextToSize(citation, 210);
    doc.text(citationLines, centerX, 79, { align: 'center' });

    // 8. Recipe Title Box
    const boxY = 88;
    doc.setFillColor(242, 232, 216); // #F2E8D8
    doc.roundedRect(centerX - 90, boxY, 180, 20, 3, 3, 'F');
    doc.setDrawColor(196, 154, 88);
    doc.setLineWidth(0.6);
    doc.roundedRect(centerX - 90, boxY, 180, 20, 3, 3, 'S');

    doc.setTextColor(184, 92, 56);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    const fullRecipeTitle = `"${recipe.title || recipe.shortTitle}"`;
    doc.text(fullRecipeTitle, centerX, boxY + 8.5, { align: 'center' });

    doc.setTextColor(101, 67, 50);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.text(recipe.javaneseTitle || 'Racikan Khas Dapur Jawa Tengah', centerX, boxY + 15, { align: 'center' });

    // 9. Key Specifications Pill Bar
    const specY = 114;
    const specItems = [
      isEn ? `Method: ${(recipe.cookingMethod || '').toUpperCase()}` : `Metode: ${(recipe.cookingMethod || '').toUpperCase()}`,
      isEn ? `Servings: ${recipe.servings} Portions` : `Porsi: ${recipe.servings} Porsi`,
      isEn ? `Duration: ${recipe.totalTime}` : `Durasi: ${recipe.totalTime}`,
      isEn ? `Spice: Level ${recipe.spiceLevel}` : `Pedas: Level ${recipe.spiceLevel}`
    ];
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(48, 32, 24);
    doc.text(specItems.join('   •   '), centerX, specY, { align: 'center' });

    // 10. Key Spices Citation
    if (recipe.ingredients && recipe.ingredients.length > 0) {
      const topSpices = recipe.ingredients.slice(0, 5).map(i => i.name).join(', ');
      doc.setTextColor(119, 123, 82);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      const spiceLine = isEn ? `Key Ingredients: ${topSpices}` : `Komposisi Utama: ${topSpices}`;
      doc.text(spiceLine, centerX, specY + 6, { align: 'center' });
    }

    // 11. Dual Signatures & Central Seal
    const sigY = 158;

    // Left Signature: Culinary Heritage Curator
    doc.setDrawColor(101, 67, 50);
    doc.setLineWidth(0.4);
    doc.line(35, sigY, 95, sigY);
    doc.setTextColor(48, 32, 24);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(isEn ? 'Culinary Heritage Curator' : 'Kurator Khasanah Kuliner', 65, sigY + 5, { align: 'center' });
    doc.setTextColor(101, 67, 50);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(isEn ? 'LarasRasa Preservation Hearth' : 'Dapur Pelestarian LarasRasa', 65, sigY + 9, { align: 'center' });

    // Center Gold Seal (Vector Emblem)
    const sealX = centerX;
    const sealY = sigY - 2;
    doc.setDrawColor(196, 154, 88);
    doc.setFillColor(242, 232, 216);
    doc.circle(sealX, sealY, 13, 'FD');
    doc.setDrawColor(184, 92, 56);
    doc.setLineWidth(0.4);
    doc.circle(sealX, sealY, 11, 'S');

    doc.setTextColor(184, 92, 56);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.text('LARASRASA', sealX, sealY - 4.5, { align: 'center' });
    doc.setTextColor(196, 154, 88);
    doc.setFontSize(8.5);
    doc.text('★', sealX, sealY - 0.5, { align: 'center' });
    doc.setTextColor(48, 32, 24);
    doc.setFontSize(5.5);
    doc.text(isEn ? 'AUTHENTIC CONCEPT' : 'KREASI RESMI', sealX, sealY + 4, { align: 'center' });
    doc.text('JAWA TENGAH', sealX, sealY + 7, { align: 'center' });

    // Right Signature: AI Technologist
    doc.setDrawColor(101, 67, 50);
    doc.setLineWidth(0.4);
    doc.line(pageWidth - 95, sigY, pageWidth - 35, sigY);
    doc.setTextColor(48, 32, 24);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(isEn ? 'AI Culinary Specialist' : 'Spesialis Kuliner AI', pageWidth - 65, sigY + 5, { align: 'center' });
    doc.setTextColor(101, 67, 50);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(isEn ? 'Culinary Experiment Studio' : 'Laboratorium Eksperimen Rasa', pageWidth - 65, sigY + 9, { align: 'center' });

    // 12. Verification Code & Issue Date Bar
    const numId = Math.abs(recipe.id?.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0) || 849201) % 900000 + 100000;
    const certRefId = `LR-CERT-${new Date().getFullYear()}-${numId}`;
    const issueDateStr = isEn 
      ? new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
      : new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    doc.setTextColor(140, 120, 105);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text(isEn ? `REFERENCE CODE: ${certRefId}` : `KODE DOKUMEN: ${certRefId}`, 20, 185);
    doc.text(isEn ? `DATE OF ISSUE: ${issueDateStr}` : `TANGGAL TERBIT: ${issueDateStr}`, pageWidth - 20, 185, { align: 'right' });

    // 13. Transparent, Honest Disclaimer
    doc.setDrawColor(229, 217, 197);
    doc.setLineWidth(0.3);
    doc.line(20, 188, pageWidth - 20, 188);

    doc.setTextColor(150, 130, 115);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6.5);
    const disclaimer = isEn
      ? '* This certificate celebrates creative culinary concept exploration with LarasRasa AI Food Creator and does not constitute formal culinary certification, license, or food safety accreditation.'
      : '* Piagam ini diterbitkan sebagai tanda apresiasi kreativitas atas eksplorasi konsep resep bersama LarasRasa AI Food Creator, bukan sertifikasi profesi atau lisensi kuliner formal.';
    doc.text(disclaimer, centerX, 192.5, { align: 'center' });

    // 14. Save Certificate PDF
    const safeTitle = (recipe.shortTitle || recipe.title || 'kreasi')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    doc.save(`larasrasa-sertifikat-${safeTitle}.pdf`);
  }
};

