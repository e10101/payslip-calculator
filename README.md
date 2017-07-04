# payslip-calculator

## Setup
```
git clone https://github.com/e10101/payslip-calculator.git
cd payslip-calculator
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

## Demo
```
node index.js --input sample.csv --output output.csv

cat output.csv
```

## tax_rates.json file
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
