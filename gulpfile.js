const gulp=require('gulp');
const rename=require('gulp-rename');
const sass=require('gulp-sass');
const autoprefixer=require('gulp-autoprefixer');
const ejs = require("gulp-ejs");
const imagemin = require('gulp-imagemin');

function minifyImg(done){
    gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img/'));
    done();
}

function convertSassToCss(done){
    gulp.src('./src/scss/style.scss')
        .pipe(sass({
            errLogToConsole:true,
            outputStyle: 'compressed'
        }))
        .on('error',console.error.bind(console))
        .pipe(autoprefixer(
            ['last 2 versions'])
        )
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./build/css/'));
    done();
}

function convertEjsToHtml(done){
    gulp.src('./src/templates/index.ejs')
    .pipe(ejs({ title: 'Leon'}))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('./build/'));
    done();
}

exports.default=gulp.series(minifyImg,convertSassToCss,convertEjsToHtml);