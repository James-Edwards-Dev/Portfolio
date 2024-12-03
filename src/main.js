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
let guitar = null;
load_gltf('hollowBody/hollow_body.gltf')
    .then((mesh) => {
        guitar = mesh;
        guitar.scale.set(3, 3, 3);
    })
    .catch((error) =>{
        console.error('Error Loading Model', error);
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
scene.add(lightHelper, gridHelper)

//const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight)
});

function main_loop() {
    requestAnimationFrame(main_loop)

    //controls.update();
    // draw scene
    renderer.render(scene, camera);
}

function load_gltf(path){
    return new Promise((resolve, reject) => {
        const gltfLoader = new GLTFLoader().setPath('./assets/models/');
        gltfLoader.load(path, (gltf) => {
            const mesh = gltf.scene;
            scene.add(mesh);
            resolve(mesh);
        }, undefined, (error) => {
            reject(error);
        });
    });
}

main_loop();
