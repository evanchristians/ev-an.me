var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var util = require('gulp-util');
var config = {
    assetsDir: 'app/assets/',
    sassPattern: 'scss/**/*.scss',
    production: !!util.env.production
};
gulp.task('sass', function() {
    console.log(config.assetsDir+config.sassPattern)
    return gulp.src(config.assetsDir+config.sassPattern)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(config.production ? minifyCSS() : util.noop())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/css'));
});
gulp.task('watch', function() {
    gulp.watch(config.assetsDir+config.sassPattern).on('change', gulp.series('sass'))
});
gulp.task('default', gulp.series('sass', 'watch'));