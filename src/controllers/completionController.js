const completionModel = require("../models/completionModel");
const usersModel = require("../models/usersModel");
const emailService = require("../services/emailService");

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

module.exports.awardPointsToUser = (req, res, next) => {
  const userId = req.completionData.userId;
  const earnedPoints = req.challengePoints;

  // 1️⃣ GET USER FIRST (BEFORE UPDATE)
  usersModel.selectById({ userId }, (err, results) => {
    if (err || results.length === 0) {
      return res.status(500).json({ message: "User not found" });
    }

    const user = results[0];
    const oldPoints = user.points || 0;
    const newPoints = oldPoints + earnedPoints;

    // 2️⃣ INCREMENT POINTS
    usersModel.awardPointsToUser(
      { userId, points: earnedPoints },
      (error) => {
        if (error) {
          console.error("Error awardPoints:", error);
          return res.status(500).json({
            message: "Error awarding points",
            error: error.message
          });
        }

        // 3️⃣ PREP EMAIL DATA (CORRECT NOW)
        if (user.email && user.email.trim() !== '') {
          const emailData = {
            username: user.username,
            email: user.email,
            oldPoints,
            newPoints
          };

          const challengeInfo = {
            description: req.challengeDescription || "Wellness Challenge",
            points: earnedPoints
          };

          emailService.sendChallengeCompletionEmail(
            emailData,
            challengeInfo,
            () => {}
          );
        }

        // 4️⃣ SEND CORRECT RESPONSE TO FRONTEND
        res.json({
          success: true,
          points: earnedPoints,
          totalPoints: newPoints
        });
      }
    );
  });
};

// Step 5: Final Step - Return the completion record WITH POINTS
module.exports.printCompletionRecord = (req, res, next) => {
  const data = { completeId: req.insertId };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error printCompletionRecord:", error);
      return res.status(500).json({
        message: "Error retrieving completion record",
        error: error.message || error.sqlMessage || "Unknown error"
      });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({
        message: "Completion record not found"
      });
    }

    // ✅ ADD THE POINTS TO THE RESPONSE
    const completionRecord = results[0];
    completionRecord.points = req.challengePoints; // Add points earned
    
    console.log('✅ Sending completion response with points:', completionRecord);
    
    res.status(201).json(completionRecord);
  };

  completionModel.printCompletionRecord(data, callback);
};

// Replace this function in your completionController.js

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