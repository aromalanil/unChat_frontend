import React, { useEffect, useState } from "react";
import axios from "axios";

const SendMessage = (props) => {
  const { username } = props.match.params;

  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios(`/user/${username}`)
      .then((res) => {
        if (res.status === 200) {
          setName(res.data.name);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const handleMessageText = (e) => {
    setButtonDisabled(false);
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleSendClick = () => {
    if (!message) {
      setButtonDisabled(true);
      return
    }

    axios({
      method: "POST",
      url: `/message/${username}`,
      data:{
          message
      }
    })
    .then((res) => {
        if(res.status===200){
            console.log("Send")
        }
    })
    .catch(err=>{

    });
  };

  return (
    <div className="send-msg">
      <div className="head">
        <h2>Send Message</h2>
        <p>Send an anonymous message to <span className="user-name">{name}</span></p>
      </div>
      <div className="message-input">
        <textarea
          className={isButtonDisabled && "error-textarea"}
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
  );
};

export default SendMessage;
