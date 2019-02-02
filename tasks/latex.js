const shell = require("gulp-shell");

module.exports = (gulp) => {
  gulp.task('latex2pdf', shell.task([
    'bash lib/pdf_all.sh'
  ]));

  gulp.task('compile', gulp.series('latex2pdf'));
};
