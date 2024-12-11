const getStones = (input: string) => {
  const stones = new Map<string, number>();
  input.split(" ").forEach((stone) => stones.set(stone, 1));
  return stones;
};

const getStonesCount = (stones: Map<string, number>) => Array.from(stones.values()).reduce((acc, count) => acc + count, 0);

const iterate = (stones: Map<string, number>, iterations: number) => {
  for (let i = 0; i < iterations; i++) {
    for (const [stone, count] of new Map(stones)) {
      if (stone === "0") {
        if (stones.has("1")) stones.set("1", stones.get("1") + count);
        else stones.set("1", count);
        stones.set(stone, stones.get(stone) - count);
      } else if (stone.length % 2 === 0) {
        const firstHalf = parseInt(stone.slice(0, stone.length / 2)).toString();
        const secondHalf = parseInt(stone.slice(stone.length / 2)).toString();
        if (stones.has(firstHalf)) stones.set(firstHalf, stones.get(firstHalf) + count);
        else stones.set(firstHalf, count);
        if (stones.has(secondHalf)) stones.set(secondHalf, stones.get(secondHalf) + count);
        else stones.set(secondHalf, count);
        stones.set(stone, stones.get(stone) - count);
      } else {
        const newStone = (parseInt(stone) * 2024).toString();
        if (stones.has(newStone)) stones.set(newStone, stones.get(newStone) + count);
        else stones.set(newStone, count);
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
