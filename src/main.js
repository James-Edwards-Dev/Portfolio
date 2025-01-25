import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/Addons.js';

import { GLTFLoader } from 'three/examples/jsm/Addons.js';

// Set up scene
const scene = new THREE.Scene();

// Initalize Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.visualViewport.height, 0.1, 1000);
camera.position.setZ(30);

// Initalize renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.visualViewport.height)


// Skybox
/* const textureLoader = new THREE.TextureLoader();
textureLoader.load('./assets/images/skybox.png', (texture) => {
    scene.background = texture
});
 */
const background_color = new THREE.Color(0x87CEEB);
scene.background = background_color;

// Geometry
let me = null;
const material = new THREE.MeshStandardMaterial({color: 0xffa500});
load_gltf('me/me.gltf')
    .then((mesh) => {
        me = mesh;
        me.scale.set(3, 3, 3);

        update_me_pos();
    })
    .catch((error) =>{
        console.error('Error Loading Model', error);
    });



// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);

// Add Lights
scene.add(ambientLight, directionalLight);

// Helpers
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(gridHelper)

//const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.visualViewport.height;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.visualViewport.height);

    //update_me_pos();
});

function update_me_pos() {
    const vector = new THREE.Vector3(0.5, 0, 0);
    vector.unproject(camera);

    const direction = vector.sub(camera.position).normalize();
    const distance = camera.position.z; // Calculate distance along Z-axis
    const worldPosition = camera.position.clone().add(direction.multiplyScalar(distance));

    me.position.copy(worldPosition);

    me.position.y -= 10;
}

function main_loop() {
    requestAnimationFrame(main_loop)

    if (me){
        me.rotation.y -= 0.005;
        update_me_pos();
    }
    // draw scene
    renderer.render(scene, camera);
}

function load_gltf(path){
    return new Promise((resolve, reject) => {
        const gltfLoader = new GLTFLoader().setPath('./models/');
        gltfLoader.load(path, (gltf) => {
            const mesh = gltf.scene;
            scene.add(mesh);
            resolve(mesh);
        }, undefined, (error) => {
            reject(error);
        });
    });
}

function load_gltf_new_material(path, newMaterial) {
    return new Promise((resolve, reject) => {
        const gltfLoader = new GLTFLoader().setPath('./models/');
        gltfLoader.load(
            path,
            (gltf) => {
                const mesh = gltf.scene;

                // Traverse the scene to apply the material to all meshes
                mesh.traverse((child) => {
                    if (child.isMesh) {
                        child.material = newMaterial;
                        child.material.needsUpdate = true;
                    }
                });

                // Add the loaded mesh to the scene
                scene.add(mesh);
                resolve(mesh);
            },
            undefined,
            (error) => {
                reject(error);
            }
        );
    });
}

main_loop();
