const fs = require('fs');
const path = require('path');

const simulate = (input, knots) => {
  const commands = input
    .split('\n')
    .map((line) => line.split(' '))
    .map(([dir, num]) => [dir, Number(num)]);

  const updateTailPosition = (h, t) => {
    const dx = h.x - t.x;
    const dy = h.y - t.y;
    const diffX = Math.abs(dx);
    const diffY = Math.abs(dy);

    if (diffX + diffY > 2) {
      t.x = dx > 0 ? t.x + 1 : t.x - 1;
      t.y = dy > 0 ? t.y + 1 : t.y - 1;
      return;
    }

    if (diffX === 2) {
      t.x = dx > 0 ? t.x + 1 : t.x - 1;
      return;
    }

    if (diffY === 2) {
      t.y = dy > 0 ? t.y + 1 : t.y - 1;
      return;
    }
  };

  const visited = new Set();
  const rope = Array.from({ length: knots }, () => ({ x: 0, y: 0 }));
  const h = rope[0];
  const t = rope[rope.length - 1];

  for (const [dir, count] of commands) {
    for (let i = 0; i < count; i++) {
      switch (dir) {
        case 'U': {
          h.y += 1;
          break;
        }
        case 'D': {
          h.y -= 1;
          break;
        }
        case 'L': {
          h.x -= 1;
          break;
        }
        case 'R': {
          h.x += 1;
          break;
        }
      }

      for (let i = 0; i < rope.length - 1; i++) {
        updateTailPosition(rope[i], rope[i + 1]);
      }

      visited.add(`${t.x},${t.y}`);

      console.log(rope);
    }
  }

  console.log(visited);

  return visited.size;
};

const partOne = (input) => {
  return simulate(input, 2);
};

const partTwo = (input) => {
  return simulate(input, 10);
};

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
console.log(partOne(input));
console.log(partTwo(input));
