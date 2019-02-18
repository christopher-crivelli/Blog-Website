// JQUERY

$(document).ready(function() {
    
    window.setInterval(function(){
      $('.shape').shape('flip up');
    }, 2500);
    
    $('.profile').addClass('animated fadeIn');
    $('.shape').shape(); 
    $('.menu .item').tab();
    $('.ui.menu').find('.item').tab('change tab', 'first');
    
});