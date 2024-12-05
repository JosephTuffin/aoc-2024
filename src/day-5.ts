const pairs = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13
`;

const input = `75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const generateMap = (pairs: string) =>
  pairs.split("\n").reduce((map, line) => {
    const [key, value] = line.split("|");
    map[key] ? map[key].push(value) : (map[key] = [value]);
    return map;
  }, {});

const isLineValid = (line: string[], pageMap: Record<string, string[]>) =>
  line.every(
    (page, index, arr) =>
      index === arr.length - 1 ||
      arr.slice(index + 1).every((otherPage) => pageMap[page] && pageMap[page].includes(otherPage)),
  );

export const pageOrderingPart1 = () => {
  const pageMap = generateMap(pairs);
  const total = input.split("\n").reduce((count, line) => {
    const lineArr = line.split(",");
    const validLine = isLineValid(lineArr, pageMap);
    return count + (validLine ? parseInt(lineArr[Math.round(lineArr.length - 1) / 2]) : 0);
  }, 0);
  return total;
};

export const pageOrderingPart2 = () => {
  const pageMap = generateMap(pairs);
  const total = input.split("\n").reduce((count, line) => {
    const lineArr = line.split(",");
    const validLine = isLineValid(lineArr, pageMap);
    if (validLine) return count;
    const orderedLine = lineArr.reduce((line, page, _, arr) => {
      const filteredPages = arr.filter((otherPage) => pageMap[page] && pageMap[page].includes(otherPage));
      line[arr.length - filteredPages.length - 1] = page;
      return line;
    }, new Array<string>(lineArr.length));
    return count + parseInt(orderedLine[Math.round(orderedLine.length - 1) / 2]);
  }, 0);
  return total;
};
