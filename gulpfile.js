"use strict";

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

global.$ = {
    dev: isDevelopment,
    browserSync: require('browser-sync').create(),
    config: require('./gulp/config'),
    cssunit: require('gulp-css-unit'),
    del: require('del'),
    imagemin: require("gulp-imagemin"),
    imageminJpegRecompress: require('imagemin-jpeg-recompress'),
    imageminPngquant: require('imagemin-pngquant'),
    gulp: require('gulp'),
    merge: require('merge-stream'),
    package: require('./package.json'),
    spritesmith: require('gulp.spritesmith'),
    webpack: require('webpack-stream'),
    webpackConfig: require('./webpack.config.js'),
    gp: require('gulp-load-plugins')({
        rename: {
            'gulp-replace-task': 'replaceTask'
        }
    }),
    path: {
        task: require('./gulp/paths/tasks.js'),
        jsFoundation: require('./gulp/paths/js.foundation.js'),
        cssFoundation: require('./gulp/paths/css.foundation.js')
    }
};

$.path.task.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'pug',
        // 'html',
        'css:foundation',
        'sass',
        'js:foundation',
        'js:process',
        'copy:root',
        'copy:image',
        'copy:fonts',
        'copy:favicon',
    ),
    $.gulp.parallel(
        'watch',
        'serve'
    )
));

$.gulp.task('build', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'pug',
        // 'html',
        'css:foundation',
        'sass',
        'js:foundation',
        'js:process',
        'copy:root',
        'copy:image',
        'copy:fonts',
        'copy:favicon'
    )
));

$.gulp.task('image', $.gulp.series(
    $.gulp.parallel(
        'sprite:svg',
        'sprite:png',
        'optim:image'
    )
));

