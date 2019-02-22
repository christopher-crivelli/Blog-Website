// JQUERY

$(document).ready(function() {
    $('#sticky').sticky({
      context: "#example1"
    });
    
    window.setInterval(function(){
      if ( document.hasFocus()){
        $('.shape').shape('flip up');
      }
    }, 2500);
    
    $('.profile').addClass('animated fadeIn');
    $('.shape').shape(); 
    $('.menu .item').tab();
    $('.ui.menu').find('.item').tab('change tab', 'first');
    
});