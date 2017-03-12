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

## 数组的方法
- 选取一个数组 ``array[index]`` index为索引值 从零开始
```javascript
var array=[1,2,3,4,5];

array[0]; //1;

var manyArray = [[1,2],[3,4,5],[7,8],9,10];

manyArray[0];//[1,2]
manyArray[0][0];//1
```
- 数组的push方法:``.push()`` 接受把一个或多个参数，并把它“推”入到数组的末尾。
```javascript
var arr = [1,2,3];
arr.push(4);
// 现在arr的值为 [1,2,3,4]
```
- 数组的pop方法:``.pop()`` 函数用来“抛出”一个数组末尾的值。
> 数组中任何类型的条目（数值，字符串，甚至是数组）可以被“抛出来” 。
```javascript
var myArray = [["John", 23], ["dog", 3]];

var removedFromMyArray = myArray.pop();//["dog",3]
```
- 数组的shift方法:``.shift()`` 函数用来“抛出”一个数组第一个数的值。
```javascript
var myArray = [["John", 23], ["dog", 3]];

var removedFromMyArray = myArray.shift();//["John", 23]
```
- 数组的unshift方法:``.unshift()`` 函数在数组的头部添加元素。
```javascript
var myArray = [["John", 23], ["dog", 3]];

myArray.unshift(["mike",23]);//[["mike",23], ["John", 23], ["dog", 3]]
```
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
    - ==
    - ===
    - !==
    - !=
    - >
    - >=
    - <
    - <=
    - &&