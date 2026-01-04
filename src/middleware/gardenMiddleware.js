const gardenModel = require("../models/gardenModel");

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
