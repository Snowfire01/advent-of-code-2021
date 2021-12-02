import InputParser from "../helpers/inputParser";

const inputParser = new InputParser(2);

const input = inputParser.getLines();

class Submarine {
   public horizontal: number = 0;
   public depth: number = 0;

   public move(direction: "forward" | "up" | "down", distance: number) {
      if (direction === "forward") {
         this.horizontal += distance;
      } else if (direction === "up") {
         this.depth -= distance;
      } else if (direction === "down") {
         this.depth += distance;
      }
   }
}

export function solution(): string {
   const submarine = new Submarine();

   for (const line of input) {
      let splits = line.split(" ");
      let direction = splits[0];
      let distance = parseInt(splits[1]);

      if (direction !== "up" && direction !== "down" && direction !== "forward") {
         throw new Error(`Invalid direction: ${direction}`);
      }

      submarine.move(direction, distance);
   }

   return (submarine.horizontal * submarine.depth).toString();
}
