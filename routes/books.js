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

module.exports = router;
