const { Thought, User } = require('../models');
const { exists } = require('../models/User');

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();

    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getThoughtById = async (req, res) => {
  try {
    console.log(req.params.thoughtId);
    const thought = await Thought.findById(req.params.thoughtId).select('-__v');
    console.log(thought);
    
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = { getAllThoughts, getThoughtById };
