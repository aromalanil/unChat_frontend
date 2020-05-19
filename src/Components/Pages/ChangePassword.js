import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Input from '../Input';
import FormCard from '../FormCard';
import { validatePassword, validateUserName } from "../../Helpers/validation";

const ChangePassword = ({ history }) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [userNameInfo, setUserNameInfo] = useState(null);
    const [passwordInfo, setPasswordInfo] = useState(null);
    const [newPasswordInfo, setNewPasswordInfo] = useState(null);

    const inputChange = (name, value) => {
        if (name === "password")
            setPassword(value);
        else if (name === "username")
            setUserName(value);
        else if (name === "newpassword")
            setNewPassword(value);
    }

    const isButtonDisabled = () => {
        if (passwordInfo != null || userNameInfo != null || newPasswordInfo != null) {
            return true;
        }
        else {
            return false;
        }
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
        setNewPasswordInfo(null);
        if (newPassword && !validatePassword(newPassword)) {
            setNewPasswordInfo({
                type: "warning",
                msg: "Minimum 6 characters required"
            })
        }
    }, [newPassword]);

    useEffect(() => {
        if (newPassword && (newPassword === password)) {
            setNewPasswordInfo({
                type: "warning",
                msg: "New password is same as old password"
            })
        }
        else if (newPasswordInfo && newPasswordInfo.msg === "New password is same as old password") {
            setNewPasswordInfo(null);
        }
    }, [password, newPassword]);

    const handleChangeClick = (event) => {
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
        if (newPassword === '') {
            setNewPasswordInfo({
                type: "error",
                msg: "New Password cannot be empty"
            })
        }
        if (userName && password && newPassword) {
            axios({
                method: 'post',
                url: '/user/password',
                data: {
                    username: userName,
                    password: password,
                    newPassword: newPassword
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        history.push('/login');
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
        <FormCard title="Change Password" subtitle="Create a new password">
            <form autoComplete="off" className="box-form">
                <Input info={userNameInfo} value={userName} name="username" title="Username" type="text" icon="fa-at first-icon" inputChange={inputChange} />
                <Input info={passwordInfo} value={password} name="password" title="Password" type="password" icon="fa-lock second-icon" inputChange={inputChange} />
                <Input info={newPasswordInfo} value={newPassword} name="newpassword" title="New Password" type="password" icon="fa-user-lock third-icon" inputChange={inputChange} />
                <button disabled={isButtonDisabled()} className="btn primary-btn" onClick={handleChangeClick} type="submit">Change</button>
            </form>
        </FormCard>
    )
}


export default ChangePassword
