import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from '../Input';
import FormCard from '../FormCard';
import AlertBox from '../AlertBox';
import { baseUrl } from '../../Helpers/constants';

import { validatePassword, validateUserName, validateName } from "../../Helpers/validation";

const Register = ({ history }) => {

    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [nameInfo, setNameInfo] = useState(null);
    const [userNameInfo, setUserNameInfo] = useState(null);
    const [passwordInfo, setPasswordInfo] = useState(null);

    const [alert, setAlert] = useState(null);

    const inputChange = (name, value) => {
        if (name === "password")
            setPassword(value);
        else if (name === "username")
            setUserName(value);
        else if (name === "name")
            setName(value)
    }

    const isButtonDisabled = () => {
        if (passwordInfo != null || userNameInfo != null || nameInfo != null) {
            return true;
        }
        else {
            return false;
        }
    }

    const closeAlert = () => {
        setAlert(null);
        history.push('/login');
    }

    useEffect(() => {
        document.title = "Register | unChat";
    }, []);

    useEffect(() => {
        setUserNameInfo(null);
        if (userName && !validateUserName(userName)) {
            setUserNameInfo({
                type: "warning",
                msg: "Only use letters and numbers"
            })
            return
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

    useEffect(() => {
        setNameInfo(null);
        if (name && !validateName(name)) {
            setNameInfo({
                type: "warning",
                msg: "Enter a valid name"
            })
        }
    }, [name]);

    const handleRegisterClick = (event) => {
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
        if (name === '') {
            setNameInfo({
                type: "error",
                msg: "Name cannot be empty"
            })
        }
        if (name && userName && password) {
            axios({
                method: 'post',
                url: `${baseUrl}/user/register `,
                timeout: 15000,
                data: {
                    name: name.trim(),
                    username: userName,
                    password: password
                }
            })
                .then(res => {
                    if (res.status === 201 && res.data.message === "User created") {
                        setAlert({
                            type: "success",
                            title: "Success!",
                            content: "You have successfully registered. Login to continue",
                            buttonName: "Login",
                            clickEvent: closeAlert
                        });
                    }
                })
                .catch(err => {
                    if (err.response) {
                        if (err.response.status === 409) {
                            setUserNameInfo({
                                type: "error",
                                msg: "Username taken"
                            })
                        }
                        else if (err.response.status === 500) {
                            setAlert({
                                type: "error",
                                title: "Network Error",
                                content: "Make sure you are connected to a network.",
                                buttonName: "Close",
                                clickEvent: closeAlert
                            })
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
    }

    return (
        <>
            <FormCard title="Register" subtitle="and let's get you to the Awesome!">
                <form autoComplete="off" className="box-form">
                    <Input info={nameInfo} value={name} name="name" title="Name" type="text" icon="fa-user first-icon" inputChange={inputChange} />
                    <Input info={userNameInfo} value={userName} name="username" title="Username" type="text" icon="fa-at second-icon" inputChange={inputChange} />
                    <Input info={passwordInfo} value={password} name="password" title="Password" type="password" icon="fa-lock third-icon" inputChange={inputChange} />
                    <button disabled={isButtonDisabled()} className="btn primary-btn" onClick={handleRegisterClick} type="submit">Register</button>
                </form>
                <div className="prompts">
                    <p>Already have an account ? <Link to="/login">Log in.</Link></p>
                </div>
            </FormCard>
            {alert &&
                <AlertBox {...alert} />
            }
        </>
    )
}

export default Register
