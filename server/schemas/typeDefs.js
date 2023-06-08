const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    friends: [User]
    reviews: [Review]
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
    reviewAuthor: User!
    reviewText: String!
    reviewRating: Int
    reviewLikes: Int
    reviewComments: [Com]
    dateWatched: String
  }

  type Com {
    _id: ID!
    comAuthor: String!
    comText: String!
    comLikes: Int!
    comCom: [Com]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Thread {
    _id: ID!
    threadAuthor: [User]
    threadTitle: String!
    threadReviews: [Review]
  }

  type Query {
    reviews: [Review]
    threadCom(thread: String!): [Com]
    userCom(username: String!): [Com]
    thread(_id: ID!): Thread
    userThreads(username: String!): [Thread]
    friends: [User]
    friend(_id: String): User
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    likeThread(threadId: ID!): Thread
    shareThread(friendId: ID!, threadId: ID!): Thread
    deleteThread(threadId: ID!): Thread
    addThreadCom(threadId: ID!, comText: String!, comAuthor: String!): Com
    deleteThreadCom(threadId: ID!, comId: ID!): Thread
    addFriend(userId: ID!, friendId: ID!): User
    deleteFriend(userId: ID!, friendId: ID!): User


  }
`;

module.exports = typeDefs;
