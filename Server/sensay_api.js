// sensay_api.js
const axios = require('axios');
require('dotenv').config();
const fs = require('fs');

const SENSAY_API_URL = "https://api.sensay.io/v1";
// We use 'let' so we can update the key in memory after redemption.
let apiKey = "c0735dc852c7c9400e8c12fa3efe428fdc59f7a855eb401707de1586de525047";
const apiVersion = "2025-05-01";

const getHeaders = () => ({
    "X-ORGANIZATION-SECRET": apiKey,
    "X-API-Version": apiVersion,
    "X-USER-ID": "CH1234",
    "Content-Type": "application/json",
});

const redeemNewApiKey = async () => {
    try {
        console.log("API key seems to be expired or invalid. Attempting to redeem a new one...");
        const inviteCode = "SAFKTXN3"; // As provided
        const body = {
            organizationName: "Hackathons",
            name: "Chandan",
            email: "sonichandan989@gmail.com"
        };
        const response = await axios.post(`${SENSAY_API_URL}/api-keys/invites/${inviteCode}/redeem`, body);
        const newKey = response.data.secret;
        console.log("Successfully redeemed a new API key.");

        // Update the key in memory for the current session
        apiKey = newKey;

        console.log("IMPORTANT: Please update your .env file with the new SENSAY_API_KEY:", newKey);

        return newKey;
    } catch (error) {
        console.error("Failed to redeem a new API key:", error.response?.data || error.message);
        throw new Error("Could not redeem a new API key.");
    }
};

const makeApiRequest = async (requestFunction) => {
    try {
        return await requestFunction();
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            await redeemNewApiKey();
            console.log("Retrying the original request with the new key...");
            return await requestFunction();
        }
        throw error;
    }
};

const getReplicas = () => makeApiRequest(() => axios.get(`${SENSAY_API_URL}/replicas`, { headers: getHeaders() }).then(res => res.data.items || []));

/**
 * Creates a new replica using the Sensay API.
 * THIS IS THE CORRECTED FUNCTION
 */
const createReplica = async () => {
    // The placeholder has been replaced with the full configuration object.
    const payload = {
        name: "My Web-Searching Replica",
        shortDescription: "Surf web to find products.",
        greeting: "Hello! I can search for products online. What are you looking for today?",
        // IMPORTANT: Replace this with your actual Sensay owner ID.
        ownerID: "CH1234",
        slug: "web-search-replica-v2",
        llm: {
            model: "claude-4-sonnet-20250514"
        }
    };
    const response = await makeApiRequest(() => axios.post(`${SENSAY_API_URL}/replicas`, payload, { headers: getHeaders() }));
    return response.data;
};

const postToChatCompletions = async (replicaUUID, userMessage) => {
    // The payload is now a simple object with a single 'content' key.
    const payload = {
        content: userMessage
    };
    const response = await makeApiRequest(() =>
        axios.post(`${SENSAY_API_URL}/replicas/${replicaUUID}/chat/completions`, payload, { headers: getHeaders() })
    );
    return response.data;
};

module.exports = { getReplicas, createReplica, postToChatCompletions };