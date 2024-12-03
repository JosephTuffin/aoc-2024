const input = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

export const memoryMulPart1 = () => {
  const regex = /mul\(\d+,\d+\)/g;

  const total = [...input.matchAll(regex)].reduce((count, match) => {
    const [a, b] = match[0].slice(4, -1).split(",");
    return count + parseInt(a) * parseInt(b);
  }, 0);

  return total;
};

export const memoryMulPart2 = () => {
  const regex = /mul\(\d+,\d+\)/g;

  const total = [...input.matchAll(regex)].reduce((count, match) => {
    const disabled = input.slice(0, match.index).lastIndexOf("don't()");
    const enabled = input.slice(0, match.index).lastIndexOf("do()");
    if (enabled > disabled || disabled === -1) {
      const [a, b] = match[0].slice(4, -1).split(",");
      return count + parseInt(a) * parseInt(b);
    }
    return count;
  }, 0);

  return total;
};
