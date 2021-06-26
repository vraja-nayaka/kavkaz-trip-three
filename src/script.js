import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as dat from "dat.gui";
import gsap from "gsap";

// Texture loader
const loader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();
const terran = loader.load("/terran.jpg");
const height = loader.load("/height.png");
const alpha = loader.load("/alpha.png");

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

let t1 = gsap.timeline();

// Objects
const geometry = new THREE.PlaneBufferGeometry(3, 3, 64, 64);

// Phone
gltfLoader.load("phone.gltf", (gltf) => {
  gltf.scene.scale.set(0.3, 0.3, 0.3);
  gltf.scene.rotation.set(0, 3.3, 0);
  gltf.scene.translateY(0.5);
  scene.add(gltf.scene);

  gui.add(gltf.scene.rotation, "x").min(0).max(9);
  gui.add(gltf.scene.rotation, "y").min(0).max(9);
  gui.add(gltf.scene.rotation, "z").min(0).max(9);

  t1.to(gltf.scene.rotation, { y: 2.5, duration: 3 });
  t1.to(gltf.scene.scale, { x: 0.2, y: 0.2, z: 0.2, duration: 3 }, "-=1");
});

// Materials
const material = new THREE.MeshStandardMaterial({
  color: "gray",
  map: terran,
  displacementMap: height,
  displacementScale: 0.6,
  alphaMap: alpha,
  transparent: true,
  depthTest: false,
});

// Mesh
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.rotation.x = 181;

gui.add(plane.rotation, "x").min(0).max(600);

// Lights

const ambientLight = new THREE.AmbientLight("#fff", 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x11f2f2, 2);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

gui.add(pointLight.position, "x");

const col = { color: "#11f2f2" };

gui.addColor(col, "color").onChange(() => {
  pointLight.color.set(col.color);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth * 0.7,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = Math.PI / 2;
controls.minAzimuthAngle = -Math.PI / 2;
controls.maxAzimuthAngle = Math.PI / 8;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

document.addEventListener("mousemove", animateTerrain);

let mouseY = 0;

function animateTerrain(event) {
  mouseY = event.clientY;
}

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  plane.rotation.z = 0.5 * elapsedTime;
  plane.material.displacementScale = 0.5 + mouseY * 0.001;
  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
