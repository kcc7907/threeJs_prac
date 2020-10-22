// import {
//     GLTFLoader
// }
// from "/node_modules/three/examples/jsm/loaders/GLTFLoader.js";


import {
    ColladaExporter
}
    from "/node_modules/three/examples/jsm/exporters/ColladaExporter.js";

import {
    ColladaLoader
} from "/node_modules/three/examples/jsm/loaders/ColladaLoader.js";
//這邊是載入dae檔  用的是內附的ColladaLoader  注意是用到JSM資料夾下的

let container, camera, renderer, scene, house, house1;
var dae, skin;

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
    camera.position.set(-10, 3, 0);
    // camera.position.set(0, 3, 10);
    camera.lookAt(scene.position);

    //燈光
    var light = new THREE.PointLight(0xffffff, 3, 1000);
    light.position.set(-30, 10, -10);
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
    var loader = new ColladaLoader(); //JSM的用法前面不用加THREE  不要問我什麼事JSM  我也不知道呵呵
    // var loader2 = new THREE.ColladaLoader();  一般的JS檔用這打法
    loader.load('./3d/sofa-twocolor.dae', function (collada) {
        house = collada.scene.children[0];
        house.position.set(-30, 10, 0);
        // house = new THREE.MeshBasicMaterial({
        //     map: texture
        // });
        scene.add(collada.scene);
        animate();
    });
    // loader.load('./3d/sofa.dae', function (collada) {
    //     house1 = collada.scene.children[1];
    //     house.position.set(0, 100, 0);
    //     // house = new THREE.MeshBasicMaterial({
    //     //     map: texture
    //     // });
    //     scene.add(collada.scene);
    //     animate();
    // });



    var axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
}

// var loader = new GLTFLoader();
// loader.load("./3d/scene.gltf", function (gltf) {
//     scene.add(gltf.scene);
//     house = gltf.scene.children[0];
//     renderer.render(scene, camera);
// });

function animate() {
    requestAnimationFrame(animate);
    // house.rotation.z += 0.02;
    // house.rotateZ(0.02);
    renderer.render(scene, camera);
    // console.log(house);
}
init();