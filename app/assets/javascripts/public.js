//= require themes/jquery.flexslider.js
//= require themes/bootstrap-datepicker

$(document).ready(function() {

  "use strict";

  var win = $( window );
 $('.datepicker').datepicker();

 //===========================================================
 // BACKGROUND IMAGE
 //===========================================================
 
 // Append .background-image-holder <img>'s as CSS backgrounds
 $('.background-image-holder').each(function() {
   var imgSrc = $(this).children('img').attr('src');
   $(this).css('background', 'url("' + imgSrc + '")');
   $(this).children('img').hide();
   $(this).css('background-position', '50% 0%');
 });
 
 $( window ).resize(function() {
   
   var width = $(window).width();

   if ( width >= 768 ) {
     //console.log($(".equal-height > .col-left").height());
     $(".equal-height > .col-right > .thumbnail > .background-image-holder").css("height", $(".equal-height > .col-left").height() - 22);
   }
   
 });

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

  $( window ).trigger('resize');
  
});
