// JQUERY

$(document).ready(function() {
  // Load animation on landing page 
  $('.profile').addClass('animated fadeIn');
  $('.shape').shape(); 
  
  // Tab items setup for login page 
  $('.menu .item').tab();
  $('.ui.menu').find('.item').tab('change tab', 'first');
  
  // Animation on landing page 
  window.setInterval(function(){
    if ( document.hasFocus()){
      $('.shape').shape('flip up');
    }
  }, 2500);
  
  // Sign up for emails button  
  $(".cta span").click(function(){
  	$(".cta:not(.sent)").addClass("active");
  	$("input").focus();
  });
  
  // regex for email verification
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  $("#email-form input").on('input', function(){
  	if(regex.test($(this).val())) {
  		$("button").removeAttr("disabled"); }
  	else {
  		$("button").attr("disabled", "disabled"); }
  });
  
  // clears email error when user types another character in email subscription input box 
  $("#email-form input").keydown(function(){
    $('#email-error').text("");
  });
  
  // Call API when user submits the email subscription form 
  $("#email-form").submit(function(x){
  	x.preventDefault();
  	if(regex.test($("input").val())) {
  	  var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/email",
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
  
  $("#category-form").submit(function(x){
    x.preventDefault();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/category",
        "method": "POST",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no-cache",
        },
        "data": {
          "category[name]": $('#category-form input').val()
        }
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        if(response==='success') {
          $("#category-form input").val();
          $(".ui.positive.message").val("Successfully added category");
        } else if(response === 'duplicate'){
          $('.ui.red.message').text("Category adlready added");
        } else if(response === 'error') {
          $('.ui.red.message').text("Try again");
        }
      });
  });
});