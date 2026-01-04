const completionModel = require("../models/completionModel");
const challengesModel = require("../models/challengesModel");
const usersModel = require("../models/usersModel");

// ##############################################################
// COMPLETION FLOW (POST)
// ##############################################################

// Step 3: Create completion record
module.exports.createCompletionRecord = (req, res, next) => {
  const data = req.completionData;

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createCompletionRecord:", error);
      return res.status(500).json(error);
    }

    // Save the new record ID for the final print step
    req.insertId = results.insertId;
    next();
  };

  completionModel.insertSingle(data, callback);
};

// Step 4: Award points to user
module.exports.awardPointsToUser = (req, res, next) => {
  const data = {
    userId: req.completionData.userId,
    points: req.challengePoints
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error awardPointsToUser:", error);
      return res.status(500).json(error);
    }

    next();
  };

  usersModel.awardPointsToUser(data, callback);
};

// Step 5: Final Step - Return the new completion record
module.exports.printCompletionRecord = (req, res, next) => {
  const data = { completeId: req.insertId };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error printCompletionRecord:", error);
      return res.status(500).json(error);
    }

    res.status(201).json(results[0]);
  };

  completionModel.printCompletionRecord(data, callback);
};

// ##############################################################
// READ ACTIONS (GET)
// ##############################################################

// Fetches all users who completed a specific challenge
module.exports.readAllCompletionRecords = (req, res, next) => {
  const data = { challengeId: req.params.challenge_id };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllCompletionRecords:", error);
      return res.status(500).json(error);
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "No users have attempted this challenge"
      });
    }

    res.status(200).json(results);
  };

  completionModel.getUsersByChallengeId(data, callback);
};