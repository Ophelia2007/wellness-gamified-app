const gardenModel = require("../models/gardenModel");

// ##############################################################
// CHECK GARDEN OWNERSHIP
// ##############################################################
module.exports.checkGardenOwnership = (req, res, next) => {
    const gardenId = req.params.garden_id;
    const loggedInUserId = req.user.user_id; // From JWT token
    
    if (!gardenId) {
        return res.status(400).json({
            message: "Garden ID is required"
        });
    }
    
    // Get plant info to check ownership
    const data = { gardenId };
    
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checking garden ownership:", error);
            return res.status(500).json(error);
        }
        
        if (results.length === 0) {
            return res.status(404).json({
                message: "Plant not found in garden"
            });
        }
        
        const plant = results[0];
        
        // Check if logged-in user owns this plant
        if (plant.user_id !== loggedInUserId) {
            return res.status(403).json({
                message: "Forbidden: You don't own this plant. You can only water your own plants!"
            });
        }
        
        // Ownership verified!
        next();
    };
    
    gardenModel.getPlantById(data, callback);
};

// ##############################################################
// VERIFY USER VIEWING OWN GARDEN
// ##############################################################
module.exports.verifyGardenAccess = (req, res, next) => {
    const requestedUserId = parseInt(req.params.user_id);
    const loggedInUserId = req.user.user_id; // From JWT token
    
    if (requestedUserId !== loggedInUserId) {
        return res.status(403).json({
            message: "Forbidden: You can only view your own garden!"
        });
    }
    
    next();
};

// ##############################################################
// PLANT A NEW SEED (with validation)
// ##############################################################
module.exports.checkPlantUnlock = (req, res, next) => {
  if (!req.body.user_id || !req.body.plant_type_id) {
    res.status(400).send({
      message: "Missing required data: user_id and plant_type_id"
    });
    return;
  }

  const data = {
    userId: req.body.user_id,
    plantTypeId: req.body.plant_type_id
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkPlantUnlock:", error);
      res.status(500).json(error);
      return;
    }

    if (results.length === 0) {
      res.status(404).json({
        message: "Plant type not found"
      });
      return;
    }

    if (results[0].is_unlocked === 0) {
      res.status(403).json({
        message: "Plant not unlocked. Need more points!",
        user_points: results[0].user_points,
        required_points: results[0].unlock_points
      });
      return;
    }

    // Plant is unlocked, continue to next middleware
    next();
  };

  gardenModel.checkPlantUnlocked(data, callback);
};
