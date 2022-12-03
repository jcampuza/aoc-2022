const fs = require('fs');
const path = require('path');

const alph = 'abcdefghijklmnopqrstuvwxyz';
const all =
  '_' +
  alph +
  alph
    .split('')
    .map((l) => l.toUpperCase())
    .join('');

const intersect = (a = new Set(), b = new Set()) => {
  const intersection = new Set();
  for (let item of b) {
    if (a.has(item)) {
      intersection.add(item);
    }
  }
  return intersection;
};

const partOne = (input = '') => {
  let res = 0;
  for (let line of input.split('\n')) {
    const [one, two] = [
      line.slice(0, line.length / 2).split(''),
      line.slice(line.length / 2).split(''),
    ];

    res += all.indexOf([...intersect(new Set(one), new Set(two))][0]);
  }

  return res;
};

const partTwo = (input = '') => {
  const groups = [];
  const lines = input.split('\n');
  for (let i = 0; i < lines.length; i += 3) {
    groups.push(lines.slice(i, i + 3));
  }

  let res = 0;
  for (let group of groups) {
    res += all.indexOf([...group.reduce((acc, g) => intersect(new Set(acc), new Set(g)))][0]);
  }

  return res;
};

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
console.log(partOne(input));
console.log(partTwo(input));
