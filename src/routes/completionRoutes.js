// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();
const completionController = require("../controllers/completionController");
const completionMiddleware = require("../middleware/completionMiddleware");
const { authenticateToken } = require('../middleware/authMiddleware');

// CREATE COMPLETION: Handles when a user submits a completed challenge
router.post('/:challenge_id',
    authenticateToken,
    completionMiddleware.checkUser,             // 1. Verify user exists/is logged in
    completionMiddleware.checkChallenge,        // 2. Verify the challenge is valid
    completionController.createCompletionRecord, // 3. Log the completion in the database
    completionController.awardPointsToUser,     // 4. Update the user's score/currency
    completionController.printCompletionRecord  // 5. Send success response to client
)

// READ: Fetches all completion records for a specific challenge ID
router.get('/:challenge_id', completionController.readAllCompletionRecords);

module.exports = router;