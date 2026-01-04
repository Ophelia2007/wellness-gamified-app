// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const router = express.Router();
const gardenController = require("../controllers/gardenController");
const gardenMiddleware = require("../middleware/gardenMiddleware");

// ##############################################################
// GARDEN MANAGEMENT ROUTES
// ##############################################################

// GET user's garden
router.get('/:user_id', gardenController.getUserGarden);

// POST plant a new seed (with unlock validation)
router.post('/plant',
    gardenMiddleware.checkPlantUnlock,
    gardenController.plantSeed
);

// DELETE remove plant from garden
router.delete('/:garden_id', gardenController.removePlant);

// PUT water a plant (grow it)
router.put('/:garden_id/water', gardenController.waterPlant);

module.exports = router;