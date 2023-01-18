const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { usersData, getRandomArrItem, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.collection.drop();
  await Thought.collection.drop();

  console.log('collections dropped!');

  let userSet = [];
  let thoughtSet = [];

  console.log();

  for (let i = 0; i < 5; i++) {
    const user = getRandomArrItem(usersData);
    const username = user.username;
    userSet.push(user);

    
    const int = Math.floor(Math.random() * (4 - 2 + 1) + 2);



    thoughtSet = thoughtSet.concat(getRandomThought(username, int));
  }

  await User.create(userSet);
  await Thought.create(thoughtSet);

  const userThoughts = (await Thought.find()).map(thought => {
    return { id: thought._id, username: thought.username };
  });

  for (let i = 0; i < userThoughts.length; i++) {
    const thought = userThoughts[i];
    
    const her = await User.collection.findOneAndUpdate(
      { username: thought.username },
      { $addToSet: { thoughts: thought.id } },
      { new: true, runValidators: true }
    );
  }

  const friendIds = (await User.find()).map(user => user._id);
  
  for (let i = 0; i < friendIds.length; i++) {
    try {
      const id = friendIds[i];
      const userIds = friendIds.filter(friend => friend !== id);
      const userId = getRandomArrItem(userIds);
  
      await User.findByIdAndUpdate(
        { _id: userId },
        { $addToSet: { friends: id } },
        { runValidators: true }
      );
  
      await User.findByIdAndUpdate(
        { _id: id },
        { $addToSet: { friends: userId } },
        { runValidators: true }
      );
    } catch (error) {
      console.error(error);
      continue;
    }
  }

  // Log out the seed data to indicate what should appear in the database
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
