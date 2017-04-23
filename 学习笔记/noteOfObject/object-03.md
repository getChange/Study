#探索js对象内部继承的秘密 

### 1.构造函数的默认prototype的继承结构

		function Person() {}
        console.log(Person.prototype);
        // Person的显式原型对象  所继承的对象  为 Object.prototype
        console.log(Person.prototype.__proto__);
        // 测试，结论是否正确
        console.log(Person.prototype.__proto__ === Object.prototype);
        // 结果为null，说明这是继承的终点
        console.log(Object.prototype.__proto__);

        // xiaohong的继承结构：
        var xiaohong = new Person();
        // xiaohong ==> Person.prototype ==> Object.prototype ==> null



### 2.字面量的继承结构

		 var obj = {};
        console.log(obj.__proto__);
        console.log(obj.__proto__ === Object.prototype);

        // obj的继承结构
        // obj ==> Object.prototype ==> null

        /*
        * new Object 创建的实例，继承Object.prototype;
        * 和{}字面量对象一致，
        * 其实{}就是new Object的简写形式。
        * */
### 3.数组的继承结构

		var arr = [];
        console.log(arr.__proto__);
        console.log(arr.__proto__ === Array.prototype);

        console.log(Array.prototype.__proto__);
        console.log(Array.prototype.__proto__ === Object.prototype);

        // arr的继承结构
        // arr ==> Array.prototype ==> Object.prototype ==> null

        /*
         * new Array 创建的实例，继承Array.prototype;
         * 和[]字面量对象一致，
         * 其实[]就是new Array的简写形式。
         * */

### 4.Math的继承结构(比较特殊的继承结构)

		console.log(Math.__proto__);
        console.log(Math.__proto__ === Object.prototype);

        // Math的继承结构
        // Math ==> Object.prototype ==> null

### 5.字符串的继承结构
		var strObj = new String();
        console.log(String.prototype.__proto__);
        console.log(String.prototype.__proto__ === Object.prototype);

        // strObj鐨勭户鎵跨粨鏋?
        // strObj ==> String.prototype ==> Object.prototype ==> null

### 6.正则表达式的继承结构
		 // 函数的显示原型都继承 Object.prototype
        console.log(RegExp.prototype.__proto__ === Object.prototype);


----

### 总结:
#### 继承的规律

- 1.所有对象继承的终点是Object.prototype


- 2.所有函数默认的显示原型(函数的prototype) 都继承 Object.prototype


- 3.谁的实例，这个实例就继承谁的prototype


	-- 3.1.所有的函数,都看作是Function的实例,继承Function.prototype

	-- 3.2.所有的数组,都看作是Array的实例,继承Array.prototype

	-- 3.3.所有的正则,都看作是RegExp的实例,继承RegExp.prototype

例子:

		function fn(){}
		//1.fn是Function的实例,所以继承Function.prototype
		//2.fn.prototyp继承Object.prototype
		//3.new fn()是fn的实例,继承fn.prototype

#### 
		function Person(){}
		//Person.prototype Person Object

## Object.prototype扩展补充

		Object.prototype.itcast="itcast"

		var obj={};
		var arr=[];

## 原型链(描述对象继承结构的比较形象的词汇)

> 概念:一个对象继承的所有对象,称之为这个对象的原型对象(一个对象继承的所有的对象称之为这个对象的原型链)


- *注:原型对象指的是对象所继承的对象*

### 函数的原型链

		function fn(){};
		var f=function(){};
		var foo=new Function();

		console.log(typeof fn);
		console.log(typeof f);
		console.log(typeof foo);

		//函数的原型链:
		//fn==>Function.prototype==>Object.prototype==>null
		
		//所有函数.prototype都继承Object.prototype,Object.prototype除外

## 对象隐式原型的规律

- 1.对象的隐式原型与对象的子类型有关
- 2.构造函数的显示原型的隐式原型是Object.prototype

---
#### 疑问解答
- 1.对象包含很多种类型,函数只是其中一种
- 2.在js中,函数比较特殊,他们都是Function类型的对象,但是这些函数都可以派生出自己的类型


> 例如: Date自身是Function类型,但是通过new Date创建出来的的所有实例都是Date类型


> 再例如:一个自定的函数,假设名字为fn,fn自身是Function类型,但是通过new fn创建出来的所有实例都是fn类型

- ECMAScript内置的---函数类型的对象:
- String Number 	Boolean RegExp Function Object Array Error Date

> 上述9大内置构造函数的原型链结构:

> 9大构造函数==>Function.prototype==>Object.prototype==>null

- ECMAScript内置的---非函数类型的对象:
- Math

> Math==>Object.prototype==>null

---

## instanceof

> instanceof运算符本义是用来判断一个对象是不是另一个构造函数的实例;
> 
> instanceof运算符可以用来判断一个对象是不是继承自另一个构造函数的显示原型;

- 运算规则:判断左边对象的原型链结构中是否存在右边构造函数的显示原型

- 语法:对象 instanceof 构造函数

- 返回值: boolean

*用来判断一个类型也是不一定准确的*




		