import InputParser from "../helpers/inputParser";
import Submarine, { DiagnosticReport } from "./submarine";

const inputParser = new InputParser(3);

const input = inputParser.getLines();

export async function solution(): Promise<string> {
   const sub = new Submarine();
   await sub.loadDiagnosticReport(input);

   const report = sub.diagnosticReport as DiagnosticReport;

   const o2 = report.DiagnosticRates.oxygenGenerationRating || 0;
   const co2 = report.DiagnosticRates.co2ScrubberRating || 0;

   return (o2 * co2).toString();
}
