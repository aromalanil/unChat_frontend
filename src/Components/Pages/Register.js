import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Input from '../Input';

const Register = ({history}) => {

    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [nameInfo, setNameInfo] = useState(null);
    const [userNameInfo, setUserNameInfo] = useState(null);
    const [passwordInfo, setPasswordInfo] = useState(null);

    const inputChange = (name, value) => {
        if (name === "password")
            setPassword(value);
        else if (name === "username")
            setUserName(value);
        else if (name === "name")
            setName(value)
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

        if ((password && !validatePassword(password)) || (userName && !validateUserName(userName)) || (name && !validateName(name))) {
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
        if (name === '') {
            setNameInfo({
                type: "error",
                msg: "Name cannot be empty"
            })
        }
        if (name && userName && password) {
            axios({
                method: 'post',
                url: 'user/register',
                data: {
                    name:name.trim(),
                    username: userName,
                    password: password
                }
            })
                .then(res => {
                    if (res.status === 201 && res.data.message==="User created") {
                        history.push('/login')
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <div className="msg-box">
            <div className="box-content">
                <div className="box-head">
                    <h2>Register</h2>
                    <p>and let's get you to the Awesome!</p>
                </div>
                <form className="box-form">
                    <Input info={nameInfo} value={name} name="name" title="Name" type="text" icon="fa-user" inputChange={inputChange} />
                    <Input info={userNameInfo} value={userName} name="username" title="Username" type="text" icon="fa-at" inputChange={inputChange} />
                    <Input info={passwordInfo} value={password} name="password" title="Password" type="password" icon="fa-lock" inputChange={inputChange} />
                    <button className="btn primary-btn" onClick={handleRegisterClick} type="submit">Register</button>
                </form>
                <div className="prompts">
                    <p >Already have an account ? <Link to="/login">Log in.</Link></p>
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
    return password.length >= 6
}

const validateName = (name) => {
    let regex = /^[a-zA-Z ]+$/;
    return name.match(regex);
}

export default Register
