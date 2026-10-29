import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"; // NUEVO

export class CameraManager {
  constructor(renderer, scene) {
    this.scene = scene;
    this.renderer = renderer;

    // --- 1. CÁMARA DE ÓRBITA (Sistema Solar) ---
    this.orbitCamera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.orbitCamera.position.set(0, 0, 45);
    this.orbitControls = new OrbitControls(this.orbitCamera, renderer.domElement);

    // --- 2. CÁMARA EN PRIMERA PERSONA (Nave con FlyControls) ---
    this.flightCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.flightCamera.position.set(0, 0, 15);

    // --- Nave (modelo FBX) --- NUEVO: sustituye al cono y a todo el diseño anterior
    this.spaceship = new THREE.Group();
    this.spaceship.visible = false; // empieza oculta (modo órbita)
    this.flightCamera.add(this.spaceship);

    // Luz propia para que la nave se vea aunque baje la luz ambiental
    const spaceshipLight = new THREE.PointLight(0xffffff, 2, 15);
    spaceshipLight.position.set(0, 2, 2);
    this.spaceship.add(spaceshipLight);

    new FBXLoader().load(
      "src/models/spaceship.fbx", // cambia por la ruta real de tu archivo
      (modelo) => {
        modelo.scale.set(0.007, 0.007, 0.007); // ajusta el tamaño
        modelo.position.set(0, -1.2, -2.0);   // ajusta la posición en pantalla
        modelo.rotation.y = Math.PI;        // gira si el morro mira hacia atrás
        this.spaceship.add(modelo);
      },
      undefined,
      (err) => console.error("Error cargando la nave:", err)
    );

    this.scene.add(this.flightCamera); // la cámara (y su nave) a la escena

    this.flightControls = new FlyControls(this.flightCamera, renderer.domElement);
    this.flightControls.dragToLook = true;
    this.flightControls.movementSpeed = 5;
    this.flightControls.rollSpeed = 1;

    // Estado inicial: Modo Órbita
    this.activeCamera = this.orbitCamera;
    this.isOrbitMode = true;
  }

  // Alternar entre cámaras
  toggleCameraMode() {
    this.isOrbitMode = !this.isOrbitMode;
    if (this.isOrbitMode) {
      this.activeCamera = this.orbitCamera;
      this.spaceship.visible = false;
      return "Modo: Órbita General";
    } else {
      this.activeCamera = this.flightCamera;
      this.spaceship.visible = true;
      return "Modo: Vuelo en Nave";
    }
  }

  // Actualizar controles activos según el modo
  update(delta) {
    if (this.isOrbitMode) {
      this.orbitControls.update();
    } else {
      this.flightControls.update(delta);
    }
  }

  getActiveCamera() {
    return this.activeCamera;
  }
}