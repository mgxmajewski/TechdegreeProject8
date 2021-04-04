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
  const books = await Book.findAll()
  res.render('index', {books, title: "Test title"})
}))

/* Create a new book entry */
router.get('/new', (req, res) =>{
  res.render('new-book', {book: {}, title: 'New book'})
});

/* POST create book */
router.post('/new', asyncHandler(async (req, res) =>{
  const book = await Book.create(req.body)
  res.redirect('/books/')
}))

/* Show book details */
router.get('/:id', asyncHandler( async(req, res) =>{
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("update-book", { book, title: book.title });
  } else {
    res.sendStatus(404);
  }
}));

/* Show book details */
router.post('/:id', asyncHandler( async(req, res) =>{
  res.redirect('/books/')
}));

/* Show book details */
router.post('/:id', asyncHandler( async(req, res) =>{
  res.redirect('/books/')
}));

router.post('/:id/delete', asyncHandler( async(req, res) =>{
  res.redirect('/books/')
}));










module.exports = router;
