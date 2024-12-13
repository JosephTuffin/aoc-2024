interface Game {
  a: number[];
  b: number[];
  prize: number[];
}

const getGames = (input: string, offset = 0): Game[] =>
  input
    .split("\n\n")
    .map((game) => game.split("\n"))
    .map((game) => {
      return {
        a: game[0]
          .split(" ")
          .slice(2)
          .map((coord) => parseInt(coord.slice(2))),
        b: game[1]
          .split(" ")
          .slice(2)
          .map((coord) => parseInt(coord.slice(2))),
        prize: game[2]
          .split(" ")
          .slice(1)
          .map((coord) => parseInt(coord.slice(2)) + offset),
      };
    });

const solveGame = ([ax, ay]: number[], [bx, by]: number[], [x, y]: number[]) => {
  const a = (x * by - y * bx) / (ax * by - ay * bx);
  const b = (ax * y - ay * x) / (ax * by - ay * bx);
  return Number.isInteger(a) && Number.isInteger(b) ? [a, b] : [-1, -1];
};

const getTotal = (games: Game[]) =>
  games.reduce((count, { a, b, prize }) => {
    const [x, y] = solveGame(a, b, prize);
    return x >= 0 && y >= 0 ? count + (x * 3 + y) : count;
  }, 0);

export const clawTokensPart1 = (input: string) => getTotal(getGames(input));

export const clawTokensPart2 = (input: string) => getTotal(getGames(input, 10000000000000));
