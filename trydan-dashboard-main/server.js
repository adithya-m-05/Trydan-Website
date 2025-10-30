// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000; // The port your dashboard will run on

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Dashboard is live at http://localhost:${PORT}`);
});