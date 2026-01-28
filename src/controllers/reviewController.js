// ##############################################################
// REQUIRE MODELS
// ##############################################################
const reviewModel = require("../models/reviewModel");

// ##############################################################
// CREATE ACTION
// ##############################################################
module.exports.createReview = (req, res, next) => {
  const data = {
    challengeId: req.params.challenge_id,
    userId: req.body.user_id, // Usually comes from authMiddleware (req.userId)
    rating: req.body.rating,
    comment: req.body.comment
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error createReview:", error);
      return res.status(500).json(error);
    }
    res.status(201).json({ 
        message: "Review submitted successfully", 
        reviewId: results.insertId 
    });
  };

  reviewModel.insertSingle(data, callback);
};

// ##############################################################
// READ ACTION
// ##############################################################
module.exports.getAllReviews = (req, res, next) => {
  const data = { challengeId: req.params.challenge_id };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getAllReviews:", error);
      return res.status(500).json(error);
    }
    res.status(200).json(results);
  };

  reviewModel.selectAllByChallenge(data, callback);
};

// ##############################################################
// DELETE ACTION
// ##############################################################
module.exports.deleteReview = (req, res, next) => {
  const data = { reviewId: req.params.review_id };

  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteReview:", error);
      return res.status(500).json(error);
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(204).send();
  };

  reviewModel.deleteById(data, callback);
};

// Middleware to ensure the person editing is the one who wrote the review
module.exports.checkOwnership = (req, res, next) => {
  const data = { reviewId: req.params.review_id };

  reviewModel.getReviewById(data, (error, results) => {
    if (error) {
      return res.status(500).json(error);
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Compare the logged-in user ID (from authMiddleware) with the review's user_id
    if (results[0].user_id !== req.userId) {
      return res.status(403).json({ message: "Unauthorized: You do not own this review" });
    }

    next();
  });
};

// Perform the update
module.exports.updateReview = (req, res) => {
  const { rating, comment } = req.body;
  
  // Basic validation for the 1-5 rating constraint defined in SQL
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  const data = {
    reviewId: req.params.review_id,
    rating: rating,
    comment: comment
  };

  reviewModel.updateReview(data, (error, results) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.status(200).json({ message: "Review updated successfully" });
  });
};