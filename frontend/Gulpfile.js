// No Gulp
var source = require('vinyl-source-stream');
var debowerify = require("debowerify");

// Gulp
var gulp = require('gulp'),

	// Utilidades
	changed = require('gulp-changed'),
	rename = require('gulp-rename'),

	// Javascript
	browserify = require('gulp-browatchify'),
	uglify = require('gulp-uglify'),
	stripDebug = require('gulp-strip-debug'),

	// Css
	cleanCSS = require('gulp-clean-css');
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
	browserSync.init({
    server: {
      baseDir: "./app"
    }
  });
});

// JS Browserify
var browserify_process = function(){

	var files = ['home', 'contacto', 'perfil', 'portafolio'];
	var counter_process = 0;
	var reload_sever = false;

	var gulp_sync = function( file_name ){
		var name = file_name + '.js',
				output_name = file_name + '.min.js';

		return gulp.src('./app/js/'+ name)
			.pipe(browserify({
				debug: !process.env.production,
				transforms:[debowerify]
			}))
			.pipe(source(output_name))
			.pipe(gulp.dest('./app/js'))
			.on('end', function(){
				browserSync.reload();
			});
	};

	for (var i = 0; i < files.length; i++) {
		gulp_sync( files[i] );
	}

};

// JS
gulp.task('js', function(){
	gulp.src('./app/js/*.min.js')
	.pipe(uglify())
	.pipe(stripDebug())
	.pipe(gulp.dest('./public/js'));
});


// Stylus
gulp.task('stylus', function(){
	gulp.src('./app/stylus/*.min.styl')
		.pipe(stylus({
      compress: true
		}))
		.pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
		.pipe(gulp.dest('./app/css'))
		.on('end', function(){
			browserSync.reload();
		});
});

// CSS
gulp.task('css', function(){
	gulp.src(['./app/css/**/*.css', '!./app/css/portafolio.interior.min.css'])
		.pipe(cleanCSS())
		.pipe(gulp.dest('./public/css'));
});

// Jade
gulp.task('jade', function(){
	console.log("Jade ...");
	gulp.src(['./app/jade/pages/*.jade'])
		.pipe(jade({ pretty:true }))
		.pipe(gulp.dest('./app'))
		.on('end', function(){
			browserSync.reload();
		});
});

// HTML
gulp.task('html', function(){
	gulp.src(['./app/*.html', '!./app/portafolio-interior.html'])
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./public'));
});

// Imágenes
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
		.pipe(changed(imgDst))
    .pipe(tinypng('CHD9zVb-3FcqW3C0kzIX_fR3L-UArybO'))
    .pipe(gulp.dest(imgDst));
});

gulp.task('photos', function(){
	var imgDst = './public/photos';
	gulp.src('./app/photos/**/*.png')
		.pipe(changed(imgDst))
		// .pipe(imagemin())
		.pipe(tinypng('CHD9zVb-3FcqW3C0kzIX_fR3L-UArybO'))
		.pipe(gulp.dest(imgDst));
});

// Fuentes
gulp.task('fonts', function(){
	gulp.src('./app/fonts/**')
		.pipe(gulp.dest('./public/fonts'));
});

// Datos
gulp.task('data', function(){
	gulp.src('./app/data/**/*.json')
		.pipe(changed('./public/data'))
		.pipe(gulp.dest('./public/data'));
});

// Archivos PDF
gulp.task('pdf', function(){
	gulp.src('./app/pdf/**')
		.pipe(gulp.dest('./public/pdf'));
});

/*-------------------------------------------------------------------------*
:: Init
--------------------------------------------------------------------------*/
gulp.task('start', function(){
	gulp.start('server');
	gulp.watch(['./app/stylus/**/*.styl'], ['stylus']);
	gulp.watch(['./app/jade/**/*.jade', './app/jade/**/*.html'], ['jade']);
	gulp.watch(['./app/js/**/*.js', '!./app/js/*.min.js'], function(){
		browserify_process();
	});
});
