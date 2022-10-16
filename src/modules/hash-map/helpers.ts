export function checkSimple(n: number): boolean {
    const max = Math.sqrt(n);
    for (let i = 2; i <= max; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

export function stringToNumber(str: string, sizeBase: number = 10): number {
    let sum = 0;
    let i = 0;
    for (let char of str) {
        sum += sizeBase ** i * (char.codePointAt(0) ?? 1);
        i++;
    }
    return sum;
}