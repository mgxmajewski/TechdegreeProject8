const express = require('express');
const router = express.Router();
const Book = require('../models').Book

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (err) {
      res.status(500).send(err)
    }
  }
}

/* GET users listing. */
router.get('/', asyncHandler(async (req, res) => {
  res.render('index', {books:{}, title: "Test"})
}))

/* Create a new book entry */
router.get('/new', (req, res) =>{
  res.render('new-book', {book: {}, title: 'New book'})
});

/* POST create book */
router.post('books/new', asyncHandler(async (req, res) =>{
  const book = await Book.create(req.body)
  res.redirect('/books/')
}))

/* Edit book */
router.get('/:id/edit', asyncHandler( async(req, res) =>{
  res.render('books/edit', {book: {}, title: 'Edit book'})
}));










module.exports = router;
