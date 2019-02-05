// JQUERY 
$(document).ready(function() {

    // $('.slider').glide({
    //   autoplay: false,
    //   arrowsWrapperClass: 'slider-arrows',
    //   arrowRightText: '',
    //   arrowLeftText: ''
    // });
    
    
    //const ClassicEditor = require( '@ckeditor/ckeditor5-build-classic' );
    
    // ClassicEditor
    //   .create( document.querySelector( '#editor' ) )
    //   .then( editor => {
    //       console.log( editor );
    //   } )
    //   .catch( error => {
    //       console.error( error );
    // } );
});

$('#show-title-box').ready(function(){
  
  // $('nav').css('opacity', '0');
  $('.ui.sticky')
  .sticky({
    context: '#stick-here'
  });
  
});

$('#profile').ready(function(){
  $('.hover').mouseover(function() {
      $('.text').css("visibility","visible");
    });
    
    $('.hover').mouseout(function() {
      $('.text').css("visibility","hidden");
    });
    
    $('.js--wp-1-heading').addClass('animated fadeIn');

    $('#proceed').addClass('animated fadeIn');
        
    $('.js--wp-1-img').addClass('animated fadeIn');

    $('.js--wp-1-buttons').addClass('animated fadeIn');
    
    $('.js--wp-2').waypoint(function(direction) {
        $('.js--wp-2-content').addClass('animated fadeIn');
    }, {
       offset: '50%'
    })
    
    
    // STICKY NAV 
    $('.js--wp-1').waypoint(function(){
        $('nav').css("opacity", "0");
    });
    
    $('.top').waypoint(function(direction) {
        if(direction== "down") {
            $('nav').css("opacity", "1");
            // $('nav').addClass("animated fadeIn");
            // $('nav').fadeIn('1s');
            // $('.ui .fixed .menu').fadeTo("slow", '1', function(){
            //   console.log('fade complete');
            // });
        } 
        if(direction == "up") {
          $('nav').css("opacity", "0");
          // $('nav').removeClass("animated fadeIn");
          // $('nav').fadeOut('1s');
          // $('.ui .fixed .menu').fadeTo("slow", "0", function(){
          //   console.log('fade out complete')
          // });
        }
    }, {
      offset: '80%'
    });


    $('#proceed').click(function () {
       $('html, body').animate({scrollTop: $('.js--wp-3').offset().top}, 1000); 
    });
    
    $( "#proceed" ).mouseover(function() {
      $("#proceed-text").animate({
        opacity: .6,
      }, 400, function() {
    // Animation complete.
        });
    });
    
    $( "#proceed" ).mouseout(function() {
      $("#proceed-text").animate({
        opacity: 0,
      }, 400, function() {
    // Animation complete.
        });
    });
  
  
});