interface Position {
  x: number;
  y: number;
  direction: string;
  cost: number;
}

const moveCost = {
  up: { up: 1, right: 1001, left: 1001, down: 2001 },
  right: { right: 1, down: 1001, up: 1001, left: 2001 },
  down: { down: 1, left: 1001, right: 1001, up: 2001 },
  left: { left: 1, up: 1001, down: 1001, right: 2001 },
};

const getMaze = (input: string) => input.split("\n").map((row) => row.split(""));
const getStartPos = (maze: string[][]) => ({ x: maze.length - 2, y: 1 });
const getEndPos = (maze: string[][]) => ({ x: 1, y: maze[0].length - 2 });
const getPosKey = (pos: Position) => `${pos.x},${pos.y},${pos.direction}`;

const getPositions = (maze: string[][], { x, y, direction, cost }: Position) => {
  const pos: Position[] = [];
  if (maze[x + 1]?.[y] !== "#" && direction !== "up") pos.push({ x: x + 1, y: y, direction: "down", cost: cost + moveCost[direction].down });
  if (maze[x - 1]?.[y] !== "#" && direction !== "down") pos.push({ x: x - 1, y: y, direction: "up", cost: cost + moveCost[direction].up });
  if (maze[x]?.[y + 1] !== "#" && direction !== "left") pos.push({ x: x, y: y + 1, direction: "right", cost: cost + moveCost[direction].right });
  if (maze[x]?.[y - 1] !== "#" && direction !== "right") pos.push({ x: x, y: y - 1, direction: "left", cost: cost + moveCost[direction].left });
  return pos;
};

const rebuildPath = (previous: Map<string, Position[]>, end: Position) => {
  const complete = [];
  const incomplete = [{ curr: end, path: [] }];
  while (incomplete.length) {
    const { curr, path } = incomplete.pop();
    const newPath = [curr, ...path];
    const currKey = getPosKey(curr);
    if (!previous.has(currKey)) complete.push(newPath);
    else {
      for (const prev of previous.get(currKey)) {
        if (prev.cost < curr.cost) {
          incomplete.push({ curr: prev, path: newPath });
        }
      }
    }
  }
  return complete;
};

const uniquePositions = (paths: Position[][]) => {
  const unique = new Set<string>();
  for (const path of paths) {
    for (const pos of path) {
      unique.add(`${pos.x},${pos.y}`);
    }
  }
  return unique.size;
};

const dijkstras = (maze: string[][], returnType = "cost") => {
  const start: Position = { ...getStartPos(maze), direction: "right", cost: 0 };
  const end: Position = { ...getEndPos(maze), direction: "right", cost: 0 };

  const open: Position[] = [start];
  const scores: Map<string, number> = new Map();
  const previous: Map<string, Position[]> = new Map();
  scores.set(getPosKey(start), 0);

  while (open.length) {
    open.sort((a, b) => a.cost - b.cost);
    const current = open.shift();
    if (current.x === end.x && current.y === end.y) {
      return returnType === "cost" ? current.cost : uniquePositions(rebuildPath(previous, current));
    }
    for (const nextPos of getPositions(maze, current)) {
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

export const reindeerMazePart1 = (input: string) => {
  const maze = getMaze(input);
  return dijkstras(maze, "cost");
};

export const reindeerMazePart2 = (input: string) => {
  const maze = getMaze(input);
  return dijkstras(maze, "unique");
};
