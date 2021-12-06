import fs from "fs";

export default class InputParser {
   public day: number;

   constructor(day: number) {
      this.day = day;
   }

   public getLines(): string[] {
      return fs.readFileSync(`./inputs/day${this.day}.txt`, "utf8").split("\r\n");
   }

   public parseLines<T>(): T[] {
      return this.getLines().map((line) => JSON.parse(line));
   }

   public convertLines<T>(converter: (line: string, index: number) => T): T[] {
      return this.getLines().map(converter);
   }
}
