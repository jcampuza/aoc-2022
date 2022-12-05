const fs = require('fs');
const path = require('path');

const parse = (input = '') => {
  const [crateLines, moveListLines] = input.split('\n\n').map((s) => s.split('\n'));
  const [crates, buckets] = [
    crateLines.slice(0, crateLines.length - 1),
    crateLines[crateLines.length - 1],
  ];

  const crateMap = {};
  for (const [idx, char] of Object.entries(buckets.split(''))) {
    if (char === ' ') continue;

    crateMap[char] = [];

    for (const line of crates) {
      if (line[idx] !== ' ') {
        crateMap[char].push(line[idx]);
      }
    }
  }

  return [crateMap, moveListLines];
};

const partOne = (input = '') => {
  const [crateMap, moveListLines] = parse(input);

  for (const line of moveListLines) {
    const [, count, from, to] = /move (\d+) from (\d+) to (\d+)/.exec(line);
    for (let i = 0; i < Number(count); i++) {
      crateMap[to].unshift(crateMap[from].shift());
    }
  }

  return Object.values(crateMap).reduce((acc, bucket) => (acc += bucket[0]), '');
};

const partTwo = (input = '') => {
  const [crateMap, moveListLines] = parse(input);

  for (const line of moveListLines) {
    const [, count, from, to] = /move (\d+) from (\d+) to (\d+)/.exec(line);
    crateMap[to].unshift(...crateMap[from].splice(0, Number(count)));
  }

  return Object.values(crateMap).reduce((acc, bucket) => (acc += bucket[0]), '');
};

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
console.log(partOne(input));
console.log(partTwo(input));
