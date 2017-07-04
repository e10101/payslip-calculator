var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');
var payslip = require('./lib/converter');

var inputFile = 'data.csv';

var input = fs.createReadStream(inputFile);
var parser = parse({columns: ['firstName', 'lastName', 'annualSalary', 'superRate', 'paymentStartDate']});
var transformer = transform(function(record, callback) {
    //console.log(record);
    var converted = payslip.convert(record);
    console.log(converted);

    return callback(null, '');
});
input.pipe(parser)
    .pipe(transformer)
    .pipe(process.stdout);
