import "./style.css";
import * as THREE from "three";

import Stats from "three/examples/jsm/libs/stats.module.js";

import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let perspectiveCamera, controls, scene, renderer, stats;

init();
animate();

function init() {
  const aspect = window.innerWidth / window.innerHeight;

  perspectiveCamera = new THREE.PerspectiveCamera(25, aspect, 1, 1000);
  perspectiveCamera.position.z = 250;

  //------------- world

  scene = new THREE.Scene();
  scene.background = new THREE.Color("#1f1f1f");
  scene.fog = new THREE.FogExp2("#1f1f1f", 0.001);

  //------------- loaders

  // CF Center Building Asset
  new GLTFLoader().load("low_poly_building_1/scene.gltf", function (gltf) {
    gltf.scene.rotation.y = 3 * (Math.PI / 2);
    gltf.scene.position.y = -25;
    gltf.scene.scale.set(8, 8, 8);
    scene.add(gltf.scene);
  });
  // new GLTFLoader().load("low_poly_building/scene.gltf", function (gltf) {
  //   gltf.scene.rotation.y = 3 * (Math.PI / 2);
  //   gltf.scene.position.y = -25;
  //   gltf.scene.scale.set(8, 8, 8);
  //   scene.add(gltf.scene);
  // });
  // new GLTFLoader().load("japanese_restaurant/scene.gltf", function (gltf) {
  //   gltf.scene.rotation.y = 3 * (Math.PI / 2);
  //   gltf.scene.position.y = -25;
  //   gltf.scene.scale.set(8, 8, 8);
  //   scene.add(gltf.scene);
  // });
  // new GLTFLoader().load(
  //   "foodiesbld/crypto-foodies-building.gltf",
  //   function (gltf) {
  //     gltf.scene.rotation.y = 3 * (Math.PI / 2);
  //     gltf.scene.position.y = -25;
  //     gltf.scene.scale.set(8, 8, 8);
  //     scene.add(gltf.scene);
  //   }
  // );

  //ND Chinese Asset
  new GLTFLoader().load("nice-day-chinese.glb", function (gltf) {
    // gltf.scene.rotation.y = 3 * (Math.PI / 2);
    gltf.scene.position.x = -60;
    gltf.scene.position.y = 35;
    gltf.scene.scale.set(8, 8, 8);
    scene.add(gltf.scene);
  });

  const protectedArea = 85;
  const worldScaleDispersionFactor = 500;
  const assetLoopCount = 30;

  //Burger Asset
  for (let i = 0; i < assetLoopCount; i++) {
    new GLTFLoader().load("burger.glb", function (gltf) {
      randomPlacementAssetGenerator(gltf, worldScaleDispersionFactor, 6);
    });
  }

  //fries Asset
  for (let i = 0; i < assetLoopCount; i++) {
    new GLTFLoader().load("fries.glb", function (gltf) {
      randomPlacementAssetGenerator(gltf, worldScaleDispersionFactor, 4);
    });
  }

  //hotdog Asset
  for (let i = 0; i < assetLoopCount; i++) {
    new GLTFLoader().load("hotdog.glb", function (gltf) {
      randomPlacementAssetGenerator(gltf, worldScaleDispersionFactor, 3.5);
    });
  }

  //milkshake Asset
  for (let i = 0; i < assetLoopCount; i++) {
    new GLTFLoader().load("milkshake.glb", function (gltf) {
      randomPlacementAssetGenerator(gltf, worldScaleDispersionFactor, 4);
    });
  }

  // //taco Asset
  // for (let i = 0; i < 10; i++) {
  //   new GLTFLoader().load("taco.glb", function (gltf) {
  //     randomPlacementAssetGenerator(gltf, worldScaleDispersionFactor, 6);
  //   });
  // }

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
      // mesh.rotation.x = (Math.random() - 0.5) * range;
      // mesh.rotation.y = (Math.random() - 0.5) * range;
      // mesh.rotation.z = (Math.random() - 0.5) * range;
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

  const dirLight3 = new THREE.DirectionalLight("#009999");
  dirLight1.position.set(20, 20, 20);
  scene.add(dirLight3);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(ambientLight);

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

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  stats.update();

  render();
}

function render() {
  const camera = perspectiveCamera;
  renderer.render(scene, camera);
}
