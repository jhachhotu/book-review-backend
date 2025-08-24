const express = require('express');
const router = express.Router();
const { addBook, getBooks } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addBook);
router.get('/', getBooks);

module.exports = router;
