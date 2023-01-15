const router = require('express').Router();
const { getAllUsers, getUserById, postUser, putUserById, deleteUserById, postFriendToList, deleteFriendFromList } = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(postUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).put(putUserById).delete(deleteUserById);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(postFriendToList).delete(deleteFriendFromList);

module.exports = router;
