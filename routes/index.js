const express = require('express');
const router = express.Router();

/* Redirect route for initial query. */
router.get('/', function(req, res, next) {
    res.redirect(`/books/?page=0&search=`)
});

module.exports = router;
