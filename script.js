$(document).ready(function(){
	$(window).load(function(){
		$(".title").css({
			'marginTop':50,
			'opacity':1
		});
		$(window).scroll(function(){
			if ($(window).scrollTop() >= $(window).height()){
				$(".header").fadeIn();
			} else {
				$(".header").fadeOut();
			}
		});
	});
});