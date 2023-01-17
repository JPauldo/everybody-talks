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
};

const postThought = async (req, res) => {
  try {
    if(await User.exists({ username: req.body.username })) {
      const thought = await Thought.create(req.body);

      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true, runValidators: true }
      )
  
      const userThought = [thought, user]
  
      res.status(201).json(userThought);
    }
    else {
      res.status(404).json({ message: `Could not find user '${req.body.username}'` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const putThoughtById = async (req, res) => {
  try {
    if(req.body.username) {
        res.status(404).json({ message: `Cannot change the username.` });
    }
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      req.body,
      { new: true, runValidators: true }
    );

    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId });

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const postReaction = async (req, res) => {
  try {
    if (await User.exists({ username: req.body.username })) {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true, runValidators: true }
      );

      res.status(201).json(reaction);
    }
    else {
      res.status(404).json({ message: `Could not find user '${req.body.username}'` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteReaction = async (req, res) => {
  try {
    const reaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionId } },
      { new: true, runValidators: true }
    );

    res.status(200).json(reaction);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllThoughts, getThoughtById, postThought, putThoughtById, deleteThoughtById, postReaction, deleteReaction };
