import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    user {
      username
      email
      password
    }
  }
}`;

export const ADD_FRIEND = gql`
mutation Mutation($userId: ID!, $friendId: ID!) {
    addFriend(userId: $userId, friendId: $friendId) {
      _id
      email
      password
      username
    }
  }`;

export const LOGIN_USER = gql`
mutation Mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;


export const ADD_THREAD = gql`
mutation AddThread($title: String!, $username: String!) {
  addThread(title: $title, username: $username) {
    title
    author {
      _id
    }
    timestamp
  }
}`;

export const DELETE_THREAD = gql`
mutation Mutation($threadId: ID!) {
  deleteThread(threadId: $threadId) {
    _id
  }
}`;

export const ADD_REVIEW = gql`
mutation Mutation($authorId: ID!, $title: String!, $text: String!, $threadId: ID!) {
  addReview(authorId: $authorId, title: $title, text: $text, threadId: $threadId) {
    _id
    author {
      _id
    }
    timestamp
    type
    title
    text
    rating
    likes
    date
  }
}`;

export const ADD_REVIEW_COM = gql`
mutation Mutation($reviewId: ID!, $comText: String!, $comAuthor: ID!) {
  addReviewCom(reviewId: $reviewId, comText: $comText, comAuthor: $comAuthor) {
    _id
    author {
      _id
    }
    timestamp
    text
  }
}`;


