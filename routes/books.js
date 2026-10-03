const Book = require('../models/Book');
const createCrudRouter = require('./crud');

module.exports = createCrudRouter(Book, 'Book');
