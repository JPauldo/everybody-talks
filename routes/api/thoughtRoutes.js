const router = require('express').Router();
const { getAllThoughts, getThoughtById, postThought, putThoughtById, deleteThoughtById } = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(postThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(putThoughtById).delete(deleteThoughtById);

module.exports = router;
