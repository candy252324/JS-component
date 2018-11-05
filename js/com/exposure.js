define(['jquery'], function ($) {

  var Exposure = (function () {
    var hasShow = false;

    function one($target, callback) {
      $(window).on("scroll", function () {
        if (hasShow) {
          return;
        }
        if (isVisible($target)) {
          callback.call($target);   //调用callback()，$(this)代表$target
          hasShow = true;
        }
      })

    }

    function every($target, callback) {
      $(window).on("scroll", function () {
        if (isVisible($target)) {
          callback.call($target);
        }
      })

    }

    function isVisible($target) {
      var winH = $(window).height(),
        scrollTop = $(window).scrollTop(),
        offsetTop = $target.offset().top,
        $targetH = $target.innerHeight();
      return ((winH + scrollTop > offsetTop) && (scrollTop < offsetTop + $targetH));
    }


    return {
      one: one,
      every: every,
    }
  })()

  return Exposure;
})


/*

//只在第一次出现时执行回调函数
Exposure.one($(".mid"),function(){
	console.log($(this));   //$(this)代表$target
})

//每次出现时都执行回调函数
Exposure.every($(".mid"),function(){
	console.log($(this));   //$(this)代表$target
})
*/
