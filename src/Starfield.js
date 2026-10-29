import * as THREE from "three";

export class Starfield {
  constructor(texturePath, scene) {
    // Creamos una esfera gigante (radio 500) para que cubra todo el fondo espacial
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    
    const loader = new THREE.TextureLoader();
    
    // Usamos MeshBasicMaterial porque las estrellas no deben recibir sombras ni luces
    const material = new THREE.MeshBasicMaterial({
      map: loader.load(texturePath),
      side: THREE.BackSide // Clave: renderiza la textura por dentro de la esfera
    });

    this.mesh = new THREE.Mesh(geometry, material);
    scene.add(this.mesh);
  }
}