import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_THREADS } from '../../utils/queries';
import ActivityItem from './ActivityItem';

export default function Feed() {
  const { loading, error, data } = useQuery(GET_THREADS);

  if (loading) return <h2>LOADING...</h2>;
  if (error) return `Error! ${error.message}`;

  const threads = data?.threads || [];

  return (
    <div>
      <h2>Activity Feed</h2>
      {threads.map((thread) => (
        <ActivityItem
          key={thread._id}
          date={thread.timestamp}
          title={thread.title}
          description={thread.description}
        />
      ))}
    </div>
  );
}
