const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    friends: [User]
    reviews: [Review]
    userThreads: [Thread]
    savedThreads: [Thread]
    likes: [Like!]!
    coms: [Com]
  }

  type Like {
    _id: ID!
    user: User!
    review: Review
    thread: Thread
    com: Com
  }

  type Review {
    _id: ID!
    author: User!
    timestamp: String!
    type: String!
    title: String!
    text: String!
    rating: Int
    likes: Int!
    thread: Thread!
    coms: [Com]
    date: String!
  }

  type Com {
    _id: ID!
    author: User!
    timestamp: String!
    text: String!
    parent: ParentType!
    likes: Int!
    coms: [Com]
  }

  union ParentType = Review | Com | Thread

  type Auth {
    token: ID!
    user: User
  }

  type Thread {
    _id: ID!
    timestamp: String!
    title: String!
    author: User
    likes: Int!
    reviews: [Review]
    coms: [Com]
  }

  type Query {
    getUserThreads(userId: ID!): [Thread!]!
    reviews: [Review]
    threadCom(thread: String!): [Com]
    userCom(username: String!): [Com]
    thread(_id: ID!): Thread
    friends: [User]
    friend(_id: String): User
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    likeThread(threadId: ID!): Thread
    shareThread(friendId: ID!, threadId: ID!): Thread
    deleteThread(threadId: ID!): Thread
    deleteThreadCom(threadId: ID!, comId: ID!): Thread
    addFriend(userId: ID!, friendId: ID!): User
    deleteFriend(userId: ID!, friendId: ID!): User
    unlikeThread(threadId: ID!): Thread
    likeCom(comId: ID!): Com
    unlikeCom(comId: ID!): Com
    likeReview(reviewId: ID!): Review
    unlikeReview(reviewId: ID!): Review
    saveThread(userId: ID!, threadId: ID!): User
    addThreadCom(threadId: ID!, comText: String!, comAuthor: ID!): Thread
    addThread(title: String!, username: String!): Thread
    addReview(text: String!, title: String!, rating: Int!, threadId: ID!, userId: ID!): Review
    deleteReview(reviewId: ID!): Review

  }
`;

module.exports = typeDefs;
