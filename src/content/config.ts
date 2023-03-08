import { defineCollection, z } from "astro:content";

const jobCollection = defineCollection({
	schema: z.object({
		company: z.string(),
		position: z.string(),
		start: z.string(),
		end: z.string(),
		location: z.string(),
	}),
});

const educationCollection = defineCollection({
	schema: z.object({
		school: z.string(),
		program: z.string(),
		graduation: z.string(),
		location: z.string(),
	}),
});

const otherCollection = defineCollection({
	schema: z.object({
		name: z.string(),
		priority: z.number().optional(),
	}),
});

export const collections = {
	jobs: jobCollection,
	education: educationCollection,
	other: otherCollection,
};
