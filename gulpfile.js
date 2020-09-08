'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var del = require('del');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cleanCSS = require('gulp-clean-css');
var flatmap = require('gulp-flatmap');
var htmlmin = require('gulp-htmlmin');





sass.compiler = require('sass');

gulp.task('sass', function() {
    return gulp.src('./css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('default', function() {
    var files = ["./*html", "./css/*.css", "./img/*.{png,jpg,jpeg,gif}", "./img/carrousel/*.{png,jpg,jpeg,gif}"]
    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('css/*.scss', gulp.series("sass"))
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
});


gulp.task("clean", function() {
    return del(["dist/"])
})

gulp.task("copyfonts", function() {
    return gulp.src("./node_modules/open-iconic/font/fonts/*.{woff,ttf,svg,otf,eot}")
        .pipe(gulp.dest("./dist/fonts/"))
})
gulp.task("imagemin", function() {
    return gulp.src(["./img/*.{png,jpg,jpeg}", "./img/carrousel/*.{png,jpg,jpeg}"], {
            base: './img/'
        })
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest("dist/img"))
})

gulp.task("usemin", function() {
    return gulp.src("./*.html")
        .pipe(flatmap(function(stream, file) {
            return stream
                .pipe(usemin({
                    css: [rev()],
                    html: [function() {
                        return htmlmin({
                            collapseWhitespace: true
                        })
                    }],
                    js: [uglify(), rev()],
                    inlinejs: [uglify()],
                    inlinecss: [cleanCSS(), "concat"]
                }))
        }))
        .pipe(gulp.dest("dist/"))
})

gulp.task("build", gulp.series('clean', "copyfonts", "imagemin", "usemin"))
