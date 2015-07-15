//= require jquery_ujs
//= require themes/validator
//= require themes/jquery.flexslider
//= require themes/bootstrap-datepicker

$(document).ready(function() {

  "use strict";

  var win = $( window );
  
  $('.datepicker').datepicker();
  $('[data-toggle="tooltip"]').tooltip();

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

 //===========================================================
 // RESIZE
 //===========================================================
 
 $( window ).resize(function() {
   
   var width = $(window).width();

   if ( width >= 768 ) {
     //console.log($(".equal-height > .col-left").height());
     $(".equal-height > .col-right > .thumbnail > .background-image-holder").css("height", $(".equal-height > .col-left").height() - 22);
   }
   
 });

 //===========================================================
 // COLLAPSE
 //===========================================================
 
 $("#global-search-panel a[data-toggle='tab']").on("show.bs.tab", function(e) {
   if( $(e.target).attr('href') === '#sale-properties-panel' ) {
     $("#global-search-panel").addClass("bg-primary");
   }
   else {
     $("#global-search-panel").removeClass("bg-primary");
   }
 })

 //===========================================================
 // RENT INQUIRY
 //===========================================================
 
 //===========================================================
 // SALE INQUIRY
 //===========================================================
 
  $('.sale_property_inquiry')
    .on("ajax:beforeSend", function(evt, xhr, settings) {
      $('span.error').fadeOut('slow');
      $('span.valid').fadeOut('slow');
      $('#thanks').hide();
      $('#error').hide();
      $('#timedout').hide();
      $('#state').hide();
      
      var error = false,
          name_field = $('#sale_property_inquiry_name'),
          name_val = name_field.val();
          
      if ( !name_val.replace(/\s+/g, '').length ) {
        name_field.parent().parent().addClass('has-error');
        error = true;
      }

      var checkEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      var email = $('#sale_property_inquiry_email').val();

      if ( !email.replace(/\s+/g, '').length ) {
        $('#sale_property_inquiry_email').parent().parent().addClass('has-error');
        error = true;
      } else if (!checkEmail.test(email)) {
        $('#sale_property_inquiry_email').parent().parent().addClass('has-error');
        error = true;
      }

      var message = $('#sale_property_inquiry_message').val();
      if ( !message.replace(/\s+/g, '').length ) {
        $('#sale_property_inquiry_message').parent().parent().addClass('has-error');
        error = true;
      }

      if (error == true) {
        $('#error').fadeIn('slow');
        setTimeout(function() {
          $('#error').fadeOut('slow');
        }, 3000);
        return false;
      }
      else {
        $('#sale_property_inquiry_name').parent().parent().removeClass('has-error');
        $('#sale_property_inquiry_email').parent().parent().removeClass('has-error');
        $('#sale_property_inquiry_message').parent().parent().removeClass('has-error');
      }
    })
    .on("ajax:error", function(evt, xhr, status, error) {
      if (error == "timeout") {
        $('#timedout').fadeIn('slow');
        setTimeout(function() {
          $('#timedout').fadeOut('slow');
        }, 3000);
      } else {
        $('#state').fadeIn('slow');
        $("#state").html('The following error occured: ' + error + '');
        setTimeout(function() {
          $('#state').fadeOut('slow');
        }, 3000);
      }
    })
    .on("ajax:success", function(evt, data, status, xhr) {
      console.log("success")
      $('#thanks').fadeIn('slow');
      $('input:not(:submit)').val('');
      $('textarea').val('');
      setTimeout(function() {
        $('#thanks').fadeOut('slow');
      }, 4000);
    })

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

  initialize_map();
  $( window ).trigger('resize');
  
});


function initialize_map() {
  if(typeof google != 'undefined') {
    $('.map-canvas').each(function (index, el) {
      var point = $(el).data("point").split(",");
      var latlng = new google.maps.LatLng(point[0],point[1]);
      var map_options = {
        zoom: 12,
        center: latlng,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(el, map_options);
      var marker = new google.maps.Marker({ position: latlng, map: map });
    })
  }
}