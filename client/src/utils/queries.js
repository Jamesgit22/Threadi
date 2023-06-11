import { gql } from '@apollo/client';

export const GET_ME = gql`
query Query {
  me {
    _id
    username
    email
    friends {
      _id
      username
    }
    reviews {
      _id
      timestamp
      type
      title
      text
      rating
      likes
    }
    userThreads {
      _id
      timestamp
      title
      likes
    }
    savedThreads {
      _id
      timestamp
      title
      likes
    }
    likes {
      _id
      likedContent {
        ... on Thread {
          _id
          timestamp
          title
          likes
        }
        ... on Review {
          _id
          timestamp
          type
          title
          text
          rating
          likes
        }
        ... on Com {
          _id
          timestamp
          text
          likes
        }
      }
      parentType
    }
    coms {
      _id
      author {
        _id
        username
      }
      timestamp
      text
      likes
      parent {
        ... on Thread {
          _id
          timestamp
          title
          likes
        }
        ... on Review {
          _id
          timestamp
          type
          title
          text
          rating
          likes
        }
        ... on Com {
          _id
          timestamp
          text
          likes
        }
      }
      parentType
    }
  }
}`


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

