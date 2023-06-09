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
mutation Mutation($userId: ID!) {
    addFriend(userId: $userId) {
      _id
    }
  }`;

export const UNFOLLOW_USER = gql`
mutation Mutation($userId: ID!) {
  unfollowUser(userId: $userId) {
    _id
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
mutation Mutation($title: String!, $description: String!) {
  addThread(title: $title, description: $description) {
    title
    description
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
mutation Mutation($threadId: ID!, $comText: String!) {
  addThreadCom(threadId: $threadId, comText: $comText) {
    _id
    timestamp
    author {
      _id
    }
    likes
  }
}`;

export const ADD_REVIEW_COM = gql`
mutation Mutation($reviewId: ID!, $comText: String!) {
  addReviewCom(reviewId: $reviewId, comText: $comText) {
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
mutation Mutation($title: String!, $text: String!, $threadId: ID!, $date: String!, $image: String, $rating: Int) {
  addReview(title: $title, text: $text, threadId: $threadId, date: $date, image: $image, rating: $rating) {
    _id
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

export const DELETE_REVIEW_COMMENT = gql`
mutation DeleteReviewCom($reviewId: ID!, $comId: ID!) {
  deleteReviewCom(reviewId: $reviewId, comId: $comId) {
    _id
  }
}`;


export const SAVE_THREAD = gql`
mutation Mutation($threadId: ID!) {
  saveThread(threadId: $threadId) {
    _id
  }
}`

export const DELETE_SAVED_THREAD = gql`
mutation DeleteSavedThread($threadId: ID!) {
  deleteSavedThread(threadId: $threadId) {
    _id
  }
}`