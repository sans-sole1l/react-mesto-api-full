const mongoose = require('mongoose');
const User = require('../models/user');

// получение всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => res.send(data))
    .catch(() => {
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
    });
};

// получение пользователя по ID
module.exports.getUser = (req, res) => {
  const { id } = req.params;

  if (mongoose.Types.ObjectId.isValid(id)) { // проверяем валидность входящего строкового id
    const userId = mongoose.Types.ObjectId(id); // если валиден, то конвертируем тип id в ObjectId
    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'Нет пользователя с таким id' });
        }
        return res.send(user);
      })
      .catch(() => {
        res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      });
  } else {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
};

// создание нового пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch(() => res.status(400).send({ message: 'Неверный запрос' }));
};

// обновление пользовательских данных
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.updateOne(
    { _id: userId },
    { name, about },
    { runValidators: true }, // метод update не валидирует данные при обновлении по умолчанию
  )
    .then(() => res.status(200).send({ name, about }))
    .catch(() => res.status(400).send({ message: 'Неверный запрос' }));
};

// обновление аватара пользователя
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.updateOne(
    { _id: userId },
    { avatar },
    { runValidators: true }, // метод update не валидирует данные при обновлении по умолчанию
  )
    .then(() => res.status(200).send({ avatar }))
    .catch(() => res.status(400).send({ message: 'Неверный запрос' }));
};
