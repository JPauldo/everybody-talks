const usersData = [
  { "username": "DragonWarrior", "email": "z_warrior8495@gmail.com" },
  { "username": "PhoenixKnight", "email": "the_boi_who_lived934@gmail.com" },
  { "username": "TigerSamurai", "email": "tony_the_samurai726@gmail.com" },
  { "username": "LionNinja", "email": "ninja_scrolling108@gmail.com" },
  { "username": "WolfShogun", "email": "the_asain_saga75@gmail.com" },
  { "username": "BearPaladin", "email": "griffith_was_right22@gmail.com" },
  { "username": "EagleMage", "email": "dragon_aging_cream09@gmail.com" }
];

const messages = [
  'The company was in a difficult position, caught between a rock and a hard place with the decision to lay off employees or cut costs.',
  'He had a lot on his plate with work, school, and family responsibilities.',
  'She was given a chance to take a bite at the cherry and try out for the lead role in the play.',
  'He cried wolf so many times that no one believed him when there was actually an emergency.',
  'The team got off to a strong start, winning their first game right out of the gate.',
  'The detective was barking up the wrong tree by suspecting the wrong person of the crime.',
  'The manager said you can\'t teach an old dog new tricks and refused to train the older employees.',
  'I\'m drawing a blank when it comes to remembering the answer to that question.',
  'The new product is going to knock your socks off when you see it.',
  'The jig is up, the police are on to your scam.',
  'He was so angry that he was foaming at the mouth.',
  'She\'s a down-to-earth person, easy to talk to and always willing to help.',
  'The new recruit didn\'t cut the mustard, he was just not up to the standards of the team.',
  'He\'s a dog in the manger, he doesn\'t use the equipment himself but he won\'t let anyone else use it either.',
  'She\'s always on the go, a real busy bee.',
  'I\'ll go out on a limb and say that this company will be successful.',
  'The painting cost me an arm and a leg, but it\'s worth it.',
  'Her work is a cut above the rest.',
  'He was an ugly duckling as a child but turned into a handsome swan as an adult.',
  'That was a tricky problem, but you solved it like a son of a gun.'
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr.splice(Math.floor(Math.random() * arr.length), 1)[0];

const getRandomThought = (username, int) => {
  const thoughts = [];

  for (let i = 0; i < int; i++) {
    thoughts.push({
      thoughtText: getRandomArrItem(messages),
      username
    });
  }
  return thoughts;
};

// Export the functions for use in seed.js
module.exports = { usersData, getRandomArrItem, getRandomThought };
