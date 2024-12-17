const formatInput = (input: string) => input.replaceAll("#", "##").replaceAll("O", "[]").replaceAll(".", "..").replaceAll("@", "@.");

const getGrid = (input: string) => input.split("\n").map((row) => row.split(""));

const getMoves = (movements: string) => movements.split("");

const getStartPos = (grid: string[][]) => grid.reduce((pos, row, x) => (row.indexOf("@") >= 0 ? { x, y: row.indexOf("@") } : pos), { x: -1, y: -1 });

const getNextPos = (startPos: { x: number; y: number }, direction: string) => {
  const { x, y } = startPos;
  switch (direction) {
    case "^":
      return { x: x - 1, y };
    case ">":
      return { x, y: y + 1 };
    case "v":
      return { x: x + 1, y };
    case "<":
      return { x, y: y - 1 };
    default:
      return undefined;
  }
};

const swapPos = (grid: string[][], startPos: { x: number; y: number }, nextPos: { x: number; y: number }) => {
  const replace = grid[nextPos.x][nextPos.y];
  grid[nextPos.x][nextPos.y] = grid[startPos.x][startPos.y];
  grid[startPos.x][startPos.y] = replace;
};

const moveBoxes = (grid: string[][], startPos: { x: number; y: number }, direction: string, checkOnly = false) => {
  const nextPos = getNextPos(startPos, direction);
  if (grid[nextPos.x]?.[nextPos.y] === ".") {
    !checkOnly && swapPos(grid, startPos, nextPos);
    return true;
  }
  if (grid[nextPos.x]?.[nextPos.y] === "O" && moveBoxes(grid, nextPos, direction)) {
    !checkOnly && swapPos(grid, startPos, nextPos);
    return true;
  }
  if (["[", "]"].includes(grid[nextPos.x]?.[nextPos.y]) && ["<", ">"].includes(direction) && moveBoxes(grid, nextPos, direction)) {
    !checkOnly && swapPos(grid, startPos, nextPos);
    return true;
  }
  if (grid[nextPos.x]?.[nextPos.y] === "[" && ["^", "v"].includes(direction)) {
    const otherHalfPos = getNextPos(nextPos, ">");
    const canMoveBoth = moveBoxes(grid, nextPos, direction, true) && moveBoxes(grid, otherHalfPos, direction, true);
    if (!checkOnly && canMoveBoth) {
      moveBoxes(grid, nextPos, direction, checkOnly);
      moveBoxes(grid, otherHalfPos, direction, checkOnly);
      swapPos(grid, startPos, nextPos);
    }
    return canMoveBoth;
  }
  if (grid[nextPos.x]?.[nextPos.y] === "]" && ["^", "v"].includes(direction)) {
    const otherHalfPos = getNextPos(nextPos, "<");
    const canMoveBoth = moveBoxes(grid, nextPos, direction, true) && moveBoxes(grid, otherHalfPos, direction, true);
    if (!checkOnly && canMoveBoth) {
      moveBoxes(grid, nextPos, direction, checkOnly);
      moveBoxes(grid, otherHalfPos, direction, checkOnly);
      swapPos(grid, startPos, nextPos);
    }
    return canMoveBoth;
  }
  return false;
};

const getGpsTotal = (grid: string[][]) =>
  grid.reduce((total, row, x) => total + row.reduce((rowTotal, pos, y) => (["O", "["].includes(pos) ? rowTotal + 100 * x + y : rowTotal), 0), 0);

export const warehouseBoxesPart1 = (input: string, movements: string) => {
  const grid = getGrid(input);
  const moves = getMoves(movements);
  let pos = getStartPos(grid);
  while (moves.length) {
    const direction = moves.shift();
    const nextPos = getNextPos(pos, direction);
    if (!nextPos) continue;
    if (moveBoxes(grid, pos, direction)) pos = nextPos;
  }
  return getGpsTotal(grid);
};

export const warehouseBoxesPart2 = (input: string, movements: string) => {
  const grid = getGrid(formatInput(input));
  const moves = getMoves(movements);
  let pos = getStartPos(grid);
  while (moves.length) {
    const direction = moves.shift();
    const nextPos = getNextPos(pos, direction);
    if (!nextPos) continue;
    if (moveBoxes(grid, pos, direction)) pos = nextPos;
  }
  return getGpsTotal(grid);
};
