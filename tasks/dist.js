const del = require('del');
const fs = require('fs');

module.exports = (gulp, config) => {
  gulp.task('dist:del', () => {
    return del([config.distDirname]);
  });

  gulp.task('dist:mk', (done) => {
    return fs.mkdir(config.distDirname, done);
  });

  gulp.task('dist:reset', gulp.series('dist:del', 'dist:mk', (done) => {
    done();
  }));

};
