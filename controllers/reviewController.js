const Review = require('../models/Review');
const Book = require('../models/Book');

// @POST /api/books/:bookId/reviews
exports.addReview = async (req, res) => {
  try {
    const { review_text, rating } = req.body;
    const { bookId } = req.params;

    const review = new Review({
      book: bookId,
      reviewer: req.user.id,
      review_text,
      rating
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @GET /api/books/:bookId/reviews
exports.getReviews = async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ book: bookId }).populate('reviewer', 'username');

    // Calculate average rating
    const total = reviews.reduce((acc, cur) => acc + cur.rating, 0);
    const average = reviews.length ? (total / reviews.length).toFixed(1) : 0;

    res.json({ average_rating: average, reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
