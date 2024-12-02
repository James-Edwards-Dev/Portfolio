import './style.css'

import * as THREE from 'three'

// Set up scene
const scene = new THREE.Scene();

// Initalize Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Initalize renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)

// move camera
camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshBasicMaterial({
    color: 0xffa500,
    wireframe: true,
});

const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

// render scene
renderer.render(scene, camera);
