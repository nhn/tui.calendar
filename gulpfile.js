/*eslint-disable*/
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
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
' * ██████╗   ██████╗   ██████╗  ██████╗   █████╗  ██╗   ██╗ ██╗',
' * ██╔══██╗ ██╔═══██╗ ██╔═══██╗ ██╔══██╗ ██╔══██╗ ╚██╗ ██╔╝ ██║',
' * ██║  ██║ ██║   ██║ ██║   ██║ ██████╔╝ ███████║  ╚████╔╝  ██║',
' * ██║  ██║ ██║   ██║ ██║   ██║ ██╔══██╗ ██╔══██║   ╚██╔╝   ╚═╝',
' * ██████╔╝ ╚██████╔╝ ╚██████╔╝ ██║  ██║ ██║  ██║    ██║    ██╗',
' * ╚═════╝   ╚═════╝   ╚═════╝  ╚═╝  ╚═╝ ╚═╝  ╚═╝    ╚═╝    ╚═╝',
' *',
' *  ██████╗  █████╗  ██╗      ███████╗ ███╗   ██╗ ██████╗   █████╗  ██████╗',
' * ██╔════╝ ██╔══██╗ ██║      ██╔════╝ ████╗  ██║ ██╔══██╗ ██╔══██╗ ██╔══██╗',
' * ██║      ███████║ ██║      █████╗   ██╔██╗ ██║ ██║  ██║ ███████║ ██████╔╝',
' * ██║      ██╔══██║ ██║      ██╔══╝   ██║╚██╗██║ ██║  ██║ ██╔══██║ ██╔══██╗',
' * ╚██████╗ ██║  ██║ ███████╗ ███████╗ ██║ ╚████║ ██████╔╝ ██║  ██║ ██║  ██║',
' *  ╚═════╝ ╚═╝  ╚═╝ ╚══════╝ ╚══════╝ ╚═╝  ╚═══╝ ╚═════╝  ╚═╝  ╚═╝ ╚═╝  ╚═╝',
' * @version {{ version }}',
' */',
''].join('\n');

var isProduction = gutil.env.production;

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

    if (isProduction) {
        gutil.log(gutil.colors.yellow('<< Bundling for Production >>'));
    }

    gulp.src([
            'src/css/common.css',
            'src/css/*.css'
        ])
        .pipe(concat('calendar.css'))
        .pipe(insert.prepend(versionHeader))
        .pipe(gulp.dest('dist'))
        .pipe(isProduction ? cssmin() : gutil.noop())
        .pipe(isProduction ? rename({extname: '.min.css'}) : gutil.noop())
        .pipe(insert.prepend(versionHeader))
        .pipe(isProduction ? gulp.dest('dist') : gutil.noop());

    var b = browserify({
        entries: 'index.js',
        debug: true
    });

    var added = false;
    function prependTransform(file) {
        return through(function (buf, enc, next) {
            if (!added) {
                this.push(versionHeader + buf.toString('utf8'));
                added = true;
            } else {
                this.push(buf.toString('utf8'));
            }
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
        .pipe(source('calendar.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist'))
        .pipe(isProduction ? uglify({compress:{}}) : gutil.noop())
        .pipe(isProduction ? rename({extname: '.min.js'}) : gutil.noop())
        .pipe(isProduction ? insert.prepend(versionHeader) : gutil.noop())
        .pipe(isProduction ? gulp.dest('dist') : gutil.noop())
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

