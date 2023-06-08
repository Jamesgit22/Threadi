const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const User = require('../models/User');
const Like = require('../models/Like');
const Parent = require('../models/Parent');
const Review = require('../models/Review');
const Com = require('../models/Com');
const Thread = require('../models/Thread');
const ObjectId = mongoose.Types.ObjectId;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/threadieDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Generate fake data for the User type
const generateUser = () => new User({
  _id: new ObjectId(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  friends: [],
  reviews: [],
  savedThreads: [],
  likes: [],
  coms: [],
});

// Generate fake data for the Like type
const generateLike = () => new Like({
  _id: new ObjectId(),
  user: generateUser(),
  review: null, // Fill this in with relevant data if needed
  thread: null, // Fill this in with relevant data if needed
  com: null, // Fill this in with relevant data if needed
});

// Generate fake data for the Parent type
const generateParent = () => new Parent({
  _id: new ObjectId(),
  review: null, // Fill this in with relevant data if needed
  thread: null, // Fill this in with relevant data if needed
  com: null, // Fill this in with relevant data if needed
});

// Generate fake data for the Review type
const generateReview = () => new Review({
  _id: new ObjectId(),
  author: generateUser(),
  text: faker.lorem.paragraph(),
  rating: faker.number.int({ min: 1, max: 5 }),
  likes: faker.number.int({ min: 0, max: 100 }),
  thread: null, // Fill this in with relevant data if needed
  coms: [], // Fill this in with relevant data if needed
  date: faker.date.recent().toISOString(),
});

// Generate fake data for the Com type
const generateCom = () => new Com({
  _id: new ObjectId(),
  author: generateUser(),
  text: faker.lorem.sentence(),
  parent: generateParent(),
  likes: faker.number.int({ min: 0, max: 100 }),
  coms: [], // Fill this in with relevant data if needed
});

// Generate fake data for the Thread type
const generateThread = () => new Thread({
  _id: new ObjectId(),
  title: faker.lorem.sentence(),
  author: generateUser(),
  likes: faker.number.int({ min: 0, max: 100 }),
  reviews: [], // Fill this in with relevant data if needed
  coms: [], // Fill this in with relevant data if needed
});

// Generate fake data for the entire schema
const generateData = async () => {
  const user = generateUser();
  const like = generateLike();
  const parent = generateParent();
  const review = generateReview();
  const com = generateCom();
  const thread = generateThread();

  // Save the instances to the database
  await Promise.all([
    user.save(),
    like.save(),
    parent.save(),
    review.save(),
    com.save(),
    thread.save(),
  ]);

  return {
    User: user,
    Like: like,
    Parent: parent,
    Review: review,
    Com: com,
    Thread: thread,
  };
};

// Example usage:
generateData()
  .then(fakeData => console.log(fakeData))
  .catch(error => console.error(error));

