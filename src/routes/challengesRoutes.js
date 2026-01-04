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

// CREATE: Logic to add a new challenge to the system
router.post('/',
    challengesController.createNewChallenge,
    challengesController.printNewChallenge,
)

// READ ALL: Fetches a list of every challenge available
router.get('/', challengesController.readAllChallenges);

// DELETE: Removes a challenge by ID
// checkUserCompletionByChallengeId ensures you don't delete a challenge that has active records (extra)
router.delete('/:challenge_id', 
    challengesMiddleware.checkUserCompletionByChallengeId,
    challengesController.deleteChallengeById
);

// UPDATE: Modifies details of an existing challenge
// Validates that the challenge exists and the requester is the owner before updating
router.put('/:challenge_id', 
    challengesMiddleware.checkIdExist,
    challengesMiddleware.checkCorrectOwner,
    challengesController.updateChallengeById,
    challengesController.printUpdatedChallenge
);

module.exports = router;