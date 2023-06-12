import React from "react";
import "../Footer.css";
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../../utils/queries';

function FooterNav() {
    const { loading, data } = useQuery(GET_ME);
    const userData = data?.me || {};

    return (
        <>
            <a href="/social">Social</a>
            <a href={`/profile/${userData.username}`}>Profile</a>
            <a href="/browse">Browse</a>
            <a href="/threadspage">My Threads</a>
        </>
    );
};

export default FooterNav;