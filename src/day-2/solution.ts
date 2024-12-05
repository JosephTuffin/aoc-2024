const isSafe = (numbers: number[]) =>
  numbers.every((n, index, arr) => {
    if (index === arr.length - 1) return true;
    const diff = arr[index + 1] - n;
    return diff >= 1 && diff <= 3;
  }) ||
  numbers.every((n, index, arr) => {
    if (index === arr.length - 1) return true;
    const diff = n - arr[index + 1];
    return diff >= 1 && diff <= 3;
  });

export const safeReportsPart1 = (input: string) =>
  input.split("\n").reduce((count, report) => {
    const numbers = report.split(" ").map((n) => parseInt(n));
    const safe = isSafe(numbers);
    return count + (safe ? 1 : 0);
  }, 0);

export const safeReportsPart2 = (input: string) =>
  input.split("\n").reduce((count, report) => {
    const numbers = report.split(" ").map((n) => parseInt(n));
    const safe = numbers.some((_, index) => isSafe(numbers.filter((_, i) => i !== index)));
    return count + (safe ? 1 : 0);
  }, 0);
