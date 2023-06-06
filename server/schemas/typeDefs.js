const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    password: String!
  }

  type Review {
    _id: ID!
    author: User
    text: String
    rating: Int
    likes: Int
    comments: [Comment]
    dateWatched: Date
  }

  type Comment {
    _id: ID
    author: User
    text: String
    likes: Int
    comments: [Comment]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Thread {
    _id: ID!
    title: String!
    reviews: [Review]
  }

  type Query {
    reviews: [Review]
    comments: [Comment]
    threads: [Thread]
    friends: [User]
    

  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
