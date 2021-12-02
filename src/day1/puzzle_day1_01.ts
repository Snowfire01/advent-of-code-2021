import InputParser from "../helpers/inputParser";

const inputParser = new InputParser(1);

const input = inputParser.parseLines<number>();

export function solution(): number {
   let counter = 0;

   for (let i = 1; i < input.length; i++) {
      if (input[i] >= input[i - 1]) {
         counter++;
      }
   }

   return counter;
}
