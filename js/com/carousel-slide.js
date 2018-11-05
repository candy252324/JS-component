
/**

 $(".carousel").each(function(){
		new Carousel($(this));
	})

**/

define(['jquery', 'com/event'], function ($, Event) {

  var Carousel = (function () {

    var Carousel = function ($carousel) {
      this.$pre = $carousel.find(".pre")
      this.$next = $carousel.find(".next")
      this.$ct = $carousel.find(".img-ct")
      this.$bullet = $carousel.find(".bullet")
      this.$items = this.$ct.children()

      this.imgCount = this.$items.length
      this.imgWidth = this.$items.width()

      this.curIdx = 0
      this.isAnimate = false

      this.$ct.css({width: this.imgWidth * this.imgCount})
      this.init()

    }
    Carousel.prototype = {
      init: function () {
        this.playAuto();
        this.bind();
      },
      bind: function () {
        var $cur = this;
        $cur.$pre.on('click', function () {
          $cur.playPre();
        });
        $cur.$next.on('click', function () {
          $cur.playNext();
        });
        $cur.$bullet.find("li").on("click", function () {
          var idx = $(this).index();
          if (idx > $cur.curIdx) {
            $cur.playNext(idx - $cur.curIdx);
          }
          if (idx < $cur.curIdx) {
            $cur.playPre($cur.curIdx - idx);
          }
        })
      },
      playPre: function (idx) {
        var $cur = this;
        var idx = idx || 1;
        if (!$cur.isAnimate) {
          $cur.isAnimate = true;
          $cur.stopAuto();
          for (var i = 0; i < idx; i++) {
            $cur.$ct.prepend($cur.$ct.children().last());
          }
          $cur.$ct.css({left: -$cur.imgWidth * idx});
          $cur.$ct.animate({left: '+=' + idx * $cur.imgWidth}, function () {
            $cur.curIdx = ($cur.curIdx + $cur.imgCount - idx) % $cur.imgCount;
            $cur.setList();
            $cur.isAnimate = false;
            $cur.playAuto();
          });
          Event.fire('show_pre');
        }

      },
      playNext: function (idx) {
        var $cur = this;
        var idx = idx || 1;
        if (!$cur.isAnimate) {
          $cur.isAnimate = true;
          $cur.stopAuto();
          $cur.$ct.animate({left: '-=' + idx * $cur.imgWidth}, function () {
            for (var i = 0; i < idx; i++) {
              $cur.$ct.append($cur.$ct.children().first());
            }
            $cur.$ct.css({left: 0});
            $cur.curIdx = ($cur.curIdx + idx) % $cur.imgCount;
            $cur.setList();
            $cur.isAnimate = false;
            $cur.playAuto();
          })
          Event.fire('show_next');
        }

      },
      setList: function () {
        var $cur = this;
        $cur.$bullet.children().removeClass("active").eq($cur.curIdx).addClass("active");
      },
      playAuto: function () {
        var $cur = this;
        this.clock = setInterval(function () {
          $cur.playNext();
        }, 2000)
      },
      stopAuto: function () {
        clearInterval(this.clock);
      }
    }
    return Carousel;
  }());
  return Carousel;
})








/**
 <div class="carousel">
 		<ul class="img-ct clearfix">
 			<li><a href="#"><img src="http://cdn.jirengu.com/book.jirengu.com/img/1.jpg"></a></li>
 			<li><a href="#"><img src="http://cdn.jirengu.com/book.jirengu.com/img/2.jpg"></a></li>
 			<li><a href="#"><img src="http://cdn.jirengu.com/book.jirengu.com/img/3.jpg""></a></li>
 			<li><a href="#"><img src="http://cdn.jirengu.com/book.jirengu.com/img/4.jpg""></a></li>
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



/**轮播通用样式**/
/**
.carousel{
	position: relative;
	overflow: hidden;
}
.carousel-slide .img-ct{
	position: absolute;
}
.carousel-slide .img-ct >li{
	float: left;
}
.carousel-fade .img-ct >li{
	position: absolute;
}
.carousel .arrow{
	position: absolute;
	width: 30px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	cursor: pointer;
	border-radius: 50%;
	box-shadow: 0 0 2px #999;
	color:#fff;
	background: #000;
	opacity: 0.6;
}
.carousel .arrow:hover{
	opacity: 1;
}
.carousel .pre{
	top:50%;
	left:15px;
	transform: translateY(-50%);
}
.carousel .next{
	top:50%;
	right: 15px;
	transform: translateY(-50%);
}
.carousel .bullet{
	position: absolute;
	left:50%;
	bottom: 20px;
	transform: translate(-50%);
}
.carousel .bullet li{
	float: left;
	margin:0 3px;
	width: 15px;
	height: 3px;
	border-radius: 5px;
	background: #fff;
}
.carousel .bullet li.active{
	background: #666;
}
**/

/**单独样式**/
/**
.show-case .carousel{
	margin-left: 190px;
	width:770px;
	height: 455px;
}
**/
