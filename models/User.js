const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Имя обязательно'],
      trim: true,
      minlength: [2, 'Имя должно быть не короче 2 символов'],
    },
    lastName: {
      type: String,
      required: [true, 'Фамилия обязательна'],
      trim: true,
      minlength: [2, 'Фамилия должна быть не короче 2 символов'],
    },
    username: {
      type: String,
      required: [true, 'Username обязателен'],
      trim: true,
      minlength: [5, 'Username должен быть не короче 5 символов'],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('User', userSchema);
