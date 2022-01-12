 const gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass')(require('sass'));
    browserSyncApp = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = import('gulp-imagemin'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require("gulp-notify"),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace');
    // watch = require('gulp-watch');
  //  clean    = require('gulp-clean');
   const {series, parallel, watch, src, dest, task} = gulp



function html() {
    return gulp
              .src('app/*.html')
              .pipe(htmlmin({ collapseWhitespace: true }))
              .pipe(gulp.dest('dist'));
};
function css() {
    return gulp
              .src('app/css/*.css')
              .pipe(htmlmin({ collapseWhitespace: true }))
              .pipe(gulp.dest('dist/css'));
};

function js() {
    return gulp.src([
        'app/js/jquery-3.4.1.min.js',
        'app/js/jquery.validate.min.js',
        'app/js/main.js'
    ])
        .pipe(concat('scripts.min.js'))  // склеить??
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
    
        
};

gulp.task('browserSyncApp', function() {
  browserSync.init({
      server: {
          baseDir: "../client/dist"
      },
      notify: false
  });
});


gulp.task('svg', function () {
  return gulp.src('app/img/*.svg')
      .pipe(svgmin({
          js2svg: {
              pretty: true
          }
      }))
      .pipe(cheerio({
          run: function ($) {
              $('[fill]').removeAttr('fill');
              $('[stroke]').removeAttr('stroke');
              $('[style]').removeAttr('style');
          },
          parserOptions: {xmlMode: true}
      }))
      .pipe(replace('&gt;', '>'))
      .pipe(svgSprite({
          mode: {
              symbol: {
                  sprite: "../sprite.svg"
              }
          }
      }))
      .pipe(gulp.dest('app/img'));

});

async function imageminApp () {
    gulp.src('app/img/**/**/*')
        .pipe(gulp.dest('dist/img'));

     
};

gulp.task('removedist', function () {
    return del('dist');
});
    
    



exports.html = html;
exports.js = js;
exports.css = css;
exports.imageminApp = imageminApp;




exports.build = series ('removedist', html, css, js,'svg', imageminApp );

























