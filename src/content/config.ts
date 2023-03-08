import { defineCollection, z } from "astro:content";

const jobCollection = defineCollection({
	schema: z.object({
		company: z.string(),
		position: z.string(),
		date: z.string(),
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

export const collections = {
	jobs: jobCollection,
	education: educationCollection,
};
