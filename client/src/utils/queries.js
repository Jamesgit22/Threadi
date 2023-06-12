import { gql } from '@apollo/client';

export const GET_ME = gql`
query Query {
  me {
    _id
    username
    reviews {
      _id
      timestamp
      title
      text
      rating
      __typename
    }
    userThreads {
      _id
      timestamp
      title
      likes
      description
      __typename
    }
    savedThreads {
      _id
      timestamp
      title
      author {
        _id
        __typename
      }
      likes
      description
      __typename
    }
    __typename
  }
}`

// export const GET_ME = gql`
// query Query {
//   me {
//     _id
//     email
//     username
//   }
// }`

export const USER_THREADS = gql`
query Query {
  userThreads {
    _id
    timestamp
    title
    likes
    description
  }
}`

export const THREAD_REVIEWS = gql`
query Query($threadId: ID!) {
  getReviewsByThread(threadId: $threadId) {
    _id
    timestamp
    image
    title
    text
    rating
    date
  }
}
`

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
      description
    }
    coms {
      author {
        _id
        username
      }
    }
  }
}`

export const REVIEWS = gql`
query Query {
  reviews {
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
  }
}`

export const SINGLE_REVIEW = gql`
query SingleReview($reviewId: ID!) {
  singleReview(reviewId: $reviewId) {
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
    coms {
      author {
        _id
        username
      }
      timestamp
      text
      likes
    }
  }
}`

export const REVIEW_COMS = gql`
query ReviewComs($reviewId: ID!) {
  reviewComs(reviewId: $reviewId) {
    author {
      _id
      username
    }
    text
    timestamp
    likes
  }
}`

export const THREAD_COMS = gql`
query ThreadComs($threadId: ID!) {
  threadComs(threadId: $threadId) {
    author {
      _id
      username
    }
    text
    timestamp
    likes
  }
}`

export const GET_THREADS = gql`
query Query {
  threads {
    _id
    author {
      _id
      username
    }
    title
    likes
    description
    timestamp
  }
}`

