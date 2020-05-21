import React, { useState } from 'react';
import axios from 'axios';
import SocialShare from '../Components/SocialShare';
import AlertBox from '../Components/AlertBox';
import { baseUrl } from '../Helpers/constants';

import { userLoggedState } from "../Recoil/atom";
import { useSetRecoilState } from "recoil";

const UserInfo = ({ name, username }) => {

    const setUserLoggedIn = useSetRecoilState(userLoggedState);
    const [alert, setAlert] = useState(null);

    const closeAlert = () => {
        setAlert(null);
    }
    const handleLogoutClick = () => {

        const accessToken = localStorage.getItem("accessToken");
        axios({
            url: `${baseUrl}/user/logout`,
            timeout:5000,
            method: "DELETE",
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
            .then(res => {
                if (res.status === 201) {
                    localStorage.removeItem('accessToken');
                    setUserLoggedIn(false);
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 500) {
                        setAlert({
                            type: "error",
                            title: "Network Error",
                            content: "Make sure you are connected to a network.",
                            buttonName: "Close",
                            clickEvent: closeAlert
                        })
                    }
                    else {
                        localStorage.removeItem('accessToken');
                        setUserLoggedIn(false);
                    }
                }
                else {
                    setAlert({
                        type: "error",
                        title: "Error",
                        content: "Something went wrong.",
                        buttonName: "Close",
                        clickEvent: closeAlert
                    })
                }
            })
    }

    return (
        <>
            <div className="user-info">
                <div className="user">
                    <div className="user-avatar">
                        <i className="fa fa-user"></i>
                    </div>
                    <div className="user-details">
                        <h2>{name ? name : 'Loading...'}</h2>
                        <p>{name ? `@${username}` : '@username'}</p>
                    </div>
                </div>
                <div className="user-links">
                    <SocialShare username={username} />
                    <button onClick={handleLogoutClick} className="btn primary-btn"><i className="fas fa-sign-out-alt"></i>&nbsp;Logout</button>
                </div>
            </div>
            {alert &&
                <AlertBox {...alert} />
            }
        </>
    )
}

export default UserInfo;
