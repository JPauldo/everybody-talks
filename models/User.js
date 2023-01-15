const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    },
    thoughts: [{
      type: Types.ObjectId,
      ref: 'thought'
    }],
    friends: [{
      type: Types.ObjectId,
      ref: 'user',
      validate: {
        validator: (id) => {
          if (id !== this._id || this.friends.includes(id)) {
            return false;
          } else {
            return true;
          }
        },
        message: 'You cannot befriend yourself!'
      }
    }]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
