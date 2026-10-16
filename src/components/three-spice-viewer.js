import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Upgraded Three.js Interactive 3D Spice Inspector
 * With authentic PBR earthenware clay pot / gerabah pedestal and 360-degree rotation.
 */

export class ThreeSpiceViewer {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.animId = null;
    this.spiceMeshGroup = null;
    this.isDisposed = false;

    this.isDragging = false;
    this.prevPointer = { x: 0, y: 0 };
    this.rotVelocity = { x: 0, y: 0.005 };

    this.onDown = this.onDown.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onUp = this.onUp.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  init(spice) {
    if (!this.container) return;

    const width = this.container.clientWidth || 320;
    const height = this.container.clientHeight || 320;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    this.camera.position.set(0, 1.7, 3.6);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.innerHTML = '';
    this.renderer.domElement.className = 'w-full h-full cursor-grab active:cursor-grabbing block';
    this.container.appendChild(this.renderer.domElement);

    // Warm Ambient & Directional Lights
    const amb = new THREE.AmbientLight(0xfff6ea, 1.25);
    this.scene.add(amb);

    const dirLight = new THREE.DirectionalLight(0xffeed4, 2.2);
    dirLight.position.set(3, 5, 4);
    dirLight.castShadow = true;
    this.scene.add(dirLight);

    const rimLight = new THREE.PointLight(0xc49a58, 1.8, 10);
    rimLight.position.set(-3, 2, -3);
    this.scene.add(rimLight);

    // Build 3D Spice Model
    this.buildSpiceGeometry(spice);

    // Events
    const el = this.renderer.domElement;
    el.addEventListener('pointerdown', this.onDown);
    window.addEventListener('pointermove', this.onMove);
    window.addEventListener('pointerup', this.onUp);
    window.addEventListener('resize', this.onResize);

    this.animate = this.animate.bind(this);
    this.animate();
  }

  buildSpiceGeometry(spice) {
    if (this.spiceMeshGroup) {
      this.scene.remove(this.spiceMeshGroup);
    }

    this.spiceMeshGroup = new THREE.Group();
    this.scene.add(this.spiceMeshGroup);

    // 1. Authentic Earthenware Clay Pot / Gerabah (1K PBR GLTF)
    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/clay-pot/ceramic_pot_1k.gltf',
      (gltf) => {
        const potModel = gltf.scene;
        potModel.scale.set(3.2, 3.2, 3.2);
        potModel.position.set(0, -1.05, 0);
        potModel.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        this.spiceMeshGroup.add(potModel);
      },
      undefined,
      () => {
        // Fallback procedural cobek
        const cobekGeo = new THREE.CylinderGeometry(1.45, 1.15, 0.24, 40);
        const cobekMat = new THREE.MeshStandardMaterial({
          color: 0x221F1D,
          roughness: 0.9,
          metalness: 0.05
        });
        const cobek = new THREE.Mesh(cobekGeo, cobekMat);
        cobek.position.y = -0.72;
        cobek.receiveShadow = true;
        this.spiceMeshGroup.add(cobek);
      }
    );

    // 2. Dynamic 3D Spice Model
    const colorHex = parseInt(spice.modelColor?.replace('#', '0x') || '0xC49A58', 16);
    let spiceMesh;

    if (spice.category === 'rimpang') {
      // Segmented Rhizome (Jahe / Kunyit / Lengkuas)
      const rimpangGroup = new THREE.Group();
      const seg1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.36, 1.25, 20),
        new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.72, metalness: 0.05 })
      );
      seg1.rotation.z = 0.52;
      rimpangGroup.add(seg1);

      const branch = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.26, 0.85, 16),
        new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.75, metalness: 0.05 })
      );
      branch.position.set(0.42, 0.22, 0.22);
      branch.rotation.z = -0.72;
      rimpangGroup.add(branch);

      spiceMesh = rimpangGroup;
    } else if (spice.category === 'biji') {
      // Candlenut / Coriander Seeds Cluster
      const cluster = new THREE.Group();
      for (let i = 0; i < 5; i++) {
        const seed = new THREE.Mesh(
          new THREE.SphereGeometry(0.28, 20, 20),
          new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.48, metalness: 0.08 })
        );
        seed.scale.set(1.05, 0.88, 1.15);
        seed.position.set(
          Math.sin(i * 1.3) * 0.42,
          (i % 2) * 0.16,
          Math.cos(i * 1.3) * 0.42
        );
        cluster.add(seed);
      }
      spiceMesh = cluster;
    } else if (spice.category === 'daun') {
      // Natural Curved Leaf (Daun Salam / Daun Jeruk)
      const leafGeo = new THREE.PlaneGeometry(0.95, 1.6, 12, 12);
      const pos = leafGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        pos.setZ(i, -Math.sin(x * 2.6) * 0.16 + (1 - y) * 0.12);
      }
      leafGeo.computeVertexNormals();

      const leafMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: 0.4,
        side: THREE.DoubleSide
      });
      spiceMesh = new THREE.Mesh(leafGeo, leafMat);
      spiceMesh.rotation.x = -Math.PI / 3;
    } else {
      // Shallot / Garlic / Kecombrang Bulb
      const bulbGeo = new THREE.SphereGeometry(0.58, 32, 32);
      bulbGeo.scale(1, 1.28, 1);
      const bulbMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: 0.42,
        metalness: 0.1
      });
      spiceMesh = new THREE.Mesh(bulbGeo, bulbMat);
    }

    spiceMesh.position.y = 0.16;
    spiceMesh.castShadow = true;
    this.spiceMeshGroup.add(spiceMesh);
  }

  onDown(e) {
    this.isDragging = true;
    this.prevPointer = { x: e.clientX, y: e.clientY };
  }

  onMove(e) {
    if (!this.isDragging || !this.spiceMeshGroup) return;
    const dx = e.clientX - this.prevPointer.x;
    const dy = e.clientY - this.prevPointer.y;

    this.spiceMeshGroup.rotation.y += dx * 0.012;
    this.spiceMeshGroup.rotation.x += dy * 0.008;

    this.prevPointer = { x: e.clientX, y: e.clientY };
  }

  onUp() {
    this.isDragging = false;
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  animate() {
    if (this.isDisposed) return;
    this.animId = requestAnimationFrame(this.animate);

    if (this.spiceMeshGroup && !this.isDragging) {
      this.spiceMeshGroup.rotation.y += 0.0055;
    }

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.isDisposed = true;
    if (this.animId) cancelAnimationFrame(this.animId);
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('pointerup', this.onUp);
    window.removeEventListener('resize', this.onResize);
    if (this.renderer) this.renderer.dispose();
  }
}
