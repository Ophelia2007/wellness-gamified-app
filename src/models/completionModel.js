// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// CHECK IF USER EXISTS
// ##############################################################
module.exports.checkUserExists = (data, callback) => {
  const SQLSTATEMENT = `SELECT user_id FROM user WHERE user_id = ?;`;
  const VALUES = [data.userId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// CHECK IF CHALLENGE EXISTS AND GET POINTS
// ##############################################################
module.exports.checkChallengeExists = (data, callback) => {
  const SQLSTATEMENT = `SELECT challenge_id, points FROM wellnesschallenge WHERE challenge_id = ?;`;
  const VALUES = [data.challengeId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// INSERT COMPLETION RECORD
// ##############################################################
module.exports.insertSingle = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO usercompletion (challenge_id, user_id, details)
    VALUES (?, ?, ?);
  `;
  const VALUES = [data.challengeId, data.userId, data.details];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// AWARD POINTS TO USER
// ##############################################################
module.exports.awardPoints = (data, callback) => {
  const SQLSTATEMENT = `UPDATE user SET points = points + ? WHERE user_id = ?;`;
  const VALUES = [data.points, data.userId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// RETRIEVE COMPLETION RECORD
// ##############################################################
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
module.exports.getUsersByChallengeId = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT user_id, details
    FROM usercompletion
    WHERE challenge_id = ?;
  `;
  const VALUES = [data.challengeId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};