interface Position {
  x: number;
  y: number;
  direction: string;
  cost: number;
}

const createGrid = (size: number) => Array.from({ length: size }, () => Array.from({ length: size }, () => "."));
const formatBytes = (input: string) => input.split("\n").map((line) => line.split(",").map((n) => parseInt(n)));
const getBytes = (bytes: number[][], n: number) => bytes.filter((_, i) => i < n);
const setBytes = (grid: string[][], bytes: number[][]) => bytes.forEach(([x, y]) => (grid[y][x] = "#"));
const getPosKey = (pos: Position) => `${pos.x},${pos.y},${pos.direction}`;

const getPositions = (grid: string[][], { x, y, direction, cost }: Position) => {
  const pos: Position[] = [];
  if (grid[x + 1]?.[y] === "." && direction !== "up") pos.push({ x: x + 1, y: y, direction: "down", cost: cost + 1 });
  if (grid[x - 1]?.[y] === "." && direction !== "down") pos.push({ x: x - 1, y: y, direction: "up", cost: cost + 1 });
  if (grid[x]?.[y + 1] === "." && direction !== "left") pos.push({ x: x, y: y + 1, direction: "right", cost: cost + 1 });
  if (grid[x]?.[y - 1] === "." && direction !== "right") pos.push({ x: x, y: y - 1, direction: "left", cost: cost + 1 });
  return pos;
};

const dijkstras = (grid: string[][], size: number) => {
  const start: Position = { x: 0, y: 0, direction: "right", cost: 0 };
  const end: Position = { x: size - 1, y: size - 1, direction: "right", cost: 0 };

  const open: Position[] = [start];
  const scores: Map<string, number> = new Map();
  const previous: Map<string, Position[]> = new Map();
  scores.set(getPosKey(start), 0);

  while (open.length) {
    open.sort((a, b) => a.cost - b.cost);
    const current = open.shift();
    if (current.x === end.x && current.y === end.y) {
      return current.cost;
    }
    for (const nextPos of getPositions(grid, current)) {
      const nextPosKey = getPosKey(nextPos);
      const currentScore = scores.get(getPosKey(current));
      if (!scores.has(nextPosKey) || currentScore < scores.get(nextPosKey)) {
        scores.set(nextPosKey, currentScore);
        previous.set(nextPosKey, [current]);
        open.push(nextPos);
      } else if (currentScore === scores.get(nextPosKey)) {
        previous.get(nextPosKey).push(current);
      }
    }
  }
};

export const ramRunPart1 = (input: string, size = 7) => {
  const grid = createGrid(size);
  const bytes = getBytes(formatBytes(input), 12);
  setBytes(grid, bytes);
  return dijkstras(grid, size);
};

export const ramRunPart2 = (input: string, size = 7) => {
  const grid = createGrid(size);
  const bytes = formatBytes(input);
  for (let i = 0; i < bytes.length; i++) {
    const gridCopy = grid.map((row) => row.slice());
    setBytes(gridCopy, bytes.slice(0, i + 1));
    const result = dijkstras(gridCopy, size);
    if (!result) return bytes[i];
  }
};
