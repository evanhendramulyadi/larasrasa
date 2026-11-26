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

const RESOLVED_SUPABASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  'https://fkenbpopcgghadbcresj.supabase.co';

const RESOLVED_PUBLISHABLE_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY) ||
  'sb_publishable_Q2sMqA6Kk3oZhnMOSFSGlA_OpYKlV-j';

export const SUPABASE_CONFIG = {
  url: RESOLVED_SUPABASE_URL,
  functionUrl: `${RESOLVED_SUPABASE_URL.replace(/\/+$/, '')}/functions/v1/generate-recipe`,
  publishableKey: RESOLVED_PUBLISHABLE_KEY
};

const AI_REQUEST_TIMEOUT_MS = 55000;

export const PREFERENCE_OPTIONS = {
  cookingMethods: [
    { id: 'tumis', labelId: 'Tumis Cepat Beraroma', labelEn: 'Quick Aromatic Stir-fry', descId: 'Minyak panas, bumbu rajang halus, tekstur renyah segar.', descEn: 'Hot oil, finely sliced aromatic spices, crisp and fresh texture.' },
    { id: 'ungkep', labelId: 'Ungkep & Rebus Kuah Kaldu', labelEn: 'Slow Braise & Savory Broth', descId: 'Api kecil, kuah meresap hingga ke serat terdalam.', descEn: 'Low flame, broth deeply infusing into every fiber.' },
    { id: 'kukus', labelId: 'Kukus Bungkus Daun Pisang', labelEn: 'Steam in Banana Leaf', descId: 'Aroma daun pisang layu menyatu dengan sari bumbu alami.', descEn: 'Aroma of wilted banana leaf melds with natural spice essences.' },
    { id: 'bakar', labelId: 'Panggang / Bakar Arang Batok', labelEn: 'Charcoal Grill & Glaze', descId: 'Karamelisasi kecap manis dan asap arang menggoda selera.', descEn: 'Sweet soy sauce caramelization and tantalizing coconut charcoal smoke.' },
    { id: 'goreng', labelId: 'Goreng Krispi / Mendoan Lembut', labelEn: 'Crispy / Soft Pan-fry', descId: 'Balutan tepung berempah gurih renyah atau lembut ala mendoan.', descEn: 'Crisp or soft mendoan-style spiced batter coating.' }
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
   * Synthesize a structured recipe via Supabase Edge Function (server-side schema validation + Gemini API).
   */
  async generateRecipe(payload) {
    const {
      creatorName,
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
      outputLanguage = 'id'
    } = payload;

    const cleanCreatorName = (typeof creatorName === 'string' && creatorName.trim().length > 0)
      ? creatorName.trim().slice(0, 60)
      : (outputLanguage === 'en' ? 'LarasRasa Culinary Hearth' : 'Dapur Tradisi LarasRasa');

    const cleanNotes = typeof customNotes === 'string' ? customNotes.trim().slice(0, 250) : '';
    const uniqueIngredientIds = Array.isArray(selectedIngredientIds)
      ? Array.from(new Set(selectedIngredientIds.filter(id => typeof id === 'string' && id.trim().length > 0)))
      : [];

    if (uniqueIngredientIds.length < 5 || uniqueIngredientIds.length > 10) {
      const backendErr = new Error('BACKEND_REQUEST_FAILED');
      backendErr.code = 'BACKEND_ERROR';
      throw backendErr;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), AI_REQUEST_TIMEOUT_MS);

    // Transmit only structured, bounded inputs (prompt assembly runs strictly server-side)
    try {
      const response = await fetch(SUPABASE_CONFIG.functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_CONFIG.publishableKey
        },
        body: JSON.stringify({
          action: 'generate',
          inputs: {
            creatorName: cleanCreatorName,
            selectedIngredientIds: uniqueIngredientIds,
            cookingMethod,
            dishCategory,
            tasteProfile,
            spiceLevel: Number.isInteger(Number(spiceLevel)) ? Number(spiceLevel) : 1,
            cookingDuration,
            servings: parseInt(servings, 10) || 4,
            equipment,
            dietary,
            customNotes: cleanNotes,
            outputLanguage: outputLanguage === 'en' ? 'en' : 'id'
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.status === 402 || response.status === 429) {
        const errBody = await response.json().catch(() => null);
        if (response.status === 402 || errBody?.code === 'CREDIT_EXHAUSTED') {
          const creditErr = new Error('CREDIT_EXHAUSTED');
          creditErr.code = 'CREDIT_EXHAUSTED';
          throw creditErr;
        }
        if (response.status === 429 && errBody?.retryAfter) {
          const rateErr = new Error('RATE_LIMITED');
          rateErr.code = 'RATE_LIMITED';
          rateErr.retryAfterSeconds = Number(errBody.retryAfter) || 60;
          throw rateErr;
        }
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
        const parsed = this._parseGeminiRecipeResponse(resultData, payload, cleanCreatorName);
        if (parsed && parsed.title && Array.isArray(parsed.ingredients) && parsed.ingredients.length > 0) {
          return parsed;
        }
        throw new Error('BACKEND_INVALID_RECIPE_FORMAT');
      } else {
        if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
          console.warn(`Backend request rejected with status ${response.status}`);
        }
        throw new Error('BACKEND_REQUEST_FAILED');
      }
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        const timeoutErr = new Error('BACKEND_TIMEOUT');
        timeoutErr.code = 'TIMEOUT_ERROR';
        throw timeoutErr;
      }
      if (err.code === 'CREDIT_EXHAUSTED' || err.code === 'EDGE_FORBIDDEN' || err.code === 'RATE_LIMITED') {
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
      if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
        console.warn('Could not parse JSON from AI output:', parseErr);
      }
    }

    return null;
  },

  _normalizeRecipeObject(raw, payload, resolvedCreatorName) {
    const rawTitle = (raw.title || raw.dishName || 'Racikan Pusaka Jawa Tengah').trim();
    const baseTitle = rawTitle.split('/')[0].split(' atau ')[0].trim();
    const withoutBrand = baseTitle
      .replace(/\b(?:ala|racikan|kreasi|khas|versi)?\s*laras\s*rasa\b/gi, ' ')
      .replace(/\s{2,}/g, ' ')
      .replace(/^[\s\-–—:,/]+|[\s\-–—:,/]+$/g, '')
      .trim();
    const cleanTitle = withoutBrand.length >= 3 ? withoutBrand : baseTitle;

    const subtitleId = raw.subtitleId || 'Racikan Resep Dapur Tradisi';
    const subtitleEn = raw.subtitleEn || 'Authentic Heritage Recipe';

    const descId = (raw.descriptionId || raw.description || '').trim();
    const descEn = (raw.descriptionEn || raw.description || descId).trim();

    const rawIngs = Array.isArray(raw.ingredients) ? raw.ingredients : [];
    const normalizedIngs = rawIngs.map(i => ({
      nameId: i.nameId || i.name || 'Bahan Tradisi',
      nameEn: i.nameEn || i.nameId || i.name || 'Heritage Ingredient',
      amount: (i.amount !== undefined && i.amount !== null && i.amount !== '') ? i.amount : 1,
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
      spiceLevel: Number.isInteger(Number(payload.spiceLevel)) ? Number(payload.spiceLevel) : 1,
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
