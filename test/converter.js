var expect = require('chai').expect;
var conv = require('../lib/converter');

describe('Converter', function() {
    describe('#convert', function() {
        it('should convert object', function() {
            const obj = {
                annualSalary: 60050,
                superRate: 9,
                firstName: 'David',
                lastName: 'Rudd',
                paymentStartDate: '01 March – 31 March',
            };
            const target = {
                name: 'David Rudd',
                payPeriod: '01 March – 31 March',
                grossIncome: 5004,
                incomeTax: 922,
                netIncome: 4082,
                superMoney: 450
            };
            const converted = conv.convert(obj);
            expect(converted).to.eql(target);
        });

        it('should work with 9%', function() {
            const obj = {
                annualSalary: 60050,
                superRate: '9%',
                firstName: 'David',
                lastName: 'Rudd',
                paymentStartDate: '01 March – 31 March',
            };
            const target = {
                name: 'David Rudd',
                payPeriod: '01 March – 31 March',
                grossIncome: 5004,
                incomeTax: 922,
                netIncome: 4082,
                superMoney: 450
            };
            const converted = conv.convert(obj);
            expect(converted).to.eql(target);
        });
    });

    describe('#stringify', function() {
        it('should work', function() {
            const obj = {
                name: 'David Rudd',
                payPeriod: '01 March – 31 March',
                grossIncome: 5004,
                incomeTax: 922,
                netIncome: 4082,
                superMoney: 450
            };
            const target = 'David Rudd,01 March – 31 March,5004,922,4082,450\n';
            const str = conv.stringify(obj);
            expect(str).to.eql(target);
        });
    });

    describe('#incorrect data', function() {
        it('should work with less columns', function() {
            const obj = {
                annualSalary: 60050,
                superRate: 9,
                firstName: 'David',
                lastName: 'Rudd'
            };
            const converted = conv.convert(obj);
            expect(converted).to.eql(false);
        });

        it('should work with more columns', function() {
            const obj = {
                annualSalary: 60050,
                superRate: 9,
                firstName: 'David',
                lastName: 'Rudd',
                paymentStartDate: '01 March – 31 March',
                undefined: 'Lie'
            };
            const converted = conv.convert(obj);
            expect(converted).to.eql(false);
        });

        it('should work with incorrect type columns', function() {
            const obj = {
                annualSalary: '0String',
                superRate: 'Str0ing01',
                firstName: 'David',
                lastName: 'Rudd',
                paymentStartDate: '01 March – 31 March',
            }
            const converted = conv.convert(obj);
            expect(converted).to.eql(false);
        });
    });
});
