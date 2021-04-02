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
  res.send('respond with a resource');
}));

/* Create a new book entry */
router.get('/new', (req, res) =>{
  res.render('books/new', {book: {}, title: 'New book'})
});

/* Create a new book entry */
router.get('/new', (req, res) =>{
  res.render('books/new', {book: {}, title: 'New book'})
});

/* Edit book */
router.get('/:id/edit', asyncHandler( async(req, res) =>{
  res.render('books/edit', {book: {}, title: 'Edit book'})
}));










module.exports = router;
