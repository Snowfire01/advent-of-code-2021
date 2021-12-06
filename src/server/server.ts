import express from "express";

import { getResult as getSolution1 } from "../day1/day1";
import { getResult as getSolution2 } from "../day2/day2";
import { getResult as getSolution3 } from "../day3/day3";
import { getResult as getSolution4 } from "../day4/day4";
import { getResult as getSolution5 } from "../day5/day5";
import { getResult as getSolution6 } from "../day6/day6";
import { getResult as getSolution7 } from "../day7/day7";
import { getResult as getSolution8 } from "../day8/day8";
import { getResult as getSolution9 } from "../day9/day9";
import { getResult as getSolution10 } from "../day10/day10";
import { getResult as getSolution11 } from "../day11/day11";
import { getResult as getSolution12 } from "../day12/day12";
import { getResult as getSolution13 } from "../day13/day13";
import { getResult as getSolution14 } from "../day14/day14";
import { getResult as getSolution15 } from "../day15/day15";
import { getResult as getSolution16 } from "../day16/day16";
import { getResult as getSolution17 } from "../day17/day17";
import { getResult as getSolution18 } from "../day18/day18";
import { getResult as getSolution19 } from "../day19/day19";
import { getResult as getSolution20 } from "../day20/day20";
import { getResult as getSolution21 } from "../day21/day21";
import { getResult as getSolution22 } from "../day22/day22";
import { getResult as getSolution23 } from "../day23/day23";
import { getResult as getSolution24 } from "../day24/day24";
import { getResult as getSolution25 } from "../day25/day25";

const app = express();
const port = process.env.PORT || 3000;

const solutions: (
   | { firstSolution: number; secondSolution: number }
   | { firstSolution: string; secondSolution: string }
   | Promise<{ firstSolution: string; secondSolution: string }>
)[] = [
   getSolution1(),
   getSolution2(),
   getSolution3(),
   getSolution4(),
   getSolution5(),
   getSolution6(),
   getSolution7(),
   getSolution8(),
   getSolution9(),
   getSolution10(),
   getSolution11(),
   getSolution12(),
   getSolution13(),
   getSolution14(),
   getSolution15(),
   getSolution16(),
   getSolution17(),
   getSolution18(),
   getSolution19(),
   getSolution20(),
   getSolution21(),
   getSolution22(),
   getSolution23(),
   getSolution24(),
   getSolution25(),
];

var results: { firstSolution: number | string; secondSolution: number | string }[] | undefined = undefined;

async function getSolutions() {
   const results = await Promise.all(solutions);
   return results;
}

app.get("/:day/:puzzle", async (req, res) => {
   console.log("Get solutions for day " + req.params.day + " and puzzle " + req.params.puzzle);
   const day = +req.params.day;
   const puzzle = +req.params.puzzle;

   if (Date.now() < new Date(`12/${day}/2021 06:00`).getTime()) {
      res.send(`Puzzle for day ${day} is not even available!`);
      return;
   }

   if (day < 1 || day > 25) {
      res.send(`Day ${day} is no advent day!`);
      return;
   }

   if (puzzle < 1 || puzzle > 2) {
      res.send(`There are only 2 puzzles per day!`);
      return;
   }

   if (!results) results = await getSolutions();

   const retVal = results[day - 1][puzzle === 1 ? "firstSolution" : "secondSolution"];

   res.json(retVal);
});

app.get("/:day", async (req, res) => {
   console.log("Get solutions for day " + req.params.day);

   const day = +req.params.day;

   if (Date.now() < new Date(`12/${day}/2021 06:00`).getTime()) {
      res.send(`Puzzle for day ${day} is not even available!`);
      return;
   }

   if (day < 1 || day > 25) {
      res.send(`Day ${day} is no advent day!`);
      return;
   }

   if (!results) results = await getSolutions();

   const retVal = results[day - 1];

   res.json(retVal);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
