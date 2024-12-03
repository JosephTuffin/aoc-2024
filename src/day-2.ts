const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const isSafe = (numbers: number[]) => {
  const safeAsc = numbers.every((n, index, arr) => {
    if (index === arr.length - 1) return true;
    const diff = arr[index + 1] - n;
    return diff >= 1 && diff <= 3;
  });
  const safeDesc = numbers.every((n, index, arr) => {
    if (index === arr.length - 1) return true;
    const diff = n - arr[index + 1];
    return diff >= 1 && diff <= 3;
  });
  return safeAsc || safeDesc;
};

export const safeReportsPart1 = () => {
  const reports = input.split("\n");
  const safeReports = reports.reduce((count, report) => {
    const numbers = report.split(" ").map((n) => parseInt(n));
    const safe = isSafe(numbers);
    return count + (safe ? 1 : 0);
  }, 0);

  return safeReports;
};

export const safeReportsPart2 = () => {
  const reports = input.split("\n");
  const safeReports = reports.reduce((count, report) => {
    const numbers = report.split(" ").map((n) => parseInt(n));
    const safe = numbers.some((_, index) => isSafe(numbers.filter((_, i) => i !== index)));
    return count + (safe ? 1 : 0);
  }, 0);

  return safeReports;
};
