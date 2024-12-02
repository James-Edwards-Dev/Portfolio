import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/Addons.js';

import { GLTFLoader } from 'three/examples/jsm/Addons.js';

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

const gltfLoader = new GLTFLoader().setPath('./assets/Models');
    gltfLoader.load('/HollowBody/hollow_body.gltf', (gltf) => {
        const mesh = gltf.scene;
        scene.add(mesh);
        mesh.position(0, 0, 0);
    });

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 20, 10000, 1.5)
pointLight.position.set(2,2,2)

const ambientLight = new THREE.AmbientLight(0xffffff, 2);

// Add Lights
scene.add(pointLight, ambientLight) 

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function main_loop() {
    requestAnimationFrame(main_loop)

    controls.update();
    // draw scene
    renderer.render(scene, camera);
}

function add_star() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff,})
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(add_star)
//add_star();
main_loop();
