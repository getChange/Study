# Ajax
- 通过在后台与服务器进行少量数据交换，网页就可以实现局部或全部的变化
# 同步
- 客户端发起请求，服务端进行处理并相应，而客户端在等待， 当服务端响应完毕之后页面重新载入；当出现问题之后，还是会重复之前的步骤。     
# XMLHttpRequest - 用于后台与服务器进行数据的交换
- 应用HTML和CSS实现页面，表达信息；
- 运用XMLHttpRequest和web服务器进行数据的异步交换；
- 运用JavaScript操作DOM，实现动态局部刷新
# XMLHttpRequest对象(XHR)
- 1.实例化XHR对象
```javascript
//兼容当前所有主流浏览器
var request = new XMLHttpRequest();
//兼容IE6以下
var request = null;
if (window.XMLHttpRequest) {
    request = new XMLHttpRequest(); //IE7+,Firefox,Chrome,Opera,Safari
} else {
    request = new ActiveXObject("Microsoft.XMLHTTP");//IE6-
}
```
# HTTP
- http识计算机通过网络进行通信的规则；无状态的协议；
## HTTP请求的7个步骤
- 1.建立TCP连接
- 2.Web浏览器想Web服务器发送请求命令
- 3.Web浏览器发送请求头信息
- 4.Web服务器应答
- 5.Web服务器发送应答头信息
- 6.Web服务器向浏览器发送数据
- 7.Web服务器关闭TCP连接

## HTTP请求组成部分
- 1.请求方法：GET/POST
- 2.正在请求的URL
- 3.请求头
- 4.请求体

### GET（幂等）
- 用于信息获取；使用URL传递参数；对传递的信息数量有限制；默认HTTP请求的方法；一般用于查询；
### POST
- 用于修改服务器上的资源；对所发信息的数量无限制

## HTTP响应
- 1.状态码，成功或失败
- 2.响应头
- 3.响应体

### 状态码
- 1xx：信息类，表示收到Web浏览器请求，正进行进一步的处理
- 2xx：成功，表示用户请求被正确接收，理解和处理；
- 3xx：重定向，表示请求没成功，客户必须采取进一步的动作；
- 4xx：客户端错误，表示客户端提交的请求有错误；
- 5xx：服务器错误，表示服务器不能完成对请求的处理；

## XMLHttpRequest发送请求
- open(method,url,async)
    - method:GET/POST 不区分大小写
    - url:请求的地址，相对文档的地址
    - async:请求异/同步，默认为true
- send(string)
    - GET：不填写string或者none
    - POST：需要填写
- request.setRequestHeader('Content-type','application/x-www-form-urlencoded')必须放在
`open`和`send`之间，否则会报错；    

## XMLHttpRequest取得响应
- responseText：获得字符串形式的响应数据
- responseXML：获得XML形式的响应数据
- status和statusText：以数字和文本形式返回HTTP状态码
- getAllResponseHeader():获取所有的响应报头
- getResponseHeader():查询响应中的某个字段的值
- readyState属性：
    - 0：请求初始化，open还没有调用
    - 1：服务器连接已建立，open已经调用
    - 2：请求已接受
    - 3：请求处理中
    - 4：请求已完成
```javascript
//基本的XHR请求过程
var request = new XMLHttpRequest();

request.open('GET','index.html'，true)；

request.send();

request.onreadystatechange = function () {
    if(request.readyState === 4 && request.status === 200){
        request.responseText
    }
}
```    

## AJAX实例 
- `GET`请求
```javascript
//基本的XHR请求过程
var request = new XMLHttpRequest();

//GET请求必须将请求的参数放在地址内进行发送
request.open('GET','service.php?name='+keyWords.value)；

request.send();

request.onreadystatechange = function () {
    if(request.readyState === 4 && request.status === 200){
        xx.innerHTML = request.responseText//渲染页面
    }
}
```
- `POST`请求
```javascript
//基本的XHR请求过程
var request = new XMLHttpRequest();

//post请求不需要讲请求参数放到地址内
request.open('POST','service.php')；

//请求的参数单独书写
var data = "name=" + staffName.value +
                "&number=" + staffNumber.value +
                "&sex=" + staffSex.value +
                "&job=" + staffJob.value;

//发送POST请求必须添加请求头    
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')；

//data就是要传递的数据
request.send(data);

request.onreadystatechange = function () {
    if(request.readyState === 4 && request.status === 200){
        xx.innerHTML = request.responseText//渲染页面
    }
}
```

# JSON
## 基本概念
- JavaScript对象表示方法（JavaScript Object Notation）；
- 存储和交换文本信息的语法，类似XML。采用键值对的方式组织；
- 独立于语言，任何语言都可以使用。

## 与XML对比
- 长度小
- 读写速度快
- 使用JavaScript内奸的方法进行解析，转换成JavaScript对象方便

## JSON解析方式
- `eval()`方法
    - `eval()`可以解析，解释并返回JavaScript对象和数组;不会理解字符串中的执行方法；
    - `eval()`这个方法在旧版本浏览器对JSON数据求值存在风险，可能会执行一些恶意代码
```javascript
//语法
var jsondata = '{"staff":[{"name": "monkey","age": 70},{"name": "D","age": 18}, {"name": "luffy","age": 22}]}'

var jsonObj = eval('(' + jsondata + ')');
```
- `JSON.parse()`方法（重点推荐）
```javascript
var jsondata = '{"staff":[{"name": "monkey","age": 70},{"name": "D","age": 18}, {"name": "luffy","age": 22}]}'

var jsonObj = JSON.parse(jsondata);
```

# jQuery实现Ajax
- `jQuery.ajax([settings])`
    - `type`: 类型,`GET`或者`POST`，默认`GET`
    - `url`:发送请求地址
    - `data`: 一个对象，连同请求发送到服务器的数据
    - `dataType`:预期服务器返回类型。`json`格式
    - `success`:请求成功的回调函数
    - `error`:请求失败的回调函数

# 跨域


   
# PHP
- 创建动态交互性站点的服务器端脚本语言。
- 生成动态页面内容
- 创建、打开、读取、写入、删除以及关闭服务器上的文件
- 接收表单数据
- 发送并取回cookies
- 添加、删除、修改数据库
- 限制用户访问网站中的某些页面
## PHP代码
- `PHP`脚本以`<?php`开头，以`?>`结尾
- 默认扩展名`.php`
- `PHP`语句以分号（;）结尾
