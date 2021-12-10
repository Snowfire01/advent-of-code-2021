import Submarine, { BingoBoard, BingoEngine } from "./submarine";
import InputParser from "../helpers/inputParser";

const inputParser = new InputParser(4);

const input = inputParser.getLines();
const drawnNumbers = input
   .splice(0, 1)[0]
   .split(",")
   .map((x) => +x);

const boards = input.reduce((acc: string[][], curr) => {
   if (curr.length === 0) {
      acc.push([]);
      return acc;
   } else {
      acc[acc.length - 1].push(curr);
      return acc;
   }
}, []);

export function solution(): string {
   const sub = new Submarine();
   let bingoBoards = boards.map((board) => new BingoBoard(board));

   sub.initBingoSubsystem((board) => {
      bingoBoards = bingoBoards.filter((b) => b !== board);
   });

   const bingoSubsystem = sub.bingoEngine as BingoEngine;

   bingoSubsystem.initializeBoards(bingoBoards);

   let draw = undefined;

   // while (drawnNumbers.length > 0) {
   while (bingoBoards.length > 1) {
      draw = drawnNumbers.shift();

      if (draw === undefined) throw Error("No more numbers to draw");

      bingoSubsystem.mark(draw);
   }

   const lastBoard = bingoBoards[0];

   while (!lastBoard.isBingo()) {
      draw = drawnNumbers.shift();
      const matches = lastBoard.findNumber(draw || 0);
      matches.forEach((match) => lastBoard.mark(match.row, match.col));
   }

   let flatNums = bingoBoards[0].board.flat();
   let flatMarked = bingoBoards[0].marked.flat();

   let markedNums = flatNums.filter((_, index) => !flatMarked[index]);
   let result = markedNums.reduce((a, b) => a + b) * (draw || 0);

   return result.toString();
}
