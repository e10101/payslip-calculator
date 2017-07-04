const fs = require('fs');
const parse = require('csv-parse');
const transform = require('stream-transform');
const payslip = require('./lib/converter');
const path = require('path');
const argv = require('optimist')
    .usage('Usage: $0 --input [file]')
    .alias('input', 'i')
    .alias('output', 'o')
    .alias('rates', 'r')
    .describe('input', 'The input csv file.')
    .describe('rates', 'The tax rates json file.')
    .describe('output', 'The output csv file, default output command line.')
    .default('rates', 'tax_rates.json')
    .demand(['input'])
    .argv;

const inputFile = path.resolve(__dirname, argv.input);
const taxRatesFile = path.resolve(__dirname, argv.rates);

// Default output to terminal
let output = process.stdout;

if (argv.output) {
    output = fs.createWriteStream(path.resolve(__dirname, argv.output));
}

payslip.setTaxRates(taxRatesFile);

const input = fs.createReadStream(inputFile);

const parser = parse({
    columns: ['firstName', 'lastName', 'annualSalary', 'superRate', 'paymentStartDate'],
    relax_column_count: true,
    skip_empty_lines: true
    });

const transformer = transform(function(record, callback) {
    // Calculate the employee monthly payslip
    const converted = payslip.convert(record);

    if (converted) {
        // Send the result to stream
        return callback(null, payslip.stringify(converted));
    }
});

input.pipe(parser)
    .pipe(transformer)
    .pipe(output);
