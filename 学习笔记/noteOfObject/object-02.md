# 一.复习

### 面向对象
- 利用对象解决问题.
- 讲究的是凡事不用亲力亲为.
- 离不开面向过程,相当于是对面向过程的封装.
- 面向对象的好处:一般应用于大型软件的.开发,使用了面向对象的大型软件就像是使用了XMind进行组织一样.

### 工厂函数

- 就是对创建对象的过程进行了封装.
- 工厂函数的返回值是一个对象.
- 如果一个函数调用后,返回值是一个对象,那么就可以认为他是一个工厂函数

### 构造函数

- 如果一个函数用来配合new关键字创建对象,那就可以称为构造函数.

### 构造函数与普通函数的关系

- 构造函数与普通函数无异,本身就是一个东西

### 类

- 就是对一些具有相同特征与特性的对象的抽象描述.
- 在ES6之前,可以把构造函数看作是类.

### 实例

- 通过构造函数创建出来的对象
- *注:在口头描述上,实例指的是直系后代(在编程语言中,实力也指子孙后代)*

### 实例类型

- 实例的类型就是构造函数的类型

### 原型&原型的作用

- 原型就是js提供的一个实现继承的机制
- 原型就是为了让实例共享一些属性与方法,达到节省内存以及复用代码的目的

#### prototype

- 所有的函数默认含有prototype属性
- 作用:通过函数new出来的实例,都会继承prototype属性所**指向**的对象.
- 本质:

#### __proto__

- 所有的对象都含有__proto__属性
- 访问一个对象的属性时,如果对象自身没有,就会去__proto__指向的对象中查找

#### new构造函数自动执行的4个步骤

- 1.new关键字会创建一个新对象(就是在内存中开辟一个区域)


- 2.给新对象添加__proto__属性,该属性的值为*当前*构造函数prototype属性的值,新对象.__proto__=构造函数.prtotype


- 3.执行构造函数,执行时构造函数内的this指向新对象


- 4.返回新对象的地址

### 属性查找规则

- 先找自身,自身没有,顺着__proto__属性查找指定对象;
- 这个对象没有,继续顺着__proto__查找;
- 直到世界的尽头

# 二.新内容

## 继承的概念

### 方式介绍

#### 1. 默认的原型继承

- *补充:动态修改原型*

#### 2.原型的覆写
    	function Student(age) {
        	this.age = age;
    	}

    	// 覆写构造函数的prototype属性值
    	// 把Student.prototype修改为一个新的自定义对象
    	Student.prototype = {
        	run: function () {
           		console.log('跑');
        	}
    	};

    	// guoJing 继承 一个自定义的原型对象
    	// 这个原型对象可以通过 Student.prototype 获取(但是这种方式不一定靠谱);
    	// 也可以通过 guoJing.__proto__ 获取。
    	var guoJing = new Student(38);
    	guoJing.run();


#### 3．原型的注意事项

- 1.创建对象时,原型要先覆写,再去创建对象

        function Student(age) {
            this.age = age;
        }
		// 注意事项2：覆写时需要注重代码编写的顺序
        var guoJing = new Student(38);

        // 覆写构造函数的prototype属性值
        // 把Student.prototype修改为一个新的自定义对象
        Student.prototype = {
            constructor: Student,
            run: function () {
                console.log('跑');
            }
        };

        // 报错，因为在创建guoJing时，原型还没有被覆写，
        // 所以guoJing继承的是默认的原型对象
        guoJing.run();
- 2.原型覆写时尽量使用新对象

		var obj = {
      	count: function (a, b) {
           console.log(a + b);
            },
            con: function (a) {
                console.log(a);
            }
        };
        function Student(age) {
            this.age = age;
        }

        // 覆写构造函数的prototype属性值
        // 把Student.prototype修改为一个新的自定义对象
        Student.prototype = obj;
        // 如果我想修改con方法，那么obj对象也会受到连带影响，
        // 将来使用obj的时候，极有可能我已经忘记了这里对obj进行过修改，
        // 就可能出现问题，为了防止自己给自己挖坑，还是不要使用已存在的对象为好。
        Student.prototype.con = function (a) {
            return a;
        };

        var guoJing = new Student(38);
        guoJing.run();
- 3.访问construcotr属性时，会不准确


 		function Student(age) {
            this.age = age;
        }

        // 覆写构造函数的prototype属性值
        // 把Student.prototype修改为一个新的自定义对象
        Student.prototype = {
            // 因为我们自定义的原型对象，默认没有constructor属性，
            // 我们可以考虑自己补上，但是不补也无所谓，因为这个属性没太大卵用。
            constructor: Student,
            run: function () {
                console.log('跑');
            }
        };

        // guoJing 继承 一个自定义的原型对象
        // 这个原型对象可以通过 Student.prototype 获取(但是这种方式不一定靠谱);
        // 也可以通过 guoJing.__proto__ 获取。
        var guoJing = new Student(38);
        guoJing.run();

        // 这种方式，访问construcotr属性时，会不准确。
        console.log(guoJing.constructor);
## js是对象与对象之间的继承


## 编程技巧(继承方式copy)

		//需求:让o2能够使用o对象里面的属性.
		//可以考虑直接把o对象的属性和值copy到o2身上完成需求


		var o={val:"100"};
		var o2={name:"guo"};
		//遍历o对象的属性和值
		//copy到o2身上
		for(var key in o){
			o2[key]=o[key];
		}

		console.log(o);
		console.log(o2);

## 补充(内置的属性不可枚举)

		//可被遍历的,叫枚举
		//内置属性不可枚举:浏览器内置的属性,无法使用for in遍历出来
		var obj={val:100};
		
		obj.toString();
		obj.valueOf();

		//只能把我们自己添加的val属性遍历出来

		for(var key in obj){
			console.log(obj);
		}

## 补充(extend)
		
		//该方法会把第二个对象的属性copy到第一个对象中
		function extend(o1,o2){
			for(var key in o2){
			o1[key]=o2[key];
			
			}
		}


		var obj1={val:23};
		var obj2={value:27};


		//extend可以实现多继承,本质上就是把多个对象的属性依次copy到原型对象中

		function Dog(age){

			this.age = age;

		}
		
		//分别把obj1和obj2的属性copy到原型对象中,这样实例就可以使用

		extend(Dog.prototype,obj1);
		extend(Dog.prototype,obj2);

		console.log(obj1);
		console.log(obj2);

### copy的优势
- 1.实现copy继承所需的函数名没有硬性要求
- 2.乱使用会造成内存资源浪费
- 3.通常都是配合原型来使用的

## 一个案例需求

		var obj={
			fn:function(){
				//谁调用fn,this指向谁
				console.log(this.name)
			}
		}

		//人类

		function Person(name,age){
			this.name = name;
			this.age = age;
		}

		//最好不要这么做
		//Person.prototype = obj;

		//可以考虑把obj对象里面的方法copy到Person的显示原型中,达到实例共享的目的

		for(var key in obj){
			Person.prototype[key]=obj.[key];
		}
		var huangRong = new Person('黄蓉', 18);
        var guoJing = new Person('郭靖', 38);
        huangRong.fn();
        guoJing.fn();

## Object.create(IE8以下不支持)函数上的方法

- 可以实现继承
- 1.Object是一个内置的构造函数
- 2.在Object自身上有很多方法,create是其中之一,可以实现继承

### 语法
- Object.create(被继承的对象);
- 返回值:返回一个新对象,新对象继承传入到create方法的对象.
- 作用:就是创建一个新对象,并且指定新对象的继承的对象
- 局限性:应用场景有限


## 三个案例需求三种做法

- 1.extend
- 2.Object.create(copy)
- 3.Person.prototype=new Animal();*有限制场景:必须是两个构造函数*

# 继承方式总结

##什么是继承
- 一个对象可以使用另一个对象的东西
- 或者说 一个对象可以使用一个本不属于自己的东西
- js中的原型就是对继承特性的实现.

## 继承方式1
- 默认原型继承(很常用)

		function Fn(){}
		Fn.prototype.value=100;
		var fn = new Fn();

## 继承方式2
- 覆写构造函数的显式原型

		function Fn(){

			value=100;

		}
		
		var fn = new Fn();

## 继承方式3
- 给显式原型混入属性


		function extend(o1, o2) {

    		for ( var key in o2 ) {

        		o1[key] = o2[key];

    		}  

		}

		var obj = { add: function (a,b) {

			 				console.log(a+b) 

						} 

				} 

		function Fn() {}

		extend(Fn.prototype, obj);

		extend(Fn.prototype, {
    		value: 100
		});

		var fn = new Fn();

## 继承方式4
- Object.create

		var obj = { value: 100 }
		var newObj = Object.create(obj);

## 继承方式5
- 借用Object.create方法覆写显式原型


		var obj = { value: 100 }
		function Fn() {}
		Fn.prototype = Object.create(obj);
		var fn = new Fn();


##继承方式6
- 复合式原型继承
	
		function PrFn() {}
		PrFn.prototype.value = 100;
		function Fn() {}
		Fn.prototype = new PrFn()
		var fn = new Fn();

#### 再次穿插一个编程技巧

- 借用某某函数给我的实例添加属性

## 延伸补充 - 模拟实现Object.create

		function create(obj){
			function F(){}
			F.prototype=obj;
			return new F();
		}

		var obj={value:1}
		//创建一个新对象,指定新对象继承obj
		var newObj=create(obj);
		
		console.log(newObj.value);
# 三.开启新篇章

## 1. 对象的原型对象一定是有终点的

### 1.函数默认的原型对象继承结构

		function Person(){
		
			this.name=name;
		
		}

		console.log(Person.prototype);

		//默认原生对象的属性:constructor
		
		//发现Person.prototype这个对象继承的对象中constructor属性值为Object构造函数
		//那么可以猜想Person.prototype继承的对象会不会是Object.prototype

		console.log(Person.prototype.__proto__.constructor);
		
		//验证猜想
		console.log(Person.prototype.__proto__===Object.prototype);

----
- Person.prototype继承Object.prototype
- Object.prototype是终点

## 2.静态成员与实例成员
- 添加给实力的属性或者方法,就叫做实例成员.
- 添加给类自己的属性或者方法,就叫做类成员(静态成员).

		//这是构造函数也是类
		function Person(){
			//这里的name,age属性,因为将来要添加到实例身上,所以称之为实例成员(实例属性)
			this.name=name;
			this.age = age;
		
		}
		
		//直接添加到类上的属性和方法,叫做静态成员,或者类成员

		Person.maxAge=200;
- 1.实例不可以直接访问静态成员
- 2.构造函数(类)不可以直接访问实例成员


####实例能够访问实例成员,类能够访问类成员

- 类成员(静态成员)只能由构造函数自己访问


- 构造函数内添加实例成员,也只有实例能够访问

----

- 原型对象里面的成员,原型自己也可以访问
- 原型对象里面的成员,构造函数(类)不可以访问
- 原型对象里面的成员,实例可以访问