# 第五天学习

## 函数的复习

	/*-----------------------变量赋值---------------------*/

        var f1 = function () {
            console.log('赋值一个函数');
        };

        var f2 = function () {
            console.log('给f2赋值为自调函数的返回值');
            return 21;
        }();


    /*-----------------------函数调用后的返回值---------------------*/

        // 函数调用后，没有return语句，默认返回undefined
        function f5() {}
        console.log(f5());  // 打印f5调用后的返回值

        // 函数调用后返回一个基本数据类型
        function f6() {
            return 2;
        }
        console.log(f6());  // 打印f6调用后的返回值

        // 函数调用可以返回一个对象
        function f7() {
            return {};
        }
        console.log(f7());  // 打印f7调用后的返回值

        // 函数调用可以返回函数
        function f8() {
            return function () {
                console.log('我被返回出去了');
            };
        }
        console.log(f8());  // 打印f8调用后的返回值

        // 函数调用返回另一函数的执行结果
        function f9() {
            return function () {
                console.log('我被返回出去了');
                return 2;
            }();
        }
        console.log(f9());  // 打印f9函数中的自调函数调用后的返回值


    /*-----------------------函数调用时传参---------------------*/

        // f3函数功能：打印传入的第一个参数
        function f3() {
            console.log(arguments[0]);
        }

        // 调用f3函数，传入1
        f3(1);

        // 调用f3函数，传入1 + 1的运算结果
        f3(1 + 1);

        // 调用f3函数，传入的是f4变量，
        // 会具象化这个变量的值，而f4是一个指针指向函数，
        // 具象化后传入的f4变成了指向函数的指针
        function f4() {}
        f3(f4);

        // 调用f3函数，传入的是f4的调用后的返回结果，
        // 因为f4没有return语句，所以f4调用后的返回结果为undefined，
        // 最终传入f3的参数变成了undefined
        f3(f4());

        // 调用f3函数，传入的是一个匿名函数
        f3(function () {
            console.log('传入f3的是一个匿名函数！');
        });

        // 调用f3函数，传入的是一个匿名函数调用后的返回结果
        f3(function () {
            return '传入f3的是自调函数的返回值！';
        }());## 作用域链> 从变量的角度:变量所有的有效区域(运行环境),联合起来就叫做作用域链

		var a = 1;

    	function fn() {

        	(function f() {

            	var b = 1;

        	})();

    	}

> 环境:一个东西

## 闭包

> 广义闭包(代码)(理解)

- 可以访问非自身变量的函数;
- 从这种角度说,所有函数都是闭包;
- 或者使用了非自身变量的函数,就是闭包.


> 狭义闭包

- 可以访问非自身局部变量的函数(使用了非自身局部变量的函数)
- 从这种角度来说,函数内的函数才是闭包

        var globalA = 10;
        // 这个函数，只能使用全局变量和自身的局部变量，所以不是闭包。
        function fn() {
            console.log(globalA);
        }

        /*------------------------------------------------------*/

        (function () {
            var val = 10;
            // 这个函数可以使用自调函数中的局部变量，所以是闭包
            function f() {
                console.log(val);
            }
        }());



> 闭包的特点(代码)

- 利用闭包可以在任何地方操作一个局部变量.

        function fn() {
            var a = 1;
            return function () {
                console.log(a++);
            };
        }

        var f = fn();
        var f2 = fn();
        f();
        f();
        f2();
	

## 变量的生命周期

> 生命周期:一个生物从出生开始,到死亡结束,中间存活的过程就叫生命周期

> 变量的生命周期: 一个变量从定义开始,到释放结束,中间存活的过程就叫变量的生命周期

    - 全局变量的生命周期:从定义开始,到页面被卸载结束,就是全局变量的生命周期
        var a =1;
        //这个变量会一直存在,直到页面被卸载 

    - 局部变量的生命周期:从定义开始,到函数执行完毕结束,就是局部变量的生命周期
    
    
        function fn() {

            //这个变量从fn调用时定义,到函数执行完毕结束

            var val = 10;

        }

        fn();

    **但是有二般情况,二般情况可以通过闭包实现**

        function fn() {

            var a = 1;

            // 当fn执行完毕后，因为匿名函数需要使用局部变量a,

            // 所以造成a变量没有释放。

            // 总结：闭包可以延长(阻止)局部变量的生命周期

            return function () {

                console.log(a);

            };

        }

        var f = fn();

        f();

        f();

    **因为f变量一直存储着一个闭包函数,js解析引擎无法得知将来是否还要调用f函数,所以f函数不会被释放,那么对应的a局部变量也不会被释放,这样会造成内存浪费**

    **如果确定将来f函数不会使用,最好把f函数赋值null**

## 闭包的应用场景

> 1.操作私有属性
- 目的:为了防止其他地方对该属性进行随意修改的隐患

        var total = 0;
        
        total++;

        total++;

        console.log(total);

        *--------------------------------------------*

        function getCounter(){
        
          var total = 0;//私有属性

          return function(){

            console.log(total++);

          }  
        
        }

        var counter = getCounter();

        counter();

> 编写一段能够缓存数据的代码

        var cache = {};

        //缓存中添加数据
    
        function setCache (key,val) {

            cache[key] = val;

        }

        //缓存中获取数据
    
        function getCache (key) {

            return cache[key];

        }

        /*----------------------------------------*/

        function getCacheObj(){

            var cache = {};

            //缓存中添加数据

            function setCache (key,val) {

                cache[key] = val;

            }

            //缓存中获取数据

            function getCache (key) {

                return cache[key];

            }

            return{
                setCache:setCache,

                getCache:getCache
            }
        }

        var cacheObj=getCacheObj();

        cacheObj.setCache('val',888);

        console.log(cacheObj.getCache('val'));

> 2.闭包操作变量的状态

- 变量的状态:指的是变量不同时期所存储的值

        var lis = document.getElementsByTagName('li');

        for ( var i = 0, len = lis.length; i < len; i++ ) {

            lis[i].onclick = function () {

                console.log(i);//会出现错误,i只会存储循环最后的值.

            };

        }

        /*----------利用初级js方法解决问题----------*/

        var lis = document.getElementsByTagName('li');

        for ( var i = 0, len = lis.length; i < len; i++ ) {

            lis[i].index = i;

            lis[i].onclick = function () {

                console.log(this.index);

            };

        }

        /*-------解决自调函数在什么时候执行的问题-------*/

        var lis = document.getElementsByTagName('li');

        for ( var i = 0, len = lis.length; i < len; i++ ) {

            // 自调函数是在for循环时期执行的

            lis[i].onclick = function () {

                console.log(i);

            }();

        }

        /*--------在函数中定义变量来存储循环的值----------*/

        var lis = document.getElementsByTagName('li');

        for ( var i = 0, len = lis.length; i < len; i++ ) {

            // 自调函数是在for循环时期执行的

            lis[i].onclick = function () {

                //这个地方需要特别注意 定义变量不能重名,定义重名的时候,会显示成为undefined

                var ii = i;

                return function () {

                    console.log(ii);

                }

            }();

        }

        /*---------利用闭包的最优选方法-----------*/

        var lis = document.getElementsByTagName('li');

        for ( var i = 0, len = lis.length; i < len; i++ ) {

            // 自调函数是在for循环时期执行的

            lis[i].onclick = function (i) {

                return function () {

                    console.log(i);

                }

            }(i);//利用传参i将i循环时的值存储下来

        }



**插入内容**
- 自调函数是在for循环的时期执行的,所以最终给onclick赋的是自调函数的返回值

        







	