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
    shareThread: async (parent, { friendId, threadId }) => {
      try {
        const sharedThread = await User.findOneAndUpdate(
          { _id: friendId },
          { $addToSet: { sharedToThreads: threadId } },
          { new: true }
        );
        return sharedThread;
      } catch (err) {
        console.error(err);
      }
    },
    deleteThread: async (parent, { threadId }) => {
      return Thread.findOneAndDelete({ threadId });
    },
    addThreadComment: async (
      parent,
      { threadId, commentText, commentAuthor }
    ) => {
      try {
        const addedThreadComment = await Thread.findOneAndUpdate(
          { _id: threadId },
          { $addToSet: { comments: { commentAuthor, commentText } } },
          { new: true }
        );
        return addedThreadComment;
      } catch (err) {
        console.error(err);
      }
    },
    //  
    deleteThreadComment: async (parent, { threadId, commentId }) => {
      return Thread.findOneAndDelete(
        { _id: threadId },
        { $pull: { comments: { _id: commentId } } },
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
  },
};

module.exports = resolvers;
