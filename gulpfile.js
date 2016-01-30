var gulp = require('gulp');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');

gulp.task('js', function(){
    browserify('./public/javascripts/src/app.jsx')
        .transform(reactify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('public/javascripts/build/'));
});

gulp.task('sass', function () {
  gulp.src('./public/stylesheets/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('watch', function() {
    gulp.watch("public/javascripts/src/**/*.jsx", ["js"])
    gulp.watch('./public/stylesheets/scss/**/*.scss', ['sass']);
})

gulp.task('default', ['js', 'sass', 'watch']);
