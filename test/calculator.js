var expect = require('chai').expect;
var calc = require('../lib/calculator');

describe('Payslip Calculator', function() {
    describe('#roundFunc', function() {
        it('4.5 should round to 5', function() {
            expect(calc.roundFunc(4.5)).to.eql(5);
        });
        it('4.4 should round to 4', function() {
            expect(calc.roundFunc(4.4)).to.eql(4);
        });
    });

    describe('#getGrossIncome', function() {
        it('gross income of 60,050 shoud be 5004', function() {
            const grossIncome = calc.getGrossIncome(60050);
            expect(grossIncome).to.eql(5004);
        });
    });

    describe('#getIncomeTax', function() {
        it('income tax of 60,050 should be 922', function() {
            const tax = calc.getIncomeTax(60050);
            expect(tax).to.eql(922);
        });
    });

    describe('#getNetIncome', function() {
        it('net income of 60,050 should be 4082', function() {
            const netIncome = calc.getNetIncome(60050);
            expect(netIncome).to.eql(4082);
        });
    });

    describe('#getSuper', function() {
        it('super of 60,050 and 9% shoud be 450', function() {
            const superMoney = calc.getSuper(60050, 9);
            expect(superMoney).to.eql(450);
        });
    });
});
