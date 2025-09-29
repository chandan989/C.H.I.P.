// tools/page_content_extractor.js
const puppeteer = require('puppeteer');

(async () => {
    const url = process.argv[2];
    if (!url) {
        console.error(JSON.stringify({ error: "Please provide a URL to extract content from." }));
        process.exit(1);
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        const textContent = await page.evaluate(() => document.body.innerText);
        // We output the raw text directly. The AI will handle parsing.
        console.log(textContent);
    } catch (error) {
        console.error(JSON.stringify({ error: `Failed to extract content from URL: ${error.message}` }));
    } finally {
        await browser.close();
    }
})();