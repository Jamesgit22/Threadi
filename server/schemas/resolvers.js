const { User, Thread } = require('../models');

const resolvers = {
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
    // likeThread: async (parent, { threadId }) => {
    //   try {
    //     const updatedThread = await Thread.findOneAndUpdate(
    //       { _id: threadId },
    //       { $inc: { likes: 1 } },
    //       { new: true }
    //     );
    //     return updatedThread;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },
    // unlikeThread: async (parent, { threadId }) => {
    //   try {
    //     const updatedThread = await Thread.findOneAndUpdate(
    //       { _id: threadId },
    //       { $inc: { likes: -1 } },
    //       { new: true }
    //     );
    //     return updatedThread;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },
    // likeCom: async (parent, { comId }) => {
    //   try {
    //     const updatedCom = await Com.findOneAndUpdate(
    //       { _id: comId },
    //       { $inc: { likes: 1 } },
    //       { new: true }
    //     );
    //     return updatedCom;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },
    // unlikeCom: async (parent, { comId }) => {
    //   try {
    //     const updatedCom = await Com.findOneAndUpdate(
    //       { _id: comId },
    //       { $inc: { likes: -1 } },
    //       { new: true }
    //     );
    //     return updatedCom;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },
    // likeReview: async (parent, { reviewId }) => {
    //   try {
    //     const updatedReview = await Review.findOneAndUpdate(
    //       { _id: reviewId },
    //       { $inc: { likes: 1 } },
    //       { new: true }
    //     );
    //     return updatedReview;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },
    // unlikeReview: async (parent, { reviewId }) => {
    //   try {
    //     const updatedReview = await Review.findOneAndUpdate(
    //       { _id: reviewId },
    //       { $inc: { likes: -1 } },
    //       { new: true }
    //     );
    //     return updatedReview;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },
    // saveThread: async (parent, { userId, threadId }) => {
    //   try {
    //     const savedThread = await User.findOneAndUpdate(
    //       { _id: userId },
    //       { $addToSet: { savedThreads: { _id: threadId } } },
    //       { new: true }
    //     );
    //     return savedThread;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },
    deleteThread: async (parent, { threadId }) => {
      return Thread.findOneAndDelete({ threadId });
    },
    // addThreadCom: async (
    //   parent,
    //   { threadId, comText, comAuthor }
    // ) => {
    //   try {
    //     const addedThreadCom = await Thread.findOneAndUpdate(
    //       { _id: threadId },
    //       { $addToSet: { com: { _id: comId } } },
    //       { new: true }
    //     );
    //     return addedThreadCom;
    //   } catch (err) {
    //     console.error(err);
    //   }
    // },
    //  
    // deleteThreadCom: async (parent, { threadId, comId }) => {
    //   return Thread.findOneAndDelete(
    //     { _id: threadId },
    //     { $pull: { com: { _id: comId } } },
    //     { new: true }
    //   );
    // },
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
  },
};

module.exports = resolvers;
