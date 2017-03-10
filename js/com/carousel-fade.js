/**
<div class="carousel-fade">
	<ul class="img-ct clearfix">
		<li><a href="#"><img src=""></a></li>
		<li><a href="#"><img src=""></a></li>
		<li><a href="#"><img src="""></a></li>
		<li><a href="#"><img src="""></a></li>
	</ul>
	<div class="pre arrow"><</div>
	<div class="next arrow">></div>
	<ul class="bullet">
		<li class="active"></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
</div>



**/
		
define(['jquery','com/event'],function($,Event){

	var Carousel=(function(){
		
			var Carousel=function ($carousel){
				this.$pre=$carousel.find(".pre");	  
				this.$next=$carousel.find(".next");    
				this.$ct=$carousel.find(".img-ct"); 
				this.$bullet=$carousel.find(".bullet"); 
				this.$items=this.$ct.children();

				this.imgCount=this.$items.length;
				this.curIdx=0
				this.isAnimate=false

				this.init()

			}
			Carousel.prototype={
				init:function(){
					this.playAuto();
					this.bind();
				},
				bind:function(){
					var $cur=this;
					this.$pre.on('click',function(){
						$cur.playPre();
					});

					this.$next.on('click',function(){
						$cur.playNext();
					});
					this.$bullet.find("li").on("mouseenter",function(){
						var idx=$(this).index();
						$cur.play(idx);
					})

				},
				playPre:function(){
					this.play(this.curIdx-1);
				},
				playNext:function(){
					this.play(this.curIdx+1);
					
				},
				play:function(idx){
					var $cur=this;
					if(this.isAnimate) return;
					this.isAnimate = true;
					this.stopAuto();

					this.curIdx=(idx+$cur.imgCount)%$cur.imgCount;
					this.$items.fadeOut(1000);
					this.$items.eq(this.curIdx).fadeIn(1000, function(){
						$cur.isAnimate = false;
						$cur.playAuto();
					});
					this.setBullet();
					Event.fire('carousel',this.curIdx);
				},
				setBullet:function(){
					var $cur=this;
					$cur.$bullet.children().removeClass("active").eq($cur.curIdx).addClass("active");
				},
				playAuto:function(){
					var $cur=this;
					this.clock=setInterval(function(){
						$cur.playNext();
					},3000)
				},
				stopAuto:function(){
					clearInterval(this.clock);
				}
			}
			return Carousel;	
			}());
		return Carousel;
	})		
		


		// $(".carousel").each(function(){
		// 	new Carousel($(this));
		// })

		
