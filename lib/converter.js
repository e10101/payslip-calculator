var calc = require('./calculator');
var taxRatesFile = '';

/**
 * Calculate the payslip
 *
 */
var convert = function(obj) {
    // Parse int and float
    var annualSalary = parseInt(obj.annualSalary);
    var superRate = parseFloat(obj.superRate);

    // String concat
    var name = obj.firstName + ' ' + obj.lastName;
    var payPeriod = obj.paymentStartDate;

    // Calculate the incomes and taxes
    var grossIncome = calc.getGrossIncome(annualSalary);
    var incomeTax = calc.getIncomeTax(annualSalary);
    var netIncome = calc.getNetIncome(annualSalary);
    var superMoney = calc.getSuper(annualSalary, superRate);

    // Return the object
    return {
        name: name,
        payPeriod: payPeriod,
        grossIncome: grossIncome,
        incomeTax: incomeTax,
        netIncome: netIncome,
        superMoney: superMoney
    };
}

/**
 * Convert the object to csv string
 *
 */
var stringify = function(obj) {
    var values = Object.values(obj);
    return values.join(',') + '\n';
}

/**
 * Set the tax rates file path
 *
 */
var setTaxRates = function(filePath) {
    taxRatesFile = filePath;
    calc.setTaxRates(filePath);
}

module.exports = {
    setTaxRates: setTaxRates,
    convert: convert,
    stringify: stringify
};
