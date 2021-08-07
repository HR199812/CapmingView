import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";


//Initial Car Position Coordinates
var carX = 40;
var carY = 10;
var carZ = 20;

//Initial Camera Position Coordinates
var cameraX = -180;
var cameraY = 250;
var cameraZ = -150;

//Movement Keys
let MovementKeys =
{
    Shift: false,
    a: false,
    w: false,
    d: false,
    s: false,
}

//Boolean for play/pause car engine sound
var isCarEngineSound = true;

//Boolean for play/pause music player
var isMusicPlayerSound = false;

//Music Player
var musicPLayer = new Howl({
    src: ['./AudioResources/MusicPlayer/MusicPlayerSongs.mp3'],
    html5: true,
    volume: 1,
    loop: true
});

//Car Honk Sound 
var honkSound = new Howl({
    src: ['./AudioResources/Car/Car-Horn.mp3'],
    volume: 0.5,
});


//Car Engine Sound 
var engineSound = new Howl({
    src: ['./AudioResources/Car/Car-Engine.mp3'],
    html5: true,
    volume: 0.1,
    loop: true
});

//Car Engine Start Sound 
var engineStart = new Howl({
    src: ['./AudioResources/Car/Car-Engine-Start.mp3'],
    html5: true,
    volume: 0.4
});

//Car Acceleration Sound 
// var engineAcceleration = new Howl({
//     src: ['./AudioResources/CarSound/Car-Acceleration.mp3'],
//     html5: true,
//     volume: 0.4
// });


//Scene Creation
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xED7117);
scene.fog = new THREE.FogExp2(0xED7014, 0.00144);


//Creating Camera for the scene
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(cameraX, cameraY, cameraZ);

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


let carMove;
let car = new FBXLoader();
car.load('./Resources/Vehicle/car.fbx', (fbx) => {

    // fbx.scale.setScalar(0.3);
    carMove = fbx;
    fbx.scale.setScalar(10);
    fbx.position.set(carX, carY, carZ);
    fbx.traverse(c => {
        c.castShadow = true;
        c.receiveShadow = false;
    });

    scene.add(fbx);

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

let rockLoader = new FBXLoader();
rockLoader.load('./Resources/Rock/source/rock_01.fbx', (fbx) => {
    fbx.scale.setScalar(0.5);
    fbx.position.set(430, 10, 430);
    fbx.traverse(c => {
        c.castShadow = true;
        c.receiveShadow = false;
    });

    scene.add(fbx);

});

let woodStickLoader = new FBXLoader();
woodStickLoader.load('./Resources/WoodStick/source/wood_stick_08_100k_uw.fbx', (fbx) => {
    fbx.scale.setScalar(0.05);
    fbx.position.set(280, 10, 190);
    fbx.rotation.x = (-Math.PI / 2);
    fbx.rotation.z = 180;
    fbx.traverse(c => {
        c.castShadow = true;
        c.receiveShadow = false;
    });

    scene.add(fbx);

});

let woodStickLoaderOne = new FBXLoader();
woodStickLoaderOne.load('./Resources/WoodStick/source/wood_stick_08_100k_uw.fbx', (fbx) => {
    fbx.scale.setScalar(0.05);
    fbx.position.set(280, 10, 190);
    fbx.rotation.x = (-Math.PI / 2);
    fbx.rotation.z = 180;
    fbx.traverse(c => {
        c.castShadow = true;
        c.receiveShadow = false;
    });

    scene.add(fbx);

});


let woodStickLoaderTwo = new FBXLoader();
woodStickLoaderTwo.load('./Resources/WoodStick/source/wood_stick_08_100k_uw.fbx', (fbx) => {
    fbx.scale.setScalar(0.05);
    fbx.position.set(280, 15, 230);
    fbx.rotation.x = (-Math.PI / 2);
    fbx.rotation.z = 180;
    fbx.traverse(c => {
        c.castShadow = true;
        c.receiveShadow = false;
    });

    scene.add(fbx);

});


let woodStickLoaderThree = new FBXLoader();
woodStickLoaderThree.load('./Resources/WoodStick/source/wood_stick_08_100k_uw.fbx', (fbx) => {
    fbx.scale.setScalar(0.05);
    fbx.position.set(280, 30, 190);
    fbx.rotation.x = (-Math.PI / 2);
    fbx.rotation.z = 180;
    fbx.traverse(c => {
        c.castShadow = true;
        c.receiveShadow = false;
    });

    scene.add(fbx);

});

let woodStickLoaderFour = new FBXLoader();
woodStickLoaderFour.load('./Resources/WoodStick/source/wood_stick_08_100k_uw.fbx', (fbx) => {
    fbx.scale.setScalar(0.05);
    fbx.position.set(280, 15, 210);
    fbx.rotation.x = (-Math.PI / 2);
    fbx.rotation.z = 180;
    fbx.traverse(c => {
        c.castShadow = true;
        c.receiveShadow = false;
    });

    scene.add(fbx);

});
let woodStickLoaderFive = new FBXLoader();
woodStickLoaderFive.load('./Resources/WoodStick/source/wood_stick_08_100k_uw.fbx', (fbx) => {
    fbx.scale.setScalar(0.05);
    fbx.position.set(280, 30, 210);
    fbx.rotation.x = (-Math.PI / 2);
    fbx.rotation.z = 180;
    fbx.traverse(c => {
        c.castShadow = true;
        c.receiveShadow = false;
    });

    scene.add(fbx);

});



var geo = new THREE.PlaneGeometry(15000, 15000, 30, 30);
var mat = new THREE.MeshBasicMaterial({ color: 0xFA8128, side: THREE.DoubleSide, wireframe: false });
var plane = new THREE.Mesh(geo, mat);
scene.add(plane);
plane.rotation.x = (-Math.PI / 2);


camera.position.set(carX, carY, carZ);
camera.position.add(new THREE.Vector3(cameraX, cameraY, cameraZ));
camera.lookAt(carX, carY, carZ);



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


let velocity = 0;
let steering = 0;


let carVelocity = new THREE.Vector3()
let tv0 = new THREE.Vector3()
let tv1 = new THREE.Vector3()
let { min, max, abs } = Math;

let updateVehicle = () => {

    //Car Move Forwards
    if (MovementKeys.w) {
        // engineAcceleration.play();

        velocity += MovementKeys.Shift ? 1 : 2;
    }
    if (MovementKeys.a) {

        steering -= 1;
        // engineAcceleration.play();
    }
    if (MovementKeys.d) {
        steering += 1;
        // engineAcceleration.play();
    }

    //Car Move Backwards
    if (MovementKeys.s) {
        // engineAcceleration.play();
        velocity -= MovementKeys.Shift ? 1 : 2;
    }
    if (carMove) {
        carVelocity.set(0, 0, velocity)
        carVelocity.applyQuaternion(carMove.quaternion)
        carVelocity.multiplyScalar(.1)
        carMove.position.add(carVelocity);
        carMove.rotation.y -= steering * 0.001

        velocity *= .98;
        steering *= .98;

        tv0.copy(controls.target).sub(camera.position);
        let len = tv0.length()
        controls.target.add(carVelocity);
        carVelocity.multiplyScalar(.1)
        camera.position.add(carVelocity);

        tv0.copy(camera.position).sub(controls.target);

        let nlen = tv0.length()

        nlen = max(200, nlen)
        tv0.multiplyScalar(len / nlen);
        camera.position.copy(tv0).add(controls.target)

        camera.position.y = max(camera.position.y, 30)
    }
}

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

//Animating Mouse on splash screen
document.addEventListener('DOMContentLoaded', () => {

    anime({
        targets: '.Splash',
        translateY: [
            { value: -1000, duration: 1000, delay: 500 },
            { value: 0, duration: 1000, delay: 500 }
        ]
    });

    anime({
        targets: '.LeftMouse',
        translateX: [
            { value: 0, duration: 1000, delay: 500 },
            { value: -30, duration: 1000, delay: 500 },
            { value: 0, duration: 1000, delay: 500 },
        ],
        loop: true
    });

    anime({
        targets: '.RightMouse',
        translateX: [
            { value: 0, duration: 1000, delay: 500 },
            { value: 30, duration: 1000, delay: 500 },
            { value: 0, duration: 1000, delay: 500 },
        ],
        loop: true
    });

    anime({
        targets: '.MouseScroll',
        scale: [
            { value: 0.8, duration: 1000 },
            { value: 1, duration: 1000 },
        ],
        loop: true
    });

    anime({
        targets: '.ScrollSplashScreenUp',
        translateY: [
            { value: 0, duration: 1000 },
            { value: 10, duration: 1000 },
        ],
        scale: [
            { value: 1.2, duration: 1000 },
        ],
        loop: true
    });
});


//Remove Splash Screen on click of button
document.querySelector('.RemoveSplashScreen').addEventListener('click', () => {

    engineStart.play();
    engineSound.play();

    anime({
        targets: '.Splash',
        translateY: [
            { value: 0, duration: 1000, delay: 500 },
            { value: -1000, duration: 1000, delay: 500 },
        ]
    });
});

//Remove Small Splash Screen on click of button
document.querySelector('.RemoveSmallSplashScreen').addEventListener('click', () => {

    engineStart.play();
    engineSound.play();
    
    anime({
        targets: '.SplashForSmallDevices',
        translateY: [
            { value: 0, duration: 1000, delay: 500 },
            { value: -1000, duration: 1000, delay: 500 },
        ]
    });

    document.querySelector('.soundControls').style.visibility = 'visible';

    document.querySelector('.movementControls').style.visibility = 'visible';
});

// Play Honk Sound BUtton Event
document.querySelector('.honk').addEventListener('click', () => {
    honkSound.play();
});

// Play Music button event
document.querySelector('.playmusic').addEventListener('click', () => {
    engineSound.pause();
    musicPLayer.play();
    document.querySelector('.playmusic').disabled = true;
});

// Mute button Event
var muteunmuteCheck = false;
document.querySelector('.muteeverything').addEventListener('click', () => {
    if (muteunmuteCheck) {
        engineSound.play();
        musicPLayer.pause();
        document.querySelector('.playmusic').disabled = false;
        document.querySelector('.muteunmute').src = './SplashScreenResources/Controls/unmute.png';
        muteunmuteCheck = false;
    }
    else {
        engineSound.pause();
        musicPLayer.pause();
        document.querySelector('.playmusic').disabled = true;
        document.querySelector('.muteunmute').src = './SplashScreenResources/Controls/mute.png';
        muteunmuteCheck = true;
    }
});


// keydown
window.addEventListener('keydown', (e) => {


    //Play/Pause Music
    if (e.key === 'p') {
        if (isMusicPlayerSound) {
            engineSound.play();
            isMusicPlayerSound = false;
            musicPLayer.pause();
        }
        else {
            engineSound.pause();
            isMusicPlayerSound = true;
            musicPLayer.play();
        }

    }


    //Mute/Unmute all sounds
    if (e.key === 'm') {
        if (isCarEngineSound) {
            engineSound.pause();
            musicPLayer.pause();
            isCarEngineSound = false;
        }
        else {
            musicPLayer.pause();
            engineSound.play();
            isCarEngineSound = true;
        }

    }
    //PLay Honk Sound
    if (e.key === 'h') {
        honkSound.play();
    }

    //Car Movement
    if (e.key === 'Shift') {
        MovementKeys.Shift = true;
    }
    if (e.key === 'a') {
        MovementKeys.a = true;
    }
    if (e.key === 'w') {
        MovementKeys.w = true;
    }
    if (e.key === 'd') {
        MovementKeys.d = true;
    }
    if (e.key === 's') {
        MovementKeys.s = true;
    }

});

// KeyUp
window.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
        MovementKeys.Shift = false;
    }
    if (e.key === 'a') {
        MovementKeys.a = false;
    }
    if (e.key === 'd') {
        MovementKeys.d = false;
    }
    if (e.key === 'w') {
        MovementKeys.w = false;
    }
    if (e.key === 's') {
        MovementKeys.s = false;
    }

    if (e.key === 'w' || e.key === 'ArrowUp') {
        // engineAcceleration.pause();
    }

    if (e.key === 'Alt') {
        handBreak.pause();
    }
});


// Touch Start
document.querySelector('.forward').addEventListener('touchstart', (e)=>{
    MovementKeys.w = true;
});
document.querySelector('.backward').addEventListener('touchstart', (e)=>{
    MovementKeys.s = true;
});
document.querySelector('.left').addEventListener('touchstart', (e)=>{
    MovementKeys.a = true;
});
document.querySelector('.right').addEventListener('touchstart', (e)=>{
    MovementKeys.d = true;
});

//Touch End
document.querySelector('.forward').addEventListener('touchend', (e)=>{
    MovementKeys.w = false;
});
document.querySelector('.backward').addEventListener('touchend', (e)=>{
    MovementKeys.s = false;
});
document.querySelector('.left').addEventListener('touchend', (e)=>{
    MovementKeys.a = false;
});
document.querySelector('.right').addEventListener('touchend', (e)=>{
    MovementKeys.d = false;
});
document.addEventListener("contextmenu", function(e){
    e.preventDefault();
}, false);
