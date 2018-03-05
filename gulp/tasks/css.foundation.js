'use strict';

module.exports = function() {
  $.gulp.task('css:foundation', function() {
    return $.gulp.src($.path.cssFoundation)
      .pipe($.gp.concatCss('foundation.min.css'))
      .pipe($.gp.csso())
      .pipe($.gp.uncss({
        html: ['build/*.html']
      }))
      .pipe($.gulp.dest($.config.root + '/assets/css'))
  })
};