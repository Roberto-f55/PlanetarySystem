import * as THREE from "three";

export class Planet {
  constructor(radius, distance, speed, color, f1, f2, textures, scene) {
    this.distance = distance;
    this.speed = speed;
    this.f1 = f1;
    this.f2 = f2;

    this.geometry = new THREE.SphereGeometry(radius, 40, 40);

    let materialOptions = { color: color };

    // 1. Configurar mapas de textura del planeta base
    if (textures) {
      const loader = new THREE.TextureLoader();
      
      if (textures.map) {
        materialOptions.map = loader.load(textures.map);
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

    // 2. Crear el planeta PRIMERO
    this.material = new THREE.MeshPhongMaterial(materialOptions);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    scene.add(this.mesh);

    // 3. Crear y emparentar las nubes/atmósfera DESPUÉS (si existen)
    if (textures && textures.clouds) {
      const loader = new THREE.TextureLoader();
      const cloudGeo = new THREE.SphereGeometry(radius * 1.02, 40, 40);
      
      let cloudMatOptions = {
        color: 0xffffff,
        map: loader.load(textures.clouds),
        transparent: true,
        side: THREE.DoubleSide
      };

      if (textures.cloudsAlpha) {
        cloudMatOptions.alphaMap = loader.load(textures.cloudsAlpha);
        cloudMatOptions.opacity = 1.0;
      } else {
        cloudMatOptions.opacity = 0.5;
        cloudMatOptions.depthWrite = false;
      }

      const cloudMaterial = new THREE.MeshPhongMaterial(cloudMatOptions);
      this.cloudMesh = new THREE.Mesh(cloudGeo, cloudMaterial);
      
      this.mesh.add(this.cloudMesh);
    }

    // 4. Crear y emparentar los anillos (si existen, como en Saturno)
    if (textures && textures.ring) {
      const loader = new THREE.TextureLoader();
      const ringGeo = new THREE.RingGeometry(textures.ring.innerRadius, textures.ring.outerRadius, 64);
      ringGeo.rotateX(Math.PI / 2);

      let ringMatOptions = {
        side: THREE.DoubleSide,
        transparent: true
      };

      if (textures.ring.map) {
        ringMatOptions.map = loader.load(textures.ring.map);
        ringMatOptions.color = 0xffffff;
      }
      if (textures.ring.alphaMap) {
        ringMatOptions.alphaMap = loader.load(textures.ring.alphaMap);
      }

      const ringMat = new THREE.MeshPhongMaterial(ringMatOptions);
      this.ringMesh = new THREE.Mesh(ringGeo, ringMat);
      
      this.mesh.add(this.ringMesh);
    }

    // 5. Órbita visual
    const curve = new THREE.EllipseCurve(
      0, 0, 
      this.distance * this.f1, 
      this.distance * this.f2 
    );
    const points = curve.getPoints(50);
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    this.orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
    
    scene.add(this.orbitLine);
  }

  update(timestamp) {
    this.mesh.position.x = Math.cos(timestamp * this.speed) * this.f1 * this.distance;
    this.mesh.position.y = Math.sin(timestamp * this.speed) * this.f2 * this.distance;
  }
}