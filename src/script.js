import "./style.css";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { baseLight, directLight, ligthOrbit } from "./lights";
import { camera, cameraChangeByKey } from "./cameras";
import { mesh, plane, skyTexture } from "./meshes";
import {
  moveMeshByKey,
  onProgress,
  resizeRendererToDisplaySize,
} from "./functions";

//URL
const rootUrl = "http://localhost:8081/static";

//기본구성요소
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
scene.background = skyTexture;
scene.add(plane);
scene.add(mesh);

//*오브젝트 생성
const objects = [];
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
scene.add(camera);
document.addEventListener("keydown", cameraChangeByKey, false);

// Lights
//*기본조명(자연광)
scene.add(baseLight);

//*기본조명2(햇빛)
scene.add(ligthOrbit);
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
//*박스이동함수
function moveRender(time, e) {
  time = time * 0.001;

  if (time < 1) {
    moveMeshByKey(e);
  } else {
    return;
  }
  requestAnimationFrame(moveRender);
}
requestAnimationFrame(moveRender);

//*오브젝트 회전
let motionActive = true;
function rotateObject(time) {
  time = time * 0.005;

  if (motionActive) {
    ligthOrbit.rotation.y = time * 0.01;
    objects.forEach((obj) => {
      obj.rotation.y = time;
    });
  } else {
    return;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(rotateObject);
}
requestAnimationFrame(rotateObject);

//*동작그만
const btn2 = document.querySelector("#motion");
btn2.onclick = function stopMotion() {
  if (motionActive) {
    motionActive = false;
  } else {
    requestAnimationFrame(rotateObject);
    motionActive = true;
  }
};

//*화면재조정
function render(time) {
  // console.log(camera.up);
  time = time * 0.005;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

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
