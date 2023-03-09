import { CollectionEntry, getCollection } from "astro:content";
import chrono from "chrono-node";

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

export interface Job {
	company: string;
	start: Date;
	end: Date;
	positions: CollectionEntry<"jobs">[];
}

export const getJobs = async (): Promise<Job[]> =>
	(await getCollection("jobs"))
		.groupBy(entry => entry.data.company)
		.map(([company, positions]) => ({
			company,
			positions,
			start: positions
				.map(p => chrono.parseDate(p.data.start))
				.sort()
				.reverse()[0],
			end: positions.map(p => chrono.parseDate(p.data.end)).sort()[0],
		}))
		.sort((a, b) => b.end.getTime() - a.end.getTime());
