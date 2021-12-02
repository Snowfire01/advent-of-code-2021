"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResult = exports.printResult = void 0;
var puzzle_day8_01_1 = require("./puzzle_day8_01");
var puzzle_day8_02_1 = require("./puzzle_day8_02");
function printResult() {
    console.log("--- Day 8: ---");
    try {
        var firstSolutionResult = (0, puzzle_day8_01_1.solution)();
        console.log("First solution:", firstSolutionResult);
    }
    catch (error) {
        console.log("First solution:", error.message);
    }
    try {
        var secondSolutionResult = (0, puzzle_day8_02_1.solution)();
        console.log("Second solution:", secondSolutionResult);
    }
    catch (error) {
        console.log("Second solution:", error.message);
    }
}
exports.printResult = printResult;
function getResult() {
    var retVal = {
        firstSolution: "",
        secondSolution: "",
    };
    try {
        retVal.firstSolution = (0, puzzle_day8_01_1.solution)();
    }
    catch (error) {
        (retVal.firstSolution = "First solution:"), error.message;
    }
    try {
        retVal.secondSolution = (0, puzzle_day8_02_1.solution)();
    }
    catch (error) {
        (retVal.secondSolution = "Second solution:"), error.message;
    }
    return retVal;
}
exports.getResult = getResult;
