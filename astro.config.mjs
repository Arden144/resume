import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    scopedStyleStrategy: "class",
    compressHTML: true,
    build: {
        inlineStylesheets: "auto"
    },
    vite: {
        build: {
            cssMinify: "lightningcss"
        },
        css: {
            transformer: "lightningcss"
        }
    },
    experimental: {
        assets: true,
        optimizeHoistedScript: true
    }
});
