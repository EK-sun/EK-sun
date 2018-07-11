const gulp = require('gulp');
const connect = require('gulp-connect');
const minjs = require('gulp-uglify');
const amdOptimize = require('amd-optimize');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const mincss = require('gulp-clean-css');

gulp.task('server', function(){
    connect.server({
        root: '',
        port: 89,
        livereload: true
    })
})

// 定义 requirejs 任务
gulp.task('rjs', function(){
    gulp.src('./src/js/*.js')
    .pipe(amdOptimize('index', {
        paths: {
            'index': './index',
            'http': './httpclient',
            'jquery': './jquery',
            'spinner': './spinner'
        }
    }))
    .pipe(concat('index.js'))/*合并*/
    .pipe(gulp.dest('./dist'))/*输出保存*/
    .pipe(rename('index.min.js'))/*重命名*/
    .pipe(minjs())/*压缩*/
    .pipe(gulp.dest('./dist'))/*输出保存*/
})

// 定义 sass 任务
gulp.task('sass', function(){
// 找到文件
  return gulp.src('./src/css/*.css')
    .pipe(sass())
// 编译文件
    .pipe(gulp.dest('./dist/sass'))
    .pipe(rename({suffix: '.min'}))
    .pipe(mincss())
// 另存文件
    .pipe(gulp.dest('./dist/sass'))
    .pipe(connect.reload())
}); 

// 定义监听任务
gulp.watch('./src/css/*.css',['sass']);

gulp.task('autobuild', function(){
    gulp.watch('./src/*.html', function(){
        gulp.src('./src/*.html').pipe(connect.reload());
    })
    gulp.watch('./src/js/*.js', ['rjs']);
})

gulp.task('default', ['server', 'autobuild', 'rjs', 'sass']);