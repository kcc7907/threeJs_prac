// import {
//     GLTFLoader
// }
// from "/node_modules/three/examples/jsm/loaders/GLTFLoader.js";


import {
    ColladaLoader
} from "/node_modules/three/examples/jsm/loaders/ColladaLoader.js";
//這邊是載入dae檔  用的是內附的ColladaLoader  注意是用到JSM資料夾下的

let container, camera, renderer, scene, house;

function init() {
    container = document.querySelector('.scene');

    //場景
    scene = new THREE.Scene();

    //相機
    const fov = 20;
    const aspect = container.clientWidth / container.clientHeight;
    const near = .1;
    const far = 1000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0.5, 0.2, 10);

    //燈光
    var light = new THREE.PointLight(0xffffff, 1, 500);
    light.position.set(10, 0, 25);
    scene.add(light);

    //渲染
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    //載入外部模型
    var loader2 = new ColladaLoader(); //JSM的用法前面不用加THREE  不要問我什麼事JSM  我也不知道呵呵
    // var loader2 = new THREE.ColladaLoader();  一般的JS檔用這打法
    loader2.load('./3d/20201018.dae', function (collada) {
        scene.add(collada.scene);
        house = collada.scene.children[0];
        animate()
    });
}

// let loader = new GLTFLoader();
// loader.load("./3d/scene.gltf", function (gltf) {
//     scene.add(gltf.scene);
//     house = gltf.scene.children[0];
//     renderer.render(scene, camera);
// });

function animate() {
    requestAnimationFrame(animate);
    house.rotation.z += 0.02;
    renderer.render(scene, camera);
}
init();