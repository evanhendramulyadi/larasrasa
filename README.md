<p align="center">
  <img src="public/assets/images/larasrasa-logo-rounded.png" alt="LarasRasa Logo" width="100">
</p>

# LarasRasa

LarasRasa is an interactive and exploratory culinary heritage web application designed to showcase Central Java's rich gastronomic traditions, iconic heritage recipes, indigenous spices, regional flavor geography, and cultural culinary matchmaking through an intuitive, visual, and modern digital experience.

This project was initiated as a Project-Based Learning (PjBL) assignment in the Information Technology (IT) Department at SMK Pariwisata Metland School. For this assignment, Kelompok 2 was tasked with creating a website centered on Central Java, choosing to develop LarasRasa—an exploratory culinary platform celebrating Central Java's rich culinary traditions, iconic recipes, indigenous spices, and gastronomic heritage.

---

## 🌐 Live Web Application

Experience LarasRasa directly in your browser:  
👉 **[Launch LarasRasa Live Web](https://larasrasa.vercel.app)**

---

## ✨ Key Features

* **AI Culinary Experiment Studio**: Formulate custom authentic Central Javanese recipes powered by Google Gemini API and Supabase Edge Functions with dynamic model discovery, tier-diverse cascading failover, strict schema validation, rate limiting, and instant PDF export or text copy.
* **Interactive Regional Flavor Map**: Geographic culinary exploration powered by Leaflet.js and Central Java GeoJSON spanning 8 culinary centers (Semarang, Surakarta, Kudus, Banyumas, Pekalongan, Magelang, Tegal, and Wonosobo).
* **Heritage Recipe Archives**: 26 authentic traditional recipes curated with standard 4-portion ratios, cultural lore, interactive step-by-step cooking checklists, and flavor profile filtering.
* **Indigenous Spices Encyclopedia**: In-depth catalog of 19 essential spices and aromatics (*bumbu jangkep*), featuring Latin taxonomic names, aroma profiles, preparation methods, and cultural wisdom.
* **Legendary Culinary Establishments**: Curated directory of 12 historic eateries and *warung legendaris* across Central Java with city filtering, instant search, historical notes, and Google Maps navigation.
* **Cultural Taste Matcher (Gastronomic Recommendation Engine)**: Personalized 3-step cultural flavor alignment system matching user preferences (flavor character, dining experience, and cultural zone) with match scoring algorithms.
* **Interactive Banquet Showcase**: Featured culinary centerpiece highlighting 4 iconic royal feast dishes with interactive hotspot pins and direct recipe modal access.
* **Bilingual Reactive Architecture**: Complete bilingual support (Indonesian & English) with reactive real-time language toggling without page reloads, state preservation, and localized URL route handling.
* **Royal Heritage Visual Identity**: Bespoke aesthetic inspired by Javanese keraton heritage, featuring terracotta (`#C84C24`), gold ochre (`#D49B42`), deep charcoal (`#120B07`), and royal ivory (`#FAF7F2`) typography and palettes.

---

## 🛠️ Tech Stack

* **Vanilla JavaScript (ES Modules)**: Native modern JavaScript architecture powering a single-page application (SPA) with zero framework bloat.
* **Vite (`8.3.x`)**: Next-generation fast frontend build tool and local development server.
* **Tailwind CSS (`4.3.x`)**: Utility-first CSS framework (`@tailwindcss/vite`) delivering responsive, elegant editorial typography and layouts.
* **Leaflet (`1.9.x`)**: Mobile-friendly interactive mapping library driving the Central Java regional flavor map with OpenStreetMap tiles and bundled GeoJSON boundaries.
* **jsPDF (`4.2.x`)**: Client-side vector PDF document generation engine powering downloadable recipe archives.
* **Google Gemini API**: Generative intelligence accessed via dynamic `ListModels` discovery to synthesize culturally coherent, authentic Central Javanese recipe formulations.
* **Supabase Edge Functions (Deno)**: Login-free, database-free serverless proxy enforcing CORS/Origin boundaries, strict JSON schema allowlists, server-side prompt construction, dynamic model failover, and sliding-window rate limiting.
* **Vercel**: Global static edge hosting configured with strict HTTP Security Headers and Content Security Policy (`vercel.json`).

---

## 👥 Project Background & Development Team

This web application was created as part of the school Project-Based Learning (PjBL) program in the Information Technology (IT) Department at SMK Pariwisata Metland School. In this program, Kelompok 2 was tasked with developing a website centered around Central Java, bringing together talents across software engineering, UI/UX design, flow architecture, and academic research.

Within Kelompok 2, the web application was fully designed, architected, and built by:

### Web Development Team (Kelompok 2)

* **Team Leader & Lead Web Developer**: Evan Hendra Mulyadi
* **UI/UX Designer**: Keisha Nabilah Ar Rahmah
* **Flowchart & System Logic Designer**: M. Azka Derin Sulaeman
* **Proposal & Academic Research Writer**: Darrel Satya Laksono

### Multidisciplinary Responsibilities

The web application was developed with cross-domain responsibilities covering:
* **Information Technology & Software Engineering**: Client-side SPA routing, AI Edge integration, state persistence, Leaflet GeoJSON, and PDF document generation.
* **UI/UX Design**: Royal heritage visual identity, color palette formulation, typography hierarchy, and responsive mobile-first layouts.
* **Gastronomic Research & Culinary Arts**: Traditional recipe curation, regional spice profiling, and flavor taxonomy verification.
* **System Architecture**: Flowcharts, state transitions, match scoring algorithms, and user journey mapping.

---

## 💻 Local Setup Instructions

Ensure you have [Node.js](https://nodejs.org/) installed (`v18+` for Vite dev/build, or `v22.6+` recommended to run the built-in `--experimental-strip-types` security test suite).

1. **Clone the repository**:
   ```bash
   git clone https://github.com/evanhendramulyadi/larasrasa.git
   cd larasrasa
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment configuration (optional)**:
   Copy `.env.example` to `.env` if pointing AI Food Creator to your own Supabase Edge Function deployment (configure `GEMINI_API_KEY`, `RATE_LIMIT_SALT`, and optional `ALLOWED_ORIGINS` strictly via Supabase Dashboard / `supabase secrets set`):
   ```bash
   cp .env.example .env
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Run security tests and production build**:
   ```bash
   node --experimental-strip-types --test tests/security.test.mjs
   npm run build
   npm run preview
   ```

---

## 📄 Copyright & Ownership

© 2026–Present Kelompok 2. All Rights Reserved.

The web application codebase and technical implementation were developed by Kelompok 2 as part of the Information Technology (IT) Project-Based Learning (PjBL) program at SMK Pariwisata Metland School.

This repository is publicly accessible solely for viewing, studying, and reviewing the source code. Public access does not grant permission to copy the entire project, rebrand or rename it, remove attribution, or claim it as your own creation. Re-use or distribution without explicit permission from the author is strictly prohibited.
