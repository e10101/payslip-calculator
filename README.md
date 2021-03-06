# payslip-calculator

[![Build Status](https://travis-ci.org/travis-ci/travis-web.svg?branch=master)](https://travis-ci.org/travis-ci/travis-web)

## Setup

```
git clone https://github.com/e10101/payslip-calculator.git
cd payslip-calculator
```
```
npm install
```

## Usage
```
Usage: node ./index.js --input [file]

Options:
  --input, -i   The input csv file.                                [required]
  --rates, -r   The tax rates json file.                           [default: "tax_rates.json"]
  --output, -o  The output csv file, default output command line.
```

### Demo
```
node index.js --input sample.csv --output output.csv

cat output.csv
```

#### sample.csv
```csv
David,Rudd,60050,9%,01 March – 31 March
Ryan,Chen,120000,10%,01 March – 31 March
```

#### output.csv
```csv
David Rudd,01 March – 31 March,5004,922,4082,450
Ryan Chen,01 March – 31 March,10000,2696,7304,1000
```

## Approach
 - Save the tax rates table to the JSON file and use the array to represent each level, each of which is in the following format: minSalary, maxSalary, baseTax, taxEachDollar. And using -1 presents for unlimited maxSalary.
 - By loading the tax rates table file, calculate the amount of tax in the case of different annual salary.
 - Use `node-optimist` to get the input file, the output file, and the tax rates table parameter. And use the `node-csv` to load different files.
 - Use `Mocha` and `Chai` for testing
 - Add incorrect formatting input file processing code.
 
## Assumptions
 - The file type of input should be csv;
 - There is no header with the input file;
 - The delimiter of the csv file should be ','(comma);
 - The input data format should be: `first name, last name, annual salary, super rate (%), payment start date`;
 - The size of input file should small than 20MB or less than 500K lines;

### Exceptions Handle
 - Wrong columns input line will be ignore;
 - Empty input file will be ignore;

 
## Technologies
 - [Node.js](http://nodejs.org)
 - [Stream](https://nodejs.org/api/stream.html)
 - [Mocha](http://mochajs.org)
 - [Chai](http://chaijs.com/)
 - [Travis CI](https://travis-ci.org/)
 - [node-csv](https://github.com/wdavidw/node-csv)
 - [node-optimist](https://github.com/substack/node-optimist)
 
## TODO
 - Add .xls file type output support.
 - Add API server module.
 - Add AngularJS client module.

## Tax Rates
The following rates for 2012-13 apply from 1 July 2012.

Taxable income | Tax on this income
--- | ---
0 - $18,200 | Nil
$18,201 - $37,000 | 19c for each $1 over $18,200
$37,001 - $80,000 | $3,572 plus 32.5c for each $1 over $37,000
$80,001 - $180,000 | $17,547 plus 37c for each $1 over $80,000
$180,001 and over | $54,547 plus 45c for each $1 over $180,000

#### tax_rates.json file
```json
[
    {
        "minSalary": 0,
        "maxSalary": 18200,
        "baseTax": 0,
        "taxEachDollar": 0
    },
    {
        "minSalary": 18201,
        "maxSalary": 37000,
        "baseTax": 0,
        "taxEachDollar": 0.19
    },
    {
        "minSalary": 37001,
        "maxSalary": 80000,
        "baseTax": 3572,
        "taxEachDollar": 0.325
    },
    {
        "minSalary": 80001,
        "maxSalary": 180000,
        "baseTax": 17547,
        "taxEachDollar": 0.37
    },
    {
        "minSalary": 180001,
        "maxSalary": -1,
        "baseTax": 54547,
        "taxEachDollar": 0.45
    }
]
```
