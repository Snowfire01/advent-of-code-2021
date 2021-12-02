import InputParser from "../helpers/inputParser";

const inputParser = new InputParser(1);

const input = inputParser.parseLines<number>();

export function solution() {
   let counter = 0;

   for (let i = 3; i < input.length; i++) {
      let window = [input[i - 2], input[i - 1], input[i]];
      let prevWindow = [input[i - 3], input[i - 2], input[i - 1]];
      let sum = window.reduce((a, b) => a + b);
      let prevSum = prevWindow.reduce((a, b) => a + b);

      if (sum > prevSum) {
         counter++;
      }
   }

   return counter;
}
