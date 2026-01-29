const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// ------------------------
// CORS Middleware
// ------------------------
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
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

// ------------------------
// FIXED: Global Error Handler
// ------------------------
app.use((err, req, res, next) => {
    // Log error for debugging (only in development)
    if (process.env.NODE_ENV !== 'production') {
        console.error('Error:', err);
    }
    
    // Handle specific error types
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
    }
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired. Please login again.' });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Default error response
    res.status(err.status || 500).json({
        message: process.env.NODE_ENV === 'production' 
            ? 'An error occurred. Please try again later.' 
            : err.message || 'Internal server error'
    });
});

// ------------------------
// FIXED: 404 Handler (Must be last)
// ------------------------
app.use((req, res) => {
    res.status(404).json({ 
        message: 'Route not found',
        path: req.path 
    });
});

module.exports = app;