const db = require('../config/connection');
const { User, Com, Review, Thread, Parent, Like } = require('../models');
const userSeeds = require('./userSeeds.json');
const threadSeeds = require('./threadSeeds.json');
const reviewSeeds = require('./reviewSeeds.json');
const comSeeds = require('./comSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Com.deleteMany({});
    await Thread.deleteMany({});
    await Review.deleteMany({});
    await Parent.deleteMany({});
    await Like.deleteMany({});

    await User.create(userSeeds);

    //index map:
    //0: Jame's thread
    //1: Kolt's thread
    //2-7: reviews
    //8-15: comments
    var parentIDs = [];

    for (let i = 0; i < threadSeeds.length; i++) {
      const { _id, author } = await Thread.create(threadSeeds[i]);

      const user = await User.findOneAndupdate(
        { username: author },
        {
          $addToSet: {
            userThreads: _id
          }
        }
      )

      parentIDs.push(_id);
    };

    for (let i = 0; i < reviewSeeds.length; i++) {
      const { _id, author } = await Review.create(reviewSeeds[i]);

      const threadID = (author === "JimothyS") ? 0 : (author === "Eden") ? 1 : null;

      const user = await User.findOneAndupdate(
        { username: author },
        {
          $addToSet: {
            reviews: _id
          }
        }
      );

      const thread = await Thread.findOneAndupdate(
        { _id: parentIDs[threadID]},
        {
          $addToSet: {
            reviews: _id
          }
        }
      );

      parentIDs.push(_id);
    }

    for (let i = 0; i < comSeeds.length; i++) {
      const { _id, author } = await Com.create(comSeeds[i]);

      const user = await User.findOneAndupdate(
        { username: author },
        {
          $addToSet: {
            coms: _id
          }
        }
      );
    }
    
    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
