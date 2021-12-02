"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResult = exports.printResult = void 0;
var puzzle_day1_01_1 = require("./puzzle_day1_01");
var puzzle_day1_02_1 = require("./puzzle_day1_02");
function printResult() {
    console.log("--- Day 1: ---");
    try {
        var firstSolutionResult = (0, puzzle_day1_01_1.solution)();
        console.log("First solution:", firstSolutionResult);
    }
    catch (error) {
        console.log("First solution:", error.message);
    }
    try {
        var secondSolutionResult = (0, puzzle_day1_02_1.solution)();
        console.log("Second solution:", secondSolutionResult);
    }
    catch (error) {
        console.log("Second solution:", error.message);
    }
}
exports.printResult = printResult;
function getResult() {
    return {
        firstSolution: (0, puzzle_day1_01_1.solution)(),
        secondSolution: (0, puzzle_day1_02_1.solution)(),
    };
}
exports.getResult = getResult;
