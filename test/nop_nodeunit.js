// thaw-image-utilities.js/test/nop_nodeunit.js

'use strict';

exports['No-op'] = {
	setUp: function (done) {
		console.log('nodeunit: Test \'No-op\' : setUp()');
		done();
	},
	test: function (test) {
		console.log('nodeunit: Test \'No-op\' : test()');
		test.expect(1);
		test.strictEqual(1 + 1, 2, 'One plus one equals two.');
		test.done();
	}
};
