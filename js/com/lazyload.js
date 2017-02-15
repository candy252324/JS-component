	
define(['jquery'],function($) {	

	var LazyLoad=(function(){
		var clock;
		$(window).on('scroll', function(){
		    if(clock){
		      clearTimeout(clock);
		    }
		    clock = setTimeout(function(){
		      	show();
		    }, 300);
		});

		show();

		function show(){
			$('.ct img').each(function(){
				var $cur = $(this);
	      		if($cur.attr('isLoaded')){
	        		return;
	     		}
				if(isVisible($cur)){
					$cur.attr('src', $cur.attr('data-src'));
	      			$cur.attr('isLoaded', true);
				}
			});
		}

		function isVisible($ele){
		    var scrollH = $(window).scrollTop(),
		  	    winH = $(window).height(),
		  	    top = $ele.offset().top;

	  	    if(top < winH + scrollH){
	  	  		return true;
	  	    }else{
	  	  		return false;
	  	    }
		}

		return {
			show:show
		}
	})()

	return LazyLoad;
})

	//LazyLoad.show();
		

		






