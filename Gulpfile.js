// No Gulp plugins
var source = require('vinyl-source-stream');
var browserify = require("browserify");
var debowerify = require("debowerify");

var gulp = require('gulp'),
	// Archivos varios
	changed = require('gulp-changed'),
	// Javascript
	uglify = require('gulp-uglify'),
	streamify = require('gulp-streamify'),
	stripDebug = require('gulp-strip-debug'),
	// Css
	minifyCSS = require('gulp-minify-css'),
	stylus = require('gulp-stylus'),
	prefix = require('gulp-autoprefixer'),
	// Html
	jade = require('gulp-jade'),
	htmlmin = require('gulp-htmlmin'),

	// Imágenes
	imagemin = require('gulp-imagemin'),
	tinypng = require('gulp-tinypng'),

	// Server
	browserSync = require('browser-sync').create();

/*-------------------------------------------------------------------------*
:: Servidor Livereload
--------------------------------------------------------------------------*/
gulp.task('server', function () {
	//var path = (argv.production) ? prodPath : devPath;
	browserSync.init({
    server: {
      baseDir: "./public"
    }
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



/*-------------------------------------------------------------------------*
:: Jade y HTML
--------------------------------------------------------------------------*/
gulp.task('jade', function(){
	gulp.src(['./app/jade/pages/*.jade'])
		.pipe(jade({ pretty:true }))
		.pipe(gulp.dest('./app'))
		.on('end', function(){
			browserSync.reload();
		});
});

// Minificar HTML
gulp.task('html', function(){
	gulp.src('./app/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./public'));
});

/*-------------------------------------------------------------------------*
:: Imágenes
--------------------------------------------------------------------------*/
gulp.task('no-png', function(){
	var imgDst = './public/img';
	gulp.src(['./app/img/**/*', '!./app/img/**/*.png']) // Todas las imágenes menos los PNG
		.pipe(changed(imgDst))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst));
});

gulp.task('png', function(){
	var imgDst = './public/img';
	gulp.src('./app/img/**/*.png') // Sólo los archivos PNG
    .pipe(tinypng('CHD9zVb-3FcqW3C0kzIX_fR3L-UArybO'))
    .pipe(gulp.dest(imgDst));
});

gulp.task('photos', function(){
	var imgDst = './public/photos';
	gulp.src('./app/photos/**/*')
		.pipe(changed(imgDst))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst));
});

/*-------------------------------------------------------------------------*
:: Fuentes
--------------------------------------------------------------------------*/
gulp.task('fonts', function(){
	gulp.src('./app/fonts/**')
		.pipe(gulp.dest('./public/fonts'));
});

/*-------------------------------------------------------------------------*
:: Datos y PDF
--------------------------------------------------------------------------*/
gulp.task('data', function(){
	gulp.src('./app/data/**')
		.pipe(gulp.dest('./public/data'));
});

gulp.task('pdf', function(){
	gulp.src('./app/pdf/**')
		.pipe(gulp.dest('./public/pdf'));
});

/*-------------------------------------------------------------------------*
:: Init
--------------------------------------------------------------------------*/
gulp.task('start', function(){
	gulp.start('server');
	gulp.watch(['./app/jade/**/*.jade'], ['jade']);
});
