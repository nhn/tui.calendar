/*eslint-disable*/
var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var KarmaServer = require('karma').Server;
var hbsfy = require('hbsfy');
var handlebars = require('handlebars');
var insert = require('gulp-insert');
var through = require('through2');

var HEADER = [
'/**',
' * {{ name }} - {{ description }}',
' * @version {{ version }}',
' */',
''].join('\n');

gulp.task('default', function(done) {
    new KarmaServer({
        configFile: path.join(__dirname, 'karma.conf.js'),
        singleRun: true
    }, done).start();
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
    var tmpl = handlebars.compile(HEADER);
    var versionHeader = tmpl(pkg);

    gulp.src([
            'src/css/common.css',
            'src/css/*.css'
        ])
        .pipe(concat('calendar.css'))
        .pipe(insert.prepend(versionHeader))
        .pipe(gulp.dest('dist'));

    var b = browserify({
        entries: 'index.js',
        debug: true
    });

    function prependTransform(file) {
        return through(function (buf, enc, next) {
            this.push(versionHeader + buf.toString('utf8'));
            next();
        });
    }

    return b.transform(hbsfy)
        .transform(prependTransform)
        .bundle()
        .on('error', function(err) {
            console.log(err.message);
            this.emit('end');
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('dev', function() {
    gulp.watch(['index.js', 'src/**/*.js'], ['bundle']);
});

gulp.task('test-w', function(done) {
    new KarmaServer({
        configFile: path.join(__dirname, 'karma.conf.local.js')
    }, done).start();
});

