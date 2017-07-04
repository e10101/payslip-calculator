const calc = require('./calculator');
let taxRatesFile = '';

const checkFormat = function(obj) {
    const keysCount = Object.keys(obj).length;
    if (keysCount !== 5) {
        return false;
    }
    const annualSalary = parseInt(obj.annualSalary);
    const superRate = parseFloat(obj.superRate);

    if (isNaN(annualSalary) || isNaN(superRate)) {
        return false;
    }

    return true;
}

const convert = function(obj) {
    if (!checkFormat(obj)) {
        return false;
    }
    // Parse int and float
    const annualSalary = parseInt(obj.annualSalary);
    const superRate = parseFloat(obj.superRate);

    // String concat
    const name = obj.firstName + ' ' + obj.lastName;
    const payPeriod = obj.paymentStartDate;

    // Calculate the incomes and taxes
    const grossIncome = calc.getGrossIncome(annualSalary);
    const incomeTax = calc.getIncomeTax(annualSalary);
    const netIncome = calc.getNetIncome(annualSalary);
    const superMoney = calc.getSuper(annualSalary, superRate);

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

const stringify = function(obj) {
    const values = Object.values(obj);
    return values.join(',') + '\n';
}

const setTaxRates = function(filePath) {
    taxRatesFile = filePath;
    calc.setTaxRates(filePath);
}

module.exports = {
    setTaxRates: setTaxRates,
    convert: convert,
    stringify: stringify
};
