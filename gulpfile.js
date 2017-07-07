'use strict';
//sass variables
var gulp = require('gulp');
var sass = require('gulp-sass');
// var watch = require('gulp-watch');

//w3c variables
var validate = require('gulp-w3c-css');

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var srcPath = './assets/css/*.css';
var dstPath = './build';
//html variables
var htmlhint = require("gulp-htmlhint");
//babel variables
//const gulp = require('gulp');
const babel = require('gulp-babel');
//beautify variable
var beautify = require('gulp-beautify');
//uncss
var uncss = require('gulp-uncss');
//complexity
var complexity = require('gulp-complexity');
//jshint
const jshint = require('gulp-jshint');


//sass function
gulp.task('sass', function() {
  return gulp.src('./assets/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./assets/css'));
});

//w3c css function
gulp.task('validate', function() {
  return gulp.src(srcPath)
    .pipe(validate())
    .pipe(gulp.dest(dstPath));
});

//htmlhint
gulp.task ('htmlhint', function() {
  return gulp.src("./src/*.html")
      .pipe(htmlhint())
});

//babel
gulp.task('babel', () => {
    return gulp.src('src/assets.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

//beautify
gulp.task('beautify', function() {
  gulp.src('./assets/*.js')
    .pipe(beautify({indent_size: 2}))
    .pipe(gulp.dest('./public/'))
});

//uncss

gulp.task('uncss', function () {
    return gulp.src('./assets/css/*.css')
        .pipe(uncss({
            html: ['index.html']
        }))
        .pipe(gulp.dest('./out'));
});

//complexity
gulp.task('complexity', function(){
	return gulp.src('./assets/js/*.js')
		.pipe(complexity());
});

//jshint
gulp.task('lint', function() {
  return gulp.src('./assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('fail'));
});

// gulp.task('watch', function () {
//   gulp.watch('./assets/sass/*.scss', ['sass']);
//  });

gulp.task('default', ['sass', 'validate', 'htmlhint', 'babel', 'beautify', 'uncss', 'complexity', 'lint' ]);

gulp.task('default', ['sass', 'validate', 'uncss']);                  //css
gulp.task('default', ['htmlhint']);                                   //html
gulp.task('default', ['babel', 'beautify', 'complexity', 'lint' ]);   //js
