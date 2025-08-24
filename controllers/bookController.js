const Book = require('../models/Book');

// @POST /api/books
exports.addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const book = new Book({ title, author, genre, createdBy: req.user.id });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @GET /api/books
exports.getBooks = async (req, res) => {
  try {
    const { genre, author } = req.query;
    const filter = {};
    if (genre) filter.genre = genre;
    if (author) filter.author = author;

    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
