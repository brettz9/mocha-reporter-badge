const assert = require('assert');
const events = require('events');
const BadgeReporter = require('../');

const runner = new events.EventEmitter();
new BadgeReporter(runner);

let capture = '';
const oldWrite = process.stdout.write;
function startCapture() {
	process.stdout.write = function(data) {
		capture += data;
	};
}

function stopCapture() {
	process.stdout.write = oldWrite;
}

describe('mocha badge reporter', function() {
	it('should register test passes and failures then emit a badge on stdout', function(){
		startCapture();
		runner.emit('pass');
		runner.emit('fail');
		runner.emit('end');
		stopCapture();
		assert(capture);
	});
});
