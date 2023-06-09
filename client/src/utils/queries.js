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
  }
`;

export const GET_THREAD_COMMENTS = gql`
  query Query($id: ID!) {
    getThreadComs(id: $id) {
      title
      timestamp
      author
      likes
      description
      coms {
        author
        timestamp
        text
        likes
      }
    }
  }
`

export const GET_REVIEW_COMMENTS = gql`
  query Query($id: ID!) {
    getReviewComs(id: $id) {
      author
      timestamp
      image
      title
      text
      rating
      likes
      date
      coms {
        author
        timestamp
        text
        likes
      }
    }
  }
`

export const GET_COM_COMMENTS = gql`
  query Query($id: ID!) {
    getComComs(id: $id) {
      author
      timestamp
      text
      likes
      coms {
        author
        timestamp
        text
        likes
      }
    }
  }
`

export const GET_PROFILE = gql`
  query Query ($username: String!) {
    getProfile (username: $username) {
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
      following {
        _id
        username
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
  }
`;

export const CHECK_FOLLOWERS = gql`
  query CheckFollowers($followId: ID!) {
    checkFollowers(followId: $followId) {
      _id
    }
  }
`;

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
      title
      timestamp
      likes
      description
    }
  }
`;


export const THREAD_REVIEWS = gql`
  query Query($threadId: ID!) {
    getReviewsByThread(threadId: $threadId) {
      reviews {
        _id
        timestamp
        image
        title
        text
        rating
        date
      }
    }
  }
`;

export const GET_THREAD = gql`
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
      description
      reviews {
        _id
        author {
          _id
          username
        }
        timestamp
        image
        title
        text
        rating
        likes
        date
        __typename
      }
      coms {
        author {
          _id
          username
        }
        likes
        text
        timestamp
        __typename
      }
      __typename
    }
  }
`;

export const GET_REVIEW = gql`
  query Query($reviewId: ID!) {
    singleReview(reviewId: $reviewId) {
      _id
      author {
        _id
        username
      }
      timestamp
      image
      title
      text
      rating
      likes
      date
      thread {
        _id
      }
      coms {
        author {
          _id
          username
        }
        likes
        text
        timestamp
        __typename
      }
      __typename
    }
  }
`;

export const GET_COMMENT = gql`
  query Query($commentId: ID!) {
    singleComment(commentId: $commentId) {
      _id
      author {
        _id
        username
      }
      timestamp
      image
      title
      text
      rating
      likes
      date
      thread {
        _id
      }
      coms {
        author {
          _id
          username
        }
        likes
        text
        timestamp
        __typename
      }
      __typename
    }
  }
`;

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
  }
`;


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
  }
`;

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
  }
`;

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
  }
`;

export const CHECK_SAVED_THREAD = gql`
query Query {
me {
  savedThreads {
    _id
  }
}
}`;
