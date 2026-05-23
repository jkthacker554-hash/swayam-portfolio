/**
 * Three.js particle field + finger trail bursts.
 */
import * as THREE from "three";

export class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 50;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    this._initField();
    this._trailPool = [];
    this._maxTrails = 400;

    window.addEventListener("resize", () => this._onResize());
  }

  _initField() {
    const count = 1200;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.15,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    this.field = new THREE.Points(geo, mat);
    this.scene.add(this.field);
  }

  _onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  emit(screenX, screenY, color = 0x00f0ff) {
    if (this._trailPool.length > this._maxTrails) return;
    // Map screen pixels to world space (orthographic-style, low latency)
    const x = (screenX / window.innerWidth) * 100 - 50;
    const y = -(screenY / window.innerHeight) * 60 + 30;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([x, y, 0], 3)
    );
    const mat = new THREE.PointsMaterial({
      color,
      size: 0.4,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const p = new THREE.Points(geo, mat);
    p.userData.life = 1;
    this.scene.add(p);
    this._trailPool.push(p);
  }

  tick() {
    this.field.rotation.y += 0.0008;
    this.field.rotation.x += 0.0003;

    for (let i = this._trailPool.length - 1; i >= 0; i--) {
      const p = this._trailPool[i];
      p.userData.life -= 0.04;
      p.material.opacity = p.userData.life;
      p.scale.multiplyScalar(0.96);
      if (p.userData.life <= 0) {
        this.scene.remove(p);
        p.geometry.dispose();
        p.material.dispose();
        this._trailPool.splice(i, 1);
      }
    }

    this.renderer.render(this.scene, this.camera);
  }
}
