import gulp from "gulp";
import plumber from "gulp-plumber";
import sass from "gulp-dart-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import rename from "gulp-rename";
import htmlmin from "gulp-htmlmin";
import concat from "gulp-concat";
import terser from "gulp-terser";
import squoosh from "gulp-libsquoosh";
import browser from "browser-sync";

// Styles

export const styles = () => {
  return gulp
    .src("source/sass/style.scss", { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))
    .pipe(browser.stream());
};

// HTML

const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(plumber())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"))
    .pipe(browser.stream());
};

// Script

const script = () => {
  return gulp
    .src("source/js/*.js")
    .pipe(concat("script.js"))
    .pipe(terser())
    .pipe(gulp.dest("build/js"));
};

// Images

const optimizeImages = () => {
  return gulp
    .src("source/img/**/*.{jpg,png}")
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"));
};

const copyImages = () => {
  return gulp.src("source/img/**/*.{jpg,png}").pipe(gulp.dest("build/img"));
};

// Webp
export const createWebp = () => {
  return gulp
    .src("source/img/**/*.{jpg,png}", "!source/img/favicons/*.png")
    .pipe(
      squoosh({
        webp: {},
      })
    )
    .pipe(gulp.dest("build/img"));
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/*.html", gulp.series(html)).on("change", browser.reload);
  gulp
    .watch("source/js/*.js", gulp.series(script))
    .on("change", browser.reload);
  gulp
    .watch("source/img/**/*.{jpg,png}", gulp.series(copyImages))
    .on("change", browser.reload);
};

export default gulp.series(html, styles, script, copyImages, server, watcher);
