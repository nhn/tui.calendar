/*eslint-disable*/
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var stylus = require('gulp-stylus');
var oStylus = require('stylus');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var KarmaServer = require('karma').Server;
var hbsfy = require('hbsfy');
var handlebars = require('handlebars');
var insert = require('gulp-insert');
var through = require('through2');
var preprocess = require('gulp-preprocess');
var preprocessify = require('preprocessify');

var HEADER = [
'/**',
' * Dooray Calendar',
' * @version {{ version }}',
' */',
''].join('\n');

var CONTEXT = {
    CSS_PREFIX: (gutil.env.cssprefix || 'dooray-calendar-'),
    BUNDLE_TYPE: (!!gutil.env.production ? 'Release' : 'Debug')
};

function bundle(outputPath) {
    var isProduction = CONTEXT.BUNDLE_TYPE === 'Release';
    var pkg = require('./package.json');
    var tmpl = handlebars.compile(HEADER);
    var versionHeader = tmpl(pkg);

    if (isProduction) {
        gutil.log(gutil.colors.yellow('<< Bundling for Production >>'));
    }

    outputPath = outputPath || 'dist';

    gulp.src('src/css/main.styl')
        .pipe(stylus({
            // base64 image data
            define: { url: oStylus.url({paths: [__dirname + '/src/css/image']}) }
        }))
        .pipe(preprocess({context: CONTEXT}))
        .pipe(rename('calendar.css'))
        .pipe(insert.prepend(versionHeader))
        .pipe(gulp.dest(outputPath))
        .pipe(isProduction ? cssmin() : gutil.noop())
        .pipe(isProduction ? rename({extname: '.min.css'}) : gutil.noop())
        .pipe(insert.prepend(versionHeader))
        .pipe(isProduction ? gulp.dest(outputPath) : gutil.noop());

    var b = browserify({
        entries: 'index.js',
        debug: !isProduction
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
        .transform(preprocessify(CONTEXT))
        .transform(prependTransform)
        .bundle()
        .on('error', function(err) {
            console.log(err.message);
            this.emit('end');
        })
        .pipe(source('calendar.js'))
        .pipe(buffer())
        .pipe(gulp.dest(outputPath))
        .pipe(isProduction ? uglify({compress:{}}) : gutil.noop())
        .pipe(isProduction ? rename({extname: '.min.js'}) : gutil.noop())
        .pipe(isProduction ? insert.prepend(versionHeader) : gutil.noop())
        .pipe(isProduction ? gulp.dest(outputPath) : gutil.noop())
        .pipe(connect.reload());
}

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
        './demo/**/*.html',
        './demo-dev/**/*.html'
    ], ['bundle-dev']);
});

gulp.task('bundle-dev', function() {
    return bundle('build');
});

gulp.task('bundle', function() {
    return bundle('dist');
});

gulp.task('test-w', function(done) {
    new KarmaServer({
        configFile: path.join(__dirname, 'karma.conf.local.js')
    }, done).start();
});

gulp.task('cover', function(done) {
    new KarmaServer({
        configFile: path.join(__dirname, 'karma.conf.cover.js')
    }, done).start();
});

