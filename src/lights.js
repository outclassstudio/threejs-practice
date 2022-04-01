import "./style.css";
import * as THREE from "three";

// Lights
//*기본조명(자연광)
const color = 0xffffff;
const intensity = 2;
export const baseLight = new THREE.AmbientLight(color, intensity);
// scene.add(baseLight);

//*기본조명2(햇빛)
//?조명궤도
export const ligthOrbit = new THREE.Object3D();
// scene.add(ligthOrbit);

const dLIntensity = 1;
export const directLight = new THREE.DirectionalLight(color, dLIntensity);
directLight.castShadow = true;
directLight.position.set(100, 150, 100);
directLight.target.position.set(0, 0, 0);
directLight.shadow.mapSize = new THREE.Vector2(2000, 2000);
directLight.shadow.radius = 2;
directLight.shadow.camera.top = directLight.shadow.camera.right = 150;
directLight.shadow.camera.bottom = directLight.shadow.camera.left = -150;
