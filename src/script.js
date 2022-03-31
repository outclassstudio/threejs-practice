import "./style.css";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//URL
const rootUrl = "http://localhost:8081/static";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//Plane
const planeSize = 250;
const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshStandardMaterial({
  roughness: 0.6,
  metalness: 0.5,
  color: 0x006400,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.receiveShadow = true;
plane.rotation.x = Math.PI * -0.5;
plane.position.set(0, -10, 0);
scene.add(plane);

//Sky
const skyLoader = new THREE.CubeTextureLoader();
const skyTexture = skyLoader.load([
  `${rootUrl}/afterrain/afterrain_rt.jpg`,
  `${rootUrl}/afterrain/afterrain_lf.jpg`,
  `${rootUrl}/afterrain/afterrain_up.jpg`,
  `${rootUrl}/afterrain/afterrain_dn.jpg`,
  `${rootUrl}/afterrain/afterrain_bk.jpg`,
  `${rootUrl}/afterrain/afterrain_ft.jpg`,
]);
scene.background = skyTexture;

//Object
const objects = [];

//*기본박스
const textureLoader = new THREE.TextureLoader();
const geometry = new THREE.BoxGeometry(20, 20, 20);
const material = new THREE.MeshStandardMaterial({
  roughness: 0.8,
  metalness: 0.8,
  map: textureLoader.load(`${rootUrl}/textures/wall_copy.jpg`),
});
const mesh = new THREE.Mesh(geometry, material);
mesh.receiveShadow = true;
mesh.castShadow = true;
mesh.position.set(0, 0, 0);
scene.add(mesh);

//*오브젝트 불러오는 진행중 실행
const onProgress = function (xhr) {
  if (xhr.lengthComputable) {
    const percentComplete = (xhr.loaded / xhr.total) * 100;
    console.log(Math.round(percentComplete, 2) + "% downloaded");
  }
};

//*오브젝트 생성
for (let i = 0; i < 7; i++) {
  const positionArr = [
    [20, 5],
    [-50, 70],
    [-80, 25],
    [70, 10],
    [10, 95],
    [-90, -80],
    [0, -60],
  ];

  new MTLLoader()
    .setPath(`${rootUrl}/models/obj/male02/`)
    .load("male02.mtl", function (materials) {
      materials.preload();

      new OBJLoader()
        .setMaterials(materials)
        .setPath(`${rootUrl}/models/obj/male02/`)
        .load(
          "male02.obj",
          function (object) {
            object.position.set(positionArr[i][0], -10, positionArr[i][1]);
            object.scale.set(0.1, 0.1, 0.1);
            //?오브젝트에 그림자 넣기
            object.traverse(function (child) {
              child.receiveShadow = true;
              child.castShadow = true;
            });
            scene.add(object);
            objects.push(object);
          },
          onProgress
        );
    });
}

//Camera
//*메인카메라(조건에따라 업데이트)
let camera;

//*카메라기본설정
const fov = 75;
const near = 0.1;
const far = 1500;
const aspect = 800 / 600;

//*첫번째카메라(기본)
const camera1 = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera1.position.set(0, 150, 160);
const controls = new OrbitControls(camera1, canvas);
controls.target.set(0, 0, 0);
controls.update();

//*두번째카메라
const camera2 = new THREE.PerspectiveCamera(45, aspect, near, far);
camera2.position.set(0, 10, 0);

camera = camera1;
scene.add(camera);

//*시점전환 버튼으로 카메라 전환
const btn = document.querySelector("button");
btn.onclick = function cameraChange() {
  if (camera === camera2) {
    camera = camera1;
  } else {
    camera = camera2;
  }
};

//*C키로 카메라 전환
function cameraChangeByKey(e) {
  if (e.keyCode == 67) {
    if (camera === camera2) {
      camera = camera1;
    } else {
      camera = camera2;
    }
  }
}
document.addEventListener("keydown", cameraChangeByKey, false);

// Lights
//*기본조명(자연광)
const color = 0xffffff;
const intensity = 2;
const baseLight = new THREE.AmbientLight(color, intensity);
scene.add(baseLight);

//*기본조명2(햇빛)
//?조명궤도
const ligthOrbit = new THREE.Object3D();
scene.add(ligthOrbit);

const dLIntensity = 1;
const directLight = new THREE.DirectionalLight(color, dLIntensity);
directLight.castShadow = true;
directLight.position.set(100, 150, 100);
directLight.target.position.set(0, 0, 0);
directLight.shadow.mapSize = new THREE.Vector2(2000, 2000);
directLight.shadow.radius = 2;
directLight.shadow.camera.top = directLight.shadow.camera.right = 150;
directLight.shadow.camera.bottom = directLight.shadow.camera.left = -150;

// scene.add(directLight);
ligthOrbit.add(directLight);
scene.add(directLight.target);

//?다이렉트 조명 헬퍼
const helper = new THREE.DirectionalLightHelper(directLight);
scene.add(helper);

//?다이렉트 조명 그림자 카메라 헬퍼
const cameraHelper = new THREE.CameraHelper(directLight.shadow.camera);
scene.add(cameraHelper);

//*보조조명(귀퉁이에 4개추가, plane에 안비추도록)
for (let i = 0; i < 4; i++) {
  const color = 0xffffff;
  const intensity = 1;
  const position = [
    [250, 250],
    [-250, 250],
    [250, -250],
    [-250, -250],
  ];
  const directLights = new THREE.DirectionalLight(color, intensity);
  directLights.position.set(position[i][0], 0, position[i][1]);
  directLights.target.position.set(
    position[i][0] * -1,
    10,
    position[i][1] * -1
  );

  //?보조조명 헬퍼
  const auxHelper = new THREE.DirectionalLightHelper(directLights);
  // scene.add(auxHelper);

  scene.add(directLights);
  scene.add(directLights.target);
}

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

let add = 0.003;

//렌더함수
function render(time) {
  time = time * 0.005;

  ligthOrbit.rotation.y = time * 0.01;

  objects.forEach((obj) => {
    obj.rotation.y = time;
  });

  let keyCodeOn = function (e) {
    let { x, y, z } = controls.target;

    if (e.keyCode == 37) {
      add = -0.003;
      mesh.position.x += add;
      controls.target.set(x + add, y, z);
      camera2.position.x += add;
    } else if (e.keyCode == 39) {
      add = 0.003;
      mesh.position.x += add;
      controls.target.set(x + add, y, z);
      camera2.position.x += add;
    } else if (e.keyCode == 40) {
      add = 0.003;
      mesh.position.z += add;
      controls.target.set(x, y, z + add);
      camera2.position.z += add;
    } else if (e.keyCode == 38) {
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

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);
