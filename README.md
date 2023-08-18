# Resume Builder

## 🚀 Customization

```
/
└── src/
    └── content/
        ├── education/
        │   └── ubc.md
        ├── jobs/
        │   └── mcdonalds.md
        ├── projects/
        └── other/
            ├── skills.md
            └── interests.md
```

Resume builder looks for `.md` files in the `src/content/**` directories shown above. Each file is added as an entry to the resume.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `pnpm install`      | Installs dependencies                            |
| `pnpm dev`          | Starts local dev server at `localhost:3000`      |
| `pnpm build`        | Build your production site to `./dist/`          |
| `pnpm preview`      | Preview your build locally, before deploying     |
| `pnpm astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro --help` | Get help using the Astro CLI                     |
