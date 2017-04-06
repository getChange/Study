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

### 实例生命周期
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