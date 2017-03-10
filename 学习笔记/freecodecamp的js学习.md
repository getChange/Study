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


