const get = {
  up: { moveX: -1, moveY: 0, next: "right" },
  right: { moveX: 0, moveY: 1, next: "down" },
  down: { moveX: 1, moveY: 0, next: "left" },
  left: { moveX: 0, moveY: -1, next: "up" },
};

const createGrid = (input: string) => input.split("\n").map((row) => row.split(""));
const getStartPos = (grid: string[][]) => grid.reduce((pos, row, x) => (row.indexOf("^") >= 0 ? { x, y: row.indexOf("^") } : pos), { x: -1, y: -1 });
const checkVisited = (visited: Set<string>, x: number, y: number, direction: string) => visited.has(`${x},${y},${direction}`);
const addVisited = (visited: Set<string>, x: number, y: number, direction: string) => visited.add(`${x},${y},${direction}`);

const traverse = (grid: string[][], startPos: { x: number; y: number }, findLoop = false) => {
  let { x, y } = startPos,
    direction = "up",
    isLooping = false,
    visited = new Set<string>();
  while (x !== -1 && y !== -1 && !isLooping) {
    if (grid[x][y] !== "^") grid[x][y] = "X";
    const nextPos = grid[x + get[direction].moveX]?.[y + get[direction].moveY];
    if (["#"].includes(nextPos))
      (direction = get[direction].next),
        findLoop && checkVisited(visited, x, y, direction) ? (isLooping = true) : findLoop && addVisited(visited, x, y, direction);
    else if ([".", "X", "^"].includes(nextPos)) (x = x + get[direction].moveX), (y = y + get[direction].moveY);
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
