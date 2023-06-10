import { gql } from '@apollo/client';

export const USER_THREADS = gql`
query Query($userId: ID!) {
  userThreads(userId: $userId) {
    _id
    timestamp
    title
    likes
  }
}`

export const SINGLE_THREAD = gql`
query Query($threadId: ID!) {
  singleThread(threadId: $threadId) {
    _id
    timestamp
    title
    author {
      _id
      username
    }
    likes
    reviews {
      _id
      timestamp
      title
      text
      rating
      likes
    }
    coms {
      author {
        _id
        username
      }
    }
  }
}`



