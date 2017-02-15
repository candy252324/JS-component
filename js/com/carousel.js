		
define(['jquery','com/event'],function($,Event){

	var Carousel=(function(){
		
			var Carousel=function ($carousel){
				this.$pre=$carousel.find(".pre")	  
				this.$next=$carousel.find(".next")    
				this.$ct=$carousel.find(".img-ct") 
				this.$bullet=$carousel.find(".bullet")   
				this.$items=this.$ct.children()

				imgCount=this.$items.length
				imgWidth=this.$items.width()

				this.curIdx=0
				this.isAnimate=false

				this.$ct.css({width:imgWidth*imgCount})
				this.init()

			}
			Carousel.prototype={
				init:function(){
					this.playAuto();
					this.bind();
				},
				bind:function(){
					var $cur=this;
					$cur.$pre.on('click',function(){
						$cur.playPre();
					});
					$cur.$next.on('click',function(){
						$cur.playNext();
					});
					$cur.$bullet.find("li").on("click",function(){
						var idx=$(this).index();
						if(idx>$cur.curIdx){
							$cur.playNext(idx-$cur.curIdx);
						}
						if(idx<$cur.curIdx){
							$cur.playPre($cur.curIdx-idx);
						}
					})
				},
				playPre:function(idx){
					var $cur=this;
					var idx=idx || 1;
					if(!$cur.isAnimate){
						$cur.isAnimate=true;
						$cur.stopAuto();
						for(var i=0;i<idx;i++){
							$cur.$ct.prepend($cur.$ct.children().last());
						}
						$cur.$ct.css({left:-imgWidth*idx});
						$cur.$ct.animate({left:'+='+idx*imgWidth},function(){
							$cur.curIdx=($cur.curIdx+imgCount-idx)%imgCount;
							$cur.setList();
							$cur.isAnimate=false;
							$cur.playAuto();
						});
						Event.fire('show_pre');
					}
					
				},
				playNext:function(idx){
					var $cur=this;
					var idx=idx || 1;
					if(!$cur.isAnimate){
						$cur.isAnimate=true;
						$cur.stopAuto();
						$cur.$ct.animate({left:'-='+idx*imgWidth},function(){
							for(var i=0;i<idx;i++){
								$cur.$ct.append($cur.$ct.children().first());
							}
							$cur.$ct.css({left:0});
							$cur.curIdx=($cur.curIdx+idx)%imgCount;
							$cur.setList();
							$cur.isAnimate=false;
							$cur.playAuto();
						})
						Event.fire('show_next');
					}
					
				},
				setList:function(){
					var $cur=this;
					$cur.$bullet.children().removeClass("active").eq($cur.curIdx).addClass("active");
				},
				playAuto:function(){
					var $cur=this;
					this.clock=setInterval(function(){
						$cur.playNext();
					},2000)
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

		
