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

* **AI Culinary Experiment Studio**: Formulate custom authentic Central Javanese recipes powered by Google Gemini AI and Supabase Edge Functions with multi-model cascading fallback, strict credit quota controls, and official downloadable PDF recipe exports.
* **Interactive Regional Flavor Map**: Geographic culinary exploration powered by Leaflet.js and Central Java GeoJSON spanning 8 culinary centers (Semarang, Surakarta, Kudus, Banyumas, Pekalongan, Magelang, Tegal, and Wonosobo).
* **Heritage Recipe Archives**: 26 authentic traditional recipes curated with dynamic serving size recalculation, cooking difficulty, preparation times, and flavor profile badges.
* **Indigenous Spices Encyclopedia**: In-depth catalog of 19 essential spices and aromatics (*bumbu jangkep*), featuring Latin taxonomic names, aroma profiles, flavor contributions, and associated traditional dishes.
* **Cultural Taste Matcher (Gastronomic Recommendation Engine)**: Personalized 3-step cultural flavor alignment system matching user preferences (flavor character, dining experience, and cultural zone) with match scoring algorithms.
* **Interactive Banquet Showcase**: Featured culinary centerpiece highlighting iconic royal feast dishes with interactive hotspot pins and direct recipe modal access.
* **Bilingual Reactive Architecture**: Complete bilingual support (Indonesian & English) with reactive real-time language toggling without page reloads, state preservation, and localized URL route handling.
* **Royal Heritage Visual Identity**: Bespoke aesthetic inspired by Javanese keraton heritage, featuring terracotta (`#C84C24`), gold ochre (`#D49B42`), deep charcoal (`#120B07`), and royal ivory (`#FAF7F2`) typography and palettes.

---

## 🛠️ Tech Stack

* **Vanilla JavaScript (ES Modules)**: Native modern JavaScript architecture powering a single-page application (SPA) with zero framework bloat.
* **Vite (8.x)**: Next-generation fast frontend build tool and local development server.
* **Tailwind CSS (4.x)**: Utility-first CSS framework delivering responsive, elegant editorial typography and layouts.
* **Leaflet (1.9.x)**: Mobile-friendly interactive mapping library driving the Central Java regional flavor map with bundled local assets.
* **jsPDF (4.x)**: Client-side vector PDF document generation engine powering downloadable official recipe archives.
* **Google Gemini API**: Advanced generative intelligence synthesizing culturally coherent, authentic Central Javanese recipe formulations.
* **Supabase Edge Functions (Deno)**: Secure backend proxy and serverless edge runtime enforcing CORS validation, rate limiting, and credit governance.

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

Ensure you have [Node.js](https://nodejs.org/) (version 18 or later) installed and configured on your machine.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/evanhendramulyadi/larasrasa.git
   cd larasrasa
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 📄 Copyright & Ownership

© 2026–Present Kelompok 2. All Rights Reserved.

The web application codebase and technical implementation were developed by Kelompok 2 as part of the Information Technology (IT) Project-Based Learning (PjBL) program at SMK Pariwisata Metland School.

This repository is publicly accessible solely for viewing, studying, and reviewing the source code. Public access does not grant permission to copy the entire project, rebrand or rename it, remove attribution, or claim it as your own creation. Re-use or distribution without explicit permission from the author is strictly prohibited.
