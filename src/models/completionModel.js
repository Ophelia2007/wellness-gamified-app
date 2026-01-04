// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// INSERT COMPLETION RECORD
// ##############################################################

// Adds a record to 'usercompletion' when a user finishes a challenge
module.exports.insertSingle = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO usercompletion (challenge_id, user_id, details)
    VALUES (?, ?, ?);
  `;
  const VALUES = [data.challengeId, data.userId, data.details];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// RETRIEVE COMPLETION RECORD
// ##############################################################

// Fetches a specific completion record by its primary key ID
module.exports.printCompletionRecord = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT completion_id as complete_id, challenge_id, user_id, details
    FROM usercompletion
    WHERE completion_id = ?;
  `;
  const VALUES = [data.completeId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// GET ALL USERS WHO ATTEMPTED A CHALLENGE
// ##############################################################

// Retrieves a list of users and their submission details for a specific challenge
module.exports.getUsersByChallengeId = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT user_id, details
    FROM usercompletion
    WHERE challenge_id = ?;
  `;
  const VALUES = [data.challengeId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// CHECK USER COMPLETION BY CHALLENGE ID
// ##############################################################

// Used to check if ANY users have completed a challenge (often for validation before deletion)
module.exports.checkUserCompletionByChallengeId = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM usercompletion
    WHERE challenge_id = ?;
  `;
  const VALUES = [data.challengeId];

  pool.query(SQLSTATEMENT, VALUES, callback);
};