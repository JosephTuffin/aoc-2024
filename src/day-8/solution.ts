const createGrid = (input: string) => input.split("\n").map((row) => row.split(""));

const mapAntennas = (grid: string[][]): Record<string, number[][]> =>
  grid.reduce((map, row, x) => {
    row.forEach((node, y) => ![".", "#"].includes(node) && (map[node] ? map[node].push([x, y]) : (map[node] = [[x, y]])));
    return map;
  }, {});

const addAntinodes = (grid: string[][], antinodes: number[][]) =>
  grid.forEach((row, x) =>
    row.forEach((node, y) => {
      const matching = antinodes.filter((antinode) => antinode[0] === x && antinode[1] === y);
      if (matching.length && node !== "#") grid[x][y] = "#";
    }),
  );

const getAntinodes = (grid: string[][], antennas: Record<string, number[][]>, harmonics = false) =>
  Object.values(antennas).reduce((nodes, xys) => {
    xys.forEach(([x1, y1], index) => {
      xys
        .filter((_, i) => i !== index)
        .forEach(([x2, y2]) => {
          let currX = x1;
          let currY = y1;
          let nextX = x2;
          let nextY = y2;
          while (nextX >= 0 && nextX <= grid.length && nextY >= 0 && nextY <= grid[0].length) {
            nodes.push([nextX - currX + nextX, nextY - currY + nextY]);
            const currXTemp = currX;
            const currYTemp = currY;
            currX = nextX;
            currY = nextY;
            nextX = nextX - currXTemp + nextX;
            nextY = nextY - currYTemp + nextY;
            if (!harmonics) (nextX = -1) && (nextY = -1);
          }
        });
    });
    return nodes;
  }, []);

export const uniqueAntinodesPart1 = (input: string) => {
  const grid = createGrid(input);
  const antinodes = getAntinodes(grid, mapAntennas(grid), false);
  addAntinodes(grid, antinodes);
  return grid.reduce((count, row) => count + row.filter((node) => node === "#").length, 0);
};

export const uniqueAntinodesPart2 = (input: string) => {
  const grid = createGrid(input);
  const antinodes = getAntinodes(grid, mapAntennas(grid), true);
  addAntinodes(grid, antinodes);
  return grid.reduce((count, row) => count + row.filter((node) => node !== ".").length, 0);
};
