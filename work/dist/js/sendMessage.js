
window.onload= function () {
    var btn = document.getElementById("btn");
    var num = 60;
    btn.onclick = function () {
        this.disabled = true;
        //每隔一秒钟，按钮的值变化
        var timer = setInterval(function () {
            console.log("代码执行没执行");
            num--;
            btn.value = '已发送'+'('+num+'s)';
            btn.style.fontSize="0.65rem";
            btn.style.color="#999";
            if(num == 0) {
                clearInterval(timer);
                btn.disabled = false;
                btn.value = "点击获取验证码";
                num = 60;
            }

        }, 1000);
    }
}