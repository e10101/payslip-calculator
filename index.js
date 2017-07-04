var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');
var payslip = require('./lib/converter');
var path = require('path');
var argv = require('optimist')
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

// Get the input file path
var inputFile = path.resolve(__dirname, argv.input);
// Get the tax rates file path
var taxRatesFile = path.resolve(__dirname, argv.rates);

// Default output to terminal
var output = process.stdout;

// If set the output params, save the output to file.
if (argv.output) {
    output = fs.createWriteStream(path.resolve(__dirname, argv.output));
}

// Set the tax rates
payslip.setTaxRates(taxRatesFile);

// Read from input file
var input = fs.createReadStream(inputFile);

// Set csv file columns
var parser = parse({columns: ['firstName', 'lastName', 'annualSalary', 'superRate', 'paymentStartDate'], relax_column_count: true, skip_empty_lines: true});

// Transform the input to output
var transformer = transform(function(record, callback) {
    // Calculate the employee monthly payslip
    var converted = payslip.convert(record);

    if (converted) {
        // Send the result to stream
        return callback(null, payslip.stringify(converted));
    }
});

// By Using the stream, convert input to output
input.pipe(parser)
    .pipe(transformer)
    .pipe(output);
