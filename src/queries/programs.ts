import { getCollection, type CollectionEntry } from "astro:content";
import { parseDate } from "chrono-node";

export interface Program extends CollectionEntry<"education"> {
    dates: string
}

const getEndTime = (program: CollectionEntry<"education">): number => {
    if ("graduation" in program.data) {
        return parseDate(program.data.graduation).getTime();
    } else if (program.data.end.toLowerCase() === "present") {
        return new Date().getTime()
    } else {
        return parseDate(program.data.end).getTime();
    }
}

const getDateString = (program: CollectionEntry<"education">): string => {
    if ("graduation" in program.data) {
        return `Graduating ${program.data.graduation}`
    } else {
        return `${program.data.start} – ${program.data.end}`
    }
}

export const getPrograms = async (): Promise<Program[]> =>
    (await getCollection("education"))
        .sort((a, b) => getEndTime(b) - getEndTime(a))
        .map((program) => ({
            ...program,
            dates: getDateString(program),
        }));
