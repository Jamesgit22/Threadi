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

