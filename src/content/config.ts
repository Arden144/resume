import { defineCollection, z } from "astro:content";

const jobs = defineCollection({
    schema: z.object({
        company: z.string(),
        position: z.string(),
        start: z.string(),
        end: z.string(),
        location: z.string(),
    }),
});

const education = defineCollection({
    schema: z.union([
        z.object({
            school: z.string(),
            program: z.string(),
            graduation: z.string(),
            location: z.string(),
        }),
        z.object({
            school: z.string(),
            program: z.string(),
            start: z.string(),
            end: z.string(),
            location: z.string()
        })
    ]),
});

const projects = defineCollection({
    schema: z.object({
        name: z.string(),
        languages: z.string(),
        link: z.string().url().transform(url => new URL(url)).optional(),
        priority: z.number().optional(),
    }),
});

const skills = defineCollection({
    schema: z.object({
        category: z.string()
    })
})

export const collections = {
    jobs,
    education,
    projects,
    skills,
};
