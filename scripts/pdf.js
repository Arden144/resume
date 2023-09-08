// @ts-check

import { build, preview } from "astro";
import { fileURLToPath } from "node:url";
import { launch } from "puppeteer";
import { writeFile } from "node:fs/promises";

/**
 * 
 * @param {import("puppeteer").Browser} browser 
 * @param {string} url
 * @returns {Promise<Buffer>}
 */
const generatePdf = async (browser, url) => {
    const page = await browser.newPage();

    await page.goto(url);

    const pdf = await page.pdf({ format: "LETTER" });

    await page.close();

    return pdf;
};

const main = async () => {
    const baseDir = new URL('..', import.meta.url);

    /** @satisfies {import("astro").AstroInlineConfig} */
    const config = {
        root: fileURLToPath(baseDir)
    };

    const browser = launch({ headless: "new" });

    await build(config);
    const server = await preview(config);

    const pdf = await generatePdf(await browser, `http://${server.host}:${server.port}`);

    await Promise.all([
        writeFile(new URL("./resume.pdf", baseDir), pdf),
        server.stop(),
        (await browser).close()
    ]);
}

await main();
