const express = require("express");
const ejs = require("ejs");
var bodyParser = require("body-parser");
var request = require("request");
const fs = require("fs");
const iconv = require("iconv-lite");
const async = require("async");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.set('views', './views');

app.get('/', function (req, res) {
    res.render('index', {title: 'NodeJs 爬虫系统', keywords: '', message: '等待抓取关键词信息'});
});

function writeComments(list, k) {
    let url_info = list.contentId.toString().split('ac');
    let comment_url = 'http://www.acfun.cn/comment_list_json.aspx?isNeedAllCount=true&contentId=${user_info[1]}&currentPage=1';

    let options = {
        url: comment_url,
        headers: {'User-Agent': 'request'}
    };

    request(options, function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            let info = JSON.parse(body);
            let comment_content = info.data.commentContentArr;
            let comment_list = info.data.commentList;
            let content = [];
            for (let x in comment_list) {
                let str = iconv.encode(comment_content['c' + comment_list[x]].content.replace(/\[(.*?)\]/gm,'').replace(/<(.*?)>/gm,'').replace(/\r\n/gm,' ').replace(/\r/gm,' ').replace(/\n/gm,' ').trim(), 'utf8')
            }
        }
    })
}