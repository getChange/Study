# 第六天学习

# typeof

- 运算结果只有拥有以下几种:object string number boolean function undefined

# setTimeout

- setTimeout是全局下的一个函数
- 第一个参数要求是回调函数
- 传入setTimeout的回调函数是异步执行的(异步即:不是随着代码的顺序执行)(setTimeout自己是马上执行的)

        function callback(){
            console.log(111);
        }
        
        setTimeout(callback,0);//后执行(异步执行)
        console.log(222);//先执行


# 面试题(setTimeout)

         var arr = ['第一句话','第二句话','第三句话','第四句话'];
         for ( let i = 0, len = arr.length; i < len; i++ ) {

           //因为传入定时器的回调,在循环结束之后才执行,所以打印的值为4
           setTimeout(function () {
               console.log(arr[i]);
           }, 1000 * (i + 1));

        }

       /*----------------------------------*/


## 自调函数的作用

- 全局变量污染:过多的全局变量,极易出现冲突与混淆

- 沙箱模式(命名空间):防止全局变量污染

        (function () {
            var a = 1
        })
          
- 自调函数传参
        
        var b =10;
        var c=10;
        (function(w){

            var a=1;

            var location = w.location;

            var setTimeout = w.setTimeout;

            setTimeout(function(){

                console.log(a);

            },1000);

        })(window);
        
        
        (function(global){

            console.log(global.location.href)

        })(window);

> 自调传入window一般有两个作用
> 
> 1. 提升全局变量的查找时间
> 
> 2. 有助于代码的压缩   

## 函数四种调用模式

### 函数调用模式 ==> 函数名()

- 内部this指向全局对象(window)

        function fn() {

            console.log(this)

        }
    
        fn();//函数名调用,this指向window

        /*------------------------------------*/

        var obj = {

            inFn: function () {

                console.log(this)

            }

        };
    
        var outFn = obj.inFn;

        outFn();//函数名调用,this指向window     

###　方法调用模式 ==> 对象.函数名() || 对象[函数名]()

- 内部的this指向方法所属的对象

            var obj = {
    
            fn: function () {
    
                console.log(this)
    
            }
    
        };
    
        obj.fn();
    
        /*------------------------------------*/
    
        function fn() {
    
            console.log(this)
    
        }
    
        var o={};
    
        o.f=fn;
        o.f();//方法调用模式,this指向o
    
        /*------------------------------------*/
    
        var objec={
            obje:{
                fn: function () {
    
                    console.log(this)
    
                }
            }
        }
    
        objec.obje.fn();//方法调用模式,this指向fn所属的obje对象
    
        /*-------------------------------------*/
    
        var ob={
            111: function () {
                console.log(this);
            }
        };
        ob[111]();//方法调用模式,this指向111所属的ob对象

###　构造器调用模式 ==> new 函数名() || new.函数名() || new[函数名]()

- 内部的this指向新创建的实例

        function Person(age) {
            this.age = age;
            console.log(this);
            console.log(this instanceof Person);
        }
    
        new Person(16);//这是构造器模式,内部的this指向新创建的实例
    
        /*------------------------------------------*/
    
        var obj={
            fn: function () {
                console.log(this)
                console.log(this instanceof obj.fn)
            }
        };
    
        new obj.fn();//这是构造器模式,内部的this指向新创建的实例

### 上下文调用模式(间接调用模式) ==> 函数名.call() || 对象.函数名.call() || new 对象[函数名].call()
### 上下文调用模式(间接调用模式) ==> 函数名.apply() || 对象.函数名.apply() || new 对象[函数名].apply()

- call和apply是来自Function.prototype里面的两个方法;
- 这两个方法有一个共同点,就是可以指定函数执行时内部函数的this指向
- 内部的this指向自定义的对象，如果传入空，this指向全局对象window。

- 语法:函数名.call(指定函数执行时的this指向);
- 语法:函数名.apply(指定函数执行时的this指向);


        function fn(){
            console.log(this);
        }
    
        //通过fn调用call方法,call方法内部会反过来调用fn,
        //并且指定fn执行时内部的this为数组
        fn.call([1,2,3,4,5])
    
        /*-----------------------------------*/
    
        var obj={
            fn: function () {
                console.log(this);
            }
        }
    
        obj.fn.call(val:1);

- call与apply的补充

        function fn(){

            console.log(this);

        }
    
        fn.call({val:1}); // 内部的this指向字面量对象

        fn.call(1);  // 内部的this指向1的包装对象

        fn.apply('a'); // 内部的this指向'a'的包装对象

        fn.apply(null); // 内部的this指向window

        fn.call(undefined); // 内部的this指向window

        fn.call(); // 内部的this指向window


#### toString

- Object.prototype.toString:执行时根据内部的this,返回一个这样的字符串'[object this的类型]'

        Object.prototype.toString();//[object Object]
        Object.prototype.toString.call([1,2]);//因为[1,2]是Array类型的对象,返回的是[object Array]
        Object.prototype.toString.call(Array);//因为Array是Function类型的对象,返回的是[object Function]

- 这个方法一般用来判断ECMAScript内置的十大对象类型(9大构造函数的实例+Math)

- 内置的9大构造函数,他们的prototype显示原型对象中,都定义了自己的toString方法,所以他们的实例,会优先使用自己的toString

        console.log(Object.prototype.toString.call({}));  // [object Object]

        console.log(Object.prototype.toString.call([])); // [object Array]

        console.log(Object.prototype.toString.call(/a/));  // [object RegExp]

        console.log(Object.prototype.toString.call(function(){}));  // [object Function]

        console.log(Object.prototype.toString.call(new Date));  // [object Date]

        console.log(Object.prototype.toString.call(new String)); // [object String]

        console.log(Object.prototype.toString.call(new Number)); // [object Number]

        console.log(Object.prototype.toString.call(new Boolean)); // [object Boolean]

        console.log(Object.prototype.toString.call(new Error)); // [object Error]

        console.log(Object.prototype.toString.call(Math)); // [object Math]

        console.log(Object.prototype.toString.call(null)); // [object Null]

        console.log(Object.prototype.toString.call(undefined));  // [object Undefined]

### call和apply的具体语法

- call

> 语法: 函数名.call(自定义的this指向,实参1,实参2,实参3,实参4...)
> 注意:第一个参数只是为了指定函数执行时his的指向,并不会作为参数传入进去

         function add(a, b)  {
            console.log(a + b);
        }
        add.call(300, 10, 20);  // 结果为30

- apply

> 语法: 函数名.apply(自定义的this指向,[实参1,实参2,实参3,实参4...])
> 注意:第一个参数只是为了指定函数执行时his的指向,并不会作为参数传入进去;第二个参数要求是数组或者伪数组,apply会自动把数组中的内容平铺传入到函数中

         function add(a, b)  {
            console.log(a + b);
        }
        add.apply(300, [50, 50]);  // 结果100
        add.apply(300, { 0:20, 1:20, length:2 });  // 结果40

##### 使用技巧

- 方法借用
        
> 1.借用数组的push方法,给obj对象按照下标添加属性

        var obj = {};
        
        [].push.call(obj,10);//this指向obj

> 2.借用数组的pop方法,删除伪数组o对象的最后一个下标属性值

        var o={
            0:10,
            1:20,
            2:30,
            length:3
        }
        
        [].pop.call(o);
> 3.构造函数借用

        function Person(name, age) {
            this.name = name;
            this.age = age;
        }

        function Student(name, age) {
            // 想给Student的实例也添加name和age属性

            // Student执行时，this指向小红(即小红就是this，this就是小红)，
            // 那么我想要Person执行时，它里面的this指向小红，
            // 我就可以通过call指定Person里面的this为小红，
            // 因为小红就是this，所以给call传this。
            Person.call( this, name, age );
        }

        var xiaohong = new Student('小红', 16);
        console.log(xiaohong);

> 4.通过伪数组获取真数组

        // 如果把一个伪数组转换为真数组

        var obj = {

            0: 100,

            1: 200,

            length: 2

        };

        // slice可以通过一个旧数组，截取获取一个新数组

        console.log([1, 2, 3].slice(0, 1));

        console.log([1, 2, 3].slice());

        console.log([].slice.call(obj));
        
        /*---------------------------------------*/

        // 获取最大值

        function getMax() {

            // 借用apply平铺arguments，给max方法传参

            console.log(Math.max.apply(null, arguments));

        }

        getMax(1,2,4,20);

## 函数的四种调用模式

- 函数中的this,是动态变化的,不同的调用方式,this志向不同,说明函数中的this与调用有关，和定义无关。
            
                                                                                                                                                                                                      