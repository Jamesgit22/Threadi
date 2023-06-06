const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Review {
    _id: ID!
    reviewAuthor: User
    reviewText: String
    reviewRating: Int
    reviewLikes: Int
    reviewComments: [Comment]
    dateWatched: String
  }

  type Comment {
    _id: ID
    commentAuthor: String
    commentText: String
    commentLikes: Int
    commentComments: [Comment]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Thread {
    _id: ID!
    threadTitle: String!
    threadReviews: [Review]
  }

  type Query {
    reviews: [Review]
    threadComments(thread: String!): [Comment]
    userComments(username: String!): [Comment]
    threads: [Thread]
    thread(_id: ID!): Thread
    threads(username: String!): [Thread]
    friends: [User]
    friend(_id: String): User
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    likeThread(_id: ID!): Thread
    shareThread(friendId: ID!, threadId: ID!): Thread
    deleteThread(_id: ID!): Thread
    addThreadComment(threadId: ID!, commentText: String!, commentAuthor: String!): Comment
    deleteThreadComment(threadId: ID!, commentId: ID!): Thread
    addFriend(userId: ID!, friendId: ID!): User
    deleteFriend(userId: ID!, friendId: ID!): User


  }
`;

module.exports = typeDefs;
