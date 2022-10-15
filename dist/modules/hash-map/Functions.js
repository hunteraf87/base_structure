"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToNumber = exports.checkSimple = void 0;
function checkSimple(n) {
    const max = Math.sqrt(n);
    for (let i = 2; i <= max; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}
exports.checkSimple = checkSimple;
function stringToNumber(str, sizeBase = 27) {
    let sum = 0;
    let i = 0;
    for (let char of str) {
        sum += sizeBase ** i * (char.codePointAt(0) ?? 1);
        i++;
    }
    return sum;
}
exports.stringToNumber = stringToNumber;
