var gulp = require('gulp'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    sass = require('gulp-ruby-sass'),
    minifyCss = require('gulp-minify-css'),
    lintCss = require('gulp-csslint'),
    concatCss = require('gulp-concat-css'),
    prefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint');

gulp.task('styles', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(prefix("last 2 versions", "> 5%", "ie 8", "ie 7", { cascade: true }))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCss())
        .pipe(gulp.dest('./app/css'))
        .pipe(connect.reload());
        //.pipe(notify({message: 'CSS done'}));
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
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./app/scripts/'))
        .pipe(connect.reload());
});

gulp.task('images', ['clean'], function() {
    return gulp.src('./src/images/*')
        .pipe(imagemin({
            optimizationLevel: 5, progressive: true, interlaced: true
        }))
        .pipe(gulp.dest('./app/images'));
})

gulp.task('html', function() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./app'))
        .pipe(connect.reload());
        //.pipe(notify({message: 'Reload HTML done'}));
});

gulp.task('watch', function() {
    gulp.watch(['./src/*.html'], ['html']);
    gulp.watch(['./src/scss/**/*.scss'], ['styles']);
    gulp.watch(['./src/js/*.js'], ['scripts']);
});

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        port: 8000,
        livereload: true
    });
});

gulp.task('default', function() {
    gulp.start('html', 'styles', 'scripts', 'images', 'connect', 'watch');
});

gulp.task('release', ['styles', 'lintCss', 'jshint', 'scripts', 'images']);