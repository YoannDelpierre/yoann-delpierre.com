var gulp = require('gulp'),
	notify = require('gulp-notify'),
	sass = require('gulp-ruby-sass'),
	minifycss = require('gulp-minify-css'),
	connect = require('gulp-connect'),
	prefix = require('gulp-autoprefixer');

gulp.task('styles', function() {
	return gulp.src('scss/**/*.scss')
		.pipe(sass({style: 'expanded'}))
		.pipe(prefix("last 2 versions", "> 5%", "ie 8", "ie 7", { cascade: true }))
		.pipe(gulp.dest('./site/css'))
		.pipe(minifycss())
		.pipe(notify({ message: 'css create' }))
		.pipe(connect.reload());
});

gulp.task('html', function() {
	gulp.src('./site/*.html')
		.pipe(connect.reload())
		.pipe(notify({ message: 'Reload done' }));
});

gulp.task('watch', function() {
	gulp.watch('./site/*.html', ['html']);
	gulp.watch('scss/**/*.scss', ['styles']);
});

gulp.task('connect', function() {
	connect.server({
		root: 'site',
		livereload: true
	});
});

gulp.task('default', ['styles', 'connect', 'watch']);