export default class Submarine {
   public horizontal: number = 0;
   public depth: number = 0;
   public aim: number = 0;

   public diagnosticReport: DiagnosticReport | undefined;
   public bingoEngine: BingoEngine | undefined;

   public move(direction: "forward" | "up" | "down", distance: number) {
      if (direction === "forward") {
         this.horizontal += distance;
         this.depth += this.aim * distance;
      } else if (direction === "up") {
         this.aim -= distance;
      } else if (direction === "down") {
         this.aim += distance;
      }
   }

   public async loadDiagnosticReport(input: string[]) {
      this.diagnosticReport = new DiagnosticReport(input);
      await this.diagnosticReport.calculateDiagnosticRates();
   }

   public initBingoSubsystem(bingoCallback: (board: BingoBoard) => void) {
      this.bingoEngine = new BingoEngine(bingoCallback);
   }
}

export class BingoEngine {
   public boards: BingoBoard[] = [];
   private onBingo: (board: BingoBoard) => void;

   constructor(onBingo: (board: BingoBoard) => void) {
      this.onBingo = onBingo;
   }

   public initializeBoards(boards: BingoBoard[]) {
      this.boards = boards;
   }

   public mark(num: number) {
      this.boards.forEach((board, index) => {
         const hits = board.findNumber(num);

         for (const hit of hits) {
            board.mark(hit.row, hit.col);
         }

         if (board.isBingo()) {
            this.onBingo(board);
         }
      });
   }
}

export class BingoBoard {
   public board: number[][] = [];
   public marked: boolean[][] = [];

   constructor(rows: string[]) {
      this.board = rows.map((row) =>
         row
            .split(" ")
            .filter((x) => x !== "")
            .map((cell) => parseInt(cell))
      );
      this.marked = this.board.map((row) => row.map(() => false));
   }

   public print() {
      console.log(this.board);
      console.log(this.marked);
   }

   public isBingo(): boolean {
      return (
         this.marked.some((row) => row.every((marked) => marked)) ||
         [0, 1, 2, 3, 4].map((colIndex) => this.marked.map((row) => row[colIndex])).some((x) => x.every((marked) => marked))
         //    ||
         // (this.marked[0][0] && this.marked[1][1] && this.marked[2][2] && this.marked[3][3] && this.marked[4][4]) ||
         // (this.marked[0][4] && this.marked[1][3] && this.marked[2][2] && this.marked[3][1] && this.marked[4][0])
      );
   }

   public findNumber(number: number): { row: number; col: number }[] {
      let retVal = [];

      for (let row = 0; row < this.board.length; row++) {
         for (let col = 0; col < this.board[row].length; col++) {
            if (this.board[row][col] === number) {
               retVal.push({ row, col });
            }
         }
      }

      return retVal;
   }

   public mark(row: number, column: number) {
      this.marked[row][column] = true;
   }
}

class Diagnostic {
   public text: string;
   public num: number;
   public binDigits: number[];

   constructor(input: string | number | (0 | 1)[]) {
      if (typeof input === "string") {
         this.text = input;
         this.num = parseInt(input, 2);
         this.binDigits = input.split("").map((x) => +x);
      } else if (typeof input === "number") {
         this.text = input.toString();
         this.num = input;
         this.binDigits = input
            .toString(2)
            .split("")
            .map((x) => +x);
      } else {
         this.text = input.join("");
         this.num = +input.join("");
         this.binDigits = input;
      }
   }
}

export class DiagnosticReport {
   public lines: string[];
   public diagnostics: Diagnostic[];
   public lineLength: number;

   private gammaRate: number | undefined;
   private epsilonRate: number | undefined;
   private o2GenRating: number | undefined;
   private co2ScrubRating: number | undefined;

   constructor(input: string[]) {
      this.lines = [...input];
      this.diagnostics = this.lines.map((line) => new Diagnostic(line));
      this.lineLength = input[0].length;
   }

   public get DiagnosticRates() {
      return {
         gammaRate: this.gammaRate,
         epsilonRate: this.epsilonRate,
         oxygenGenerationRating: this.o2GenRating,
         co2ScrubberRating: this.co2ScrubRating,
      };
   }

   public async calculateDiagnosticRates() {
      await this.calcGammaEpsilon();
      await this.calcOxygenCo2();
   }

   private async calcOxygenCo2(): Promise<void> {
      let oxygenCandidates: Diagnostic[] = [...this.diagnostics];
      let co2Candidates: Diagnostic[] = [...this.diagnostics];

      function recursiveCalc(candidates: Diagnostic[], digitIndex: number, tieBreaker: (x: number) => 1 | 0): Diagnostic[] {
         if (candidates.length === 1 || digitIndex > 11) {
            return candidates;
         } else {
            let digitSum = candidates.reduce((acc, diagnostic) => acc + diagnostic.binDigits[digitIndex], 0);
            let digitAverage = digitSum / candidates.length;

            digitAverage = tieBreaker(digitAverage);

            let digitCandidates = candidates.filter((candidate) => candidate.binDigits[digitIndex] === digitAverage);

            return recursiveCalc(digitCandidates, digitIndex + 1, tieBreaker);
         }
      }

      oxygenCandidates = recursiveCalc(oxygenCandidates, 0, (digitAverage) => (digitAverage >= 0.5 ? 1 : 0));
      co2Candidates = recursiveCalc(co2Candidates, 0, (digitAverage) => (digitAverage >= 0.5 ? 0 : 1));

      this.o2GenRating = oxygenCandidates[0].num;
      this.co2ScrubRating = co2Candidates[0].num;
   }

   private async calcGammaEpsilon(): Promise<void> {
      let digitCounts = new Array(this.lineLength).fill(0);

      digitCounts = this.diagnostics.reduce((acc, diagnostic) => {
         diagnostic.binDigits.forEach((digit, index) => {
            acc[index] += digit;
         });
         return acc;
      }, digitCounts);

      const mostCommonBits = digitCounts.map((x) => (x / this.diagnostics.length >= 0.5 ? 1 : 0));

      this.gammaRate = parseInt(mostCommonBits.join(""), 2);
      this.epsilonRate = parseInt(mostCommonBits.map((x) => (x === 1 ? 0 : 1)).join(""), 2);
   }
}
