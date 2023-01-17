const router = require('express').Router();
const { getAllThoughts, getThoughtById } = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts)

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById);

module.exports = router;
