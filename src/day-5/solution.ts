const generateMap = (rules: string) =>
  rules.split("\n").reduce((map, line) => {
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

export const pageOrderingPart1 = (input: string, rules: string) => {
  const pageMap = generateMap(rules);
  const total = input.split("\n").reduce((count, line) => {
    const lineArr = line.split(",");
    const validLine = isLineValid(lineArr, pageMap);
    return count + (validLine ? parseInt(lineArr[Math.round(lineArr.length - 1) / 2]) : 0);
  }, 0);
  return total;
};

export const pageOrderingPart2 = (input: string, rules: string) => {
  const pageMap = generateMap(rules);
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
