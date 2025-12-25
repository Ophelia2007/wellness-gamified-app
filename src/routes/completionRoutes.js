// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();
const completionController = require("../controllers/completionController");

router.post('/:challenge_id',
    completionController.checkUser,
    completionController.checkChallenge,
    completionController.createCompletionRecord,
    completionController.awardPoints,
    completionController.printCompletionRecord
)
router.get('/:challenge_id', completionController.readAllCompletionRecords);
module.exports = router;