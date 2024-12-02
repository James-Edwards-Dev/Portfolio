import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/Addons.js';

// Set up scene
const scene = new THREE.Scene();

// Initalize Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);

// Initalize renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)

// Geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({
    color: 0xffa500,
});

const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 20, 10000, 1.5)
pointLight.position.set(2,2,2)

const ambientLight = new THREE.AmbientLight(0xffffff, 2);

// Add Lights
scene.add(pointLight, ambientLight) 

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function main_loop() {
    requestAnimationFrame(main_loop)

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update();
    // draw scene
    renderer.render(scene, camera);
}

main_loop()
