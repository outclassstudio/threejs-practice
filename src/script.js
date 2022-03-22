import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import * as gui from "dat.gui";

//\examples\jsm\controls\OrbitControls.js
// Canvas - branch main
const canvas = document.querySelector("canvas.webgl");
// canvas.


let bool = false;
const btn = document.createElement("div");
btn.innerText = "시점변경";
btn.addEventListener("click", () => {
  console.log(mesh)
  if (bool) {
    // tps
    // OrbitControls
    camera.position.set(mesh.position.x, 2, mesh.position.z + 3);
  } else {
    // fps
    // FirstPersonControls
    camera.position.set(mesh.position.x,0.5, mesh.position.z);
  }
  bool = !bool;
});
document.body.appendChild(btn);


// Scene
const scene = new THREE.Scene();
scene.background = new THREE.CubeTextureLoader()
	.setPath( 'afterrain/' )
	.load( [
		'afterrain_ft.jpg',
		'afterrain_bk.jpg',
		'afterrain_up.jpg',
		'afterrain_dn.jpg',
		'afterrain_rt.jpg',
		'afterrain_lf.jpg'
	] );
/**
 * Sizes
 */
 const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 2, 3);
scene.add(camera);



const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
scene.add( ambientLight );

const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
camera.add( pointLight );
scene.add( camera );


/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.toneMapping = THREE.NoToneMapping;
renderer.outputEncoding = THREE.sRGBEncoding;

// key state
const keyStates = {};
const playerVelocity = new THREE.Vector3();
const playerDirection = new THREE.Vector3();
const clock = new THREE.Clock();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 0.5;
scene.add(mesh);

/**
 * obj loader
 */
 const onProgress = ( xhr ) => {

  if ( xhr.lengthComputable ) {

    const percentComplete = xhr.loaded / xhr.total * 100;
    console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

  }

};

// let mesh =  null;

new MTLLoader()
  .setPath( 'models/obj/male02/' )
  .load( 'male02.mtl', ( materials ) => {

    materials.preload();

    new OBJLoader()
      .setMaterials( materials )
      .setPath( 'models/obj/male02/' )
      .load( 'male02.obj', async ( object ) =>  {
        // mesh = object;
        // mesh.scale.set(0.005, 0.005, 0.005)
        object.scale.set(0.005, 0.005, 0.005);
        const arr = []
        const max = 9, min = -9;
        for  (let i = 0; i < 7 ; i++) {
          object.position.set(
            Math.floor(Math.random() * (max - min + 1)) + min,
            0,
            Math.floor(Math.random() * (max - min + 1)) + min
          );
          object.rotation.set(0, Math.random() * Math.PI * 2, 0)
          scene.add(object.clone());
         
        }
       
      }, onProgress );
  } );


// const geometry_sphere = new THREE.SphereGeometry(0.5, 32, 16);
// const material_sphere = new THREE.MeshPhysicalMaterial({
//   color: "#0000ff",
//   metalness: 0,
//   roughness: 0.5,
//   clearcoat: 1.0,
//   clearcoatRoughness: 1.0,
//   reflectivity: 1.0
// });
// const max = 9,
//   min = -9;
// for (let i = 0; i < 7; i++) {
//   const sphere = new THREE.Mesh(geometry_sphere, material_sphere);
//   sphere.position.set(
//     Math.floor(Math.random() * (max - min + 1)) + min,
//     0.5,
//     Math.floor(Math.random() * (max - min + 1)) + min
//   );
//   scene.add(sphere);
// }

const geometry_plain = new THREE.PlaneGeometry(20, 20);
const material_plain = new THREE.MeshPhysicalMaterial({
  color: 0xffff00,
  metalness: 0,
  roughness: 0.5,
  clearcoat: 1.0,
  clearcoatRoughness: 1.0,
  reflectivity: 1.0,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry_plain, material_plain);
plane.rotation.set(Math.PI / 2, 0, 0);
// plane.position.set(0 , 0, 0);
scene.add(plane);

/**
 * OrbitControl
 */
const controls = new OrbitControls(camera, renderer.domElement);
document.addEventListener("keydown", (event) => {
  keyStates[event.code] = true;
});

document.addEventListener("keyup", (event) => {
  keyStates[event.code] = false;
});

document.body.addEventListener("mousemove", (event) => {
  if (!bool) {
    camera.rotation.y -= event.movementX / 500;
    camera.rotation.x -= event.movementY / 500;
  }
});

function getForwardVector() {
  camera.getWorldDirection(playerDirection);
  playerDirection.y = 0;
  playerDirection.normalize();

  return playerDirection;
}

function getSideVector() {
  camera.getWorldDirection(playerDirection);
  playerDirection.y = 0;
  playerDirection.normalize();
  playerDirection.cross(camera.up);

  return playerDirection;
}

function updatePlayer(deltaTime = 25) {
  let damping = Math.exp(-4 * deltaTime) - 1;
  playerVelocity.addScaledVector(playerVelocity, damping);
  const deltaPosition = playerVelocity.clone().multiplyScalar(deltaTime);

  if (!mesh) return;
  mesh.position.x += deltaPosition.x;
  mesh.position.z += deltaPosition.z;


  controls.target.set(mesh.position.x, .5, mesh.position.z);

  camera.position.x += deltaPosition.x;
  camera.position.z += deltaPosition.z;
  // camera.position.copy(controls.end);
}

function keyControls(deltaTime = 25) {
  // gives a bit of air control
  const speedDelta = deltaTime * 25;

  if (keyStates["KeyW"]) {
    //playerVelocity: Vector3
    playerVelocity.add(getForwardVector().multiplyScalar(speedDelta));
  }

  if (keyStates["KeyS"]) {
    playerVelocity.add(getForwardVector().multiplyScalar(-speedDelta));
  }

  if (keyStates["KeyA"]) {
    playerVelocity.add(getSideVector().multiplyScalar(-speedDelta));
  }

  if (keyStates["KeyD"]) {
    playerVelocity.add(getSideVector().multiplyScalar(speedDelta));
  }
}

function movementObj(){
 
 

  scene.children.filter((obj)=>{
    return obj.type === 'Group'
   }).forEach( (itm) => {
     
   
      //  const {} = new THREE.Vector3(x, 0.5, z);

      itm.rotation.y += 0.2;
      // itm.ro.z += z;
   })
}

function animate() {
  const deltaTime = Math.min(0.05, clock.getDelta()) / 5;
  
  for (let i = 0; i < 5; i++) {
    keyControls(deltaTime);
    updatePlayer(deltaTime);
  }
  
  // obj random position
  movementObj()

  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate();
