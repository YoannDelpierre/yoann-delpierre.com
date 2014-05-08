var gulp = require('gulp'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    sass = require('gulp-ruby-sass'),
    minifyCss = require('gulp-minify-css'),
    lintCss = require('gulp-csslint'),
    prefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    plumber = require('gulp-plumber');

var fontName = 'icon';

gulp.task('styles', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(prefix("last 2 versions", "> 5%", "ie 8", "ie 7", { cascade: true }))
        .pipe(plumber.stop())
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCss())
        .pipe(gulp.dest('./app/css'))
        .pipe(connect.reload())
        .pipe(notify({message: 'CSS done'}));
});

gulp.task('lintCss', function() {
    return gulp.src('./app/css/*.css')
        .pipe(lintCss({
            'box-model': false,
            'display-property-grouping': true,
            'duplicate-properties': true,
            'empty-rules': true,
            'known-properties': false,
            'adjoining-classes': false,
            'box-sizing': false,
            'compatible-vendor-prefixes': false,
            'gradients': false,
            'text-indent': false,
            'vendor-prefix': true,
            'fallback-colors': false,
            'star-property-hack': true,
            'underscore-property-hack': true,
            'bulletproof-font-face': false,
            'font-faces': false,
            'import': true,
            'regex-selectors': false,
            'universal-selector': false,
            'unqualified-attributes': false,
            'zero-units': true,
            'overqualified-elements': true,
            'shorthand': true,
            'duplicate-background-images': false,
            'floats': false,
            'font-sizes': false,
            'ids': false,
            'important': false,
            'outline-none': false,
            'qualified-headings': false,
            'unique-headings': false
        }))
        .pipe(lintCss.reporter());
});

gulp.task('clean', function () {
    gulp.src(['./app/images'], {
        read: false
    })
    .pipe(clean());
});

gulp.task('jshint', function() {
    gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
    gulp.src('./src/js/*.js')
        .pipe(rename({suffix: '.min'}))
        //.pipe(uglify())
        .pipe(gulp.dest('./app/scripts/'))
        .pipe(connect.reload());
});

gulp.task('images', ['clean'], function() {
    return gulp.src(['./src/images/*.jpg', './src/images/**/*.jpg'])
        .pipe(imagemin({
            optimizationLevel: 5, progressive: true, interlaced: true
        }))
        .pipe(gulp.dest('./app/images'));
});

gulp.task('iconfont', function(){
    gulp.src(['./src/icons/*.svg'], {base : './src'})
    .pipe(iconfontCss({
    fontName: fontName,
        path: './src/icons/_icons.scss',
        targetPath: '../../src/scss/_icons.scss',
        fontPath: '../icons/'
    }))
    .pipe(iconfont({
        fontName: fontName
    }))
    .pipe(gulp.dest('./app/icons/'));
});

gulp.task('html', function() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./app'))
        .pipe(connect.reload())
        .pipe(notify({message: 'HTML done'}));
});

gulp.task('watch', function() {
    gulp.watch(['./src/*.html'], ['html']);
    gulp.watch(['./src/scss/**/*.scss'], ['styles']);
    gulp.watch(['./src/js/*.js'], ['scripts']);
    gulp.watch(['./src/images/*.jpg'], ['images']);
    gulp.watch(['./src/icons/*.svg'], ['iconfont', 'styles'])
});

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        port: 8000,
        livereload: true
    });
});

gulp.task('default', function() {
    gulp.start('html', 'images', 'iconfont', 'styles', 'scripts', 'connect', 'watch');
});

gulp.task('release', ['iconfont', 'images', 'styles', 'lintCss', 'jshint', 'scripts']);