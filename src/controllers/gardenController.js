const gardenModel = require("../models/gardenModel");

// ##############################################################
// GET USER'S GARDEN
// ##############################################################
module.exports.getUserGarden = (req, res, next) => {
  const data = {
    userId: req.params.user_id
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getUserGarden:", error);
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(200).json({
          message: "Garden is empty. Plant your first seed!",
          plants: []
        });
      } else {
        res.status(200).json(results);
      }
    }
  };

  gardenModel.selectUserGarden(data, callback);
};

module.exports.plantSeed = (req, res, next) => {
  const data = {
    userId: req.body.user_id,
    plantTypeId: req.body.plant_type_id,
    plantNickname: req.body.plant_nickname || "My Plant"
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error plantSeed:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json({
        message: "Plant successfully added to garden!",
        garden_id: results.insertId,
        plant_nickname: data.plantNickname
      });
    }
  };

  gardenModel.insertPlant(data, callback);
};

// ##############################################################
// DELETE PLANT FROM GARDEN
// ##############################################################
module.exports.removePlant = (req, res, next) => {
  const data = {
    gardenId: req.params.garden_id
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error removePlant:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({
          message: "Plant not found in garden"
        });
      } else {
        res.status(204).send();
      }
    }
  };

  gardenModel.deletePlant(data, callback);
};

// ##############################################################
// WATER PLANT (GROW IT)
// ##############################################################
module.exports.waterPlant = (req, res, next) => {
  const data = {
    gardenId: req.params.garden_id
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error waterPlant:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({
          message: "Plant not found"
        });
      } else {
        res.status(200).json({
          message: "Plant watered successfully! Growth updated."
        });
      }
    }
  };

  gardenModel.waterPlant(data, callback);
};