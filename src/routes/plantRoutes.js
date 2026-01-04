// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plantController");

// ##############################################################
// PLANT CATALOG ROUTES
// ##############################################################

// GET all plant types
router.get('/', plantController.getAllPlants);

// GET unlocked plants for specific user
router.get('/unlocked/:user_id', plantController.getUnlockedPlants);

module.exports = router;