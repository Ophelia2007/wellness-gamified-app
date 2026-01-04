const challengesModel = require("../models/challengesModel");
const completionModel = require("../models/completionModel");

// ##############################################################
// CREATE ACTIONS
// ##############################################################

// Validate input and insert a new challenge
module.exports.createNewChallenge = (req, res, next) => {
  // Check for missing fields
  if (!req.body.description || !req.body.user_id || !req.body.points) {
    res.status(400).send({ message: "Missing required data." });
    return;
  }

  // Type check for points
  if (req.body.points !== undefined && typeof req.body.points !== 'number') {
    return res.status(400).send({ message: 'Invalid input: points must be a number' });
  }

  const data = {
    description: req.body.description,
    userId: req.body.user_id,
    points: req.body.points
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createNewChallenge:", error);
      res.status(500).json(error);
    } else {
      // Pass the new ID to the next middleware
      req.insertId = results.insertId;
      next();
    }
  };
  challengesModel.insertSingle(data, callback);
};

// Return the newly created challenge details to the client
module.exports.printNewChallenge = (req, res, next) => {
  const data = { challengeId: req.insertId };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error printNewChallenge:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json(results[0]);
    }
  };
  challengesModel.printNewChallenge(data, callback);
};

// ##############################################################
// READ ACTIONS
// ##############################################################

// Get all challenges in the database
module.exports.readAllChallenges = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllChallenges:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };
  challengesModel.selectAll(callback);
};

// ##############################################################
// DELETE ACTIONS
// ##############################################################

// Permanently remove the challenge from the DB
module.exports.deleteChallengeById = (req, res, next) => {
  const data = { challengeId: req.params.challenge_id };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteChallengeById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({ message: "Challenge not found" });
      } else {
        res.status(204).send();
      }
    }
  };
  challengesModel.deleteById(data, callback);
};

// ##############################################################
// UPDATE ACTIONS
// ##############################################################

// Update record in the database
module.exports.updateChallengeById = (req, res, next) => {
  const data = {
    challengeId: req.params.challenge_id,
    description: req.body.description,
    points: req.body.points
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error updateChallengeById:", error);
      res.status(500).json(error);
    } else {
      next();
    }
  };
  challengesModel.updateChallenge(data, callback);
};

// Send the updated challenge details back to the user
module.exports.printUpdatedChallenge = (req, res, next) => {
  const data = { challengeId: req.params.challenge_id };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error printUpdatedChallenge:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results[0]);
    }
  };
  challengesModel.printUpdatedChallenge(data, callback);
};