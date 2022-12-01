const fs = require('fs');
const path = require('path');

const partOne = (input = '') => {
  return Math.max(
    ...input.split('\n\n').map((chunk) =>
      chunk
        .split('\n')
        .map((line) => Number(line))
        .reduce((acc, n) => acc + n, 0)
    )
  );
};

const partTwo = (input = '') => {
  return input
    .split('\n\n')
    .map((chunk) =>
      chunk
        .split('\n')
        .map((line) => Number(line))
        .reduce((acc, n) => acc + n, 0)
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, n) => acc + n);
};

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
console.log(partOne(input));
console.log(partTwo(input));
