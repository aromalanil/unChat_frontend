import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from '../Input';

const Login = ({ history }) => {

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userNameInfo, setUserNameInfo] = useState(null);
    const [passwordInfo, setPasswordInfo] = useState(null);

    const inputChange = (name, value) => {
        if (name === "password")
            setPassword(value);
        else if (name === "username")
            setUsername(value);
    }

    useEffect(() => {
        setUserNameInfo(null);
        if (userName && !validateUserName(userName)) {
            setUserNameInfo({
                type: "warning",
                msg: "Only use letters and numbers"
            })
        }
    }, [userName]);

    useEffect(() => {
        setPasswordInfo(null);
        if (password && !validatePassword(password)) {
            setPasswordInfo({
                type: "warning",
                msg: "Minimum 6 characters required"
            })
        }
    }, [password]);

    const handleLoginClick = (event) => {
        event.preventDefault();

        if((password && !validatePassword(password)) || (userName && !validateUserName(userName))){ 
                return
        }
            
        setUserNameInfo(null);
        setPasswordInfo(null);

        if (userName === '') {
            setUserNameInfo({
                type: "error",
                msg: "Username cannot be empty"
            })
        }
        if (password === '') {
            setPasswordInfo({
                type: "error",
                msg: "Password cannot be empty"
            })
        }
        if (userName && password) {
            axios({
                method: 'post',
                url: '/user/login',
                data: {
                    username: userName,
                    password: password
                }
            })
                .then(res => {
                    if (res.status === 200 && res.data.accessToken) {
                        localStorage.setItem("accessToken", res.data.accessToken);
                        history.push('/dashboard')
                    }
                })
                .catch(err => {
                    switch (err.response.status) {
                        case 404: setUserNameInfo({
                            type: "error",
                            msg: "Username not found"
                        });
                            break;
                        case 401: setPasswordInfo({
                            type: "error",
                            msg: "Password is incorrect"
                        })
                            break;
                        default: break;
                    }
                })
        }
    }

    return (
        <div className="msg-box">
            <div className="box-content">
                <div className="box-head">
                    <h2>Welcome Back</h2>
                    <p>Login to continue</p>
                </div>
                <form className="box-form">
                    <Input info={userNameInfo} value={userName} name="username" title="Username" type="text" icon="fa-user" inputChange={inputChange} />
                    <Input info={passwordInfo} value={password} name="password" title="Password" type="password" icon="fa-lock" inputChange={inputChange} />
                    <button className="btn primary-btn" onClick={handleLoginClick} type="submit">Login</button>
                </form>
                <div className="prompts">
                    <p >Don't have account ? <Link to="/register">Create an account.</Link></p>
                    <p id="change-password">Forgot Password ? <Link to="/changepassword">Change Password.</Link></p>
                </div>
            </div>
        </div>
    )
}

const validateUserName = (username) => {
    let regex = /^[0-9a-zA-Z]+$/;
    return username.match(regex);
}

const validatePassword = (password) => {
    return password.length > 6
}

export default Login
