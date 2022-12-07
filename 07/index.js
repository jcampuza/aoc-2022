const fs = require('fs');
const path = require('path');

const traverse = (node, fn) => {
  fn(node);

  if (!node.contents) {
    return;
  }

  for (const leaf of Object.values(node.contents)) {
    traverse(leaf, fn);
  }
};

const buildFS = (input = '') => {
  const root = {
    type: 'dir',
    name: '/',
    size: 0,
    parent: null,
    contents: {},
  };
  let cwd = null;
  let output = input.split('\n');

  const ls = (program) => {
    while (true) {
      if (!program[0] || program[0].startsWith('$')) {
        return;
      }

      const [dirOrSize, name] = program.shift().split(' ');
      if (dirOrSize === 'dir') {
        cwd.contents[name] = {
          type: 'dir',
          name: name,
          size: 0,
          contents: {},
          parent: cwd,
        };
      } else {
        cwd.contents[name] = {
          type: 'file',
          name,
          size: Number(dirOrSize),
          parent: cwd,
        };
      }
    }
  };

  const cd = (arg) => {
    switch (arg) {
      case '/': {
        cwd = root;
        return;
      }
      case '..': {
        cwd = cwd.parent;
        return;
      }
      default: {
        cwd = cwd.contents[arg];
        return;
      }
    }
  };

  while (output.length) {
    const line = output.shift();
    if (line.startsWith('$')) {
      const [_, cmd, arg] = line.split(' ');
      switch (cmd) {
        case 'ls': {
          ls(output);
          break;
        }
        case 'cd': {
          cd(arg);
          break;
        }
      }
    }
  }

  traverse(root, (node) => {
    let curr = node.parent;
    // dig up the tree adding size to every parent dir
    while (curr) {
      curr.size += node.size;
      curr = curr.parent;
    }
  });

  return root;
};

const partOne = (input = '') => {
  const fs = buildFS(input);
  let sum = 0;

  traverse(fs, (node) => {
    if (node.type === 'dir' && node.size <= 100000) {
      sum += node.size;
    }
  });

  return sum;
};

const partTwo = (input = '') => {
  const fs = buildFS(input);
  const spaceNeeded = 30000000 - (70000000 - fs.size);
  let min = Number.MAX_SAFE_INTEGER;

  traverse(fs, (node) => {
    if (node.type === 'dir' && node.size >= spaceNeeded && node.size < min) {
      min = node.size;
    }
  });

  return min;
};

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
console.log(partOne(input));
console.log(partTwo(input));
