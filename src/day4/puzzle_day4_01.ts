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
   let winningBoard: BingoBoard | undefined;

   sub.initBingoSubsystem((board) => {
      winningBoard = board;
   });

   const bingoSubsystem = sub.bingoEngine as BingoEngine;

   bingoSubsystem.initializeBoards(boards.map((x) => new BingoBoard(x)));

   let draw = undefined;

   while (!winningBoard) {
      draw = drawnNumbers.shift();

      if (draw === undefined) throw Error("No more numbers to draw");

      bingoSubsystem.mark(draw);
   }

   let flatNums = winningBoard.board.flat();
   let flatMarked = winningBoard.marked.flat();

   let markedNums = flatNums.filter((_, index) => !flatMarked[index]);
   let result = markedNums.reduce((a, b) => a + b) * (draw || 0);

   return result.toString();
}
