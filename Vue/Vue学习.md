# Vue实例
## 构造器
- `Vue.js`应用都是通过构造函数`Vue`创建一个`Vue的根实例`启动的:
```javascript
var vm = new Vue({
    //选项(数据,模板,挂载元素,方法,生命周期钩子)
})
```
- 扩展,创建可复用的组件构造器
```javascript
var MyComponent = Vue.extend({
    //扩展选项
})

//所有的`MyComponent`实例都将以预定义的扩展选项被创建
var myComponentInstance = new MyComponent()
```

## 属性与方法
- 每个`Vue`实例都会代理其`data`对象里所有的属性
```javascript
var data = { a: 1 }
var vm = new Vue({
  data: data
})
vm.a === data.a // -> true
// 设置属性也会影响到原始数据
vm.a = 2
data.a // -> 2
// ... 反之亦然
data.a = 3
vm.a // -> 3
```
- 只有被代理的属性是`响应的`.如果在实例创建之后添加新的属性到实例上,它不会触发视图的更新.
- 区别代理属性,在属性与方法前缀`$`
```javascript
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})
vm.$data === data // -> true
vm.$el === document.getElementById('example') // -> true
// $watch 是一个实例方法
vm.$watch('a', function (newVal, oldVal) {
  // 这个回调将在 `vm.a`  改变后调用
})
```
- 不要在实例属性或者毁掉函数中使用箭头函数.箭头函数会绑定父上下文,`this`不会是`Vue`实例,
而是`this.myMethod`未定义.

## 实例生命周期
- 示例
```javascript
var vm = new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
// -> "a is: 1"
```
- 钩子:`mounted` `update` `destroyed` ... 钩子的`this`指向调用它的Vue实例

# 模板语法
- 基于HTML模板语法
## 插值
### 文本 
- `Mustache`语法(双大括号):解释为纯文本
```html
<span>Message:{{msg}}</span>  
```
- `Mustache`标签将会被替代为对应数据对象上`msg`属性的值.
- `v-once`执行一次性的插值,当数值改变,插值出内容不会更新.
```html
<span v-once>This will never change: {{ msg }}</span>
```

### 纯HTML
- 输出HTML,使用`v-html`指令,插入的内容会被当做HTML--数据绑定会被忽略
```html
<div v-html="rawHtml"></div>
```
- **注意**你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容插值。

### 属性
- `Mustache`不能在HTML属性中使用,应使用`v-bind`:
```html
<div v-bind:id="dynamicId"></div>
```
- 对布尔值属性有效--为false该属性被移除
```html
<button v-bind:disabled="someDynamicCondition">Button</button>
```

### 使用JavaScript表达式
- 会生效的表达式
```html
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div v-bind:id="'list-' + id"></div>
```
- 使用JavaScript表达式,每个绑定都只能包含单个表达式
- 不会生效的例子
```html
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}
<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

## 指令
- 带有`v-`前缀的特殊属性,指令属性的值预期是单一JavaScript表达式.当其表达式的值改变时相应的将某些行为应用到DOM上

### 参数
- 只能接收一个参数,指令后以冒号指明
- `v-bind`被用来响应的更新HTML属性
```html
<a v-bind:href="url"></a>
```
- `v-on`用于监听DOM事件
```html
<a v-on:click="doSomething">
```

### 修饰符