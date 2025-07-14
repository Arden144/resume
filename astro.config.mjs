import { defineConfig } from "astro/config";

import alpinejs from "@astrojs/alpinejs";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    build: {
        inlineStylesheets: "always",
    },
    vite: {
        build: {
            cssMinify: "lightningcss",
        },
        css: {
            transformer: "lightningcss",
            lightningcss: {
                drafts: {
                    nesting: true,
                },
            },
        },
    },
    experimental: {
        directRenderScript: true,
    },
    integrations: [icon(), alpinejs()],
});
