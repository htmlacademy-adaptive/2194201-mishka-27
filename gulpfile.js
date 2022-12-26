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
import svgo from "gulp-svgmin";
import svgstore from "gulp-svgstore";
import del from "del";
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

const createWebp = () => {
  return gulp
    .src(["source/img/**/*.{jpg,png}", "!source/img/favicons/*.png"])
    .pipe(
      squoosh({
        webp: {},
      })
    )
    .pipe(gulp.dest("build/img"));
};

// SVG

const svg = () => {
  return gulp
    .src(["source/img/svg/*.svg", "!source/img/sprite/*.svg"])
    .pipe(svgo())
    .pipe(gulp.dest("build/img/svg"));
};

const sprite = () => {
  return gulp
    .src("source/img/svg/sprite/*.svg")
    .pipe(svgo())
    .pipe(rename({ prefix: "icon-" }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/svg"));
};

// Copy

const copy = (done) => {
  gulp
    .src(
      ["source/fonts/*.{woff2,woff}", "source/*.ico", "source/*.webmanifest"],
      { base: "source" }
    )
    .pipe(gulp.dest("build"));
  done();
};

// Clean

const clean = () => {
  return del("build");
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

// Reload

const reload = (done) => {
  browser.reload();
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
    .watch("source/img/**/*.{jpg,png}", gulp.series(copyImages, createWebp))
    .on("change", browser.reload);
  gulp
    .watch("source/img/svg/*.svg", gulp.series(svg))
    .on("change", browser.reload);
  gulp
    .watch("source/img/svg/sprite/*.svg", gulp.series(sprite))
    .on("change", browser.reload);
};

export default gulp.series(
  html,
  styles,
  script,
  copyImages,
  createWebp,
  svg,
  sprite,
  copy,
  server,
  watcher
);
