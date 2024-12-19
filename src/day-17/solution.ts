const getRegisters = (registers: string) => ({
  a: BigInt(registers.split("\n")[0].split(" ")[2]),
  b: BigInt(registers.split("\n")[1].split(" ")[2]),
  c: BigInt(registers.split("\n")[2].split(" ")[2]),
});

const getProgram = (input: string) =>
  input
    .split(":")[1]
    .split(",")
    .map((n) => parseInt(n));

const combo = (n: number, registers: { a: bigint; b: bigint; c: bigint }) => {
  switch (n) {
    case 0:
    case 1:
    case 2:
    case 3:
      return BigInt(n);
    case 4:
      return registers.a;
    case 5:
      return registers.b;
    case 6:
      return registers.c;
    case 7:
    default:
      return null;
  }
};

const instruction = (opcode: number, operand: number, registers: { a: bigint; b: bigint; c: bigint }) => {
  switch (opcode) {
    case 0:
      const adv = BigInt(registers.a / BigInt(2) ** combo(operand, registers));
      registers.a = adv;
      return;
    case 1:
      const bxl = registers.b ^ BigInt(operand);
      registers.b = bxl;
      return;
    case 2:
      const bst = combo(operand, registers) % BigInt(8);
      registers.b = bst;
      return;
    case 3:
      if (registers.a !== BigInt(0)) {
        return operand;
      }
      return;
    case 4:
      const bxc = registers.b ^ registers.c;
      registers.b = bxc;
      return;
    case 5:
      const out = combo(operand, registers) % BigInt(8);
      return out;
    case 6:
      const bdv = BigInt(registers.a / BigInt(2) ** combo(operand, registers));
      registers.b = bdv;
      return;
    case 7:
      const cdv = BigInt(registers.a / BigInt(2) ** combo(operand, registers));
      registers.c = cdv;
      return;
  }
};

const runProgram = (program: number[], registers: { a: bigint; b: bigint; c: bigint }) => {
  let instructionPointer = 0;
  let output = [];
  while (instructionPointer < program.length) {
    const opcode = program[instructionPointer];
    const operand = program[instructionPointer + 1];
    const out = instruction(opcode, operand, registers);
    if (out !== undefined && opcode === 5) output.push(out);
    if (out !== undefined && opcode === 3) instructionPointer = Number(out);
    if (opcode !== 3 || (opcode === 3 && out === undefined)) instructionPointer += 2;
  }
  return output;
};

const findA = (partial: bigint, power: number, program: number[], target: number[], final: bigint[]) => {
  for (let n = 0; n < 8; n++) {
    const sum = partial + BigInt(Math.pow(8, power)) * BigInt(n);
    const registers = { a: sum, b: BigInt(0), c: BigInt(0) };
    const output = runProgram(program, registers);
    const reverseOutput = output.reverse();
    if (reverseOutput.join(",") === target.join(",")) {
      final.push(sum);
    } else {
      const startOutput = reverseOutput.slice(0, target.length - power);
      if (power > 0 && target.join(",").startsWith(startOutput.join(","))) {
        findA(sum, power - 1, program, target, final);
      }
    }
  }
};

export const computerProgramPart1 = (programInput: string, registerInput: string) => {
  const registers = getRegisters(registerInput);
  const program = getProgram(programInput);
  return runProgram(program, registers).join(",");
};

/**
 * The output length (n) is based on the value of A where n = log8(A).
 * To get an output of length n, the value of A must be at least 8^(n-1).
 * Start with power (p) = n - 1 and find any A that produces the last n - p values correctly.
 * A is calculated as A = A + 8^p * x where x is 0 to 7 to cover all 3 bit values.
 * Continue recusively, decreasing p by 1 until p = 0 at which point the correct value of A is found.
 */
export const computerProgramPart2 = (programInput: string, _registerInput: string) => {
  const program = getProgram(programInput);
  const final = [];
  findA(BigInt(0), program.length - 1, program, [...program].reverse(), final);
  return final.sort()[0]?.toString();
};
