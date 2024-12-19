const getPatterns = (patterns: string) => patterns.split(", ");
const getDesigns = (input: string) => input.split("\n");

const checkPattern = (design: string, patterns: string[], memo: Map<string, number>) => {
  if (design.length === 0) {
    return 1;
  }
  if (memo.has(design)) {
    return memo.get(design);
  }
  let count = 0;
  for (const pattern of patterns) {
    if (design.startsWith(pattern)) {
      const remaining = design.slice(pattern.length);
      count += checkPattern(remaining, patterns, memo);
    }
  }
  memo.set(design, count);
  return count;
};

export const towelDesignsPart1 = (designsInput: string, patternsInput: string) => {
  const designs = getDesigns(designsInput);
  const patterns = getPatterns(patternsInput);
  let count = 0;
  for (const design of designs) {
    const memo = new Map<string, number>();
    if (checkPattern(design, patterns, memo) > 0) count++;
  }
  return count;
};

export const towelDesignsPart2 = (designsInput: string, patternsInput: string) => {
  const designs = getDesigns(designsInput);
  const patterns = getPatterns(patternsInput);
  let count = 0;
  for (const design of designs) {
    const memo = new Map<string, number>();
    count += checkPattern(design, patterns, memo);
  }
  return count;
};
