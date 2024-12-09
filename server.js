const express = require('express');
const apiRoutes = require('./routes/api.js');
const path = require('path');

// Create application server
const app = express();

app.use(express.json());

const staticFilePath = path.join(__dirname, 'client', 'dist');
const staticFiles = express.static(staticFilePath);
app.use('/', staticFiles);

app.use('/api', apiRoutes);

// Start server
const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port', server.address().port);
});
