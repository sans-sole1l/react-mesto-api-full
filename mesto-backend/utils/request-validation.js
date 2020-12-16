const { celebrate, Joi } = require('celebrate');

module.exports.authReqValidation = () => {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().alphanum().required().min(8),
    }),
  });
};

module.exports.cardsReqValid = () => {
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }),
  });
};

module.exports.cardsReqBodyValid = () => {
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(/^https?:\/\/[a-z0-9\/\.\-]+#?$/i, 'url'), // eslint-disable-line
    }),
  });
};

module.exports.cardsReqParamsValid = () => {
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }),
    params: Joi.object().keys({
      postId: Joi.string().alphanum().length(24).required(),
    }),
  });
};

module.exports.usersReqValid = () => {
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }),
  });
};

module.exports.usersReqInfoValid = () => {
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required(),
    }),
  });
};

module.exports.usersReqAvatarValid = () => {
  celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().required(),
    }),
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(/^https?:\/\/[a-z0-9\/\.\-]+#?$/i, 'url'), // eslint-disable-line
    }),
  });
};
