'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var clean = require('gulp-clean');


gulp.task('script', function() {
  return gulp.src('public/js/**/*.js')
    // .pipe(concat('onem2m-ui.js'))
    .pipe(gulp.dest('gui/js/'));
});

gulp.task('vendor', function() {
  return gulp.src(['public/bower_components/**/*']).pipe(gulp.dest('gui/vendor'));
});

gulp.task('css', function() {
  return gulp.src(['public/css/**/*.css']).pipe(concat('app.css')).pipe(gulp.dest('gui/css'));
});

gulp.task('font', function() {
  return gulp.src(['public/font/*.woff2']).pipe(gulp.dest('gui/font'));
});

gulp.task('icon', function() {
  return gulp.src(['public/icon/*.svg']).pipe(gulp.dest('gui/icon'));
});

gulp.task('template', function() {
  return gulp.src(['public/template/*.html']).pipe(gulp.dest('gui/template'));
});

gulp.task('onem2m-ui',['script','vendor','css','font','icon','template'],function(){
  clean(['gui']);
  gulp.src(['public/index.html']).pipe(rename('onem2m-ui.tplt.html')).pipe(gulp.dest('gui/template'));
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'public'
        }
    });
});

gulp.task('watch', ['browserSync'], function (){
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('public/css/*.css', browserSync.reload);
    gulp.watch('public/**/*.html', browserSync.reload);
    gulp.watch('public/js/**/*.js', browserSync.reload);
    gulp.watch('public/custom_vendor/**/*.js', browserSync.reload);
});
