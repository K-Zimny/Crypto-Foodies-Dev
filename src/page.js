// import jQuery from "jquery";

// jQuery(function () {
//   // ---------------------------  functions  --------------------------- //
//   function pageFadeIn() {
//     jQuery("body").fadeTo(10000, 1);
//   }
//   function showHeader() {
//     jQuery("header").addClass("btn-no-click");
//     jQuery("header").addClass("block");
//     jQuery("header").fadeTo(1000, 1, function () {
//       jQuery("header").removeClass("btn-no-click");
//     });
//   }
//   function hideHeader() {
//     jQuery("header").addClass("btn-no-click");
//     jQuery("header").fadeTo(1000, 0, function () {
//       jQuery("header").removeClass("block");
//       jQuery("header").addClass("hidden");
//     });
//   }
//   function showContentPage(page) {
//     jQuery("header").addClass("btn-no-click");
//     jQuery("header").fadeTo(1000, 0, function () {
//       jQuery("header").removeClass("block");
//       jQuery("header").addClass("hidden");
//       jQuery(page).addClass("btn-no-click");
//       jQuery(page).removeClass("hidden");
//       jQuery(page).addClass("block");
//       jQuery(page).fadeTo(1000, 1, function () {
//         jQuery(page).removeClass("btn-no-click");
//       });
//     });
//   }
//   function hideContentPage(page) {
//     jQuery(page).addClass("btn-no-click");
//     jQuery(page).fadeTo(1000, 0, function () {
//       jQuery(page).removeClass("block");
//       jQuery(page).addClass("hidden");
//       jQuery("header").addClass("btn-no-click");
//       jQuery("header").removeClass("hidden");
//       jQuery("header").addClass("block");
//       jQuery("header").fadeTo(1000, 1, function () {
//         jQuery("header").removeClass("btn-no-click");
//       });
//     });
//   }

//   function exploreWorld() {
//     jQuery("header").addClass("btn-no-click");
//     jQuery("header").fadeTo(1000, 0, function () {
//       jQuery("header").removeClass("block");
//       jQuery("header").addClass("hidden");
//       jQuery("#endExplore").addClass("btn-no-click");
//       jQuery("#endExplore").removeClass("hidden");
//       jQuery("#endExplore").addClass("block");
//       jQuery("#endExplore").fadeTo(1000, 1, function () {
//         jQuery("#endExplore").removeClass("btn-no-click");
//       });
//     });
//   }

//   function endExploreWorld() {
//     jQuery("#endExplore").addClass("btn-no-click");
//     jQuery("#endExplore").fadeTo(1000, 0, function () {
//       jQuery("#endExplore").removeClass("block");
//       jQuery("#endExplore").addClass("hidden");
//       jQuery("header").addClass("btn-no-click");
//       jQuery("header").removeClass("hidden");
//       jQuery("header").addClass("block");
//       jQuery("header").fadeTo(1000, 1, function () {
//         jQuery("header").removeClass("btn-no-click");
//       });
//     });
//   }

//   // ---------------------------  Called functions  --------------------------- //

//   showHeader();
//   pageFadeIn();
//   //   hideHeader();
//   //   showContentPage("#about");

//   jQuery("#aboutLink").on("click", function () {
//     showContentPage("#about");
//   });
//   jQuery("#aboutHomeBtn").on("click", function () {
//     hideContentPage("#about");
//   });
//   jQuery("#whyLink").on("click", function () {
//     showContentPage("#why");
//   });
//   jQuery("#whyHomeBtn").on("click", function () {
//     hideContentPage("#why");
//   });
//   jQuery("#howLink").on("click", function () {
//     showContentPage("#how");
//   });
//   jQuery("#explore").on("click", function () {
//     exploreWorld();
//     function rotate() {
//       perspectiveCamera.position.x += Math.cos(1 * Math.PI * 2) / 4;
//       perspectiveCamera.position.y += Math.cos(1 * Math.PI * 2) / 4;
//       perspectiveCamera.position.z += Math.cos(1 * Math.PI * 2) / 14;
//       requestAnimationFrame(rotate);
//       controls.update();
//       stats.update();
//       render();
//     }
//     rotate();
//   });
//   jQuery("#endExplore").on("click", function () {
//     endExploreWorld();
//   });
// });
