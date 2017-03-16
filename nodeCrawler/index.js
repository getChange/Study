const express = require("express");//express API
const ejs = require("ejs");//what is ejs?
var bodyParser = require("body-parser");//what is body-parser
var request = require("request");
const fs = require("fs");
const iconv = require("iconv-lite");//
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
                let str = iconv.encode(comment_content['c' + comment_list[x]].content.replace(/\[(.*?)\]/gm, '').replace(/<(.*?)>/gm, '').replace(/\r\n/gm, ' ').replace(/\r/gm, ' ').replace(/\n/gm, ' ').trim(), 'utf8');
                content.push(str)
            }
            fs.appendFile('./comment/${k}.txt', content.join("\r\n").toString());
        }
    })
}

app.post("/", function (req, res) {
    let keywords = req.body.keywords || '';
    let message = "Have No Message";
    if (keywords) {
        let temp_keywords = keywords.split("\r\n");
        for (let x in temp_keywords) {
            let k = temp_keywords[x];
            try {
                fs.unlinkSync("./comment/${k}.txt");
            } catch (e) {

            }
            let url = 'http://search.aixifan.com/search?q=' + encodeURIComponent(k);
            let options = {
                url: url,
                headers: {
                    'User-Agent': 'request'
                }
            };
            request(options, function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    let info = JSON.parse(body);
                    let totalCount = info.data.page.totalCount;
                    let max_page = Math.ceil(totalCount / 100);
                    if (max_page >= 5) {
                        //最大抓取页数
                        max_page = 5;
                    }
                    //遍历抓取多页
                    for (let xx = 1; xx < max_page; xx++) {
                        setTimeout(function () {
                            url = 'http://search.aixifan.com/search?pageSize=100&pageNo=' + xx + '&q=' + encodeURIComponent(k);
                            options = {
                                url: url,
                                headers: {
                                    'User-Agent': 'request'
                                }
                            };
                            request(options, function callback(error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    let info = JSON.parse(body);
                                    let t_list = info.data.page.list;
                                    //遍历抓取评论页面
                                    for (let x2 in t_list) {
                                        writeComments(t_list[x2], k);
                                    }
                                    console.log(`抓取关键词 ${k} 第 ${xx} 页列表所有评论成功`);
                                } else {
                                    console.log(options);
                                    console.log(`抓取关键词 ${k} 第 ${xx} 页列表所有评论失败`);
                                }
                            })
                        }, xx * 50);
                    }
                }
            })
        }
        res.render('index', {title: '爬虫结果 - Node 爬虫系统', keywords, message: '抓取命令发送成功，抓取结果，请查看 终端控制台。'});
    } else {
        res.render('index', {title: '爬虫结果 - Node 爬虫系统', keywords, message});
    }
});

app.listen(3000, function () {
    console.log('Server listening at http://localhost:%s', this.address().port);
});