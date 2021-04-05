const express = require('express');
const router = express.Router();
const Book = require('../models').Book
const {Op} = require("sequelize")

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (err) {
      res.status(500).send(err)
    }
  }
}

router.get('/', (req, res) =>{
    res.redirect('/books/query?page=0&search=')
});

/* GET users listing. */
router.get('/query', asyncHandler(async (req, res) => {

    let query = ''
    let queryFromParam = req.query.search

    if(queryFromParam.length > 0){
        console.log(queryFromParam)
        query = queryFromParam;
    }
    // Pagination setup - number of books per page
    let size = 4;
    // Pagination solution source: https://www.youtube.com/watch?v=QoI_F_Fj8Lo
    const pageAsNumber = Number.parseInt(req.query.page);
    // Parse number from query
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
        page = pageAsNumber;
    }

    const books = await Book.findAndCountAll({
        where: {
            [Op.or]: [
                {title: {
                        [Op.substring]: query,
                    }},
                {author: {
                        [Op.substring]: query,
                    }},
                {genre: {
                        [Op.substring]: query,
                    }},
                {year: {
                        [Op.substring]: query,
                    }},
            ],
        },
        // order: [["id", "ASC"]],
        limit: size,
        offset: page * size
    })

    res.render('index', {
        books: books.rows,
        query,
        current: page,
        pages: Math.ceil(books.count / Number.parseInt(size)),
        title: "Test title"})
        // .redirect(`?page=0&search=`)
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
