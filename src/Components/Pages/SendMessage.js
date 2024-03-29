import React, { useEffect, useState } from "react";
import axios from "axios";
import AlertBox from '../AlertBox';
import { baseUrl } from '../../Helpers/constants';

const SendMessage = ({history,match}) => {
  const { username } = match.params;

  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState(null);
  const [message, setMessage] = useState("");

  const [alert, setAlert] = useState(null);

  const closeAlert = () => {
    history.push('/');
    setAlert(null);
  }

  useEffect(() => {

    axios(`${baseUrl}/user/${username}`, { timeout: 5000 })
      .then((res) => {
        if (res.status === 200) {
          setName(res.data.name);
          document.title = `Send Anonymous Message to ${res.data.name} | unChat`
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          setAlert({
            type: "error",
            title: "Network Error",
            content: "Make sure you are connected to a network.",
            buttonName: "Close",
            clickEvent: closeAlert
          })
        }
        else if (err.response.status === 404) {
          history.push('/404');
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
      });
  }, []);

  const handleMessageText = (e) => {
    setButtonDisabled(false);
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleSendClick = () => {
    if (!message || !name) {
      setButtonDisabled(true);
      return
    }

    axios({
      method: "POST",
      timeout: 15000,
      url: `${baseUrl}/message/${username}`,
      data: {
        message
      }
    })
      .then((res) => {
        if (res.status === 200) {
          setAlert({
            type: "success",
            title: "Send!",
            content: "Your message has been send successfully",
            buttonName: "Close",
            clickEvent: closeAlert
          })
        }
      })
      .catch(err => {
        setAlert({
          type: "error",
          title: "Error",
          content: "Something went wrong.",
          buttonName: "Close",
          clickEvent: closeAlert
        })
      });
  };

  return (
    <>
      <div className="send-msg">
        <div className="head">
          <h2>Send Message</h2>
          <p>Send an anonymous message to <span className="user-name">{name}</span></p>
        </div>
        <div className="message-input">
          <textarea
            className={isButtonDisabled ? "error-textarea" : ""}
            name="message"
            id=""
            onChange={handleMessageText}
            defaultValue={message}
            placeholder={isButtonDisabled ? 'Message cannot be empty' : "Your Message"}
          ></textarea>
          <button
            disabled={isButtonDisabled}
            className="btn primary-btn"
            onClick={handleSendClick}
          >
            <i className="fas fa-envelope"></i>&nbsp;&nbsp;Send&nbsp;Message
        </button>
        </div>
      </div>

      {alert &&
        <AlertBox {...alert} />
      }
    </>
  );
};

export default SendMessage;
