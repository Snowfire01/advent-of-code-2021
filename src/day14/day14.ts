import { solution as firstSolution } from "./puzzle_day14_01"
import { solution as secondSolution } from "./puzzle_day14_02"

export function printResult() {
   console.log("--- Day 14: ---");

   try {
      const firstSolutionResult = firstSolution();
      console.log("First solution:", firstSolutionResult);
   } catch(error) {
      console.log("First solution:", (error as Error).message)
   }

   try {
      const secondSolutionResult = secondSolution();
      console.log("Second solution:", secondSolutionResult);
   } catch(error) {
      console.log("Second solution:", (error as Error).message)
   }
}

export function getResult(): { firstSolution: string; secondSolution: string } {
   const retVal = {
      firstSolution: "",
      secondSolution: "",
   };

   try {
      retVal.firstSolution = firstSolution();
   } catch (error) {
      (retVal.firstSolution = "First solution:"), (error as Error).message;
   }

   try {
      retVal.secondSolution = secondSolution();
   } catch (error) {
      (retVal.secondSolution = "Second solution:"), (error as Error).message;
   }

   return retVal;
}