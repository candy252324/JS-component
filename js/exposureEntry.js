define(['jquery', 'com/exposure'], function ($, Exposure) {

  //第一次出现时执行回调函数
  Exposure.one($(".box1"), function () {
    console.log("box1");
  })
  //每次出现时都执行
  Exposure.every($(".box2"), function () {
    console.log("box2");
  })
})
