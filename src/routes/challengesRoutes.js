// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();
const challengesController = require("../controllers/challengesController");

router.post('/',
    challengesController.createNewChallenge,
    challengesController.printNewChallenge,
)
router.get('/', challengesController.readAllChallanges);
router.delete('/:challenge_id', challengesController.deleteChallengeById);
router.put('/:challenge_id', 
    challengesController.checkIdexist,
    challengesController.checkCorrectOwner,
    challengesController.updateChallengebyId,
    challengesController.printupdatedChallenge
);

module.exports = router;