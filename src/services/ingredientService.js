import { spices } from '../data/spices.js';
import { API_CONFIG, apiRequest } from './api.js';
import { i18n } from '../i18n/index.js';

/**
 * LarasRasa Ingredient Service
 * 
 * Decoupled data access module for the Central Javanese ingredient catalog.
 * Follows future Laravel REST API contract:
 *   - GET /api/ingredients?category=protein|spice|vegetable|all
 * 
 * In development or mock mode, serves an authentic local catalog of
 * proteins, aromatic spices, vegetables, and condiments.
 */

export const LOCAL_INGREDIENT_CATALOG = {
  proteins: [
    { id: 'ayam-kampung', nameId: 'Daging Ayam Kampung', nameEn: 'Free-range Chicken', icon: '🍗', category: 'protein', description: 'Ayam kampung asli dengan kaldu gurih alami.' },
    { id: 'daging-sapi', nameId: 'Daging Sapi Has / Sengkel', nameEn: 'Selected Beef Cut', icon: '🥩', category: 'protein', description: 'Potongan daging sapi cocok untuk ungkep atau semur.' },
    { id: 'daging-kambing', nameId: 'Daging Kambing Muda', nameEn: 'Tender Young Mutton', icon: '🍖', category: 'protein', description: 'Kambing muda empuk untuk sate buntel atau tengkleng.' },
    { id: 'ikan-bandeng', nameId: 'Ikan Bandeng Segar', nameEn: 'Fresh Milkfish', icon: '🐟', category: 'protein', description: 'Ikan air payau khas pesisir utara Semarang & Juwana.' },
    { id: 'udang-jerbung', nameId: 'Udang Jerbung Segar', nameEn: 'Fresh Wild Prawns', icon: '🦐', category: 'protein', description: 'Udang laut gurih untuk gimbal atau oseng gurih.' },
    { id: 'tempe-kedelai', nameId: 'Tempe Kedelai Asli', nameEn: 'Traditional Soybean Tempeh', icon: '🥢', category: 'protein', description: 'Kedelai fermentasi kapang alami khas Banyumas & Solo.' },
    { id: 'tahu-kuning', nameId: 'Tahu Kuning Sutra', nameEn: 'Silken Yellow Tofu', icon: '🧈', category: 'protein', description: 'Tahu lembut berpori yang menyerap kuah bumbu.' },
    { id: 'telur-bebek', nameId: 'Telur Bebek / Ayam Kampung', nameEn: 'Duck / Farm Eggs', icon: '🥚', category: 'protein', description: 'Telur gurih untuk bacem, pindang, atau dadar lezat.' },
    { id: 'beras-pulen', nameId: 'Beras Pulen Wangi Jawa', nameEn: 'Fragrant Javanese Rice', icon: '🍚', category: 'staple', description: 'Beras pilihan penunjang nasi liwet pulen.' },
    { id: 'mi-telur', nameId: 'Mi Telur / Bihun Kenyal', nameEn: 'Egg / Rice Vermicelli', icon: '🍜', category: 'staple', description: 'Mi kenyal pelengkap soto dan mie ongklok.' }
  ],
  spices: spices.map(s => ({
    id: s.id,
    nameId: s.name,
    nameEn: s.latinName || s.name,
    icon: '🌿',
    category: 'spice',
    flavorNote: s.flavorNote,
    description: s.role
  })),
  vegetables: [
    { id: 'santan-kelapa', nameId: 'Santan Kelapa Murni (Areh)', nameEn: 'Pure Coconut Milk (Areh)', icon: '🥥', category: 'vegetable', description: 'Santan segar perasan pertama untuk kekentalan lembut.' },
    { id: 'rebung-muda', nameId: 'Rebung Muda Segar Renyah', nameEn: 'Fresh Bamboo Shoots', icon: '🎋', category: 'vegetable', description: 'Tunas bambu manis renyah khas isian lumpia Semarang.' },
    { id: 'nangka-muda', nameId: 'Nangka Muda (Gori)', nameEn: 'Young Jackfruit (Gori)', icon: '🍈', category: 'vegetable', description: 'Nangka muda serat padat untuk megono dan gudeg.' },
    { id: 'belimbing-wuluh', nameId: 'Belimbing Wuluh Asam Segar', nameEn: 'Bilimbi / Sour Fruit', icon: '🍋', category: 'vegetable', description: 'Asam alami pemecah lemak kuah garang asem.' },
    { id: 'tomat-hijau', nameId: 'Tomat Hijau Segar', nameEn: 'Fresh Green Tomatoes', icon: '🍅', category: 'vegetable', description: 'Sensasi asam renyah penyeimbang kuah berlemak.' },
    { id: 'daun-melinjo', nameId: 'Daun Melinjo Muda (Daun So)', nameEn: 'Young Melinjo Leaves', icon: '🍃', category: 'vegetable', description: 'Daun so muda bertekstur lembut untuk sayur lodeh.' },
    { id: 'cabai-rawit', nameId: 'Cabai Rawit Merah Nendang', nameEn: 'Red Bird\'s Eye Chilies', icon: '🌶', category: 'vegetable', description: 'Pedas segar pemberi sengatan hangat alami.' },
    { id: 'cabai-merah', nameId: 'Cabai Merah Keriting', nameEn: 'Curly Red Chilies', icon: '🌶', category: 'vegetable', description: 'Warna merah menawan dengan pedas bersahabat.' },
    { id: 'daun-bawang', nameId: 'Daun Bawang & Seledri', nameEn: 'Scallions & Celery', icon: '🌱', category: 'vegetable', description: 'Aroma segar penutup soto dan adonan mendoan.' },
    { id: 'kecambah', nameId: 'Tauge / Kecambah Segar', nameEn: 'Fresh Bean Sprouts', icon: '🌾', category: 'vegetable', description: 'Kecambah pendek renyah khas soto dan tahu gimbal.' },
    { id: 'kol-segar', nameId: 'Kol Segar Iris Tipis', nameEn: 'Crisp Shredded Cabbage', icon: '🥬', category: 'vegetable', description: 'Tekstur renyah pelengkap sate buntel dan selat.' },
    { id: 'bawang-goreng', nameId: 'Bawang Merah Goreng Brebes', nameEn: 'Crispy Fried Shallots', icon: '🧅', category: 'vegetable', description: 'Taburan harum renyah dari bawang merah Brebes.' }
  ]
};

export const ALL_LOCAL_INGREDIENTS = [
  ...LOCAL_INGREDIENT_CATALOG.proteins,
  ...LOCAL_INGREDIENT_CATALOG.spices,
  ...LOCAL_INGREDIENT_CATALOG.vegetables
];

export const ingredientService = {
  /**
   * Mengambil katalog bahan terstruktur.
   * Mendukung pemanggilan API Laravel GET /api/ingredients.
   */
  async getCatalog() {
    if (!API_CONFIG.useMock) {
      try {
        const response = await apiRequest('/ingredients');
        if (response?.data) return response.data;
      } catch (err) {
        console.warn('Gagal memuat bahan dari Laravel API, beralih ke data lokal:', err);
      }
    }
    return LOCAL_INGREDIENT_CATALOG;
  },

  /**
   * Mengambil daftar bahan datar berdasarkan kategori opsional.
   */
  async getIngredients(category = 'all') {
    const catalog = await this.getCatalog();
    let list = [];

    if (category === 'protein') list = catalog.proteins || [];
    else if (category === 'spice') list = catalog.spices || [];
    else if (category === 'vegetable') list = catalog.vegetables || [];
    else list = [
      ...(catalog.proteins || []),
      ...(catalog.spices || []),
      ...(catalog.vegetables || [])
    ];

    const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
    return list.map(item => ({
      ...item,
      displayName: isEn ? (item.nameEn || item.nameId) : (item.nameId || item.nameEn)
    }));
  },

  /**
   * Mencari satu bahan berdasarkan ID.
   */
  async getIngredientById(id) {
    const all = await this.getIngredients('all');
    return all.find(item => item.id === id) || null;
  },

  /**
   * Mencari bahan dengan filter teks kata kunci.
   */
  async searchIngredients(query = '', category = 'all') {
    const items = await this.getIngredients(category);
    if (!query.trim()) return items;
    const q = query.toLowerCase().trim();
    return items.filter(i => 
      (i.nameId && i.nameId.toLowerCase().includes(q)) ||
      (i.nameEn && i.nameEn.toLowerCase().includes(q)) ||
      (i.flavorNote && i.flavorNote.toLowerCase().includes(q)) ||
      (i.description && i.description.toLowerCase().includes(q))
    );
  }
};

