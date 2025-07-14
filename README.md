# Resume Builder

Build a professional resume easily using only markdown.

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
        └── skills/
            ├── frameworks.md
            └── languages.md
```

Resume builder looks for `.md` files in the `src/content/**` directories shown above. Each file is added as an entry to the resume.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command            | Action                                           |
| :----------------- | :----------------------------------------------- |
| `bun i`            | Installs dependencies                            |
| `bun dev`          | Starts local dev server at `localhost:4321`      |
| `bun build`        | Builds your resume preview to `./dist/`          |
| `bun preview`      | Hosts your resume website at `localhost:4321`    |
| `bun generate`     | Runs a production build and generates a PDF      |
| `bun astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `bun astro --help` | Get help using the Astro CLI                     |
