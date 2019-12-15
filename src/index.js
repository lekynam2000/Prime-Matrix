import React from "react"
import { render } from "react-dom"
import "./style.scss"
import { composition } from "./composition.js"
import { prime } from "./prime.js"
import Problem from "./Problem.js"
var position = [];
var problem = [];
var finalProblem = [];
for (let i = 0; i < 1380; i++) {
    position.push(i);
    problem.push(".");
}
var descending = (a, b) => {
    return b - a;
}
var sameRow = (a, b) => {
    return Math.floor(a / 46) == Math.floor(b / 46);
}
var sameCol = (a, b) => {
    return a % 46 == b % 46;
}
var toRightForm = (num) => (num).toLocaleString(undefined, { minimumIntegerDigits: 5, useGrouping: false });
var binarySearch = (arr, num, start, end) => {
    var mid = Math.floor((start + end) / 2);
    if (num != arr[mid] && start == end) {
        return false;
    }
    if (num == arr[mid]) {
        return true;
    }
    if (num > arr[mid]) {
        return binarySearch(arr, num, mid + 1, end);
    }
    if (num < arr[mid]) {
        return binarySearch(arr, num, start, mid);
    }
}
var select = (arr, num) => {
    var result = [];
    var index;
    while (result.length < num) {
        index = Math.floor(Math.random() * (arr.length - 1));
        if (!result.includes(arr[index])) {
            result.push(arr[index]);
        }
    }
    return result;
}
var PrimeTable = select(prime, 7).map((num) => toRightForm(num));
var CompoTable = select(composition, 1373).map((num) => toRightForm(num));
var PrimePosition = [];
var first = Math.floor(Math.random() * 1379);
var second = Math.floor(first - first % 46 + 45 * Math.random());
while (second == first) {
    second = Math.floor(first - first % 46 + 45 * Math.random());
}
var third = Math.floor(Math.random() * 1379);
while (sameRow(third, first) || sameCol(third, second) || sameCol(third, first)) {
    third = Math.floor(Math.random() * 1379);
}
var fourth = Math.floor(third - Math.floor(third / 46) * 46 + 46 * Math.floor(30 * Math.random()));
while (sameRow(fourth, first) || sameCol(fourth, second) || sameCol(fourth, first) || sameRow(fourth, third)) {
    fourth = Math.floor(third - Math.floor(third / 46) * 46 + 46 * Math.floor(30 * Math.random()));
}
PrimePosition.push(first);
PrimePosition.push(second);
PrimePosition.push(third);
PrimePosition.push(fourth);
while (PrimePosition.length < 7) {
    let temp = Math.floor(1379 * Math.random());
    let flag = true;
    for (let i = 0; i < PrimePosition.length; i++) {
        if (sameRow(temp, PrimePosition[i]) || sameCol(temp, PrimePosition[i])) {
            flag = false;
            break;
        }
    }
    if (flag) {
        PrimePosition.push(temp);
    }
}
PrimePosition.sort(descending);
for (let i = 0; i < 7; i++) {
    position.splice(PrimePosition[i], 1);
}
for (let i = 0; i < PrimePosition.length; i++) {
    problem[PrimePosition[i]] = PrimeTable[i];
}
for (let i = 0; i < position.length; i++) {
    problem[position[i]] = CompoTable[i];
}
while (problem.length) {
    finalProblem.push(problem.splice(0, 46));
}
// console.log(PrimePosition);
var row = Math.floor(first / 46);
var col = third % 46;
render( < Problem arr = { finalProblem }
        row = { row }
        col = { col }
        PrimeMatrix = { PrimePosition }
        result = { finalProblem[row][col] }
        />,document.querySelector(".root"));