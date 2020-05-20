import React from "react";

const AlertBox = ({ type, title, content, buttonName, clickEvent }) => {
  return (
    <>
      <div className="alert-box">
        <div className="icon">
          {type === "success" && (
            <i className="fas fa-check-circle success"></i>
          )}
          {type === "error" && (
            <i className="fas fa-exclamation-circle error"></i>
          )}
          {type === "warning" && (
            <i className="fas fa-exclamation-triangle warning"></i>
          )}
        </div>
        <h3>{title}</h3>
        <p>{content}</p>
        <button className="btn primary-btn" onClick={clickEvent}>
          {buttonName}
        </button>
      </div>
      <div className="overlay"></div>
    </>
  );
};

export default AlertBox;
