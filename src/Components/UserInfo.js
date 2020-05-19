import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import history from '../Helpers/history';
import SocialShare from '../Components/SocialShare';

import { userLoggedState } from "../Recoil/atom";
import { useRecoilState } from "recoil";

const UserInfo = ({ name, username }) => {

    const [isUserLoggedIn, setUserLoggedIn] = useRecoilState(userLoggedState);

    const handleLogoutClick = () => {

        const accessToken = localStorage.getItem("accessToken");
        axios({
            url: "/user/logout",
            method: "DELETE",
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                if (res.status === 201) {
                    history.push('/login');
                    localStorage.removeItem('accessToken');
                    setUserLoggedIn(false);
                }
            })
            .catch(err => {
                history.push('/login');
                localStorage.removeItem('accessToken');
                setUserLoggedIn(false);
            })
    }

    return (
        <div className="user-info">
            <div className="user">
                <div className="user-avatar">
                    <i className="fa fa-user"></i>
                </div>
                <div className="user-details">
                    <h2>{name ? name : 'Loading..'}</h2>
                    <p>{name ? `@${username}` : 'username'}</p>
                </div>
            </div>
            <div className="user-links">
                <SocialShare username={username}/>
                <button onClick={handleLogoutClick} className="btn primary-btn"><i className="fas fa-sign-out-alt"></i>&nbsp;Logout</button>
            </div>
        </div>
    )
}

export default UserInfo
