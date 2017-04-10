var isLoading = false;
var page = 2;

function renderHtml(data) {
    var html = '';
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        //html +=
        //html +=
        //html +=
        //html +=
        //html +=
        //html +=
        //
        //html +=
    }
    return html;
}


$(function () {

    Scroll(function () {
        if (!isLoading) {
            isLoading = true;
            var typeNo=1;
            var guessidNo=11;
            $.ajax({
                url: '/app/jn/v1/guess/topic/list?type='+typeNo+'&guessId='+guessidNo,

                success: function (data) {
                    console.log(res)
                    if (data && data.code == 10000) {
                        var html = renderHtml(res.data.good);
                        if (!!html) {
                            $('#container').append(html);
                        }
                    }
                    page++;
                    isLoading = false;

                },

                error: function () {
                    alert("错误")
                    isLoading = false;

                }
            })
        }
    });
});

function Scroll(func) {
    //var before = 0;
    $(window).on('scroll', function () {
        var currentTop = $('body').scrollTop();
        if ((currentTop + $(window).height() > $(document).height() - 50)) {
            func();
        }
    });
}