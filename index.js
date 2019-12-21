const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

const { BadgeFactory } = require('gh-badges');
const bf = new BadgeFactory()

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
      badge_subject, badge_ok_color, badge_ko_color, badge_label_color,
      badge_style, badge_path
    } = (options && options.reporterOptions) || {};

    const subject = badge_subject || process.env.MOCHA_BADGE_SUBJECT || 'tests';
    const okColor = badge_ok_color || process.env.MOCHA_BADGE_OK_COLOR || 'brightgreen';
    const koColor = badge_ko_color || process.env.MOCHA_BADGE_KO_COLOR || 'red';
    const labelColor = badge_label_color || process.env.MOCHA_BADGE_LABEL_COLOR; // gray is default
    const style = badge_style || process.env.MOCHA_BADGE_STYLE;

    const color = (failures > 0) ? koColor : okColor;
    const status = passes + '/' + (passes + failures);

    const format = {
      text: [subject, status],
      format: 'svg', // or `json`
      color,
      labelColor,
      template: style
    };
    const svg = bf.create(format);
    if (badge_path) {
      writeFile(badge_path, svg);
      return;
    }

    process.stdout.write(svg);
  });
}
