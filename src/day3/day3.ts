import { solution as firstSolution } from "./puzzle_day3_01";
import { solution as secondSolution } from "./puzzle_day3_02";

export async function printResult() {
   console.log("--- Day 3: ---");

   try {
      const firstSolutionResult = firstSolution();
      console.log("First solution:", firstSolutionResult);
   } catch (error) {
      console.log("First solution:", (error as Error).message);
   }

   try {
      const secondSolutionResult = await secondSolution();
      console.log("Second solution:", secondSolutionResult);
   } catch (error) {
      console.log("Second solution:", (error as Error).message);
   }
}

export async function getResult(): Promise<{ firstSolution: string; secondSolution: string }> {
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
      retVal.secondSolution = await secondSolution();
   } catch (error) {
      (retVal.secondSolution = "Second solution:"), (error as Error).message;
   }

   return retVal;
}
