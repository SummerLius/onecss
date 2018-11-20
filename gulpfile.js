var gulp = require('gulp');
// assign the module to a local variable
var header = require('gulp-header');
var tap = require('gulp-tap');
// var nano = require('gulp-cssnano');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var gulpautoprefixer = require('gulp-autoprefixer');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

// literal string
// NOTE: a line separator will not be added automatically
// gulp.task('test-gulp', function () {
//     gulp.src('./test-gulp/*.js')
//         .pipe(header('//gap-header\n'))
//         .pipe(tap((file, through) => {
//             // console.log(file.path);
//             // console.log(file.contents);
//             file.contents = Buffer.concat([
//                 new Buffer('//gulp-tap\n'),
//                 file.contents
//             ]);
//         }))
//         .pipe(rename('liu/zhong/ddd.js'))
//         .pipe(gulp.dest('./test-gulp/dist/'));
// });

var option = {base: 'src'};
var dist = __dirname + '/dist';

gulp.task('build:style', function() {
    return gulp
        .src('./src/style/onecss.scss', option)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['last 5 versions', 'not ie < 8'] })]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({ stream: true }))
        .pipe(csso())
        .pipe(rename(function(path) {
                path.basename += '.min';
            }))
        .pipe(gulp.dest(dist));
});

gulp.task('build:example:html', function() {
  gulp
    .src('src/example/index.html', option)
    .pipe(gulp.dest(dist))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('build:example', ['build:example:html']);

gulp.task('release', ['build:style', 'build:example']);

gulp.task('watch', ['release'], function() {
  gulp.watch('src/style/**/*', ['build:style']);
  gulp.watch('src/**/*.html', ['build:example:html']);
});

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    ui: {
      port: 8081,
      weinre: {
        port: 8082
      }
    },
    port: 8080,
    startPath: '/example'
  });
});

// 参数说明
//  -w: 实时监听
//  -s: 启动服务器
//  -p: 服务器启动端口，默认8080
gulp.task('default', ['release'], function () {
    gulp.start('server');
    gulp.start('watch');
});












// .pipe(
//     gulpautoprefixer({
//         browsers: ['last 5 versions', 'not ie < 8']
//     })
// )

// gulp.task('auto', function() {
//     return (
//         gulp
//             .src('./test-sass/test-sass.css')
//             // .pipe(gulpautoprefixer())
//             .pipe(postcss([
//                     autoprefixer({
//                         browsers: [
//                             // "> 1%",
//                             "last 5 versions",
//                             "not ie < 8",
//                             // "ios >= 8",
//                             // "android >= 4.0"
//                         ]
//                     })
//                 ]))
//             .pipe(gulp.dest('./test-sass/'))
//     );
// });

// // ejs style templating
// gulp.src('./foo/*.js')
//     .pipe(header('Hello <%= name %>\n', { name: 'World' }))
//     .pipe(gulp.dest('./dist/'))

// // ES6-style template string
// gulp.src('./foo/*.js')
//     .pipe(header('Hello ${name}\n', { name: 'World' }))
//     .pipe(gulp.dest('./dist/'))

// // using data from package.json
// var pkg = require('./package.json');
// var banner = ['/**',
//     ' * <%= pkg.name %> - <%= pkg.description %>',
//     ' * @version v<%= pkg.version %>',
//     ' * @link <%= pkg.homepage %>',
//     ' * @license <%= pkg.license %>',
//     ' */',
//     ''].join('\n');

// gulp.src('./foo/*.js')
//     .pipe(header(banner, { pkg: pkg }))
//     .pipe(gulp.dest('./dist/'))

// // reading the header file from disk
// var fs = require('fs');
// gulp.src('./foo/*.js')
//     .pipe(header(fs.readFileSync('header.txt', 'utf8'), { pkg: pkg }))
//     .pipe(gulp.dest('./dist/'))

// // for use with coffee-script
// return gulp.src([
//     'src/*.coffee',
// ])
//     .pipe(header(banner, { pkg: pkg }))
//     .pipe(sourcemaps.init()) // init sourcemaps *after* header
//     .pipe(coffee({
//         bare: true
//     }))
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('dist/js'))
