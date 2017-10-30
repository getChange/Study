/**
 * 第四版
 * 新需求:立刻执行
 * 添加immediately参数判断是否立刻执行
 */
var count = 1;
var container = document.getElementById("container");

function getUserAction(e) {
    container.innerHTML = count++;
};

function debounce(func, wait) {
    var timeout = null,
        result;
    return function() {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediately) {
            //如果已经执行过,不再执行
            var callNow = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, wait);
            if (callNow) {
                func.apply(context, args);
            }
        } else {

        }

    }
}
//container.onmousemove = getUserAction;
container.onmousemove = debounce(getUserAction, 1000);