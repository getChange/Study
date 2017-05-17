# 安装gulp
- 全局安装
```
npm install -g gulp
```
- 在项目的根目录下创建一个`gulpfile.js`文件:
```javascript
//基本框架
var gulp = require('gulp');
gulp.task('default',function() {
    //执行任务代码
})
```
- 运行`gulp`
```javascript
gulp//默认执行名为`default`的任务
```
# 示例
```javascript
//获取gulp
var gulp = require("gulp");
//获取gulp-uglify组件 压缩javascript
var uglify = require("gulp-uglify");
//获取gulp-minify-css组件 压缩css
var minifycss = require('gulp-minify-css');
//获取gulp-rename组件 重新命名文件
var rename = require('gulp-rename');
//压缩js文件 在命令行使用gulp script 启动此任务
gulp.task('script', function () {
    //1.找到文件
    gulp.src('src/js/*.js')
        .pipe(rename({suffix:'.min'}))
        //2.压缩文件
        .pipe(uglify())
        //3.另存压缩后文件
        .pipe(gulp.dest('dist/js'));
})
//压缩css文件
gulp.task('css', function () {
    gulp.src('src/css/*.css')
        .pipe(rename({suffix:'.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));
})

//同时执行代码的压缩
gulp.task('default', function () {
    gulp.start('script','css')
});
```