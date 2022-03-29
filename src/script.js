import "./style.css";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//Plane
const planeSize = 250;
const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
  shininess: 20,
  // emissive: "black",
  // roughness: 1,
  // color: 0x9acd32,
  color: 0x006400,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = Math.PI * -0.5;
plane.position.set(0, -10, 0);
scene.add(plane);

//Sky
{
  const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
    "http://localhost:8081/static/afterrain/afterrain_rt.jpg",
    "http://localhost:8081/static/afterrain/afterrain_lf.jpg",
    "http://localhost:8081/static/afterrain/afterrain_up.jpg",
    "http://localhost:8081/static/afterrain/afterrain_dn.jpg",
    "http://localhost:8081/static/afterrain/afterrain_bk.jpg",
    "http://localhost:8081/static/afterrain/afterrain_ft.jpg",
  ]);
  scene.background = texture;
}

//Object
const objects = [];

const geometry = new THREE.BoxGeometry(20, 20, 20);
// const matTexture = loader.load()
const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);

const onProgress = function (xhr) {
  if (xhr.lengthComputable) {
    const percentComplete = (xhr.loaded / xhr.total) * 100;
    console.log(Math.round(percentComplete, 2) + "% downloaded");
  }
};

new MTLLoader()
  .setPath("http://localhost:8081/static/models/obj/male02/")
  .load("male02.mtl", function (materials) {
    materials.preload();

    new OBJLoader()
      .setMaterials(materials)
      .setPath("http://localhost:8081//static/models/obj/male02/")
      .load(
        "male02.obj",
        function (object) {
          object.position.set(20, -10, 5);
          object.scale.set(0.1, 0.1, 0.1);
          scene.add(object);
          objects.push(object);
        },
        onProgress
      );
  });

new MTLLoader()
  .setPath("http://localhost:8081/static/models/obj/male02/")
  .load("male02.mtl", function (materials) {
    materials.preload();

    new OBJLoader()
      .setMaterials(materials)
      .setPath("http://localhost:8081//static/models/obj/male02/")
      .load(
        "male02.obj",
        function (object) {
          object.position.set(-20, -10, 1);
          object.scale.set(0.1, 0.1, 0.1);
          scene.add(object);
          objects.push(object);
        },
        onProgress
      );
  });

new MTLLoader()
  .setPath("http://localhost:8081/static/models/obj/male02/")
  .load("male02.mtl", function (materials) {
    materials.preload();

    new OBJLoader()
      .setMaterials(materials)
      .setPath("http://localhost:8081//static/models/obj/male02/")
      .load(
        "male02.obj",
        function (object) {
          object.position.set(-50, -10, 25);
          object.scale.set(0.1, 0.1, 0.1);
          scene.add(object);
          objects.push(object);
        },
        onProgress
      );
  });

new MTLLoader()
  .setPath("http://localhost:8081/static/models/obj/male02/")
  .load("male02.mtl", function (materials) {
    materials.preload();

    new OBJLoader()
      .setMaterials(materials)
      .setPath("http://localhost:8081//static/models/obj/male02/")
      .load(
        "male02.obj",
        function (object) {
          object.position.set(60, -10, 15);
          object.scale.set(0.1, 0.1, 0.1);
          scene.add(object);
          objects.push(object);
        },
        onProgress
      );
  });

new MTLLoader()
  .setPath("http://localhost:8081/static/models/obj/male02/")
  .load("male02.mtl", function (materials) {
    materials.preload();

    new OBJLoader()
      .setMaterials(materials)
      .setPath("http://localhost:8081//static/models/obj/male02/")
      .load(
        "male02.obj",
        function (object) {
          object.position.set(10, -10, 65);
          object.scale.set(0.1, 0.1, 0.1);
          scene.add(object);
          objects.push(object);
        },
        onProgress
      );
  });

new MTLLoader()
  .setPath("http://localhost:8081/static/models/obj/male02/")
  .load("male02.mtl", function (materials) {
    materials.preload();

    new OBJLoader()
      .setMaterials(materials)
      .setPath("http://localhost:8081//static/models/obj/male02/")
      .load(
        "male02.obj",
        function (object) {
          object.position.set(-90, -10, -80);
          object.scale.set(0.1, 0.1, 0.1);
          scene.add(object);
          objects.push(object);
        },
        onProgress
      );
  });

new MTLLoader()
  .setPath("http://localhost:8081/static/models/obj/male02/")
  .load("male02.mtl", function (materials) {
    materials.preload();

    new OBJLoader()
      .setMaterials(materials)
      .setPath("http://localhost:8081//static/models/obj/male02/")
      .load(
        "male02.obj",
        function (object) {
          object.position.set(0, -10, -60);
          object.scale.set(0.1, 0.1, 0.1);
          scene.add(object);
          objects.push(object);
        },
        onProgress
      );
  });

/**
 * Sizes
 */
// const sizes = {
//   width: 800,
//   height: 600,
// };

//Camera
let camera;

const fov = 75;
const near = 0.1;
const far = 1500;
const aspect = 800 / 600;

const camera1 = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera1.position.set(0, 170, 130);
const controls = new OrbitControls(camera1, canvas);
controls.target.set(0, 0, 0);
controls.update();

let LEFT = 37,
  RIGHT = 39,
  UP = 38,
  DOWN = 40;
// let add = 0.2;

const camera2 = new THREE.PerspectiveCamera(45, aspect, near, far);
camera2.position.set(0, 10, 0);
// const controls2 = new OrbitControls(camera2, canvas);
// controls2.target.set(0, 100, -1000);
// controls2.update();

camera = camera1;
scene.add(camera);

// let keyCodeOn = function (e) {
//   console.log(e);
//   if (e.keyCode == LEFT) {
//     add = -0.5;
//     mesh.position.x += add;
//     camera2.position.x += add;
//   } else if (e.keyCode == RIGHT) {
//     add = 0.5;
//     mesh.position.x += add;
//     camera2.position.x += add;
//   } else if (e.keyCode == DOWN) {
//     add = 0.5;
//     mesh.position.z += add;
//     camera2.position.z += add;
//     // scene.rotation.x += add;
//   } else if (e.keyCode == UP) {
//     // scene.rotation.x -= add;
//     add = -0.5;
//     mesh.position.z += add;
//     camera2.position.z += add;
//   } else {
//     return;
//   }
// };

const btn = document.querySelector("button");

btn.onclick = function cameraChange() {
  if (camera === camera2) {
    camera = camera1;
  } else {
    camera = camera2;
  }
};

// Lights
const color = 0xffffff;
const intensity = 0.3;
const baseLight = new THREE.AmbientLight(color, intensity);
scene.add(baseLight);

const dLIntensity = 2;
const directLight = new THREE.DirectionalLight(color, dLIntensity);
directLight.position.set(40, 200, 70);
directLight.target.position.set(0, 0, 0);
scene.add(directLight);
scene.add(directLight.target);

//Controls
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render(time) {
  time = time * 0.005;

  objects.forEach((obj) => {
    obj.rotation.y = time;
  });

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  // keyCodeOn();

  let add = 0.005;
  let keyCodeOn = function (e) {
    console.log(controls.target);
    let x = controls.target.x;
    let y = controls.target.y;
    let z = controls.target.z;
    if (e.keyCode == LEFT) {
      add = -0.003;
      mesh.position.x += add;
      controls.target.set(x + add, y, z);
      camera2.position.x += add;
    } else if (e.keyCode == RIGHT) {
      add = 0.003;
      mesh.position.x += add;
      controls.target.set(x + add, y, z);
      camera2.position.x += add;
    } else if (e.keyCode == DOWN) {
      add = 0.003;
      mesh.position.z += add;
      controls.target.set(x, y, z + add);
      camera2.position.z += add;
      // scene.rotation.x += add;
    } else if (e.keyCode == UP) {
      // scene.rotation.x -= add;
      add = -0.003;
      mesh.position.z += add;
      controls.target.set(x, y, z + add);
      camera2.position.z += add;
    } else {
      return;
    }
    controls.update();
  };

  document.addEventListener("keydown", keyCodeOn, false);

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
// renderer.setSize(sizes.width, sizes.height);
// document.addEventListener("keydown", keyCodeOn, false);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);
