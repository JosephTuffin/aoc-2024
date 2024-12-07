const getRows = (input: string) =>
  input.split("\n").map((row) => ({
    target: parseInt(row.split(":")[0]),
    numbers: row
      .split(":")[1]
      .trim()
      .split(" ")
      .map((n) => parseInt(n)),
  }));

const getCombinations = (operators: string[], n: number) => {
  const getNewCombinations = (currentCombination = [], remaining = n - 1) => {
    if (remaining === 0) return [currentCombination];
    return operators.reduce((list, operator) => [...list, ...getNewCombinations([...currentCombination, operator], remaining - 1)], []);
  };
  return getNewCombinations();
};

const getOperations = (rows: { target: number; numbers: number[] }[], operators: string[]) =>
  rows.reduce(
    (map, row) => {
      if (!map[row.numbers.length]) map[row.numbers.length] = getCombinations(operators, row.numbers.length);
      return map;
    },
    {} as Record<number, string[][]>,
  );

const applyOperator = (num1: number, num2: number, operator: string) => {
  if (operator === "+") return num1 + num2;
  if (operator === "*") return num1 * num2;
  else return parseInt(num1.toString() + num2.toString());
};

const checkRows = (rows: { target: number; numbers: number[] }[], operations: Record<number, string[][]>) =>
  rows.reduce((count, { target, numbers }) => {
    const validRow = operations[numbers.length].some((operation) => {
      let total = 0;
      for (let i = 0; i < numbers.length; i++) {
        if (total > target) break;
        total = i === 0 ? numbers[i] : applyOperator(total, numbers[i], operation[i - 1]);
      }
      return total === target;
    });
    return validRow ? count + target : count;
  }, 0);

export const equationInsertPart1 = (input: string) => {
  const rows = getRows(input);
  return checkRows(rows, getOperations(rows, ["*", "+"]));
};

export const equationInsertPart2 = (input: string) => {
  const rows = getRows(input);
  return checkRows(rows, getOperations(rows, ["*", "+", "||"]));
};
