# 第四天学习

## 面向对象的三大特征

> 1.封装


> 2.继承


> 3.多态

### 1.封装

> js中的封装,就是把一堆相关性的变量和函数组织到一起

### 2.继承

> js中的继承,就是原型

### 3.多态

> js中的多态,可以理解为是对象的动态变化

## 其他语法补充

### for in

> 能够遍历出可继承的属性
> for in 可以遍历出一个对象继承的属性(必须是可枚举的)

### 静态成员与实例成员

- 静态成员(类成员):添加给类(构造函数)自己的属性和方法.

	> 特点:不需要创建实例,即可通过类使用.

- 实例成员:添加给实例的属性和方法.(添加到原型的上的属性与方法,本义是为了让实例使用,所以也可以理解为实例成员)

- 例如:
	> 在jQuery中,$.ajax,这里的ajax方法就是静态成员
	> 在jQuery中,$('div').css(),这里的css方法就是实例成员

- 什么情况下会用到静态成员
	> 1.如果一些属性和类的关联性比较大,那么可以考虑作为静态属性存在
	> 2.如果一些方法具有通用性,可以考虑将其作为静态方法存在

##　Object原型常用方法

> hasOwnProperty(常用)

- 作用:判断一个对象是否(自己)含有某个属性
- 语法:对象.hasOwnProperty(要判断的属性名)
- 返回值:boolean

		//hasOwnProperty
    	var obj={a:1};
    	console.log(obj.hasOwnProperty("a"));//true
    	console.log(obj.hasOwnProperty("b"));//false
    	console.log(obj.hasOwnProperty("constructor"));//false
    	console.log(Object.prototype.hasOwnProperty("hasOwnProperty"));//true

> propertyIsEnumerable

- 作用:判断一个对象是否(自己)含有某个属性,并且还要判断这个属性是不是可枚举的,
- 这个方法是双重判断,通常称之为hasOwnProperty的加强版
- 语法:对象.propertyIsEnumerable(要判断的属性名)
- 返回值:boolean

		//propertyIsEnumerable
    	var obj2={a:1};
    	console.log(obj.propertyIsEnumerable("a"));//true
    	console.log(obj.propertyIsEnumerable("b"));//false
    	console.log(obj.propertyIsEnumerable("constructor"));//false
    	console.log(Object.prototype.propertyIsEnumerable("hasOwnProperty"));//false

> isPropertyOf

- 作用:判断一个对象是不是另一个对象的原型对象
- 语法:被判断对象.isPropertyOf(对象)
- 返回值:boolean

		console.log( Object.prototype.isPrototypeOf( obj2 ) );  // true
        console.log( Object.prototype.isPrototypeOf( Object ) );  // true
        console.log( Function.prototype.isPrototypeOf( Function ) ); // true
        console.log( Function.prototype.isPrototypeOf( Math ) );  // false，因为Math只继承Object.prototype


> toString

- 作用:根据方法执行时内部的this指向,返回一个类似于这样的字符串:'[object this对象的类型名称]'
- **通过这个字符串可以得知内置对象的类型.**
- **自定义创建的对象统一返回'[object Object]'**
		
		//为了让toString方法执行时,内部的this指向Math,
		//所以把这个方法先添加到Math自身,然后通过Math调用,
		//这样toString执行时,内部的this就指向了Math
		
		Math.toStr=Object.prototype.toString;
		console.log(Math.toStr());//[object Math]
		console.log(Math.toString());//[object Math]
 		
		Date.toStr = Object.prototype.toString;
        console.log(Date.toStr());

        var date = new Date();
        date.toStr = Object.prototype.toString;
        console.log(date.toStr());

        var strObj = new String();
        strObj.toStr = Object.prototype.toString;
        console.log(strObj.toStr());

        function Person() {}
        var per = new Person();
        per.toStr = Object.prototype.toString;
        console.log(per.toStr());

        console.log(Object.prototype.toString.call(Math));
        console.log(Object.prototype.toString.call(Function));
        console.log(Object.prototype.toString.call(Object));
        console.log(Object.prototype.toString.call({}));
        console.log(Object.prototype.toString.call(new Object));
        console.log(Object.prototype.toString.call(new Function));
        console.log(Object.prototype.toString.call(per));  // 自定义构造函数创建的对象统一返回'[object Object]

## 函数默认原型对象的类型

> 很多地方认为构造函数默认的显示原型对象的类型,是构造函数的名字
> 即Person.prototype是Person类型的对象


- 依据Boolean String Number Array Object这几个对象的prototype,他们的类型就是构造函数的名字

## 函数的几个属性

- arguments:代表实参的伪数组(之前是fn的属性,但是被废除,arguments已经是关键字了,可以直接使用)
- caller:返回调用该函数的函数
- length:形参的个数
- name:函数的名字

> **arguments属性介绍**

- callee:返回被调用的函数(返回函数自己),在递归函数中会使用

## in运算符

- 作用:判断一个对象能否使用某个属性
- 语法:'属性名' in 对象
- 返回值:boolean

        var obj = { aa: 11 };
        console.log( 'aa' in obj );
        console.log( 'bb' in obj );
        console.log( 'hasOwnProperty' in obj );


## delete运算符

- 作用:删除对象的属性
- 语法:delete 对象.属性名
> 以数字开头的的key的属性 delete 对象[数字]
        
		var obj = { aa : 10, bb : 230, 1: 100, 2: 200 };
        delete obj.bb;
        delete obj[2];
        console.dir(obj);

## Function的使用
- 通过Function创建一个空函数
		var fn = new Function;
- 语法:Function(arg_name1,arg_name2,arg_name3,functionBody)

> 前面可以定义任意数量的形参,最后一个参数代表函数的代码体

> **注意:这些参数必须是字符串的形式**

- 返回值:一个新创建的函数实例

		function add(a,b){

        	console.log(a + b);

    	}

    	var addObj=new Function('a','b','console.log(a + b);');

    	addObj(10,60)

> 如果使用Function创建函数很繁琐一般不会采用,但是这个方式有一个好处,就是会把字符串当做代码执行

##　eval

- 语法:eval(字符串代码)

		eval('alert(123)');

- 在IE8以前,可以使用eval或者Function解析JSON数据



**插入内容**

- JSON数据格式==>'{"name":"ls"}'


- 为了方便操作JSON数据,ES5提供了JSON对象,里面有两个方法


> 1.JSON.parse:用来把JSON数据转换为js对象.


> 2.JSON.stringify:用来把js对象转换为JSON数据.


# 作用域与预解析

## 预解析

- 概念:在js中,代码整体执行之前,先解析一部分,预解析之后,代码才会从上往下整体执行,预解析执行过的代码不会重复执行


- 作用:预解析会把声明部分的代码提前执行


> 声明分为两部分:


- 1.变量声明
> 1.1使用var关键字定义的变量,成为变量声明

		⑴.//其中var a 是声明部分

		var a = 1;

		⑵.//这里的语句都是声明部分

		var b,c,d

		⑶.//其中var e,f,g是声明部分
		
		var e , f = j = 2 , p

> 1.2变量声明提升的特点

		⑴.在声明变量的前面,可以使用这个变量,不会报错
		
		console.log(a);
		var a = 10;
		console.log(a);

		预解析执行的代码:
		var a;
		预解析之后执行代码:
		
		console.log(a);
		a = 10;
		console.log(a);
		
- 2.函数声明(函数声明与函数表达式)

> 2.1 定义函数的方式

- ⑴.函数声明式

		①.function fn(){} //函数声明式


		②.(function(){	//这是函数表达式
		
			function f(){} //函数声明式
		
		})



> 函数声明式特点:以function关键字开头的定义的函数,并且定义在全局,或者直接嵌套在另一个函数内,这种形式定义的函数就是函数声明式.


> 函数声明式定义的函数其他特征:
- 1.会被预解析;
- 2.函数必须有名字.


- ⑵.函数表达式

		①.var f = function(){} //函数表达式


		②.(function(){


		})();//函数表达式


		③.fn(function(){});//函数表达式

		④.{
			
			function f(){} //在非函数的代码块中定义的函数就是函数表达式

		}

> 函数表达式特点:不是以function关键字开头定义的函数,或者函数嵌套在非函数的代码块中,都是函数表达式


> 函数表达式的其他特征:
- 1.不会被预解析;
- 2.函数名字可有可无;
- 3.函数的名字只能在函数内部使用.
- 4.要么在表达式中,要么在语句中.

> 函数表达式的特殊情况:
- 写在非函数的代码块中
- 1.名字会被预解析
- 2.名字是必须的
- 3.函数名可以在外面使用

       {
           function teShuBiaoDaShi(){};
       }        


- ⑶.Function



> 2.2 函数声明提升

- 特点:在函数声明的前面,可以调用这个函数

		fn();

		function fn(){

			console.log(1);

		}

## 预解析中的疑难杂症

- 1.预解析时对变量重名的处理

> 预解析时如果遇到重复的变量声明,那么就忽略.

		console.log(a)

		var a = 1;
		
		var a = 100;

		console.log(a)


		
		预解析:
		
		var a ;

		var a ; //被忽略

		预解析之后:

		console.log(a)

		a = 1;
		
		a = 100;

		console.log(a)

- 2.预解析时对函数重名的处理

> 预解析时如果遇到重复的函数声明,保留后面的函数.

		fn() ;

		function fn(){

			console.log(111) ;

		}

		function fn(){

			console.log(222) ;

		}

		fn() ;

		

		//预解析:
		
		第一个函数fn函数声明

		第二个函数fn函数声明,发现重名,保留后面的函数.
		
		预解析之后：

        fn();

        fn();



- 3.预解析时对函数与变量重名的处理

> 预解析时如果遇到变量与函数重名的情况,保留函数.

 		console.log(fn);

        var fn = 10;

        function fn() {

            console.log(111);

        }

        var fn = 20;

        function fn() {

            console.log(222);

        }

        console.log(fn);


        	/*
        	* 预解析
        	* var fn，
        	* 第一个fn函数声明,发现重名，保留现在打印111的函数，
        	* var fn; 发现重名，忽略，
        	* 第二个fn函数声明，发现重名，保留现在打印222的函数，
        	*
        	* 预解析之后：
        	* console.log(fn);  // 打印222的函数
        	* fn = 10;
        	* fn = 20;
        	* console.log(fn);   // 打印20
        	* 
        	* */



**关于预解析时重名处理的特点:**

> 凡是遇到重名的变量声明,那么忽略;
> 凡是遇到重名的函数声明,当前的函数覆盖之前的函数.

- 4.函数声明定义在代码块中

> 一个函数声明式的语法,写在非函数的代码块中,理论上这是函数表达式.

> 但是对于这种函数浏览器会预解析它的名字

		console.log(fn);

		{

			function fn(){}

		}

		console.log(fn);

		/*
		* 预解析
		* var fn;
		*
		* 预解析之后:
		* console .log(fn);
		* fn = function fn () {};
		* console.log(fn);
		*
		*/
		

- 5.函数执行时内部也存在预解析

> 形参一定是在代码整体执行之前赋的值

			function fn(par) {

            	// 形参一定是在代码整体执行之前复的值。
            	console.log(par);
            	console.log(a);
            	console.log(f);

            	var a = 1;
            	var par = 111;
            	function f() {
                	console.log(111);
            	}

            	/*
            	* 函数调用时，会先给形参赋值
            	* var par = 10；
           		*
            	* 预解析：
            	* var a；
            	* var par；  // 发现重名，忽略
            	* f函数预解析；
            	*
            	* 预解析之后：
            	* console.log(par);  // 10
            	* console.log(a);  // undefined
            	* console.log(f); // f函数体
            	* */
        	}

        	fn(10);

## 作用域

- 1.含义:变量的有效范围.

> 一个问题:如何检测一个变量的作用域

> 在指定的区域内使用这个变量,如果不报错,说明这个变量的作用域包含这个区域

		var a = 1;
		
		console.log(a);//不报错,说明a的作用域包含全局

		console.log(b);

		(function fn(){

			var b = 10;

			console.log(a);//不报错，说明a的作用域包含fn函数的内部
		
		})();

		console.log(b);//报错，说明b的作用域不包全局

- 2.**全局变量**:在任何地方都可以使用的变量称之为全局变量(代码)

> 如何定义全局变量

> **在函数外定义的变量都是全局变量**

- 3.**局部变量**:只有指定的地方可以使用的变量称之为局部变量(代码)

> 如何定义局部变量

> **在函数内声明的变量都是局部变量**

- 4.全局变量和局部变量就是用过作用域的大小对变量进行划分的

###　函数作用域

- 只有函数才能够划分变量的作用域，这种作用域的规划就叫函数作用域

> 在ES6之前,只有函数可以划分变量的作用域,所以在函数的外面无法访问函数内的变量


		(function () {
            var b = 1;
        })();
        console.log(b);

        // 在ES6之前，没有块级作用域的概念，所以在代码块的外面可以访问代码块内的变量
        {
            var a = 1;
        }
        console.log(a);


###　块级作用域(未完成)

- 凡是代码块就可以划分变量的作用域，这种作用域的规则就叫块级作用域
- ES6，对块级作用域做了支持，新增了两种定义变量的方式

### 词法作用域(静态作用域)

- 如果在函数内访问一个变量,优先找局部变量和形参,
- 如果没有找到,去定义该函数的环境中寻找
- 直到全局为止

        var a = 100;
        var b = 9999999;
        (function () {
            var a = 200;
            var b = 888888;
            function fn() {
                var a = 1;
                console.log(a);  // 1
                console.log(b);  // 888888
            }

            (function () {
                var a = 100;
                var b = 666666;
                fn();
            })();
        })();


### 块级作用域 函数作用域 词法作用域之间的联系
> 区别:

- 1.块级作用域和函数作用域描述的是,什么东西可以划分变量的作用域,同时块级作用域包含函数作用域
- 2.词法作用域描述的是,变量的查找规则

> 关系:

- 1.**块级**作用域 **包含** **函数**作用域
- 2.词法作用域和块级作用域&函数作用域**没有任何关系**

> 他们从两个角度描述的作用域规则,ES6之前js采用的是**函数作用域+词法作用域**

### 动态作用域
- 如果在函数内访问一个变量,优先找局部变量和形参,
- 如果没有找到,去调用该函数的环境中寻找
- 直到全局为止



##### 插入内容

- 常量:永远不会变化的量,和变量相反

- const用来定义常量

		{
            let arr = [];
            console.log(arr);
        }
        //console.log(arr);

        {
            const obj = {};
            console.log(obj);
        }
        console.log(obj);


