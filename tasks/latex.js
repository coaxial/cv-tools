const shell = require("gulp-shell");
const gutil = require("gulp-util");

module.exports = (gulp) => {
  gulp.task('compile', (done) => {
    gutil.log('🖨  Change detected, recompiling!');
    gulp.series('latex2pdf');
    done();
  });

  gulp.task('latex2pdf', shell.task([
    'bash lib/pdf_all.sh'
  ]));
};
