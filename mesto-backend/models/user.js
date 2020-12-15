const mongoose = require('mongoose');
const npmValidator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /^https?:\/\/[a-z0-9\/\.\-]+#?$/i.test(v); // eslint-disable-line
      },
      message: 'Ссылка некорректна',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return npmValidator.isEmail(v);
      },
      message: 'Email или пароль некорректен',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false, // по умолчанию хеш пароля пользователя не будет возвращаться из базы
    validate: {
      validator(v) {
        return npmValidator.isAlphanumeric(v);
      },
      message: 'Email или пароль некорректен',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
