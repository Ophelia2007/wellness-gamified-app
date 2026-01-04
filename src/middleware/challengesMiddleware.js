const challengesModel = require("../models/challengesModel");
const completionModel = require("../models/completionModel");

// Safety check: Prevent deletion if users have already finished this challenge
module.exports.checkUserCompletionByChallengeId = (req, res, next) => {
  const data = { challengeId: req.params.challenge_id };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkUserCompletionByChallengeId:", error);
      res.status(500).json(error);
    } else {
      if (results.length > 0) {
        res.status(404).json({
          message: "Challenge cannot be deleted as some users have already completed..."
        });
      } else {
        next();
      }
    }
  };
  completionModel.checkUserCompletionByChallengeId(data, callback);
};

// Middleware to verify the challenge exists before attempting update
module.exports.checkIdExist = (req, res, next) => {
  const data = { challengeId: req.params.challenge_id };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkIdExist:", error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({ message: "Challenge Not found" });
      } else {
        // Store the original creator's ID for the next security check
        req.creator_id = results[0].creator_id;
        next();
      }
    }
  };
  challengesModel.selectById(data, callback);
};

// Security check: Ensure only the creator can edit their challenge
module.exports.checkCorrectOwner = (req, res, next) => {
  if (!req.body.description || !req.body.user_id || !req.body.points) {
    return res.status(400).json({ message: "Missing required data." });
  }

  if (req.body.points !== undefined && typeof req.body.points !== 'number') {
    return res.status(400).send({ message: 'Invalid input: points must be a number' });
  }

  if (req.creator_id != req.body.user_id) {
    return res.status(403).json({ message: "Forbidden: Not correct owner." });
  }

  next();
};
