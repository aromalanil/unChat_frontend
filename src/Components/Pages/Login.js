import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from '../Input';
import { useSetRecoilState } from 'recoil';
import { userLoggedState } from '../../Recoil/atom.js';
import FormCard from '../FormCard';
import AlertBox from '../AlertBox';
import {baseUrl} from '../../Helpers/constants';

import { validatePassword, validateUserName } from "../../Helpers/validation";

const Login = ({ history }) => {

    const setUserLoggedIn = useSetRecoilState(userLoggedState)

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [userNameInfo, setUserNameInfo] = useState(null);
    const [passwordInfo, setPasswordInfo] = useState(null);
    const [alert, setAlert] = useState(null);

    const closeAlert = () => {
        setAlert(null);
    }

    const inputChange = (name, value) => {
        if (name === "password")
            setPassword(value);
        else if (name === "username")
            setUserName(value);
    }

    const isButtonDisabled = () => {
        if (passwordInfo != null || userNameInfo != null) {
            return true;
        }
        else {
            return false;
        }
    }

    useEffect(() => {
        document.title = "unChat | Send Anonymous Messages"
    }, []);

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
                url: `${baseUrl}/user/login`,
                timeout:5000,
                data: {
                    username: userName,
                    password: password
                }
            })
                .then(res => {
                    if (res.status === 200 && res.data.accessToken) {
                        localStorage.setItem("accessToken", res.data.accessToken);
                        setUserLoggedIn(true);
                        history.push('/dashboard');
                    }
                })
                .catch(err => {
                    if (err.response) {
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
                            case 500: setAlert({
                                type: "error",
                                title: "Network Error",
                                content: "Make sure you are connected to a network.",
                                buttonName: "Close",
                                clickEvent: closeAlert
                            });
                                break;
                            default: break;
                        }
                    }
                    else {
                        setAlert({
                            type: "error",
                            title: "Error",
                            content: "Something went wrong",
                            buttonName: "Close",
                            clickEvent: closeAlert
                        });
                    }
                })
        }
    }

    return (
        <>
            <FormCard title="Welcome Back" subtitle="Login to continue">
                <form autoComplete="off" className="box-form">
                    <Input info={userNameInfo} value={userName} name="username" title="Username" type="text" icon="fa-at first-icon" inputChange={inputChange} />
                    <Input info={passwordInfo} value={password} name="password" title="Password" type="password" icon="fa-lock second-icon" inputChange={inputChange} />
                    <button disabled={isButtonDisabled()} className="btn primary-btn" onClick={handleLoginClick} type="submit">Login</button>
                </form>
                <div className="prompts">
                    <p >Don't have an account ? <Link to="/register">Create an account.</Link></p>
                </div>
            </FormCard>
            {alert &&
                <AlertBox {...alert} />
            }
        </>
    )
}


export default Login;
