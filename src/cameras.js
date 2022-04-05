import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Canvas
export const canvas = document.querySelector("canvas.webgl");

//*카메라기본설정
export let camera;
const fov = 75;
const near = 0.1;
const far = 1500;
const aspect = 800 / 600;

//*첫번째카메라(기본)
export const camera1 = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera1.position.set(0, 150, 160);
export const controls = new OrbitControls(camera1, canvas);
controls.target.set(0, 0, 0);
controls.update();
camera = camera1;

//*두번째카메라
export const camera2 = new THREE.PerspectiveCamera(45, aspect, near, far);
camera2.position.set(0, 10, 0);

//*시점전환 버튼으로 카메라 전환
const btn = document.querySelector("#view");
btn.onclick = function cameraChange() {
  if (camera === camera2) {
    camera = camera1;
  } else {
    camera = camera2;
  }
};

//*C키로 카메라 전환
export function cameraChangeByKey(e) {
  if (e.keyCode == 67) {
    if (camera === camera2) {
      camera = camera1;
    } else {
      camera = camera2;
    }
  }
}
