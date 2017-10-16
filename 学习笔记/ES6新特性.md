# 1.函数参数默认值
### 不使用ES6
- 为函数的参数设置默认值:
```javascript
function foo(height,color) {
    var height = height || 50;
    var color = color || 'red';
    // ...
}
```

### 使用ES6
```javascript
function foo(height = 50, color = 'red') {
    //...
}
```

# 2.模板字符串
### 不使用ES6
- 使用`+`号将变量拼接为字符串
```javascript
var name = 'Your name is ' + first + "" + last + ".";
```
### 使用ES6
- 将变量放在大括号之中:
```javascript
var name = "Your name is ${first} ${last}.";
```
- `ES6`更加简洁直观.

# 3.多行字符串
### 不使用ES6
- 使用`\n\t`将多行字符串拼接起来
```javascript
var roadPoem = 'Then took the other, as just as fair,\n\t'
    + 'And having perhaps the better claim\n\t'
    + 'Because it was grassy and wanted wear,\n\t'
    + 'Though as for that the passing there\n\t'
    + 'Had worn them really about the same,\n\t';
```
### 使用ES6
- 将多行字符串放在反引号``之间
```javascript
var roadPoem = `Then took the other, as just as fair,
    And having perhaps the better claim
    Because it was grassy and wanted wear,
    Though as for that the passing there
    Had worn them really about the same,`
```
# 4.解构赋值
### 不使用ES6
- 当需要获取某个对象的属性值时,需要单独获取
```javascript
var data = $('body').data(); //data有house和mouse属性
var house = data.house;
var mouse = data.mouse;
```
### 使用ES6
- 一次性获取对象的子属性
```javascript
var {house,mouse} = $('body').data();
```
- 对于数组也是一样的
```javascript
var [col1,col2] = $('.column');
```

# 5.对象属性简写
### 不使用ES6
- 对象中必须包含属性和值,想得非常多余
```javascript
var bar = 'bar';
var foo = function () {
    // ...
}
var baz = {
  bar: bar,
  foo: foo
};
```
### 使用ES6
- 对象中直接写变量
```javascript
var bar = 'bar';
var foo = function () {
    // ...
}

var baz = {bar,foo};
```

# 6.箭头函数
### 不使用ES6
- 普通函数体内的`this`,指向调用时所在的对象
```javascript
function foo() {
    console.log(this.id);
}
var id = 1;
foo();//输出1
foo.call({id:2});//输出2
```
### 使用ES6
- 箭头函数体内的`this`,就是定义时所在的对象,而不是调用时所在的对象
```javascript
var foo = () => {
    console.log(this.id);
}
var id = 1;
foo(); //输出1
foo.call({id:2});//输出1
```

# 7.Promise
### 不使用ES6
- 嵌套两个`setTimeout`会调函数
```javascript
setTimeout(function() {
    console.log('Hello'); //1秒后输出"Hello"
    setTimeout(function() {
        console.log("Fundebug");//2秒后输出"Fundebug"
    },1000);
},1000);
```
### 使用ES6
- 使用两个`then`是异步编程串行化,避免回调地狱
```javascript
var wait1000 = new Promise(function(resolve,reject) {
    setTimeout(resolve,1000);
});

wait1000
    .then(function() {
        console.log('Hello'); //1秒后输出"Hello"
        return wait1000;
    })
    .then(function() {
        console.log("Fundebug");//2秒后输出"Fundebug"
    });
```

# 8.Let & Const
### 使用`var`
- `var`定义的变量为函数级作用域:
```javascript
{var a = 10;}
console.log(a);//10
```
### 使用`let`和`const`
- `let`定义的变量为块级作用域,会报错;
```javascript
{let a = 10;}
console.log(a);//报错:"ReferenceError: a is not defined"
```

# 9.类
### 不使用ES6
- 使用构造函数创建对象:
```javascript
function Point(x, y) {
    this.x = x;
    this.y = y;
    this.add = function() {
        return this.x + this.y;
    };
}
var p = new Point(1, 2);
console.log(p.add()); // 输出3
```
### 使用ES6
- 使用`Class`定义类,更加规范,且能够继承
```javascript
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add() {
        return this.x + this.y;
    }
}
var p = new Point(1, 2);
console.log(p.add()); // 输出3
```

# 10. 模块化
- `JavaScript`一直没有官方的模块化解决方案，开发者在实践中主要采用`CommonJS`和`AMD`规范。而`ES6`制定了模块`(Module)`功能。

### 不使用ES6

- `Node.js`采用`CommenJS`规范实现了模块化，而前端也可以采用，只是在部署时需要使用`Browserify`等工具打包。这里不妨介绍一下`CommenJS`规范。
- `module.js`中使用`module.exports`导出`port`变量和`getAccounts`函数：
```javascript
module.exports = {
  port: 3000,
  getAccounts: function() {
    ...
  }
}
```
- `main.js`中使用`require`导入`module.js`：
```javascript
var service = require('module.js')
console.log(service.port) // 输出3000
```
### 使用ES6

- ES6中使用export与import关键词实现模块化。

- `module.js`中使用`export`导出`port`变量和`getAccounts`函数：
```javascript
export var port = 3000
export function getAccounts(url) {
  ...
}
```
- `main.js`中使用`import`导入`module.js`，可以指定需要导入的变量：
```javascript
import {port, getAccounts} from 'module'
console.log(port) // 输出3000
```
- 也可以将全部变量导入：
```javascript
import * as service from 'module'
console.log(service.port) // 3000
```
