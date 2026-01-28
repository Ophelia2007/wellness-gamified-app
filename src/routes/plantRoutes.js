// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plantController");
const { authenticateToken } = require('../middleware/authMiddleware');

// ##############################################################
// PLANT CATALOG ROUTES
// ##############################################################

// GET all plant types
router.get('/', 
    authenticateToken,
    plantController.getAllPlants);

// GET unlocked plants for specific user
router.get('/unlocked/:user_id', 
    authenticateToken,
    plantController.getUnlockedPlants);

module.exports = router;