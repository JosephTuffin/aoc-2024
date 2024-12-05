export const wordSearchPart1 = (input: string) => {
  const grid = input.split("\n").map((row) => row.split(""));
  const total = grid.reduce(
    (count, row, x) =>
      count +
      row.reduce((rowCount, _, y) => {
        const xmas1 = +["XMAS", "SAMX"].includes(grid[x]?.[y] + grid[x + 1]?.[y] + grid[x + 2]?.[y] + grid[x + 3]?.[y]);
        const xmas2 = +["XMAS", "SAMX"].includes(grid[x]?.[y] + grid[x]?.[y + 1] + grid[x]?.[y + 2] + grid[x]?.[y + 3]);
        const xmas3 = +["XMAS", "SAMX"].includes(
          grid[x]?.[y] + grid[x + 1]?.[y + 1] + grid[x + 2]?.[y + 2] + grid[x + 3]?.[y + 3],
        );
        const xmas4 = +["XMAS", "SAMX"].includes(
          grid[x]?.[y] + grid[x + 1]?.[y - 1] + grid[x + 2]?.[y - 2] + grid[x + 3]?.[y - 3],
        );
        return rowCount + xmas1 + xmas2 + xmas3 + xmas4;
      }, 0),
    0,
  );
  return total;
};

export const wordSearchPart2 = (input: string) => {
  const grid = input.split("\n").map((row) => row.split(""));
  const total = grid.reduce(
    (count, row, x) =>
      count +
      row.reduce((rowCount, _, y) => {
        const mas1 = ["MAS", "SAM"].includes(grid[x - 1]?.[y - 1] + grid[x][y] + grid[x + 1]?.[y + 1]);
        const mas2 = ["MAS", "SAM"].includes(grid[x + 1]?.[y - 1] + grid[x][y] + grid[x - 1]?.[y + 1]);
        return rowCount + (mas1 && mas2 ? 1 : 0);
      }, 0),
    0,
  );
  return total;
};
