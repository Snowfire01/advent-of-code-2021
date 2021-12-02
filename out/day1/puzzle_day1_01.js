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
    for (var i = 1; i < input.length; i++) {
        if (input[i] >= input[i - 1]) {
            counter++;
        }
    }
    return counter;
}
exports.solution = solution;
