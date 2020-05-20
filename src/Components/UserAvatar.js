import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import history from '../Helpers/history';

import { userLoggedState } from "../Recoil/atom";
import { useRecoilState } from "recoil";

const UserAvatar = () => {
    const [isDropdownVisible, setDropDownVisible] = useState(false);
    const [userData, setUserData] = useState({});
    const [isUserLoggedIn, setUserLoggedIn] = useRecoilState(userLoggedState);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const decodedData = jwtDecode(accessToken);
        setUserData(decodedData);
    }, []);

    const handleAvatarClick = () => {
        setDropDownVisible(prevState => !prevState);
    }

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
                    localStorage.removeItem('accessToken');
                    setUserLoggedIn(false);
                }
            })
            .catch(err => {
                localStorage.removeItem('accessToken');
                setUserLoggedIn(false);
            })
    }

    return (
        <div className="avatar-wrapper">
            <div className="avatar" onClick={handleAvatarClick}>
                <i className="far fa-user"></i>
            </div>
            {isDropdownVisible &&
                <div className="avatar-dropdown" id="dropdown">
                    <div className="dropdown-head">
                        <h3>{userData.name}</h3>
                        <p>{`@${userData.username}`}</p>
                    </div>
                    <ul className="links">
                        <li><Link onClick={handleAvatarClick} to="/dashboard"><i className="fas fa-columns dashboard-icon"></i>&nbsp;&nbsp;Dashboard</Link></li>
                        <li><Link onClick={handleAvatarClick} to="/changepassword"><i className="fas fa-key password-icon"></i>&nbsp;&nbsp;Change Password</Link></li>
                    </ul>
                    <button className="btn primary-btn" onClick={handleLogoutClick}>
                        <i className="fas fa-sign-out-alt"></i>&nbsp;Logout
                    </button>
                </div>
            }
        </div>
    )
}

export default UserAvatar;
