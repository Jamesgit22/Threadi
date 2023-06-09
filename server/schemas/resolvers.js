const { User, Thread, Review, Com } = require('../models');
const { ObjectId } = require('mongodb');

const resolvers = {
  // Com: {
  //   parent: async (com) => {
  //     const ParentModel = mongoose.model(com.parentType);
  //     return await ParentModel.findById(com.parent);
  //   },
  // },
  // Review: {
  //   parent: async (com) => {
  //     const ParentModel = mongoose.model(com.parentType);
  //     return await ParentModel.findById(com.parent);
  //   },
  // },
  // Thread: {
  //   parent: async (com) => {
  //     const ParentModel = mongoose.model(com.parentType);
  //     return await ParentModel.findById(com.parent);
  //   },
  // },


  Query: {
    thread: async (parent, { threadId }) => {
      return Thread.findOne({ _id: threadId });
    },
    userThreads: async (parent, { userId }) => {
      return Thread.find({ threadAuthor: userId });
    },
    friend: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    friends: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate('friends');
    },
  },

  Mutation: {
    // WORKS---------------------------------------------------------------------
    addUser: async (parent, args) => {
      const user = await User.create(args);
      console.log(user);
      const token = signToken(user);
      console.log(token);
      return { token, user };
    },
    // WORKS---------------------------------------------------------------------

    // WORKS---------------------------------------------------------------------
    login: async (parent, { username, password }) => {
      console.log("backend");
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    // WORKS---------------------------------------------------------------------

    likeThread: async (parent, { threadId }) => {
      try {
        const updatedThread = await Thread.findOneAndUpdate(
          { _id: threadId },
          { $inc: { likes: 1 } },
          { new: true }
        );
        return updatedThread;
      } catch (err) {
        console.error(err);
      }
    },
    unlikeThread: async (parent, { threadId }) => {
      try {
        const updatedThread = await Thread.findOneAndUpdate(
          { _id: threadId },
          { $inc: { likes: -1 } },
          { new: true }
        );
        return updatedThread;
      } catch (err) {
        console.error(err);
      }
    },
    likeCom: async (parent, { comId }) => {
      try {
        const updatedCom = await Com.findOneAndUpdate(
          { _id: comId },
          { $inc: { likes: 1 } },
          { new: true }
        );
        return updatedCom;
      } catch (err) {
        console.error(err);
      }
    },
    unlikeCom: async (parent, { comId }) => {
      try {
        const updatedCom = await Com.findOneAndUpdate(
          { _id: comId },
          { $inc: { likes: -1 } },
          { new: true }
        );
        return updatedCom;
      } catch (err) {
        console.error(err);
      }
    },
    likeReview: async (parent, { reviewId }) => {
      try {
        const updatedReview = await Review.findOneAndUpdate(
          { _id: reviewId },
          { $inc: { likes: 1 } },
          { new: true }
        );
        return updatedReview;
      } catch (err) {
        console.error(err);
      }
    },
    unlikeReview: async (parent, { reviewId }) => {
      try {
        const updatedReview = await Review.findOneAndUpdate(
          { _id: reviewId },
          { $inc: { likes: -1 } },
          { new: true }
        );
        return updatedReview;
      } catch (err) {
        console.error(err);
      }
    },
    saveThread: async (parent, { userId, threadId }) => {
      try {
        const savedThread = await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { savedThreads: { _id: threadId } } },
          { new: true }
        );
        return savedThread;
      } catch (err) {
        console.error(err);
      }
    },

    // WORKS---------------------------------------------------------------------
    deleteThread: async (parent, { threadId }) => {
      try {
        const deletedThread = await Thread.findOneAndDelete({ _id: threadId });
        return deletedThread;
      } catch (err) {
        console.error(err);
      }
    },
    // WORKS---------------------------------------------------------------------

    addThreadCom: async (parent, { threadId, comText, comAuthor }) => {
      try {
        const comment = { _id: new ObjectId(), comText, comAuthor }; // Create a new comment object with unique _id
        const addedThreadCom = await Thread.findOneAndUpdate(
          { _id: threadId },
          { $addToSet: { com: comment } },
          { new: true }
        );
        return addedThreadCom;
      } catch (err) {
        console.error(err);
      }
    },
     
    deleteThreadCom: async (parent, { threadId, comId }) => {
      return Thread.findOneAndDelete(
        { _id: threadId },
        { $pull: { com: { _id: comId } } },
        { new: true }
      );
    },
    // Add a friend
    addFriend: async (parent, { userId, friendId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { friends: { _id: friendId } } },
        { new: true }
      );
    },
    // Delete a friend
    deleteFriend: async (parent, { userId, friendId }) => {
        return User.findOneAndUpdate(
          { _id: userId },
          { $pull: { friends: { _id: friendId } } },
          { new: true }
        );
      },

      // create a thread
      // WORKS---------------------------------------------------------------------
      addThread: async (parent, { title, username }) => {
        try {
          // Find the user by username
          const author = await User.findOne({ username });
      
          // Create the thread with the provided title and author
          const thread = new Thread({
            title,
            author,
            likes: 0,
            timestamp: Date.now(),
            reviews: [],
            coms: [],
          });
      
          // Save the thread to the database
          const savedThread = await thread.save();
      
          // Update the savedThreads array for the author
          author.savedThreads.push(savedThread);
          await author.save();
      
          // Return the created thread
          return savedThread;
        } catch (err) {
          console.error(err);
        }
      },
      // WORKS---------------------------------------------------------------------

      // WORKS---------------------------------------------------------------------
      addReview: async (_, { authorId, title, text, threadId }, { models }) => {
        try {
          const author = await User.findById(authorId);
          if (!author) {
            throw new Error('Author not found');
          }
      
          const thread = await Thread.findById(threadId);
          if (!thread) {
            throw new Error('Thread not found');
          }
      
          const review = new Review({
            author,
            title,
            text,
            thread,
            date: new Date(), // Example: Set the current date as the value for the 'date' field
            rating: 0, // Example: Set a rating value
            type: 'Media', // Example: Set a type value
            timestamp: Date.now() // Example: Set the current timestamp as the value for the 'timestamp' field
          });
      
          await review.save();
      
          // Update references
          author.reviews.push(review);
          await author.save();
      
          thread.reviews.push(review);
          await thread.save();
      
          return review;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to add review');
        }
      },
      // WORKS---------------------------------------------------------------------
   
      // WORKS---------------------------------------------------------------------
      addReviewCom: async (parent, { reviewId, comText, comAuthor }, { models }) => {
        try {
          const review = await Review.findById(reviewId);
          if (!review) {
            throw new Error('Review not found');
          }
        
          // Create a new comment
          const comment = new Com({
            text: comText,
            author: comAuthor,
            parentType: 'Review', // Provide the appropriate value for parentType
            parent: reviewId, // Provide the appropriate value for parent
            timestamp: new Date(), // Provide the appropriate value for timestamp
          });
        
          await comment.save();
        
          // Update the reference in the review
          review.coms.push(comment);
          await review.save();
        
          return comment;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to add comment to review');
        }
      },
      // WORKS---------------------------------------------------------------------

  },
};

module.exports = resolvers;
