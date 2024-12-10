import { inputDay1, matchTotalPart1, matchTotalPart2 } from "./day-1/index.js";
import { inputDay10 } from "./day-10/input.js";
import { trailheadsPart1, trailheadsPart2 } from "./day-10/solution.js";
import { inputDay2, safeReportsPart1, safeReportsPart2 } from "./day-2/index.js";
import { inputDay3, memoryMulPart1, memoryMulPart2 } from "./day-3/index.js";
import { inputDay4, wordSearchPart1, wordSearchPart2 } from "./day-4/index.js";
import { inputDay5, pageOrderingPart1, pageOrderingPart2, rulesDay5 } from "./day-5/index.js";
import { inputDay6, pathPositionsPart1, pathPositionsPart2 } from "./day-6/index.js";
import { equationInsertPart1, equationInsertPart2, inputDay7 } from "./day-7/index.js";
import { inputDay8, uniqueAntinodesPart1, uniqueAntinodesPart2 } from "./day-8/index.js";
import { diskFragmentPart1, diskFragmentPart2, inputDay9 } from "./day-9/index.js";

console.log("day 1");
console.log("match total (part 1):", matchTotalPart1(inputDay1));
console.log("match total (part 2):", matchTotalPart2(inputDay1));

console.log("day 2");
console.log("safe reports (part 1):", safeReportsPart1(inputDay2));
console.log("safe reports (part 2):", safeReportsPart2(inputDay2));

console.log("day 3");
console.log("memory multiply (part 1):", memoryMulPart1(inputDay3));
console.log("memory multiply (part 2):", memoryMulPart2(inputDay3));

console.log("day 4");
console.log("word search (part 1):", wordSearchPart1(inputDay4));
console.log("word search (part 2):", wordSearchPart2(inputDay4));

console.log("day 5");
console.log("page ordering (part 1):", pageOrderingPart1(inputDay5, rulesDay5));
console.log("page ordering (part 2):", pageOrderingPart2(inputDay5, rulesDay5));

console.log("day 6");
console.log("path positions (part 1):", pathPositionsPart1(inputDay6));
console.log("path positions (part 2):", pathPositionsPart2(inputDay6));

console.log("day 7");
console.log("equation insert (part 1):", equationInsertPart1(inputDay7));
console.log("equation insert (part 2):", equationInsertPart2(inputDay7));

console.log("day 8");
console.log("unique antinodes (part 1):", uniqueAntinodesPart1(inputDay8));
console.log("unique antinodes (part 2):", uniqueAntinodesPart2(inputDay8));

console.log("day 9");
console.log("disk fragment (part 1):", diskFragmentPart1(inputDay9));
console.log("disk fragment (part 2):", diskFragmentPart2(inputDay9));

console.log("day 9");
console.log("trailheads (part 1):", trailheadsPart1(inputDay10));
console.log("trailheads (part 2):", trailheadsPart2(inputDay10));
