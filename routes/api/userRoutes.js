const router = require('express').Router();
const { getAllUsers, getUserById } = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers)

// /api/users/:userId
router.route('/:userId').get(getUserById);

module.exports = router;
