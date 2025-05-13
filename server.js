const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Correct URL to your actual HTML file
const frontendUrl = 'https://theplugprojects.w3spaces.com/buypassi.html';

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(frontendUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });
        res.set('Content-Type', 'text/html');
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching HTML:', error.message);
        res.status(500).send('Failed to load frontend page.');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
