const gutil = require('gulp-util');
const exec = require('child_process').exec;

module.exports = (gulp, config) => {
  gulp.task('pack:zip', gulp.series('dist:reset', (done) => {
    const zipCommand = 'zip'
    let zipCommandArgs = '--junk-paths'
    const password = config.configFile.archive_password;

    if (password === undefined) {
      throw new gutil.PluginError({
        plugin: 'pack:zip',
        message: gutil.log(gutil.colors.inverse.red('No password set in config.json for archive, aborting!'))
      });
    };

    if (password === "") {
      gutil.log(gutil.colors.inverse.yellow('WARNING: Empty password set in config.json, packing WIHTOUT PASSWORD!'))
    }

    if (password) {
      gutil.log(`📦  Packing with password '${password}'`);
      zipCommandArgs = `${zipCommandArgs} --password ${password}`
    }

    exec(`${zipCommand} ${zipCommandArgs} ${config.archivePath} ${config.resumePath}`, (err, stdout, stderr) => {
      if (stderr) {
        gutil.log(gutil.colors.red(stderr));
      }

      if (err) {
        // Usually fails because it can't find the PDF file
        gutil.log(gutil.colors.red('Failed. Did you forget to run pdflatex, maybe?'));
      }

      done(err);
    });
  }));
};
