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
  const data = {
    userId: req.completionData.userId,
    points: req.challengePoints
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error awardPoints:", error);
      return res.status(500).json({
        message: "Error awarding points",
        error: error.message
      });
    }

    // Get updated user info for email
    usersModel.selectById({ userId: req.completionData.userId }, (error, userResults) => {
      if (error) {
        console.error("Error fetching user for email:", error);
        // Don't fail if email fails, just log it
        req.emailFailed = true;
        next();
        return;
      }

      if (userResults.length === 0) {
        console.log("⚠️ Cannot send email: User not found");
        req.emailFailed = true;
        next();
        return;
      }

      const user = userResults[0];
      
      // Check if user has email address
      if (!user.email || user.email.trim() === '') {
        console.log(`⚠️ User ${user.username} (ID: ${user.user_id}) has no email. Skipping email notification.`);
        req.emailFailed = true;
        next();
        return;
      }
      
      console.log(`📧 Preparing to send email to: ${user.email}`);
      
      // Prepare email data
      const emailData = {
        username: user.username,
        email: user.email,
        oldPoints: user.points || 0,
        newPoints: (user.points || 0) + req.challengePoints
      };
      
      const challengeInfo = {
        description: req.challengeDescription || "Wellness Challenge",
        points: req.challengePoints
      };
      
      console.log("Email data:", emailData);
      console.log("Challenge info:", challengeInfo);
      
      // Send completion email (don't wait for it to complete)
      emailService.sendChallengeCompletionEmail(emailData, challengeInfo, (emailError, info) => {
        if (emailError) {
          console.error("❌ Error sending completion email:", emailError.message);
          req.emailFailed = true;
        } else {
          console.log(`✅ Completion email sent to: ${user.email}`);
          if (info && info.messageId) {
            console.log(`   MessageID: ${info.messageId}`);
          }
          req.emailFailed = false;
        }
        // Email sending is async, we don't wait for it to complete
      });
      
      next();
    });
  };

  usersModel.awardPointsToUser(data, callback);
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