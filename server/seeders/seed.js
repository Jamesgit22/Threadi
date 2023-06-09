const db = require("../config/connection");
const { User, Com, Review, Thread, Like } = require("../models");
const userSeeds = require("./userSeeds.json");
const threadSeeds = require("./threadSeeds.json");
const reviewSeeds = require("./reviewSeeds.json");
const comSeeds = require("./comSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Com.deleteMany({});
    await Thread.deleteMany({});
    await Review.deleteMany({});
    await Like.deleteMany({});

    await User.create(userSeeds);

    //index map:
    //0: Jame's thread
    //1: Kolt's thread
    var threadIDs = [];
    var parentIDs = [];
    var userIDs = [];

    for (let i = 0; i < threadSeeds.length; i++) {
      const { _id } = await Thread.create(threadSeeds[i]);

      if (i === 0) {
        const user = await User.findOneAndUpdate(
          { username: "JimothyS" },
          {
            $addToSet: {
              userThreads: _id,
            },
          }
        );

        userIDs.push(user._id);

        const updateThread = await Thread.findOneAndUpdate(
          { _id: _id },
          {
            author: user._id,
          }
        );
      } else {
        const user = await User.findOneAndUpdate(
          { username: "Eden" },
          {
            $addToSet: {
              userThreads: _id,
            },
          }
        );

        userIDs.push(user._id);

        const updateThread = await Thread.findOneAndUpdate(
          { _id: _id },
          {
            author: user._id,
          }
        );
      }

      threadIDs.push(_id);
      parentIDs.push({ id: _id, type: "Thread" });
    }

    for (let i = 0; i < reviewSeeds.length; i++) {
      const { _id } = await Review.create(reviewSeeds[i]);

      let currentUser = userIDs[Math.floor(Math.random() * 2)];
      let currentThread;

      if (currentUser === userIDs[0]) {
        currentThread = threadIDs[0];
      } else {
        currentThread = threadIDs[1];
      }

      const user = await User.findOneAndUpdate(
        { _id: currentUser },
        {
          $addToSet: {
            reviews: _id,
          },
        }
      );

      const thread = await Thread.findOneAndUpdate(
        { _id: currentThread },
        {
          $addToSet: {
            reviews: _id,
          },
        }
      );

      const updateReview = await Review.findOneAndUpdate(
        { _id: _id },
        {
          author: currentUser,
        }
      );

      parentIDs.push({ id: _id, type: "Review" });
    }

    for (let i = 0; i < comSeeds.length; i++) {
      try {
        const currentParent = Math.floor(
          Math.random() * (parentIDs.length)
        );
        const { timestamp, text } = comSeeds[i];
        const { _id } = await Com.create({ timestamp, text, parent: parentIDs[currentParent].id, parentType: parentIDs[currentParent].type });

        let currentUser = userIDs[Math.floor(Math.random() * 2)];

        const user = await User.findOneAndUpdate(
          { _id: currentUser },
          {
            $addToSet: {
              coms: _id,
            },
          }
        );

        parentIDs.push({ id: _id, type: "Com" });

       

        const com = await Com.findOneAndUpdate(
          { _id: parentIDs[parentIDs.length - 1].id },
          {
            // parent: parentIDs[currentParent].id, 
            // parentType: parentIDs[currentParent].type,
            author: currentUser,
          },
          { new: true }
        );

        console.log(com);

        switch (parentIDs[currentParent].type) {
          case "Thread": {
            try {
              const addThread = await Thread.findOneAndUpdate(
                { _id: parentIDs[currentParent].id },
                {
                  $addToSet: {
                    com: _id,
                  },
                }
              );
            } catch (err) {
              console.log(err);
            }
            break;
          }
          case "Review": {
            try {
              const addReview = await Review.findOneAndUpdate(
                { _id: parentIDs[currentParent].id },
                {
                  $addToSet: {
                    com: _id,
                  },
                }
              );
            } catch (err) {
              console.log(err);
            }
            break;
          }
          case "Com": {
            try {
              const addCom = await Com.findOneAndUpdate(
                { _id: parentIDs[currentParent].id },
                {
                  $addToSet: {
                    com: _id,
                  },
                }
              );
            } catch (err) {
              console.log(err);
            }
            break;
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});

// const db = require('../config/connection');
