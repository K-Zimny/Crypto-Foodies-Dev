import "./general.css";
import "./content.css";
import "./enter-screen.css";
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

  perspectiveCamera = new THREE.PerspectiveCamera(18.5, aspect, 1, 2000);
  perspectiveCamera.position.z = 1250;
  perspectiveCamera.position.x = -550;
  perspectiveCamera.position.y = 1250;

  //------------- world

  scene = new THREE.Scene();
  scene.background = new THREE.Color("#1f1f1f");
  scene.fog = new THREE.FogExp2("#1f1f1f", 0.0005);

  // const axesHelper = new THREE.AxesHelper(105);
  // scene.add(axesHelper);

  // pano scene

  const geometry = new THREE.SphereGeometry(400, 60, 40);
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale(-1, 1, 1);

  const texture = new THREE.TextureLoader().load("imgs/space-bg-1.webp");
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.repeat.set(4, 4);

  const material = new THREE.MeshBasicMaterial({ map: texture });
  material.transparent = true;
  material.opacity = 0.75;

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  //------------- loaders

  // DRACO Loader

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("draco/");

  // CF Center Building Logo Above building Asset
  const TextureLoaderCenter = new GLTFLoader();
  TextureLoaderCenter.setDRACOLoader(dracoLoader);
  TextureLoaderCenter.load(
    "crypto-foodies/buildingmodel-color-correction.gltf",
    function (gltf) {
      gltf.scene.position.y = -25;
      // gltf.scene.position.x = 12.5;
      gltf.scene.rotation.y = -(Math.PI / 2);
      // gltf.scene.rotation.z = 0.1;
      gltf.scene.rotation.x = -0.5;
      // gltf.scene.scale.set(3, 3, 3);
      gltf.scene.scale.set(1.25, 1.25, 1.25);
      const mediaQuery = window.matchMedia("(max-width: 1199px)");
      if (mediaQuery.matches) {
        gltf.scene.scale.set(0.6, 0.6, 0.6);
        gltf.scene.position.y = -10;
        gltf.scene.position.x = 0;
      }
      scene.add(gltf.scene);
      function rotate() {
        requestAnimationFrame(rotate);
        // gltf.scene.rotation.y -= 0.0015;
        // gltf.scene.rotation.z += 0.00015;
        // gltf.scene.rotation.x += 0.00015;
      }
      // rotate();
    }
  );

  //Tejis asset
  const tejiLoader = new GLTFLoader();
  tejiLoader.setDRACOLoader(dracoLoader);
  tejiLoader.load("locations/tegi-planet-test-5.gltf", function (gltf) {
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
      gltf.scene.rotation.y += 0.00075;
      gltf.scene.rotation.x -= 0.00075;
      gltf.scene.rotation.z -= 0.00075;
      gltf.scene.position.x = Math.sin(x) * 150;
      gltf.scene.position.y = Math.cos(y) * 150;
      gltf.scene.position.z = Math.cos(z) * 150;
      x += 0.0015;
      y += 0.0015;
      z += 0.0015;
    }
    rotate();
  });

  //ND chinese Asset
  const ndChinese = new GLTFLoader();
  ndChinese.setDRACOLoader(dracoLoader);
  ndChinese.load("brands/nice-day-chinese-test.gltf", function (gltf) {
    // gltf.scene.rotation.y = 3 * (Math.PI / 2);
    gltf.scene.position.x = 0;
    gltf.scene.position.y = 135;
    gltf.scene.rotation.x = 0;
    gltf.scene.scale.set(25, 25, 25);
    scene.add(gltf.scene);
    let x = -1;
    let y = 0;
    let z = 1;
    function rotate() {
      requestAnimationFrame(rotate);
      gltf.scene.rotation.y += 0.0005;
      gltf.scene.rotation.x -= 0.0005;
      gltf.scene.rotation.z -= 0.0005;
      gltf.scene.position.x = Math.sin(x) * 120;
      gltf.scene.position.y = Math.cos(y) * 120;
      gltf.scene.position.z = Math.cos(z) * 120;
      x -= 0.0005;
      y -= 0.0005;
      z += 0.0005;
    }
    rotate();
  });

  //taquerillo Asset

  const budLoader = new GLTFLoader();
  budLoader.setDRACOLoader(dracoLoader);
  budLoader.load(
    // resource URL
    "brands/taquerillo.gltf",
    // called when the resource is loaded
    function (gltf) {
      gltf.scene.position.x = 115;
      gltf.scene.position.y = -135;
      gltf.scene.scale.set(5, 5, 5);
      scene.add(gltf.scene);
      let x = -0.59;
      let y = -3.09;
      let z = -10;
      function rotate() {
        requestAnimationFrame(rotate);
        gltf.scene.rotation.y += 0.0005;
        gltf.scene.rotation.x += 0.0005;
        gltf.scene.rotation.z -= 0.0005;
        gltf.scene.position.x = Math.sin(x) * 120;
        gltf.scene.position.y = Math.cos(y) * 120;
        gltf.scene.position.z = Math.cos(z) * 120;
        x -= 0.0005;
        y -= 0.0005;
        z += 0.0005;
      }
      rotate();
    }
  );

  //kalamata Asset
  const stanLoader = new GLTFLoader();
  stanLoader.setDRACOLoader(dracoLoader);
  stanLoader.load("brands/kalamata.gltf", function (gltf) {
    // gltf.scene.rotation.y = 3 * (Math.PI / 2);
    gltf.scene.position.x = -140;
    gltf.scene.position.y = -20;
    gltf.scene.rotation.y = 0;
    gltf.scene.scale.set(5, 5, 5);
    scene.add(gltf.scene);
    let x = 13.09;
    let y = -1.59;
    let z = 0;
    function rotate() {
      requestAnimationFrame(rotate);
      gltf.scene.rotation.y += 0.0004;
      gltf.scene.rotation.x += 0.0004;
      gltf.scene.rotation.z += 0.0004;
      gltf.scene.position.x = Math.sin(x) * 120;
      gltf.scene.position.y = Math.cos(y) * 120;
      gltf.scene.position.z = Math.cos(z) * 120;
      x -= 0.0005;
      y -= 0.0005;
      z += 0.0005;
    }
    rotate();
  });

  //proper-diner Asset
  const properLoader = new GLTFLoader();
  properLoader.setDRACOLoader(dracoLoader);
  properLoader.load("brands/proper-diner.gltf", function (gltf) {
    // gltf.scene.rotation.y = 3 * (Math.PI / 2);
    gltf.scene.position.x = -140;
    gltf.scene.position.y = -20;
    gltf.scene.rotation.y = -6;
    gltf.scene.scale.set(5, 5, 5);
    scene.add(gltf.scene);
    let x = 1.99;
    let y = -1.59;
    let z = -10;
    function rotate() {
      requestAnimationFrame(rotate);
      gltf.scene.rotation.y -= 0.0005;
      gltf.scene.rotation.x -= 0.0005;
      gltf.scene.rotation.z += 0.0005;
      gltf.scene.position.x = Math.sin(x) * 90;
      gltf.scene.position.y = Math.cos(y) * 90;
      gltf.scene.position.z = Math.cos(z) * 120;
      x -= 0.0005;
      y -= 0.0005;
      z += 0.0005;
    }
    rotate();
  });

  //aaandiamo Asset
  const aaandiamoLoader = new GLTFLoader();
  aaandiamoLoader.setDRACOLoader(dracoLoader);
  aaandiamoLoader.load("brands/aaandiamo.gltf", function (gltf) {
    // gltf.scene.rotation.y = 3 * (Math.PI / 2);
    gltf.scene.position.x = -140;
    gltf.scene.position.y = -20;
    gltf.scene.rotation.y = -6;
    gltf.scene.rotation.x = 0;
    gltf.scene.scale.set(5, 5, 5);
    scene.add(gltf.scene);
    let x = -1.29;
    let y = -2.09;
    let z = 1;
    function rotate() {
      requestAnimationFrame(rotate);
      gltf.scene.rotation.y += 0.0005;
      gltf.scene.rotation.x -= 0.0005;
      gltf.scene.rotation.z += 0.0005;
      gltf.scene.position.x = Math.sin(x) * 90;
      gltf.scene.position.y = Math.cos(y) * 90;
      gltf.scene.position.z = Math.cos(z) * 90;
      x -= 0.0005;
      y -= 0.0005;
      z += 0.0005;
    }
    rotate();
  });

  const protectedArea = 100;
  const worldScaleDispersionFactor = 1000;
  const assetLoopCount = 50;

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
  const count = 500;
  const positions = new Float32Array(count * 3);

  for (
    let i = 0;
    i < count * 3;
    i++ // Multiply by 3 for same reason
  ) {
    positions[i] = (Math.random() - 0.5) * 400;
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

  //-------------  lights

  const dirLight1 = new THREE.DirectionalLight(0xffffff);
  dirLight1.position.set(1, 1, 1);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x002288);
  dirLight2.position.set(-1, -1, -1);
  scene.add(dirLight2);

  const dirLight3 = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight3.position.set(1, 1, 100);
  scene.add(dirLight3);

  // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  // scene.add(directionalLight);

  // const ambientLight = new THREE.AmbientLight(0x222222);
  // scene.add(ambientLight);

  // // building lighting
  // const light = new THREE.PointLight("hsl(4,99%,66%)", 7, 40);
  // light.position.set(0, 15, 20);
  // scene.add(light);

  //------------- renderer

  renderer = new THREE.WebGLRenderer({
    antialias: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.domElement.id = "mainCanvas";

  // stats = new Stats();
  // document.body.appendChild(stats.dom);

  window.addEventListener("resize", onWindowResize);

  createControls(perspectiveCamera);
}

function createControls(camera) {
  controls = new TrackballControls(camera, renderer.domElement);

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 0.05;
  controls.panSpeed = 0;
  // controls.maxDistance = 500;
  controls.minDistance = 100;
  controls.dynamicDampingFactor = 0.025;

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
    // perspectiveCamera.position.z = 1150;
    perspectiveCamera.position.z = 751.5;
    perspectiveCamera.position.x = 0;
    perspectiveCamera.position.y = 0;
    // camera.lookAt(new THREE.Vector3(0, 0, 750));
  } else {
    // Create a media condition that targets viewports at least 768px wide
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    // Check if the media query is true
    if (mediaQuery.matches) {
      // Then trigger an alert
      // camera.lookAt(new THREE.Vector3(-20, 25, 0));
    } else {
      // camera.lookAt(new THREE.Vector3(0, 35, 50));
      // camera.lookAt(new THREE.Vector3(-20, 10, 0));
    }
  }
  renderer.render(scene, camera);
}

let angle = 0;
let radius = 600;

// Animate
let rotateWorldCount = 0;
let moveFactor = 4;

function rotateWorld() {
  const elapsedTime = clock.getElapsedTime();
  // console.log(rotateWorldCount);
  // perspectiveCamera.position.x += 0.051 * moveFactor;
  // perspectiveCamera.position.z += 0.051 * moveFactor;
  // perspectiveCamera.position.y += 0.05 * moveFactor;
  // perspectiveCamera.position.x += 0.051 * moveFactor;
  // perspectiveCamera.position.z += 0.051 * moveFactor;

  // perspectiveCamera.position.x += 0.015;

  // if (perspectiveCamera.position.x < 200) {
  //   perspectiveCamera.position.x += 0.001;
  // }
  // perspectiveCamera.position.z = Math.sin(Math.PI * (elapsedTime / 4)) * 100;

  // perspectiveCamera.position.y = Math.cos(Math.PI * (elapsedTime / 4)) * 100;
  if (rotateWorldCount < 12000) {
    perspectiveCamera.position.x += 0.015;
  } else if (rotateWorldCount < 12200) {
    perspectiveCamera.position.x -= 1;
  }
  //  else if (rotateWorldCount < 4000) {
  //   perspectiveCamera.position.x -= 0.025 * moveFactor;
  //   perspectiveCamera.position.z -= 0.025 * moveFactor;
  //   perspectiveCamera.position.y += 0.05 * moveFactor;
  // } else if (rotateWorldCount < 4750) {
  //   perspectiveCamera.position.x += 0.05 * moveFactor;
  //   perspectiveCamera.position.z -= 0.51 * moveFactor;
  //   perspectiveCamera.position.y -= 0.25 * moveFactor;
  // } else if (rotateWorldCount < 6000) {
  //   perspectiveCamera.position.x -= 0.05 * moveFactor;
  //   perspectiveCamera.position.z += 0.025 * moveFactor;
  //   perspectiveCamera.position.y += 0.05 * moveFactor;
  // }
  // // else if (rotateWorldCount < 8000) {
  // //   perspectiveCamera.position.x += 0.05 * moveFactor;
  // //   perspectiveCamera.position.z += 0.05 * moveFactor;
  // //   perspectiveCamera.position.y -= 0.05 * moveFactor;
  // // }
  else if (rotateWorldCount < 12201) {
    rotateWorldCount = 0;
    // moveFactor = 4;
  }
  rotateWorldCount++;
  controls.rotateSpeed = 0.35;
  controls.zoomSpeed = 0.05;
  // controls.maxDistance = 500;
}

// clock
const clock = new THREE.Clock();

function introZoomIn() {
  if (perspectiveCamera.position.z > 250) {
    const elapsedTime = clock.getElapsedTime();
    // console.log(elapsedTime);
    // perspectiveCamera.position.z -= 1;

    perspectiveCamera.position.z -= elapsedTime / 6;
    perspectiveCamera.position.x += elapsedTime / 9;
    perspectiveCamera.position.y -= elapsedTime / 5.5;
    // perspectiveCamera.position.z += 0.45;
    // perspectiveCamera.position.x += 0.05;
    // perspectiveCamera.position.y += 0.05;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 0.05;
    controls.maxDistance = 1200;
    // controls.minDistance = 0;
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
  // stats.update();
  render();
}

animate();

//---------------------------------------------------------------

import jQuery from "jquery";

jQuery(function () {
  // ---------------------------  functions  --------------------------- //
  function pageFadeIn() {
    jQuery("body").fadeTo(1, 1, function () {});
    jQuery("canvas").fadeTo(4000, 1, function () {});
  }

  function showHeader() {
    jQuery("header").addClass("btn-no-click");
    jQuery("header").addClass("block");
    jQuery("header").fadeTo(1000, 1, function () {
      jQuery("header").removeClass("btn-no-click");
    });
    jQuery("#pickupDelivery").addClass("btn-no-click");
    jQuery("#pickupDelivery").addClass("block");
    jQuery("#pickupDelivery").fadeTo(1000, 1, function () {
      jQuery("#pickupDelivery").removeClass("btn-no-click");
    });
    jQuery("#audioIcon").addClass("btn-no-click");
    jQuery("#audioIcon").addClass("block");
    jQuery("#audioIcon").fadeTo(1000, 1, function () {
      jQuery("#audioIcon").removeClass("btn-no-click");
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

  function openHeaderMenu() {
    // FIXME:Change the value of fixed below back to static, this was only for testing
    // jQuery("header").css("position", "fixed");
    jQuery("header").addClass("menu-open");
    jQuery("#header h2").removeClass("hidden-mobile");
    jQuery("#header nav").addClass("block-mobile");
    jQuery(".marquee").addClass("large");
    jQuery("#headerBtn").addClass("arrow-flipped");
  }

  function closeHeaderMenu() {
    // jQuery("header").css("position", "fixed");
    jQuery("header").removeClass("menu-open");
    jQuery("#header h2").addClass("hidden-mobile");
    jQuery("#header nav").removeClass("block-mobile");
    jQuery(".marquee").removeClass("large");
    jQuery("#headerBtn").removeClass("arrow-flipped");
  }

  function altLookAt() {
    altCamX = Math.random() * 200;
    altCamY = Math.random() * 200;
    altCamZ = Math.random() * 200;
    requestAltLookAt = !requestAltLookAt;
  }

  function introScene() {
    pageFadeIn();
    requestIntroZoomIn = true;
    requestRotate = true;
    jQuery("#introSceneText").removeClass("hidden");
    jQuery("#introSceneText").addClass("flex");
    jQuery("#introSceneText")
      .delay(1500)
      .fadeTo(3000, 1, function () {
        jQuery("#introSceneText")
          .delay(3000)
          .fadeTo(1500, 0, function () {
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
    // console.log(
    //   "Started loading file: " +
    //     url +
    //     ".\nLoaded " +
    //     itemsLoaded +
    //     " of " +
    //     itemsTotal +
    //     " files."
    // );
  };

  THREE.DefaultLoadingManager.onLoad = function () {
    console.log("Loading Complete!");
    // jQuery("body").css("opacity", "0");
    // jQuery("#enterScreen").remove();
    // introScene();
    jQuery("#loadingThreeJsEnter").css("display", "block");
    jQuery("#loadingRing").css("display", "none");
    jQuery("#loadingText").css("display", "none");
    jQuery("#loadingThreeJsStatus").css("display", "none");
  };

  jQuery("#loadingThreeJsEnter").on("click", function () {
    jQuery("body").css("opacity", "0");
    jQuery("#enterScreen").remove();
    introScene();
  });

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
    jQuery("#loadingThreeJsStatus p").text(
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
  jQuery("#audioIcon").on("click", function () {
    document.getElementById("audio").play();
    document.documentElement.requestFullscreen();
  });
  let headerOpen = false;
  jQuery("#headerBtn").on("click", function () {
    // console.log(headerOpen);
    if (headerOpen == false) {
      openHeaderMenu();
      headerOpen = true;
      // console.log(headerOpen);
    } else {
      closeHeaderMenu();
      headerOpen = false;
      // console.log(headerOpen);
    }
  });
  const mediaQuery = window.matchMedia("(max-width: 767px)");
  if (mediaQuery.matches) {
    jQuery(".marquee").insertAfter("#hrHeaderTag");
  }
});
