// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');

router.post('/', auth, bookController.createBook);
router.get('/', auth, bookController.getAllBooks);
router.get('/:id', auth, bookController.getBook);
router.put('/:id', auth, bookController.updateBook);
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;