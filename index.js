const shields = require('shields-lightweight');

module.exports = BadgeReporter;

function BadgeReporter(runner) {
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

  runner.on('end', function() {

    const subject = process.env.MOCHA_BADGE_SUBJECT || 'tests';
    const okColor = process.env.MOCHA_BADGE_OK_COLOR || 'brightgreen';
    const koColor = process.env.MOCHA_BADGE_KO_COLOR || 'red';
    const style = process.env.MOCHA_BADGE_STYLE;

    const color = (failures > 0) ? koColor : okColor;
    const status = passes + '/' + (passes + failures);

    process.stdout.write(shields.svg(subject, status, color, style));
  });
}
