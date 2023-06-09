const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    following: [User]
    reviews: [Review]
    userThreads: [Thread]
    savedThreads: [Thread]
    likes: [Like!]!
    coms: [Com]
  }

  type Like {
    _id: ID!
    user: User!
    likedContent: ParentType!
    parentType: ParentTypeEnum!
  }

  type Review {
    _id: ID!
    author: User
    timestamp: String
    image: String
    type: String!
    title: String!
    text: String!
    rating: Int
    likes: Int!
    thread: Thread
    coms: [Com]
    date: String!
  }

  type Com {
    author: User!
    timestamp: String!
    text: String!
    likes: Int!
    parent: ParentType!
    parentType: ParentTypeEnum!
    coms: [Com]
  }

  union ParentType = Review | Thread | Com

  enum ParentTypeEnum {
    Review
    Thread
    Com
  }

  type Auth {
    token: ID!
    user: User
  }

  type Thread {
    _id: ID!
    timestamp: String
    title: String
    author: User
    likes: Int!
    description: String
    reviews: [Review]
    coms: [Com]
  }

  type ThreadReviewResponse {
    reviews: [Review!]!
  }

  type SingleThreadComResponse {
    author: User
  }

  type SingleThreadResponse {
    title: String!
    timestamp: String!
    author: User!
    likes: Int
    description: String
    reviews: [Review!]!
    coms: [Com!]!
  }

  type Query {
    me: User
    threads: [Thread]
    getThreadComs: Thread
    getReviewComs: Review
    getComComs: Com
    getProfile(username: String!): User
    userThreads: [Thread]
    singleThread(threadId: ID!): Thread
    singleReview(reviewId: ID!): Review
    reviews: [Review]
    reviewComs(reviewId: ID!): [Com]
    threadComs(threadId: ID!): [Com]
    replyComs(comId: ID!): [Com]
    getReviewsByThread(threadId: ID!): ThreadReviewResponse!
    checkFollowers(followId: ID!): User
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    likeThread(threadId: ID!): Thread
    shareThread(friendId: ID!, threadId: ID!): Thread
    deleteThread(threadId: ID!): Thread
    deleteThreadCom(threadId: ID!, comId: ID!): Thread
    addFriend(userId: ID!): User
    unfollowUser(userId: ID!): User
    unlikeThread(threadId: ID!): Thread
    likeCom(comId: ID!): Com
    unlikeCom(comId: ID!): Com
    likeReview(reviewId: ID!): Review
    unlikeReview(reviewId: ID!): Review
    saveThread(threadId: ID!): User!
    addThreadCom(threadId: ID!, comText: String!): Thread
    addThread(title: String!, description: String!): Thread
    addReview(title: String!, text: String!, image: String, threadId: ID!, date: String!, rating: Int): Review!
    addReviewCom(reviewId: ID!, comText: String!): Review
    deleteReview(reviewId: ID!): Review
    deleteReviewCom(reviewId: ID!, comId: ID!): Review
    updateReview(reviewId: ID!, title: String!, text: String!): Review
    updateThread(threadId: ID!, title: String!): Thread
    deleteSavedThread(threadId: ID!): User!
  }
`;

module.exports = typeDefs;
