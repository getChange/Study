window.onload = function() {
    var container = document.getElementById("container");
    var images = container.getElementsByTagName('img');
    //单张图片宽度
    var imgWidth = images[0].offsetWidth;

    //设置隐藏的宽度
    var hideWidth = 160;

    //容器的宽度
    var boxWidth = imgWidth + (images.length - 1) * hideWidth;
    container.style.width = boxWidth + 'px';
};