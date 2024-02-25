import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const canvas = document.querySelector("canvas.webgl");
canvas.style.position = "absolute";
canvas.style.top = "4rem"; // Adjust this value based on the height of your navbar

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x4f769a); // Set background color to white

scene.add(new THREE.AmbientLight(0xffffff));

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 120;
scene.add(camera);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -10);
scene.add(spotLight);

const light = new THREE.PointLight(0xffffff, 50, 100);
light.position.set(50, 50, 50);
scene.add(light);

gltfLoader.load("lego_space_dart_i.glb", (gltf) => {
  const gltfObject = gltf.scene;

  // Rotate the object around the y-axis by 45 degrees
  gltfObject.rotation.x = Math.PI / 4;
  gltfObject.rotation.y = -Math.PI / 4;
  gltfObject.rotation.z = -Math.PI / 4;

  scene.add(gltfObject);
});

const cursor = { x: 0, y: 0 };
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.width - 0.5);
});

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const controls = new OrbitControls(camera, canvas);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
const animate = () => {
  renderer.render(scene, camera);
  controls.update();

  window.requestAnimationFrame(animate);
};

animate();
