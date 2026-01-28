const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/challenges/:challenge_id/reviews',
    authenticateToken,  // Must be logged in
    reviewController.createReview
);

router.get('/challenges/:challenge_id/reviews',
    reviewController.getAllReviews
);

router.put('/reviews/:review_id',
    authenticateToken,
    reviewController.checkOwnership,
    reviewController.updateReview
);

router.delete('/reviews/:review_id',
    authenticateToken,
    reviewController.checkOwnership,
    reviewController.deleteReview
);

// Export the router so it can be used in the main app (e.g., server.js)
module.exports = router;