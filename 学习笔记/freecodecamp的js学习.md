# JavaScript
## 注释
- 注释分为单行注释(//)和多行注释(/* */);

## data types(数据类型)
- undefined（未定义）
- null(空) 
- boolean（布尔型）
- string（字符串）
- symbol(符号)
- number（数字）
- object（对象）

## 变量
- ``Variables``（变量）允许计算机以一种动态的形式来存储和操作数据，通过操作指向数据的指针而不是数据本身来避免了内存泄露，以上的七种数据类型都可以存储到一个变量（variable）中。
- 通过在变量的前面使用关键字var，我们告诉 JavaScript 来创建或者 declare（声明）一个变量

## 浮点数
- 小数存储到变量中。小数也被称作 浮点数 。
- 提示:不是所有的实数都可以用 浮点数 来表示。因为可能存在四舍五入的错误

## Escaping Literal Quotes in Strings
- 在 JavaScript 中，你可以通过在引号前面使用 反斜杠 (\) 来转义引号。
```javascript
var sampleStr = "Alan said, \"Peter is learning JavaScript\".";
```
- 这标志着提醒 ``JavaScript`` 单引号或双引号并不是字符串的结尾，而是出现在字符串内的字符。所以，如果你要打印字符串到控制台，你将得到：
```javascript
Alan said, "Peter is learning JavaScript".
```

- 字符串中的转义序列
> 引号不是字符串中唯一的可以被转义字符。下面是常见的转义序列列表:

> \'	单引号

> \"	双引号

> \\	反斜杠符

> \n	换行符

> \r	回车符

> \t	制表符

> \b	退格符

> \f	换页符

## 获取其他位置字符串
- 使用 [索引]来获得一个字符串中的其他位置的字符。

## 得到字符串的长度
- 你可以通过在字符串变量或字符串后面写上 .length 来获得字符串变量 字符串 值的长度。

## 最后一位字符串
- 得到一个字符串的最后一个字符，用[字符串的长度减去一]


## 函数 function 
### 自定义函数
```javascript
function myFunction() {
    console.log("Hi World");
}

myFunction();
```
- 传入参数的函数
```javascript
function myFunction(a,b) {
    console.log(a - b);
}

myFunction(10, 5);
```

### 函数的作用域
> 在 JavaScript 中， ``作用域`` 涉及到变量的作用范围。在函数外定义的变量具有 全局 作用域。这意味着，具有全局作用域的变量可以在代码的任何地方被调用。

> 这些没有使用**var**关键字定义的变量，会被自动创建在全局作用域中，形成全局变量。当在代码其他地方无意间定义了一个变量，刚好变量名与全局变量相同，这时会产生意想不到的后果。因此你应该总是使用var关键字来声明你的变量。

### 局部变量与全局变量
- 一个程序中有可能具有相同名称的 **局部** 变量和**全局**变量。在这种情况下，**局部** 变量将会优先于 **全局** 变量。

### return语句
- 可以把数据通过函数的 ``参数`` 来传入函数，也可以使用 ``return`` 语句把数据从一个函数中传出来。

- 把一个函数的返回值，赋值给一个变量。
```javascript
// Setup
var processed = 0;

function process(num) {
  return (num + 3) / 5;
}

// Only change code below this line

processed = process(7);
```

### 队列
- 队列:一个抽象的数据结构，队列中的条目都是有秩序的。新的条目会被加到 ``队列`` 的末尾，旧的条目会从 ``队列`` 的头部被移出。
```javascript
/*
* 写一个函数 queue ，用一个数组arr和一个数字item作为参数。
* 数字item添加到数组的结尾，然后移出数组的第一个元素，
* 最后队列函数应该返回被删除的元素。
*/
function queue(arr, item) {
  // Your code here
  arr.push(item);
  var result=arr.shift(arr[0]);
  return result;  // Change this line
}

// Test Setup
var testArr = [1,2,3,4,5];

// Display Code
console.log("Before: " + JSON.stringify(testArr));
console.log(queue(testArr, 6)); // Modify this line to test
console.log("After: " + JSON.stringify(testArr));
```

### 函数中的布尔值
- ``布尔`` 值要么是 ``true`` 要么是 ``false`` 。它非常像电路开关， ``true`` 是“开”， ``false`` 是“关”。这两种状态是互斥的。
```javascript
function mtFunction() {
    return false;//函数最后返回错误,无法执行
    //return true;//函数返回真,执行 
}
```

###  ``if`` 语句
- ``If`` 语句用于在代码中做条件判断。关键字 ``if`` 告诉 ``JavaScript`` 在小括号中的条件为真的情况下去执行定义在大括号里面的代码。这种条件被称为 ``Boolean`` 条件，因为他们只可能是 ``true（真）``或 ``false（假）``。

- 当条件的计算结果为 ``true`` ，程序执行大括号内的语句。当布尔条件的计算结果为 ``false``，大括号内的代码将不会执行。
```javascript
//if语法格式
if(条件为真){
  语句被执行
}

//示例
function test (myCondition) {
  if (myCondition) {
     return "It was true";
  }
  return "It was false";
}
test(true);  // returns "It was true"
test(false); // returns "It was false"
```
- ``if``语句中的比较判断
    - `==`
    - `===`
    - `!==`
    - `!=`
    - `>`
    - `>=`
    - `<`
    - `<=`
    - `&&`
### `switch`语句
- 非常多的选项需要选择，可以使用switch语句。根据不同的参数值会匹配上不同的case分支，语句会从第一个匹配的case分支开始执行，直到碰到break就结束。
```javascript
switch (num) {
  case value1:
    statement1;
    break;
  case value2:
    statement2;
    break;
...
  case valueN:
    statementN;
    break;
}
```
### 对象的书写方法
- 普通的对象书写 
```javascript
  var obj = {
    'name':"luffy"
  }
```    
- 通过`对象.属性名`获取对象
```javascript
  var obj = {
    'name':'luffy'
  }

  var haizeiwang = obj.name //luffy
```
- 当访问的属性名有空格
```javascript
  var myObj = {
    "Space Name": "Kirk",
    "More Space": "Spock"
  };
  myObj["Space Name"]; // Kirk
  myObj['More Space']; // Spock
```
- 中括号操作符--用变量来访问一个属性。遍历对象的属性列表或查表时，这种方式极为有用。
```javascript
  var someProp = "propName";
  var myObj = {
    propName: "Some Value"
  }
  myObj[someProp]; // "Some Value"


  var someProp = "propName";
  var myObj = {
    propName: "Some Value"
  }
  myObj[someProp]; // "Some Value"
```
- 点操作符或中括号操作符来更新对象的属性(可以修改或者添加)
```javascript
  var ourDog = {
    "name": "Camper",
    "legs": 4,
    "tails": 1,
    "friends": ["everything!"]
  };

  ourDog.name = "Happy Camper";

  ourDog["name"] = "Happy Camper";
```
- 删除对象的属性
```javascript
  delete ourDog.bark;
```
- 使用键值对代替`switch`或`if/else`语句
```javascript
  var alpha = {
    1:"Z",
    2:"Y",
    3:"X",
    4:"W",
    ...
    24:"C",
    25:"B",
    26:"A"
  };
  alpha[2]; // "Y"
  alpha[24]; // "C"

  var value = 2;
  alpha[value]; // "Y"
```
### 对象检测方法
- `.hasOwnProperty(propname)`方法来检查对象是否有该属性
```javascript
var myObj = {
  top: "hat",
  bottom: "pants"
};
myObj.hasOwnProperty("top");    // true
myObj.hasOwnProperty("middle"); // false
```

### JSON对象
- `JavaScript Object Notation` 简称 `JSON`，它使用`JavaScript`对象的格式来存储数据。JSON是灵活的，因为它允许 `数据结构` 是 `字符串`，`数字`，`布尔值`，`字符串`，和 `对象` 的任意组合。
- 数组中有多个 `JSON` 对象的时候，对象与对象之间要用逗号隔开。
```javascript
var ourMusic = [
  {
    "artist": "Daft Punk",
    "title": "Homework",
    "release_year": 1997,
    "formats": [ 
      "CD", 
      "Cassette", 
      "LP" ],
    "gold": true
  }
];
```
- `JSON.parse(text[, reviver])`解析JSON字符串, 可以选择改变前面解析后的值及其属性，然后返回解析的值。

  > `text`要被解析成JavaSctipt值的字符串
  
  >  `reviver`(可选)如果是一个函数，则规定了原始值如何被解析改造，在被返回之前。

  - 返回值: Object对应给定的JSON文本。
```javascript
JSON.parse('{}');              // {}
JSON.parse('true');            // true
JSON.parse('"foo"');           // "foo"
JSON.parse('[1, 5, "false"]'); // [1, 5, "false"]
JSON.parse('null');            // null
```  
- `JSON.stringify(value[, replacer [, space]])`返回指定值的 JSON 字符串，可以自定义只包含某些特定的属性或替换属性值。

  > `value`:将要序列化成 JSON 字符串的值。
  > `replacer`: (可选)
  
    - 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；
    - 如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；
    - 如果该参数为null或者未提供，则对象所有的属性都会被序列化；

  > space (可选):指定缩进用的空白字符串，用于美化输出（pretty-print）；
    
    - 如果参数是个数字，它代表有多少的空格；上限为10。改值若小于1，则意味着没有空格；
    - 如果该参数为字符串(字符串的前十个字母)，该字符串将被作为空格；
    - 如果该参数没有提供（或者为null）将没有空格。 
  - 返回值: 一个表示给定值的JSON字符串。  
```javascript
JSON.stringify({});                        // '{}'
JSON.stringify(true);                      // 'true'
JSON.stringify("foo");                     // '"foo"'
JSON.stringify([1, "false", false]);       // '[1,"false",false]'
JSON.stringify({ x: 5 });                  // '{"x":5}'

JSON.stringify({x: 5, y: 6});              
// "{"x":5,"y":6}"

JSON.stringify([new Number(1), new String("false"), new Boolean(false)]); 
// '[1,"false",false]'

JSON.stringify({x: undefined, y: Object, z: Symbol("")}); 
// '{}'

JSON.stringify([undefined, Object, Symbol("")]);          
// '[null,null,null]' 

JSON.stringify({[Symbol("foo")]: "foo"});                 
// '{}'

JSON.stringify({[Symbol.for("foo")]: "foo"}, [Symbol.for("foo")]);
// '{}'

JSON.stringify(
    {[Symbol.for("foo")]: "foo"}, 
    function (k, v) {
        if (typeof k === "symbol"){
            return "a symbol";
        }
    }
);


// undefined 

// 不可枚举的属性默认会被忽略：
JSON.stringify( 
    Object.create(
        null, 
        { 
            x: { value: 'x', enumerable: false }, 
            y: { value: 'y', enumerable: true } 
        }
    )
);

// "{"y":"y"}"
``` 
### `for`循环
```javascript
for ([初始化]; [条件判断]; [计数器]){
  //循环体
}

//初始化语句只会在执行循环开始之前执行一次。它通常用于定义和设置你的循环变量。

//条件判断语句会在每一轮循环的开始执行，只要条件判断为 true 就会继续执行循环。当条件为 false的时候，循环将停止执行。这意味着，如果条件在一开始就为 false，这个循环将不会执行。

//计数器是在每一轮循环结束时执行，通常用于递增或递减。
```  
### `while`循环   

### `Math.random()`随机数
- 生成介于两个数之间的随机数
```javascript
Math.floor(Math.random() * (max - min + 1)) + min
```  

### 正则表达式
- 定义:用来根据某种匹配模式寻找`strings`
- 举例:`/the/gi`
  - `/` 是这个正则表达式的头部

  - `the` 是我们想要匹配的模式

  - `/` 是这个正则表达式的尾部

  - `g` 代表着 `global(全局)`，意味着返回所有的匹配而不仅仅是第一个。

  - `i` 代表着忽略大小写，意思是当我们寻找匹配的字符串的时候忽略掉字母的大小写。
- 1 数字选择器`\d`:被用来获取一个字符串的数字,javascript中,数字选择器类似于`/\d/g`;`/\d+/g`表示它允许这个证者表达是匹配一个或更多数字.
- 2 使用正则表达式选择器 `\s` 来选择一个字符串中的空白。

  > 空白字符有 `" "(空格符)`、`\r (回车符)`、`\n (换行符)`、`\t (制表符)` 和 `\f (换页符)`。
  
  > 空白正则表达式类似于：`/\s+/g`
- 3 用正则表达式选择器的大写版本来转化任何匹配。    

# 面向对象

## 构造函数

- 除了普通的方式可以创建对象,我们也可以使用构造函数来创建对象,`构造函数`通常使用大写字母开头
```javascript
var Car = function() {
  this.wheels = 4;
  this.engines = 1;
  this.seats = 1;
};
```
  - 在 `构造函数` 中， `this` 指向被此 `构造函数` 创建出来的 `对象` 。
  ```
    this.wheels = 4;
  ```
  - 这时，Car创建出来的新对象将带有 `wheels` 属性，并且赋值为 `4`.`构造函数` 描述了它所创建出来的对象

### `new`关键字
- 使用构造函数时,通过在它前面使用`new`关键字进行调用
```javascript
var myCar = new Car();
```
- `myCar`现在成为Car的一个实例(instance),它被构造函数描述成
```javascript
{
  wheels : 4 ,
  engines : 1,
  seats : 1
}
```

- **要使用关键字`new`调用构造函数**。Javascript才知道这是要去构造一个新 对象 ，并且把构造函数中的 this 指向这个新对象。
- 创意一个实例之后,它可以像普通对象一样被使用,创建,修改,访问他的属性

### 对象私有化
- 对象拥有自己的特征，称为 `属性`，对象还有自己的函数，称为 `方法` 。
- `私有属性` 和 `私有方法` ，它们两个在对象外部是不可访问的。

### javascript实现阶乘
```
1. 0的阶乘是1
2. n! = n * (n-1) * (n-2) * (n-3) * ... * 3 * 2 * 1
```

```javascript
//函数的阶乘factorial()
factorial(0) = 1;
factorial(n) = n * factorial(n-1);
```
- 实现方法一
```javascript
function factorial(num) {
    if (num < 0) {
        return -1;
    } else if (num === 0 || num === 1) {
        return 1;
    } else {
        for (var i = num - 1; i >= 1; i--) {
            num *= i;
        }
    }
    return num;
}
```
- 实现方法二
```javascript
function factorial(num) {
    var result = num;
    if (num < 0) {
        return -1;
    } else if (num === 0 || num === 1) {
        return 1;
    } else {
        while (num > 1) {
            num--;
            result *= num;
        }
    }
    return result;
}
```
- 实现方法三
```javascript
function factorial(num) {
    if (num < 0) {
        return -1;
    } else if (num === 0 || num === 1) {
        return 1;
    } else {
        return (num * factorial(num - 1));
    }
}
```

### JavaScript算法:回文处理
- 回文处理:对应位置上的字符串与倒数相对应位置的字符串相同
- 重点使用的方法:`.replace()` `.toLowerCase()`
- `.replace()`使用正则表达式来忽略文中的字母的大小写,标点符号,空白

  - 正则表达式

    - `/[^A-Za-z0–9]/g`或`/[\W_]/g`(删除所有非字母数字字符,匹配一个非单字字符)

  - String.prototype.toLowerCase()
  - String.prototype.replace()
  - String.prototype.split()
  - Array.prototype.reverse()
  - Array.prototype.join()
  - String.length
  - for
  
### JavaScript算法:找到字符串中最长的单词的长度
-    