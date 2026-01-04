const plantModel = require("../models/plantModel");

// ##############################################################
// GET ALL PLANT TYPES
// ##############################################################
module.exports.getAllPlants = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getAllPlants:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };

  plantModel.selectAllPlants(callback);
};

// ##############################################################
// GET UNLOCKED PLANTS FOR USER
// ##############################################################
module.exports.getUnlockedPlants = (req, res, next) => {
  const data = {
    userId: req.params.user_id
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getUnlockedPlants:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };

  plantModel.selectUnlockedPlants(data, callback);
};
