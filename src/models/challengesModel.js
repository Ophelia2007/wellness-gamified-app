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
    INSERT INTO wellnesschallenge (description,creator_id,points)
    VALUES (?,?,?);
    `;
const VALUES = [data.description, data.userId, data.points];

pool.query(SQLSTATMENT, VALUES, callback);
}
module.exports.printNewChallenge = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT challenge_id, description, creator_id, points
    FROM wellnesschallenge
    WHERE challenge_id = ?;
    `;
const VALUES = [data.challengeId];

pool.query(SQLSTATMENT, VALUES, callback);
}
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM wellnesschallenge;
    `;

pool.query(SQLSTATMENT, callback);
}
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM wellnesschallenge 
    WHERE challenge_id = ?;
    `;
const VALUES = [data.challengeId];

pool.query(SQLSTATMENT, VALUES, callback);
}
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM wellnesschallenge
    WHERE challenge_id = ?;
    `;
const VALUES = [data.challengeId];

pool.query(SQLSTATMENT, VALUES, callback);
}

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
module.exports.printupdatedChallenge = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT challenge_id, description, creator_id, points
    FROM wellnesschallenge
    WHERE challenge_id = ?;
    `;
const VALUES = [data.challengeId];

pool.query(SQLSTATMENT, VALUES, callback);
}