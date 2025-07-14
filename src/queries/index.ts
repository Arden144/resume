declare global {
    interface Array<T> {
        groupBy<K>(selector: (value: T) => K): [K, T[]][];
    }
}

Array.prototype.groupBy = function <T, K>(this: T[], selector: (value: T) => K): [K, T[]][] {
    const groups = new Map<K, T[]>();
    this.forEach(entry => {
        const key = selector(entry);
        const group = groups.get(key);
        group ? group.push(entry) : groups.set(key, [entry]);
    });
    return [...groups.entries()];
};

export * from "./jobs";
export * from "./programs";
