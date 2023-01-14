const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const User = model('user', userSchema);

module.exports = User;
