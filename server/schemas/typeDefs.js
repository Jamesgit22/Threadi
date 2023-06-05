const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    password: String
    admin: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {

  }

  type Mutation {
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
