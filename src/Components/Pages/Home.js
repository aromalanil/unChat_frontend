import React, { useState,useEffect } from 'react';
import { userLoggedState } from "../../Recoil/atom";
import {  useRecoilValue } from "recoil";

const Home = ({ history }) => {

    const isUserLoggedIn = useRecoilValue(userLoggedState);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        document.title = "unChat | Send Anonymous Messages"
    }, []);

    const handleButtonClick = () => {
        history.push(isUserLoggedIn ? '/dashboard' : '/register')
    }

    const handleSendClick = () => {
        if (username)
            history.push(`/send/${username}`)
        else
            setButtonDisabled(true);
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        setButtonDisabled(false);
        setUsername(e.target.value);
    }

    return (
        <div className="home">
            <div className="intro">
                <h1>Welcome to <span className="logo">un<span>Chat</span>&nbsp;<i className="fa fa-envelope-open"></i></span></h1>
                <p>Send and receive messages anonymously</p>
                <button onClick={handleButtonClick} className="btn primary-btn">{isUserLoggedIn ? "Dashboard" : "Register Now"}</button>
            </div>
            <div className="separator"></div>
            <div className="msg-user">
                <p>Try it Out :</p>
                <form autoComplete="off" onSubmit={e => e.preventDefault()}>
                    <input
                        className={isButtonDisabled ? 'input-error' : ''}
                        name="username"
                        type="text"
                        placeholder={isButtonDisabled ? 'Enter a value' : 'Username'}
                        onChange={handleInputChange} />

                    <button
                        disabled={isButtonDisabled}
                        className="btn primary-btn"
                        onClick={handleSendClick}>
                        <i className="fas fa-envelope"></i>&nbsp;&nbsp;Send&nbsp;Message
                </button>
                </form>
            </div>

        </div>
    )
}

export default Home
