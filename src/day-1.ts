const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

const match = (input: string) => {
  const [left, right] = input.split("\n").reduce(
    (totals, line) => {
      const [l, r] = line.split("   ");
      totals[0].push(parseInt(l));
      totals[1].push(parseInt(r));
      return totals;
    },
    [[], []],
  );
  left.sort();
  right.sort();
  return [left, right];
};

export const matchTotalPart1 = () => {
  const [left, right] = match(input);
  return left.reduce((total, left, index) => total + Math.abs(left - right[index]), 0);
};

export const matchTotalPart2 = () => {
  const [left, right] = match(input);
  return left.reduce((total, left) => total + right.filter((r) => r === left).length * left, 0);
};
