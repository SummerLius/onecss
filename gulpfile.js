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
        .pipe(csso())
        .pipe(rename(function(path) {
                path.basename += '.min';
            }))
        .pipe(gulp.dest(dist));
});

gulp.task('sass:watch', function() {
    gulp.watch('./test-sass/*.scss', ['sass']);
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

gulp.task('default', ['build:style']);

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
