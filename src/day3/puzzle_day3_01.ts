import InputParser from "../helpers/inputParser";

const inputParser = new InputParser(3);

const input = inputParser.getLines();

function inputReducer(accumulated: number[], current: string): number[] {
   for (let i = 0; i < current.length; i++) {
      const digit = current[i];
      accumulated[i] += +digit;
   }

   return accumulated;
}

function binaryReducer(accumulated: number, current: number, index: number, original: number[]): number {
   return accumulated + current * Math.pow(2, original.length - index - 1);
}

export function solution(): string {
   const reduced = input.reduce(inputReducer, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
   const gammaBinary = reduced.map((x) => (x >= input.length / 2 ? 1 : 0));
   const epsilonBinary = gammaBinary.map((x) => +!x);

   const gammaRate = gammaBinary.reduce(binaryReducer, 0);
   const epsilonRate = epsilonBinary.reduce(binaryReducer, 0);

   return (gammaRate * epsilonRate).toString();
}
