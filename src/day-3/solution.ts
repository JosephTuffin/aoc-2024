export const memoryMulPart1 = (input: string) =>
  [...input.matchAll(/mul\(\d+,\d+\)/g)].reduce((count, match) => {
    const [a, b] = match[0].slice(4, -1).split(",");
    return count + parseInt(a) * parseInt(b);
  }, 0);

export const memoryMulPart2 = (input: string) =>
  [...input.matchAll(/mul\(\d+,\d+\)/g)].reduce((count, match) => {
    const disabled = input.slice(0, match.index).lastIndexOf("don't()");
    const enabled = input.slice(0, match.index).lastIndexOf("do()");
    if (enabled > disabled || disabled === -1) {
      const [a, b] = match[0].slice(4, -1).split(",");
      return count + parseInt(a) * parseInt(b);
    }
    return count;
  }, 0);
