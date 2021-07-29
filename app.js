import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';


// import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";


//Initial Camera Position Coordinates
var cameraX = -180;
var cameraY = 250;
var cameraZ = -150;

//Scene Creation
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xED7117);
scene.fog = new THREE.FogExp2(0xED7014, 0.00144);


//Creating Camera for the scene
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(cameraX, cameraY, cameraZ);

var dirlight = new THREE.DirectionalLight(0xFFF000, 1);
dirlight.position.set(20, 100, 10);
dirlight.target.position.set(0, 0, 0);
dirlight.castShadow = true;
dirlight.shadow.bias = -0.001;
dirlight.shadow.mapSize.width = 2048;
dirlight.shadow.mapSize.height = 2048;
dirlight.shadow.camera.near = 0.1;
dirlight.shadow.camera.far = 500.0;
dirlight.shadow.camera.near = 0.5;
dirlight.shadow.camera.far = 500.0;
dirlight.shadow.camera.left = 100;
dirlight.shadow.camera.right = -100;
dirlight.shadow.camera.top = 100;
dirlight.shadow.camera.bottom = -100;

var ambientLight = new THREE.AmbientLight(0xFFFF00, 3);
scene.add(ambientLight);

let hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x080820, 4);
scene.add(hemiLight);


const container = document.createElement('div');
document.body.appendChild(container);

var renderer = new THREE.WebGLRenderer({ antialiasing: true });
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.3;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

renderer.render(scene, camera);


let campLoader = new GLTFLoader();
let camp;
campLoader.load('./Resources/Camp/scene.gltf', (gltf) => {

    camp = gltf.scene.children[0];
    camp.scale.set(1, 1, 1);
    camp.position.set(150, 8, 350);
    camp.rotation.z = 180;
    scene.add(camp)

        ;
});

let pineLoader = new GLTFLoader();
let pine;
pineLoader.load('./Resources/Tree/scene.gltf', (gltf) => {

    pine = gltf.scene.children[0];
    pine.scale.set(20, 25, 20);
    pine.position.set(400, 0, 400);
    pine.rotation.z = 180;
    scene.add(pine)

        ;
});

let treeStumpLoader = new GLTFLoader();
let stump;
treeStumpLoader.load('./Resources/TreeStump/scene.gltf', (gltf) => {

    stump = gltf.scene.children[0];
    stump.scale.set(25, 20, 20);
    stump.position.set(10, 0, 330);
    stump.rotation.z = 180;
    scene.add(stump);
});

let wellLoader = new GLTFLoader();
let well;
wellLoader.load('./Resources/Well/scene.gltf', (gltf) => {

    well = gltf.scene.children[0];
    well.scale.set(2, 2, 1);
    well.position.set(520, 0, 140);
    well.rotation.z = 180;
    scene.add(well);
});


let rocksLoader = new GLTFLoader();
let rocks;
rocksLoader.load('./Resources/Rocks/scene.gltf', (gltf) => {

    rocks = gltf.scene.children[0];
    rocks.scale.set(50, 50, 50);
    rocks.position.set(200, 20, 120);
    rocks.rotation.z = 180;
    scene.add(rocks)
        ;
});



var geo = new THREE.PlaneGeometry(15000, 15000, 30, 30);
var mat = new THREE.MeshBasicMaterial({ color: 0xFA8128, side: THREE.DoubleSide, wireframe: false });
var plane = new THREE.Mesh(geo, mat);
scene.add(plane);
plane.rotation.x = (-Math.PI / 2);



camera.lookAt(new THREE.Vector3(0, 0, 0));



var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;
controls.zoomSpeed = 1.15;
controls.screenSpacePanning = false;
controls.minDistance = 300;
controls.maxDistance = 450;
controls.minPolarAngle = -Math.PI / 1.5;
controls.maxPolarAngle = Math.PI / 2.5;
controls.update();


var animate = function () {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}


window.addEventListener('resize', onWindowResize);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

animate();