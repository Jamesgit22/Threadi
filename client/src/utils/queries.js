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

