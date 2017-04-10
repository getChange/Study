$(function () {
    //1. 给li注册click事件
    $(".rank span").click(function () {
        //2. 让当前li添加active类，并且让其他的li移除active类
        $(this).addClass("current").siblings().removeClass("current");
        //3. 让对应下标的div添加selected，并且让其他div移除selected类
        var idx = $(this).index();
        $(".rank .record").eq(idx).addClass("selected").siblings().removeClass("selected");
    });
});