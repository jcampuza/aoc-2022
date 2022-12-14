const fs = require('fs');
const path = require('path');

for (let dir of fs.readdirSync(__dirname)) {
  if (Number.isNaN(Number(dir))) {
    continue;
  }

  const pathToDay = path.join(__dirname, dir, 'index.js');
  if (fs.existsSync(pathToDay)) {
    console.log('\n');
    console.log('day', dir);
    require(pathToDay);
  }
}
