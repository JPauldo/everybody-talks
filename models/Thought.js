const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: [1, 'Not enough characters...'],
      maxLength: [280, 'Character limit of 280 exceed!']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        const nth = (d) => {
          if (d > 3 && d < 21) {
            return `${d}th`;
          } else {
            switch (d % 10) {
              case 1:
                return `${d}st`;
              case 2:
                return `${d}nd`;
              case 3:
                return `${d}rd`;
              default:
                return `${d}th`;
            }
          }
        }
        
        const dateNum = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const time = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

        return `${month} ${nth(dateNum)}, ${year} at ${time}`;
      }
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema.virtual('reactionCount', () => this.reactions.length);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
