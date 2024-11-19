import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Set up the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(
  30, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.z = 5;

// Add lights
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff0000, 1, 100); // Red point light
pointLight.position.set(0, 5, 10);
scene.add(pointLight);

// Set up the WebGL renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
const container = document.getElementById('threejs-container');
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Load the GLTF model
const loader = new GLTFLoader();
let wineGlass;

loader.load(
  'ui/wine_bottle.glb',
  function (gltf) {
    wineGlass = gltf.scene;

    // Calculate the bounding box of the model
    const boundingBox = new THREE.Box3().setFromObject(wineGlass);
    const size = boundingBox.getSize(new THREE.Vector3());
    const center = boundingBox.getCenter(new THREE.Vector3());

    // Reposition the model to center it
    wineGlass.position.set(-center.x, -center.y, -center.z);

    // Scale the model to fit the container
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180); // Convert FOV to radians
    const distance = maxDim / (2 * Math.tan(fov / 2));
    const aspectRatio = container.clientWidth / container.clientHeight;

    camera.position.z = distance; // Position camera to fit model
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();

    scene.add(wineGlass); // Add the model to the scene
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.log('An error happened', error);
  }
);

// Resize renderer and update camera aspect ratio
function resizeRendererToDisplaySize() {
  const width = container.clientWidth;
  const height = container.clientHeight;
  const needResize = renderer.domElement.width !== width || renderer.domElement.height !== height;

  if (needResize) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  return needResize;
}

// Animation loop with spin
function animate() {
  resizeRendererToDisplaySize();
  
  if (wineGlass) {
    // Add rotation to the model for the spin effect
    wineGlass.rotation.y += 0.01; // Rotate 0.01 radians per frame (adjust speed as desired)
  }
  
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// Update renderer size and camera on window resize
window.addEventListener('resize', () => {
  renderer.setSize(container.clientWidth, container.clientHeight);
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
});
