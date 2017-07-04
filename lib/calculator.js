const path = require('path');

let taxRatesFile = path.join(__dirname, '../tax_rates.json');
let taxRates = require(taxRatesFile);

const roundFunc = function(val) {
    return Math.round(val);
}

const getGrossIncome = function(annualSalary) {
    return roundFunc(annualSalary / 12);
}

const getTaxRate = function(annualSalary) {
    for(let i = 0; i < taxRates.length; i++) {
        const rate = taxRates[i];
        if (annualSalary >= rate.minSalary &&
            (rate.maSalary === -1 || annualSalary <= rate.maxSalary)) {
            return rate;
        }
    }

    return false;
}

const getIncomeTax = function(annualSalary) {
    const taxRate = getTaxRate(annualSalary);
    let incomeTax = 0;
    if (taxRate) {
        if (taxRate.baseTax > 0) {
            const baseTax = taxRate.baseTax;

            const overSalary = annualSalary - (taxRate.minSalary - 1);

            const overSalaryTax = overSalary * taxRate.taxEachDollar;

            const tax = baseTax + overSalaryTax;

            incomeTax = roundFunc(tax / 12);
        }
    }

    return incomeTax;
}

const getNetIncome = function(annualSalary) {
    return getGrossIncome(annualSalary) - getIncomeTax(annualSalary);
}

const getSuper = function(annualSalary, superRate) {
    if (superRate >= 1) {
        superRate /= 100;
    }
    return roundFunc(getGrossIncome(annualSalary) * superRate);
}

const setTaxRates = function(filePath) {
    taxRates = require(filePath);
}

module.exports = {
    setTaxRates: setTaxRates,
    getGrossIncome: getGrossIncome,
    getIncomeTax: getIncomeTax,
    getNetIncome: getNetIncome,
    getSuper: getSuper,
    roundFunc: roundFunc
};
