const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/[a-z0-9\/\.\-]+#?$/i.test(v); // eslint-disable-line
      },
      message: 'Ссылка некорректна',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
