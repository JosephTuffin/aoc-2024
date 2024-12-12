interface Plot {
  type: string;
  visited: boolean;
}

const getGrid = (input: string) => input.split("\n").map((row) => row.split("").map((plot) => ({ type: plot, visited: false })));

const getNeighbours = (grid: Plot[][], [x, y]: number[]) => {
  const neighbours: number[][] = [];
  const current = grid[x][y];
  if (grid[x + 1]?.[y]?.type === current.type && !grid[x + 1]?.[y]?.visited) neighbours.push([x + 1, y]);
  if (grid[x - 1]?.[y]?.type === current.type && !grid[x - 1]?.[y]?.visited) neighbours.push([x - 1, y]);
  if (grid[x]?.[y + 1]?.type === current.type && !grid[x]?.[y + 1]?.visited) neighbours.push([x, y + 1]);
  if (grid[x]?.[y - 1]?.type === current.type && !grid[x]?.[y - 1]?.visited) neighbours.push([x, y - 1]);
  grid[x][y].visited = true;
  return neighbours;
};

const getPerimeter = (grid: Plot[][], [x, y]: number[]) => {
  let perimeter = 4;
  const current = grid[x][y];
  if (grid[x + 1]?.[y]?.type === current.type) perimeter--;
  if (grid[x - 1]?.[y]?.type === current.type) perimeter--;
  if (grid[x]?.[y + 1]?.type === current.type) perimeter--;
  if (grid[x]?.[y - 1]?.type === current.type) perimeter--;
  return perimeter;
};

const getCorners = (grid: Plot[][], [x, y]: number[]) => {
  let corners = 0;
  const current = grid[x][y];
  if (grid[x]?.[y - 1]?.type !== current.type && grid[x - 1]?.[y]?.type !== current.type) corners++;
  if (grid[x]?.[y + 1]?.type !== current.type && grid[x - 1]?.[y]?.type !== current.type) corners++;
  if (grid[x]?.[y - 1]?.type !== current.type && grid[x + 1]?.[y]?.type !== current.type) corners++;
  if (grid[x]?.[y + 1]?.type !== current.type && grid[x + 1]?.[y]?.type !== current.type) corners++;
  if (grid[x - 1]?.[y]?.type === current.type && grid[x]?.[y + 1]?.type === current.type && grid[x - 1]?.[y + 1]?.type !== current.type) corners++;
  if (grid[x - 1]?.[y]?.type === current.type && grid[x]?.[y - 1]?.type === current.type && grid[x - 1]?.[y - 1]?.type !== current.type) corners++;
  if (grid[x + 1]?.[y]?.type === current.type && grid[x]?.[y - 1]?.type === current.type && grid[x + 1]?.[y - 1]?.type !== current.type) corners++;
  if (grid[x + 1]?.[y]?.type === current.type && grid[x]?.[y + 1]?.type === current.type && grid[x + 1]?.[y + 1]?.type !== current.type) corners++;
  return corners;
};

const getNextRegion = (grid: Plot[][]) => {
  const region = [0, 0];
  let found = false;
  for (let x = 0; x < grid.length; x++) {
    if (found) break;
    for (let y = 0; y < grid[x].length; y++) {
      if (!grid[x][y].visited) {
        region[0] = x;
        region[1] = y;
        found = true;
        break;
      }
    }
  }
  return found ? region : null;
};

const getRegionKey = (grid: Plot[][], [x, y]: number[]) => `${x},${y} (${grid[x][y].type})`;

const mapRegions = (grid: Plot[][]) => {
  let region = getNextRegion(grid);
  let regionKey = getRegionKey(grid, region);
  const map = {
    [regionKey]: { area: 1, perimeter: getPerimeter(grid, region), corners: getCorners(grid, region) },
  };
  while (region) {
    const neighbours = getNeighbours(grid, region);
    while (neighbours.length) {
      const next = neighbours.shift();
      if (grid[next[0]][next[1]].visited) continue;
      const nextNeighbours = getNeighbours(grid, next);
      map[regionKey].area++;
      map[regionKey].perimeter += getPerimeter(grid, next);
      map[regionKey].corners += getCorners(grid, next);
      neighbours.push(...nextNeighbours);
    }
    region = getNextRegion(grid);
    if (region) {
      regionKey = getRegionKey(grid, region);
      map[regionKey] = { area: 1, perimeter: getPerimeter(grid, region), corners: getCorners(grid, region) };
    }
  }
  return map;
};

export const gardenGroupsPart1 = (input: string) => {
  const grid = getGrid(input);
  const map = mapRegions(grid);
  return Object.values(map).reduce((total, { area, perimeter }) => total + area * perimeter, 0);
};

export const gardenGroupsPart2 = (input: string) => {
  const grid = getGrid(input);
  const map = mapRegions(grid);
  return Object.values(map).reduce((total, { area, corners }) => total + area * corners, 0);
};
