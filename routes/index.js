var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  //   (async () => {
  //       const books = await Book.findAll()
  //       res.json(books)
  //       console.log(books)
  //   })()
    res.redirect(`/books/?page=0&search=`)
});

module.exports = router;
