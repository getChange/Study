# jQuery框架

## 一. 基本框架

        // 为了全局变量污染，把代码写到自调函数中
        (function ( w ) {

            // 为了用户使用方便，提供一个工厂函数
            function jQuery( selector ) {
                return new init( selector );
            }

            // 原型简写&原型默认拥有的属性与方法
            jQuery.fn = jQuery.prototype = {
                constructor: jQuery,
                jQ1: 111,
                jQ2: 222
            };

            // 构造函数
            var init = jQuery.prototype.init = function () {

            };

            // 为了第三方扩展(即jQ插件)
            init.prototype = jQuery.prototype;

            // 对外暴漏
            w.jQuery = w.$ = jQuery;

        }( window ));

        var shili = $();
        $.fn.value = 100;
        console.log(shili);
        console.log(shili.constructor);
        console.log(shili.init);
        console.log(shili.value);
        console.log(shili.jQ1);
        console.log(shili.jQ2);

- 1、jQuery的代码全局写在一个自调函数中，


- 2、平常使用的$实际上jQ对外暴漏的一个工厂函数，而构造函数在jQ的内部叫init，并且这个构造函数还被添加到了jQ的原型中。


        
- 3、jQ为了让第三方能够对其功能进行扩展，所以把工厂函数的原型与构造函数的原型保持了一致。
    - 1、对外暴漏的是工厂函数
    - 2、内部的构造函数叫init，被添加到了原型中
    - 3、为了插件机制，让构造函数的原型为工厂函数的原型，这样只就外暴漏工厂函数，即可对原型进行扩展。

## 二. 创建实例

        // 得到的是init的实例
        console.log($());
        console.log($('abc'));
        console.log($().jQ1);

## 三. extend
         
- 1.在原型中添加extend


        // 为了全局变量污染，把代码写到自调函数中
        (function ( w ) {

            // 为了用户使用方便，提供一个工厂函数
            function jQuery( selector ) {
                return new init( selector );
            }

            // 原型简写&原型默认拥有的属性与方法
            jQuery.fn = jQuery.prototype = {
                constructor: jQuery,
                jQ1: 111,
                jQ2: 222
            };

            jQuery.extend = jQuery.fn.extend = function ( obj ) {
                for ( var key in obj ) {
                    this[key] = obj[key];
                }
            };

            // 构造函数
            var init = jQuery.prototype.init = function () {

            };

            // 为了第三方扩展(即jQ插件)
            init.prototype = jQuery.prototype;

            // 对外暴漏
            w.jQuery = w.$ = jQuery;

        }( window ));


- 2.1 加到了jQ的原型中，jQ的实例可以使用


        $.fn.extend({
            abac: 100,
            fdsadf: 200
        });

- 2.2 加到了jQ自身，即静态方法，只有jQ自己才能使用


        $.extend({
           $value: 888
        });



- 2.3 实例可以使用原型中的实例属性

        console.log($().fdsadf);

- 2.4 实例不可以使用静态属性

        console.log($().$value);

- 2.5 jQ自己可以使用静态属性

        console.log($.$value);

## 三. 支持选择器

        // 为了全局变量污染，把代码写到自调函数中
        (function ( w ) {

            // 为了用户使用方便，提供一个工厂函数
            function jQuery( selector ) {
                return new init( selector );
            }

            // 原型简写&原型默认拥有的属性与方法
            jQuery.fn = jQuery.prototype = {
                constructor: jQuery,
                jQ1: 111,
                jQ2: 222
            };

            jQuery.extend = jQuery.fn.extend = function ( obj ) {
                for ( var key in obj ) {
                    this[key] = obj[key];
                }
            };

            // 构造函数
            var init = jQuery.prototype.init = function ( selector ) {

                // 根据selector获取元素
                var nodes = document.querySelectorAll( selector );

                // 把获取到的元素依次添加到实例中
                [].push.apply( this, nodes );
            };

            // 为了第三方扩展(即jQ插件)
            init.prototype = jQuery.fn;

            // 对外暴漏
            w.jQuery = w.$ = jQuery;

        }( window ));

- 验证:

        console.log($('span'));
        console.log($('div').jQ1);

## 四. 支持HTML片段

        // 为了全局变量污染，把代码写到自调函数中
        (function ( w ) {

            // 为了用户使用方便，提供一个工厂函数
            function jQuery( selector ) {
                return new init( selector );
            }

            // 原型简写&原型默认拥有的属性与方法
            jQuery.fn = jQuery.prototype = {
                constructor: jQuery,
                jQ1: 111,
                jQ2: 222
            };

            jQuery.extend = jQuery.fn.extend = function ( obj ) {
                for ( var key in obj ) {
                    this[key] = obj[key];
                }
            };

            // 给jQuery添加静态方法
            jQuery.extend({

                // 判断一个字符串是不是html片段
                /*
                 * 判断selector是不是html片段：
                 * html片段的特点是：<开头，>结尾，中间夹杂着内容。
                 * 1、判断selector的第一个字符是不是<
                 * 2、判断selector的结尾是不是>
                 * 3、判断selector的length不能小于3
                 * */
                isHTML: function ( html ) {
                    if ( html[0] === '<' && html.charAt(html.length - 1) === '>' && html.length >= 3 ) {
                        return true;
                    }
                    return false;
                }
            });

            // 构造函数
            var init = jQuery.prototype.init = function ( selector ) {

                // 如果selector是html片段
                if ( jQuery.isHTML( selector ) ) {
                    /*
                    * 1、先根据html片段创建dom对象
                    *   1.1、先创建一个临时的div
                    *   1.2、设置临时div的innerTHML为html片段，这样div中就自动把html片段转换为了DOM元素
                    *   1.3、然后把div的子节点分别添加都实例身上
                    * 2、然后把创建好的dom对象依次添加到实例中
                    * */
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = selector;
                    [].push.apply( this, tempDiv.childNodes );
                }
                // 否则就认为selector是选择器
                else {
                    // 根据selector获取元素
                    var nodes = document.querySelectorAll( selector );
                    // 把获取到的元素依次添加到实例中
                    [].push.apply( this, nodes );
                }

            };

            // 为了第三方扩展(即jQ插件)
            init.prototype = jQuery.fn;

            // 对外暴漏
            w.jQuery = w.$ = jQuery;

        }( window ));

- 验证:测试得到的span是不是DOM元素

        var span = $('<span>我是span1</span><span>我是span2</span>')[1];
        document.body.appendChild(span);    

## 五. 支持DOM元素

        // 为了全局变量污染，把代码写到自调函数中
        (function ( w ) {

            // 为了用户使用方便，提供一个工厂函数
            function jQuery( selector ) {
                return new init( selector );
            }

            // 原型简写&原型默认拥有的属性与方法
            jQuery.fn = jQuery.prototype = {
                constructor: jQuery,
                jQ1: 111,
                jQ2: 222
            };

            jQuery.extend = jQuery.fn.extend = function ( obj ) {
                for ( var key in obj ) {
                    this[key] = obj[key];
                }
            };

            // 给jQuery添加静态方法
            jQuery.extend({

                /*
                 * 判断selector是不是html片段：
                 * html片段的特点是：<开头，>结尾，中间夹杂着内容。
                 * 1、判断selector的第一个字符是不是<
                 * 2、判断selector的结尾是不是>
                 * 3、判断selector的length不能小于3
                 * */
                isHTML: function ( html ) {
                    return html[0] === '<' && html.charAt(html.length - 1) === '>' && html.length >= 3;
                },

                /*
                * 判断selector是不是DOM：
                * DOM的特点是，都拥有nodeType属性
                * */
                isDOM: function ( dom ) {
                    return !!dom && !!dom.nodeType;
                }
            });

            // 构造函数
            var init = jQuery.prototype.init = function ( selector ) {

                // 如果selector是字符串，那么不是html片段就是选择器
                if ( typeof selector === 'string' ) {
                    // 如果selector是html片段
                    if ( jQuery.isHTML( selector ) ) {
                        /*
                         * 1、先根据html片段创建dom对象
                         *   1.1、先创建一个临时的div
                         *   1.2、设置临时div的innerTHML为html片段，这样div中就自动把html片段转换为了DOM元素
                         *   1.3、然后把div的子节点分别添加都实例身上
                         * 2、然后把创建好的dom对象依次添加到实例中
                         * */
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = selector;
                        [].push.apply( this, tempDiv.childNodes );
                    }
                    // 否则就认为selector是选择器
                    else {
                        // 根据selector获取元素
                        var nodes = document.querySelectorAll( selector );
                        // 把获取到的元素依次添加到实例中
                        [].push.apply( this, nodes );
                    }
                }

                // 如果selector是DOM元素，那么把它直接添加实例中
                if ( jQuery.isDOM( selector ) ) {
                    [].push.call( this, selector );
                }
            };

            // 为了第三方扩展(即jQ插件)
            init.prototype = jQuery.fn;

            // 对外暴漏
            w.jQuery = w.$ = jQuery;

        }( window ));

- 验证:给$传入DOM

        var div = document.getElementById('div');
        console.log($(div));

## 六. 支持数组和伪数组

        // 为了全局变量污染，把代码写到自调函数中
        (function ( w ) {

            // 为了用户使用方便，提供一个工厂函数
            function jQuery( selector ) {
                return new init( selector );
            }

            // 原型简写&原型默认拥有的属性与方法
            jQuery.fn = jQuery.prototype = {
                constructor: jQuery,
                jQ1: 111,
                jQ2: 222
            };

            jQuery.extend = jQuery.fn.extend = function ( obj ) {
                for ( var key in obj ) {
                    this[key] = obj[key];
                }
            };

            // 给jQuery添加静态方法
            jQuery.extend({

                /*
                 * 判断selector是不是html片段：
                 * html片段的特点是：<开头，>结尾，中间夹杂着内容。
                 * 1、判断selector的第一个字符是不是<
                 * 2、判断selector的结尾是不是>
                 * 3、判断selector的length不能小于3
                 * */
                isHTML: function( html ) {
                    return html[0] === '<' && html.charAt(html.length - 1) === '>' && html.length >= 3;
                },

                /*
                * 判断selector是不是DOM：
                * DOM的特点是，都拥有nodeType属性
                * */
                isDOM: function( dom ) {
                    return !!dom && !!dom.nodeType;
                },

                // 判断对象是不是window
                isWindow: function( window ) {
                    return !!window && window.window === window;
                },

                /*
                 * 判断selector是不是数组或伪数组：
                 * 特点：都用length属性
                 * */
                isLikeArray: function( likeArray ) {

                    // 如果是函数或者window，返回false
                    if ( typeof likeArray == 'function' || jQuery.isWindow( likeArray ) ) {
                        return false;
                    }

                    // 如果有likeArray，并且likeArray有length属性，并且(length为0 或 likeArray有lenght - 1这个属性)
                    return !!likeArray && typeof likeArray == 'object' && 'length' in likeArray &&
                            ( likeArray.length === 0 || ( likeArray.length - 1) in likeArray );
                }
            });

            // 构造函数
            var init = jQuery.prototype.init = function ( selector ) {

                // 如果selector是字符串，那么不是html片段就是选择器
                if ( typeof selector === 'string' ) {
                    // 如果selector是html片段
                    if ( jQuery.isHTML( selector ) ) {
                        /*
                         * 1、先根据html片段创建dom对象
                         *   1.1、先创建一个临时的div
                         *   1.2、设置临时div的innerTHML为html片段，这样div中就自动把html片段转换为了DOM元素
                         *   1.3、然后把div的子节点分别添加都实例身上
                         * 2、然后把创建好的dom对象依次添加到实例中
                         * */
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = selector;
                        [].push.apply( this, tempDiv.childNodes );
                    }
                    // 否则就认为selector是选择器
                    else {
                        // 根据selector获取元素
                        var nodes = document.querySelectorAll( selector );
                        // 把获取到的元素依次添加到实例中
                        [].push.apply( this, nodes );
                    }
                }

                // 如果selector是DOM元素，那么把它直接添加实例中
                if ( jQuery.isDOM( selector ) ) {
                    [].push.call( this, selector );
                }

                // 如果selector是数组或伪数组，那么把其中的每一项分别添加到实例中
                if ( jQuery.isLikeArray( selector ) ) {
                    [].push.apply( this, selector );
                }

                // 剩余的不管了，统一添加到实例中
                [].push.call( this, selector );
            };

            // 为了第三方扩展(即jQ插件)
            init.prototype = jQuery.fn;

            // 对外暴漏
            w.jQuery = w.$ = jQuery;

        }( window ));

- 验证:

        var spans = document.getElementsByTagName('span');
        var arr = [1,2,3];
        console.log($(spans));
        console.log($(arr));
        console.log($(function (){}));
        console.log($(window));
        console.log($(11));


## 七. 支持其他数据类型

        // 为了全局变量污染，把代码写到自调函数中
        (function ( w ) {

            // 为了用户使用方便，提供一个工厂函数
            function jQuery( selector ) {
                return new init( selector );
            }

            // 原型简写&原型默认拥有的属性与方法
            jQuery.fn = jQuery.prototype = {
                constructor: jQuery,
                jQ1: 111,
                jQ2: 222
            };

            jQuery.extend = jQuery.fn.extend = function ( obj ) {
                for ( var key in obj ) {
                    this[key] = obj[key];
                }
            };

            // 给jQuery添加静态方法
            jQuery.extend({

                /*
                 * 判断selector是不是html片段：
                 * html片段的特点是：<开头，>结尾，中间夹杂着内容。
                 * 1、判断selector的第一个字符是不是<
                 * 2、判断selector的结尾是不是>
                 * 3、判断selector的length不能小于3
                 * */
                isHTML: function( html ) {
                    return html[0] === '<' && html.charAt(html.length - 1) === '>' && html.length >= 3;
                },

                /*
                * 判断selector是不是DOM：
                * DOM的特点是，都拥有nodeType属性
                * */
                isDOM: function( dom ) {
                    return !!dom && !!dom.nodeType;
                },

                // 判断对象是不是window
                isWindow: function( window ) {
                    return !!window && window.window === window;
                },

                /*
                 * 判断selector是不是数组或伪数组：
                 * 特点：都用length属性
                 * */
                isLikeArray: function( likeArray ) {

                    // 如果是函数或者window，返回false
                    if ( typeof likeArray == 'function' || jQuery.isWindow( likeArray ) ) {
                        return false;
                    }

                    // 如果有likeArray，并且likeArray有length属性，并且(length为0 或 likeArray有lenght - 1这个属性)
                    return !!likeArray && typeof likeArray == 'object' && 'length' in likeArray &&
                            ( likeArray.length === 0 || ( likeArray.length - 1) in likeArray );
                }
            });

            // 构造函数
            var init = jQuery.prototype.init = function ( selector ) {

                // undefined、null、''、NaN
                if ( !selector ) {
                    return this;
                }

                // 如果selector是字符串，那么不是html片段就是选择器
                if ( typeof selector === 'string' ) {
                    // 如果selector是html片段
                    if ( jQuery.isHTML( selector ) ) {
                        /*
                         * 1、先根据html片段创建dom对象
                         *   1.1、先创建一个临时的div
                         *   1.2、设置临时div的innerTHML为html片段，这样div中就自动把html片段转换为了DOM元素
                         *   1.3、然后把div的子节点分别添加都实例身上
                         * 2、然后把创建好的dom对象依次添加到实例中
                         * */
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = selector;
                        [].push.apply( this, tempDiv.childNodes );
                    }
                    // 否则就认为selector是选择器
                    else {
                        // 根据selector获取元素
                        var nodes = document.querySelectorAll( selector );
                        // 把获取到的元素依次添加到实例中
                        [].push.apply( this, nodes );
                    }
                }

                // 如果selector是DOM元素，那么把它直接添加实例中
                else if ( jQuery.isDOM( selector ) ) {
                    [].push.call( this, selector );
                }

                // 如果selector是数组或伪数组，那么把其中的每一项分别添加到实例中
                else if ( jQuery.isLikeArray( selector ) ) {
                    [].push.apply( this, selector );
                }

                // 剩余的不管了，统一添加到实例中
                else {
                    [].push.call( this, selector );
                }
            };

            // 为了第三方扩展(即jQ插件)
            init.prototype = jQuery.fn;

            // 对外暴漏
            w.jQuery = w.$ = jQuery;

        }( window ));

- 验证:

        console.log($(''));
        console.log($());

## 八. 支持函数

        // 为了全局变量污染，把代码写到自调函数中
        (function ( w ) {

            // 为了用户使用方便，提供一个工厂函数
            function jQuery( selector ) {
                return new init( selector );
            }

            // 原型简写&原型默认拥有的属性与方法
            jQuery.fn = jQuery.prototype = {
                constructor: jQuery,
                jQ1: 111,
                jQ2: 222
            };

            jQuery.extend = jQuery.fn.extend = function ( obj ) {
                for ( var key in obj ) {
                    this[key] = obj[key];
                }
            };

            // 给jQuery添加静态方法
            jQuery.extend({

                /*
                 * 判断selector是不是html片段：
                 * html片段的特点是：<开头，>结尾，中间夹杂着内容。
                 * 1、判断selector的第一个字符是不是<
                 * 2、判断selector的结尾是不是>
                 * 3、判断selector的length不能小于3
                 * */
                isHTML: function( html ) {
                    return html[0] === '<' && html.charAt(html.length - 1) === '>' && html.length >= 3;
                },

                /*
                * 判断selector是不是DOM：
                * DOM的特点是，都拥有nodeType属性
                * */
                isDOM: function( dom ) {
                    return !!dom && !!dom.nodeType;
                },

                // 判断对象是不是window
                isWindow: function( window ) {
                    return !!window && window.window === window;
                },

                /*
                 * 判断selector是不是数组或伪数组：
                 * 特点：都用length属性
                 * */
                isLikeArray: function( likeArray ) {

                    // 如果是函数或者window，返回false
                    if ( typeof likeArray == 'function' || jQuery.isWindow( likeArray ) ) {
                        return false;
                    }

                    // 如果有likeArray，并且likeArray有length属性，并且(length为0 或 likeArray有lenght - 1这个属性)
                    return !!likeArray && typeof likeArray == 'object' && 'length' in likeArray &&
                            ( likeArray.length === 0 || ( likeArray.length - 1) in likeArray );
                }
            });

            // 构造函数
            var init = jQuery.prototype.init = function ( selector ) {

                // undefined、null、''、NaN
                if ( !selector ) {
                    return this;
                }

                // 如果是函数，则放到DOMContentLoaded事件中
                if ( typeof selector === 'function' ) {
                    if ( document.addEventListener ) {
                        document.addEventListener('DOMContentLoaded', selector);
                    }else {
                        document.attachEvent('onreadystatechange', function () {
                            if ( document.readyState == 'complete' ) {
                                selector();
                            }
                        });
                    }
                    [].push.call(this, document);
                }

                // 如果selector是字符串，那么不是html片段就是选择器
                else if ( typeof selector === 'string' ) {
                    // 如果selector是html片段
                    if ( jQuery.isHTML( selector ) ) {
                        /*
                         * 1、先根据html片段创建dom对象
                         *   1.1、先创建一个临时的div
                         *   1.2、设置临时div的innerTHML为html片段，这样div中就自动把html片段转换为了DOM元素
                         *   1.3、然后把div的子节点分别添加都实例身上
                         * 2、然后把创建好的dom对象依次添加到实例中
                         * */
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = selector;
                        [].push.apply( this, tempDiv.childNodes );
                    }
                    // 否则就认为selector是选择器
                    else {
                        // 根据selector获取元素
                        var nodes = document.querySelectorAll( selector );
                        // 把获取到的元素依次添加到实例中
                        [].push.apply( this, nodes );
                    }
                }

                // 如果selector是DOM元素，那么把它直接添加实例中
                else if ( jQuery.isDOM( selector ) ) {
                    [].push.call( this, selector );
                }

                // 如果selector是数组或伪数组，那么把其中的每一项分别添加到实例中
                else if ( jQuery.isLikeArray( selector ) ) {
                    [].push.apply( this, selector );
                }

                // 剩余的不管了，统一添加到实例中
                else {
                    [].push.call( this, selector );
                }
            };

            // 为了第三方扩展(即jQ插件)
            init.prototype = jQuery.fn;

            // 对外暴漏
            w.jQuery = w.$ = jQuery;

        }( window ));

- 验证:

       $(function () {
            console.log(11);
        });
        console.log($(function () {
            console.log(22);
        })); 

## 九. 其余内容

### 9.1 jQuery原生选择器

        // JQ返回的实例是一个伪数组对象
        console.log($()); // 返回一个空实例对象
        console.log($('a')); // 返回一个length为0的实例对象
        console.log($('span')); // 返回实例对象，length为3，以下标的方式存储了所有的span
        console.log($('div')); // 返回实例对象，length为1，以下标的方式存储了所有的div

        // 如果给$传入的是html片段，$会自动把他们转换成DOM对象，然后添加到实例中
        console.log($('<div><a>1</a><a>2</a></div><div><a>11</a><a>22</a></div>').appendTo('body'));
        console.log($('<span>我是span1</span><span>我是span2</span>'));

        // 如果给$传入的是DOM元素，那么把这个DOM元素添加到实例中
        console.log($(document.getElementById('div')));

        // 如果给$传入的是数组，那么把数组中每一项值添加到实例中
        var arr = [1,2,3,4];
        console.log($(arr));

        // 如果给$传入的是伪数组，那么把数组中每一项值添加到实例中
        var spans = document.getElementsByTagName('span');
        console.log($(spans));

        // 如果给$传入的是伪数组，那么把数组中每一项值添加到实例中
        var obj = { 0:111, 1:222, length:2 };
        console.log($(obj));

        // 对空的处理
        console.log($());
        console.log($(''));

- 原生选择器方法:

    > IE8开始支持这俩方法。
        
    > 1. querySlector
    > 
    >返回的是一个DOM元素，如果没有获取到，返回null
        
    > 2. querySlectorAll
    > 
    > 返回的是一组DOM元素( 伪数组对象 )，如果没有获取到，返回一个空的伪数组对象。

### 9.2 构造函数与实例

        function Person() {

        }
        Person.MAX_AGE = 230;
        Person.prototype.run = function () {
            console.log('跑');
        }

- 实例
     
        var xiaofang = new Person();

- 实例不能使用静态方法

        console.log(xiaofang.MAX_AGE); 

- 构造函数不能使用自己原型里面的东西(Function除外)

        Person.run(); 

### 9.3 创建DOM的两种方式

        // 创建方式1
        var div = document.createElement('div');
        var span1 = document.createElement('span');
        span1.innerHTML = 11;
        var span2 = document.createElement('span');
        span2.innerHTML = 22;
        var span3 = document.createElement('span');
        span3.innerHTML = 33;
        div.appendChild(span1);
        div.appendChild(span2);
        div.appendChild(span3);

        // 创建方式2
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = '<div><span>11</span><span>22</span><span>33</span></div><div><span>22</span></div>';
        console.log(tempDiv.childNodes[0]);
        console.log(tempDiv.childNodes[1]);

### 9.4 获取字符串指定位置的字符

- charAt:字符串中的字符从左向右索引，**第一个字符**的索引值为 0，**最后一个字符**（假设该字符位于字符串 stringName 中）的索引值为 stringName.length - 1。 如果指定的 index 值超出了该范围，则返回一个空字符串。

- charAt语法:

        str.charAt(index)//index:0 到 字符串长度-1 的一个整数。

### 9.5 isDOM

       function isDOM( dom ) {
            /*if ( dom && dom.nodeType ) {
                return true;
            }
            return false;*/

            // 等价于上面的代码
            return !!dom && !!dom.nodeType;
        }

        console.log(isDOM());
        console.log(isDOM(12));
        console.log(isDOM(document.body)); 

### 9.6 window的length属性

- 每个iframe里面，都有属于自己的window
- 每个window对象里面都有length属性，代表当前window中iframe的数量

 
        console.log(window.length);
        
        //判断window
        console.log(window.parent == window);


### 9.7 jQuery判断window是不是伪数组

        console.log($(window)); // 并没有把window通过下标平铺添加到实例中，而是直接把window自己添加到了实例中
        console.log($(1)); // 把1添加到实例中
        console.log($(true)); // 把true添加到实例中
        console.log($('abc'));  // 当做选择器去找，没找到，length为1
        console.log($([1,2,3]));

### 9.8 DOMContentLoaded

#### 9.8.1 DOMContentLoaded介绍

- onload：页面所有资源加载完毕后触发。

- DOMContentLoaded: DOM树构建完毕后触发。

- 区别:这个事件触发比onload要快。IE9和现代浏览器都支持该事件。


        console.log(00000);
        window.addEventListener('load', function () {
            console.log(1111);
        });
        document.addEventListener('DOMContentLoaded', function () {
            console.log(222);
        });
        console.log(3333);

        /*
        * ready可以接收多个函数，这些函数统一在DOMContentLoaded事件触发时被执行
        * 1、既然可以接收多个函数，
        * */
        function ready( fn ) {
            document.addEventListener('DOMContentLoaded', fn);
        }

        // 给ready传入函数
        ready(function () {
            console.log('传给ready的函数1');
        });

        ready(function () {
            console.log('传给ready的函数2');
        });

#### 9.8.2 IE兼容性


- 1.IE8不支持DOMContentLoaded事件，但是IE8所有的页面元素都支持onreadystatechange事件。这个事件比onload要快。


        window.attachEvent('onload', function () {
            console.log('onload');
        });
        document.attachEvent('onreadystatechange', function () {
            // 当readyState为complete的时候，再做其他事情
            if ( document.readyState == 'complete' ) {
                console.log('onreadystatechange');
            }
        });

        setTimeout(function () {
            document.attachEvent('onload', function () {
                if ( document.readyState == 'complete' ) {
                    console.log('setTimeout');
                }
            });
        }, 1000);

- 2.jQuery中，如果传入的函数，那么会等到DOMContentLoaded之后执行


### 9.9 children与childNodes

- children 
    > 获取子节点，但是不包含文本节点
    > 这个属性个用起来比较方法，因为大多数情况下，咱们都不需要获取文本节点

- childNodes 
    > 获取所有的子节点

### 9.10 jQuery中延迟传入函数

        $(function () {
            console.log('传入$的函数');
        });
        setTimeout(function () {
            $(function () {
                console.log('过一会传入$的函数');
            });
        }, 3000);
        



