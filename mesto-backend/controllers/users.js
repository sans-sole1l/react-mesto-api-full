const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');

// получение всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send(data))
    .catch(next); // эквивалентна .catch(err => next(err));
};

// получение пользователя по ID
module.exports.getUser = (req, res, next) => {
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) { // проверяем валидность входящего строкового id
    const userId = mongoose.Types.ObjectId(id); // если валиден, то конвертируем тип id в ObjectId
    User.findById(userId)
      .then((user) => {
        if (!user) {
          throw new NotFoundError('Нет пользователя с таким id');
        }
        return res.send(user);
      })
      .catch(next);
  } else {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
};

// получение текущего пользователя
module.exports.getUserMe = (req, res, next) => {
  const currentUserId = mongoose.Types.ObjectId(req.user._id);
  User.findById(currentUserId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send(user);
    })
    .catch(next);
};

// login пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password') // добавляем в объект user хеш пароля
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          const { JWT_SECRET } = process.env;
          const NODE_ENV = 'dev';
          const token = jwt.sign( // создаем токен
            { _id: user._id }, // Пейлоуд токена — зашифрованный в строку объект пользователя
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', // секретный ключ подписи для шифрования
            { expiresIn: '7d' },
          );
          return res.status(200).send({ token });
          // return res.status(200).cookie('jwt', token, {
          //   maxAge: 3600000,
          //   httpOnly: true,
          // });
        });
    })
    .catch(next);
};

// создание нового пользователя
module.exports.createUser = (req, res, next) => {
  const { email, password } = req.body;

  // хешируем пароль
  // 10 - длина «соли» — случайной строки, которую метод добавит к паролю перед хешированием
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ // создаем пользователя
        email, password: hash, // записываем хеш в базу
      })
        .then((user) => res.status(200).send(user))
        .catch(next);
    })
    .catch(next);
};

// обновление пользовательских данных
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findOneAndUpdate(
    { _id: userId },
    { name, about },
    { new: true },
  )
    .then((user) => res.status(200).send(user))
    .catch(next);
};

// обновление аватара пользователя
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.updateOne(
    { _id: userId },
    { avatar },
    { runValidators: true }, // метод update не валидирует данные при обновлении по умолчанию
  )
    .then(() => res.status(200).send({ avatar }))
    .catch(next);
};
