"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const _1 = require(".");
const createBaseList = () => {
    const list = new _1.LinkedList();
    list.add(1);
    list.add(2);
    list.add(3);
    return list;
};
describe("LinkedList", function () {
    const list = createBaseList();
    it("Создание списка", function () {
        assert_1.default.strictEqual(new _1.LinkedList() instanceof _1.LinkedList, true);
    });
    it("Создание цепочки значений", function () {
        assert_1.default.strictEqual(list.first?.value === 1
            && list.last?.value === 3
            && list.first?.next?.value === 2
            && list.first?.next?.prev?.value === 1, true);
    });
    it("Поиск значения", function () {
        const find = list.find(2);
        assert_1.default.strictEqual(find !== null && find.value === 2, true);
    });
    it("Поиск значения в нестрогом режиме", function () {
        const find = list.find('2', false);
        assert_1.default.strictEqual(find !== null && find.value === 2, true);
    });
    it("Поиск несуществующего значения", function () {
        const find = list.find(200);
        assert_1.default.strictEqual(find === null, true);
    });
    it("Вставка значения перед", function () {
        const newItemF = list.first ? list.insertBefore(0.5, list.first) : null;
        const find = list.find(2);
        const newItem = find ? list.insertBefore(1.5, find) : null;
        const newItemL = list.last ? list.insertBefore(2.5, list.last) : null;
        assert_1.default.strictEqual(newItemF === list.first
            && newItem?.next === find
            && newItemL?.next === list.last, true);
    });
    it("Вставка значения после", function () {
        const newItemF = list.first ? list.insertAfter(0.75, list.first) : null;
        const find = list.find(2);
        const newItem = find ? list.insertAfter(2.25, find) : null;
        const newItemL = list.last ? list.insertAfter(3.5, list.last) : null;
        assert_1.default.strictEqual(newItemF?.prev === list.first
            && newItem?.prev === find
            && newItemL === list.last, true);
    });
    it("Удаление значения", function () {
        list.last ? list.insertAfter(500, list.last) : null;
        assert_1.default.strictEqual(list.delete(500), true);
    });
    it("Удаление значения по ссылке", function () {
        assert_1.default.strictEqual(list.delete(list.first), true);
    });
    it("Удаление несуществующего значения", function () {
        assert_1.default.strictEqual(list.delete(100), false);
    });
    it("Проверка списка на пустоту", function () {
        assert_1.default.strictEqual(list.isEmpty(), false);
        assert_1.default.strictEqual((new _1.LinkedList()).isEmpty(), true);
    });
});
