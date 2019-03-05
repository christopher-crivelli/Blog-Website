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
    
  // Sign up for emails button  
  $(".cta span").click(function(){
  	$(".cta:not(.sent)").addClass("active");
  	$("input").focus();
  });
  
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  $("#email-form input").on('input', function(){
  	if(regex.test($(this).val())) {
  		$("button").removeAttr("disabled"); }
  	else {
  		$("button").attr("disabled", "disabled"); }
  });
  
  $("#email-form input").keydown(function(){
    $('#email-error').text("");
  });
  
  $("#email-form").submit(function(x){
  	x.preventDefault();
  	if(regex.test($("input").val())) {
  	  var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://webdevbootcamp-ccrivelli.c9users.io/api/email",
        "method": "POST",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no-cache",
        },
        "data": {
          "email[email]": $('.cta input').val()
        }
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        if(response==='success') {
          $(".cta span").text("Thank you!");
          $(".cta").removeClass("active").addClass("sent");
        } else if(response === 'duplicate'){
          $('#email-error').text("Email already registered");
        } else if(response === 'error') {
          $('.cta .button button').text("Try again");
        }
      });
  	}
  });
});