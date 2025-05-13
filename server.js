
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Replace with your actual w3spaces.com HTML file URL
const frontendUrl = 'https://your-site.w3spaces.com/index.html';

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(frontendUrl);
        res.set('Content-Type', 'text/html'); // Ensure the browser treats it as HTML
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching index.html:', error.message);
        res.status(500).send('Failed to load the frontend page.');
    }
});

// You can add API routes below here as needed

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
