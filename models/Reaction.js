const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {},
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
