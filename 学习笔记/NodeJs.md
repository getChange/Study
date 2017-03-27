# NodeJS
## NodeJS基础
#### 什么是NodeJS
    > JS是脚本语言，脚本语言都需要一个解析器才能运行。对于写在HTML页面里的JS，浏览器充当了解析器的角色。而对于需要独立运行的JS，NodeJS就是一个解析器。

    > 每一种解析器都是一个运行环境，不但允许JS定义各种数据结构，进行各种计算，还允许JS使用运行环境提供的内置对象和方法做一些事情。例如运行在浏览器中的JS的用途是操作DOM，浏览器就提供了document之类的内置对象。而运行在NodeJS中的JS的用途是操作磁盘文件或搭建HTTP服务器，NodeJS就相应提供了fs、http等内置对象。
#### NodeJS用处    
    > NodeJS的目的是为了实现高性能Web服务器，事件机制和异步IO模型的优越性.

#### NodeJS安装
    > [nodejs.org](https://nodejs.org/zh-cn/)  
#### NodeJS运行
- 打开终端，键入node进入命令交互模式，可以输入一条代码语句后立即执行并显示结果，例如：

```
$ node
> console.log('Hello World!');
Hello World!
```

- 如果要运行一大段代码的话，可以先写一个JS文件再运行。例如有以下hello.js。
```
function hello() {
    console.log('Hello World!');
}
hello();
```

- 写好后在终端下键入node hello.js运行，结果如下：

```
$ node hello.js
Hello World!
```

- 权限问题

    > 在Linux系统下，使用NodeJS监听80或443端口提供HTTP(S)服务时需要root权限，有两种方式可以做到。

    > 一种方式是使用sudo命令运行NodeJS。例如通过以下命令运行的server.js中有权限使用80和443端口。一般推荐这种方式，可以保证仅为有需要的JS脚本提供root权限。

    ```
    $ sudo node server.js
    ```

    > 另一种方式是使用chmod +s命令让NodeJS总是以root权限运行，具体做法如下。因为这种方式让任何JS脚本都有了root权限，不太安全，因此在需要很考虑安全的系统下不推荐使用。

    ```
    $ sudo chown root /usr/local/bin/node
    $ sudo chmod +s /usr/local/bin/node    
    ``` 
#### 模块
- 编写每个模块时,都会有``require``、``exports``、``module``三个预先定义好的变量可供使用.

##### require
- ``require``函数用于当前模块加载和使用别的模块,传入一个模块名,返回一个模块导出的对象.模块名可以使用绝对路径或者相对路径
```javascript
var foo1 = require('./foo');
var foo2 = require('./foo.js');
var foo3 = require('/home/user/foo');
var foo4 = require('/home/user/foo.js');

// foo1至foo4中保存的是同一个模块的导出对象。
```  
- 可以加载使用一个json文件
```javascript
var data = require('./data.json');
```  
##### exports
- ``exports``对象是当前模块的导出对象.用于导出模块公有方法和属性.别的模块通过``require``函数使用当前模块时得到的就是当前模块的``exports``对象
```javascript
exports.hello = function () {
    console.log('Hello World!');
};
```
##### module
- 通过``module``对象可以访问到当前模块的信息,最多的用途是替换当前模块的导出对象.
```javascript
module.exports = function() {
    console.log("Hello World");
}
//模块默认导出对象被替换为一个函数
```
##### 模块初始化
- 一个模块中的JS代码仅在模块第一次被使用时执行,并在执行过程中初始化模块的导出对象.之后缓存起来的导出对象被重复利用.
##### 主模块
- 通过命令行参数传递给NodeJS以启动程序的模块被称为主模块.主模块负责调度组成整个程序的其它模块完成工作.
```javascript
node main.js;//main.js 主模块
```
##### 完整案例
- 例如有以下目录。
```
- /home/user/hello/
    - util/
        counter.js
    main.js
```    
- 其中counter.js内容如下：
```javascript
var i = 0;

function count() {
    return ++i;
}

exports.count = count;
```
- 该模块内部定义了一个私有变量i，并在exports对象导出了一个公有方法count。

- 主模块main.js内容如下：
```javascript
var counter1 = require('./util/counter');
var counter2 = require('./util/counter');

console.log(counter1.count());
console.log(counter2.count());
console.log(counter2.count());
```
- 运行该程序的结果如下：
```javascript
$ node main.js
1
2
3
```
- 可以看到，counter.js并没有因为被require了两次而初始化两次。
#### 小结
- NodeJS是一个JS脚本解析器，任何操作系统下安装NodeJS本质上做的事情都是把NodeJS执行程序复制到一个目录，然后保证这个目录在系统PATH环境变量下，以便终端下可以使用``node``命令。

- 终端下直接输入node命令可进入命令交互模式，很适合用来测试一些JS代码片段，比如正则表达式。

- NodeJS使用CMD模块系统，主模块作为程序入口点，所有模块在执行过程中只初始化一次。

- 除非JS模块不能满足需求，否则不要轻易使用二进制模块，否则你的用户会叫苦连天。

## 代码的组织和部署
##### 模块路径解析规则
- require请求路径的三种方式
    - ``/``或者盘符(``C:``)开头的绝对路径
    - ``./``的相对路径
    - 依照以下规则解析路径,直到找到模块位置
    
    ```javascript
     1.内置模块
        如果传递给require函数的是NodeJS内置模块名称,不做路径解析,直接返回内部模块的导出对象,如require('fs');
     2.node_modules目录
        NodeJS定义了一个特殊的node_modules目录用于存放模块. 例如某个模块的绝对路径是/home/user/hello.js，在该模块中使用require('foo/bar')方式加载模块时，则NodeJS依次尝试使用以下路径。
        
        /home/user/node_modules/foo/bar
        /home/node_modules/foo/bar
        /node_modules/foo/bar   
     3.NODE_PATH环境变量
        与PATH环境变量相似,NodeJS允许通过NODE_PATH环境变量来指定额外的模块搜索路径。NODE_PATH环境变量中包含一个到多个目录路径，路径之间在Linux下使用：分割，在Windows下使用；来分割。

        例如定义了以下NODE_PATH环境变量：

        NODE_PATH=/home/user/lib:/home/lib

        当使用require('foo/bar')的方式加载模块时，则NodeJS依次尝试以下路径。

        /home/user/lib/foo/bar
        /home/lib/foo/bar

    ```
##### 包(package)
- 多个子模块组成的大模块称作包,把所有子目录放在同一个目录里.
```
cat目录结构如下:
- /home/user/lib/
    - cat/
        head.js
        body.js
        main.js
```
- 其中``cat``目录定义了一个包,包含三个子模块.main.js作为入口模块,
```javascript
var head = require('./head');
var body = require('./body');

exports.creat = function(name) {
    return {
        name : name,
        head : head.creat(),
        body : body.creat()
    };
}
```

- index.js
    - 当模块的文件名是``index.js``,加载模块时可以使用模块所在目录的路径代替模块文件路径
    ```javascript
        var cat = require('/home/user/lib/cat');
        var cat = require('/home/user/lib/cat/index');
        //两种请求的书写方式是等价的
    ```
- package.json
    - 指定入口模板的路径
    [package.json的示例](../nodeCrawler/package.json)    

###### 命令行程序
- Linux:JS文件当做shell脚本运行
    - 1.在shell脚本中,通过``#!``注释来指定当前脚本使用的解析器;在``node-echo.js``文件顶部添加一行注释,表明当前脚本使用NodeJS解析.
    ```javascript
    #!/usr/bin/env node
    //NodeJS会忽略掉位于JS模块首行的``#!``注释
    ```
    - 2.赋予``node-echo.js``文件执行权限
    ```javascript
    $ chmod +x/home/user/bin/node-echo.js
    ```
    - 3.最后，在PATH环境变量中指定的某个目录下，例如在`/usr/local/bin`下边创建一个软链文件，文件名与使用的终端命令同名，命令如下：
    ```javascript
    $ sudo ln -s /home/user/bin/node-echo.js /usr/local/bin/node-echo
    //在任何目录下使用node-echo命令
    ```

- Windows   

##### 工程目录

#####  NPM
- 把安装包升级到最新版本`npm update (package)`

## 文件操作

### 小文件拷贝
- fs.readFileSync从源路径读取文件内容
- fs.writeFileSync将文件内容写入目标路径
```javascript
var fs = require('fs');

function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
}

function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));
```
- `progress`是一个全局变量,通过`progress.argv`获取命令行参数.

### 大文件拷贝
- 对于大文件 我们只能读一点写一点,直到拷贝完成
```javascript
const fs = require("fs");

function copy(src,dst){
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv) {
    copy(argv[0],argv[1]);
}

main(process.argv.slice(2));
```

### API

#### Buffer(数据块)
- 将JS数据处理能力从字符串扩展到任意二进制数据.
- JS语言只有字符串数据类型,没有二进制数据类型.
- Buffer(全局构造函数)对二进制数据进行操作.
- Buffer的两种方式:1.读取文件得到Buffer的实例;2.直接构造
```javascript
var bin = new Buffer([ 0x68,0x65,0x6c,0x6c,0x6f]);
```
- Buffer:
    - `.length`属性 -- 可以得到字节长度
    - `[index]`方式读取指定位置的字节
    ```javascript
        bin[0]; //=>0x68
    ```
    - 使用指定编码将二进制数据转化为字符串(字符串转化为指定编码下的二进制数据)
    ```javascript
        //二进制转化为字符串
        var str = bin.toString('utf-8');//=>'hello'
        
        //字符串转化为二进制
        var bin = new Buffer('hello', 'utf-8'); // => <Buffer 68 65 6c 6c 6f>
    ```
    - `[index]`方式直接修改某个位置的字节
    > `Buffer`与字符串有一个重要区别。字符串是只读的，并且对字符串的任何修改得到的都是一个新字符串，原字符串保持不变。至于`Buffer`，更像是可以做指针操作的C语言数组。例如，可以用`[index]`方式直接修改某个位置的字节。

    ```javascript
    bin[0] = 0x48
    ```   

    - `.slice`方法不返回新的Buffer,返回指向原`Buffer`中间的某个位置的指针;`.slice`方法返回的`Buffer`的修改会作用于原`Buffer`。

    ```javascript
    var bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
    var sub = bin.slice(2);

    sub[0] = 0x65;

    console.log(bin); //=> <Buffer 68 65 65 6c 6f>
    ```    

    - 拷贝Buffer,创建一个新的Buffer,.copy()方法复制
    
#### Stream(数据流)
- 处理无法一次处理完毕,达到边读取边处理;

```javascript
var rs = fs.createReadStream(pathname);

rs.on('data', function (chunk) {
    doSomething(chunk);
});

rs.on('end', function () {
    cleanUp();
});
//data不断触发,daSomething函数是否处理得过
```

> `Stream`基于事件机制工作,所有`Stream`的实例都继承于NodeJS提供的[EventEmitter](https://nodejs.org/api/events.html);

```javascript
var rs = fs.creatReadStream(src);

rs.on('data',function (chunk) {
    rs.pause();
    doSomething(chunk,function() {
        rs.resume();
    });
});

rs.on('end',function () {
    cleanUp();
});
```
- 只写数据流
```javascript
//没有考虑读取速度与写入速度的问题
var rs = fs.createReadStream(src);
var ws = fs.createReadStream(dst);

rs.on('data',function (chunk) {
    ws.write(chunk);
})

rs.on('end',function() {
    ws.end();
})

//考虑了读取速度与写入速度的问题
var rs = fs.createReadStream(src);
var ws = fs.createReadStream(dst);

rs.on('data',function (chunk) {
    if(ws.write(chunk) === false){
        rs.pause();
    }
});

rs.on('end',function() {
    ws.end();
});

ws.on('end',function() {
    rs.resume();
});
```

#### File System(文件系统)
- 文件属性读写
    - fs.stat,fs.chmod,fs.chown
- 文件内容读写
    - fs.readFile,fs.readdir,fs.writeFile,fs.mkdir
- 底层文件操作
    - fs.open,fs.read,fs.write,fs.close
- 异步IO模型举例
```javascript
fs.readFile(pathname,function(err,data) {
    if(err) {
        // Deal with error. 
    } else {
        // Deal with data
    }
});
```
- 同步API(方法名末尾+Sync)
```javascript
//fs.readFileSync
try{
    var data = fs.readFileSync(pathname);
    //Deal with data
} catch (err) {
    //Deal with error
}
```

#### Path(路径)
- `path.normalize`
> 将传入的路径转换为标准路径;解析路径中的`.`与`..`,去掉多余的`/`
```javascript
var cache = {};

function store(key,value) {
    cache[path.normalize(key)] = value;
}

store('foo/bar',1);
store('foo//baz//../bar',2);
console.log(cache);// => {'foo/bar':2}
```
> **注意:** 保证任何系统下都是用`/`作为标准路径分隔符,需要用`replace(/\\/g,'/')`再替换一下标准路径 

- `path.join`
> 将传入的多个路径拼接为标准路径.避免手工拼接路径字符串的繁琐,在不同系统下正确使用相应路径分隔符
```javascript
path.join('foo/','baz/','../bar'); //'foo/bar'
```
- `path.extname`
> 根据不同文件扩展名做不同操作
```javascript
path.extname('foo/bar.js'); // ".js"
```

### 遍历目录

#### 递归算法

#### 遍历算法

#### 同步遍历

#### 异步遍历

### 文本编码

#### BOM的移除

#### GBK转UTF-8

#### 单字节编码

## 网络操作