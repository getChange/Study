function animate(obj,json,fn){
    if(obj.timer){
        clearInterval(obj.timer);
    }
    obj.timer = setInterval(function () {
        var flag = true;
        for(var k in json){
            if(k === "opacity"){
                var leader = getStyle(obj,k) *100;

            }
        }
    },15)
}

function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return window.getComputedStyle(obj,null)[attr];
    }
}