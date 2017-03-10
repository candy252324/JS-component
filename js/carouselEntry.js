define(['jquery','com/carousel-slide','com/carousel-fade'],function($,CarouselSlide,CarouselFade){
	
	 $(".carousel-slide").each(function(){
	 	new CarouselSlide($(this));
	 })
	  $(".carousel-fade").each(function(){
	 	new CarouselFade($(this));
	 })


})