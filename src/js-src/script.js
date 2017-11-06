$(window).on('load', function(){
  $('.preloader-wrap').delay(500).fadeOut('100');
  setTimeout(function() {
    $('body').css('overflow', 'auto');
  }, 500);
});

$(document).ready(function() {

	//first screen animation
	particlesJS.load('particles-js', 'js/particles2.json', function() {});


	$('.js-scrollto').click(function () {
    var elementClick = $(this).attr('href');
    var destination = $(elementClick).offset().top;
    $('html:not(:animated),body:not(:animated)').animate({
    scrollTop: destination}, 800);
  });

	  var currentYear = (new Date).getFullYear();
  	$('.js-get-current-year').text(currentYear);
});

document.addEventListener('DOMContentLoaded', function(){
  var trigger = new ScrollTrigger({
    toggle: {
      visible: 'visible',
      hidden: 'invisible'
    },
    offset: {
      x: 0,
      y: 100
    },
    addHeight: false,
    once: true
  }, document.body, window);
});