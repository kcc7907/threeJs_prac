import * as THREE from '/node_modules/three/build/three.module.js' // 引入基本的 THREE 
import {
    ColladaLoader as testLoader
} from "/node_modules/three/examples/jsm/loaders/ColladaLoader.js";
// 延伸的 ColladaLoader，之所以不用加THREE，是因為這個檔案內部就有 import THREE，拉過來之後可以想成是另一個變數
// 可以看到範例 code，其實也可以命名成另一個名字

//這邊是載入dae檔  用的是內附的testLoader  注意是用到JSM資料夾下的
let container, camera, renderer, scene, house, house1, texture;

var skin = '' || './3d/textures/Suede_Brown.jpg';

let link = {
    link0: './3d/textures/Suede_Brown.jpg',
    link1: './3d/textures/Material~1.jpg',
    link2: './3d/textures/Material_diffuse.png',
}
let src = ['./3d/textures/Suede_Brown.jpg', './3d/textures/Material~1.jpg', './3d/textures/Material_diffuse.png']
console.log(src[0]);

container = document.querySelector('.scene');

scene = new THREE.Scene();

const fov = 20;
const aspect = container.clientWidth / container.clientHeight;
const near = .1;
const far = 1000;
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(-10, 3, 0);
camera.lookAt(scene.position);

var light = new THREE.PointLight(0xffffff, 3, 1000);
light.position.set(-30, 10, -10);
scene.add(light);

renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);


//載入外部模型
var loader = new testLoader();
// var loader2 = new THREE.testLoader();  一般的JS檔用這打法

loader.load('./3d/sofa.dae', function (collada) { // 先讀完模型
    texture = new THREE.TextureLoader();
    texture.load(skin, function (texture) { // 讀完材質，開始做事

        collada.scene.traverse(function (child) {
            // 上材質
            if (child.isMesh) {
                child.material.map = texture
            }
        });
        scene.add(collada.scene);
    });
    house = collada.scene.children[0];
    house.position.set(-40, -45, 0);
    animate();
});




var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


function animate() {
    requestAnimationFrame(animate);
    // house.rotation.z += 0.02;
    // house.rotateZ(0.02);
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