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
        };
        const getDay = (month, year) => {
          if (month === 1) {
            if (year % 4 === 0) {
              return Math.floor(Math.random() * 29) + 1;
            } else {
              return Math.floor(Math.random() * 28) + 1;
            }
          } else if (month === 3 || month === 5 || month === 8 || month === 10) {
            return Math.floor(Math.random() * 30) + 1;
          } else {
            return Math.floor(Math.random() * 31) + 1;
          }
        };
        
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        
        let year = Math.floor(Math.random() * (2020 - 2010 + 1)) + 2010;
        let month = Math.floor(Math.random() * 12);
        let day = getDay(month, year);
        let hour = Math.floor(Math.random() * 12) + 1;
        let minute = Math.floor(Math.random() * 60);
        minute = minute < 10 ? '0' + minute : minute;
        let period = Math.random() < 0.5 ? "AM" : "PM";
        date = `${months[month]} ${nth(day)}, ${year} at ${hour}:${minute} ${period}`;

        return date;
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
      id: false
    },
  }
);

thoughtSchema.virtual('reactionCount', () => this.reactions.length);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
