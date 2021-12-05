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

function digitSelector(current: number): 0 | 1 {
   return current >= input.length / 2 ? 1 : 0;
}

function inverseMapper(current: 0 | 1): 0 | 1 {
   return current === 0 ? 1 : 0;
}

function getDigitCount(digit: number): number {
   return input.reduce((accumulated: number, current: string) => accumulated + +input[digit], 0);
}

var oxygenCandidates = [...input];
var co2Candidates = [...input];
const zeros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export function solution(): string {
   let digit = 0;

   while ((oxygenCandidates.length > 1 || co2Candidates.length > 1) && digit < input.length) {
      let digitCount = getDigitCount(digit);
      let mostCommonDigit = digitSelector(digitCount);

      if (oxygenCandidates.length >= 1) {
         oxygenCandidates = oxygenCandidates.filter((current: string) => current[digit] === mostCommonDigit.toString());
      }

      if (co2Candidates.length >= 1) {
         co2Candidates = co2Candidates.filter((current: string) => current[digit] === inverseMapper(mostCommonDigit).toString());
      }

      digit++;
   }

   const oxygenResult = parseInt(oxygenCandidates[0], 2);
   const co2Result = parseInt(co2Candidates[0]);

   const result = oxygenResult * co2Result;

   return result.toString();
}
