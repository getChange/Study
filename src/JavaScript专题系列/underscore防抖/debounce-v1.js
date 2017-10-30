var count = 1;
var container = document.getElementById("container");

/*
 * 出现频繁触发的事件
 */
function getUserAction(e) {
    container.innerHTML = count++;
};


/**
 * 第一版(防抖);
 * 添加一个定时设置,移动完之后的1000ms不再触发
 */

function debounce(func, wait) {
    var timeout = null;
    return function() {
        /**
         * 第二版
         * 在不使用debounce函数时,this指向`<div id="container"></div>`;
         * 使用debounce函数指向的Window对象;
         * 将this指向正确的对象`<div id="container"></div>`;
         */
        var context = this; //this指向`<div id="container"></div>`

        /**
         * 第三版
         * 处理event对象
         * 修复调用debounce函数时 event对象显示undefined
         */
        var args = arguments;

        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    }
}
//container.onmousemove = getUserAction;
container.onmousemove = debounce(getUserAction, 1000);