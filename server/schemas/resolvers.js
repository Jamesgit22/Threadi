const { User, Thread, Review } = require('../models');

const resolvers = {
  Query: {
    thread: async (parent, { threadId }) => {
      return Thread.findOne({ _id: threadId });
    },
    friend: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    friends: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate('friends');
    },
    // ADDED---------------------------------------------------------------------
    getUserThreads: async (parent, { userId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }
    
        const threads = await Thread.find({ author: userId });
        return threads;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve user threads');
      }
    },
    // ADDED---------------------------------------------------------------------
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      console.log(user);
      const token = signToken(user);
      console.log(token);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

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

    // FIXED---------------------------------------------------------------------
    deleteThread: async (parent, { threadId }) => {
      try {
        const deletedThread = await Thread.findOneAndDelete({ _id: threadId });
        return deletedThread;
      } catch (err) {
        console.error(err);
      }
    },
    // FIXED---------------------------------------------------------------------

    addThreadCom: async (
      parent,
      { threadId, comText, comAuthor }
    ) => {
      try {
        const addedThreadCom = await Thread.findOneAndUpdate(
          { _id: threadId },
          { $addToSet: { com: { _id: comId } } },
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
      // FIXED---------------------------------------------------------------------
      addThread: async (parent, { title, username }) => {
        try {
          // Find the user by username
          const author = await User.findOne({ username });
      
          // Create the thread with the provided title and author
          const thread = new Thread({
            title,
            author,
            likes: 0,
            reviews: [],
            coms: [],
            timestamp: new Date(),
          });
      
          // Save the thread to the database
          const userThread = await thread.save();
      
          // Update the savedThreads array for the author
          author.userThreads.push(userThread);
          await author.save();
      
          // Return the created thread
          return userThread;
        } catch (err) {
          console.error(err);
        }
      },
      // FIXED---------------------------------------------------------------------

      // ADDED---------------------------------------------------------------------
      addReview : async (parent, { text, title, rating, threadId, userId }) => {
        try {
          const author = await User.findById(userId);
          if (!author) {
            throw new Error('Author not found');
          }
      
          const thread = await Thread.findById(threadId);
          if (!thread) {
            throw new Error('Thread not found');
          }
      
          const review = new Review({
            author,
            text,
            title,
            rating,
            thread,
            dateWatched: new Date(),
            type: 'Default Type',
            timestamp: new Date(),
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
      // ADDED---------------------------------------------------------------------
      deleteReview: async (parent, { reviewId }) => {
        try {
          const review = await Review.findById(reviewId);
          if (!review) {
            throw new Error('Review not found');
          }
      
          const author = await User.findById(review.author);
          if (!author) {
            throw new Error('Author not found');
          }
      
          const thread = await Thread.findById(review.thread);
          if (!thread) {
            throw new Error('Thread not found');
          }
      
          // Remove the review from author's reviews array
          author.reviews = author.reviews.filter((r) => r.toString() !== reviewId);
          await author.save();
      
          // Remove the review from thread's reviews array
          thread.reviews = thread.reviews.filter((r) => r.toString() !== reviewId);
          await thread.save();
      
          // Delete the review from the database
          await Review.findByIdAndDelete(reviewId);
      
          return review;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to delete review');
        }
      },
      // ADDED---------------------------------------------------------------------

  },
};

module.exports = resolvers;
