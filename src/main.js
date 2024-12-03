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

        update_guitar_pos();
    })
    .catch((error) =>{
        console.error('Error Loading Model', error);
    });



// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 2);

// Add Lights
scene.add(ambientLight) 

// Helpers
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight)

    update_guitar_pos();
});

function update_guitar_pos() {
    const vector = new THREE.Vector3(0.5, 0, 0);
    vector.unproject(camera);

    const direction = vector.sub(camera.position).normalize();
    const distance = camera.position.z; // Calculate distance along Z-axis
    const worldPosition = camera.position.clone().add(direction.multiplyScalar(distance));

    guitar.position.copy(worldPosition);

    guitar.lookAt(camera.position);
}

function main_loop() {
    requestAnimationFrame(main_loop)

    //guitar.rotation.z += 0.01;

    controls.update();
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
