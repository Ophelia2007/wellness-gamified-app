// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// USER DATABASE OPERATIONS
// ##############################################################

// CREATE: Insert a new user with just a username
module.exports.insertSingle = (data, callback) => {
  const SQLSTATMENT = `
    INSERT INTO user (username)
    VALUES (?);
  `;
  const VALUES = [data.userName];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// READ: Check if a username is taken (Dynamic query to exclude current user if needed)
module.exports.findByUsername = (data, callback) => {
  let SQLSTATMENT = 'SELECT * FROM user WHERE username = ?';
  const VALUES = [data.userName];
  
  // If a userId is provided, exclude it from the search (used for updates)
  if (data.userId) {
    SQLSTATMENT += ' AND user_id != ?';
    VALUES.push(data.userId);
  }
  pool.query(SQLSTATMENT, VALUES, callback);
};

// READ: Fetch details of a newly created user
module.exports.printNewUser = (data, callback) => {
  const SQLSTATMENT = `
    SELECT user_id, username, points
    FROM user
    WHERE user_id = ?;
  `;
  const VALUES = [data.userId];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// READ ALL: Retrieve every user in the database
module.exports.selectAll = (callback) => {
  const SQLSTATMENT = `
    SELECT * FROM user;
  `;

  pool.query(SQLSTATMENT, callback);
};

// READ ONE: Get specific user details by ID
module.exports.selectById = (data, callback) => {
  const SQLSTATMENT = `
    SELECT user_id, username, points FROM user
    WHERE user_id = ?;
  `;
  const VALUES = [data.userId];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// UPDATE: Change username and points for an existing user
module.exports.updateUser = (data, callback) => {
  const SQLSTATMENT = `
    UPDATE user
    SET username = ?, points = ? WHERE user_id = ?;
  `;
  const VALUES = [data.userName, data.points, data.userId];
  pool.query(SQLSTATMENT, VALUES, callback);
};

// READ: Fetch user details after an update
module.exports.printUpdatedUser = (data, callback) => {
  const SQLSTATMENT = `
    SELECT user_id, username, points
    FROM user
    WHERE user_id = ?;
  `;
  const VALUES = [data.userId];

  pool.query(SQLSTATMENT, VALUES, callback);
};

// VALIDATION: Simple check to verify if a user ID exists
module.exports.checkUserExists = (data, callback) => {
  const SQLSTATEMENT = `SELECT user_id FROM user WHERE user_id = ?;`;
  const VALUES = [data.userId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// AWARD POINTS TO USER
// ##############################################################

// Update operation to increment existing points by a specific amount
module.exports.awardPointsToUser = (data, callback) => {
  const SQLSTATEMENT = `UPDATE user SET points = points + ? WHERE user_id = ?;`;
  const VALUES = [data.points, data.userId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};