var u = navigator.userAgent, app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var mediaTitle=$("input[name=mediaTitle]").val();
var poster=$("input[name=poster]").val();
function v(data) {
    var videourl = data.vl.vi[0].ul.ui[0].url + data.vl.vi[0].fn + "?vkey=" + data.vl.vi[0].fvkey;
    $("#video-html").html('<video poster="'+poster+'"><source id="video-src" src="' + videourl + '" type="video/mp4">您的浏览器不支持HTML5视频</videoposter:poster>');
    if(isAndroid==true){
        zymedia('video',{mediaTitle:mediaTitle});
    }else if(isiOS==true){
        zymedia('video',{mediaTitle:mediaTitle,nativeControls: true});
    }else{
        zymedia('video',{mediaTitle:mediaTitle});
    }

}

function base64Decode(url) {
    rv = window.atob(url);
    rv = escape(rv);
    rv = decodeURIComponent(rv);
    return rv;
}

function getNewUrl(data) {
    var videoUrl = data.data.video_list.video_1.main_url;
    var new_url = base64Decode(videoUrl);
    console.log(new_url)
    $("#video-html").html('<video poster="'+poster+'"><source controls id="video-src" data-config={"mediaTitle":"提莫"} src="' + new_url + '" type="video/mp4">您的浏览器不支持HTML5视频</video>');
    if(isAndroid==true){
        zymedia('video',{mediaTitle:mediaTitle});
    }else if(isiOS==true){
        zymedia('video',{mediaTitle:mediaTitle,nativeControls: true});
    }else{
        zymedia('video',{mediaTitle:mediaTitle});
    }
}

var source=$("input[name=source]").val();
var url=$("input[name=url]").val();

    if (source==2) {
        $.ajax({
            url: url+"&callback=v",
            dataType: "jsonp",
        })
    } else if (source==3) {
        $.ajax({
            url: url+"&callback=getNewUrl",
            dataType: "jsonp",
        })
    }