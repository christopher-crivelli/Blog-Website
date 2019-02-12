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
    
    window.setInterval(function(){
      $('.shape').shape('flip up');
    }, 5000);
});

$('.profile').ready(function(){
  
    $('.profile').addClass('animated fadeIn');

    
    $('.shape').shape();
    
    

    
});

