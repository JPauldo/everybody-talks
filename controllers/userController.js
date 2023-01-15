// ObjectId() method for converting studentId string into an ObjectId for querying database
// const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-__v').populate('thoughts');

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const postUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const putUserById = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { runValidators: true }
    );

    if (req.body.username) {
      await Thought.findOneAndUpdate(
        { username: user.username },
        { username: req.body.username }
      );
    }

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const delUserById = async (req, res) => {
  try {
    const user = await User.findOneAndDelete(
      { _id: req.params.userId },
      { new: true }
    );

    await User.updateMany(
      { friends: { $elemMatch: { $eq: req.params.userId } } },
      { $pull: { friends: req.params.userId } }
    );
    
    if (user) {
      await Thought.findOneAndDelete({ username: user.username });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports = { getAllUsers, getUserById, postUser, putUserById, delUserById };
