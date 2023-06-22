const { User, Thread, Review, Com } = require('../models');
const { ObjectId } = require('mongodb');
const { signToken } = require('../utils/auth');
require('dotenv').config();

const resolvers = {
  Query: {
    // thread: async (parent, { threadId }) => {
    //   return Thread.findOne({ _id: threadId });
    // },
    // userThreads: async (parent, { userId }) => {
    //   return Thread.find({ threadAuthor: userId });
    // },
    // friend: async (parent, { userId }) => {
    //   return User.findOne({ _id: userId });
    // },
    // friends: async (parent, { userId }) => {
    //   return User.findOne({ _id: userId }).populate('friends');
    // },

    //comment

    me: async (parent, args, context) => {
      if (!context.user) {
        return null;
      }
      const user = await User.findOne({ _id: context.user._id })
        .populate('reviews')
        .populate('userThreads') // Assuming the threads are stored as references in the user model
        .populate('savedThreads'); // Assuming the reviews are stored as references in the user model

      return user;
    },
    getReviewsByThread: async (_, { threadId }) => {
      try {
        const thread = await Thread.findById(threadId).populate('reviews');
        if (!thread) {
          throw new Error(`Cannot find thread with ID ${threadId}`);
        }
        return { reviews: thread.reviews };
      } catch (error) {
        console.error(error.message);
        throw new Error('Failed to fetch reviews');
      }
    },
    threads: async () => {
      try {
        const allThreads = await Thread.find()
          .sort({ timestamp: -1 })
          .populate('author'); // Assuming you have a model called "Thread"
        return allThreads;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch threads');
      }
    },

    userThreads: async (parent, args, context) => {
      console.log('backend')
      console.log(context.user)
      try {
        const userThreads = await Thread.find({ author: context.user._id });
        console.log(userThreads);

        return userThreads;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch user threads');
      }
    },

    getProfile: async (parent, { username }, context) => {
      
      const user = await User.findOne({ username: username })
        .populate('reviews')
        .populate('userThreads')
        .populate({
          path: 'savedThreads',
          populate: { path: 'author' }
        });

      return user;
    },

    singleThread: async (parent, { threadId }, context) => {
      try {
        console.log(threadId);
        const thread = await Thread.findById(threadId)
          .populate('author')
          .populate({
            path: 'reviews',
            populate: { 
              path: 'author' 
            }
          })
          .populate({
            path: 'coms',
            populate: {
              path: 'author'
            }
          });

          console.log(thread);

        return thread;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch thread');
      }
    },

    reviews: async () => {
      try {
        const allReviews = await Review.find();
        return allReviews;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch reviews');
      }
    },

    singleReview: async (_, { reviewId }) => {
      try {
        const review = await Review.findById(reviewId).populate({
          path: 'coms',
          populate: {
            path: 'author',
            model: 'User',
          },
        });
        if (!review) {
          throw new Error('Review not found');
        }
        return review;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch review');
      }
    },

    getThreadComs: async (parent, { id }, context) => {
      try {
        const thread = await Thread.findById(id)
          .populate({
            path: 'coms',
            populate: { path: 'coms' }
          });

        return thread;
      } catch (err) {
        console.log(err);
      }
    },
    getReviewComs: async (parent, { id }, context) => {
      try {
        const review = await Review.findById(id)
          .populate({
            path: 'coms',
            populate: { path: 'coms' }
          });

        return review;
      } catch (err) {
        console.log(err);
      }
    },
    getComComs: async (parent, { id }, context) => {
      try {
        const com = await Com.findById(id)
          .populate({
            path: 'coms',
            populate: { path: 'coms' }
          });

        return com;
      } catch (err) {
        console.log(err);
      }
    },
    reviewComs: async (_, { reviewId }) => {
      try {
        const review = await Review.findById(reviewId);
        if (!review) {
          throw new Error('Review not found');
        }

        // Fetch comments and replies for the review
        const comments = await Com.find({
          parent: reviewId,
          parentType: 'Review',
        }).populate('author');

        return comments;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch comments');
      }
    },

    threadComs: async (_, { threadId }) => {
      try {
        const thread = await Thread.findById(threadId);
        if (!thread) {
          throw new Error('Thread not found');
        }

        // Fetch comments and replies for the thread
        const comments = await Com.find({
          parent: threadId,
          parentType: 'Thread',
        }).populate('author');

        return comments;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch comments');
      }
    },

    replyComs: async (parent, _, { Com }) => {
      try {
        const comments = await Com.find({
          parent: parent._id,
          parentType: 'Comment',
        }).populate('author');
        return comments;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch comments');
      }
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
      console.log('backend');
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('No profile with this username found!');
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
    saveThread: async (parent, { threadId }, context) => {
      if (!context.user) {
        throw new Error('You need to be logged in to perform this action.');
      }
      if (!threadId) {
        throw new Error('Invalid thread ID.');
      }
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedThreads: threadId } },
          { new: true }
        );
        return updatedUser;
      } catch (err) {
        console.error(err);
        throw new Error('Failed to save the thread.');
      }
    },

    deleteSavedThread: async (parent, { threadId }, context) => {
      if (!context.user) {
        throw new Error('You need to be logged in to perform this action.');
      }
      if (!threadId) {
        throw new Error('Invalid thread ID.');
      }
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedThreads: threadId } },
          { new: true }
        );
        return updatedUser;
      } catch (err) {
        console.error(err);
        throw new Error('Failed to delete the saved thread.');
      }
    },




    // WORKS---------------------------------------------------------------------
    deleteThread: async (_, { threadId }) => {
      try {
        const deletedThread = await Thread.findOneAndDelete({ _id: threadId });
        await Review.deleteMany({ thread: threadId });
        await Comment.deleteMany({ parent: threadId, parentType: 'Thread' });

        return deletedThread;
      } catch (err) {
        console.error(err);
      }
    },
    // WORKS---------------------------------------------------------------------

    // WORKS---------------------------------------------------------------------
    addThreadCom: async (
      parent,
      { threadId, comText, comAuthor },
      { models }
    ) => {
      try {
        const thread = await Thread.findById(threadId);
        if (!thread) {
          throw new Error('thread not found');
        }

        // Create a new comment
        const comment = new Com({
          text: comText,
          author: comAuthor,
          parentType: 'Thread', // Provide the appropriate value for parentType
          parent: threadId, // Provide the appropriate value for parent
          timestamp: new Date(), // Provide the appropriate value for timestamp
        });

        await comment.save();

        // Update the reference in the review
        thread.coms.push(comment);
        await thread.save();

        return comment;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to add comment to thread');
      }
    },
    // WORKS---------------------------------------------------------------------

    // WORKS---------------------------------------------------------------------
    deleteThreadCom: async (parent, { threadId, comId }) => {
      return Thread.findOneAndDelete(
        { _id: threadId },
        { $pull: { com: { _id: comId } } },
        { new: true }
      );
    },
    // WORKS---------------------------------------------------------------------

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
    addThread: async (parent, { title, description }, context) => {
      console.log(title);
      console.log(context.user);

      if (!context.user) {
        throw new Error('You need to be logged in to perform this action.');
      }
      if (!title || Object.keys(title).length === 0) {
        throw new Error('Invalid thread data.');
      }

      try {
        const newThread = new Thread({
          title: title,
          description: description,
          author: context.user._id,
          timestamp: new Date()
        });

        await newThread.save();

        const author = await User.findOneAndUpdate(
          { username: context.user.username },
          { $addToSet: { userThreads: newThread._id } },
          { new: true }
        );

        return author;
      } catch (err) {
        console.error(err);
        throw new Error('Failed to create a new thread.');
      }
    },

    //     // Create the thread with the provided title and author
    //     const thread = new Thread({
    //       title,
    //       description,
    //       author,
    //       likes: 0,
    //       timestamp: Date.now(),
    //       reviews: [],
    //       coms: [],
    //     });

    //     // Save the thread to the database
    //     const savedThread = await thread.save();

    //     // Update the savedThreads array for the author
    //     author.savedThreads.push(savedThread);
    //     await author.save();

    //     // Return the created thread
    //     return savedThread;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },
    // WORKS---------------------------------------------------------------------

    updateThread: async (parent, { threadId, title }) => {
      return Thread.findOneAndUpdate(
        { _id: threadId },
        { $set: { title, description } },
        { new: true }
      );
    },

    // WORKS---------------------------------------------------------------------
    addReview: async (_, { title, text, threadId, date, rating, image }, context) => {
      try {
        const author = await User.findById(context.user._id);
        if (!author) {
          throw new Error('Author not found');
        }

        const thread = await Thread.findById(threadId);
        if (!thread) {
          throw new Error('Thread not found');
        }



        const review = new Review({
          author: context.user._id,
          title,
          image: image || '',
          text,
          thread,
          date: new Date(date), // Example: Set the current date as the value for the 'date' field
          rating: rating || 0, // Example: Set a rating value
          type: 'Media', // Example: Set a type value
          timestamp: Date.now()
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

    updateReview: async (parent, { reviewId, text }) => {
      return Review.findOneAndUpdate(
        { _id: reviewId },
        { $set: { text } },
        { new: true }
      );
    },

    // WORKS---------------------------------------------------------------------
    addReviewCom: async (
      parent,
      { reviewId, comText, comAuthor },
      { models }
    ) => {
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

    // WORKS---------------------------------------------------------------------
    deleteReview: async (parent, { reviewId }) => {
      try {
        // Find the review and store it in deletedReview variable
        const deletedReview = await Review.findOneAndDelete({ _id: reviewId });

        // Delete the associated comments
        await Comment.deleteMany({ reviewId: deletedReview._id });

        // Return the deleted review
        return deletedReview;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to delete review');
      }
    },
    // WORKS---------------------------------------------------------------------

    // WORKS---------------------------------------------------------------------
    deleteReviewCom: async (parent, { reviewId, comId }) => {
      return Review.findOneAndUpdate(
        { _id: reviewId },
        { $pull: { com: { _id: comId } } },
        { new: true }
      );
    },
    // WORKS---------------------------------------------------------------------
  },
};

module.exports = resolvers;
