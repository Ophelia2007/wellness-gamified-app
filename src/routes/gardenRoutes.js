// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const router = express.Router();
const gardenController = require("../controllers/gardenController");
const gardenMiddleware = require("../middleware/gardenMiddleware");
const { authenticateToken } = require('../middleware/authMiddleware');
const { checkGardenOwnership, verifyGardenAccess } = require('../middleware/gardenMiddleware');
// ##############################################################
// GARDEN MANAGEMENT ROUTES
// ##############################################################

// GET user's garden
router.get('/:user_id', 
    authenticateToken,
    verifyGardenAccess,
    gardenController.getUserGarden);

// POST plant a new seed (with unlock validation)
router.post('/plant',
    authenticateToken,
    gardenMiddleware.checkPlantUnlock,
    gardenController.plantSeed
);

// DELETE remove plant from garden
router.delete('/:garden_id', 
    authenticateToken,
    checkGardenOwnership,
    gardenController.removePlant);

// PUT water a plant (grow it)
router.put('/:garden_id/water', 
    authenticateToken,
    checkGardenOwnership,
    gardenController.waterPlant);

module.exports = router;