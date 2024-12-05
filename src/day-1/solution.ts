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
  return [left.sort(), right.sort()];
};

export const matchTotalPart1 = (input: string) => {
  const [left, right] = match(input);
  return left.reduce((total, left, index) => total + Math.abs(left - right[index]), 0);
};

export const matchTotalPart2 = (input: string) => {
  const [left, right] = match(input);
  return left.reduce((total, left) => total + right.filter((r) => r === left).length * left, 0);
};
