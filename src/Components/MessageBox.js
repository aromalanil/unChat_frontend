import React from "react";
import moment from "moment";


const MessageBox = ({ message }) => {

  return (
    <div className="message">
      <p className="time">{moment(message.date).fromNow()}</p>
      <div className="line-clamp">
        <p className="message-content">{message.data}</p>
      </div>
    </div>
  );
};

export default MessageBox;
