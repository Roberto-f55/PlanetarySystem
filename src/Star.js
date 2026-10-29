import * as THREE from "three";

export class Star {
  constructor(radius, color, textures, scene) {
    // Subimos la resolución a 40x40 para que sea bien redonda
    this.geometry = new THREE.SphereGeometry(radius, 40, 40);
    
    let materialOptions = { color: color };

    if (textures && textures.map) {
      const loader = new THREE.TextureLoader();
      materialOptions.map = loader.load(textures.map);
      // Si hay textura, forzamos el blanco para no teñir la foto
      materialOptions.color = 0xffffff; 
    }

    this.material = new THREE.MeshBasicMaterial(materialOptions);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    
    scene.add(this.mesh);
  }
}