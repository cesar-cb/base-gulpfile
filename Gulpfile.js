// Project specific variables
var url = 'yoururl.app'; // Local dev URL. Change as needed.

// Load plugins
var 
gulp         = require('gulp'),
stylus       = require('gulp-stylus'),
pug          = require('gulp-pug'),
autoprefixer = require('autoprefixer'),
lost         = require('lost'),
poststylus   = require('poststylus'),
rucksack     = require('rucksack-css'),
typographic  = require('typographic'),
axis         = require('axis'),
rupture      = require('rupture'),
minifyCss    = require('gulp-minify-css'),
rename       = require('gulp-rename'),
plumber      = require('plumber'),
browserSync  = require('browser-sync').create()



//- Load Libs for Stylus
var stylus_options = {
  use: [poststylus([
    'lost', 
    'rucksack-css', 
    autoprefixer({browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']})]),
  rupture(),
  axis(),
  typographic()]
};


gulp.task('styles', function(){
  return gulp.src('./app/stylus/*.styl') // Two files get compiled here: main stylsheet (all partials imported) and editor stylesheet. Makes for simple gulpfile config, but maybe not best approach. Comments welcome! 
  .pipe(stylus(stylus_options))
  .pipe(gulp.dest('./public/css'))
  .pipe(browserSync.stream())
  .pipe(rename({ suffix: '.min' }))
  .pipe(minifyCss())
  .pipe(gulp.dest('./public/css'))
  
});

gulp.task('pug', function buildHTML() {
  return gulp.src('./app/views/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./public'))
});

gulp.task('js', function() {
  return gulp.src('./app/js/main.js')
  .pipe(uglify())
  .pipe(gulp.dest('./public/js/min'));
});

/* If you want proxy */

// gulp.task('browser-sync', function(){
//   browserSync.init({
//         // proxy: url,
//         notify: false,
//         baseDir: "./public"
//     });
// });

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });
});

// Watch!
gulp.task('default',['browser-sync', 'styles', 'pug'], function(){
  gulp.watch('./app/stylus/**/*.styl', ['styles']);
  gulp.watch('./app/views/**/*.pug', ['pug']);
  gulp.watch("./public/*.html").on('change', browserSync.reload);
});
