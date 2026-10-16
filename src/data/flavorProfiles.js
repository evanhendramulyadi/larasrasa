import { i18n } from '../i18n/index.js';

export const flavorProfiles = [
  {
    id: 'manis',
    name: 'Manis Gurih',
    nameEn: 'Sweet & Savory',
    tagline: 'Kelembutan Legi yang Menghangatkan Hati',
    taglineEn: 'Gentle Warmth of Palm Sugar & Aromatics',
    description: 'Karakter rasa manis khas Jawa Tengah lahir dari penggunaan gula kelapa asli (gula jawa), kecap manis tradisional yang difermentasi alami, serta rempah daun seperti salam dan lengkuas. Rasa manis di sini tidak menonjol sendiri, melainkan berpadu selaras dengan gurihnya santan dan bumbu aromatik.',
    descriptionEn: 'The hallmark sweet flavor of Central Java comes from artisanal coconut palm sugar, naturally fermented sweet soy sauce, and aromatic leaves like salam and galangal, harmonized with rich coconut cream.',
    color: '#C49A58',
    bgBadge: 'bg-[#F2E8D8] text-[#302018] border-[#C49A58]/30',
    icon: 'sparkles',
    culturalNote: 'Di Solo dan sekitarnya, manis melambangkan kelembutan budi pekerti (luhuring budi) dan keramahan yang meneduhkan.',
    culturalNoteEn: 'In Surakarta and surrounding royal lands, sweetness symbolizes noble refinement and peaceful hospitality.',
    sampleDishes: ['Selat Solo', 'Tempe Bacem', 'Gudeg Koyor']
  },
  {
    id: 'gurih',
    name: 'Gurih Lembut',
    nameEn: 'Mellow Savory',
    tagline: 'Kekayaan Santan & Rempah Penyangga Cita Rasa',
    taglineEn: 'Velvety Richness of Coconut Cream & Candlenut',
    description: 'Didominasi oleh gurih alami dari santan perasan pertama (areh), kemiri sangrai, bawang merah lokal, serta ketumbar yang dihaluskan bersama bumbu dasar putih atau kuning.',
    descriptionEn: 'Anchored by the delicate richness of freshly pressed coconut cream (areh), roasted candlenuts, Brebes shallots, and freshly ground coriander in classic yellow or white spice pastes.',
    color: '#654332',
    bgBadge: 'bg-[#FAF6EF] text-[#302018] border-[#654332]/30',
    icon: 'utensils',
    culturalNote: 'Menjadi pondasi sajian syukuran dan kenduri seperti Nasi Liwet dan Opor Ayam kampung.',
    culturalNoteEn: 'Forms the sacred cornerstone of communal thanksgiving feasts like Nasi Liwet and free-range chicken opor.',
    sampleDishes: ['Nasi Liwet Solo', 'Mendoan Banyumas', 'Opor Bebek']
  },
  {
    id: 'segar',
    name: 'Segar Berkuah',
    nameEn: 'Clear & Fresh Broth',
    tagline: 'Kuah Kaldu Bening Beraroma Rempah Segar',
    taglineEn: 'Golden Clear Broth with Aromatic Kencur & Lime',
    description: 'Karakteristik sup dan soto Jawa Tengah yang bening keemasan, dimasak perlahan dari kaldu ayam kampung atau daging kerbau, dibumbui kencur, jahe, bawang putih goreng, serta perasan jeruk nipis segar.',
    descriptionEn: 'Distinguished by pristine golden broths simmered from free-range chicken or water buffalo, laced with aromatic kencur, ginger, crisp fried garlic chips, and fresh key lime.',
    color: '#777B52',
    bgBadge: 'bg-emerald-50 text-emerald-900 border-emerald-300',
    icon: 'soup',
    culturalNote: 'Disajikan dalam mangkuk keramik kecil tradisional bersama perkedel dan sate kerang di Kudus dan sekitarnya.',
    culturalNoteEn: 'Traditionally savored in miniature ceramic bowls with crispy potato cakes and sweet soy clam skewers.',
    sampleDishes: ['Soto Kudus', 'Kupat Tahu Magelang', 'Soto Semarang']
  },
  {
    id: 'asam',
    name: 'Asam Segar Alami',
    nameEn: 'Tangy Citrus & Bilimbi',
    tagline: 'Kesegaran Belimbing Wuluh & Asam Jawa',
    taglineEn: 'Vibrant Tartness of Sour Bilimbi & Tamarind',
    description: 'Sensasi rasa asam alami yang memecah lemak, dihasilkan dari potongan belimbing wuluh segar, tomat hijau, asam jawa, dan air kelapa muda.',
    descriptionEn: 'Natural fruit acidity that effortlessly cuts through richness, crafted from freshly sliced sour bilimbi fruit, green tomatoes, and aged tamarind.',
    color: '#B85C38',
    bgBadge: 'bg-orange-50 text-orange-900 border-orange-300',
    icon: 'citrus',
    culturalNote: 'Diolah dengan teknik kukus berbungkus daun pisang berlapis agar sari belimbing meresap sempurna ke serat daging.',
    culturalNoteEn: 'Steamed inside tightly folded banana leaves so the fruit’s natural juices deeply infuse the tender chicken.',
    sampleDishes: ['Garang Asem', 'Sayur Asem Wonosobo', 'Pindang Kudus']
  },
  {
    id: 'pedas',
    name: 'Pedas Hangat',
    nameEn: 'Warm & Spicy',
    tagline: 'Gigitan Cabai Rawit & Bumbu Ulek Alami',
    taglineEn: 'Zesty Red Chilies & Stone-ground Spices',
    description: 'Bukan sekadar pedas menyengat, tetapi pedas yang berpadu dengan kencur, terasi bakar, dan daun kemangi segar, memberikan kehangatan tubuh khas dataran tinggi.',
    descriptionEn: 'Far more than blunt heat, this is a comforting warmth uniting bird’s eye chilies with roasted shrimp paste, kencur, and fragrant lemon basil.',
    color: '#A83226',
    bgBadge: 'bg-red-50 text-red-900 border-red-300',
    icon: 'flame',
    culturalNote: 'Sering dipadukan dengan cocolan sambal kecap rawit iris pada mendoan panas atau rica-rica entok khas pedalaman.',
    culturalNoteEn: 'Frequently enjoyed alongside hot sweet soy chili dipping sauces with sizzling mendoan or slow-braised duck.',
    sampleDishes: ['Sambal Tumpang', 'Mangut Beong', 'Rica Entok']
  },
  {
    id: 'kaya-rempah',
    name: 'Kaya Rempah',
    nameEn: 'Rich & Spiced',
    tagline: 'Kedalaman Rasa dari Racikan Bumbu Purba',
    taglineEn: 'Ancient Complex Spices & Coastal Heritage',
    description: 'Profil bumbu pekat yang menggunakan kluwek, jintan, kapulaga jawa, bunga kecombrang, serta racikan serundeng kelapa bakar.',
    descriptionEn: 'Deep aromatic profiles utilizing fermented kluwek nuts, cumin, Javanese cardamom, pink torch ginger flowers, and toasted spiced coconut.',
    color: '#302018',
    bgBadge: 'bg-[#FAF6EF] text-[#302018] border-[#302018]/30',
    icon: 'feather',
    culturalNote: 'Mencerminkan sejarah pesisir pantai utara (Pantura) dan pertemuan rempah jalur perdagangan rempah kuno.',
    culturalNoteEn: 'Reflects the ancient spice trading legacy along the northern Java Sea corridor.',
    sampleDishes: ['Nasi Megono', 'Pindang Tetel', 'Sate Buntel Solo']
  }
];

export function getLocalizedFlavorProfiles() {
  const isEn = i18n?.getLanguage && i18n.getLanguage() === 'en';
  return flavorProfiles.map(f => ({
    ...f,
    name: isEn ? (f.nameEn || f.name) : f.name,
    tagline: isEn ? (f.taglineEn || f.tagline) : f.tagline,
    description: isEn ? (f.descriptionEn || f.description) : f.description,
    culturalNote: isEn ? (f.culturalNoteEn || f.culturalNote) : f.culturalNote
  }));
}
