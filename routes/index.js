var express = require('express');
var router = express.Router();
const Book = require('../models').Book


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  //   (async () => {
  //       const books = await Book.findAll()
  //       res.json(books)
  //       console.log(books)
  //   })()
    res.redirect('/books')
});

module.exports = router;
