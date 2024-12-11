const getStones = (input: string) => new Map<string, number>(input.split(" ").map((stone) => [stone, 1]));

const getStonesCount = (stones: Map<string, number>) => Array.from(stones.values()).reduce((acc, count) => acc + count, 0);

const iterate = (stones: Map<string, number>, iterations: number) => {
  for (let i = 0; i < iterations; i++) {
    for (const [stone, count] of new Map(stones)) {
      if (stone === "0") {
        stones.set("1", (stones.get("1") || 0) + count);
        stones.set(stone, stones.get(stone) - count);
      } else if (stone.length % 2 === 0) {
        const firstHalf = parseInt(stone.slice(0, stone.length / 2)).toString();
        const secondHalf = parseInt(stone.slice(stone.length / 2)).toString();
        stones.set(firstHalf, (stones.get(firstHalf) || 0) + count);
        stones.set(secondHalf, (stones.get(secondHalf) || 0) + count);
        stones.set(stone, stones.get(stone) - count);
      } else {
        const newStone = (parseInt(stone) * 2024).toString();
        stones.set(newStone, (stones.get(newStone) || 0) + count);
        stones.set(stone, stones.get(stone) - count);
      }
    }
  }
};

export const stoneSplitPart1 = (input: string) => {
  const stones = getStones(input);
  iterate(stones, 25);
  return getStonesCount(stones);
};

export const stoneSplitPart2 = (input: string) => {
  const stones = getStones(input);
  iterate(stones, 75);
  return getStonesCount(stones);
};
