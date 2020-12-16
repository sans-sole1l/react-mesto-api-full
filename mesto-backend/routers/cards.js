const { Joi, celebrate } = require('celebrate');
const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
}), getCards);

router.post('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/\/[a-z0-9\W\_]+#?$/i, 'url'), // eslint-disable-line
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).required(),
  }),
}), dislikeCard);

module.exports = router;
