"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var InputParser = /** @class */ (function () {
    function InputParser(day) {
        this.day = day;
    }
    InputParser.prototype.getLines = function () {
        return fs_1.default.readFileSync("./inputs/day".concat(this.day, ".txt"), "utf8").split("\r\n");
    };
    InputParser.prototype.parseLines = function () {
        return this.getLines().map(function (line) { return JSON.parse(line); });
    };
    InputParser.prototype.convertLines = function (converter) {
        return this.getLines().map(function (line) { return converter(line); });
    };
    return InputParser;
}());
exports.default = InputParser;
