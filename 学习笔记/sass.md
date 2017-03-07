# sass

### 变量
- sass中可以使用变量
```css
$fontStack:sans-serif;
$primaryColor:#333;

body{
    font-family:$fontStack;
    color:$primaryColor;
}
```

### 嵌套

### 导入
- @import "文件名"

### mixin
- sass中可用mixin定义一些代码片段,且可传参数
```sass
@mixin box-sizing ($sizing) {
     -webkit-box-sizing:$sizing;     
       -moz-box-sizing:$sizing;
            box-sizing:$sizing;
}

.box-border{
    border:1px solid #ccc;
    @include box-sizing(border-box);
}
```

### 扩展/继承
- sass可通过@extend来实现代码组合声明
- sass书写样式
```sass
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  @extend .message;
  border-color: green;
}

.error {
  @extend .message;
  border-color: red;
}

.warning {
  @extend .message;
  border-color: yellow;
}    
```
- css展示样式
```css
.message, .success, .error, .warning {
  border: 1px solid #cccccc;
  padding: 10px;
  color: #333;
}

.success {
  border-color: green;
}

.error {
  border-color: red;
}

.warning {
  border-color: yellow;
}
```
### 运算
- sass可进行简单的运算

### 颜色
- sass集成了大量的颜色函数
- sass书写样式
```sass
$linkColor: #08c;
a {
    text-decoration:none;
    color:$linkColor;
    &:hover{
      color:darken($linkColor,10%);
    }
}
```
- css得到样式
```css
a {
    text-decoration: none;
    color: #0088cc;
}
a:hover {
    color: #006699;
}
```
