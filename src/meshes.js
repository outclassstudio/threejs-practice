import * as THREE from "three";

//URL
const rootUrl = "http://localhost:8081/static";

//Plane
const planeSize = 250;
const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshStandardMaterial({
  roughness: 0.6,
  metalness: 0.5,
  color: 0x006400,
  side: THREE.DoubleSide,
});
export const plane = new THREE.Mesh(planeGeo, planeMat);
plane.receiveShadow = true;
plane.rotation.x = Math.PI * -0.5;
plane.position.set(0, -10, 0);

//sky
const skyLoader = new THREE.CubeTextureLoader();
export const skyTexture = skyLoader.load([
  `${rootUrl}/afterrain/afterrain_rt.jpg`,
  `${rootUrl}/afterrain/afterrain_lf.jpg`,
  `${rootUrl}/afterrain/afterrain_up.jpg`,
  `${rootUrl}/afterrain/afterrain_dn.jpg`,
  `${rootUrl}/afterrain/afterrain_bk.jpg`,
  `${rootUrl}/afterrain/afterrain_ft.jpg`,
]);

//기본박스
const textureLoader = new THREE.TextureLoader();
const geometry = new THREE.BoxGeometry(20, 20, 20);
const material = new THREE.MeshStandardMaterial({
  roughness: 0.8,
  metalness: 0.8,
  map: textureLoader.load(`${rootUrl}/textures/wall_copy.jpg`),
});
export const mesh = new THREE.Mesh(geometry, material);
mesh.receiveShadow = true;
mesh.castShadow = true;
mesh.position.set(0, 0, 0);
