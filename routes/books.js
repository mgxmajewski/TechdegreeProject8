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

    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);

    console.log(pageAsNumber)
    console.log(sizeAsNumber)


    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
        page = pageAsNumber;
    }

    let size = 3;
    if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)){
        size = sizeAsNumber;
    }

    const books = await Book.findAndCountAll({
        limit: size,
        offset: page * size
    })
    console.log(books)
    res.render('index', {
        books: books.rows,
        current: page,
        totalPages: Math.ceil(books.count / Number.parseInt(size)),
        title: "Test title"})
}))

/* Create a new book entry */
router.get('/new', (req, res) =>{
  res.render('new-book', {book: {}, title: 'New book'})
});

/* POST create book */
router.post('/new', asyncHandler(async (req, res) =>{
  let book
  try {
    book = await Book.create(req.body)
    res.redirect("/books/");
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("new-book", { book, errors: err.errors, title: `New Book`})
    } else {
      throw err;
    }
  }
}));

/* Show book details */
router.get('/:id', asyncHandler( async(req, res) =>{
  let book
  book = await Book.findByPk(req.params.id)
  if(book) {
    res.render("update-book", { book, title: "Book details" })
  } else {
    res.sendStatus(404)
  }
}));

/* Update book details */
router.post('/:id', asyncHandler( async(req, res) =>{
  let book
  try {
    book = await Book.findByPk(req.params.id)
    console.log(req.body)
    if (book) {
      console.log(req.body)
      await book.update(req.body)
      res.redirect("/books/")
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render("update-book", { book, errors: err.errors, title: "Book details" });
    } else {
      throw err;
    }
  }
}));

/* Delete book */
router.post('/:id/delete', asyncHandler( async(req, res) =>{
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/books/");
  } else {
    res.sendStatus(404);
  }
}));










module.exports = router;
