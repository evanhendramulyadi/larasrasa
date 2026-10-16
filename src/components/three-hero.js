import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { t, i18n } from '../i18n/index.js';

/**
 * Advanced Interactive Culinary & Heritage Showcase
 * 
 * Features:
 * 1. Dual-Mode Showcase:
 *    - Mode '3d': Authentic 360° PBR 3D inspection of Kasongan Earthenware Clay Pot
 *      and Carved Teak Platter (Poly Haven CC0 models) with studio lighting and soft shadows.
 *    - Mode 'feast': High-resolution culinary photograph of authentic Central Javanese banquet
 *      with 4 interactive hotspot pins revealing cultural dish insights.
 * 2. Smooth orbital drag controls, momentum inertia, auto-rotation toggle, camera reset, and zoom.
 * 3. Fully localized with bilingual support (ID & EN).
 * 4. Graceful WebGL fallback and comprehensive memory disposal.
 */

export class ThreeHeroShowcase {
  constructor(containerElement) {
    this.container = containerElement;
    this.currentMode = 'feast'; // 'feast' (authentic culinary dishes) | '3d' (pottery inspection)
    
    // Three.js instances
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.animationFrameId = null;
    this.centerpieceGroup = null;
    this.isDisposed = false;

    // Camera & Controls state
    this.initialCameraPos = new THREE.Vector3(0, 2.6, 4.8);
    this.targetRotationX = 0.28;
    this.targetRotationY = 0;
    this.currentRotationX = 0.28;
    this.currentRotationY = 0;
    this.targetZoom = 4.8;
    this.currentZoom = 4.8;
    this.isPointerDown = false;
    this.autoRotate = true;
    this.previousPointerPosition = { x: 0, y: 0 };

    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.animate = this.animate.bind(this);
  }

  init() {
    if (!this.container) return;

    // Render Outer Container Wrapper with Mode Switcher
    this.renderOuterLayout();
    this.switchMode('feast');
  }

  renderOuterLayout() {
    this.container.innerHTML = `
      <div class="relative w-full h-full flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-b from-[#FAF6EF] via-white to-[#F2E8D8] border border-[#E5D9C5] shadow-lg p-3 sm:p-4">
        
        <!-- Header Controls: Mode Selector & Status -->
        <div class="flex items-center justify-between z-20 gap-2 mb-2">
          <!-- Dual-Mode Tabs -->
          <div class="inline-flex p-1 rounded-full bg-[#FAF6EF] border border-[#E5D9C5] shadow-xs text-xs font-bold text-[#654332]">
            <button type="button" id="hero-tab-feast" class="px-3 py-1 rounded-full transition-all bg-[#B85C38] text-white shadow-xs flex items-center gap-1.5 cursor-pointer">
              <span>🍲</span>
              <span>${t('hero.tabFeast')}</span>
            </button>
            <button type="button" id="hero-tab-3d" class="px-3 py-1 rounded-full transition-all text-[#654332] hover:text-[#B85C38] flex items-center gap-1.5 cursor-pointer">
              <span>🏺</span>
              <span>${t('hero.tab3d')}</span>
            </button>
          </div>

          <!-- Dynamic Hint / Action Badge -->
          <div id="hero-showcase-hint" class="text-[11px] font-semibold text-[#654332] bg-white/90 px-2.5 py-1 rounded-full border border-[#E5D9C5] backdrop-blur-xs shadow-2xs hidden sm:block">
            ${t('hero.feastSubtitle')}
          </div>
        </div>

        <!-- Center Viewport (Hosts either WebGL Canvas or Interactive Photo Feast) -->
        <div id="hero-viewport-area" class="w-full flex-1 relative rounded-xl overflow-hidden min-h-[280px]"></div>

        <!-- Footer Caption Bar -->
        <div id="hero-footer-caption" class="z-20 mt-2 flex items-center justify-between text-[11px] text-[#654332] bg-white/95 px-3.5 py-2.5 rounded-xl border border-[#E5D9C5] shadow-xs">
          <span class="font-bold text-[#302018]" id="hero-caption-title">${t('hero.feastTitle')}</span>
          <span class="text-[#777B52]" id="hero-caption-subtitle">${t('hero.feastSubtitle')}</span>
        </div>

      </div>
    `;

    // Wire mode buttons
    const btn3d = this.container.querySelector('#hero-tab-3d');
    const btnFeast = this.container.querySelector('#hero-tab-feast');

    if (btn3d && btnFeast) {
      btn3d.onclick = () => this.switchMode('3d');
      btnFeast.onclick = () => this.switchMode('feast');
    }
  }

  switchMode(mode) {
    this.currentMode = mode;

    const btn3d = this.container.querySelector('#hero-tab-3d');
    const btnFeast = this.container.querySelector('#hero-tab-feast');
    const hintEl = this.container.querySelector('#hero-showcase-hint');
    const titleEl = this.container.querySelector('#hero-caption-title');
    const subEl = this.container.querySelector('#hero-caption-subtitle');
    const viewport = this.container.querySelector('#hero-viewport-area');

    if (!viewport) return;

    if (mode === '3d') {
      // Style buttons
      if (btn3d) btn3d.className = 'px-3 py-1 rounded-full transition-all bg-[#302018] text-[#FAF6EF] shadow-xs flex items-center gap-1.5 cursor-pointer';
      if (btnFeast) btnFeast.className = 'px-3 py-1 rounded-full transition-all text-[#654332] hover:text-[#B85C38] flex items-center gap-1.5 cursor-pointer';
      if (hintEl) hintEl.textContent = t('hero.canvasHint');
      if (titleEl) titleEl.textContent = t('hero.canvasTitle');
      if (subEl) subEl.textContent = t('hero.canvasSubtitle');

      this.init3DScene(viewport);
    } else {
      // Clean up 3D scene when switching to photo mode
      this.disposeThreeResources();

      if (btn3d) btn3d.className = 'px-3 py-1 rounded-full transition-all text-[#654332] hover:text-[#B85C38] flex items-center gap-1.5 cursor-pointer';
      if (btnFeast) btnFeast.className = 'px-3 py-1 rounded-full transition-all bg-[#B85C38] text-white shadow-xs flex items-center gap-1.5 cursor-pointer';
      if (hintEl) hintEl.textContent = t('hero.feastSubtitle');
      if (titleEl) titleEl.textContent = t('hero.feastTitle');
      if (subEl) subEl.textContent = t('hero.feastSubtitle');

      this.initFeastHotspots(viewport);
    }
  }

  /* -------------------------------------------------------------
   * MODE 1: AUTHENTIC 3D PBR POTTERY & TABLEWARE INSPECTION
   * ----------------------------------------------------------- */
  init3DScene(viewport) {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) throw new Error('WebGL not supported');
    } catch (e) {
      this.renderFallback(viewport);
      return;
    }

    const width = viewport.clientWidth || 460;
    const height = viewport.clientHeight || 340;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    this.camera.position.copy(this.initialCameraPos);
    this.camera.lookAt(0, 0.35, 0);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    viewport.innerHTML = '';
    this.renderer.domElement.className = 'w-full h-full cursor-grab active:cursor-grabbing block webgl-canvas-container';
    this.renderer.domElement.style.touchAction = 'pan-y';
    viewport.appendChild(this.renderer.domElement);

    // 4. Studio Lighting
    this.setupLighting();

    // 5. Load Authentic Models
    this.loadPbrModels();

    // 6. UI Controls Overlay on Canvas
    this.createControlsOverlay(viewport);

    // 7. Event Listeners
    this.setupEvents(this.renderer.domElement);

    // 8. Render loop
    this.isDisposed = false;
    this.animate();
  }

  setupLighting() {
    // Soft warm ambient fill
    const ambientLight = new THREE.AmbientLight(0xFFF7EC, 1.3);
    this.scene.add(ambientLight);

    // Main Studio Key Light
    const keyLight = new THREE.DirectionalLight(0xFFEDD5, 2.5);
    keyLight.position.set(4, 6.5, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0006;
    this.scene.add(keyLight);

    // Warm Antique Gold Rim Light (Highlights textures and contours)
    const rimLight = new THREE.DirectionalLight(0xC49A58, 2.2);
    rimLight.position.set(-4, 3.8, -4);
    this.scene.add(rimLight);

    // Terracotta Soft Accent Fill
    const fillLight = new THREE.PointLight(0xB85C38, 0.9, 12);
    fillLight.position.set(-2.5, 1.2, 3.2);
    this.scene.add(fillLight);
  }

  loadPbrModels() {
    this.centerpieceGroup = new THREE.Group();
    this.scene.add(this.centerpieceGroup);

    const loader = new GLTFLoader();

    // 1. Carved Teak Platter (Base Pedestal)
    loader.load(
      '/assets/models/wooden-plate/carved_wooden_plate_1k.gltf',
      (gltf) => {
        const plate = gltf.scene;
        plate.scale.set(6.2, 6.2, 6.2);
        plate.position.set(0, -0.45, 0);
        plate.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        this.centerpieceGroup.add(plate);
      },
      undefined,
      () => {
        // Fallback procedural carved plate
        const plateGeo = new THREE.CylinderGeometry(2.2, 1.9, 0.14, 48);
        const plateMat = new THREE.MeshStandardMaterial({
          color: 0x4A2C1A,
          roughness: 0.65,
          metalness: 0.05
        });
        const plate = new THREE.Mesh(plateGeo, plateMat);
        plate.position.y = -0.45;
        plate.receiveShadow = true;
        this.centerpieceGroup.add(plate);
      }
    );

    // 2. Authentic Kasongan Ceramic Clay Pot (Gerabah Tanah Liat)
    loader.load(
      '/assets/models/clay-pot/ceramic_pot_1k.gltf',
      (gltf) => {
        const pot = gltf.scene;
        pot.scale.set(3.4, 3.4, 3.4);
        pot.position.set(0, -0.38, 0);
        pot.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        this.centerpieceGroup.add(pot);
      },
      undefined,
      () => {
        // Fallback procedural pot
        const potGeo = new THREE.SphereGeometry(0.85, 32, 24);
        potGeo.scale(1.2, 0.95, 1.2);
        const potMat = new THREE.MeshStandardMaterial({
          color: 0x7A3E26,
          roughness: 0.78,
          metalness: 0.05
        });
        const pot = new THREE.Mesh(potGeo, potMat);
        pot.position.y = 0.35;
        pot.castShadow = true;
        this.centerpieceGroup.add(pot);
      }
    );
  }

  createControlsOverlay(viewport) {
    const controls = document.createElement('div');
    controls.className = 'absolute bottom-3 right-3 z-20 flex items-center gap-1.5 pointer-events-auto';
    controls.innerHTML = `
      <button type="button" id="hero-zoom-out" title="${t('hero.zoomOut')}" class="w-7 h-7 rounded-lg bg-white/90 hover:bg-[#FAF6EF] text-[#302018] border border-[#E5D9C5] shadow-xs flex items-center justify-center text-sm font-bold transition-all cursor-pointer">
        -
      </button>
      <button type="button" id="hero-zoom-in" title="${t('hero.zoomIn')}" class="w-7 h-7 rounded-lg bg-white/90 hover:bg-[#FAF6EF] text-[#302018] border border-[#E5D9C5] shadow-xs flex items-center justify-center text-sm font-bold transition-all cursor-pointer">
        +
      </button>
      <button type="button" id="hero-reset-view" title="${t('hero.resetCamera')}" class="p-1.5 px-2 rounded-lg bg-white/90 hover:bg-[#FAF6EF] text-[#302018] border border-[#E5D9C5] shadow-xs flex items-center gap-1 text-[11px] font-semibold transition-all cursor-pointer">
        <svg class="w-3.5 h-3.5 text-[#B85C38]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
        </svg>
      </button>
      <button type="button" id="hero-toggle-rotate" title="${t('hero.autoRotateToggle')}" class="p-1.5 px-2 rounded-lg bg-white/90 hover:bg-[#FAF6EF] text-[#302018] border border-[#E5D9C5] shadow-xs flex items-center gap-1 text-[11px] font-semibold transition-all cursor-pointer">
        <span class="w-2 h-2 rounded-full ${this.autoRotate ? 'bg-[#B85C38] animate-pulse' : 'bg-gray-400'}"></span>
      </button>
    `;
    viewport.appendChild(controls);

    // Bind controls
    controls.querySelector('#hero-zoom-in')?.addEventListener('click', () => {
      this.targetZoom = Math.max(3.2, this.targetZoom - 0.5);
    });
    controls.querySelector('#hero-zoom-out')?.addEventListener('click', () => {
      this.targetZoom = Math.min(6.5, this.targetZoom + 0.5);
    });
    controls.querySelector('#hero-reset-view')?.addEventListener('click', () => {
      this.targetRotationX = 0.28;
      this.targetRotationY = 0;
      this.targetZoom = 4.8;
    });
    controls.querySelector('#hero-toggle-rotate')?.addEventListener('click', (e) => {
      this.autoRotate = !this.autoRotate;
      const dot = e.currentTarget.querySelector('span');
      if (dot) {
        dot.className = `w-2 h-2 rounded-full ${this.autoRotate ? 'bg-[#B85C38] animate-pulse' : 'bg-gray-400'}`;
      }
    });
  }

  setupEvents(domElement) {
    if (!domElement) return;
    domElement.addEventListener('pointerdown', this.onPointerDown);
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
    window.addEventListener('resize', this.onWindowResize);
  }

  onPointerDown(e) {
    this.isPointerDown = true;
    this.previousPointerPosition = { x: e.clientX, y: e.clientY };
  }

  onPointerMove(e) {
    if (!this.isPointerDown) return;
    const deltaX = e.clientX - this.previousPointerPosition.x;
    const deltaY = e.clientY - this.previousPointerPosition.y;

    this.targetRotationY += deltaX * 0.01;
    this.targetRotationX += deltaY * 0.008;

    // Constrain pitch rotation so user doesn't flip underneath table
    this.targetRotationX = Math.max(0.08, Math.min(Math.PI / 2.8, this.targetRotationX));

    this.previousPointerPosition = { x: e.clientX, y: e.clientY };
  }

  onPointerUp() {
    this.isPointerDown = false;
  }

  onWindowResize() {
    if (this.currentMode !== '3d' || !this.renderer || !this.camera) return;
    const viewport = this.container.querySelector('#hero-viewport-area');
    if (!viewport) return;

    const width = viewport.clientWidth;
    const height = viewport.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    if (this.isDisposed || this.currentMode !== '3d') return;
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Smooth inertia interpolation
    this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.07;
    this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.07;
    this.currentZoom += (this.targetZoom - this.currentZoom) * 0.08;

    if (this.camera) {
      this.camera.position.z = this.currentZoom;
      this.camera.position.y = this.currentZoom * 0.52;
      this.camera.lookAt(0, 0.35, 0);
    }

    if (this.centerpieceGroup) {
      if (this.autoRotate && !this.isPointerDown) {
        this.targetRotationY += 0.004;
      }

      this.centerpieceGroup.rotation.x = this.currentRotationX;
      this.centerpieceGroup.rotation.y = this.currentRotationY;

      // Gentle breathing float
      this.centerpieceGroup.position.y = Math.sin(Date.now() * 0.0018) * 0.025;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  /* -------------------------------------------------------------
   * MODE 2: INTERACTIVE PHOTOGRAPHIC CULINARY FEAST & HOTSPOTS
   * ----------------------------------------------------------- */
  initFeastHotspots(viewport) {
    const dishes = [
      {
        id: 'nasi-liwet',
        title: t('hero.dishNasiLiwet'),
        desc: t('hero.dishNasiLiwetDesc'),
        region: 'Surakarta (Solo)',
        slug: 'nasi-liwet-solo',
        x: '48%',
        y: '48%'
      },
      {
        id: 'garang-asem',
        title: t('hero.dishGarangAsem'),
        desc: t('hero.dishGarangAsemDesc'),
        region: 'Pekalongan & Kudus',
        slug: 'garang-asem-ayam',
        x: '76%',
        y: '54%'
      },
      {
        id: 'soto-kudus',
        title: t('hero.dishSotoKudus'),
        desc: t('hero.dishSotoKudusDesc'),
        region: 'Kudus',
        slug: 'soto-kudus',
        x: '38%',
        y: '72%'
      },
      {
        id: 'mendoan',
        title: t('hero.dishMendoan'),
        desc: t('hero.dishMendoanDesc'),
        region: 'Banyumas',
        slug: 'tempe-mendoan-purwokerto',
        x: '63%',
        y: '72%'
      }
    ];

    viewport.innerHTML = `
      <div class="relative w-full h-full rounded-xl overflow-hidden group select-none">
        <!-- High-res Feast Photograph -->
        <img 
          src="/assets/images/hero/hero-culinary.jpg" 
          alt="Jamuan Pusaka Jawa Tengah" 
          class="w-full h-full object-cover object-center filter brightness-[0.96] transition-transform duration-700 ease-out group-hover:scale-102"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

        <!-- Hotspot Pins -->
        ${dishes.map((dish, i) => `
          <div 
            class="culinary-hotspot" 
            data-dish-id="${dish.id}"
            style="top: ${dish.y}; left: ${dish.x};"
          >
            <div class="culinary-hotspot-pulse"></div>
            <div class="culinary-hotspot-pin">
              ${i + 1}
            </div>
          </div>
        `).join('')}

        <!-- Interactive Popover Card -->
        <div 
          id="feast-hotspot-popover" 
          class="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#C49A58]/40 shadow-xl text-left transition-all duration-300 opacity-0 pointer-events-none translate-y-2 z-30"
        >
          <div class="flex items-start justify-between gap-2">
            <div>
              <span id="popover-dish-region" class="inline-block text-[10px] font-bold uppercase tracking-wider text-[#B85C38] bg-[#F2E8D8] px-2 py-0.5 rounded-md mb-1">
                Wilayah
              </span>
              <h4 id="popover-dish-title" class="font-editorial-serif text-sm font-bold text-[#302018] leading-tight">
                Nama Hidangan
              </h4>
              <p id="popover-dish-desc" class="text-xs text-[#654332] mt-1 leading-relaxed">
                Deskripsi
              </p>
            </div>
            <button type="button" id="popover-close-btn" class="text-[#654332] hover:text-[#302018] p-1 font-bold text-sm cursor-pointer">&times;</button>
          </div>
          <div class="mt-2.5 pt-2 border-t border-[#E5D9C5] flex items-center justify-between">
            <a id="popover-dish-link" href="#/resep" class="text-xs font-bold text-[#B85C38] hover:text-[#A04A27] flex items-center gap-1">
              <span>${t('recipesSection.viewRecipeBtn')}</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <span class="text-[10px] text-[#777B52] italic">${t('hero.canvasBadge')}</span>
          </div>
        </div>

      </div>
    `;

    const popover = viewport.querySelector('#feast-hotspot-popover');
    const popTitle = viewport.querySelector('#popover-dish-title');
    const popDesc = viewport.querySelector('#popover-dish-desc');
    const popRegion = viewport.querySelector('#popover-dish-region');
    const popLink = viewport.querySelector('#popover-dish-link');
    const popClose = viewport.querySelector('#popover-close-btn');

    const showDish = (dish) => {
      if (!popover) return;
      popTitle.textContent = dish.title;
      popDesc.textContent = dish.desc;
      popRegion.textContent = dish.region;
      popLink.href = `#/resep/${dish.slug}`;
      popover.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
      popover.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');

      viewport.querySelectorAll('.culinary-hotspot').forEach(pin => {
        pin.classList.toggle('active', pin.getAttribute('data-dish-id') === dish.id);
      });
    };

    const hideDish = () => {
      if (!popover) return;
      popover.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
      popover.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      viewport.querySelectorAll('.culinary-hotspot').forEach(pin => pin.classList.remove('active'));
    };

    viewport.querySelectorAll('.culinary-hotspot').forEach(pin => {
      const dishId = pin.getAttribute('data-dish-id');
      const dish = dishes.find(d => d.id === dishId);
      if (dish) {
        pin.addEventListener('click', (e) => {
          e.stopPropagation();
          showDish(dish);
        });
      }
    });

    popClose?.addEventListener('click', (e) => {
      e.stopPropagation();
      hideDish();
    });

    viewport.addEventListener('click', (e) => {
      if (!e.target.closest('#feast-hotspot-popover')) {
        hideDish();
      }
    });
  }

  renderFallback(viewport) {
    viewport.innerHTML = `
      <div class="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-[#302018]/10">
        <img src="/assets/images/hero/hero-culinary.jpg" 
             alt="Pusaka Kuliner Jawa Tengah" 
             class="w-full h-full object-cover rounded-xl shadow-xl"/>
        <div class="absolute bottom-4 left-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-xl text-white text-xs">
          <p class="font-bold text-[#C49A58]">${t('hero.canvasTitle')}</p>
          <p class="text-[11px] opacity-80">${t('hero.canvasSubtitle')}</p>
        </div>
      </div>
    `;
  }

  disposeThreeResources() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    const el = this.renderer?.domElement;
    if (el) {
      el.removeEventListener('pointerdown', this.onPointerDown);
    }
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    window.removeEventListener('resize', this.onWindowResize);

    if (this.scene) {
      this.scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      this.scene = null;
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
    this.camera = null;
    this.centerpieceGroup = null;
  }

  dispose() {
    this.isDisposed = true;
    this.disposeThreeResources();
  }
}
