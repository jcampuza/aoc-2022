const fs = require('fs');
const path = require('path');

const intersect = (a = new Set(), b = new Set()) => {
  return new Set([...a].filter((item) => b.has(item)));
};

const doIntersect = (a = new Set(), b = new Set()) => intersect(a, b).size > 0;

const isSuperset = (a = new Set(), b = new Set()) => {
  for (let item of b) {
    if (!a.has(item)) {
      return false;
    }
  }
  return true;
};

const isOneSuperset = (a = new Set(), b = new Set()) => isSuperset(a, b) || isSuperset(b, a);

const partOne = (input) => {
  return input
    .split('\n')
    .map((line) => line.split(','))
    .reduce((acc, group) => {
      const [set1, set2] = group
        .map((group) => group.split('-').map(Number))
        .map((range) => {
          const [min, max] = range.map(Number);
          const s = new Set([min]);
          for (let i = min; i <= max; i++) {
            s.add(i);
          }
          return s;
        });

      return isOneSuperset(set1, set2) ? acc + 1 : acc;
    }, 0);
};

const partTwo = (input) => {
  return input
    .split('\n')
    .map((line) => line.split(','))
    .reduce((acc, group) => {
      const [set1, set2] = group
        .map((group) => group.split('-').map(Number))
        .map((range) => {
          const [min, max] = range.map(Number);

          const s = new Set([min]);
          for (let i = min; i <= max; i++) {
            s.add(i);
          }
          return s;
        });

      return doIntersect(set1, set2) ? acc + 1 : acc;
    }, 0);
};

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
console.log(partOne(input));
console.log(partTwo(input));
