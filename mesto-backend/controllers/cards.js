const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

// получение всех карточек
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.send(data))
    .catch(next); // эквивалентна .catch(err => next(err));
};

// создание карточки
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

// удаление карточки
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (card.owner !== req.user._id) { // свойство user добавлено при авторизации
        throw new ForbiddenError('Недостаточно прав');
      }
      return Card.deleteOne({ _id: cardId })
        .then((response) => {
          if (response.deletedCount !== 0) {
            return res.status(200).send({ message: 'Карточка удалена' });
          }
          throw new NotFoundError('Карточка не найдена');
        });
    })
    .catch(next);
};

// добавление лайка карточке
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      throw new NotFoundError('Карточка не найдена');
    })
    .catch(next);
};

// удаление лайка карточки
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      throw new NotFoundError('Карточка не найдена');
    })
    .catch(next);
};
