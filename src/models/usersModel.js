// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE INSERT OPERATION FOR TREE
// ##############################################################
module.exports.insertSingle = (data, callback) =>
{
const SQLSTATMENT = `
    INSERT INTO user (username)
    VALUES (?);
    `;
const VALUES = [data.userName];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.findByUsername = (data, callback) =>
{
const SQLSTATMENT = `
    SELECT *
    FROM user
    WHERE username = ?;
    `;
const VALUES = [data.userName];

pool.query(SQLSTATMENT, VALUES, callback);
}
module.exports.printNewUser = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT user_id, username, points
    FROM user
    WHERE user_id = ?;
    `;
const VALUES = [data.userId];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM user;
    `;

pool.query(SQLSTATMENT, callback);
}
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT user_id,username,points FROM user
    WHERE user_id = ?;
    `;
const VALUES = [data.userId];

pool.query(SQLSTATMENT, VALUES, callback);
}
