const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to allow all CORS for simplicity (in production, be more restrictive)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Proxy endpoint to fetch content from external websites
app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).json({ error: 'Missing target URL' });
    }

    try {
        // Fetch content from the target URL
        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        });

        // Forward the content to the client
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching the URL:', error);
        res.status(500).json({ error: 'Failed to fetch the content' });
    }
});

// Serve frontend HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});
