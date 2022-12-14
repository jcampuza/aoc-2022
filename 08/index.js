const fs = require('fs');
const path = require('path');

const partOne = (input) => {
  const m = input.split('\n').map((line) => line.split(''));
  const visibleTreeCoords = new Set();
  const rowLength = m.length;
  const colLength = m[0].length;

  // add all exterior trees
  for (let i = 0; i < rowLength; i++) {
    visibleTreeCoords.add(`${i},0`);
    visibleTreeCoords.add(`${i},${colLength - 1}`);
  }

  for (let j = 0; j < colLength; j++) {
    visibleTreeCoords.add(`0,${j}`);
    visibleTreeCoords.add(`${colLength - 1},${j}`);
  }

  for (let i = 0; i < rowLength; i++) {
    let max = 0;
    for (let j = 0; j < colLength; j++) {
      const height = m[i][j];

      if (height > max) {
        max = height;
        visibleTreeCoords.add(`${i},${j}`);
      }
    }

    max = 0;
    for (let j = colLength - 1; j >= 0; j--) {
      const height = m[i][j];

      if (height > max) {
        max = height;
        visibleTreeCoords.add(`${i},${j}`);
      }
    }
  }

  for (let j = 0; j < colLength; j++) {
    let max = 0;
    for (let i = 0; i < rowLength; i++) {
      const height = m[i][j];

      if (height > max) {
        max = height;
        visibleTreeCoords.add(`${i},${j}`);
      }
    }

    max = 0;
    for (let i = rowLength - 1; i >= 0; i--) {
      const height = m[i][j];

      if (height > max) {
        max = height;
        visibleTreeCoords.add(`${i},${j}`);
      }
    }
  }

  return visibleTreeCoords.size;
};

const partTwo = (input) => {
  const m = input.split('\n').map((line) => line.split(''));
  const rowLength = m.length;
  const colLength = m[0].length;

  const calculateScenicScore = (x, y) => {
    const treeHeight = m[x][y];
    let viewDistanceL = 0;

    // Right
    for (let i = x + 1; i < rowLength; i++) {
      const height = m[i][y];
      viewDistanceL += 1;

      if (height >= treeHeight) {
        break;
      }
    }

    // Left
    let viewDistanceR = 0;
    for (let i = x - 1; i >= 0; i--) {
      const height = m[i][y];
      viewDistanceR += 1;
      if (height >= treeHeight) {
        break;
      }
    }

    // Bottom
    let viewDistanceU = 0;

    for (let j = y + 1; j < colLength; j++) {
      const height = m[x][j];
      viewDistanceU += 1;
      if (height >= treeHeight) {
        break;
      }
    }

    // Top
    let viewDistanceD = 0;

    for (let j = y - 1; j >= 0; j--) {
      const height = m[x][j];
      viewDistanceD += 1;
      if (height >= treeHeight) {
        break;
      }
    }

    return viewDistanceU * viewDistanceD * viewDistanceL * viewDistanceR;
  };

  let max = 0;
  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < colLength; j++) {
      const scenicScore = calculateScenicScore(i, j);
      if (scenicScore > max) {
        max = scenicScore;
      }
    }
  }

  return max;
};

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
console.log(partOne(input));
console.log(partTwo(input));
