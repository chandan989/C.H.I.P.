import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const port = 3001;

app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Example: Scraping Amazon for products based on the query
    await page.goto(`https://www.amazon.com/s?k=${encodeURIComponent(query)}`);

    const products = await page.evaluate(() => {
      const results = [];
      const items = document.querySelectorAll('[data-component-type="s-search-result"]');

      items.forEach(item => {
        const name = item.querySelector('h2 a span')?.innerText;
        const price = item.querySelector('.a-price-whole')?.innerText + item.querySelector('.a-price-fraction')?.innerText;
        const image = item.querySelector('img.s-image')?.src;
        const url = 'https://www.amazon.com' + item.querySelector('h2 a')?.getAttribute('href');
        const ratingElement = item.querySelector('.a-icon-star-small');
        const rating = ratingElement ? parseFloat(ratingElement.innerText.split(' ')[0]) : 0;
        const reviewCountElement = item.querySelector('.a-size-small .a-link-normal');
        const reviewCount = reviewCountElement ? parseInt(reviewCountElement.innerText.replace(/[^0-9]/g, '')) : 0;

        if (name && price && image && url) {
          results.push({
            id: item.getAttribute('data-asin'),
            name,
            brand: 'N/A', // You can extract this if available
            price: parseFloat(price.replace(/[^0-9.]/g, '')),
            image,
            rating,
            reviewCount,
            url,
            inStock: true, // Assuming in stock for this example
          });
        }
      });

      return results.slice(0, 5); // Return top 5 results
    });

    await browser.close();
    res.json(products);
  } catch (error) {
    console.error('Error scraping products:', error);
    res.status(500).json({ error: 'Failed to scrape products.' });
  }
});

app.listen(port, () => {
  console.log(`Scraping server is listening on port ${port}`);
});