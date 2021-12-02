"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var day1_1 = require("../day1/day1");
var day2_1 = require("../day2/day2");
var day3_1 = require("../day3/day3");
var day4_1 = require("../day4/day4");
var day5_1 = require("../day5/day5");
var day6_1 = require("../day6/day6");
var day7_1 = require("../day7/day7");
var day8_1 = require("../day8/day8");
var day9_1 = require("../day9/day9");
var day10_1 = require("../day10/day10");
var day11_1 = require("../day11/day11");
var day12_1 = require("../day12/day12");
var day13_1 = require("../day13/day13");
var day14_1 = require("../day14/day14");
var day15_1 = require("../day15/day15");
var day16_1 = require("../day16/day16");
var day17_1 = require("../day17/day17");
var day18_1 = require("../day18/day18");
var day19_1 = require("../day19/day19");
var day20_1 = require("../day20/day20");
var day21_1 = require("../day21/day21");
var day22_1 = require("../day22/day22");
var day23_1 = require("../day23/day23");
var day24_1 = require("../day24/day24");
var day25_1 = require("../day25/day25");
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
var solutions = [
    (0, day1_1.getResult)(),
    (0, day2_1.getResult)(),
    (0, day3_1.getResult)(),
    (0, day4_1.getResult)(),
    (0, day5_1.getResult)(),
    (0, day6_1.getResult)(),
    (0, day7_1.getResult)(),
    (0, day8_1.getResult)(),
    (0, day9_1.getResult)(),
    (0, day10_1.getResult)(),
    (0, day11_1.getResult)(),
    (0, day12_1.getResult)(),
    (0, day13_1.getResult)(),
    (0, day14_1.getResult)(),
    (0, day15_1.getResult)(),
    (0, day16_1.getResult)(),
    (0, day17_1.getResult)(),
    (0, day18_1.getResult)(),
    (0, day19_1.getResult)(),
    (0, day20_1.getResult)(),
    (0, day21_1.getResult)(),
    (0, day22_1.getResult)(),
    (0, day23_1.getResult)(),
    (0, day24_1.getResult)(),
    (0, day25_1.getResult)(),
];
app.get("/:day/:puzzle", function (req, res) {
    var day = +req.params.day;
    var puzzle = +req.params.puzzle;
    if (Date.now() < new Date("12/".concat(day, "/2021 06:00")).getTime()) {
        res.send("Puzzle for day ".concat(day, " is not even available!"));
        return;
    }
    if (day < 1 || day > 25) {
        res.send("Day ".concat(day, " is no advent day!"));
        return;
    }
    if (puzzle < 1 || puzzle > 2) {
        res.send("There are only 2 puzzles per day!");
        return;
    }
    var retVal = solutions[day - 1][puzzle === 1 ? "firstSolution" : "secondSolution"];
    res.json(retVal);
});
app.get("/:day", function (req, res) {
    var day = +req.params.day;
    if (Date.now() < new Date("12/".concat(day, "/2021 06:00")).getTime()) {
        res.send("Puzzle for day ".concat(day, " is not even available!"));
        return;
    }
    if (day < 1 || day > 25) {
        res.send("Day ".concat(day, " is no advent day!"));
        return;
    }
    var retVal = solutions[day - 1];
    res.json(retVal);
});
app.listen(port, function () { return console.log("Server listening on port ".concat(port, "!")); });
