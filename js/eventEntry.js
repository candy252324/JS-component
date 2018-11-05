define(['jquery', 'com/carousel-slide', 'com/event'], function ($, Carousel, Event) {

  $(".carousel").each(function () {
    new Carousel($(this));
  })

  var i = 0,
    len = $('.intro p').length;

  Event.on('show_next', function () {
    i++;
    i = i % len;
    $('.intro p').hide().eq(i).fadeIn();


  });

  Event.on('show_pre', function () {
    i--;
    i = (i + len) % len;
    $('.intro p').hide().eq(i).fadeIn();

  });

})
