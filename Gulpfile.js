var source = require('vinyl-source-stream');
var browserify = require("browserify");
var debowerify = require("debowerify");

var gulp = require('gulp'),
	streamify = require('gulp-streamify'),
	uglify = require('gulp-uglify'),
	changed = require('gulp-changed'),
	imagemin = require('gulp-imagemin'),
	stripDebug = require('gulp-strip-debug'),
	minifyCSS = require('gulp-minify-css'),
	stylus = require('gulp-stylus'),
	prefix = require('gulp-autoprefixer'), //Autoprefixer de CSS
	jade = require('gulp-jade'),
	minifyHTML = require('gulp-minify-html'),
	connect = require('gulp-connect');

/*  ==========================================================================
    Servidor con livereload
    ========================================================================== */
gulp.task('connect', function () {
	var path = (argv.production) ? prodPath : devPath;
	connect.server({
		root: 'app',
		livereload: true
	});
});


gulp.task('js', function(){
	//Home
	var bundleStreamHome = browserify('./app/js/home.js').transform(debowerify).bundle();
	bundleStreamHome
		.pipe(source('home.min.js'))
		.pipe( streamify(uglify()) )
		.pipe( streamify(stripDebug()) )
		.pipe(gulp.dest('./public/js'));

	//Perfil
	var bundleStreamPerfil = browserify('./app/js/perfil.js').transform(debowerify).bundle();
	bundleStreamPerfil
		.pipe(source('perfil.min.js'))
		.pipe( streamify(uglify()) )
		.pipe( streamify(stripDebug()) )
		.pipe(gulp.dest('./public/js'));

	//Portafolio
	var bundleStreamPortafolio = browserify('./app/js/portafolio.js').transform(debowerify).bundle();
	bundleStreamPortafolio
		.pipe(source('portafolio.min.js'))
		.pipe( streamify(uglify()) )
		.pipe( streamify(stripDebug()) )
		.pipe(gulp.dest('./public/js'));

	//Contacto
	var bundleStreamContacto = browserify('./app/js/contacto.js').transform(debowerify).bundle();
	bundleStreamContacto
		.pipe(source('contacto.min.js'))
		.pipe( streamify(uglify()) )
		.pipe( streamify(stripDebug()) )
		.pipe(gulp.dest('./public/js'));
});

gulp.task('stylus', function(){
	gulp.src('./app/stylus/*.min.styl')
		.pipe(stylus({
      compress: true
		}))
		.pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
		.pipe(gulp.dest('./app/css'));
});

gulp.task('css', function(){
	gulp.src(['./app/css/**/*.css', '!./app/css/portafolio.interior.min.css'])
		.pipe(minifyCSS({ keepSpecialComments:'*', keepBreaks:'*' }))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('images', function(){
	var imgDst = './public/img';
	gulp.src('./app/img/**/*')
		.pipe(changed(imgDst))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst));
});

gulp.task('photos', function(){
	var imgDst = './public/photos';
	gulp.src('./app/photos/**/*')
		.pipe(changed(imgDst))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst));
});

gulp.task('jade', function(){
	gulp.src(['./app/jade/*.jade', '!./app/jade/portafolio-interior.jade'])
		.pipe(jade({ pretty: true }))
		.pipe(gulp.dest('./app'));
});

gulp.task('html', function(){
	gulp.src('./app/*.html')
		.pipe(minifyHTML())
		.pipe(gulp.dest('./public'));
});

gulp.task('fonts', function(){
	gulp.src('./app/fonts/**')
		.pipe(gulp.dest('./public/fonts'));
});

gulp.task('data', function(){
	gulp.src('./app/data/**')
		.pipe(gulp.dest('./public/data'));
});

gulp.task('pdf', function(){
	gulp.src('./app/pdf/**')
		.pipe(gulp.dest('./public/pdf'));
});
