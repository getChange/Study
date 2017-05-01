$(function () {
    $(".rank span").click(function () {
        $(this).addClass("current").siblings().removeClass("current");
        var idx = $(this).index();
        $(".rank .record").eq(idx).addClass("selected").siblings().removeClass("selected");
    });
    $("ul img").click(function () {
        console.log($(this))
        $(this).addClass("imgHide").siblings().removeClass("imgHide");
    });
});