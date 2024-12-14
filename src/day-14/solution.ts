const width = 101;
const height = 103;

const createGrid = (x: number, y: number) => Array.from({ length: y }, () => Array.from({ length: x }, () => ({ robots: 0 })));

const formatPosition = (position: string) => [parseInt(position.slice(2).split(",")[0]), parseInt(position.slice(2).split(",")[1])];

const getCoordinate = (value: number, velocity: number, seconds: number, max: number) => (max + ((value + velocity * seconds) % max)) % max;

const formatRobots = (input: string) =>
  input
    .split("\n")
    .map((line) => line.split(" "))
    .map(([start, velocity]) => ({
      start: formatPosition(start),
      velocity: formatPosition(velocity),
    }));

const getQuadrants = (grid: { robots: number }[][]) => {
  const halfHeight = (grid.length - 1) / 2;
  const halfWidth = (grid[0].length - 1) / 2;
  const topLeft = grid
    .slice(0, halfHeight)
    .map((row) => row.slice(0, halfWidth).reduce((acc, { robots }) => acc + robots, 0))
    .reduce((acc, row) => acc + row, 0);
  const topRight = grid
    .slice(0, halfHeight)
    .map((row) => row.slice(halfWidth + 1).reduce((acc, { robots }) => acc + robots, 0))
    .reduce((acc, row) => acc + row, 0);
  const bottomLeft = grid
    .slice(halfHeight + 1)
    .map((row) => row.slice(0, halfWidth).reduce((acc, { robots }) => acc + robots, 0))
    .reduce((acc, row) => acc + row, 0);
  const bottomRight = grid
    .slice(halfHeight + 1)
    .map((row) => row.slice(halfWidth + 1).reduce((acc, { robots }) => acc + robots, 0))
    .reduce((acc, row) => acc + row, 0);
  return topLeft * topRight * bottomLeft * bottomRight;
};

const updatePositions = (grid: { robots: number }[][], robots: { start: number[]; velocity: number[] }[], seconds: number) => {
  robots.forEach(({ start: [x, y], velocity: [vx, vy] }) => {
    grid[getCoordinate(y, vy, seconds, grid.length)][getCoordinate(x, vx, seconds, grid[0].length)].robots++;
  });
};

export const robotQuadrantsPart1 = (input: string) => {
  const robots = formatRobots(input);
  const grid = createGrid(width, height);
  updatePositions(grid, robots, 100);
  return getQuadrants(grid);
};

export const robotQuadrantsPart2 = (input: string) => {
  const robots = formatRobots(input);
  const scores = [];
  for (let seconds = 0; seconds < 7500; seconds++) {
    const grid = createGrid(width, height);
    updatePositions(grid, robots, 100);
    scores.push(getQuadrants(grid));
  }
  return scores.indexOf(Math.min(...scores));
};
