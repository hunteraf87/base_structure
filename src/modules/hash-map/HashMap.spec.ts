import assert from "assert";
import { HashMap } from '.';

const createMap = () => {
    const map = new HashMap(3);
    map.set('name', 'Albert');
    map.set('age', 35);
    map.set('skills', ['JS', 'PHP']);
    return map;
}

describe("HashMap", function () {
    it("Создание", function () {
        assert.strictEqual(new HashMap() instanceof HashMap, true);
        assert.strictEqual(new HashMap(13) instanceof HashMap, true);
        assert.throws(() => new HashMap(12), Error);
    });
    it("Установка и получение занчения", function () {
        const map = createMap();
        assert.strictEqual(map.get('name'), 'Albert');
        assert.strictEqual(map.get('age'), 35);
        assert.deepEqual(map.get('skills'), ['JS', 'PHP']);
    });
    it("Установка и получение занчения (ошибка)", function () {
        const map = new HashMap();
        map.set('name', 'Albert');
        assert.throws(() => map.set('name>', 'Albert'), Error);
        assert.throws(() => map.get('name>'), Error);
        assert.throws(() => map.get('nametest'), Error);
    });
    it("Рехеширование", function () {
        const map = new HashMap(3);
        map.set('name', 'Albert');
        map.set('age', 35);
        map.set('age1', 35);
        map.set('age2', 35);
        map.set('age3', 35);
        map.set('age4', 35);
        map.set('age5', 35);
        assert.strictEqual(map.capacity, 7);
        assert.strictEqual(map.get('age'), 35);
        assert.strictEqual(map.get('name'), 'Albert');
    });
    it("Итераторы", function () {
        const map = createMap();
        const keys = [...map.keys()].sort();
        const values = [...map.values()].sort();
        const needKeys = ['name', 'age', 'skills'].sort();
        const needValues = ['Albert', 35, ['JS', 'PHP']].sort();
        assert.deepEqual(keys, needKeys);
        assert.deepEqual(values, needValues);
    });
    it("Удаление", function () {
        const map = createMap();
        map.delete('age');
        assert.throws(() => map.get('age'), Error);
    });
})