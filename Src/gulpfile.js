var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserify = require('gulp-browserify');
var gutil = require('gulp-util');
var path = require('path');

var configs = {
    rootDir: './ReactBookStore.Web/clientsrc',
    jsDir: this.rootDir + '/scripts'
};

var onError = function (err) {  
  gutil.beep();
  console.log(err);
};

gulp.task('combinejs', function(){
    return gulp.src('./ReactBookStore.Web/clientsrc/vendors/**/*.js')
		.pipe(plumber({
            errorHandler: onError
        }))
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./ReactBookStore.Web/assets/scripts'));
});

gulp.task('browserify', function(){
	return gulp.src('./ReactBookStore.Web/clientsrc/scripts/**/*-page.react.js')
		.pipe(plumber({
            errorHandler: onError
        }))
		.pipe(browserify({ transform: 'reactify' }))
        .pipe(uglify())
		.pipe(gulp.dest('./ReactBookStore.Web/assets/scripts'));
});



gulp.task('less', function(){
	gulp.src('ReactBookStore.Web/clientsrc/less/site.less')
		.pipe(plumber({
            errorHandler: onError
        }))
		.pipe(less({
      		paths: [ path.join(__dirname, 'less', 'includes') ]
    	}))
    	.pipe(gulp.dest('./ReactBookStore.Web/assets/css'));
});

gulp.task('default', ['browserify', 'combinejs', 'less']);

gulp.task('watch', function(){
	gulp.watch('./ReactBookStore.Web/clientsrc/**/*.*', ['default']);
});