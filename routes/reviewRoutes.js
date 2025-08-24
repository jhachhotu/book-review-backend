const express = require('express');
const router = express.Router();
const { addReview, getReviews } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Add a review
router.post('/:bookId/reviews', authMiddleware, addReview);

// Get reviews & average rating
router.get('/:bookId/reviews', getReviews);

module.exports = router;
