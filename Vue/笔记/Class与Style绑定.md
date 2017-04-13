# Class与Style绑定
## 绑定HTML Class
### 对象语法
- 传给`v-bind:class`一个对象,动态切换class
```html
<div id="app">
    <!--插入单个值-->
    <div v-bind:class="{ active: isActive}"></div>
    <!--插入多个属性-->
    <div class="static" v-bind:class="{active:isActive,'text-danger':hasError}"></div>
    <!--绑定一个对象-->
    <div v-bind:class="classObject"></div>
</div>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            isActive: true,
            hasError: false,
            classObject:{
                active:true,
                'text-danger':true
            }
        }
    })
</script>
```
- 渲染结果:
```html
<div class="active"></div>
<div class="static active"></div>
<div class="active text-danger"></div>
```

- 绑定返回对象的计算属性
```html
<div id="app">
    <div v-bind:class="classObject"></div>
</div>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            isActive: true,
            error: null
        },
        computed: {
            classObject: function () {
                return {
                    active: this.isActive && !this.error,
                    'text-danger': this.error && !this.error.type === 'fatal'
                }
            }
        }
    })
</script>
```
- 渲染结果:
```html
<div class="active"></div>
```

### 数组语法
```html
<div v-bind:class="[activeClass, errorClass]">
```
```javascript
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```
- 渲染结果:
```html
<div class="active text-danger"></div>
```
- 三元表达式:
```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]">
```
- 当多个条件时:
```html
<div v-bind:class="[{ active: isActive }, errorClass]">
```
### 用在组件上(未学习)

## 绑定内联样式
### 对象语法
- `v-bind:style`;CSS属性名可以用驼峰式或短横分割命名
- 普通方式:
```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```
```javascript
data: {
  activeColor: 'red',
  fontSize: 30
}
```
- 对象写法
```html
<div v-bind:style="styleObject"></div>
```
```javascript
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```
### 数组语法
- 可以将多个样式对象应用到一个元素上
```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```
### 自动添加前缀
- 当`v-bind:style`使用需要特定前缀的CSS属性,会自动添加相应的前缀