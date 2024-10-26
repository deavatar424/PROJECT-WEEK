// middleware/validation.js
const { body, validationResult } = require('express-validator');

exports.validateRegistration = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateBook = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required'),
  body('genre')
    .trim()
    .notEmpty()
    .withMessage('Genre is required'),
  body('published_date')
    .isISO8601()
    .withMessage('Invalid date format'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];