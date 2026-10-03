const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const { notFoundHandler, errorHandler } = require('./middleware/errors');

const HOST = '127.0.0.1';
const PORT = 3005;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/library';

const app = express();

app.use(express.json());

app.use('/users', usersRouter);
app.use('/books', booksRouter);

app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`MongoDB connected: ${MONGO_URL}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
  });
}

start();
