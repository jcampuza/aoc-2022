const fs = require('fs');
const path = require('path');

const mapping = {
  X: 'A',
  Y: 'B',
  Z: 'C',
};

const wlMap = {
  A: {
    lose: 'B',
    win: 'C',
  },

  B: {
    lose: 'C',
    win: 'A',
  },

  C: {
    lose: 'A',
    win: 'B',
  },
};

const getMatchResult = (a, b) => {
  if (a === b) {
    return 3;
  }

  return wlMap[a].win === b ? 6 : 0;
};

function getMoveForDesiredMatchResult(a, b) {
  switch (b) {
    case 'X':
      return wlMap[a].win;

    case 'Y':
      return a;

    case 'Z':
      return wlMap[a].lose;
  }
}

const partOne = (input) => {
  return input
    .split('\n')
    .map((line) => line.split(' '))
    .reduce((acc, [opponent, me]) => {
      const myMove = mapping[me];
      const myMoveScore = 1 + myMove.charCodeAt(0) - 'A'.charCodeAt(0);
      return acc + myMoveScore + getMatchResult(myMove, opponent);
    }, 0);
};

const partTwo = (input) => {
  return input
    .split('\n')
    .map((line) => line.split(' '))
    .reduce((acc, [opponent, matchResultNeeded]) => {
      const myMove = getMoveForDesiredMatchResult(opponent, matchResultNeeded);
      const myMoveScore = 1 + myMove.charCodeAt(0) - 'A'.charCodeAt(0);
      return acc + myMoveScore + getMatchResult(myMove, opponent);
    }, 0);
};

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
console.log(partOne(input));
console.log(partTwo(input));
