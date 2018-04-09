const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const cssmin      = require('gulp-cssmin');
// const concatcss   = require('gulp-concat-css');
// const htmllint    = require('gulp-htmllint');
// const fancyLog    = require('fancy-log');
// const colors      = require('ansi-colors');
// const htmlmin     = require('gulp-minify-html');

// compile scss into css and auto inject into browsers
gulp.task('scss', () => {
    return gulp.src(['src/scss/*.scss'])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// gulp.task('scss_prod', () => {
//     return gulp.src(['node_modules/bootstrap/scss/functions',
//                     'node_modules/bootstrap/scss/variables',
//                     'node_modules/bootstrap/scss/mixins',
//                     'src/scss/*.scss'])
//     .pipe(sass({outputStyle: 'compressed'}))
//     // .pipe(concatcss('bundle.css'))
//     .pipe(cssmin())
//     .pipe(gulp.dest('dist/css'));
// });

gulp.task('html', () => {
    return gulp.src('src/index.html')
    .pipe(gulp.dest('dist/'))
})

gulp.task('copy_assets', () => {
    return gulp.src('src/assets/**/*.*')
    .pipe(gulp.dest('dist/assets'));
})

gulp.task('copy_fonts', () => {
    gulp.src('node_modules/font-awesome/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));
})

// move the javascript files into our /src/js folder 
gulp.task('js', () => {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
                     'node_modules/jquery/dist/jquery.min.js', 
                     'node_modules/popper.js/dist/popper.min.js'])
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});


// Static Server + watching scss/html files
gulp.task('serve', ['scss', 'js', 'html', 'copy_fonts', 'copy_assets'], () => {

    browserSync.init({
        server: './dist'
    });

    gulp.watch(['src/scss/*.scss'], ['scss']);
    gulp.watch('src/*.html', ['html']).on('change', browserSync.reload);
})

gulp.task('default', ['serve']);


// gulp.task('production', ['scss_prod', 'js', 'copy_assets', 'html'], () => {
//     console.log('production build runs');
// });



// // helper functions
// function htmllintReporter(filepath, issues) {
//     fancyLog('dies ist ein test');
//     if (issues.length > 0) {
//         issues.forEach(function (issue) {
//             fancyLog(colors.cyan('[gulp-htmllint] ') + colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + colors.red('(' + issue.code + ') ' + issue.msg));
//         });
 
//         process.exitCode = 1;
//     }
// }
