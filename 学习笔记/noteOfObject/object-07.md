#第七天

# 一.toString案例

        var obj = new Date;
        console.log(({}).toString.call(obj));
    
        // 需求：编写一个getType函数，
        // 如果传入一个基本数据类型，则返回则数据的类型字符串描述，要求全部小写；
        // 如果传入一个对象类型，则返回则对象的类型字符串描述，要求首字母大写；
    
        /*
         * 使用范例：
         * getType(NaN);  // 'NaN'
         * getType(1);  // 'number'
         * getType(null);  // 'null'
         * getType(undefined);  // 'undefined'
         * getType(new Number);  // 'Number'
         * getType(function(){});  // 'Function'
         * */
    
        function getType(data) {
            // 如果data不等于自己，那data就是NaN
            // 如果data全等于null，那data就是null
            // 使用typeof可以判断string、boolean、number、undefined
            // 最后剩下的对象，统一使用({}).toString方法获取。
            //NaN
            if (data !== data) {
                return 'NaN';
            } else if (data === null) {
                return 'null';
            } else if (typeof data !== 'object' && typeof data !== 'function') {
                return typeof data;
            } else {
                return ({}).toString.call(data).slice(8,-1);
            }
        }
    
        // 基本数据类型的测试
        console.log(getType(NaN));
        console.log(getType(null));
        console.log(getType(1));
        console.log(getType('abc'));
        console.log(getType(true));
        console.log(getType(undefined));
    
        // 对象类型的测试
        console.log(getType(new Date));
        console.log(getType(function () {}));
        console.log(getType([]));
        console.log(getType({}));

# 二.Function.prototype

- Function.prototype自身是一个函数,是唯一一个没有prototype属性的函数
     
- Function.prototype上定义了如下方法
> 1.apply:方法,可以改变函数执行时内部this指向
> 
> 2.arguments:之前是函数的属性,现在这个属性被废弃
> 
> 3.bind:方法,返回一个函数的copy版本,并且可以指定该函数执行时内部this指向
> 
> 4.call:方法,可以改变函数执行时内部this指向
> 
> 5.caller:返回调用该函数的函数
> 
> 6.constructor:对应的构造函数,即Function
> 
> 7.length:函数形参的个数
> 
> 8.name:函数的名字
> 
> 9.toString:打印函数体/把函数体作为字符串打印
> 
> 10.__proto__:Function.prototype所继承的对象,即Object.prototype

- 案例

        var length = 666;
        var o = {length: 999};
        function fn() {
            console.log(this.length);
        }
    
        fn();
        fn.call(o);
        /*
         * call和apply方法,会马上执行函数
         * bind不会马上执行,它会返回一个函数的一个copy版本,供以后想执行时候再执行
         * */
    
        var fnCopy = fn.bind(o);
        fnCopy();
        /*-----------------------------------------------------------*/
    
        var length = 666;
        var o = {length: 999};
        function fn(a, b) {
            console.log(this.length + a + b);
        }
    
        fn(1, 1);
        fn.call(o, 1, 1);
        /*
         * call和apply方法,会马上执行函数
         * bind不会马上执行,它会返回一个函数的一个copy版本,供以后想执行时候再执行
         * */
    
        var fnCopy = fn.bind(o);
        fnCopy(1, 1);
        fnCopy(2, 2);

# 三.bind方法

- bind:ES5提供的方法，ie9以及之前的版本不支持该方法。
> 1.语法:函数名.bind(指定返回函数执行时的this指向,要绑定的实参1,要绑定的实参2...)
> 
> 2.返回值:函数的copy版本

- 如果以后前几个参数一直会使用,就可以通过bind进行绑定,以后就不用传了

> 案例

        var baseNumber = 0;
        var o = {baseNumber:100};
        function add(a, b, c) {
            console.log(this.baseNumber + a + b + c);
        }

        // bind基本使用：
        var fn = add.bind(o);
        fn(1,2,3);
        fn(1,2,54);

        // bind绑定实参的使用：
        //2016/10/12 10:07:22 固定形参a为10，形参b为10
        fn(50);  // 调用fn时，只需再传形参c的值即可
        fn(30); // 调用fn时，只需再传形参c的值即可

# 四.严格模式
- ES5增加了严格模式:严格模式分为两种
> 1.全局模式:'use strict',即在代码的最前面添加一句话'use strict'
> 
> 2.局部模式:在函数的第一行添加一句话'use strict'


        //with语句使用:
    
        var obj = {val: 100, name: 'zs'}
        with (obj) {
            console.log(val);
            console.log(name);
        }
    
- 全局模式案例:


        'use strict'


        a = 1;//报错,严格模式下,必须通过var定义变量

        /*----------------------------------------*/


        var o = {a: 1, a: 10};//报错,严格模式下,一个对象中不能存在重复的形参名

        /*----------------------------------------*/

        function fn(a, a) {
        }
        ;//报错,严格模式下,函数形参的名字不能重复

        /*----------------------------------------*/

        eval('var ccc=10');
        console.log(ccc);//使用严格模式,eval会产生单独的作用域,避免了全局变量的产生

        /*----------------------------------------*/

        if (true) {
            function fn() {
            };
        }//在严格模式下,无法在非函数的代码块中声明函数

        /*----------------------------------------*/
    
        //with语句使用:
    
        var obj = {val: 100, name: 'zs'}
        with (obj) {        //严格模式下,禁止使用with语句
            console.log(val);
            console.log(name);
        }

        /*----------------------------------------*/
    
        //caller
    
        function fn(){
            console.log(fn.caller);//严格模式下,函数的caller属性禁止使用
        }
        (function foo(){
            fn()
        }())

        /*----------------------------------------*/

        //callee
    
        function fn(){
            console.log(fn.callee);//严格模式下,arguments的callee属性禁止使用
        }
        (function foo(){
            fn()
        }())
        
        
        
        
- 局部模式案例
        
        function fn(){
            //只有fn函数内,才是严格模式
            'use strict'
        }

# call,apply,bind例子

- 案例:使用js，把li、section的背景色替换为天空蓝。


        var nodes = [];

        var lis = document.getElementsByTagName('li');

        var sections = document.getElementsByTagName('section');

        for ( var i = 0, len = lis.length; i < len; i++ ) {

            lis[i].style.backgroundColor = 'skyblue';

        }

        for ( var i = 0, len = sections.length; i < len; i++ ) {

            sections[i].style.backgroundColor = 'skyblue';

        }


        /*-------------------------------------------------------------*/


        // 改为1个for循环

        console.log(({}).toString.call(lis));  // 为HTMLCollection类型的对象

        console.log(lis.concat); // 不是数组，所以不能使用数组的concat合并方法

        // 把lis和sections都添加到nodes里面


        var nodes = [];

        var lis = document.getElementsByTagName('li');

        var sections = document.getElementsByTagName('section');

        nodes = nodes.concat.apply( nodes, lis );

        nodes = nodes.concat.apply( nodes, sections );

        console.log( nodes );

        for ( var i = 0, len = nodes.length; i < len; i++ ) {

            nodes[i].style.backgroundColor = 'skyblue';

        }


        /*-----------------------------------------------------------------*/

        // 使用js，把li、section的背景色替换为天空蓝。

        var nodes = [], t = document.getElementsByTagName.bind(document);

        // console.log(t('li'));  // 这样调用，相当于在window里找li元素，报错。

        var lis = t('li');

        var setions = t('section');

        nodes.push.apply( nodes, lis );

        nodes.push.apply( nodes, setions );

        for ( var i = 0, len = nodes.length; i < len; i++ ) {

            nodes[i].style.backgroundColor = 'skyblue';

        }


# 构造函数的返回值

- 1.如果函数作为构造器使用，没有return语句，那么忽略，得到实例；
- 2.如果函数作为构造器使用，return基本数据类型，那么忽略，得到实例；
- 3.如果函数作为构造器使用，return对象类型的数据，那么覆盖实例，得到return的对象。
       
        function Person(name) {

            this.name = name;

            //return 'abc'; // 如果函数作为构造器使用，返回基本数据类型，忽略

            return Function; // 如果函数作为构造器使用，返回对象类型的数据，那么会覆盖掉实例
        
        }

        var fangfang = new Person('芳芳');

        console.log(fangfang);

# get,set

> setter、getter是ES5新增的一种语法，市面上称它们为读写器。

        function getCounter() {

            var total = 0;

            return {

                set: function () {

                    total++

                },

                get: function () {

                    return total;

                }

            }

        }

        var counter = getCounter();

        counter.set();

        counter.set();

        console.log(counter.get());



        /*-------------------------------------------------------------*/

        function getCounter() {

            var total = 0;

            return {

                set setNum ( par ) {

                    console.log(par);

                    total++;

                },

                get getNum () {

                    return total;

                }

            }

        }

        var counter = getCounter();

        counter.setNum = 10;  // set方法会被调用

        counter.setNum = 20;  // set方法会被调用

        console.log(counter.getNum);  // get方法会被调用


##get,set案例
        
        function getCache() {

            var cache = null;

            return {

                // 只有val大于10的情况下，才会存储

                set cache ( val ) {

                    if ( val < 10 ) {

                        return;

                    }

                    cache = val;

                },

                get cache () {

                    return cache * 10;

                }

            }

        }

        var cacheObj = getCache();

        cacheObj.cache = 90;

        console.log(cacheObj.cache);

# 递归

- 定义:函数自己调用自己，或者间接调用自己，称之为递归。

> 示例:

- 直接调用自己

        function fn() {

            fn();

        }

- 间接调用自己
        function a() {

            b();

        }

        function b() {

            a();

        } 


- 1.使用递归求阶乘

> 1.1 分析结构

         /*
         *用递归的形式求阶乘
         *0!=1
         *
         *1!=1=0!*1
         *
         *2!=2=1!*2
         *
         *3!=6=2!*3
         **/
    
        
        //0的阶乘

        function factorial_0() {

            return 1;

        }
    
        console.log(factorial_0());
    
        //1的阶乘

        function factorial_1() {

            return factorial_0() * 1;

        }
    
        console.log(factorial_1());
    
        //2的阶乘

        function factorial_2() {

            return factorial_1() * 2;

        }
    
        console.log(factorial_2());
    
    
        //3的阶乘

        function factorial_3() {

            return factorial_2() * 3;

        }
    
        console.log(factorial_3());
    
        //4的阶乘

        function factorial_4() {

            return factorial_3() * 4;

        }
    
        console.log(factorial_4());
    
> 1.2阶乘的表达式

        function factorial(n) {
            if (n === 0) {
                return 1;
            } else {
                return factorial(n - 1) * n;
            }
        }
    
        console.log(factorial(10));

- 2.递归求幂

> 2.1 分析

        求2的几次方：
        2^0 = 1
        2^1 = 2^0 * 2 = 2
        2^2 = 2^1 * 2 = 4
        2^3 = 2^2 * 2 = 8
        2^4 = 2^3 * 2 = 16
        2^5 = 2^4 * 2 = 32
        2^6 = 2^5 * 2 = 64
        //结论:
        2^n = 2^(n - 1) * 2


        // 求2的0次方

        function power_0() {

            return 1;

        }

        console.log(power_0());


        // 求2的1次方

        function power_1() {

            return power_0() * 2;

        }

        console.log(power_1());

        // 求2的2次方

        function power_2() {

            return power_1() * 2;

        }

        console.log(power_2());

        // 求2的3次方

        function power_3() {

            return power_2() * 2;

        }

        console.log(power_3());

> 2.2 合并为1个函数

        function power( n ) {
            if ( n === 0 ) {
                return 1;
            }else if ( n === 1 ) {
                return power(0) * 2;
            }else if ( n === 2 ) {
                return power(1) * 2;
            }else if ( n === 3 ) {
                return power(2) * 2;
            }else if ( n === 4 ) {
                return power(3) * 2;
            }else if ( n === 5 ) {
                return power(4) * 2;
            }
        }

        console.log(power(0));
        console.log(power(1));
        console.log(power(2));
        console.log(power(3));
        console.log(power(4));
        console.log(power(5));

        
> 2.3 将固定的数据改变为任意数字


        function power( n ) {
            if ( n === 0 ) {
                return 1;
            }else if ( n === 1 ) {
                return power(n - 1) * 2;
            }else if ( n === 2 ) {
                return power(n - 1) * 2;
            }else if ( n === 3 ) {
                return power(n - 1) * 2;
            }else if ( n === 4 ) {
                return power(n - 1) * 2;
            }else if ( n === 5 ) {
                return power(n - 1) * 2;
            }
        }

        console.log(power(0));
        console.log(power(1));
        console.log(power(2));
        console.log(power(3));
        console.log(power(4));
        console.log(power(5));

        
> 2.4 把重复的代码简化掉


        function power( n ) {
            if ( n === 0 ) {
                return 1;
            }else {
                return power(n - 1) * 2;
            }
        }

        console.log(power(0));
        console.log(power(1));
        console.log(power(2));
        console.log(power(3));
        console.log(power(4));
        console.log(power(5));

> 2.5 m的n次方


        function power( m, n ) {
            if ( n === 0 ) {
                return 1;
            }else {
                return power( m, n - 1 ) * m;
            }
        }
        console.log(power(2, 3));
        console.log(power(3, 3));

- 3.递归求阶乘添加缓存

> 之所以要添加缓存,是因为在函数运行过程中会产生运算,会影响运行速度,将已经计算过的内容保存在缓存中会节约内存,达到优化的目的

        var factorial = (function () {

            // 用来缓存已经计算好的结果

            var factorials = [];

            return function ( n ) {

                var tempResult = 0;  // 临时存储当前计算的结果

                // 先看缓存中有没有对应的结果，有的话优先使用缓存中的结果

                if ( factorials[n] ) {

                    return factorials[n];

                }

                if ( n === 0 ) {

                    tempResult = 1;

                }else {

                    tempResult = factorial( n - 1 ) * n;

                }

                // 先把结果缓存起来，然后再return计算好的结果

                factorials[n] = tempResult;

                return tempResult;

            }

        }());

        console.log(factorial(2));

        console.log(factorial(3));

        console.log(factorial(4));

- 4.递归求幂加缓存

        /*-------------------------------递归实现求幂----------------------------------*/

        function power( m, n ) {
            if ( n === 0 ) {
                return 1;
            }else {
                return power( m, n - 1 ) * m;
            }
        }

        /*--------------------------------添加缓存------------------------------*/

        var total = 0;
        // 缓存计算好的结果
        var powers = {
            2: [1, 2, 4, 8, 16],
            4: [1, 4, 16, 64]
        };
        function power( m, n ) {
            total++;
            var tempResult;

            // 如果已经缓存了m的n次方结果，那么就优先使用缓存。
            if ( powers[m] && powers[m][n] ) {
                return powers[m][n];
            }

            // 如果没有缓存m的n次方，那么先求出结果，缓存起来，然后return结果。
            if ( n === 0 ) {
                tempResult = 1;
            }else {
                tempResult = power( m, n - 1 ) * m;
            }

            // 先看看powers[m]有没有被初始化为数组，如果没有，那么先给它初始化，然后再存。
            powers[m] = powers[m]? powers[m] : [];
            powers[m][n] = tempResult;
            return tempResult;
        }

        console.log(power(5, 4));
        console.log(total);

        total = 0;
        console.log(power(5, 4));
        console.log(total);

        /*--------------------------------变更为闭包的形式----------------------------*/

        var power = (function () {

            // 缓存结算好的结果
            var powers = {};

            // 求m的n次方函数
            return function ( m, n ) {
                var tempRes;

                // 先看看之前有没有缓存m相关的计算，
                // 如果有，继续查看有没有缓存m的n次方计算
                // 如果还有，那么就使用这个缓存的结果
                if ( powers[m] && powers[m][n] ) {
                    return powers[m][n];  // m代表powers的key，n代表powers[m]这个数组的下标。
                }

                // 如果之前没有缓存，那么就计算
                else {

                    // 当n为0时，结果固定为1，否则根据规律进行计算。
                    tempRes = n === 0? 1 : power( m, n - 1 ) * m;

                    // 先看看之前有没有缓存m相关的计算，如果没有，
                    // 需要先把powers[m]初始化为空数组，然后给这个数组缓存结果。
                    powers[m] = powers[m]? powers[m] : [];

                    // 缓存计算结果，然后return。
                    powers[m][n] = tempRes;
                    return tempRes;
                }
            }
        })();

        // 测试
        console.log(power(3, 4));
        console.log(power(4, 4));
        console.log(power(10, 50));

# 斐波那契数列

- 基本的斐波那契数列介绍

> 数列排序如下:1、1、2、3、5、8、13、21、34、55、89...;
> 
> fib_0 = 1;
> 
> fib_1 = 1;
> 
> fib_2 = fib_0 + fib_1 = 2;
> 
> fib_3 = fib_1 + fib_2 = 3;
> 
> fib_4 = fib_2+ fib_3 = 5;
> 
> ......
> 
> fib_n = fib_(n-2) + fib_(n-1).

**代码:**

        function fibonacci( n ) {

            if ( n === 0 || n === 1 ) {

                return 1;

            }else {

                return fibonacci( n - 2 ) + fibonacci( n - 1 );

            }

        }

- 斐波那契数列性能分析:

    var fibonacci = (function () {
        var fibonaccis = [];
        return function (n) {
            var tempResult;
            if (fibonaccis[n]) {
                return fibonaccis[n];
            }
            if (n === 0 || n === 1) {
                tempResult = 1;
            } else {
                tempResult = fibonacci(n - 1) + fibonacci(n - 2);
            }

            fibonaccis[n] = tempResult;
            return tempResult;
        }
    }());

    console.log(fibonacci(4));

# Canvas

- **1.定义:**用来展示绘制效果的标签,相当于img标签,用来展示图片

        <canvas id="cvs"></canvas>

- **2.方法:**如果要绘制图形,需要通过cvs的DOM对象得到一个绘制对象

        var cvs = document.getElementById('cvs');

        var ctx = cvs.getContext( '2d' );

       > getContext可以传两种参数
       > 
       > 1.2d
       > 
       > 2.webgl ==> OpenGL

- **3.路径:**路径就是对将来绘制图形轮廓的规划,并不是真的绘制

    > 3.1 先移动钢笔到指定的位置: ctx.moveTo(x, y);

        ctx.moveTo(10, 10);

    > 3.2 画路径的点: ctx.lineTo(x, y);

        ctx.lineTo(110, 10);
        ctx.lineTo(110, 110);
        ctx.lineTo(10, 110);
        ctx.lineTo(10, 10);

    > 3.3 描边路径: ctx.stroke();

        ctx.stroke();

- **注意:**必须通过canvas的属性来设置画布的大小，不能通过css设置，css会拉伸画布