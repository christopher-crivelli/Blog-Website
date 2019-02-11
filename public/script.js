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

$('#profile').ready(function(){
  
    $('.js--wp-1-heading').addClass('animated fadeIn');

    $('#proceed').addClass('animated fadeIn');
        
    $('.js--wp-1-img').addClass('animated fadeIn');

    $('.js--wp-1-buttons').addClass('animated fadeIn');
    
    $('.shape').shape();
    
    var animateTitle = function(){
      setTimeout(function(){
        $('.shape').shape('flip up', animateTitle());
      }, 3000);
    };
    
    animateTitle();
    
  
  
});