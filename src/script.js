import "./general.css";
import "./content.css";
import "./enter-screen.css";
import "./page.js";
import * as THREE from "three";

import Stats from "three/examples/jsm/libs/stats.module.js";

import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

let perspectiveCamera, controls, scene, renderer, stats;

let requestRotate, requestIntroZoomIn, requestSlowRotate;
let requestAltLookAt = false;

let altCamX, altCamY, altCamZ;

init();

function init() {
  const aspect = window.innerWidth / window.innerHeight;
  perspectiveCamera = new THREE.PerspectiveCamera(25, aspect, 1, 2500);
  perspectiveCamera.position.z = 2500;
  perspectiveCamera.position.x = -1000;
  perspectiveCamera.position.y = -1000;

  //------------- world

  scene = new THREE.Scene();
  scene.background = new THREE.Color("#1f1f1f");
  scene.fog = new THREE.FogExp2("#1f1f1f", 0.0005);

  // pano scene

  const geometry = new THREE.SphereGeometry(700, 60, 40);
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale(-1, 1, 1);

  const texture = new THREE.TextureLoader().load("imgs/space-bg.webp");
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.repeat.set(4, 4);

  const material = new THREE.MeshBasicMaterial({ map: texture });
  material.transparent = false;
  material.opacity = 0.5;

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  //------------- loaders

  // DRACO Loader

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("draco/");

  // // CF Center Building Asset
  // new GLTFLoader().load("crypto-foodies/building-glass.glb", function (gltf) {
  //   // gltf.scene.rotation.y = 3 * (Math.PI / 2);
  //   gltf.scene.position.y = -25;
  //   gltf.scene.scale.set(4, 4, 4);
  //   scene.add(gltf.scene);
  // });

  // CF Center Building Logo Above building Asset
  const buildingLogo = new GLTFLoader();
  buildingLogo.setDRACOLoader(dracoLoader);
  buildingLogo.load("locations/u-of-texas.gltf", function (gltf) {
    gltf.scene.position.y = 0;
    gltf.scene.position.z = 0;
    gltf.scene.scale.set(15, 15, 15);
    scene.add(gltf.scene);
    function rotate() {
      requestAnimationFrame(rotate);
      gltf.scene.rotation.y += 0.005;
    }
    rotate();
  });

  // // CF Center Building Logo Asset
  // const coinLogo = new GLTFLoader();
  // coinLogo.setDRACOLoader(dracoLoader);
  // coinLogo.load("crypto-foodies/cf-logo.gltf", function (gltf) {
  //   gltf.scene.position.x = -30;
  //   gltf.scene.position.y = -5;
  //   gltf.scene.position.z = 5;
  //   gltf.scene.scale.set(10, 10, 10);
  //   scene.add(gltf.scene);
  //   function rotate() {
  //     requestAnimationFrame(rotate);
  //     gltf.scene.rotation.y += 0.025;
  //   }
  //   rotate();
  // });
  // coinLogo.load("crypto-foodies/cf-logo.gltf", function (gltf) {
  //   gltf.scene.position.x = 30;
  //   gltf.scene.position.y = -5;
  //   gltf.scene.position.z = 5;
  //   gltf.scene.scale.set(10, 10, 10);
  //   scene.add(gltf.scene);
  //   function rotate() {
  //     requestAnimationFrame(rotate);
  //     gltf.scene.rotation.y -= 0.025;
  //   }
  //   rotate();
  // });

  //Tejis asset
  const tejiLoader = new GLTFLoader();
  tejiLoader.setDRACOLoader(dracoLoader);
  tejiLoader.load("locations/tejis-full-blue.gltf", function (gltf) {
    // gltf.scene.rotation.y = 3 * (Math.PI / 2);
    gltf.scene.position.x = 0;
    gltf.scene.position.y = -85;
    gltf.scene.scale.set(10, 10, 10);
    scene.add(gltf.scene);
    let x = 0;
    let y = 0;
    let z = 0;
    function rotate() {
      requestAnimationFrame(rotate);
      gltf.scene.rotation.y += 0.0005;
      gltf.scene.rotation.x -= 0.0005;
      gltf.scene.rotation.z -= 0.0005;
      gltf.scene.position.x = Math.sin(x) * 65;
      gltf.scene.position.y = Math.cos(y) * 65;
      gltf.scene.position.z = Math.cos(z) * 65;
      x += 0.001;
      y += 0.001;
      z += 0.001;
    }
    rotate();
  });

  //Ghost Kitchen asset
  const ghostKitchenLoader = new GLTFLoader();
  ghostKitchenLoader.setDRACOLoader(dracoLoader);
  ghostKitchenLoader.load(
    "locations/ghostline-kitchens-orange.gltf",
    function (gltf) {
      // gltf.scene.rotation.y = 3 * (Math.PI / 2);
      gltf.scene.position.x = 0;
      gltf.scene.position.y = 85;
      gltf.scene.scale.set(10, 10, 10);
      scene.add(gltf.scene);
      let x = 0;
      let y = Math.PI;
      let z = 0;
      function rotate() {
        requestAnimationFrame(rotate);
        gltf.scene.rotation.y -= 0.0005;
        gltf.scene.rotation.x += 0.0005;
        gltf.scene.rotation.z += 0.0005;
        gltf.scene.position.x = Math.sin(x) * 65;
        gltf.scene.position.y = Math.cos(y) * 65;
        gltf.scene.position.z = Math.cos(z) * 65;
        x -= 0.001;
        y -= 0.001;
        z += 0.001;
      }
      rotate();
    }
  );

  //ND chinese Asset
  const ndChinese = new GLTFLoader();
  ndChinese.setDRACOLoader(dracoLoader);
  ndChinese.load("brands/nice-day-chinese-test.gltf", function (gltf) {
    // gltf.scene.rotation.y = 3 * (Math.PI / 2);
    gltf.scene.position.x = 0;
    gltf.scene.position.y = 135;
    gltf.scene.scale.set(20, 20, 20);
    scene.add(gltf.scene);
    let x = 0;
    let y = 0;
    let z = 0;
    function rotate() {
      requestAnimationFrame(rotate);
      gltf.scene.rotation.y += 0.00075;
      gltf.scene.rotation.x -= 0.00075;
      gltf.scene.rotation.z -= 0.00075;
      gltf.scene.position.x = Math.sin(x) * 125;
      gltf.scene.position.y = Math.cos(y) * 125;
      gltf.scene.position.z = Math.cos(z) * 125;
      x -= 0.001;
      y -= 0.001;
      z += 0.001;
    }
    rotate();
  });

  //Budlong Asset

  const budLoader = new GLTFLoader();
  budLoader.setDRACOLoader(dracoLoader);
  budLoader.load(
    // resource URL
    "brands/budlong-compressed.glb",
    // called when the resource is loaded
    function (gltf) {
      gltf.scene.position.x = 115;
      gltf.scene.position.y = -135;
      gltf.scene.scale.set(10, 10, 10);
      scene.add(gltf.scene);
      let x = -2.09;
      let y = -2.09;
      let z = 0;
      function rotate() {
        requestAnimationFrame(rotate);
        gltf.scene.rotation.y -= 0.00075;
        gltf.scene.rotation.x += 0.00075;
        gltf.scene.rotation.z -= 0.00075;
        gltf.scene.position.x = Math.sin(x) * 125;
        gltf.scene.position.y = Math.cos(y) * 125;
        gltf.scene.position.z = Math.cos(z) * 125;
        x -= 0.001;
        y -= 0.001;
        z += 0.001;
      }
      rotate();
    }
  );

  //HB stan Asset
  const stanLoader = new GLTFLoader();
  stanLoader.setDRACOLoader(dracoLoader);
  stanLoader.load("brands/hamburger-stand-no-backboard.gltf", function (gltf) {
    // gltf.scene.rotation.y = 3 * (Math.PI / 2);
    gltf.scene.position.x = -140;
    gltf.scene.position.y = -20;
    gltf.scene.scale.set(15, 15, 15);
    scene.add(gltf.scene);
    let x = 2.09;
    let y = 2.09;
    let z = 0;
    function rotate() {
      requestAnimationFrame(rotate);
      gltf.scene.rotation.y -= 0.00075;
      gltf.scene.rotation.x -= 0.00075;
      gltf.scene.rotation.z += 0.00075;
      gltf.scene.position.x = Math.sin(x) * 125;
      gltf.scene.position.y = Math.cos(y) * 125;
      gltf.scene.position.z = Math.cos(z) * 125;
      x -= 0.001;
      y -= 0.001;
      z += 0.001;
    }
    rotate();
  });

  // //ND chinese Asset
  // const ndChinese = new GLTFLoader();
  // ndChinese.setDRACOLoader(dracoLoader);
  // ndChinese.load("brands/nice-day-chinese-test.gltf", function (gltf) {
  //   // gltf.scene.rotation.y = 3 * (Math.PI / 2);
  //   gltf.scene.position.x = 0;
  //   gltf.scene.position.y = 135;
  //   gltf.scene.scale.set(28, 28, 28);
  //   scene.add(gltf.scene);
  //   let x = 0;
  //   let y = 0;
  //   function rotate() {
  //     requestAnimationFrame(rotate);
  //     // gltf.scene.rotation.y -= 0.005;
  //     gltf.scene.position.x = Math.sin(x) * 150;
  //     gltf.scene.position.y = Math.cos(y) * 150;
  //     x -= 0.0025;
  //     y -= 0.0025;
  //   }
  //   rotate();
  // });

  // //Budlong Asset

  // const budLoader = new GLTFLoader();
  // budLoader.setDRACOLoader(dracoLoader);
  // budLoader.load(
  //   // resource URL
  //   "brands/budlong-compressed.glb",
  //   // called when the resource is loaded
  //   function (gltf) {
  //     gltf.scene.position.x = 115;
  //     gltf.scene.position.y = -135;
  //     gltf.scene.scale.set(15, 15, 15);
  //     scene.add(gltf.scene);
  //     let x = 360;
  //     let y = 360;
  //     function rotate() {
  //       requestAnimationFrame(rotate);
  //       // gltf.scene.rotation.y -= 0.005;
  //       gltf.scene.position.x = Math.sin(x) * 150;
  //       gltf.scene.position.y = Math.cos(y) * 150;
  //       x -= 0.0025;
  //       y -= 0.0025;
  //     }
  //     rotate();
  //   }
  // );

  // //HB stan Asset
  // const stanLoader = new GLTFLoader();
  // stanLoader.setDRACOLoader(dracoLoader);
  // stanLoader.load("brands/hamburger-stand-no-backboard.gltf", function (gltf) {
  //   // gltf.scene.rotation.y = 3 * (Math.PI / 2);
  //   gltf.scene.position.x = -140;
  //   gltf.scene.position.y = -20;
  //   gltf.scene.scale.set(22, 22, 22);
  //   scene.add(gltf.scene);
  //   let x = -360;
  //   let y = -360;
  //   function rotate() {
  //     requestAnimationFrame(rotate);
  //     // gltf.scene.rotation.y -= 0.005;
  //     gltf.scene.position.x = Math.sin(x) * 150;
  //     gltf.scene.position.y = Math.cos(y) * 150;
  //     x -= 0.0025;
  //     y -= 0.0025;
  //   }
  //   rotate();
  // });

  // Galaxy Particle Blast Asset
  const particleAsset = new GLTFLoader();
  particleAsset.setDRACOLoader(dracoLoader);
  particleAsset.load("/bg-assets/blasted-galaxy-3.gltf", function (gltf) {
    gltf.scene.scale.set(13, 13, 13);
    scene.add(gltf.scene);
  });

  const protectedArea = 150;
  const worldScaleDispersionFactor = 1000;
  const assetLoopCount = 35;

  //Logo Asset

  for (let i = 0; i < assetLoopCount; i++) {
    new GLTFLoader().load("crypto-foodies/cf-logo.glb", function (gltf) {
      randomPlacementAssetGenerator(gltf, worldScaleDispersionFactor, 6);
    });
  }

  //Burger Asset
  for (let i = 0; i < assetLoopCount; i++) {
    new GLTFLoader().load("bg-assets/burger.glb", function (gltf) {
      randomPlacementAssetGenerator(gltf, worldScaleDispersionFactor, 6);
    });
  }

  new GLTFLoader().load("bg-assets/burger.glb", function (gltf) {
    gltf.scene.scale.set(100, 100, 100);
    gltf.scene.position.x = 450;
    gltf.scene.position.y = 125;
    gltf.scene.position.z = -250;
    gltf.scene.rotation.y = Math.PI / 1.5;
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
    gltf.scene.position.x = -480;
    gltf.scene.position.y = -280;
    gltf.scene.position.z = 0;
    gltf.scene.rotation.y = Math.PI / 2;
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
    gltf.scene.position.x = 400;
    gltf.scene.position.z = 420;
    gltf.scene.rotation.y = -(Math.PI / 1.5);
    scene.add(gltf.scene);
  });

  //milkshake Asset
  for (let i = 0; i < assetLoopCount; i++) {
    new GLTFLoader().load("bg-assets/milkshake.glb", function (gltf) {
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

  /**
   * Particles
   */
  // Geometry
  const particlesGeometry = new THREE.BufferGeometry();
  const count = 1000;
  const positions = new Float32Array(count * 3);

  for (
    let i = 0;
    i < count * 3;
    i++ // Multiply by 3 for same reason
  ) {
    positions[i] = (Math.random() - 0.5) * 500;
  }

  // Material
  const particlesMaterial = new THREE.PointsMaterial({
    size: 2,
    sizeAttenuation: true,
    color: "white",
    transparent: true,
    opacity: 0.35,
  });
  // particlesMaterial.vertexColors = true;
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  scene.add(particles);

  // // alt
  // // Geometry
  // const particlesGeometryAlt = new THREE.BufferGeometry();
  // const countAlt = 1000;
  // const positionsAlt = new Float32Array(count * 3);

  // for (
  //   let i = 0;
  //   i < count * 3;
  //   i++ // Multiply by 3 for same reason
  // ) {
  //   positionsAlt[i] = (Math.random() - 0.5) * 500;
  // }

  // // Material
  // const particlesMaterialAlt = new THREE.PointsMaterial({
  //   size: 2,
  //   sizeAttenuation: true,
  //   color: "#96178a",
  //   transparent: true,
  //   opacity: 0.75,
  // });
  // // particlesMaterial.vertexColors = true;
  // const particlesAlt = new THREE.Points(
  //   particlesGeometryAlt,
  //   particlesMaterialAlt
  // );
  // particlesGeometryAlt.setAttribute(
  //   "position",
  //   new THREE.BufferAttribute(positionsAlt, 3)
  // );
  // scene.add(particlesAlt);

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

  // // building lighting
  const light = new THREE.PointLight("hsl(10,100%,50%)", 27, 100);
  light.position.set(0, -25, -50);
  scene.add(light);

  // // stan lighting
  // const light1 = new THREE.PointLight("hsl(100,100%,50%)", 27, 100);
  // light1.position.set(6, 135, -50);
  // scene.add(light1);
  //------------- renderer

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.domElement.id = "mainCanvas";

  stats = new Stats();
  document.body.appendChild(stats.dom);

  window.addEventListener("resize", onWindowResize);

  createControls(perspectiveCamera);
}

function createControls(camera) {
  controls = new TrackballControls(camera, renderer.domElement);

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 0.8;
  controls.panSpeed = 0;
  // controls.maxDistance = 800;
  // controls.minDistance = 200;
  controls.maxDistance = 1000;
  controls.minDistance = 250;

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
  if (requestAltLookAt) {
    camera.lookAt(new THREE.Vector3(altCamX, altCamY, altCamZ));
  } else {
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }
  renderer.render(scene, camera);
}

let angle = 0;
let radius = 600;

// Animate
let rotateWorldCount = 0;
let moveFactor = Math.random() * 4;

function rotateWorld() {
  console.log(rotateWorldCount);

  if (rotateWorldCount < 4000) {
    perspectiveCamera.position.x += 0.1 * moveFactor;
    perspectiveCamera.position.z += 0.1 * moveFactor;
    perspectiveCamera.position.y += 0.1 * moveFactor;
  } else if (rotateWorldCount < 8000) {
    perspectiveCamera.position.x -= 0.1 * moveFactor;
    perspectiveCamera.position.z -= 0.1 * moveFactor;
    perspectiveCamera.position.y -= 0.1 * moveFactor;
  } else if (rotateWorldCount < 12000) {
    perspectiveCamera.position.x -= 0.1 * moveFactor;
    perspectiveCamera.position.z += 0.1 * moveFactor;
    perspectiveCamera.position.y += 0.1 * moveFactor;
  } else if (rotateWorldCount < 16000) {
    perspectiveCamera.position.x += 0.1 * moveFactor;
    perspectiveCamera.position.z += 0.1 * moveFactor;
    perspectiveCamera.position.y -= 0.1 * moveFactor;
  } else if (rotateWorldCount < 17000) {
    rotateWorldCount = 0;
    moveFactor = Math.random() * 4;
  }
  rotateWorldCount++;
  controls.rotateSpeed = 1;
  controls.zoomSpeed = 1;
  controls.maxDistance = 750;
}

function introZoomIn() {
  if (perspectiveCamera.position.z > 350) {
    perspectiveCamera.position.z -= 0.75;
    perspectiveCamera.position.x += 0.25;
    perspectiveCamera.position.y += 0.25;
    controls.rotateSpeed = 1;
    controls.zoomSpeed = 1;
    controls.maxDistance = 1000;
  } else {
    requestRotate = true;
    requestIntroZoomIn = false;
  }
}

function slowRotate() {
  perspectiveCamera.position.x += 0.1;
  perspectiveCamera.position.z += 0.1;
  perspectiveCamera.position.y += 0.05;
}

function animate() {
  if (requestRotate) {
    rotateWorld();
  }
  if (requestIntroZoomIn) {
    introZoomIn();
  }

  if (requestSlowRotate) {
    slowRotate();
  }
  requestAnimationFrame(animate);
  controls.update();
  stats.update();
  render();
}

animate();

//---------------------------------------------------------------

import jQuery from "jquery";

jQuery(function () {
  // ---------------------------  functions  --------------------------- //
  function pageFadeIn() {
    jQuery("body").fadeTo(1500, 1, function () {});
  }

  function showHeader() {
    jQuery("header").addClass("btn-no-click");
    jQuery("header").addClass("block");
    jQuery("header").fadeTo(1000, 1, function () {
      jQuery("header").removeClass("btn-no-click");
    });
  }
  function hideHeader() {
    jQuery("header").addClass("btn-no-click");
    jQuery("header").fadeTo(1000, 0, function () {
      jQuery("header").removeClass("block");
      jQuery("header").addClass("hidden");
    });
  }
  function showContentPage(page) {
    altLookAt();
    requestRotate = false;
    requestSlowRotate = true;
    jQuery("header").addClass("btn-no-click");
    jQuery("header").fadeTo(1000, 0, function () {
      jQuery("header").removeClass("block");
      jQuery("header").addClass("hidden");
      jQuery("body").addClass("body-100vh");
      jQuery(page).addClass("btn-no-click");
      jQuery(page).removeClass("hidden");
      jQuery(page).addClass("block");
      jQuery(page).fadeTo(1000, 1, function () {
        jQuery(page).removeClass("btn-no-click");
      });
    });
  }
  function hideContentPage(page) {
    altLookAt();
    requestSlowRotate = false;
    requestRotate = true;
    jQuery(page).addClass("btn-no-click");
    jQuery(page).fadeTo(1000, 0, function () {
      jQuery(page).removeClass("block");
      jQuery(page).addClass("hidden");
      jQuery("body").removeClass("body-100vh");
      jQuery("header").addClass("btn-no-click");
      jQuery("header").removeClass("hidden");
      jQuery("header").addClass("block");
      jQuery("header").fadeTo(1000, 1, function () {
        jQuery("header").removeClass("btn-no-click");
      });
    });
  }

  function exploreWorld() {
    controls.rotateSpeed = 3;
    controls.zoomSpeed = 0.8;
    controls.maxDistance = 1500;
    requestRotate = false;
    requestSlowRotate = true;
    jQuery("header").addClass("btn-no-click");
    jQuery("header").fadeTo(1000, 0, function () {
      jQuery("header").removeClass("block");
      jQuery("header").addClass("hidden");
      jQuery("#endExplore").addClass("btn-no-click");
      jQuery("#endExplore").removeClass("hidden");
      jQuery("#endExplore").addClass("block");
      jQuery("#endExplore").fadeTo(1000, 1, function () {
        jQuery("#endExplore").removeClass("btn-no-click");
      });
    });
  }

  function endExploreWorld() {
    requestSlowRotate = false;
    requestRotate = true;
    controls.maxDistance = 1000;
    jQuery("#endExplore").addClass("btn-no-click");
    jQuery("#endExplore").fadeTo(1000, 0, function () {
      jQuery("#endExplore").removeClass("block");
      jQuery("#endExplore").addClass("hidden");
      jQuery("header").addClass("btn-no-click");
      jQuery("header").removeClass("hidden");
      jQuery("header").addClass("block");
      jQuery("header").fadeTo(1000, 1, function () {
        jQuery("header").removeClass("btn-no-click");
      });
    });
  }

  function openHeaderMenu() {
    // FIXME:Change the value of fixed below back to static, this was only for testing
    jQuery("header").css("position", "fixed");
    jQuery("#header h2").removeClass("hidden-mobile");
    jQuery("#header nav").addClass("block-mobile");
  }

  function closeHeaderMenu() {
    jQuery("header").css("position", "fixed");
    jQuery("#header h2").addClass("hidden-mobile");
    jQuery("#header nav").removeClass("block-mobile");
  }

  function altLookAt() {
    altCamX = Math.random() * 300;
    altCamY = Math.random() * 300;
    altCamZ = Math.random() * 300;
    requestAltLookAt = !requestAltLookAt;
  }

  function introScene() {
    pageFadeIn();
    requestIntroZoomIn = true;
    requestRotate = true;
    jQuery("#introSceneText").removeClass("hidden");
    jQuery("#introSceneText").addClass("flex");
    jQuery("#introSceneText")
      .delay(2000)
      .fadeTo(2500, 1, function () {
        jQuery("#introSceneText")
          .delay(2500)
          .fadeTo(2500, 0, function () {
            jQuery("#introSceneText").remove();
            setTimeout(showHeader, 0);
          });
      });
  }

  function inputDetect() {
    jQuery(document).on("mousedown", function () {
      down = true;
    });
    jQuery(document).on("mouseup", function () {
      down = false;
    });
  }

  // Enter Screen Loader

  THREE.DefaultLoadingManager.onStart = function (
    url,
    itemsLoaded,
    itemsTotal
  ) {
    console.log(
      "Started loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
  };

  THREE.DefaultLoadingManager.onLoad = function () {
    console.log("Loading Complete!");
    jQuery("body").css("opacity", "0");
    jQuery("#enterScreen").remove();
    introScene();
  };

  THREE.DefaultLoadingManager.onProgress = function (
    url,
    itemsLoaded,
    itemsTotal
  ) {
    console.log(
      "Loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
  };

  THREE.DefaultLoadingManager.onError = function (url) {
    console.log("There was an error loading " + url);
  };

  // ---------------------------  Called functions  --------------------------- //
  // inputDetect();
  // pageSFadeIn();
  // requestIntroZoomIn = true;
  // showHeader();

  jQuery("#aboutLink").on("click", function () {
    showContentPage("#about");
  });
  jQuery("#aboutHomeBtn").on("click", function () {
    hideContentPage("#about");
  });
  jQuery("#brandsLink").on("click", function () {
    showContentPage("#brands");
  });
  jQuery("#brandsHomeBtn").on("click", function () {
    hideContentPage("#brands");
  });
  jQuery("#connectLink").on("click", function () {
    showContentPage("#connect");
  });
  jQuery("#connectHomeBtn").on("click", function () {
    hideContentPage("#connect");
  });
  jQuery("#explore").on("click", function () {
    exploreWorld();
  });
  jQuery("#endExplore").on("click", function () {
    endExploreWorld();
  });
  jQuery("#audioBtn").on("click", function () {
    document.getElementById("audio").play();
    document.documentElement.requestFullscreen();
  });
  let headerOpen = false;
  jQuery("#headerBtn").on("click", function () {
    console.log(headerOpen);
    if (headerOpen == false) {
      openHeaderMenu();
      headerOpen = true;
      console.log(headerOpen);
    } else {
      closeHeaderMenu();
      headerOpen = false;
      console.log(headerOpen);
    }
  });
});
