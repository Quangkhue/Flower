'use strict';

$(document).ready(function(){
    var testData = ["images/flowers/slider2.jpg", "images/flowers/slider3.jpg"];
    for (var i = 0; i < testData.length; i++){
        var isActive = i == 0 ? 'active' : '';
        var html = `<div class="item ` + isActive + ` ">`
        + `<img `
        + `alt="First slide"`
        + `src="` + testData[i] + `" `
        + ` >
        <div class="container">
          <div class="carousel-caption">
            <h1>Hoa Tươi Đà Lạt Giá Sỉ</h1>
            <p>Tellus sit amet massa condimentum, vitae tincidunt lectus imperdiet. Nunc consectetur risus justo. </p>
          </div>
        </div>
      </div>`
        $($('#myCarousel').children('.carousel-inner')[0]).append(html);
    }
})