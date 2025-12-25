const completionModel = require("../models/completionModel");

// Step 1: Check if user exists
module.exports.checkUser = (req, res, next) => {
  // Validate that user_id and details exist in request body
  if (req.body.user_id == undefined || req.body.details == undefined) {
    res.status(400).send({
      message: "Missing required data."
    });
    return; // Stop here, don't continue
  }

  // Create a data object with all needed info
  const data = {
    userId: req.body.user_id,           // From request body
    details: req.body.details,           // From request body
    challengeId: req.params.challenge_id // From URL parameter
  };

  // Callback function that runs after database query completes
  const callback = (error, results, fields) => {
    if (error) {
      // Database error occurred
      console.error("Error checkUser:", error);
      res.status(500).json(error);
      return;
    }

    if (results.length === 0) {
      // No user found with that ID
      res.status(404).json({
        message: "User not found"
      });
      return;
    }

    // User exists! Store data for next middleware
    req.completionData = data;
    next(); // Move to next middleware (checkChallenge)
  };

  // Call the model function to check if user exists
  completionModel.checkUserExists(data, callback);
};

// Step 2: Check if challenge exists
module.exports.checkChallenge = (req, res, next) => {
  // Get the data we stored in previous middleware
  const data = req.completionData;

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error checkChallenge:", error);
      res.status(500).json(error);
      return;
    }

    if (results.length === 0) {
      // No challenge found with that ID
      res.status(404).json({
        message: "Challenge not found"
      });
      return;
    }

    // Challenge exists! Store the points value
    req.challengePoints = results[0].points;
    next(); // Move to next middleware (createCompletionRecord)
  };

  completionModel.checkChallengeExists(data, callback);
};

// Step 3: Create completion record
module.exports.createCompletionRecord = (req, res, next) => {
  // Get the data we stored earlier
  const data = req.completionData;

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createCompletionRecord:", error);
      res.status(500).json(error);
      return;
    }

    // Save the ID of the newly created completion record
    req.insertId = results.insertId;
    next(); // Move to next middleware (awardPoints)
  };

  completionModel.insertSingle(data, callback);
};

// Step 4: Award points to user
module.exports.awardPoints = (req, res, next) => {
  // Prepare data for awarding points
  const data = {
    userId: req.completionData.userId,  // Which user
    points: req.challengePoints          // How many points to add
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error awardPoints:", error);
      res.status(500).json(error);
      return;
    }

    next(); // Move to final middleware (printCompletionRecord)
  };

  completionModel.awardPoints(data, callback);
};

// Step 5: Print completion record
module.exports.printCompletionRecord = (req, res, next) => {
  const data = {
    completeId: req.insertId  // The ID we saved in step 3
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error printCompletionRecord:", error);
      res.status(500).json(error);
      return;
    }

    // Send the final response with status 201 Created
    res.status(201).json(results[0]);
  };

  completionModel.printCompletionRecord(data, callback);
};

//Read all records
module.exports.readAllCompletionRecords = (req, res, next) =>
{
    const data = {
    challengeId: req.params.challenge_id
  };
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error readAllCompletionRecords:", error);
      res.status(500).json(error);
      return;
    }

    if (results.length === 0) {
      res.status(404).json({
        message: "No users have attempted this challenge"
      });
      return;
    }

    res.status(200).json(results);
  };

  completionModel.getUsersByChallengeId(data, callback);
}