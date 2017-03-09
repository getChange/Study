# javaScript的this指向问题深度解析
> javaScript函数中的this指向并不是在函数定义的时候确定的,而是在调用的时候确定的(函数的调用方式决定了this的指向)
## javaScript中的调用方式
- 直接调用
- 方法调用
- new调用
- 其他调用方式(bind(),箭头函数)
### 直接调用
- 通过 ``函数名(...)`` 调用.函数内部的this指向全局对象,浏览器中全局对象是window,在nodeJs中全局对象是global;
- 一个例子
```javascript
//简单兼容浏览器和NodeJs的全局对象
const _global = typeof window === "undefined" ? global : window;
function test() {
    console.log(this === _global);//true
}
test();// 直接调用
```
-另一个直接调用的例子
```javascript
(function(_global) {
    // 通过 IIFE 限定作用域
    function test() {
        console.log(this === _global);// true
    }
    test();// 非全局作用域下的直接调用
})(typeof window === "undefined" ? global : window);
```
- 在这里,直接调用并不是指在全局作用域下进行调用,在任何作用域下,直接通过``函数名(...)``来对函数进行调用的方式,都称为直接调用.

### bind()对直接调用的影响
- ``Function.prototype.bind()``的作用是将当前函数与指定的对象绑定,并返回一个新函数,这个新函数无论以什么样的方式调用,其``this``始终指向绑定的对象.
- 一个例子:
```javascript
const obj = {};
function test(){
    console.log(this === obj);
}

const testObj = test.bind(obj);
test(); //false
testObj(); //true
```

- 模拟bind对this产生的影响
```javascript
const obj = {};
function test() {
    console.log(this === obj);
}

//自定义函数模拟bind()对this的影响
function myBInd(func,target) {
    return function() {
        return func.apply(target,arguments);
    }
}

const testObj = myBind(test,obj);
test(); //false
testObj(); //true
```
- 从上面的示例中,首先,通过闭包,保持了``target``即绑定的对象;然后在调用函数的时候,对原函数使用了``apply``方法来指定函数的``this``.当然原生的``bind()``实现可能会不同,而且更高效. 

### call和apply对this的影响
```javascript
const obj = {};
function test() {
    console.log(this === obj);
}
//绑定到一个新对象,而不是obj
const testObj = test.bind({});
test.apply(obj);//true
//期望this是obj,即输出true
//但是因为testObj绑定了不是obj的对象,所以会输出false
testObj.apply(obj); //false
```

### 方法调用
- 方法调用是指通过对象来调用其方法函数，它是 ``对象.方法函数(...)`` 这样的调用形式。这种情况下，函数中的 ``this`` 指向调用该方法的对象。但是，同样需要注意 ``bind()`` 的影响。
```javascript
const obj = {
    // 第一种方式，定义对象的时候定义其方法
    test() {
        console.log(this === obj);
    }
};

// 第二种方式，对象定义好之后为其附加一个方法(函数表达式)
obj.test2 = function() {
    console.log(this === obj);
};

// 第三种方式和第二种方式原理相同
// 是对象定义好之后为其附加一个方法(函数定义)
function t() {
    console.log(this === obj);
}
obj.test3 = t;

// 这也是为对象附加一个方法函数
// 但是这个函数绑定了一个不是 obj 的其它对象
obj.test4 = (function() {
    console.log(this === obj);
}).bind({});

obj.test();     // true
obj.test2();    // true
obj.test3();    // true

// 受 bind() 影响，test4 中的 this 指向不是 obj
obj.test4();    // false
```
- 这里需要注意的是，后三种方式都是预定定义函数，再将其附加给 ``obj`` 对象作为其方法。再次强调，函数内部的 ``this`` 指向与定义无关，受调用方式的影响。
### 方法中this指向全局对象的情况
- 注意这里说的是**方法**中而不是**方法调用**中。方法中的 ``this`` 指向全局对象，如果不是因为 ``bind()``，那就一定是因为不是用的方法调用方式
- 一个例子
```javascript
const obj = {
    test() {
        console.log(this === obj);
    }
};

const t = obj.test;
t();    // false
```
- ``t`` 就是 ``obj`` 的 ``test`` 方法，但是 ``t()`` 调用时，其中的 ``this`` 指向了全局。

- 之所以要特别提出这种情况，主要是因为常常将一个对象方法作为回调传递给某个函数之后，却发现运行结果与预期不符——因为忽略了调用方式对 ``this`` 的影响。比如下面的例子是在页面中对某些事情进行封装之后特别容易遇到的问题：
```javascript
class Handlers {
    // 这里 $button 假设是一个指向某个按钮的 jQuery 对象
    constructor(data, $button) {
        this.data = data;
        $button.on("click", this.onButtonClick);
    }

    onButtonClick(e) {
        console.log(this.data);
    }
}

const handlers = new Handlers("string data", $("#someButton"));
// 对 #someButton 进行点击操作之后
// 输出 undefined
// 但预期是输出 string data
```
- 很显然 ``this.onButtonClick`` 作为一个参数传入 ``on()`` 之后，事件触发时，是对这个函数进行的直接调用，而不是方法调用，所以其中的 ``this`` 会指向全局对象。要解决这个问题有很多种方法
```javascript
// 这是在 es5 中的解决办法之一
var _this = this;
$button.on("click", function() {
    _this.onButtonClick();
});

// 也可以通过 bind() 来解决
$button.on("click", this.onButtonClick.bind(this));

// es6 中可以通过箭头函数来处理，在 jQuery 中慎用
$button.on("click", e => this.onButtonClick(e));
```
- 不过请注意，将箭头函数用作 ``jQuery`` 的回调时造成要小心函数内对 ``this`` 的使用。``jQuery`` 大多数回调函数(非箭头函数)中的 ``this`` 都是表示调用目标，所以可以写 ``$(this).text()`` 这样的语句，但 ``jQuery`` 无法改变箭头函数的 ``this`` 指向，同样的语句语义完全不同。
### new调用
- es6之前,每个函数都可以是构造函数,通过new调用产生新的对象(函数无特定返回值的情况下);
- es6之后,``class``定义的类用``typeof``运算符得到的仍是``"function"``,但他不能像普通函数一样直接调用;同时``class``中定义的方法函数不能当做构造函数用``new``来调用;
- es5中,用``new``低啊用一个构造函数会创建一个新对象,其中this指向这个新对象.
```javascript
var data = 'Hi'; //全局变量
function AClass(data) {
    this.data = data;
}

var a = new AClass("Hello World");
console.log(a.data); //Hello World
console.log(data); //Hi

var b = new AClass("Hello World");
console.log(a === b); //false
```
### 箭头函数中的this
- 箭头函数没有自己的``this``绑定.箭头函数中使用的``this``,其实是直接包含他的那个函数或者函数表达式中的``this``.
- 一个例子:
```javascript
const obj = {
    test() {
        const arrow = () => {
            //这里的this是test()中的this
            //由test()的调用方式决定
            console.log(this === obj);
        }
        arrow();
    },
    getArrow() {
        return () => {
            // 这里的 this 是 getArrow() 中的 this，
            // 由 getArrow() 的调用方式决定
            console.log(this === obj);
        }
    }
}
obj.test();     //true

const arrow = obj.getArrow();
arrow();        //true
```
- 其中两个this都是由箭头函数的直接外层函数(方法)决定的,方法函数中的this是由其调用方式决定的.
- 上例的调用方式都是方法调用,所以this都指向方法调用的对象,即obj

- 箭头函数让大家在使用闭包的时候不需要太纠结 this，不需要通过像 _this 这样的局部变量来临时引用 this 给闭包函数使用。来看一段 Babel 对箭头函数的转译可能能加深理解：
```javascript
// ES6
const obj = {
    getArrow() {
        return () => {
            console.log(this === obj);
        };
    }
}    
// ES5，由 Babel 转译
var obj = {
    getArrow: function getArrow() {
        var _this = this;
        return function () {
            console.log(_this === obj);
        };
    }
};
```
- 另外需要注意的是，箭头函数不能用 ``new`` 调用，不能 ``bind()`` 到某个对象(虽然 ``bind()`` 方法调用没问题，但是不会产生预期效果)。不管在什么情况下使用箭头函数，它本身是没有绑定 ``this`` 的，它用的是直接外层函数(即包含它的最近的一层函数或函数表达式)绑定的 ``this``。