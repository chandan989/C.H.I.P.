// tools/google_searcher.js
const puppeteer = require('puppeteer');

(async () => {
    const query = process.argv[2];
    if (!query) {
        console.error(JSON.stringify({ error: "Please provide a search query." }));
        process.exit(1);
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`, { waitUntil: 'networkidle2' });
        // This selector targets the main links in Google's search results.
        const urls = await page.$$eval('div.g a', (links) =>
            links.map((a) => a.href).filter((href) => href.startsWith('http'))
        );
        // Filter out non-relevant Google links and duplicates, then take the top 3
        const filteredUrls = [...new Set(urls.filter(url => !url.includes('google.com')))].slice(0, 3);
        console.log(JSON.stringify(filteredUrls));
    } catch (error) {
        console.error(JSON.stringify({ error: `Failed to search Google: ${error.message}` }));
    } finally {
        await browser.close();
    }
})();