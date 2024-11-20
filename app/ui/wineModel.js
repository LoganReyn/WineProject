import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class WineVisualizer {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.wineGlass = null;
        this.isInitialized = false;
        this.initializationAttempts = 0;
        this.maxAttempts = 5;
    }

    async initialize() {
        this.container = document.getElementById(this.containerId);
        
        if (!this.container) {
            console.error('Container not found');
            return;
        }

        // Check if container has dimensions
        if (!this.container.clientWidth || !this.container.clientHeight) {
            if (this.initializationAttempts < this.maxAttempts) {
                this.initializationAttempts++;
                console.log(`Attempt ${this.initializationAttempts}: Waiting for container dimensions...`);
                setTimeout(() => this.initialize(), 200);
                return;
            } else {
                console.error('Container dimensions not available after maximum attempts');
                return;
            }
        }

        // Initialize Three.js components
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        await this.loadModel();
        this.setupLights();
        this.setupEventListeners();
        
        // Start animation loop
        this.isInitialized = true;
        this.animate();
    }

    setupScene() {
        this.scene = new THREE.Scene();
    }

    setupCamera() {
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(30, aspect, 0.1, 1000);
        this.camera.position.z = 10;
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        // Clear existing content
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        
        this.container.appendChild(this.renderer.domElement);
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xff0000, 1, 100);
        pointLight.position.set(0, 5, 10);
        this.scene.add(pointLight);
    }

    async loadModel() {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();
            
            loader.load(
                'ui/wine_bottle.glb',
                (gltf) => {
                    this.wineGlass = gltf.scene;
                    
                    const boundingBox = new THREE.Box3().setFromObject(this.wineGlass);
                    const size = boundingBox.getSize(new THREE.Vector3());
                    const center = boundingBox.getCenter(new THREE.Vector3());

                    this.wineGlass.position.set(-center.x, -center.y, -center.z);

                    const maxDim = Math.max(size.x, size.y, size.z);
                    const fov = this.camera.fov * (Math.PI / 180);
                    const distance = maxDim / (2 * Math.tan(fov / 2));

                    this.camera.position.z = distance + 3;
                    this.camera.updateProjectionMatrix();
                    
                    this.scene.add(this.wineGlass);
                    resolve();
                },
                undefined,
                (error) => {
                    console.error('Error loading model:', error);
                    reject(error);
                }
            );
        });
    }

    setupEventListeners() {
        let resizeTimeout;
        
        const handleResize = () => {
            if (!this.container || !this.renderer || !this.camera) return;

            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }

            resizeTimeout = setTimeout(() => {
                const width = this.container.clientWidth;
                const height = this.container.clientHeight;

                if (width && height) {
                    this.renderer.setSize(width, height, false);
                    this.camera.aspect = width / height;
                    this.camera.updateProjectionMatrix();
                }
            }, 250);
        };

        window.addEventListener('resize', handleResize);

        // Handle visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && !this.isInitialized) {
                this.initialize();
            }
        });
    }

    animate() {
        if (!this.isInitialized) return;

        if (this.wineGlass) {
            this.wineGlass.rotation.y += 0.01;
        }

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    }

    dispose() {
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer = null;
        }
        
        if (this.wineGlass) {
            this.scene.remove(this.wineGlass);
            this.wineGlass.traverse((node) => {
                if (node.isMesh) {
                    node.geometry.dispose();
                    node.material.dispose();
                }
            });
            this.wineGlass = null;
        }
        
        this.isInitialized = false;
    }
}

// Wait for page load before initializing
document.addEventListener('DOMContentLoaded', () => {
    const visualizer = new WineVisualizer('threejs-container');
    
    // Add a mutation observer to watch for container changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && 
                mutation.attributeName === 'style') {
                visualizer.initialize();
            }
        });
    });

    const container = document.getElementById('threejs-container');
    if (container) {
        observer.observe(container, {
            attributes: true,
            attributeFilter: ['style']
        });
    }

    // Initial initialization attempt
    setTimeout(() => visualizer.initialize(), 100);
});