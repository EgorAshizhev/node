const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Заголовок обязателен'],
      trim: true,
      minlength: [2, 'Заголовок должен быть не короче 2 символов'],
    },
    author: {
      type: String,
      required: [true, 'Автор обязателен'],
      trim: true,
      minlength: [2, 'Автор должен быть не короче 2 символов'],
    },
    year: {
      type: Number,
      required: [true, 'Год выпуска обязателен'],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Book', bookSchema);
