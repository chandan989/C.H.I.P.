// server.js
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const util = require('util');
const { getReplicas, createReplica, postToChatCompletions } = require('./sensay_api');

const execPromise = util.promisify(exec);
const app = express();
app.use(cors());
app.use(express.json());

const conversationHistories = {};

// Health check route
app.get('/', (req, res) => {
    res.send('Server Up and Running');
});

/**
 * NEW: A specialized prompt for using an AI to parse raw text into JSON.
 */
const getParsingPrompt = (textContent) => `
  Please analyze the following raw text content from an e-commerce product page.
  Extract the specified information and return it ONLY as a valid JSON object.
  The desired JSON schema is:
  {
    "name": "string",
    "brand": "string",
    "price": "number",
    "originalPrice": "number | null",
    "image": "string (URL) | null",
    "rating": "number | null",
    "reviewCount": "number | null",
    "inStock": "boolean",
    "description": "string"
  }
  If a value is not found, use null (or an appropriate default). Do not include any explanatory text before or after the JSON.

  HERE IS THE RAW TEXT:
  ---
  ${textContent.substring(0, 15000)} 
  ---
`;

/**
 * NEW: The definitions for our new, smarter tools.
 */
const availableTools = [{
    type: "function",
    function: {
        name: "google_for_shopping_sites",
        description: "Searches Google for relevant e-commerce websites based on a product query. Returns the top 3 URLs.",
        parameters: { /* ... as before ... */ }
    }
}, {
    type: "function",
    function: {
        name: "extract_product_data_from_url",
        description: "Visits a single product page URL, extracts its raw text content, and uses an AI to parse that text into a structured JSON object with product details.",
        parameters: {
            type: "object",
            properties: {
                url: { type: "string", description: "The direct URL of the product page to scrape and parse." }
            },
            required: ["url"]
        }
    }
}];

// `/init-chat` endpoint
app.post('/init-chat', async (req, res) => {
    try {
        const replicas = await getReplicas();
        const replicaUUID = replicas.length > 0 ? replicas[0].uuid : (await createReplica()).uuid;
        conversationHistories[replicaUUID] = [];
        res.json({ replica_uuid: replicaUUID });
    } catch (error) {
        console.error("Error in /init-chat:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to initialize chat." });
    }
});

// `/chat` endpoint
app.post('/chat', async (req, res) => {
    const { replica_uuid, message } = req.body;

    if (!replica_uuid || !message) {
        return res.status(400).json({ error: "replica_uuid and message are required." });
    }

    try {
        console.log(`Sending message to replica ${replica_uuid}: "${message}"`);

        const aiResponse = await postToChatCompletions(replica_uuid, message);

        res.json({ response: aiResponse.content });

    } catch (error) {
        console.error("Error in /chat:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to process chat message." });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
