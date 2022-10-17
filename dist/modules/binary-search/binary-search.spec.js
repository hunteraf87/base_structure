"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const _1 = require(".");
describe("binarySearch", function () {
    it("Поиск элементов", function () {
        const arr = [13, 17, 23, 31, 40, 41, 46, 54, 56, 76];
        assert_1.default.strictEqual((0, _1.binarySearch)(13, arr), 0);
        assert_1.default.strictEqual((0, _1.binarySearch)(23, arr), 2);
        assert_1.default.strictEqual((0, _1.binarySearch)(40, arr), 4);
        assert_1.default.strictEqual((0, _1.binarySearch)(54, arr), 7);
        assert_1.default.strictEqual((0, _1.binarySearch)(76, arr), 9);
        assert_1.default.strictEqual((0, _1.binarySearch)(100, arr), -1);
    });
});
