import * as THREE from "three";

export class Moon {
  constructor(planet, radius, distance, speed, color, angle, textures) {
    this.distance = distance;
    this.speed = speed;

    this.pivot = new THREE.Object3D();
    this.pivot.rotation.x = angle;
    planet.mesh.add(this.pivot);

    this.geometry = new THREE.SphereGeometry(radius, 40, 40);

    let materialOptions = { color: color };

    if (textures) {
      const loader = new THREE.TextureLoader();
      if (textures.map) {
        materialOptions.map = loader.load(
          textures.map,
          undefined,
          undefined,
          () => {
            // Si la imagen no carga, vuelve al color sencillo
            this.material.map = null;
            this.material.color.set(color);
            this.material.needsUpdate = true;
          }
        );
        materialOptions.color = 0xffffff;
      }

      if (textures.bump) {
        materialOptions.bumpMap = loader.load(textures.bump);
        materialOptions.bumpScale = 0.05;
      }

      if (textures.specular) {
        materialOptions.specularMap = loader.load(textures.specular);
        materialOptions.specular = new THREE.Color("grey");
      }
    }

    this.material = new THREE.MeshPhongMaterial(materialOptions);
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.pivot.add(this.mesh);
  }

  update(timestamp) {
    this.mesh.position.x = Math.cos(timestamp * this.speed) * this.distance;
    this.mesh.position.y = Math.sin(timestamp * this.speed) * this.distance;
  }
}