const moveX = {
  up: -1,
  right: 0,
  down: 1,
  left: 0,
};

const moveY = {
  up: 0,
  right: 1,
  down: 0,
  left: -1,
};

const next = {
  up: "right",
  right: "down",
  down: "left",
  left: "up",
};

const createGrid = (input: string) => input.split("\n").map((row) => row.split(""));
const getStartPos = (grid: string[][]) => grid.reduce((pos, row, x) => (row.indexOf("^") >= 0 ? { x, y: row.indexOf("^") } : pos), { x: -1, y: -1 });
const checkVisited = (visited: Set<string>, x: number, y: number, direction: string) => visited.has(`${x},${y},${direction}`);
const addVisited = (visited: Set<string>, x: number, y: number, direction: string) => visited.add(`${x},${y},${direction}`);

const traverse = (grid: string[][], startPos: { x: number; y: number }, findLoop = false) => {
  let { x, y } = startPos;
  let direction = "up";
  let isLooping = false;
  const visited = new Set<string>();
  while (x !== -1 && y !== -1 && !isLooping) {
    if (grid[x][y] !== "^") grid[x][y] = "X";
    const nextPos = grid[x + moveX[direction]]?.[y + moveY[direction]];
    if (["#"].includes(nextPos))
      (direction = next[direction]),
        findLoop && checkVisited(visited, x, y, direction) ? (isLooping = true) : findLoop && addVisited(visited, x, y, direction);
    else if ([".", "X", "^"].includes(nextPos)) (x = x + moveX[direction]), (y = y + moveY[direction]);
    else (x = -1), (y = -1);
  }
  return isLooping ? [] : grid;
};

export const pathPositionsPart1 = (input: string) => {
  const grid = createGrid(input);
  const startPos = getStartPos(grid);
  return traverse(grid, startPos).reduce((count, row) => count + row.filter((pos) => ["X", "^"].includes(pos)).length, 0);
};

export const pathPositionsPart2 = (input: string) => {
  const grid = createGrid(input);
  const startPos = getStartPos(grid);
  const traversed = traverse(grid, startPos);
  return grid.reduce(
    (count, row, nextX) =>
      count +
      row.reduce((rowCount, _, nextY) => {
        if (["#", "^", "."].includes(traversed[nextX][nextY])) return rowCount;
        const _grid = grid.map((row) => row.slice());
        _grid[nextX][nextY] = "#";
        return rowCount + (traverse(_grid, startPos, true).length === 0 ? 1 : 0);
      }, 0),
    0,
  );
};
