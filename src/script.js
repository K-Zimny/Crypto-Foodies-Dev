import "./style.css";
import * as THREE from "three";

import Stats from "three/examples/jsm/libs/stats.module.js";

import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let perspectiveCamera, controls, scene, renderer, stats;

init();

function init() {
  const aspect = window.innerWidth / window.innerHeight;

  perspectiveCamera = new THREE.PerspectiveCamera(25, aspect, 1, 1500);
  perspectiveCamera.position.z = 250;

  //------------- world

  scene = new THREE.Scene();
  scene.background = new THREE.Color("#1f1f1f");
  scene.fog = new THREE.FogExp2("#1f1f1f", 0.001);

  //------------- loaders

  // CF Center Building Asset
  new GLTFLoader().load("crypto-foodies/building-glass.glb", function (gltf) {
    // gltf.scene.rotation.y = 3 * (Math.PI / 2);
    gltf.scene.position.y = -25;
    gltf.scene.scale.set(4, 4, 4);
    scene.add(gltf.scene);
  });

  // CF Center Building Logo Asset
  new GLTFLoader().load("crypto-foodies/cf-logo.glb", function (gltf) {
    // gltf.scene.rotation.y = 3 * (Math.PI / 2);
    gltf.scene.position.y = 20;
    gltf.scene.scale.set(40, 40, 40);
    scene.add(gltf.scene);
  });

  //ND chinese Asset
  new GLTFLoader().load("brands/nice-day-chinese.glb", function (gltf) {
    // gltf.scene.rotation.y = 3 * (Math.PI / 2);
    gltf.scene.position.x = -20;
    gltf.scene.position.y = 100;
    gltf.scene.scale.set(18, 18, 18);
    scene.add(gltf.scene);
  });

  //Budlong Asset
  new GLTFLoader().load("brands/budlong.glb", function (gltf) {
    // gltf.scene.rotation.y = 3 * (Math.PI / 2);
    gltf.scene.position.x = 100;
    gltf.scene.position.y = 35;
    gltf.scene.scale.set(18, 18, 18);
    scene.add(gltf.scene);
  });

  //HB stan Asset
  new GLTFLoader().load("brands/hamburger-stan.glb", function (gltf) {
    // gltf.scene.rotation.y = 3 * (Math.PI / 2);
    gltf.scene.position.x = -100;
    gltf.scene.position.y = 35;
    gltf.scene.scale.set(8, 8, 8);
    scene.add(gltf.scene);
  });

  const protectedArea = 85;
  const worldScaleDispersionFactor = 500;
  const assetLoopCount = 30;

  //Burger Asset
  for (let i = 0; i < assetLoopCount; i++) {
    new GLTFLoader().load("bg-assets/burger.glb", function (gltf) {
      randomPlacementAssetGenerator(gltf, worldScaleDispersionFactor, 6);
    });
  }

  new GLTFLoader().load("bg-assets/burger.glb", function (gltf) {
    gltf.scene.scale.set(100, 100, 100);
    gltf.scene.position.x = -80;
    gltf.scene.position.z = -500;
    scene.add(gltf.scene);
  });

  //fries Asset
  for (let i = 0; i < assetLoopCount; i++) {
    new GLTFLoader().load("bg-assets/fries.glb", function (gltf) {
      randomPlacementAssetGenerator(gltf, worldScaleDispersionFactor, 4);
    });
  }

  new GLTFLoader().load("bg-assets/fries.glb", function (gltf) {
    gltf.scene.scale.set(45, 45, 45);
    gltf.scene.position.x = -280;
    gltf.scene.position.z = -420;
    gltf.scene.rotation.y = Math.PI / 8;
    scene.add(gltf.scene);
  });

  //hotdog Asset
  for (let i = 0; i < assetLoopCount; i++) {
    new GLTFLoader().load("bg-assets/hotdog.glb", function (gltf) {
      randomPlacementAssetGenerator(gltf, worldScaleDispersionFactor, 3.5);
    });
  }

  new GLTFLoader().load("bg-assets/hotdog.glb", function (gltf) {
    gltf.scene.scale.set(35, 35, 35);
    gltf.scene.position.x = 300;
    gltf.scene.position.z = -420;
    gltf.scene.rotation.y = -(Math.PI / 8);
    scene.add(gltf.scene);
  });

  //milkshake Asset
  for (let i = 0; i < assetLoopCount; i++) {
    new GLTFLoader().load("milkshake.glb", function (gltf) {
      randomPlacementAssetGenerator(gltf, worldScaleDispersionFactor, 4);
    });
  }

  //Random Placement Asset Generation Function
  function randomPlacementAssetGenerator(
    gltf,
    worldScaleFactor,
    assetScaleFactor
  ) {
    gltf.scene.position.x = (Math.random() - 0.5) * worldScaleFactor;
    gltf.scene.position.y = (Math.random() - 0.5) * worldScaleFactor;
    gltf.scene.position.z = (Math.random() - 0.5) * worldScaleFactor;
    gltf.scene.rotation.x = (Math.random() - 0.5) * worldScaleFactor;
    gltf.scene.rotation.y = (Math.random() - 0.5) * worldScaleFactor;
    gltf.scene.rotation.z = (Math.random() - 0.5) * worldScaleFactor;
    gltf.scene.scale.set(assetScaleFactor, assetScaleFactor, assetScaleFactor);
    gltf.scene.updateMatrix();
    gltf.scene.matrixAutoUpdate = false;
    if (gltf.scene.position.z > 250 || gltf.scene.position.z < -protectedArea) {
      scene.add(gltf.scene);
    }

    if (
      gltf.scene.position.y > protectedArea ||
      gltf.scene.position.y < -protectedArea
    ) {
      scene.add(gltf.scene);
    }

    if (
      gltf.scene.position.x > protectedArea ||
      gltf.scene.position.x < -protectedArea
    ) {
      scene.add(gltf.scene);
    }
  }

  //----------- Stars

  const starGeometry = new THREE.BoxGeometry(1, 1, 0);
  const purpleMaterial = new THREE.MeshBasicMaterial({
    color: "#f542ec",
    transparent: true,
    opacity: 0.4,
  });
  const orangeMaterial = new THREE.MeshBasicMaterial({
    color: "#f55d42",
    transparent: true,
    opacity: 0.4,
  });
  const whiteMaterial = new THREE.MeshBasicMaterial({
    color: "#fcf7e1",
    transparent: true,
    opacity: 0.4,
  });

  randomPlacementMeshGenerator(starGeometry, purpleMaterial, 0.5, 5000, 500);
  randomPlacementMeshGenerator(starGeometry, orangeMaterial, 0.65, 3000, 500);
  randomPlacementMeshGenerator(starGeometry, whiteMaterial, 0.75, 500, 500);

  //Random Placement Asset Generation Function

  function randomPlacementMeshGenerator(
    geometry,
    material,
    scale,
    loop,
    range
  ) {
    for (let i = 0; i < loop; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * range;
      mesh.position.y = (Math.random() - 0.5) * range;
      mesh.position.z = (Math.random() - 0.5) * range;
      mesh.scale.set(scale, scale, scale);
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      if (mesh.position.z > 200 || mesh.position.z < -protectedArea) {
        scene.add(mesh);
      }

      if (mesh.position.y > protectedArea || mesh.position.y < -protectedArea) {
        scene.add(mesh);
      }

      if (mesh.position.x > protectedArea || mesh.position.x < -protectedArea) {
        scene.add(mesh);
      }
    }
  }

  //-------------  lights

  const dirLight1 = new THREE.DirectionalLight(0xffffff);
  dirLight1.position.set(1, 1, 1);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x002288);
  dirLight2.position.set(-1, -1, -1);
  scene.add(dirLight2);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(ambientLight);

  // building lighting
  const light = new THREE.PointLight("hsl(10,100%,50%)", 27, 100);
  light.position.set(0, -25, -50);
  scene.add(light);

  // stan lighting
  const light1 = new THREE.PointLight("hsl(100,100%,50%)", 27, 100);
  light1.position.set(6, 135, -50);
  scene.add(light1);
  //------------- renderer

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  stats = new Stats();
  document.body.appendChild(stats.dom);

  window.addEventListener("resize", onWindowResize);

  createControls(perspectiveCamera);
}

function createControls(camera) {
  controls = new TrackballControls(camera, renderer.domElement);

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 0.8;
  controls.panSpeed = 0.8;
  controls.maxDistance = 600;
  controls.minDistance = 200;

  controls.keys = ["KeyA", "KeyS", "KeyD"];
}

function onWindowResize() {
  const aspect = window.innerWidth / window.innerHeight;

  perspectiveCamera.aspect = aspect;
  perspectiveCamera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  controls.handleResize();
}

function render() {
  const camera = perspectiveCamera;
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  stats.update();
  render();
}

function rotate() {
  perspectiveCamera.position.x += Math.cos(1 * Math.PI * 2) / 4;
  perspectiveCamera.position.y += Math.cos(1 * Math.PI * 2) / 4;
  perspectiveCamera.position.z += Math.cos(1 * Math.PI * 2) / 14;
  requestAnimationFrame(rotate);
  controls.update();
  stats.update();
  render();
}

animate();
// rotate();
