import { solution as firstSolution } from "./puzzle_day1_01";
import { solution as secondSolution } from "./puzzle_day1_02";

export function printResult() {
   console.log("--- Day 1: ---");

   try {
      const firstSolutionResult = firstSolution();
      console.log("First solution:", firstSolutionResult);
   } catch (error) {
      console.log("First solution:", (error as Error).message);
   }

   try {
      const secondSolutionResult = secondSolution();
      console.log("Second solution:", secondSolutionResult);
   } catch (error) {
      console.log("Second solution:", (error as Error).message);
   }
}

export function getResult() {
   return {
      firstSolution: firstSolution(),
      secondSolution: secondSolution(),
   };
}
