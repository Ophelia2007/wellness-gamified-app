// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();
const challengesController = require("../controllers/challengesController");
const challengesMiddleware = require("../middleware/challengesMiddleware");
const { authenticateToken } = require('../middleware/authMiddleware');

// CREATE: Logic to add a new challenge to the system
router.post('/',
    authenticateToken,           // 1. Verify user exists/is logged in
    challengesController.createNewChallenge,
    challengesController.printNewChallenge,
)

// READ ALL: Fetches a list of every challenge available
router.get('/', 
    challengesController.readAllChallenges);

// DELETE: Removes a challenge by ID
// checkUserCompletionByChallengeId ensures you don't delete a challenge that has active records (extra)
router.delete('/:challenge_id', 
    authenticateToken,
    challengesMiddleware.checkUserCompletionByChallengeId,
    challengesController.deleteChallengeById
);

// UPDATE: Modifies details of an existing challenge
// Validates that the challenge exists and the requester is the owner before updating
router.put('/:challenge_id', 
    authenticateToken,
    challengesMiddleware.checkIdExist,
    challengesMiddleware.checkCorrectOwner,
    challengesController.updateChallengeById,
    challengesController.printUpdatedChallenge
);

module.exports = router;