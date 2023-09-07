import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    compressHTML: true,
    build: {
        inlineStylesheets: "auto",
    },
    vite: {
        build: {
            cssMinify: "lightningcss"
        },
        css: {
            transformer: "lightningcss",
            lightningcss: {
                drafts: {
                    nesting: true
                }
            }
        }
    },
    experimental: {
        optimizeHoistedScript: true,
    }
});
