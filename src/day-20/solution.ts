interface Position {
  value: string;
  steps: number;
  x: number;
  y: number;
  key: string;
}

const createGrid = (input: string): Position[][] =>
  input.split("\n").map((row, x) => row.split("").map((pos, y) => ({ value: pos, x, y, key: `${x},${y}`, steps: 0 })));

const getStart = (grid: Position[][]) => {
  for (const row of grid) {
    for (const pos of row) {
      if (pos.value === "S") {
        return pos;
      }
    }
  }
};

const getEnd = (grid: Position[][]) => {
  for (const row of grid) {
    for (const pos of row) {
      if (pos.value === "E") {
        return pos;
      }
    }
  }
};

const getNext = (grid: Position[][], current: Position, path: Map<string, Position>): Position[] => {
  const next = [
    { x: current.x + 1, y: current.y },
    { x: current.x - 1, y: current.y },
    { x: current.x, y: current.y + 1 },
    { x: current.x, y: current.y - 1 },
  ];
  return next
    .filter((pos) => grid[pos.x]?.[pos.y])
    .map(({ x, y }) => ({ ...grid[x][y], steps: current.steps + 1 }))
    .filter((pos) => pos.value !== "#" && !path.has(pos.key));
};

const getPath = (grid: Position[][]) => {
  const start = getStart(grid);
  const end = getEnd(grid);

  const path = new Map<string, Position>();
  path.set(start.key, start);

  const next = [start];
  while (next) {
    const current = next.shift();
    if (current.key === end.key) {
      return [...path.values()];
    }
    for (const nextPos of getNext(grid, current, path)) {
      path.set(nextPos.key, nextPos);
      next.push(nextPos);
    }
  }
};

const getCheats = (path: Position[], maxDistance: number) => {
  const cheats: number[] = [];
  for (const posA of path) {
    for (const posB of path) {
      const stepsSaved = posB.steps - posA.steps;
      const distance = Math.abs(posA.x - posB.x) + Math.abs(posA.y - posB.y);
      if (distance > maxDistance) continue;
      const actualSaved = stepsSaved - distance;
      if (actualSaved > 0) cheats.push(actualSaved);
    }
  }
  return cheats;
};

const filterCheats = (cheats: number[], minSaved: number) => cheats.filter((cheat) => cheat >= minSaved);

export const raceConditionPart1 = (input: string) => {
  const grid = createGrid(input);
  const path = getPath(grid);
  const cheats = getCheats(path, 2);
  return filterCheats(cheats, 50).length;
};

export const raceConditionPart2 = (input: string) => {
  const grid = createGrid(input);
  const path = getPath(grid);
  const cheats = getCheats(path, 20);
  return filterCheats(cheats, 50).length;
};
