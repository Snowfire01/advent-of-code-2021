"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solution = void 0;
var inputParser_1 = __importDefault(require("../helpers/inputParser"));
var inputParser = new inputParser_1.default(1);
var input = inputParser.parseLines();
function solution() {
    var counter = 0;
    for (var i = 3; i < input.length; i++) {
        var window_1 = [input[i - 2], input[i - 1], input[i]];
        var prevWindow = [input[i - 3], input[i - 2], input[i - 1]];
        var sum = window_1.reduce(function (a, b) { return a + b; });
        var prevSum = prevWindow.reduce(function (a, b) { return a + b; });
        if (sum > prevSum) {
            counter++;
        }
    }
    return counter;
}
exports.solution = solution;
