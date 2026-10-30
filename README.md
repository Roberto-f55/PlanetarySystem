# Sistema Planetario con Three.js

Simulación 3D interactiva de un sistema planetario hecha con **Three.js**. Incluye el Sol, ocho planetas con texturas, varias lunas, iluminación, un fondo estrellado y **dos vistas**: una vista general del sistema (órbita) y una vista subjetiva desde una nave.

- **Autor:** Roberto Rodríguez Guillén
- **Demo (CodeSandbox):** https://codesandbox.io/p/sandbox/planetary-system-vtsm66
- **Vídeo de captura:** https://youtu.be/-BG0EHeJ9Mg

---

## 1. Descripción del trabajo realizado

### Contenido de la escena

| Elemento | Detalle |
|---|---|
| **Sol** | Esfera con textura y material sin sombreado (`MeshBasicMaterial`), de modo que se ve luminosa. Actúa como fuente de luz de la escena. |
| **Planetas (8)** | Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano y Neptuno, cada uno con su textura, tamaño, distancia y velocidad orbital. |
| **Órbitas** | Cada planeta describe una órbita **elíptica** en el plano XY. Los factores `f1` y `f2` de `data.js` definen los semiejes (`distancia × f1` y `distancia × f2`), y la órbita se dibuja como una línea con `EllipseCurve`. |
| **Lunas** | Luna (Tierra), Fobos y Deimos (Marte), Ío, Europa, Ganimedes y Calisto (Júpiter), Titán y Encélado (Saturno), Titania (Urano) y Tritón (Neptuno, con órbita retrógrada gracias a una velocidad negativa). Cada luna orbita a su planeta con una inclinación propia. |
| **Capas extra** | Relieve (*bump map*) en la Tierra y Marte, mapa especular en la Tierra, **capa de nubes** (una segunda esfera un 2 % mayor, semitransparente) en la Tierra y Venus, y **anillos** en Saturno (`RingGeometry` con textura con transparencia). |
| **Fondo** | Esfera gigante (radio 500) con la textura de la Vía Láctea, renderizada por dentro (`BackSide`) y con `MeshBasicMaterial`, para que las luces no le afecten. |
| **Rejilla** | Rejilla de referencia que se puede mostrar u ocultar. |

> Las distancias y tamaños **no están a escala real**: se han ajustado para que todos los astros sean visibles y se puedan recorrer cómodamente.

### Iluminación

- **Luz ambiental** tenue, para que las zonas sin sol no queden completamente negras.
- **Luz puntual en el Sol** (posición `0, 0, 0`), que ilumina los planetas y sus lunas desde el centro. Se aprecia así la cara iluminada y la cara oscura de cada astro.
- Los planetas y las lunas usan `MeshPhongMaterial`, que reacciona a la luz y permite relieve y reflejos. El Sol y el fondo usan `MeshBasicMaterial`, que no depende de las luces.
- La nave lleva además su **propia luz** para que se vea bien aunque la iluminación del entorno sea baja.

### Vistas y cámaras

1. **Vista general (órbita):** cámara `PerspectiveCamera` controlada con `OrbitControls`. Permite rotar alrededor del sistema, acercarse y alejarse.
2. **Vista subjetiva desde la nave:** segunda `PerspectiveCamera` controlada con `FlyControls`, con un modelo 3D de nave (FBX) pegado a la cámara. La nave **solo se muestra en este modo**.

Un botón de la interfaz alterna entre ambas vistas.

### Controles

| Acción | Cómo |
|---|---|
| Cambiar de vista | Botón **Cambiar a Vuelo / Cambiar a Órbita** |
| Mostrar/ocultar rejilla | Botón de rejilla |
| Vista general: rotar | Arrastrar con el ratón |
| Vista general: zoom | Rueda del ratón |
| Vista nave: mirar | Arrastrar con el ratón (`dragToLook`) |
| Vista nave: avanzar/retroceder | `W` / `S` |
| Vista nave: izquierda/derecha | `A` / `D` |
| Vista nave: subir/bajar | `R` / `F` |
| Vista nave: girar (alabeo) | `Q` / `E` |

### Estructura del proyecto

```
src/
├── img/                  # Texturas por astro (earth, jupiter, mars, mercury, moon,
│   │                     #   neptune, saturn, space, sun, uranus, venus)
├── models/
│   └── spaceship.fbx     # Modelo 3D de la nave
├── CameraManager.js      # Cámaras, controles y nave
├── data.js               # Datos de la estrella y de los planetas/lunas
├── index.html            # Página y botones de la interfaz
├── main.js               # Escena, luces, creación del sistema y bucle de animación
├── Moon.js               # Clase de las lunas
├── Planet.js             # Clase de los planetas
├── Star.js               # Clase del Sol
└── Starfield.js          # Fondo estrellado
package.json
```

### Arquitectura

El proyecto está dividido en clases para separar responsabilidades:

- **`data.js`** guarda todos los parámetros (radio, distancia, velocidad, color, factores de la órbita y texturas). Para añadir o modificar un astro solo hay que editar este archivo.
- **`Star`** crea el Sol.
- **`Planet`** crea el planeta con sus capas opcionales (nubes, anillos) y su órbita visual, y en `update()` calcula su posición en cada fotograma sobre la elipse.
- **`Moon`** crea la luna dentro de un nodo "pivote" **emparentado al planeta**, de modo que la luna acompaña al planeta mientras gira a su alrededor.
- **`Starfield`** crea el fondo.
- **`CameraManager`** crea las dos cámaras, la nave y gestiona el cambio entre vistas.
- **`main.js`** inicializa la escena, conecta los botones, crea el sistema solar a partir de `data.js` y ejecuta el bucle de animación.

Si la textura de una luna no carga, la luna **vuelve al color definido en `data.js`** en lugar de verse negra.

---

## 2. Fuentes utilizadas

### Librerías
- **Three.js** — https://threejs.org/ (incluidos `OrbitControls`, `FlyControls` y `FBXLoader` de `examples/jsm`)

### Texturas
- **Solar System Scope** (licencia CC BY 4.0) — https://www.solarsystemscope.com/textures/
  Texturas del Sol, Mercurio, Venus, Marte, Júpiter, Saturno (y su anillo), Urano, Neptuno, la Luna y el fondo de estrellas. La textura del Sol se obtuvo también a través de Wikimedia Commons: https://commons.wikimedia.org/wiki/File:Solarsystemscope_texture_2k_sun.jpg
- **https://gis.humboldt.edu/Archive/GISData/2019/WGS84_Geographic/3DTextures/** Texturas de la Tierra (`earthmap1k`, `earthbump1k`, `earthspec1k`, `earthcloudmaptrans`).
- **Las lunas pequeñas no tienen texturas** 


### Modelo 3D
- **Nave espacial:** pack *Low Poly Spaceships* de **Quaternius** (licencia CC0) — https://quaternius.itch.io/lowpoly-spaceships

### Documentación consultada
- Documentación de Three.js: https://threejs.org/docs/
- Dos archivos de prácticas usados como base: https://codesandbox.io/p/sandbox/ig-s6-forked-jf8l2y https://codesandbox.io/p/sandbox/ig-s7-forked-t48x8z
- Uso de la IA para acciones leves como establecer el fondo con el diseño del espacio o la integración de la nave espacial en 3D https://share.gemini.google/DiUY8HpWvceo

---

## 3. Vídeo de ejecución

https://youtu.be/-BG0EHeJ9Mg — captura del proyecto en funcionamiento, mostrando la vista  de nave y el recorrido por el sistema. 

---

## 4. Cómo ejecutarlo

Abrir el enlace de CodeSandbox y usar los botones de la interfaz para cambiar de vista y mostrar u ocultar la rejilla.

---

## 5. Posibles mejoras

- Añadir, borrar y mover planetas de forma interactiva (por ejemplo con `TransformControls`).
- Mostrar información didáctica de cada astro al seleccionarlo.
