const request = require('request');
const fs = require('fs');
const async = require('async');

const url = "https://www.zhihu.com/api/v4/members/ni-ba-tie-ren/followees?include=data%5B*%5D.answer_count%2Carticles_count%2Cgender%2Cfollower_count%2Cis_followed%2Cis_following%2Cbadge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=0&limit=20";
const zurl = "https://www.zhihu.com/api/v4/members/demouser/followees?include=data%5B*%5D.answer_count%2Carticles_count%2Cgender%2Cfollower_count%2Cis_followed%2Cis_following%2Cbadge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=0&limit=20";

//request请求的options
const options = {
    url: url,
    headers: {
        "authorization": "Bearer Mi4wQUJETTJlanBOQWtBVU1LcDk2QVlDeGNBQUFCaEFsVk5neWJhV0FCWXJueEs2bjJwcUYwdzBTdmVpYmxVS1hmWkl3|1488100019|625fed8bf4dee0970f731c7ecfba9f1886ca4a5b"
    }
}

//获取数据
function getDataList(url) {
    options.url = url;
    request.get(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {

        }
    })
}