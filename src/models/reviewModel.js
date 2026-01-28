// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// CREATE REVIEW
// ##############################################################
module.exports.insertSingle = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO reviews (challenge_id, user_id, rating, comment)
    VALUES (?, ?, ?, ?);
  `;
  const VALUES = [data.challengeId, data.userId, data.rating, data.comment];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// Fetch a specific review to check ownership or details
module.exports.getReviewById = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM reviews
        WHERE review_id = ?;
    `;
    const VALUES = [data.reviewId];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// READ REVIEWS BY CHALLENGE
// ##############################################################
module.exports.selectAllByChallenge = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT r.*, u.username 
    FROM reviews r
    JOIN User u ON r.user_id = u.user_id
    WHERE r.challenge_id = ?
    ORDER BY r.created_at DESC;
  `;
  const VALUES = [data.challengeId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// UPDATE REVIEW
// ##############################################################
module.exports.updateReview = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE reviews 
    SET rating = ?, comment = ? 
    WHERE review_id = ?;
  `;
  const VALUES = [data.rating, data.comment, data.reviewId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DELETE REVIEW
// ##############################################################
module.exports.deleteById = (data, callback) => {
  const SQLSTATEMENT = `
    DELETE FROM reviews 
    WHERE review_id = ?;
  `;
  const VALUES = [data.reviewId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};