"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const _1 = require(".");
const createMap = () => {
    const map = new _1.HashMap(3);
    map.set('name', 'Albert');
    map.set('age', 35);
    map.set('skills', ['JS', 'PHP']);
    return map;
};
describe("HashMap", function () {
    it("Создание", function () {
        assert_1.default.strictEqual(new _1.HashMap() instanceof _1.HashMap, true);
        assert_1.default.strictEqual(new _1.HashMap(13) instanceof _1.HashMap, true);
        assert_1.default.throws(() => new _1.HashMap(12), Error);
    });
    it("Установка и получение занчения", function () {
        const map = createMap();
        assert_1.default.strictEqual(map.get('name'), 'Albert');
        assert_1.default.strictEqual(map.get('age'), 35);
        assert_1.default.deepEqual(map.get('skills'), ['JS', 'PHP']);
    });
    it("Установка и получение занчения (ошибка)", function () {
        const map = new _1.HashMap();
        map.set('name', 'Albert');
        assert_1.default.throws(() => map.set('name>', 'Albert'), Error);
        assert_1.default.throws(() => map.get('name>'), Error);
        assert_1.default.throws(() => map.get('nametest'), Error);
    });
    it("Рехеширование", function () {
        const map = new _1.HashMap(3);
        map.set('name', 'Albert');
        map.set('age', 35);
        map.set('age1', 35);
        map.set('age2', 35);
        map.set('age3', 35);
        map.set('age4', 35);
        map.set('age5', 35);
        assert_1.default.strictEqual(map.capacity, 7);
        assert_1.default.strictEqual(map.get('age'), 35);
        assert_1.default.strictEqual(map.get('name'), 'Albert');
    });
    it("Итераторы", function () {
        const map = createMap();
        const keys = [...map.keys()].sort();
        const values = [...map.values()].sort();
        const needKeys = ['name', 'age', 'skills'].sort();
        const needValues = ['Albert', 35, ['JS', 'PHP']].sort();
        assert_1.default.deepEqual(keys, needKeys);
        assert_1.default.deepEqual(values, needValues);
    });
    it("Удаление", function () {
        const map = createMap();
        map.delete('age');
        assert_1.default.throws(() => map.get('age'), Error);
    });
});
