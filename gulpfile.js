/*eslint-disable*/
var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var header = require('gulp-header');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var karma = require('karma').server;
var hbsfy = require('hbsfy');

gulp.task('default', function() {
    karma.start({
        configFile: path.join(__dirname, 'karma.conf.js'),
        singleRun: true
    });
});

gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
    gulp.watch([
        './src/**/*',
        './index.js',
        './demo/**/*.html'
    ], ['bundle']);
});

gulp.task('bundle', function() {
    var pkg = require('./package.json');
    var banner = [
        '/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version <%= pkg.version %>',
        ' */',
        ''].join('\n');

    gulp.src([
            'src/css/common.css',
            'src/css/*.css'
        ])
        .pipe(concat('calendar.css'))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('dist'));

    var b = browserify({
        entries: 'index.js',
        debug: true
    });

    return b.transform(hbsfy)
        .bundle()
        .on('error', function(err) {
            console.log(err.message);
            this.emit('end');
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('dev', function() {
    gulp.watch(['index.js', 'src/**/*.js'], ['bundle']);
});

gulp.task('test-w', function() {
    karma.start({
        configFile: path.join(__dirname, 'karma.conf.local.js')
    });
});

