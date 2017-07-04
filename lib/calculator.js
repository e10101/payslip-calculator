var taxRates = require('./tax_rates.json');

var roundFunc = function(val) {
    return Math.round(val);
}

var getGrossIncome = function(annualSalary) {
    return roundFunc(annualSalary / 12);
}

var getTaxRate = function(annualSalary) {
    for(var i = 0; i < taxRates.length; i++) {
        var rate = taxRates[i];
        if (annualSalary >= rate.minSalary &&
            (rate.maSalary === -1 || annualSalary <= rate.maxSalary)) {
            return rate;
        }
    }

    return false;
}

var getIncomeTax = function(annualSalary) {
    var taxRate = getTaxRate(annualSalary);
    var incomeTax = 0;
    if (taxRate) {
        if (taxRate.baseTax > 0) {
            var baseTax = taxRate.baseTax;

            var overSalary = annualSalary - (taxRate.minSalary - 1);

            var overSalaryTax = overSalary * taxRate.taxEachDollar;

            var tax = baseTax + overSalaryTax;

            incomeTax = roundFunc(tax / 12);
        }
    }

    return incomeTax;
}

var getNetIncome = function(annualSalary) {
    return getGrossIncome(annualSalary) - getIncomeTax(annualSalary);
}

var getSuper = function(annualSalary, superRate) {
    if (superRate >= 1) {
        superRate /= 100;
    }
    return roundFunc(getGrossIncome(annualSalary) * superRate);
}

var annualSalary = 120000;
var superRate = 10;

var grossIncome = getGrossIncome(annualSalary);
var incomeTax = getIncomeTax(annualSalary);
var netIncome = getNetIncome(annualSalary);
var superMoney = getSuper(annualSalary, superRate);

console.log(grossIncome, incomeTax, netIncome, superMoney);
