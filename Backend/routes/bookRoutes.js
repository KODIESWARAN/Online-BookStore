const express = require('express');
const router = express.Router();
const bookcontroller = require('../controllers/bookController');
const upload = require('../middleware/uploadMiddleware');
const { isAdmin, authenticationJwt } = require('../middleware/authmiddlware');

// Routes for handling book operations
router.get('/', bookcontroller.getAllBooks);
router.get('/:id', bookcontroller.getBookById);

// Add a new book with file upload
router.post('/add', authenticationJwt, isAdmin, upload, bookcontroller.createBook);
router.put('/:id', authenticationJwt, isAdmin, bookcontroller.updateBook);
router.delete('/:id', authenticationJwt, isAdmin, bookcontroller.deleteBook);

module.exports = router;
