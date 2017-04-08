var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var app = {
    srcPath: 'src/',
    devPath: 'build/',
    prdPath: 'dist/'
};

gulp.task('html', function() {
    gulp.src(app.srcPath + '**/*.html')
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
        .pipe($.connect.reload());
});

gulp.task('less', function() {
    gulp.src(app.srcPath + 'css/index.less')
        .pipe($.plumber())
        .pipe($.less())
        .pipe(gulp.dest(app.devPath + 'css'))
        .pipe($.cssmin())
        .pipe(gulp.dest(app.prdPath + 'css'))
        .pipe($.connect.reload());
});

gulp.task('js', function() {
    gulp.src(app.srcPath + 'js/**/*.js')
        .pipe($.plumber())
        .pipe($.concat('index.js'))
        .pipe(gulp.dest(app.devPath + 'js'))
        .pipe($.uglify())
        .pipe(gulp.dest(app.prdPath + 'js'))
        .pipe($.connect.reload());
});

gulp.task('image', function() {
    gulp.src(app.srcPath + 'img/**/*')
        .pipe($.plumber())
        .pipe(gulp.dest(app.devPath + 'img'))
        .pipe($.imagemin())
        .pipe(gulp.dest(app.prdPath + 'img'))
        .pipe($.connect.reload());
});

gulp.task('build', ['image', 'js', 'less', 'html']);

gulp.task('clean', function() {
    gulp.src([app.devPath, app.prdPath])
        .pipe($.clean());
});

gulp.task('serve', ['build'], function() {
    $.connect.server({
        root: [app.devPath],
        livereload: true,
        port: 3000
    });

    open('http://localhost:3000');

    gulp.watch(app.srcPath + '**/*.html', ['html']);
    gulp.watch(app.srcPath + 'css/**/*.less', ['less']);
    gulp.watch(app.srcPath + 'js/**/*.js', ['js']);
    gulp.watch(app.srcPath + 'img/**/*', ['image']);
});

gulp.task('default', ['serve']);
