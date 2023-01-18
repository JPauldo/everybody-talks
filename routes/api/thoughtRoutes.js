const router = require('express').Router();
const { getAllThoughts, getThoughtById, postThought, putThoughtById, deleteThoughtById, postReaction, deleteReaction } = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(postThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(putThoughtById).delete(deleteThoughtById);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(postReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
