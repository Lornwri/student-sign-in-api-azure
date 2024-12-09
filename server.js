const express = require('express');
const apiRoutes = require('./routes/api'); // Ensure the correct path to api.js

const app = express();

app.use(express.json()); // Parse JSON bodies
app.use('/api', apiRoutes); // Mount the API routes

// 404 handler
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
