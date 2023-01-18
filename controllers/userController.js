// ObjectId() method for converting studentId string into an ObjectId for querying database
// const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v');

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-__v')
      .populate('thoughts')
      .populate('friends');

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
    ).select('-__v');

    if (req.body.username && user) {
      await Thought.findOneAndUpdate(
        { username: user.username },
        { username: req.body.username },
        { runValidators: true }
      );
    }

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await User.findOneAndDelete(
      { _id: req.params.userId },
      { new: true }
    ).select('-__v');

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

const postFriendToList = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    ).select('-__v');
    
    const friend = await User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $addToSet: { friends: req.params.userId } },
      { new: true, runValidators: true }
    ).select('-__v');

    const bond = [user, friend];

    res.status(201).json(bond);
  } catch (err) {
    res.status(501).json(err);
  }
};

const deleteFriendFromList = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    ).select('-__v');
    
    const friend = await User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $pull: { friends: req.params.userId } },
      { new: true, runValidators: true }
    ).select('-__v');

    const bond = [user, friend];
    
    res.status(201).json(bond);
  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports = { getAllUsers, getUserById, postUser, putUserById, deleteUserById, postFriendToList, deleteFriendFromList };
