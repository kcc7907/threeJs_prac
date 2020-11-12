// let container, camera, renderer, scene, house, house1, texture, model;

let scene = new THREE.Scene();


let camera = new THREE.PerspectiveCamera(75., window.innerWidth / window.innerHeight, 1, 1000);

let renderer = new THREE.WebGL1Renderer();
renderer.setClearColor('#ffffff');
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry = new THREE.CubeGeometry(2, 2, 2);
let material = new THREE.MeshBasicMaterial(0xff0000);
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}