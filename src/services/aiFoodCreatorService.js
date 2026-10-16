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
    { id: 'tumis', labelId: 'Tumis Cepat Beraroma', labelEn: 'Quick Aromatic Stir-fry', descId: 'Minyak panas, bumbu rajang halus, tekstur renyah segar.' },
    { id: 'ungkep', labelId: 'Ungkep & Rebus Kuah Kaldu', labelEn: 'Slow Braise & Savory Broth', descId: 'Api kecil, kuah meresap hingga ke serat terdalam.' },
    { id: 'kukus', labelId: 'Kukus Bungkus Daun Pisang', labelEn: 'Steam in Banana Leaf', descId: 'Aroma daun pisang layu menyatu dengan sari bumbu alami.' },
    { id: 'bakar', labelId: 'Panggang / Bakar Arang Batok', labelEn: 'Charcoal Grill & Glaze', descId: 'Karamelisasi kecap manis dan asap arang menggoda selera.' },
    { id: 'goreng', labelId: 'Goreng Krispi / Mendoan Lembut', labelEn: 'Crispy / Soft Pan-fry', descId: 'Lapisan tepung berempah gurih dengan sentuhan daun bawang.' }
  ],
  dishCategories: [
    { id: 'lauk', labelId: 'Lauk Utama Dapur', labelEn: 'Main Dish' },
    { id: 'sayur', labelId: 'Sayur & Kuah Hangat', labelEn: 'Soups & Warm Broths' },
    { id: 'kudapan', labelId: 'Kudapan Tradisional', labelEn: 'Traditional Snack' },
    { id: 'nasi-campur', labelId: 'Hidangan Nasi Komplet', labelEn: 'Complete Rice Platter' },
    { id: 'sambal', labelId: 'Sambal & Pendamping Bumbu', labelEn: 'Sambal & Condiments' }
  ],
  tasteProfiles: [
    { id: 'manis-gurih', labelId: 'Manis Gurih Harmonis (Khas Solo & Mataraman)', labelEn: 'Sweet & Savory (Solo/Mataraman)' },
    { id: 'gurih-segar', labelId: 'Gurih Segar Berkaldu (Khas Kudus & Semarang)', labelEn: 'Savory & Fresh Broth (Kudus/Semarang)' },
    { id: 'pedas-gurih', labelId: 'Pedas Gurih Mantap (Khas Pantura & Banyumas)', labelEn: 'Spicy & Savory (Pantura/Banyumas)' },
    { id: 'asam-segar', labelId: 'Asam Segar Belimbing & Tomat Hijau', labelEn: 'Tangy Fresh Bilimbi & Green Tomato' },
    { id: 'pekat-rempah', labelId: 'Pekat Kaya Rempah Keraton', labelEn: 'Rich Spiced Royal Palace' }
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

    if (!creatorName || creatorName.trim().length === 0) {
      throw new Error(outputLanguage === 'en' 
        ? 'Creator full name is required for official recipe attribution and certification.'
        : 'Nama lengkap pencipta resep wajib diisi untuk tanda bukti kepemilikan cipta resep.');
    }

    if (!Array.isArray(selectedIngredientIds) || selectedIngredientIds.length === 0) {
      throw new Error(outputLanguage === 'en'
        ? 'Select at least 1 ingredient or spice to begin culinary synthesis.'
        : 'Pilih minimal 1 bahan atau rempah untuk memulai penciptaan resep kuliner.');
    }

    // Try future Laravel REST AI endpoint if configured
    if (!API_CONFIG.useMock) {
      try {
        const response = await apiRequest('/ai/food-creator', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        if (response?.data) return response.data;
      } catch (err) {
        console.warn('API backend belum aktif, menjalankan Smart Culinary Intelligence Engine:', err);
      }
    }

    // Realistic processing pause (800ms) for professional AI feel
    await new Promise(resolve => setTimeout(resolve, 800));

    return this._synthesizeLocalRecipe({
      creatorName: creatorName.trim(),
      creatorNickname: (creatorNickname || '').trim(),
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

    const keySpice1 = isEn ? keySpice1En : keySpice1Id;
    const keySpice2 = isEn ? keySpice2En : keySpice2Id;

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
    const methodVerb = isEn ? (methodVerbMapEn[cookingMethod] || 'Artisanal') : (methodVerbMapId[cookingMethod] || 'Olahan');

    // Regional style flair
    const regionFlairMapId = {
      'manis-gurih': 'Khas Solo Mataraman',
      'gurih-segar': 'Khas Pesisir Kudus',
      'pedas-gurih': 'Khas Banyumasan',
      'asam-segar': 'Segar Belimbing Wuluh',
      'pekat-rempah': 'Pusaka Kraton Jawa'
    };
    const regionFlairMapEn = {
      'manis-gurih': 'Solo Mataraman Style',
      'gurih-segar': 'Kudus Coastal Style',
      'pedas-gurih': 'Banyumasan Rustic Style',
      'asam-segar': 'Tangy Bilimbi Infused',
      'pekat-rempah': 'Royal Javanese Spiced'
    };
    const regionFlair = isEn ? (regionFlairMapEn[tasteProfile] || 'Central Javanese Style') : (regionFlairMapId[tasteProfile] || 'Khas Jawa Tengah');

    const proteinName = isEn ? (proteinItem.nameEn || proteinItem.nameId) : proteinItem.nameId.replace('Daging ', '').replace(' Segar', '');

    // Construct Title and Slug
    const dishBaseName = isEn 
      ? `${methodVerb} ${proteinName} with ${keySpice1.split(' ')[0]} (${regionFlair})`
      : `${methodVerb} ${proteinName} ${keySpice1.split(' ')[0]} ${regionFlair}`;
    
    const fullTitle = isEn
      ? `Recipe by ${creatorName}: ${dishBaseName}`
      : `Kreasi ${creatorName}: ${dishBaseName}`;

    const javaneseTitle = isEn
      ? `${creatorNickname || creatorName}'s Hearth Kitchen — ${dishBaseName}`
      : `Racikan Dapur ${creatorNickname || creatorName} — ${dishBaseName}`;

    const slug = dishBaseName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Prep & Cook durations
    const durationMap = {
      quick: { prep: 12, cook: 18, totalText: isEn ? '30 Mins' : '30 Menit' },
      standard: { prep: 15, cook: 35, totalText: isEn ? '50 Mins' : '50 Menit' },
      slow: { prep: 20, cook: 55, totalText: isEn ? '75 Mins' : '75 Menit' }
    };
    const durationData = durationMap[cookingDuration] || durationMap.standard;

    // Estimate cost per serving
    const costPerServing = proteinItem.id.includes('daging') ? 22000 : 12000;
    const totalEstCost = isEn 
      ? `IDR ${(costPerServing * servings).toLocaleString('en-US')}`
      : `Rp ${(costPerServing * servings).toLocaleString('id-ID')}`;

    // Generate Ingredients list scaled with exact amounts
    const scaledIngredients = this._generateScaledIngredients(proteinItem, selectedIngredients, servings, dietary, isEn);

    // Generate Step by Step
    const steps = this._generateCookingSteps(methodVerb, proteinItem, selectedIngredients, servings, spiceLevel, tasteProfile, isEn);

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

    // Narrative Description
    const description = isEn
      ? `An original recipe concept envisioned by **${creatorName}**, marrying the traditional art of ${cookingMethod} with the aromatic warmth of ${keySpice1} and ${keySpice2}. Presenting a calibrated ${tasteProfile.replace('-', ' and ')} profile on the palate, this dish is portioned for ${servings} family servings.${customNotes ? ` Creator's personal vision: "${customNotes}".` : ''}`
      : `Sebuah mahakarya resep baru yang dirancang khusus oleh **${creatorName}**, mengawinkan teknik olah ${cookingMethod} dengan kemegahan rempah ${keySpice1} dan ${keySpice2}. Menghadirkan karakter rasa ${tasteProfile.replace('-', ' ')} yang lembut di lidah, hidangan ini dirancang untuk ${servings} porsi santap bersama keluarga.${customNotes ? ` Sentuhan personal: "${customNotes}".` : ''}`;

    const chefTips = isEn
      ? `To achieve optimal essential oil extraction, toast dry whole spices (coriander and candlenuts) on an ungreased heavy pan until fragrant before crushing in a stone mortar. If using coconut milk, maintain a gentle low simmer so the coconut cream does not separate and the spiced oils emerge smoothly.`
      : `Untuk mendapatkan sari rasa optimal, sangrai rempah kering (ketumbar dan kemiri) di atas wajan tanah liat atau wajan tebal tanpa minyak hingga semerbak wangi sebelum diulek halus. Jika menggunakan santan atau kaldu, gunakan api lilin kecil agar santan tidak pecah dan minyak aromatik terbit perlahan.`;

    const safetyNotes = isEn
      ? `Ensure raw proteins are prepared hygienically and cooked to a safe internal temperature (minimum 74°C for poultry). Store leftovers in an airtight container under refrigeration and reheat thoroughly before savoring.`
      : `Pastikan bahan protein dicuci bersih dan dimasak hingga matang merata (suhu internal minimal 74°C untuk unggas). Simpan sisa masakan dalam wadah tertutup di lemari pendingin dan hangatkan kembali secara menyeluruh sebelum disantap.`;

    return {
      id: `ai-food-${Date.now()}`,
      slug,
      title: fullTitle,
      shortTitle: dishBaseName,
      javaneseTitle,
      creatorName,
      creatorNickname: creatorNickname || creatorName,
      creatorCredit: isEn ? `Officially Created by: ${creatorName}` : `Diciptakan Resmi oleh: ${creatorName}`,
      description,
      regionName: isEn ? 'Central Java (Original Creation)' : 'Jawa Tengah (Kreasi Mandiri)',
      servings,
      prepTime: isEn ? `${durationData.prep} Mins` : `${durationData.prep} Menit`,
      cookTime: isEn ? `${durationData.cook} Mins` : `${durationData.cook} Menit`,
      totalTime: durationData.totalText,
      estimatedCost: totalEstCost,
      difficulty: cookingDuration === 'quick' ? (isEn ? 'Easy' : 'Mudah') : (isEn ? 'Medium' : 'Sedang'),
      calories: isEn ? `${Math.round(260 + (servings * 25))} kcal / serving` : `${Math.round(260 + (servings * 25))} kkal / porsi`,
      spiceLevel,
      cookingMethod,
      dishCategory,
      tasteProfile,
      outputLanguage,
      imageStyle,
      aspectRatio,
      baseImage,
      selectedIngredients: selectedIngredients.map(i => isEn ? (i.nameEn || i.nameId) : i.nameId),
      ingredients: scaledIngredients,
      equipment: equipment.map(eq => {
        const found = PREFERENCE_OPTIONS.equipmentList.find(e => e.id === eq);
        return isEn ? (found ? found.labelEn : eq) : (found ? found.labelId : eq);
      }),
      steps,
      chefTips,
      safetyNotes,
      createdAt: new Date().toISOString()
    };
  },

  _generateScaledIngredients(protein, selectedList, servings, dietary, isEn = false) {
    const items = [];
    const scale = servings / 4;

    // Protein amount
    const proteinName = isEn ? (protein.nameEn || protein.nameId) : protein.nameId;
    if (protein.id.includes('daging') || protein.id.includes('ayam') || protein.id.includes('ikan')) {
      items.push({ 
        name: proteinName, 
        amount: Math.round(500 * scale), 
        unit: 'g', 
        note: isEn ? 'cut into medium serving pieces' : 'potong sesuai selera' 
      });
    } else if (protein.id.includes('tempe') || protein.id.includes('tahu')) {
      items.push({ 
        name: proteinName, 
        amount: Math.max(1, Math.round(2 * scale)), 
        unit: isEn ? 'blocks' : 'papan / blok', 
        note: isEn ? 'cubed or sliced into slabs' : 'potong dadu atau iris lebar' 
      });
    } else if (protein.id.includes('telur')) {
      items.push({ 
        name: proteinName, 
        amount: Math.max(2, Math.round(4 * scale)), 
        unit: isEn ? 'pcs' : 'butir', 
        note: isEn ? 'hard-boiled or fried' : 'rebus matang atau goreng mata sapi' 
      });
    } else {
      items.push({ 
        name: proteinName, 
        amount: Math.round(350 * scale), 
        unit: 'g', 
        note: isEn ? 'cleaned and prepped' : 'siap olah' 
      });
    }

    // Always essential aromatics
    items.push({ 
      name: isEn ? 'Brebes Red Shallots' : 'Bawang Merah Lokal Brebes', 
      amount: Math.max(3, Math.round(6 * scale)), 
      unit: isEn ? 'cloves' : 'siung', 
      note: isEn ? 'peeled, 4 ground in paste, 2 sliced thin for frying' : 'kupas, 4 dihaluskan, 2 diiris tipis' 
    });
    items.push({ 
      name: isEn ? 'Kating Garlic' : 'Bawang Putih Kating', 
      amount: Math.max(2, Math.round(4 * scale)), 
      unit: isEn ? 'cloves' : 'siung', 
      note: isEn ? 'finely ground in spice paste' : 'haluskan bersama bumbu dasar' 
    });

    // Include selected spices with precise measurements
    selectedList.forEach(item => {
      const iName = isEn ? (item.nameEn || item.nameId) : item.nameId;
      if (item.category === 'spice' && !item.id.includes('bawang')) {
        if (item.id === 'ketumbar') items.push({ name: isEn ? 'Toasted Coriander Seeds' : 'Ketumbar Sangrai', amount: (1 * scale).toFixed(1), unit: isEn ? 'tsp' : 'sdt', note: isEn ? 'crushed fine' : 'ulek halus' });
        else if (item.id === 'kemiri') items.push({ name: isEn ? 'Toasted Candlenuts' : 'Kemiri Sangrai', amount: Math.max(2, Math.round(3 * scale)), unit: isEn ? 'pcs' : 'butir', note: isEn ? 'ground in paste' : 'haluskan' });
        else if (item.id === 'lengkuas') items.push({ name: isEn ? 'Young Galangal' : 'Lengkuas Muda', amount: 3, unit: 'cm', note: isEn ? 'bruised lightly' : 'memarkan' });
        else if (item.id === 'jahe') items.push({ name: isEn ? 'Fresh Ginger' : 'Jahe Emprit', amount: 2, unit: 'cm', note: isEn ? 'bruised' : 'memarkan' });
        else if (item.id === 'kunyit') items.push({ name: isEn ? 'Roasted Turmeric' : 'Kunyit Bakar', amount: 2, unit: 'cm', note: isEn ? 'finely ground' : 'haluskan' });
        else if (item.id === 'serai') items.push({ name: isEn ? 'Fragrant Lemongrass' : 'Serai Wangi', amount: Math.max(1, Math.round(2 * scale)), unit: isEn ? 'stalks' : 'batang', note: isEn ? 'bruised and knotted' : 'memarkan ikat simpul' });
        else if (item.id === 'daun-salam') items.push({ name: isEn ? 'Indonesian Bay Leaves' : 'Daun Salam Kering', amount: Math.max(2, Math.round(3 * scale)), unit: isEn ? 'leaves' : 'lembar', note: isEn ? 'fresh or dried' : 'segar atau kering' });
        else if (item.id === 'daun-jeruk') items.push({ name: isEn ? 'Kaffir Lime Leaves' : 'Daun Jeruk Purut', amount: Math.max(2, Math.round(4 * scale)), unit: isEn ? 'leaves' : 'lembar', note: isEn ? 'center rib removed' : 'buang tulang daunnya' });
        else if (item.id === 'gula-jawa') items.push({ name: isEn ? 'Javanese Coconut Palm Sugar' : 'Gula Kelapa Jawa Asli', amount: Math.round(35 * scale), unit: 'g', note: isEn ? 'finely shaved' : 'sisir halus' });
        else if (item.id === 'asam-jawa') items.push({ name: isEn ? 'Tamarind Pulp Water' : 'Air Asam Jawa Matang', amount: Math.max(1, Math.round(1.5 * scale)), unit: isEn ? 'tbsp' : 'sdm', note: isEn ? 'dissolved in warm water' : 'larutkan air hangat' });
        else if (item.id === 'kencur') items.push({ name: isEn ? 'Fresh Kencur (Aromatic Ginger)' : 'Kencur Segar', amount: 2, unit: 'cm', note: isEn ? 'ground in spice paste' : 'ulek bersama bumbu' });
        else if (item.id === 'kecombrang') items.push({ name: isEn ? 'Torch Ginger Flower' : 'Bunga Kecombrang', amount: 1, unit: isEn ? 'bud' : 'kuntum', note: isEn ? 'thinly sliced' : 'iris tipis memanjang' });
        else items.push({ name: iName, amount: 1, unit: isEn ? 'portion as needed' : 'porsi secukupnya', note: isEn ? 'to taste' : 'sesuai selera' });
      } else if (item.category === 'vegetable' && item.id !== 'santan-kelapa') {
        items.push({ name: iName, amount: Math.round(100 * scale), unit: 'g', note: isEn ? 'cleaned and sliced' : 'bersihkan dan potong serasi' });
      }
    });

    // Coconut / broth liquid
    if (!dietary.includes('tanpa-santan')) {
      items.push({ 
        name: isEn ? 'Fresh Coconut Milk' : 'Santan Kelapa Segar', 
        amount: Math.round(250 * scale), 
        unit: 'ml', 
        note: isEn ? 'first pressing for rich consistency' : 'perasan pertama untuk kekentalan pas' 
      });
    } else {
      items.push({ 
        name: isEn ? 'Clear Savory Stock' : 'Air Kaldu Gurih Bening', 
        amount: Math.round(300 * scale), 
        unit: 'ml', 
        note: isEn ? 'natural vegetable or bone broth' : 'rebusan tulang / sayur alami' 
      });
    }

    // Seasonings
    items.push({ 
      name: isEn ? 'Sea Salt & White Pepper' : 'Garam Laut & Merica Bubuk', 
      amount: 1, 
      unit: isEn ? 'tsp / to taste' : 'sdt / secukupnya', 
      note: isEn ? 'adjust at final tasting' : 'koreksi rasa di akhir' 
    });
    items.push({ 
      name: isEn ? 'Coconut / Cooking Oil' : 'Minyak Kelapa / Kelapa Sawit', 
      amount: 2, 
      unit: isEn ? 'tbsp' : 'sdm', 
      note: isEn ? 'for sautéing aromatic spice paste' : 'untuk menumis bumbu halus' 
    });

    return items;
  },

  _generateCookingSteps(methodVerb, protein, selectedList, servings, spiceLevel, tasteProfile, isEn = false) {
    const steps = [];
    const pName = isEn ? (protein.nameEn || protein.nameId) : protein.nameId;

    if (isEn) {
      steps.push({
        stepNumber: 1,
        title: 'Ingredient Prep & Grinding Spice Paste',
        instruction: `Prepare a stone mortar. Grind the shallots, garlic, toasted candlenuts, coriander seeds, and sea salt into a smooth, fragrant paste. Lightly bruise the lemongrass stalk and galangal separately to release their volatile aromatic oils without tearing the stalk structure.`,
        sensoryMilestone: 'The sharp pungency of raw alliums softens into the warm nutty aroma of toasted candlenuts.'
      });

      steps.push({
        stepNumber: 2,
        title: 'Sautéing Spice Base & Releasing Aromatics',
        instruction: `Heat cooking oil in a wok over medium heat. Add the spice paste, bruised lemongrass, Indonesian bay leaves, and kaffir lime leaves. Sauté gently with a wooden spoon until the paste turns golden-amber and fragrant spiced oil beads emerge to the surface.`,
        sensoryMilestone: 'A deeply comforting savory aroma envelopes the kitchen, indicating the paste is cooked through without raw edge.'
      });

      steps.push({
        stepNumber: 3,
        title: `Primary Cooking of ${pName}`,
        instruction: `Add ${pName} into the wok. Toss gently until every piece is coated in the rich spiced paste. Pour in the broth or coconut milk in batches, stirring smoothly in concentric circles from the wok edge.`,
        sensoryMilestone: 'The broth arrives at a gentle simmer with glistening golden spice droplets dancing along the rim.'
      });

      steps.push({
        stepNumber: 4,
        title: 'Simmering & Balancing the Flavor Profile',
        instruction: `Lower the stove flame to low. Stir in the shaved Javanese palm sugar, sliced chilies, and secondary ingredients. Cover and simmer patiently (${tasteProfile}) until the broth reduces and infuses thoroughly for ${servings} family servings.`,
        sensoryMilestone: 'The protein turns wonderfully tender, soaked with spices through to the deepest fiber.'
      });

      steps.push({
        stepNumber: 5,
        title: 'Plating & Warm Finishing Garnish',
        instruction: `Taste and adjust final seasoning (achieving a comforting harmony of sweet, savory, and warm spices). Transfer onto an earthenware platter lined with a clean banana leaf. Crown with crispy golden Brebes shallots while piping hot.`,
        sensoryMilestone: 'A glossy presentation with subtle steam carrying comforting notes of pandan and warm banana leaf.'
      });
    } else {
      steps.push({
        stepNumber: 1,
        title: 'Persiapan Bahan & Penumbukan Bumbu Halus',
        instruction: `Siapkan cobek batu. Haluskan bawang merah, bawang putih, kemiri sangrai, ketumbar, dan garam hingga lembut bertekstur. Memarkan serai dan lengkuas secara terpisah agar minyak atsirinya merekah tanpa merusak struktur batang.`,
        sensoryMilestone: 'Aroma tajam bawang mulai melunak dan bercampur harum kacang kemiri sangrai.'
      });

      steps.push({
        stepNumber: 2,
        title: 'Penumisan Bumbu Dasar & Pelepasan Minyak Aromatik',
        instruction: `Panaskan minyak dalam wajan di atas api sedang. Masukkan bumbu halus, serai, daun salam, dan daun jeruk. Tumis perlahan dengan spatula kayu hingga bumbu matang kecokelatan dan minyak bumbu terbit ke permukaan (tanak).`,
        sensoryMilestone: 'Aroma wangi gurih memenuhi seisi dapur, menandakan bumbu tidak langu lagi.'
      });

      steps.push({
        stepNumber: 3,
        title: `Pengolahan Utama ${pName}`,
        instruction: `Masukkan ${pName} ke dalam wajan bumbu. Aduk merata hingga seluruh permukaannya terbalut bumbu pekat. Tuangkan cairan (kaldu / santan) secara bertahap sambil diaduk perlahan dari pinggir wajan.`,
        sensoryMilestone: 'Kuah mulai mendidih lembut dengan gelembung-gelembung minyak keemasan di tepian.'
      });

      steps.push({
        stepNumber: 4,
        title: 'Ungkep & Penyelarasan Spektrum Rasa',
        instruction: `Kecilkan api kompor. Masukkan gula kelapa Jawa, irisan cabai, dan bahan pelengkap lainnya. Tutup wajan dan biarkan bumbu meresap (${tasteProfile}) hingga kuah mengental dan menyusut sesuai selera sajian ${servings} porsi.`,
        sensoryMilestone: 'Daging menjadi sangat empuk dan bumbu meresap hingga ke lapisan serat terdalam.'
      });

      steps.push({
        stepNumber: 5,
        title: 'Penyajian Khidmat & Taburan Akhir',
        instruction: `Cicipi dan koreksi rasa akhir (seimbang antara manis, gurih, dan hangat rempah). Angkat dan tata dengan anggun di atas piring tanah liat atau piring keramik beralas daun pisang. Taburi bawang merah goreng renyah Brebes saat masih hangat.`,
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

    // Load base image
    const img = new Image();
    img.crossOrigin = 'anonymous';

    await new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => {
        // Fallback to solid background if image fails
        resolve(false);
      };
      img.src = recipe.baseImage || '/assets/images/hero/hero-culinary.jpg';
    });

    // 1. Draw Food Image (Cover Fill)
    if (img.width > 0) {
      const scale = Math.max(width / img.width, height / img.height);
      const x = (width / 2) - (img.width / 2) * scale;
      const y = (height / 2) - (img.height / 2) * scale;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    } else {
      ctx.fillStyle = '#302018';
      ctx.fillRect(0, 0, width, height);
    }

    // 2. Visual Style Filters & Tints
    const style = options.imageStyle || recipe.imageStyle || 'editorial';
    if (style === 'oil-painting') {
      // Warm amber painterly wash
      ctx.fillStyle = 'rgba(196, 154, 88, 0.22)';
      ctx.fillRect(0, 0, width, height);
      // Soft sepia overlay
      ctx.fillStyle = 'rgba(48, 32, 24, 0.35)';
      ctx.fillRect(0, 0, width, height);
    } else if (style === 'fine-dining') {
      // Heavy dramatic moody vignette
      const radGrad = ctx.createRadialGradient(width / 2, height * 0.4, 80, width / 2, height * 0.45, width * 0.7);
      radGrad.addColorStop(0, 'rgba(0, 0, 0, 0.05)');
      radGrad.addColorStop(1, 'rgba(15, 10, 8, 0.85)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);
    } else if (style === 'batik-art') {
      // Warm terracotta wash
      ctx.fillStyle = 'rgba(184, 92, 56, 0.18)';
      ctx.fillRect(0, 0, width, height);
    }

    // 3. Vignette & Typography Backdrop Gradients
    // Top gradient for branding readability
    const topGrad = ctx.createLinearGradient(0, 0, 0, height * 0.28);
    topGrad.addColorStop(0, 'rgba(15, 10, 7, 0.88)');
    topGrad.addColorStop(0.7, 'rgba(30, 20, 14, 0.55)');
    topGrad.addColorStop(1, 'rgba(30, 20, 14, 0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, width, height * 0.28);

    // Bottom gradient for title and creator badge readability
    const botGrad = ctx.createLinearGradient(0, height * 0.42, 0, height);
    botGrad.addColorStop(0, 'rgba(15, 10, 7, 0)');
    botGrad.addColorStop(0.4, 'rgba(15, 10, 7, 0.75)');
    botGrad.addColorStop(0.85, 'rgba(15, 10, 7, 0.94)');
    botGrad.addColorStop(1, 'rgba(10, 6, 4, 0.98)');
    ctx.fillStyle = botGrad;
    ctx.fillRect(0, height * 0.42, width, height * 0.58);

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
    if (!canvas) return;

    const safeTitle = (recipeTitle || 'larasrasa-poster')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const isJpeg = format === 'jpeg' || format === 'jpg';
    const mimeType = isJpeg ? 'image/jpeg' : 'image/png';
    const ext = isJpeg ? 'jpg' : 'png';
    const quality = isJpeg ? 0.92 : undefined;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `larasrasa-${safeTitle}-poster.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    }, mimeType, quality);
  },

  /**
   * Download printable recipe document as PDF using jsPDF.
   */
  async generateRecipePdf(recipe, posterCanvas) {
    if (!recipe) return;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 16;
    const contentWidth = pageWidth - (margin * 2);

    // --- Page 1: Official Recipe Document & Overview ---

    // Top Header Banner
    doc.setFillColor(48, 32, 24); // #302018 Deep Espresso
    doc.rect(0, 0, pageWidth, 28, 'F');

    doc.setFillColor(184, 92, 56); // #B85C38 Terracotta accent stripe
    doc.rect(0, 28, pageWidth, 2.5, 'F');

    doc.setTextColor(196, 154, 88); // #C49A58 Antique Gold
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('LARASRASA', margin, 12);

    doc.setTextColor(250, 246, 239);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('DOKUMEN RESEP PUSAKA JAWA TENGAH • EDISI KREASI', margin, 18);
    doc.text('LarasRasa • Menyelaraskan Rasa Warisan Leluhur Jawa Tengah', margin, 23);

    // Verification Code
    const verifyCode = `LR-AI-${Math.abs(recipe.id.hashCode ? recipe.id.hashCode() : 98214)}-${new Date().getFullYear()}`;
    doc.setTextColor(196, 154, 88);
    doc.setFontSize(8);
    doc.text(`KODE DOKUMEN: ${verifyCode}`, pageWidth - margin, 18, { align: 'right' });

    let curY = 38;

    // Recipe Title
    doc.setTextColor(48, 32, 24);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    const titleLines = doc.splitTextToSize(recipe.title, contentWidth);
    doc.text(titleLines, margin, curY);
    curY += (titleLines.length * 7) + 2;

    // Creator Credit Tag
    doc.setFillColor(242, 232, 216); // #F2E8D8
    doc.roundedRect(margin, curY, contentWidth, 10, 2, 2, 'F');
    doc.setTextColor(184, 92, 56);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(`DICIPTAKAN OLEH: ${recipe.creatorName.toUpperCase()}`, margin + 5, curY + 6.5);
    doc.setTextColor(101, 67, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(`Porsi: ${recipe.servings} | Durasi: ${recipe.totalTime} | Tingkat: ${recipe.difficulty}`, pageWidth - margin - 5, curY + 6.5, { align: 'right' });
    curY += 15;

    // Embed poster thumbnail if canvas provided
    let textLeftMargin = margin;
    let textWidth = contentWidth;

    if (posterCanvas) {
      try {
        const posterImgData = posterCanvas.toDataURL('image/jpeg', 0.85);
        const thumbW = 55;
        const thumbH = (posterCanvas.height / posterCanvas.width) * thumbW;
        doc.addImage(posterImgData, 'JPEG', margin, curY, thumbW, thumbH);
        textLeftMargin = margin + thumbW + 6;
        textWidth = contentWidth - thumbW - 6;
      } catch (e) {
        console.warn('Canvas thumbnail embed bypassed:', e);
      }
    }

    // Story / Narrative Block
    doc.setTextColor(48, 32, 24);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Kisah & Karakter Cita Rasa', textLeftMargin, curY + 4);

    doc.setTextColor(80, 50, 35);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const descLines = doc.splitTextToSize(recipe.description.replace(/\*\*/g, ''), textWidth);
    doc.text(descLines, textLeftMargin, curY + 10);

    const descHeight = (descLines.length * 4.5);
    curY = Math.max(curY + 70, curY + descHeight + 15);

    // --- Ingredients Section ---
    doc.setDrawColor(229, 217, 197);
    doc.line(margin, curY, pageWidth - margin, curY);
    curY += 6;

    doc.setTextColor(48, 32, 24);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Daftar Bahan & Takaran Presisi', margin, curY);
    curY += 6;

    // Two column ingredient layout
    const colWidth = (contentWidth - 6) / 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);

    recipe.ingredients.forEach((ing, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const ingX = margin + (col * (colWidth + 6));
      const ingY = curY + (row * 6);

      // Check if near page bottom
      if (ingY > pageHeight - 20) return;

      doc.setTextColor(184, 92, 56);
      doc.text('•', ingX, ingY);
      doc.setTextColor(48, 32, 24);
      doc.setFont('helvetica', 'bold');
      doc.text(`${ing.amount} ${ing.unit}`, ingX + 4, ingY);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 50, 35);
      doc.text(` ${ing.name} (${ing.note})`, ingX + 24, ingY);
    });

    // --- Page 2: Cooking Steps & Kitchen Secrets ---
    doc.addPage();

    // Top mini header
    doc.setFillColor(48, 32, 24);
    doc.rect(0, 0, pageWidth, 12, 'F');
    doc.setTextColor(196, 154, 88);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(`LARASRASA • PANDUAN LANGKAH: ${recipe.shortTitle.toUpperCase()}`, margin, 8);

    curY = 22;

    doc.setTextColor(48, 32, 24);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Tahapan Pengolahan Masakan', margin, curY);
    curY += 8;

    recipe.steps.forEach((step) => {
      doc.setFillColor(184, 92, 56);
      doc.circle(margin + 3, curY + 2, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text(step.stepNumber.toString(), margin + 2.2, curY + 3.2);

      doc.setTextColor(48, 32, 24);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text(step.title, margin + 9, curY + 3);
      curY += 6;

      doc.setTextColor(70, 50, 40);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      const stepTextLines = doc.splitTextToSize(step.instruction, contentWidth - 9);
      doc.text(stepTextLines, margin + 9, curY);
      curY += (stepTextLines.length * 4.2) + 2;

      // Sensory hint
      doc.setTextColor(119, 123, 82); // Muted olive
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.text(`Isyarat Panca Indera: "${step.sensoryMilestone}"`, margin + 9, curY);
      curY += 7;
    });

    curY += 4;

    // Chef Secrets Box
    doc.setFillColor(250, 246, 239);
    doc.roundedRect(margin, curY, contentWidth, 26, 2, 2, 'F');
    doc.setDrawColor(196, 154, 88);
    doc.roundedRect(margin, curY, contentWidth, 26, 2, 2, 'S');

    doc.setTextColor(184, 92, 56);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('★ Rahasia Dapur Chef:', margin + 4, curY + 6);

    doc.setTextColor(80, 50, 35);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const tipLines = doc.splitTextToSize(recipe.chefTips, contentWidth - 8);
    doc.text(tipLines, margin + 4, curY + 11);
    curY += 32;

    // Food Safety & Storage Box
    doc.setFillColor(245, 245, 240);
    doc.roundedRect(margin, curY, contentWidth, 22, 2, 2, 'F');
    doc.setTextColor(48, 32, 24);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text('Keamanan Pangan & Penyimpanan:', margin + 4, curY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 50, 35);
    doc.setFontSize(8);
    const safetyLines = doc.splitTextToSize(recipe.safetyNotes, contentWidth - 8);
    doc.text(safetyLines, margin + 4, curY + 10.5);

    // Footer page signature
    doc.setDrawColor(229, 217, 197);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setTextColor(140, 120, 105);
    doc.setFontSize(7.5);
    doc.text(`Dicetak melalui LarasRasa AI Food Creator • Tanggal: ${new Date().toLocaleDateString('id-ID')}`, margin, pageHeight - 7);
    doc.text('Dokumen Asli Sah Dapur LarasRasa • Halaman 2 dari 2', pageWidth - margin, pageHeight - 7, { align: 'right' });

    // Save PDF
    const safeTitle = (recipe.shortTitle || 'larasrasa-resep')
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
      isEn ? `Servings: ${recipe.servings} People` : `Porsi: ${recipe.servings} Orang`,
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
    doc.text(isEn ? 'AI Synthesis Specialist' : 'Spesialis Sintesis AI', pageWidth - 65, sigY + 5, { align: 'center' });
    doc.setTextColor(101, 67, 50);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(isEn ? 'Flavor Engineering Studio' : 'Laboratorium Rekayasa Rasa', pageWidth - 65, sigY + 9, { align: 'center' });

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

