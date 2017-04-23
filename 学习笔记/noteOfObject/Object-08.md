#Object-08

## 一. 主要学习内容

- 1.了解jQuery内部的结构
- 2.复习和编码的锻炼

## 二. jQuery的结构

        (function (global){
            
            //工厂函数

            var jQuery = function( selector , context ) {

                return new jQery.fn.init( selector , context );

            };

            //给工厂函数的原型起一个别名

            jQuery.fn = jQuery.prototype = {

                constructor : jQuery;

            };

            //给jQuery工厂函数自身以及jQuery工厂函数的原型中添加extend方法
            //以便于对jQuery进行功能扩展
            jQuery.fn = jQuery.fn.extend = function () {
   
            };

            //init是jQuery中真正的构造函数
            var init = jQuery.fn.init = function ( selector , context , root ) {

            };

            //让构造函数的原型与工厂函数的原型保持一致
            init.prototype = jQuery.fn;

            //让工厂函数通过两个变量jQuery以及$暴露到全局
            window.jQuery = window.$ = jQuery ;
        
        }(window));

## 三. 理解jQuery的结构

        /*----------------1.标准的构造函数写法------------------*/
        
        /*-------2.为了创建实例更加方便,增加了工厂函数------------*/
        /*-----3、为了减少变量污染，使用自调封装起来，对外暴漏factory即可------*/
        /*---4、让外界可以通过factory对原型进行扩展，所以使用factory原型覆写Person原型----*/
        /*------5、给原型起一个更简短的名字fn，内外使用都方便------*/
       /*-------6、工厂函数起名JQuery，构造函数起名init-----------*/
        /*---7、把init放到原型中，这样外面也可以找到init构造函数----*/
        /*---8、给对外暴漏的JQuery起个别名$，这样外面使用将更加方便---*/
        