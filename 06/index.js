const fs = require('fs');
const path = require('path');

const partOne = (input) => {
  const chars = input.split('');

  for (let i = 0; i < chars.length; i++) {
    if (new Set(chars.slice(i, i + 4)).size === 4) {
      return i + 4;
    }
  }
};

const partTwo = (input) => {
  const chars = input.split('');

  for (let i = 0; i < chars.length; i++) {
    if (new Set(chars.slice(i, i + 14)).size === 14) {
      return i + 14;
    }
  }
};

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
console.log(partOne(input));
console.log(partTwo(input));
