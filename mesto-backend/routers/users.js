const { Joi, celebrate } = require('celebrate');
const router = require('express').Router();
const {
  getUsers,
  getUser,
  getUserMe,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
}), getUsers);

router.get('/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
}), getUserMe);

router.get('/:id', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
  params: Joi.object().keys({
    id: Joi.string().alphanum().required(),
  }),
}), getUser);

router.patch('/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required(),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^https?:\/\/[a-z0-9\W]+#?$/i, 'url'), // eslint-disable-line
  }),
}), updateUserAvatar);

module.exports = router;
