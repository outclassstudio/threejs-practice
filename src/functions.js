import { camera2, controls } from "./cameras";
import { mesh } from "./meshes";

//*오브젝트 불러오는 진행중 실행
export const onProgress = function (xhr) {
  if (xhr.lengthComputable) {
    const percentComplete = (xhr.loaded / xhr.total) * 100;
    console.log(Math.round(percentComplete, 2) + "% downloaded");
  }
};

//*화면사이즈재조정
export function resizeRendererToDisplaySize(renderer) {
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

//*키보드로 박스 이동시키는 함수
export const moveMeshByKey = function (e) {
  let { x, y, z } = controls.target;
  let add;

  if (e.keyCode == 37) {
    add = -0.4;
    mesh.position.x += add;
    controls.target.set(x + add, y, z);
    camera2.position.x += add;
  } else if (e.keyCode == 39) {
    add = 0.4;
    mesh.position.x += add;
    controls.target.set(x + add, y, z);
    camera2.position.x += add;
  } else if (e.keyCode == 40) {
    add = 0.4;
    mesh.position.z += add;
    controls.target.set(x, y, z + add);
    camera2.position.z += add;
  } else if (e.keyCode == 38) {
    add = -0.4;
    mesh.position.z += add;
    controls.target.set(x, y, z + add);
    camera2.position.z += add;
  } else {
    return;
  }
  controls.update();
};
document.addEventListener("keydown", moveMeshByKey, false);
