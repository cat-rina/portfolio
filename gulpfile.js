var gulp 				= require('gulp'),
	autoprefixer 	= require('gulp-autoprefixer'),
	browserSync 	= require('browser-sync'),
	cache       	= require('gulp-cache'),
	cssnano				= require('gulp-cssnano'),
	concat 				= require('gulp-concat'),
	uglify				= require('gulp-uglify'),
	del						= require('del'),
	gcmq 					= require('gulp-group-css-media-queries'),
	gutil 				= require('gulp-util'),
	imagemin			= require('gulp-imagemin'),
	imageminPngquant = require('imagemin-pngquant'),
	imageminMozjpeg = require('imagemin-mozjpeg'),
	notify 				= require( 'gulp-notify' ),
	pngquant			= require('imagemin-pngquant'),
	rename				= require('gulp-rename'),
	sass 					= require('gulp-sass'),
	pug 					= require('gulp-pug')


//pug
gulp.task('pug', function buildHTML() {
  return gulp.src('src/pug/*.pug')
		.pipe(pug().on( 'error', notify.onError(
      {
        message: "<%= error.message %>",
        title  : "Pug Error!"
      }))
		)
    .pipe(pug({
    	pretty: true
    }))
    .pipe(gulp.dest('src'))
    .pipe(browserSync.reload({stream: true}))
});

// sass - css
gulp.task('sass', function(){
	return gulp.src('src/sass/**/*.sass')
		.pipe(sass().on( 'error', notify.onError(
      {
        message: "<%= error.message %>",
        title  : "Sass Error!"
      }))
		)
		.pipe(gcmq())
		.pipe(autoprefixer({
            browsers: ['last 3 versions', '> 1%', 'ie 10', 'ie 11'],
            cascade: false
        }))
		.pipe(gulp.dest('src/sass/out'))
		.pipe(browserSync.reload({stream: true}))
});


//js-min
gulp.task('scripts', function(){
	return gulp.src('src/js-src/**/*.js')
	.pipe(uglify().on('error', notify.onError(
    {
      message: "<%= error.message %>",
      title  : "JSmin Error!"
    }))
	)
	.pipe(concat('script.min.js'))
	.pipe(gulp.dest('src/js'))
	.pipe(browserSync.reload({stream: true}))
});

// csss min
gulp.task('css', ['sass'], function(){
	return gulp.src('src/sass/out/*.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.reload({stream: true}))
});



// bowser-sync
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'src'
		},
		notify: false
	})
});

// del in dist
gulp.task('clearCache', function(){
	return del.sync('www')
});


// img compress
gulp.task('img', function(){
	return gulp.src('src/images/**/*')
	.pipe(imagemin([
      imagemin.gifsicle(),
      imageminMozjpeg(),
      imageminPngquant()],
    {verbose: true}))
	.pipe(gulp.dest('www/images'));
});



//browser-watch
gulp.task('watch', ['browser-sync', 'pug', 'css', 'scripts'], function() {
	gulp.watch('src/**/*.scss', ['sass']);
	gulp.watch('src/scss/**/*.css', ['css']);
	gulp.watch('src/**/*.pug', ['pug']);
	gulp.watch('src/js-src/**/*.js', ['scripts']);
});


//production
gulp.task('build', ['img', 'sass', 'scripts'], function(){
	var buildCss = gulp.src([
		'src/css/*.css'])
		.pipe(gulp.dest('www/css'))

	var bildJs = gulp.src('src/js/**/*')
		.pipe(gulp.dest('www/js'))

	var bildHtml = gulp.src('src/*.html')
		.pipe(gulp.dest('www'))

	var buildImg = gulp.src([
		'src/images/**'])
		.pipe(gulp.dest('www/images'))

	var buildFonts = gulp.src([
		'src/fonts/**'])
		.pipe(gulp.dest('www/fonts'))

});
