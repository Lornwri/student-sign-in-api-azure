const express = require('express');

//create application server
const app = express();

//start server

const server = app.listen(process.env.PORT || 8080, function() {
    console.log('Server is running on port', server.address().port);
})