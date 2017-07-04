var assert = require('assert');
var calc = require('../lib/calculator');

describe('Payslip Calculator', function() {
    describe('Round', function() {
        it('4.5 should round to 5', function() {
            assert.equal(5, calc.roundFunc(4.5));
        });
    });
});
