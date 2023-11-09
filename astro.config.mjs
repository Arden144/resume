import { defineConfig } from "astro/config";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
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
  },
  integrations: [alpinejs()]
});