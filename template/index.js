const fs = require('fs');
const path = require('path');

const partOne = (input) => {
  return input;
};

const partTwo = (input) => {
  return input;
};

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
console.log(partOne(input));
console.log(partTwo(input));
