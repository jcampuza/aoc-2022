const fs = require('fs');
const path = require('path');

let runCRT = (input = '', onPrecycle = () => {}) => {
  const instructions = input.split('\n').map((line) => line.split(' '));

  let x = 1;
  let cycle = 0;
  let stack = [];

  while (instructions.length) {
    cycle += 1;

    onPrecycle({
      cycle,
      x,
    });

    if (stack.length) {
      const value = stack.shift();
      x += value;
      continue;
    }

    const [cmd, value] = instructions.shift();
    if (cmd === 'addx') {
      stack.push(Number(value));
    }
  }
};

const partOne = (input = '') => {
  let signalStrength = 0;

  runCRT(input, ({ cycle, x }) => {
    if ((cycle - 20) % 40 === 0) {
      signalStrength += cycle * x;
    }
  });

  return signalStrength;
};

const isCloseBy = (x, value, diff) => {
  return Math.abs(value - x) <= diff;
};

const partTwo = (input = '') => {
  let output = '';

  runCRT(input, ({ cycle, x }) => {
    let crtposition = (cycle - 1) % 40;
    let areOverlapping = Math.abs(x - crtposition) <= 1;

    output += areOverlapping ? '#' : '.';

    if (cycle % 40 === 0) {
      output += '\n';
    }
  });

  return output;
};

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
console.log(partOne(input));
console.log(partTwo(input));
