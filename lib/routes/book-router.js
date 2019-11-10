'use strict';

const express = require('express');
const router = express.Router();

let books = [
  { title: 'Brave New World', auth: ['admin'] },
  { title: 'Hamlet', auth: ['admin', 'editor'] },
  { title: 'Alice in Wonderland', auth: ['admin', 'editor', 'user'] }
];

/**
 * @route GET /books
 * @param {object} req
 * @param  {object} res 200. respond the list of book in library and their count
 * @param {function} next we do not using it here
 */
// TODO Edit code (see lab README)
router.get('/books', (req, res, next) => {

  //if(books.auth === 'admin')
  let library = {
    count: books.length,
    results: books
  };
  res.status(200).json(library);
});
/**
 * @route GET /books/:index
 * @param {object} req  request for the index of books
 * @param {object} res  200. returns books or send not found
 */
// TODO Edit code (see lab README)
router.get('/books/:indx', (req, res, next) => {
  if (req.params.indx < books.length) {
    let book = books[req.params.indx];
    res.status(200).json(book);
  } else {
    res.send('Book not Found');
  }
});

module.exports = router;
