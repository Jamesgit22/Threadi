import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../ThreadsPage.css';
import { useQuery } from '@apollo/client';
import { GET_THREAD } from '../../../utils/queries';
import SingleThreadPage from './singlethread/SingleThread';
import WriteReview from './writereview/WriteReview';

export default function ThreadsPage() {
    let { id } = useParams();
    console.log(id);
    const [currentView, setCurrentView] = useState('single');
    const [chosenMedia, setChosenMedia] = useState({});
    const { loading, data, error } = useQuery(GET_THREAD, {
        variables: { threadId: id }
    });
    const threadData = data?.singleThread || {};
    console.log(data);
    console.log(threadData);

    const getWriteReview = (media) => {
        console.log(threadData);
        setChosenMedia(media);
        setCurrentView('write');
    };

    if (error) {
        console.log(error);
    }

    if (loading) return <h2>LOADING...</h2>;


    const switchView = () => {
        if (currentView === 'single') {
            return <SingleThreadPage getWriteReview={getWriteReview} threadData={threadData} />

        }
        if (currentView === 'write') {
            return <WriteReview media={chosenMedia} thread={threadData} />;
        }
    };

    return <>{switchView()}</>;
}
