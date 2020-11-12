import * as THREE from '/node_modules/three/build/three.module.js'
import {
    ColladaLoader as testLoader
} from "/node_modules/three/examples/jsm/loaders/ColladaLoader.js";
import {
    GLTFLoader
}
    from "/node_modules/three/examples/jsm/loaders/GLTFLoader.js";

import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';

let container, camera, renderer, scene, house, house1, texture, model;



// let src = ['./3d/textures/Suede_Brown.jpg', './3d/textures/Material~1.jpg', './3d/textures/Material_diffuse.png'];
let src = ['./3dModel/cloth/material/pexels4.jpg', './3dModel/cloth/material/pexels5.jpg', './3dModel/cloth/material/pexels6.jpg'];



var skin = '' || src[0];

container = document.querySelector('.scene');

scene = new THREE.Scene();

const fov = 20;
const aspect = container.clientWidth / container.clientHeight;
const near = .1;
const far = 1000;
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.set(10, 3, -5);
camera.lookAt(scene.position);

var light = new THREE.DirectionalLight(0xffffff, 3, 1000);
light.position.set(10, 5, -5);
scene.add(light);



renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

var loader = new testLoader();

// loader.load('./3d/20201107 山姆材質桌.dae', function (collada) {
//     // texture = new THREE.TextureLoader();
//     // texture.load(skin, function (texture) {
//     //     collada.scene.traverse(function (child) {
//     //         if (child.isMesh) {
//     //             child.material.map = texture
//     //         }
//     //     });
//     //     scene.add(collada.scene);
//     // });

//     scene.add(collada.scene);
//     house = collada.scene.children[0];
//     house.position.set(-40, -45, 0);
//     animate();
// });

var loader = new GLTFLoader();

// loader.load("./3dModel/sofa/sofa.gltf", function (gltf) {
// loader.load("./3d/20201108.gltf", function (gltf) {
loader.load("./3d/20201109-3.glb", function (gltf) {
    texture = new THREE.TextureLoader();
    // texture.load(skin, function (texture) {
    //     gltf.scene.traverse(function (child) {
    //         if (child.isMesh) {
    //             texture.flipY = false;
    //             child.material.map = texture;
    //         }
    //     });
    //     // scene.add(gltf.scene);
    // });

    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    renderer.render(scene, camera);
    animate();
});



var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 100;


function animate() {
    requestAnimationFrame(animate);
    // house.rotation.z += 0.02;
    // house.rotateY(0.02);
    renderer.render(scene, camera);
}

let btn = document.querySelectorAll('.box');

btn.forEach((x, a) => {
    x.addEventListener('click', () => {
        skin = src[a];
        texture.load(skin, function (texture) {
            house.traverse(function (child) {
                if (child.isMesh) {
                    child.material.map = texture
                }
            });
        });
    });
});