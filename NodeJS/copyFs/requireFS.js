
/*
* 请求小文件的时候
* */
const fs = require("fs");

function copy(src,dst){
    fs.writeFileSync(dst,fs.readFileSync(src));
}

function main(argv) {
    copy(argv[0],argv[1])
}

main(process.argv.slice(2));

/*
*请求大文件
* */

function copy(src,dst){
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv) {
    copy(argv[0],argv[1])
}

main(process.argv.slice(2));