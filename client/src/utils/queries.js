import { gql } from '@apollo/client';

export const QUERY_THREADS = gql`
query Reviews($id: ID!) {
    thread(_id: $id) {
      _id
      threadAuthor {
        username
      }
      threadTitle
    }
  }`;

export const QUERY_ACTIVITY = gql`
query Query($thread: String!, $username: String!, $id: ID!, $userThreadsUsername2: String!) {
  reviews {
    author {
      _id
      username
      email
      password
    }
    text
    rating
    likes
    date
  }
  threadCom(thread: $thread) {
    text
    parent {
      _id
      review {
        _id
        text
        rating
        likes
        date
      }
      com {
        _id
        text
        likes
      }
    }
    likes
    author {
      username
    }
  }
  userCom(username: $username) {
    text
    likes
    author {
      username
    }
  }
  thread(_id: $id) {
    _id
    title
    likes
    author {
      username
    }
  }
  userThreads(username: $userThreadsUsername2) {
    _id
    title
    likes
    author {
      username
    }
  }
}`;

