const completionModel = require("../models/completionModel");
const challengesModel = require("../models/challengesModel");
const usersModel = require("../models/usersModel");

// Step 1: Check if user exists
module.exports.checkUser = (req, res, next) => {
  // Validate that user_id and details exist in request body
  if (!req.body.user_id || !req.body.details) {
    return res.status(400).send({
      message: "Missing required data."
    });
  }

  const data = {
    userId: req.body.user_id,
    details: req.body.details,
    challengeId: req.params.challenge_id
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkUser:", error);
      return res.status(500).json(error);
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach data to the request object for use in subsequent steps
    req.completionData = data;
    next(); 
  };

  usersModel.checkUserExists(data, callback);
};

// Step 2: Check if challenge exists
module.exports.checkChallenge = (req, res, next) => {
  const data = req.completionData;

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkChallenge:", error);
      return res.status(500).json(error);
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    // Store points earned from this challenge to award later
    req.challengePoints = results[0].points;
    next();
  };

  challengesModel.checkChallengeExists(data, callback);
};
