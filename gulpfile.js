/*eslint-disable*/
var path = require('path');
var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var karma = require('karma').server;
var handlebars = require('browserify-handlebars');

gulp.task('default', function() {
    karma.start({
        configFile: path.join(__dirname, 'karma.conf.js'),
        singleRun: true
    });
});

gulp.task('connect', function() {
    connect.server();
});

gulp.task('bundle', function() {
    var b = browserify({
        entries: 'index.js',
        debug: true
    });

    return b.transform(handlebars)
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist'));
});

gulp.task('dev', function() {
    gulp.watch(['index.js', 'src/**/*.js'], ['bundle']);
});

gulp.task('test-w', function() {
    karma.start({
        configFile: path.join(__dirname, 'karma.conf.local.js')
    });
});

