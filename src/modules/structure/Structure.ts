import {Structure as MetaStructure, KeyStructure} from "./interfaces";

export default class Structure<V = unknown> implements MetaStructure<V> {
    #func: string = `
        switch (key) {
            $returns$
            default:
                throw new Error('Key not defined')
        }
    `;

    constructor(keys: Array<KeyStructure>, values?: Array<V>) {
        if (!keys.length) {
            throw new Error('Keys is not defined');
        }
        if (Array.isArray(values) && values.length !== keys.length) {
            throw new Error('Keys is not assigned values');
        }
        let returns = '';
        keys.forEach((key, idx) => {
            returns += values?.length ? this.getStringToReturn(key, values[idx]) : this.getStringToReturn(key, null);
        })
        this.#func = this.#func.replaceAll(/\$returns\$/g, returns);
    }

    get(key: KeyStructure): V {
        return Function('key', this.#func)(key);
    }

    set(key: KeyStructure, value: V): void {
        const regexp = new RegExp(`case\\s${this.prepareKey(key)}:\\sreturn\\s(.+);`, 'g');
        if (!regexp.test(this.#func)) {
            throw new Error('Key is not defined');
        }
        this.#func = this.#func.replaceAll(regexp, this.getStringToReturn(key, value));
    }

    protected getStringToReturn(key: KeyStructure, value: V | null): string {
        return `case ${this.prepareKey(key)}: return ${this.prepareValue(value)};\n`;
    }

    protected prepareKey(key: KeyStructure): string {
        return typeof key === "string" ? `'${key}'` : `${key}`;
    }

    protected prepareValue(value: V | null) {
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