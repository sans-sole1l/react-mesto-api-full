const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  cardsReqValid,
  cardsReqBodyValid,
  cardsReqParamsValid,
} = require('../utils/request-validation');

router.get('/', cardsReqValid, getCards);
router.post('/', cardsReqBodyValid, createCard);
router.delete('/:cardId', cardsReqParamsValid, deleteCard);
router.put('/:cardId/likes', cardsReqParamsValid, likeCard);
router.delete('/:cardId/likes', cardsReqParamsValid, dislikeCard);

module.exports = router;
