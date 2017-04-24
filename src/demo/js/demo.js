window.onload = function () {
    var box = document.getElementById("box");
    var screen = box.children[0];
    var ul = screen.children[0];
    var ol = screen.children[1];
    var ulList = ul.children;
    var imgWidth = screen.offsetWidth;

    for (var i = 0; i < ulList.length; i++) {
        var li = document.createElement("li");
        ol.appendChild(li);
        li.innerHTML = "";
    }
    var olList = ol.children;
    olList[0].className = "current";

    var clonePic = ulList[0].cloneNode(true);
    ul.appendChild(clonePic);

    for (var i = 0; i < olList.length; i++) {
        var li = olList[i];
        li.index = i;
        li.onclick = function () {
            for (var j = 0; j < olList.length; j++) {
                olList[j].className = "";
            }
            this.className = "current";
            var idx = this.index;
            var target = -idx * imgWidth;
            animate(ul, target);
            pic = square = idx;
        };
    }
}