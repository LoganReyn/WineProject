/*
Logic for 3D render
  - uses import map on index.html
  - three-js framework for render
*/

// Import three.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const filePath = 'wine_bottle.glb';


// Set up the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view (in degrees)
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.z = 1

// Lighting setup:

// 1. AmbientLight - provides overall lighting (without shadows)
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft white light with intensity of 1
scene.add(ambientLight);

// 2. PointLight - adds more focused lighting (like a lightbulb)
const pointLight = new THREE.PointLight(0xff0000, 1, 100); // Red point light with intensity of 1
pointLight.position.set(0, 5, 10); // Position the point light at (0, 5, 10)
scene.add(pointLight);

// Set up the WebGL renderer with transparency enabled
const renderer = new THREE.WebGLRenderer({ alpha: true });

// Set the renderer's size to fill the window
renderer.setSize(window.innerWidth, window.innerHeight);

// Find the container where you want to add the renderer's canvas
const container = document.getElementById('threejs-container');

// Add the renderer's canvas to the desired container (not body)
container.appendChild(renderer.domElement);

// Optionally, handle window resizing to update the renderer's size
function resizeCanvas() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
}

// Resize the canvas when the window is resized
window.addEventListener('resize', resizeCanvas);

// Initial resize to set canvas size based on the container
resizeCanvas();

// Load a glTF resource (your wine glass model)
const loader = new GLTFLoader();
let wineGlass;

loader.load(
  // resource URL
  filePath,
  // called when the resource is loaded
  function (gltf) {
    wineGlass = gltf.scene; // Store the loaded model
    scene.add(wineGlass); // Add the wine glass model to the scene
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  // called when loading has errors
  function (error) {
    console.log('An error happened');
  }
);

let oscillation = 0;
// Create the animation loop
function animate() {
  requestAnimationFrame(animate); // Call animate recursively

  // Rotate the wine glass model (if it's loaded)
  if (wineGlass) {
    wineGlass.rotation.y += 0.005; // Rotate around the y-axis
	wineGlass.rotation.x = (Math.sin(oscillation) + 1 ) / 2;
	oscillation += .005

  }

  // Render the scene from the perspective of the camera
  renderer.render(scene, camera);
}

// Call the animate function to start the animation loop
animate();

// Adjust the camera aspect ratio and renderer size when the window is resized
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
