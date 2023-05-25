import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    scopedStyleStrategy: "class",
    compressHTML: true,
    experimental: {
        inlineStylesheets: "auto",
    },
});
