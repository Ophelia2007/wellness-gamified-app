// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// CHALLENGE DATABASE OPERATIONS
// ##############################################################

// CREATE: Insert a new challenge record into the table
module.exports.insertSingle = (data, callback) => {
  const SQLSTATMENT = `
    INSERT INTO wellnesschallenge (description, creator_id, points)
    VALUES (?, ?, ?);
  `;
  const VALUES = [data.description, data.userId, data.points];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// READ: Fetch details of a newly created challenge to confirm insertion
module.exports.printNewChallenge = (data, callback) => {
  const SQLSTATMENT = `
    SELECT challenge_id, description, creator_id, points
    FROM wellnesschallenge
    WHERE challenge_id = ?;
  `;
  const VALUES = [data.challengeId];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// READ ALL: Retrieve every challenge from the wellnesschallenge table
module.exports.selectAll = (callback) => {
  const SQLSTATMENT = `
    SELECT * FROM wellnesschallenge;
  `;

  pool.query(SQLSTATMENT, callback);
};

// DELETE: Remove a specific challenge using its ID
module.exports.deleteById = (data, callback) => {
  const SQLSTATMENT = `
    DELETE FROM wellnesschallenge 
    WHERE challenge_id = ?;
  `;
  const VALUES = [data.challengeId];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// READ ONE: Get all columns for a specific challenge ID
module.exports.selectById = (data, callback) => {
  const SQLSTATMENT = `
    SELECT * FROM wellnesschallenge
    WHERE challenge_id = ?;
  `;
  const VALUES = [data.challengeId];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// UPDATE: Change the description or points of an existing challenge
module.exports.updateChallenge = (data, callback) => {
  const SQLSTATMENT = `
    UPDATE wellnesschallenge
    SET description = ?, points = ?
    WHERE challenge_id = ?;
  `;
  const VALUES = [
    data.description,
    data.points,
    data.challengeId
  ];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// READ: Re-fetch the challenge after an update to send the fresh data back
module.exports.printUpdatedChallenge = (data, callback) => {
  const SQLSTATMENT = `
    SELECT challenge_id, description, creator_id, points
    FROM wellnesschallenge
    WHERE challenge_id = ?;
  `;
  const VALUES = [data.challengeId];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// VALIDATION: Quick check to see if a challenge ID exists and get its point value
module.exports.checkChallengeExists = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT challenge_id, points 
    FROM wellnesschallenge 
    WHERE challenge_id = ?;
  `;
  const VALUES = [data.challengeId];
  
  pool.query(SQLSTATEMENT, VALUES, callback);
};