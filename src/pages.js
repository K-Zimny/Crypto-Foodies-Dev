import "./general.css";
import "./pages.css";
console.log("test");

//Footer Copyright
document.getElementById("copyrightFooterYear").innerHTML =
  new Date().getFullYear();

import jQuery from "jquery";

jQuery(function () {
  // About page

  jQuery("#accessibility button").on("click", function () {
    console.log("acces btn");
    if (jQuery("#aboutPageVideo").hasClass("hidden")) {
      jQuery("#aboutPageVideo").removeClass("hidden");
      jQuery("#aboutPageVideo").addClass("fixed");
      jQuery("#aboutBlock h1").removeClass("accessibility");
      jQuery("#roadmapBlock p").removeClass("accessibility");
      jQuery("#aboutPage").removeClass("accessibility");
    } else {
      jQuery("#aboutPageVideo").removeClass("fixed");
      jQuery("#aboutPageVideo").addClass("hidden");
      jQuery("#aboutBlock h1").addClass("accessibility");
      jQuery("#roadmapBlock p").addClass("accessibility");
      jQuery("#aboutPage").addClass("accessibility");
    }
  });
});
