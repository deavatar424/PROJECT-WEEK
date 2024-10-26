// controllers/bookController.js
const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  try {
    const book = new Book({
      ...req.body,
      owner: req.user.userId
    });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const query = { owner: req.user.userId };
    
    // Apply filters if provided
    if (req.query.genre) query.genre = req.query.genre;
    if (req.query.author) query.author = req.query.author;
    if (req.query.rating) query.rating = req.query.rating;

    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, owner: req.user.userId });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, owner: req.user.userId });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};