# LarasRasa — Khasanah Rasa & Kuliner Jawa Tengah

**LarasRasa** adalah platform penjelajahan kuliner kurasi premium yang didedikasikan untuk mengangkat resep otentik, peta rasa geografis, eksplorasi rempah, dan restoran legendaris Jawa Tengah, Indonesia.

---

## 1. Filosofi Merek & Desain Identitas

* **Laras**: Melambangkan keselarasan budi pekerti, keharmonisan takaran bumbu, dan ketenangan rasa.
* **Rasa**: Mewakili pengalaman indrawi, kehangatan tradisi, dan kekayaan rempah Nusantara.
* **Sistem Warna Baru (Refined Palette Tokens)**:
  - **Warm Ivory** (`#FAF6EF`): Latar belakang utama bernuansa hangat dan elegan.
  - **Soft Cream** (`#F2E8D8`): Latar kartu sekunder dan pembatas lembut.
  - **Deep Espresso** (`#302018`): Tipografi tajam, kontras tinggi, dan elemen gelap berwibawa.
  - **Rich Cocoa** (`#654332`): Teks sekunder, deskripsi artikel, dan ikonografi.
  - **Terracotta** (`#B85C38`): Aksen utama brand, tombol tindakan, dan sorotan aktif.
  - **Antique Gold** (`#C49A58`): Sentuhan mewah, lencana penghargaan, dan ornamen keraton.
  - **Muted Olive** (`#777B52`): Aksen bahan segar alami dan tumbuhan aromatik.
  - **Clean White** (`#FFFFFF`): Permukaan kartu dan kalkulator porsi untuk keterbacaan prima.

---

## 2. Fitur Utama

1. **Navigasi Profesional Tanpa Wrapping & Dwibahasa Reaktif (ID / EN)**
   - Label ringkas dan presisi: *Beranda, Resep, Peta Rasa, Rempah, Restoran, Rekomendasi*.
   - Tidak pernah melipat (wrap) menjadi dua baris pada resolusi layar apa pun.
   - Selektor bahasa instan `[ID | EN]` yang beralih tanpa perlu memuat ulang halaman (*zero page reload*).
   - Menu drawer mobile yang responsif dan mulus.

2. **Beranda & Centerpiece 3D Three.js PBR Tingkat Lanjut**
   - Komposisi 3D Three.js interaktif: tampah kayu jati berpola cincin serat alami, daun pisang beralur urat tulang rusuk halus, butiran tumpeng nasi gurih, potongan tempe mendoan dan bacem, serta rempah aromatik mengorbit.
   - Kontrol interaktif: Orbit controls (rotasi 360°, zoom, pan), tombol jeda/putar otomatis, dan reset kamera instan.
   - Penjelajahan 6 profil rasa utama: *Manis Gurih, Gurih Lembut, Segar Berkuah, Asam Segar Alami, Pedas Hangat, Kaya Rempah*.

3. **Koleksi Resep & Artikel Detail Mendalam (21 Bagian Lengkap)**
   - Pencarian real-time (judul masakan, bahan baku, daerah asal).
   - Multi-filter: Wilayah, Karakter Rasa, Durasi Memasak, dan Tingkat Kesulitan.
   - **Kalkulator Porsi Dinamis**: Mengubah porsi (2, 4, 6, 8, 12 porsi) menghitung ulang takaran gram/ml setiap bahan secara otomatis.
   - **Checklist Interaktif**: Menandai tahapan memasak langkah demi langkah secara lokal.
   - Narasi sejarah, konteks budaya, filosofi bahan, tips anti-gagal, kesalahan umum, substitusi bahan, estimasi nutrisi, dan restoran legendaris terkait.

4. **Peta Rasa Jawa Tengah (Interactive Leaflet Map)**
   - Menggunakan data batas geografis nyata Jawa Tengah (`public/assets/geo/central-java.json`).
   - Interaksi zoom, pan, hover, dan seleksi wilayah (Semarang, Surakarta/Solo, Kudus, Banyumas, Pekalongan, Magelang, Tegal, Wonosobo).
   - Panel informasi kuliner regional lengkap dengan hidangan perwakilan dan bumbu kunci.
   - Menegaskan status administratif Surakarta (Solo) sebagai Kota di Jawa Tengah, berbeda secara administratif dari DIY Yogyakarta.

5. **Jelajah Rempah & Bumbu Aromatik (3D Spice Inspector)**
   - Inspeksi model 3D rempah 360 derajat di atas cobek batu andesit/basalt hitam (*Bawang Merah, Bawang Putih, Jahe Emprit, Kunyit, Lengkuas, Kencur, Ketumbar, dll.*).
   - Material PBR prosedural Three.js dengan tekstur kulit berlapis, bintik kasar, dan pencahayaan studio foto.
   - Profil aroma, peran kuliner, teknik sangrai/ulek dapur, dan tautan ke masakan ikonik.

6. **Direktori Restoran Legendaris & Peta Koordinat Nyata**
   - Titik koordinat GPS lintang-bujur nyata di atas peta Leaflet dengan penanda pin beraksen Terracotta & Emas.
   - Informasi terverifikasi: Toko Oen Semarang (1936), Nasi Liwet Wongso Lemu (1950), Soto Kudus Pak Darno (1968), Garang Asem Sari Rasa (1985), Lunpia Gang Lombok (1890), Selat Solo Mbak Lies (1987), Sate Pak Manto (1990), dll.
   - Tautan langsung navigasi Google Maps.

7. **Rekomendasi Untukmu (Personalized Food Finder)**
   - Kuesioner berpandu 5 langkah dengan indikator progres visual, validasi input, dan tombol navigasi kembali/selanjutnya.
   - Rekomendasi terstruktur dengan narasi kurasi dalam Bahasa Indonesia/Inggris yang hangat dan natural.
   - Estimasi biaya belanja sesuai jumlah porsi keluarga.
   - Menjaga privasi: tidak menyimpan riwayat rekomendasi ke `localStorage`/cookies.

---

## 3. Teknologi yang Digunakan

* **Bundler & Tooling**: Vite 8
* **Bahasa**: Vanilla JavaScript (ES Modules murni, tanpa framework React/Vue/Angular)
* **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
* **3D Engine**: Three.js (r186) dengan shader/PBR procedural canvas textures
* **Peta Interaktif**: Leaflet (1.9.4) & GeoJSON Jawa Tengah
* **Typography**: Playfair Display (Serif Editorial) & Plus Jakarta Sans (Sans-serif)
* **Internasionalisasi**: Sistem i18n dwibahasa kustom (ID / EN) berbasis event reaktif

---

## 4. Struktur Proyek

```text
larasrasa/
├── public/
│   ├── assets/
│   │   ├── geo/
│   │   │   └── central-java.json      # GeoJSON batas wilayah Jawa Tengah
│   │   └── images/
│   │       ├── hero/                  # Foto editorial hero banquet
│   │       ├── recipes/               # Foto 10 hidangan otentik Jawa Tengah
│   │       ├── regions/               # Foto lanskap arsitektur kota/wilayah
│   │       ├── restaurants/           # Foto destinasi kuliner bersejarah
│   │       └── ingredients/           # Aset visual rempah & bumbu
├── src/
│   ├── components/
│   │   ├── navbar.js                  # Navigasi tanpa-wrap, toggle ID|EN, & mobile drawer
│   │   ├── footer.js                  # Catatan budaya, tautan, & atribusi dwibahasa
│   │   ├── recipe-card.js             # Kartu resep dengan badge & hover lift
│   │   ├── restaurant-card.js         # Kartu restoran legendaris & tautan peta
│   │   ├── filter-panel.js            # Bar pencarian & filter multikategori
│   │   ├── serving-calculator.js      # Pengubah takaran porsi dinamis
│   │   ├── three-hero.js              # 3D centerpiece showcase Three.js PBR
│   │   └── three-spice-viewer.js      # 3D spice inspector 360° Three.js
│   ├── data/
│   │   ├── recipes.js                 # Dataset resep terstruktur & mendalam
│   │   ├── regions.js                 # Profil kuliner & geografis wilayah
│   │   ├── restaurants.js             # Direktori restoran legendaris terverifikasi
│   │   ├── spices.js                  # Data rempah & bumbu aromatik
│   │   └── flavorProfiles.js          # Spektrum rasa khas Jawa Tengah
│   ├── i18n/
│   │   ├── id.js                      # Kamus Bahasa Indonesia & ungkapan budaya
│   │   ├── en.js                      # Kamus Bahasa Inggris editorial
│   │   └── index.js                   # Reactive i18n state manager
│   ├── pages/
│   │   ├── home.js                    # Halaman Beranda
│   │   ├── recipes.js                 # Halaman Katalog Resep
│   │   ├── recipe-detail.js           # Halaman Detail Resep (21 seksi lengkap)
│   │   ├── flavor-map.js              # Halaman Peta Rasa Interaktif
│   │   ├── spices.js                  # Halaman Jelajah Rempah 3D
│   │   ├── legendary-restaurants.js   # Halaman Restoran Legendaris
│   │   ├── recommendations.js         # Halaman Kuesioner Rekomendasi
│   │   └── about.js                   # Halaman Tentang & Filosofi
│   ├── services/
│   │   ├── api.js                     # HTTP Client & konfigurasi endpoint
│   │   ├── recipeService.js           # Abstraksi resep (siap Laravel)
│   │   ├── regionService.js           # Abstraksi wilayah & GeoJSON
│   │   ├── restaurantService.js       # Abstraksi restoran & lokasi
│   │   ├── spiceService.js            # Abstraksi rempah
│   │   └── recommendationService.js   # Engine pencari menu & kontrak AI
│   ├── utils/
│   │   ├── dom.js                     # Utilitas manipulasi DOM aman
│   │   └── formatters.js              # Format mata uang & kalkulasi porsi
│   ├── main.js                        # Entry point aplikasi
│   ├── router.js                      # Client-side SPA hash router dengan reaktif i18n
│   └── style.css                      # Konfigurasi Tailwind v4, tema, & typography
├── index.html                         # Template HTML utama
├── vite.config.js                     # Konfigurasi Vite & Tailwind plugin
└── package.json
```

---

## 5. Cara Menjalankan Aplikasi

### Prasyarat
* Node.js v18+ dan npm

### Menjalankan Development Server
```bash
npm run dev
```
Buka browser pada alamat yang tertera (biasanya `http://localhost:5173/`).

### Membangun Versi Produksi
```bash
npm run build
```
Hasil kompilasi produksi akan tersimpan di direktori `dist/`.

### Preview Hasil Build
```bash
npm run preview
```

---

## 6. Konfigurasi Lingkungan & Kesiapan Backend Laravel

Aplikasi dirancang dengan arsitektur *API-Ready*. Terdapat file konfigurasi `src/services/api.js` yang mendukung variabel lingkungan Vite:

```env
# .env (Opsional - masa depan)
VITE_API_BASE_URL=http://localhost:8000/api
VITE_USE_MOCK=false
```

* Secara default, `VITE_USE_MOCK=true` sehingga seluruh navigasi, filter resep, pencarian, dan rekomendasi menu berjalan lancar menggunakan fixture data lokal tanpa memerlukan server backend aktif.
* Ketika dihubungkan ke backend Laravel di masa depan, service layer secara otomatis mengarahkan permintaan ke endpoint REST:
  - `GET /api/recipes`
  - `GET /api/recipes/{slug}`
  - `GET /api/regions`
  - `GET /api/restaurants`
  - `POST /api/recommendations`

---

## 7. Sumber Data & Atribusi

* **Arsip Sejarah Kuliner**: Balai Pelestarian Cagar Budaya (BPCB) Jawa Tengah, Dinas Kebudayaan dan Pariwisata Kota Semarang, Dinas Pariwisata Surakarta, dan Pustaka Kuliner Tradisional Kudus.
* **Koordinat Geografis**: OpenStreetMap & CARTO Basemaps.
* **Dokumentasi Restoran**: Arsip Keluarga Toko Oen, Sejarah Nasi Liwet Keprabon Wongso Lemu, dan Direktori Kuliner Ikonik Pantura.
