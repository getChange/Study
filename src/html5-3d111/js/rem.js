/**
 * Created by GZKJ on 2017/1/11.
 */
(function(win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        console.log(width);
        var rem = 1024 / 37.5; // 将屏幕宽度分成10份， 1份为1rem  
        docEl.style.fontSize = rem + 'px';
            console.log(rem);

    }
    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 100);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 100);
        }
    }, false);
    refreshRem();
})(window);

