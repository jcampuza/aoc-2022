const fs = require('fs');
const path = require('path');

const isViableUpwardStep = (from, to) => {
  from = from === 'S' ? 'a' : from === 'E' ? 'z' : from;
  to = to === 'S' ? 'a' : to === 'E' ? 'z' : to;
  if (!from || !to) {
    return false;
  }

  return to.charCodeAt(0) - from.charCodeAt(0) <= 1;
};

const isViableDownardStep = (from, to) => {
  from = from === 'S' ? 'a' : from === 'E' ? 'z' : from;
  to = to === 'S' ? 'a' : to === 'E' ? 'z' : to;
  if (!from || !to) {
    return false;
  }

  return to.charCodeAt(0) - from.charCodeAt(0) >= -1;
};

const traverse = (vertices, fn) => {
  for (i = 0; i < vertices.length; i++) {
    for (let j = 0; j < vertices[i].length; j++) {
      fn(vertices[i][j], i, j);
    }
  }
};

const createAdjMatrix = (vertices, isViableStep = (from, to) => true) => {
  let matrix = {};
  traverse(vertices, (v, i, j) => {
    let [top, bottom, left, right] = [
      vertices[i]?.[j - 1],
      vertices[i]?.[j + 1],
      vertices[i - 1]?.[j],
      vertices[i + 1]?.[j],
    ];

    matrix[`${i},${j}`] = {
      [`${i},${j - 1}`]: isViableStep(v, top),
      [`${i},${j + 1}`]: isViableStep(v, bottom),
      [`${i - 1},${j}`]: isViableStep(v, left),
      [`${i + 1},${j}`]: isViableStep(v, right),
    };
  });

  return matrix;
};

const findStartAndEnd = (vertices) => {
  let start = '';
  let end = '';
  traverse(vertices, (v, i, j) => {
    if (v === 'S') {
      start = `${i},${j}`;
    }

    if (v === 'E') {
      end = `${i},${j}`;
    }
  });

  return [start, end];
};

const findAllPotentialStarts = (vertices) => {
  const starts = [];

  traverse(vertices, (v, i, j) => {
    if (v === 'S' || v === 'a') {
      starts.push(`${i},${j}`);
    }
  });

  return starts;
};

const djikstras = (g, start) => {
  const prev = {};
  const visited = new Set();
  const distances = Object.fromEntries(Object.keys(g).map((k) => [k, Infinity]));
  distances[start] = 0;

  const findMinDistanceVertex = () => {
    let minDistance = Infinity;
    let v = null;
    for (let node of Object.keys(distances)) {
      if (!visited.has(node) && distances[node] < minDistance) {
        minDistance = distances[node];
        v = node;
      }
    }

    return v;
  };

  let u;
  while ((u = findMinDistanceVertex()) !== null) {
    visited.add(u);

    for (const [v, canVisit] of Object.entries(g[u])) {
      if (!visited.has(v) && canVisit && distances[u] + 1 < distances[v]) {
        distances[v] = distances[u] + 1;
        prev[v] = u;
      }
    }
  }

  return [distances, prev];
};

const partOne = (input = '') => {
  const vertices = input.split('\n').map((line) => line.split(''));
  const [start, end] = findStartAndEnd(vertices);
  const g = createAdjMatrix(vertices, isViableUpwardStep);
  const [distances] = djikstras(g, start);
  return distances[end];
};

const partTwo = (input = '') => {
  const vertices = input.split('\n').map((line) => line.split(''));
  const potentialStarts = findAllPotentialStarts(vertices);
  const [, end] = findStartAndEnd(vertices);
  const g = createAdjMatrix(vertices, isViableDownardStep);
  const [distances] = djikstras(g, end);
  return Math.min(...potentialStarts.map((s) => distances[s]));
};

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
console.log(partOne(input));
console.log(partTwo(input));
