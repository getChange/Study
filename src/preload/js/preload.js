//图片预加载
//采用闭包的形式对函数进行传递
(function ($) {
    function Preload(imgs, options) {
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.opts = $.extend({},Preload.DEFAULTS, options);
        if(this.opts.order === 'ordered'){
            this._ordered();
        } else {
            this._unoredered();
        }
    }
    Preload.DEFAULTS = {
        order:'unordered',//无序预加载
        each: null, //每一张图片加载完毕后执行
        all: null//所有图片加载完毕之后执行
    };

    //有序加载
    Preload.prototype._ordered = function () {
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;
        load();

        //有序预加载
        function load() {
            var imgObj = new Image();

            $(imgObj).on('load error', function () {
                //判断each是否存在
                opts.each && opts.each(count);
                if (count >= len) {
                    //所有图片已经加载完毕
                    opts.all && opts.all();
                } else {
                    load();
                }
                count++;
            });

            imgObj.src = imgs[count];
        }
    }

    //无序加载
    Preload.prototype._unoredered = function () {
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;

        $.each(imgs, function (i, src) {
            if (typeof src != 'string') {
                return;
            }
            var imgObj = new Image();

            $(imgObj).on('load error', function () {//保证程序的运行在error的时候也执行相同的程序
                //判断each是否存在
                opts.each && opts.each(count);

                if (count >= len - 1) {
                    opts.all && opts.all();//存在才会去执行
                }
                count++;
            });
            imgObj.src = src;
        });
    };

    $.extend({
        preload: function (imgs,opts) {
            new Preload(imgs,opts);
        }
    })

})(jQuery);