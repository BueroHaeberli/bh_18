var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    cleancss = require('gulp-clean-css'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    revManifest = require('gulp-revmanifest'),    
    browserSync = require('browser-sync').create();

gulp.task('build-css', function() {
  gulp.src('public/assets/sass/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(rev())
    .pipe(gulp.dest('public/assets/build'))    
    .pipe(revManifest('public/assets/build/rev-manifest.json', {
      base: process.cwd()+'/public/assets/build',
      merge: true
    }))    
    .pipe(gulp.dest('public/assets/build'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('coffee2js', function() {
  return gulp.src('public/assets/js/coffee/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('public/assets/javascripts/js'));
});

gulp.task('build-js', ['coffee2js'], function() {
  //gulp.src(['public/assets/javascripts/vendor/jquery/*.js','public/assets/javascripts/vendor/*.js','public/assets/javascripts/app.js'])
  gulp.src(['bower_components/jquery/dist/jquery.js',
    'public/assets/javascripts/vendor/*.js',
    'public/assets/javascripts/vendor/plugins/*.js',
    'public/assets/javascripts/js/app.js'])
    .pipe(concat('bundle.js'))
    .pipe(gutil.env.type === 'prod' ? uglify() : gutil.noop())
    .pipe(rev())
    .pipe(gulp.dest('public/assets/build'))    
    .pipe(revManifest('public/assets/build/rev-manifest.json', {
      base: process.cwd()+'/public/assets/build',
      merge: true
    }))
    .pipe(gulp.dest('public/assets/build'))            
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('default', function(){

  browserSync.init({
    open: 'external',
    host: 'buerohaeberli.local',
    proxy: 'buerohaeberli.local',
    port: 8080 // for work mamp
  });

  gulp.watch('public/assets/js/coffee/*.coffee', ['coffee2js','build-js']);
  gulp.watch('public/assets/sass/**/*.scss', ['build-css']);
  gulp.watch(['craft/templates/**/*.html']).on('change', browserSync.reload);

});
