export const starData = {
  radius: 2.5,
  color: 0xffcc00, // Color original del Sol (amarillo)
  textures: { map: "src/img/sun/8k_sun.jpg" }
};

export const solarSystemData = [
  {
    name: "Mercury",
    radius: 0.2, distance: 4.0, speed: 4.1, color: 0x888888, f1: 1.0, f2: 1.1,
    textures: { map: "src/img/mercury/2k_mercury.jpg" },
    moons: []
  },
  {
    name: "Venus",
    radius: 0.4, distance: 6.0, speed: 1.6, color: 0xe3bb76, f1: 1.0, f2: 1.0,
    textures: { map: "src/img/venus/2k_venus_surface.jpg", clouds : "src/img/venus/atmosphere.jpg" },
    moons: []
  },
  {
    name: "Earth",
    radius: 0.5, distance: 8.5, speed: 1.0, color: 0x2233ff, f1: 1.0, f2: 1.0,
    textures: {
      map: "src/img/earth/earthmap1k.jpg",
      bump: "src/img/earth/earthbump1k.jpg",
      specular: "src/img/earth/earthspec1k.jpg",
      clouds: "src/img/earth/earthcloudmaptrans.jpg",
      cloudsAlpha: "src/img/earth/earthcloudmaptrans.jpg"
    },
    moons: [
      // La Luna
      { 
        radius: 0.15, distance: 0.8, speed: 12.0, color: 0xdddddd, angle: 0.1,
        textures: { map: "src/img/moon/2k_moon.jpg", }
      }
    ]
  },
  {
    name: "Mars",
    radius: 0.3, distance: 11.0, speed: 0.5, color: 0xff4400, f1: 1.0, f2: 1.1,
    textures: { map: "src/img/mars/2k_mars.jpg", bump: "src/img/mars/marsbump1k.jpg" },
    moons: [
      // Fobos
      { radius: 0.05, distance: 0.5, speed: 15.0, color: 0xcccccc, angle: 0.2 },
      // Deimos
      { radius: 0.08, distance: 0.7, speed: 10.0, color: 0xaaaaaa, angle: 0.5 }
    ]
  },
  {
    name: "Jupiter",
    radius: 1.8, distance: 17.0, speed: 0.2, color: 0xd9a46a, f1: 1.0, f2: 1.0,
    textures: { map: "src/img/jupiter/2k_jupiter.jpg" },
    moons: [
      // Lunas galileanas (Ío, Europa, Ganimedes, Calisto)
      { radius: 0.12, distance: 2.2, speed: 8.0, color: 0xffffaa, angle: 0.05 },
      { radius: 0.1, distance: 2.6, speed: 6.0, color: 0xeeeeee, angle: 0.1},
      { radius: 0.18, distance: 3.2, speed: 4.0, color: 0xbbbbbb, angle: 0.15 },
      { radius: 0.16, distance: 3.8, speed: 2.5, color: 0x888888, angle: 0.2 }
    ]
  },
  {
    name: "Saturn",
    radius: 1.5, distance: 25.0, speed: 0.08, color: 0xebd2a9, f1: 1.0, f2: 1.0,
    textures: { 
      map: "src/img/saturn/2k_saturn.jpg",
      ring: {
        innerRadius: 1.8,  // Debe ser mayor que el radio del planeta (1.5)
        outerRadius: 3.5,  // Hasta dónde llega el anillo
        map: "src/img/saturn/2k_saturn_ring_alpha.png",      // La textura del anillo
      }  },
    moons: [
      // Titán
      { radius: 0.2, distance: 2.5, speed: 4.0, color: 0xffcc00, angle: 0.1},
      // Encélado
      { radius: 0.08, distance: 1.8, speed: 7.0, color: 0xffffff, angle: 0.3}
    ]
  },
  {
    name: "Uranus",
    radius: 1.1, distance: 31.0, speed: 0.03, color: 0xaaddff, f1: 1.0, f2: 1.0,
    textures: { map: "src/img/uranus/2k_uranus.jpg" },
    moons: [
      // Titania
      { radius: 0.12, distance: 1.5, speed: 3.0, color: 0xcccccc, angle: 0.4}
    ]
  },
  {
    name: "Neptune",
    radius: 1.0, distance: 36.0, speed: 0.01, color: 0x3366ff, f1: 1.0, f2: 1.0,
    textures: { map: "src/img/neptune/2k_neptune.jpg" },
    moons: [
      // Tritón (órbita retrógrada, velocidad negativa)
      { radius: 0.15, distance: 1.6, speed: -4.0, color: 0xbbbbff, angle: 0.2, textures: { map: "src/img/neptune/tritonmap1k.jpg" } }
    ]
  }
];