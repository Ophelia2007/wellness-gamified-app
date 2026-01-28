const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const emailService = require('../services/emailService');
const userController = require("../controllers/usersController");
const userMiddleware = require("../middleware/userMiddleware");

// CREATE: Handles POST requests to create a new user
// Uses "Middleware" to check for duplicates before saving
router.post('/register',
    userMiddleware.checkDuplicate,
    authController.register,
    userController.printNewUser
)
router.post('/login', authController.login);

// Test email (optional)
router.post('/test-email', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    }
    
    emailService.sendTestEmail(email, (error, info) => {
        if (error) {
            console.error("Error sending test email:", error);
            return res.status(500).json({
                message: "Failed to send email",
                error: error.message
            });
        }
        
        res.status(200).json({
            message: "Test email sent successfully!",
            messageId: info.messageId
        });
    });
});

module.exports = router;