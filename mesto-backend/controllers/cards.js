const Card = require('../models/card');

// получение всех карточек
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => res.send(data))
    .catch(() => {
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
    });
};

// создание карточки
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch(() => res.status(400).send({ message: 'Неверный запрос' }));
};

// удаление карточки
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.deleteOne({ _id: cardId })
    .then((response) => {
      if (response.deletedCount !== 0) {
        return res.status(200).send({ message: 'Карточка удалена' });
      }
      return res.status(404).send({ message: 'Карточка не найдена' });
    })
    .catch(() => res.status(404).send({ message: 'Карточка не найдена' }));
};

// добавление лайка карточке
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      return res.status(404).send({ message: 'Карточка не найдена' });
    })
    .catch(() => res.status(400).send({ message: 'Неверный запрос' }));
};

// удаление лайка карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      return res.status(404).send({ message: 'Карточка не найдена' });
    })
    .catch(() => res.status(400).send({ message: 'Неверный запрос' }));
};
