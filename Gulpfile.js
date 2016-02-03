// Project specific variables
var url = 'yoururl.app'; // Local dev URL. Change as needed.

// Load plugins
var 
	gulp         = require('gulp'),
	stylus       = require('gulp-stylus'),
	autoprefixer = require('autoprefixer'),
	lost         = require('lost'),
	poststylus   = require('poststylus'),
	rucksack     = require('rucksack-css'),
	typographic  = require('typographic'),
	axis         = require('axis'),
	rupture      = require('rupture'),
	minifyCss    = require('gulp-minify-css'),
	rename       = require('gulp-rename'),
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

// Styles
gulp.task('styles', function(){
	return gulp.src('./styl/*.styl') // Two files get compiled here: main stylsheet (all partials imported) and editor stylesheet. Makes for simple gulpfile config, but maybe not best approach. Comments welcome! 
 	.pipe(stylus(stylus_options))
	.pipe(gulp.dest('./'))
	.pipe(rename({ suffix: '.min' }))
	.pipe(minifyCss())
	.pipe(gulp.dest('./'))
  .pipe(browserSync.stream());
});


gulp.task('browser-sync', function(){
	browserSync.init({
        proxy: url,
        notify: false
    });
});

// Watch!
gulp.task('watch',['browser-sync'], function(){
	gulp.watch('./styl/**/*.styl', ['styles']);
});
