var calc = require('./calculator');

var convert = function(obj) {
    var annualSalary = parseInt(obj.annualSalary);
    var superRate = parseFloat(obj.superRate);

    var name = obj.firstName + ' ' + obj.lastName;
    var payPeriod = obj.paymentStartDate;
    var grossIncome = calc.getGrossIncome(annualSalary);
    var incomeTax = calc.getIncomeTax(annualSalary);
    var netIncome = calc.getNetIncome(annualSalary);
    var superMoney = calc.getSuper(annualSalary, superRate);

    return {
        name: name,
        payPeriod: payPeriod,
        grossIncome: grossIncome,
        incomeTax: incomeTax,
        netIncome: netIncome,
        superMoney: superMoney
    };

}

module.exports = {
    convert: convert
};
