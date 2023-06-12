import React from "react";
import "../Footer.css";
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../../utils/queries';

function FooterNav() {
    const { loading, data } = useQuery(GET_ME);
    const userData = data?.me || {};

    return (
        <>
            <a href="" className="footerSubTitle">Social</a>
            <a href={`/profile/${userData.username}`} className="footerSubTitle">Profile</a>
            <a href="/browse" className="footerSubTitle">Browse</a>  
        </>
    );
};

export default FooterNav;