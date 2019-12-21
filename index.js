const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

const shields = require('shields-lightweight');

module.exports = BadgeReporter;

function BadgeReporter(runner, options) {
  let passes = 0;
  let failures = 0;

  runner.on('start', function() {
  });

  runner.on('pass', function() {
    passes++;
  });

  runner.on('fail', function() {
    failures++;
  });

  runner.on('end', function () {
    const {
      badge_subject, badge_ok_color, badge_ko_color, badge_style, badge_path
    } = (options && options.reporterOptions) || {};

    const subject = badge_subject || process.env.MOCHA_BADGE_SUBJECT || 'tests';
    const okColor = badge_ok_color || process.env.MOCHA_BADGE_OK_COLOR || 'brightgreen';
    const koColor = badge_ko_color || process.env.MOCHA_BADGE_KO_COLOR || 'red';
    const style = badge_style || process.env.MOCHA_BADGE_STYLE;

    const color = (failures > 0) ? koColor : okColor;
    const status = passes + '/' + (passes + failures);

    const svg = shields.svg(subject, status, color, style);

    if (badge_path) {
      writeFile(badge_path, svg);
      return;
    }

    process.stdout.write(svg);
  });
}
