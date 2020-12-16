const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');
const {
  usersReqValid,
  usersReqInfoValid,
  usersReqAvatarValid,
} = require('../utils/request-validation');

router.get('/', usersReqValid, getUsers);
router.get('/:id', usersReqValid, getUser);
router.get('/me', usersReqValid, getUser);
router.patch('/me', usersReqInfoValid, updateUser);
router.patch('/me/avatar', usersReqAvatarValid, updateUserAvatar);

module.exports = router;
