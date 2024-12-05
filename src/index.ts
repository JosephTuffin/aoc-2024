import { inputDay1, matchTotalPart1, matchTotalPart2 } from "./day-1/index.js";
import { inputDay2, safeReportsPart1, safeReportsPart2 } from "./day-2/index.js";
import { inputDay3, memoryMulPart1, memoryMulPart2 } from "./day-3/index.js";
import { inputDay4, wordSearchPart1, wordSearchPart2 } from "./day-4/index.js";
import { inputDay5, pageOrderingPart1, pageOrderingPart2, rulesDay5 } from "./day-5/index.js";

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
