const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Log out the seed data to indicate what should appear in the database
  console.table();
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
