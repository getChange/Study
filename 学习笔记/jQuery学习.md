# jQuery的学习
## 入口函数
```javascript
//第一种方式
$(document).ready(function() {

});

//第二种方式
$(function() {

})
```
## Target Elements by Class Using jQuery
- .addClass()为当前元素添加类名
```javascript
//为button添加类名
$(document).ready(function() {
    $("button").addClass("animated bounce");
});
```

## Remove classes from an element with jQuery
- .removeClass()移除当前元素的类名
```javascript
$(document).ready(function() {
    $("button").removeClass("btn-default");
});
```

## Change the CSS of an Element Using jQuery
- .css()修改当前元素的样式
```javascript
$(document).ready(function() {
    $("#target1").css("color", "blue");
});
```

## Disable an Element Using jQuery
- .prop()修改当前元素的属性值
```javascript
$(document).ready(function() {
    $("#target1").prop("disabled", true);
});
```

## Change Text Inside an Element Using jQuery
- .html()和.text()修改当前目标的内容
```javascript
$(document).ready(function() {
    $("#target4").html("<em>jQuery Playground</em>");
});
```
- jQuery的.html()方法通常会文本和标签分别进行展示;
- jQuery 还有一个类似的方法叫.text()，它只能改变文本但不能修改标记。这个方法只会把传进来的任何东西(包括标记)当成文本来显示。

## Remove an Element Using jQuery
- .remove()移除当前元素
```javascript
$(document).ready(function() {
    $("#target4").remove();
});
```

## Use appendTo to Move Elements with jQuery
- .appendTo()把选中的元素添加到其他元素中
```javascript
$(function() {
    $("#target4").appendTo("#left-well");
})
```

## Clone an Element Using jQuery
- .clone()拷贝元素
```javascript
$(function(){
    $("#target2").clone().appendTo("#left-well");
})
```

## Target the Parent of an Element Using jQuery
- .parent()允许访问指定元素的父元素
```javascript
$(function() {
    $("#left-well").parent().css("background-color", "blue");
})
```

## Target the Children of an Element Using jQuery
- .children()允许访问指定元素的子元素
```javascript
$(function() {
    $("#left-well").children().css("color", "blue");
})
```

## Target a Specific Child of an Element Using jQuery
- jQuery 用CSS选择器来选取元素，target:nth-child(n) CSS选择器允许你按照索引顺序(从1开始)选择目标元素的所有子元素。
```javascript
$(function() {
    $(".target:nth-child(2)").addClass("animated bounce");
})
```

## Target Even(Odd) Numbered Elements Using jQuery
- :odd(:even) 选择元素为奇数(偶数)的元素

## 事件委托代理
- `.on()`

## Ajax方法
- `$.getJSON("url",function(){})`