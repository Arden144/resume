import { getCollection, type CollectionEntry } from "astro:content";
import { parseDate } from "chrono-node";

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
                .map(p => parseDate(p.data.start))
                .filter((date): date is Date => date !== null)
                .sort((a, b) => b.getTime() - a.getTime())
                .reverse()[0],
            end: positions
                .map(p => parseDate(p.data.end))
                .filter((date): date is Date => date !== null)
                .sort((a, b) => b.getTime() - a.getTime())[0],
        }))
        .sort((a, b) => b.end.getTime() - a.end.getTime());
