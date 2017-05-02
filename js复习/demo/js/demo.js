$(function () {
    $(".rank span").click(function () {
        $(this).addClass("current").siblings().removeClass("current");
        var idx = $(this).index();
        $(".rank .record").eq(idx).addClass("selected").siblings().removeClass("selected");
    });
    var timer = null;
    $("ul img:even").on("click", function (e) {
        e.preventDefault();
        var that = $(this);
        that.css("display", "none").siblings().css("display", "block");
        that.prop("disable", true);
        (function (that) {
            timer = setTimeout(function () {
                console.log(that);
                that.css("display", "block").siblings().css("display", "none");
            }, 3000);
        }(that));

    });
});