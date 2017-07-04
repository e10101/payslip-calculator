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
