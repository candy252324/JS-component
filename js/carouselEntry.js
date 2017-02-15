define(['jquery','com/carousel'],function($,Carousel){
	
	 $(".carousel").each(function(){
	 	new Carousel($(this));
	 })


})