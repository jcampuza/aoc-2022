const fs = require('fs');
const path = require('path');

const parseMonkeys = (input = '') => {
  return input.split('\n\n').map((monkeyInput) => {
    const [, startingItemsInput, operationInput, testInput, trueCaseInput, falseCaseInput] =
      monkeyInput.split('\n');
    const [, operation, operationValue] = /new = old (\*|\+) (\d+|old)/.exec(operationInput);
    const [, divisibleBy] = /divisible by (\d+)/.exec(testInput);
    const [, trueCaseMonkey] = /throw to monkey (\d+)/.exec(trueCaseInput);
    const [, falseCaseMonkey] = /throw to monkey (\d+)/.exec(falseCaseInput);

    return {
      items: startingItemsInput.split(': ')[1].split(', ').map(Number),
      operation,
      operationValue: operationValue === 'old' ? 'old' : Number(operationValue),
      divisibleBy: Number(divisibleBy),
      trueCaseMonkey: Number(trueCaseMonkey),
      falseCaseMonkey: Number(falseCaseMonkey),
      inspectedItems: 0,
    };
  });
};

const partOne = (input = '') => {
  // Rounds
  const monkeys = parseMonkeys(input);

  for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
      while (monkey.items.length) {
        const item = monkey.items.shift();
        const operationValue = monkey.operationValue === 'old' ? item : monkey.operationValue;

        const updatedItem = Math.floor(
          (monkey.operation === '*' ? item * operationValue : item + operationValue) / 3
        );

        const isDivisible = updatedItem % monkey.divisibleBy === 0;

        if (isDivisible) {
          monkeys[monkey.trueCaseMonkey].items.push(updatedItem);
        } else {
          monkeys[monkey.falseCaseMonkey].items.push(updatedItem);
        }

        monkey.inspectedItems += 1;
      }
    }
  }

  return monkeys
    .sort((a, b) => b.inspectedItems - a.inspectedItems)
    .slice(0, 2)
    .reduce((a, b) => a.inspectedItems * b.inspectedItems);
};

// This is a super lazy way to do this.
const getLCM = (...numbers) => {
  for (let i = Math.max(...numbers); ; i++) {
    if (numbers.every((n) => i % n === 0)) {
      return i;
    }
  }
};

const partTwo = (input = '') => {
  const monkeys = parseMonkeys(input);
  const lcm = getLCM(...monkeys.map((m) => m.divisibleBy));

  // Rounds
  for (let i = 0; i < 10000; i++) {
    for (const monkey of monkeys) {
      while (monkey.items.length) {
        const item = monkey.items.shift();
        const value = monkey.operationValue === 'old' ? item : monkey.operationValue;

        const updatedItem = (monkey.operation === '*' ? item * value : item + value) % lcm;

        const monkeyToThrowTo =
          updatedItem % monkey.divisibleBy === 0 ? monkey.trueCaseMonkey : monkey.falseCaseMonkey;

        monkeys[monkeyToThrowTo].items.push(updatedItem);

        monkey.inspectedItems += 1;
      }
    }
  }

  return monkeys
    .sort((a, b) => b.inspectedItems - a.inspectedItems)
    .slice(0, 2)
    .reduce((a, b) => a.inspectedItems * b.inspectedItems);
};

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
console.log(partOne(input));
console.log(partTwo(input));
