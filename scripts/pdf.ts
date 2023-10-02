import { build, preview, type AstroInlineConfig } from "astro";
import { write, fileURLToPath } from "bun";
import { launch, type Browser } from "puppeteer";

const generatePdf = async (browser: Browser, url: string): Promise<Buffer> => {
    const page = await browser.newPage();

    await page.goto(url);

    const pdf = await page.pdf({ format: "LETTER" });

    await page.close();

    return pdf;
};

const parseArgs = (arglist: string[]): [string[], Record<string, string | boolean>] => {
    const [args, kwargs, name] = arglist.reduce<[string[], Record<string, string | boolean>, string | undefined]>(([args, kwargs, name], arg) => {
        if (arg.startsWith("--")) {
            return [args, { ...kwargs, ...(name && { [name]: true }) }, arg.slice(2)];
        } else if (arg.startsWith("-")) {
            return [args, { ...kwargs, ...(name && { [name]: true }) }, arg.slice(1)];
        } else {
            if (name !== undefined) {
                return [args, { ...kwargs, [name]: arg }, undefined];
            } else {
                return [[...args, arg], kwargs, undefined];
            }
        }
    }, [[], {}, undefined]);
    return [args, { ...kwargs, ...(name && { [name]: true }) }];
}

const main = async () => {
    const [_args, kwargs] = parseArgs(process.argv.slice(2));
    const timestamp = typeof kwargs.timestamp === "string" ? new Date(kwargs.timestamp) : new Date();
    const year = timestamp.getFullYear().toString();
    const month = timestamp.getMonth().toString().padStart(2, "0");
    const date = timestamp.getDate().toString().padStart(2, "0");

    const baseDir = new URL('..', import.meta.url);

    const config = {
        root: fileURLToPath(baseDir),
        logLevel: "error",
        vite: {
            logLevel: "error"
        }
    } satisfies AstroInlineConfig;

    const browser = launch({ headless: "new" });

    await build(config);
    const server = await preview(config);

    const pdf = await generatePdf(await browser, `http://${server.host}:${server.port}`);

    const output = new URL(`./Arden-Sinclair-Resume-${year}-${month}-${date}.pdf`, baseDir);
    console.log(fileURLToPath(output));

    await Promise.all([
        write(output, pdf),
        server.stop(),
        (await browser).close()
    ]);
}

await main();
