const createGraph = (input: string) => input.split("\n").map((row) => row.split("").map((n) => parseInt(n)));

const getStartPositions = (graph: number[][]) =>
  graph.reduce(
    (positions, rows, x) => [
      ...positions,
      ...rows.reduce((rowPositions, value, y) => (value === 0 ? [...rowPositions, [x, y]] : rowPositions), [] as number[][]),
    ],
    [] as number[][],
  );

const checkPositions = (graph: number[][], [x, y]: number[], value: number) => {
  const positions: number[][] = [];
  if (graph[x + 1]?.[y] === value + 1) positions.push([x + 1, y]);
  if (graph[x - 1]?.[y] === value + 1) positions.push([x - 1, y]);
  if (graph[x]?.[y + 1] === value + 1) positions.push([x, y + 1]);
  if (graph[x]?.[y - 1] === value + 1) positions.push([x, y - 1]);
  return positions;
};

const traverseGraph = (graph: number[][], start: number[]) => {
  const trailheads = [];
  const visit = checkPositions(graph, start, 0);
  while (visit.length) {
    const [x, y] = visit.shift();
    const value = graph[x][y];
    if (value === 9) trailheads.push(`${x},${y}`);
    else visit.push(...checkPositions(graph, [x, y], value));
  }
  return trailheads;
};

export const trailheadsPart1 = (input: string) => {
  let trailheadCount = 0;
  const graph = createGraph(input);
  const startPositions = getStartPositions(graph);
  for (const start of startPositions) {
    const trailheads = traverseGraph(graph, start);
    trailheadCount += new Set(trailheads).size;
  }
  return trailheadCount;
};

export const trailheadsPart2 = (input: string) => {
  let trailheadCount = 0;
  const graph = createGraph(input);
  const startPositions = getStartPositions(graph);
  for (const start of startPositions) {
    const trailheads = traverseGraph(graph, start);
    trailheadCount += trailheads.length;
  }
  return trailheadCount;
};
