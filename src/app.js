const express = require('express');
const path = require('path');
const cors = require('cors'); // ✅ make sure you installed cors

const app = express();

// ------------------------
// CORS Middleware
// ------------------------
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true, // allows cookies/auth
}));

// ------------------------
// Body parsers
// ------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ------------------------
// Serve static frontend files
// ------------------------
app.use(express.static(path.join(__dirname, '../public')));

// ------------------------
// API Routes
// ------------------------
const mainRoutes = require('./routes/mainRoutes');
app.use('/', mainRoutes);

// ------------------------
// Default route - serve index.html
// ------------------------
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
