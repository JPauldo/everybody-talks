const router = require('express').Router();
const { getAllUsers, getUserById, postUser, putUserById, delUserById } = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(postUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).delete(delUserById);

module.exports = router;
