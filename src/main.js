import * as THREE from "three";
import { CameraManager } from "./CameraManager.js";
import { Star } from "./Star.js";
import { Moon } from "./Moon.js";
import { Planet } from "./Planet.js";
import { Starfield } from "./Starfield.js";
import { solarSystemData, starData } from "./data.js";

const ESCALA = 2;

let scene, renderer;
let cameraManager;
let grid;
let planets = [];
let moons = [];
let clock = new THREE.Clock();
let info;

init();
animationLoop();

function init() {
  info = document.createElement("div");
  info.style.position = "absolute";
  info.style.top = "30px";
  info.style.width = "100%";
  info.style.textAlign = "center";
  info.style.color = "#fff";
  info.style.fontWeight = "bold";
  info.style.backgroundColor = "transparent";
  info.style.zIndex = "1";
  info.style.fontFamily = "Monospace";
  info.innerHTML = "Planetary System";
  document.body.appendChild(info);

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Inicializar el gestor de cámaras
  cameraManager = new CameraManager(renderer, scene);

  // --- CONECTAR BOTONES DESDE EL HTML ---
  
  // 1. Botón Rejilla
  const gridButton = document.getElementById("gridButton");
  if (gridButton) {
    gridButton.addEventListener("click", () => {
      grid.visible = !grid.visible;
    });
  }

  // 2. Botón Cambiar Cámara
  const camButton = document.getElementById("camButton");
  if (camButton) {
    camButton.addEventListener("click", () => {
      cameraManager.toggleCameraMode();
      camButton.innerHTML = cameraManager.isOrbitMode ? "Cambiar a Vuelo" : "Cambiar a Órbita";
    });
  }
  // --------------------------------------

  // Iluminación y Fondo Estrellado
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 2.0, 300);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

  new Starfield("src/img/space/2k_stars_milky_way.jpg", scene);

  // Crear Sol y Planetas
  new Star(starData.radius * ESCALA, starData.color, starData.textures, scene);
  createSolarSystem();

  // Rejilla
  grid = new THREE.GridHelper(147, 147);
  grid.geometry.rotateX(Math.PI / 2);
  grid.position.set(0, 0, 0.05);
  scene.add(grid);

  window.addEventListener("resize", onWindowResize);
}

function createSolarSystem() {
  for (let pData of solarSystemData) {
    // El anillo de Saturno también tiene que escalarse
    let textures = pData.textures;
    if (textures.ring) {
      textures = {
        ...textures,
        ring: {
          ...textures.ring,
          innerRadius: textures.ring.innerRadius * ESCALA,
          outerRadius: textures.ring.outerRadius * ESCALA,
        },
      };
    }

    let planet = new Planet(
      pData.radius * ESCALA,
      pData.distance * ESCALA,
      pData.speed,
      pData.color,
      pData.f1,
      pData.f2,
      textures,
      scene
    );
    planets.push(planet);

    for (let mData of pData.moons) {
      const moon = new Moon(
        planet,
        mData.radius * ESCALA,
        mData.distance * ESCALA,
        mData.speed,
        mData.color,
        mData.angle || 0,
        mData.textures
      );
      moons.push(moon);
    }
  }
}

function onWindowResize() {
  cameraManager.orbitCamera.aspect = window.innerWidth / window.innerHeight;
  cameraManager.orbitCamera.updateProjectionMatrix();
  cameraManager.flightCamera.aspect = window.innerWidth / window.innerHeight;
  cameraManager.flightCamera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animationLoop() {
  requestAnimationFrame(animationLoop);

  let delta = clock.getDelta();
  let timestamp = Date.now() * 0.0005;

  for (let planet of planets) {
    planet.update(timestamp);
  }

  for (let moon of moons) {
    moon.update(timestamp);
  }

  cameraManager.update(delta);
  renderer.render(scene, cameraManager.getActiveCamera());
}