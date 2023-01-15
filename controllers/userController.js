// ObjectId() method for converting studentId string into an ObjectId for querying database
// const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

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
    const user = await User.findById(req.params.userId).select('-__v');

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllUsers, getUserById };
