const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs/promises');
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'assets')));

const DATA_DIR = path.join(__dirname, 'data');
const FEED_FILE = 'feed.json';
const ITEMS_PER_PAGE = 5;

// Helper function to read JSON file
const readJSONFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error reading JSON file: ${error.message}`);
  }
};

// Endpoint to get paginated data from feed.json
app.get('/products', async (req, res) => {
  try {
    // Extract page parameter from the query, default to 1 if not provided
    const page = parseInt(req.query.page) || 1;

    // Calculate start and end indices for pagination
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Read the content of feed.json
    const filePath = path.join(DATA_DIR, FEED_FILE);
    const jsonData = await readJSONFile(filePath);

    // Get the subset of data for the current page
    const paginatedData = jsonData.slice(startIndex, endIndex);

    // Respond with the paginated data
    res.json(paginatedData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`(HTTP) App now running on port ${PORT}`);
});
