import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from '../Input';

const Login = () => {

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const inputChange = (name, value) => {
        if (name === "password")
            setPassword(value);
        else if (name === "username")
            setUsername(value);
    }

    const handleLoginClick = (event) => {
        event.preventDefault();
        axios.post({
            url: 'http://localhost:5000/user/login'
        })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="msg-box">
            <div className="box-content">
                <div className="box-head">
                    <h2>Welcome Back</h2>
                    <p>Login to continue</p>
                </div>
                <form className="box-form">
                    <Input info={{type:"warning",msg:"Hello"}} value={userName} name="username" title="Username" type="text" icon="fa-user" inputChange={inputChange} />
                    <Input info={{type:"error",msg:"Hello"}} value={password} name="password" title="Password" type="password" icon="fa-lock" inputChange={inputChange} />
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

export default Login
