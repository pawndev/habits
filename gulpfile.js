let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let livereload = require('gulp-livereload');
let sourcemaps = require('gulp-sourcemaps');
let cleanCss = require('gulp-clean-css');
let ts = require('gulp-typescript');
let tsConfig = require('./tsconfig.json');

let paths = {
    cssSrc: 'app/public/sass/*.scss',
    cssDist: 'dist/public/styles',
    tsSrc: 'app/**/*.ts',
    tsDist: 'dist/scripts'
}

gulp.task('sass-dev', function () {
    gulp.src(paths.cssSrc)
      .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
          browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.cssDist))
        .pipe(livereload());
});

gulp.task('sass', function () {
    gulp.src(paths.cssSrc)
        .pipe(sass())
        .pipe(autoprefixer({
          browsers: ['last 2 versions']
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest(paths.cssDist))
});

gulp.task('typescript-dev', function () {
    return gulp.src(paths.tsSrc)
        .pipe(sourcemaps.init())
        .pipe(ts(tsConfig.CompilerOptions))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.tsDist));
});

gulp.task('typescript', function () {
    return gulp.src(paths.tsSrc)
        .pipe(ts({
            noImplicitAny: true,
            target: 'ES5',
            sortOutput: true
        }))
        .pipe(gulp.dest(paths.tsDist));
});

gulp.task('default', ['sass-dev', 'typescript-dev']);
gulp.task('production', ['sass', 'typescript']);

gulp.task('watch', ['sass-dev'], function() {
	livereload.listen();
    gulp.watch(['*.html', '*.js']).on('change', livereload.changed);
	gulp.watch('styles/**', ['sass-dev']);
    gulp.watch(paths.tsSrc, ['typescript-dev']);
});