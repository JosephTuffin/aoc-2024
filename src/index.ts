import { inputDay1, matchTotalPart1, matchTotalPart2 } from "./day-1/index.js";
import { inputDay10, trailheadsPart1, trailheadsPart2 } from "./day-10/index.js";
import { inputDay11, stoneSplitPart1, stoneSplitPart2 } from "./day-11/index.js";
import { gardenGroupsPart1, gardenGroupsPart2, inputDay12 } from "./day-12/index.js";
import { clawTokensPart1, clawTokensPart2, inputDay13 } from "./day-13/index.js";
import { inputDay14, robotQuadrantsPart1, robotQuadrantsPart2 } from "./day-14/index.js";
import { inputDay15, movementsDay15, warehouseBoxesPart1, warehouseBoxesPart2 } from "./day-15/index.js";
import { inputDay16, reindeerMazePart1, reindeerMazePart2 } from "./day-16/index.js";
import { computerProgramPart1, computerProgramPart2, inputDay17, registersDay17 } from "./day-17/index.js";
import { inputDay18, ramRunPart1, ramRunPart2 } from "./day-18/index.js";
import { inputDay19, patternsDay19, towelDesignsPart1, towelDesignsPart2 } from "./day-19/index.js";
import { inputDay2, safeReportsPart1, safeReportsPart2 } from "./day-2/index.js";
import { inputDay20, raceConditionPart1, raceConditionPart2 } from "./day-20/index.js";
import { inputDay22, monkeyMarketPart1, monkeyMarketPart2 } from "./day-22/index.js";
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

console.log("day 10");
console.log("trailheads (part 1):", trailheadsPart1(inputDay10));
console.log("trailheads (part 2):", trailheadsPart2(inputDay10));

console.log("day 11");
console.log("stone split (part 1):", stoneSplitPart1(inputDay11));
console.log("stone split (part 2):", stoneSplitPart2(inputDay11));

console.log("day 12");
console.log("garden groups (part 1):", gardenGroupsPart1(inputDay12));
console.log("garden groups (part 2):", gardenGroupsPart2(inputDay12));

console.log("day 13");
console.log("claw tokens (part 1):", clawTokensPart1(inputDay13));
console.log("claw tokens (part 2):", clawTokensPart2(inputDay13));

console.log("day 14");
console.log("robot quadrants (part 1):", robotQuadrantsPart1(inputDay14));
console.log("robot quadrants (part 2):", robotQuadrantsPart2(inputDay14));

console.log("day 15");
console.log("warehouse boxes (part 1):", warehouseBoxesPart1(inputDay15, movementsDay15));
console.log("warehouse boxes (part 2):", warehouseBoxesPart2(inputDay15, movementsDay15));

console.log("day 16");
console.log("reindeer maze (part 1):", reindeerMazePart1(inputDay16));
console.log("reindeer maze (part 2):", reindeerMazePart2(inputDay16));

console.log("day 17");
console.log("computer program (part 1):", computerProgramPart1(inputDay17, registersDay17));
console.log("computer program (part 2):", computerProgramPart2(inputDay17, registersDay17));

console.log("day 18");
console.log("ram run (part 1):", ramRunPart1(inputDay18));
console.log("ram run (part 2):", ramRunPart2(inputDay18));

console.log("day 19");
console.log("towel designs (part 1):", towelDesignsPart1(inputDay19, patternsDay19));
console.log("towel designs (part 2):", towelDesignsPart2(inputDay19, patternsDay19));

console.log("day 20");
console.log("race condition (part 1):", raceConditionPart1(inputDay20));
console.log("race condition (part 2):", raceConditionPart2(inputDay20));

console.log("day 22");
console.log("monkey market (part 1):", monkeyMarketPart1(inputDay22));
console.log("monkey market (part 2):", monkeyMarketPart2(inputDay22));
