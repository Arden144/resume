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

const main = async () => {
    const baseDir = new URL('..', import.meta.url);

    const config = {
        root: fileURLToPath(baseDir)
    } satisfies AstroInlineConfig;

    const browser = launch({ headless: "new" });

    await build(config);
    const server = await preview(config);

    const pdf = await generatePdf(await browser, `http://${server.host}:${server.port}`);

    await Promise.all([
        write(new URL("./resume.pdf", baseDir), pdf),
        server.stop(),
        (await browser).close()
    ]);
}

await main();
