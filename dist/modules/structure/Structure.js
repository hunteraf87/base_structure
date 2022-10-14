"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Structure_func;
Object.defineProperty(exports, "__esModule", { value: true });
class Structure {
    constructor(keys, values) {
        _Structure_func.set(this, `
        switch (key) {
            $returns$
            default:
                throw new Error('Key not defined')
        }
    `);
        if (!keys.length) {
            throw new Error('Keys is not defined');
        }
        if (Array.isArray(values) && values.length !== keys.length) {
            throw new Error('Keys is not assigned values');
        }
        let returns = '';
        keys.forEach((key, idx) => {
            returns += values?.length ? this.getStringToReturn(key, values[idx]) : this.getStringToReturn(key, null);
        });
        __classPrivateFieldSet(this, _Structure_func, __classPrivateFieldGet(this, _Structure_func, "f").replaceAll(/\$returns\$/g, returns), "f");
    }
    get(key) {
        return Function('key', __classPrivateFieldGet(this, _Structure_func, "f"))(key);
    }
    set(key, value) {
        const regexp = new RegExp(`case\\s${this.prepareKey(key)}:\\sreturn\\s(.+);`, 'g');
        if (!regexp.test(__classPrivateFieldGet(this, _Structure_func, "f"))) {
            throw new Error('Key is not defined');
        }
        __classPrivateFieldSet(this, _Structure_func, __classPrivateFieldGet(this, _Structure_func, "f").replaceAll(regexp, this.getStringToReturn(key, value)), "f");
    }
    getStringToReturn(key, value) {
        return `case ${this.prepareKey(key)}: return ${this.prepareValue(value)};\n`;
    }
    prepareKey(key) {
        return typeof key === "string" ? `'${key}'` : `${key}`;
    }
    prepareValue(value) {
        if (value === null) {
            return null;
        }
        switch (typeof value) {
            case 'string':
                return `'${value}'`;
            case 'object':
                return JSON.stringify(value);
            default:
                return value;
        }
    }
}
exports.default = Structure;
_Structure_func = new WeakMap();
