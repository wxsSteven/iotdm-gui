var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'public'
        }
    })
});

gulp.task('watch', ['browserSync'], function (){
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('public/css/*.css', browserSync.reload);
    gulp.watch('public/*.html', browserSync.reload);
    gulp.watch('public/js/**/*.js', browserSync.reload);
});