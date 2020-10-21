// Gulp, Concat, Browsersync, Sourcemaps, Sass and babel is included and their functionality is prepared
const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const browsersync = require("browser-sync").create();
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");

// File paths
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/**/*.css",
    jsPath: "src/**/*.js",
    imgPath: ("src/**/*.jpg", "src/**/*.png", "src/**/*.gif", "src/**/*.pdf", "src/**/*.webp"),
    sassPath: "src/**/*.scss"
}

// Copy HTML-files
function copyHTML() {
    return src(files.htmlPath)
        .pipe(dest('pub'));
}

//Concatinate and minify Js-files
function jsTask(){
    return src(files.jsPath)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write("/."))
        .pipe(dest('pub/js'));
}

function sassTask(){
    return src(files.sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write("/."))
        .pipe(dest('pub'));
        
}

// Watcher
function watchTask(){

    browsersync.init({
        server: {
            baseDir: "./pub"
        }
    });

    watch([files.htmlPath, files.jsPath, files.cssPath, files.sassPath], 
        parallel(copyHTML, jsTask, sassTask)).on('change', browsersync.reload);
}

// Default task
exports.default = series(
    parallel(copyHTML, jsTask, sassTask), watchTask
);