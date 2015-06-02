//= require themes/jquery.flexslider.js
//= require themes/bootstrap-datepicker

$(document).ready(function() {

  "use strict";

 $('.datepicker').datepicker();
 
});

$(window).load(function(){
  
  $('#carousel').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 210,
    itemMargin: 5,
    asNavFor: '#slider'
  });

  $('#slider').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#carousel"
  });

  $('#hero-slider').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: true,
    slideshow: true,
    start: function(slider){
      $('body').removeClass('loading');
    }
  });
});
