import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
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
mutation AddThread($title: String!) {
  addThread(title: $title) {
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

export const ADD_THREAD_COM = gql`
mutation Mutation($threadId: ID!, $comText: String!, $comAuthor: ID!) {
  addThreadCom(threadId: $threadId, comText: $comText, comAuthor: $comAuthor) {
    _id
    timestamp
    author {
      _id
    }
    likes
  }
}`;

export const UPDATE_THREAD = gql`
mutation Mutation($threadId: ID!, $title: String!) {
  updateThread(threadId: $threadId, title: $title) {
    _id
    title
  }
}`;

export const DELETE_THREAD_COMMENT = gql`
mutation DeleteThreadCom($threadId: ID!, $comId: ID!) {
  deleteThreadCom(threadId: $threadId, comId: $comId) {
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

export const DELETE_REVIEW = gql`
mutation Mutation($reviewId: ID!) {
  deleteReview(reviewId: $reviewId) {
    _id
  }
}`;

export const UPDATE_REVIEW = gql`
mutation Mutation($reviewId: ID!, $title: String!, $text: String!) {
  updateReview(reviewId: $reviewId, title: $title, text: $text) {
    _id
    title
    text
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

export const DELETE_REVIEW_COMMENT = gql`
mutation DeleteReviewCom($reviewId: ID!, $comId: ID!) {
  deleteReviewCom(reviewId: $reviewId, comId: $comId) {
    _id
  }
}`;


