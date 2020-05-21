import React, { useState, useEffect } from "react";
import axios from "axios";
import { sortByDate } from "../../Helpers/utils";

import { userLoggedState } from "../../Recoil/atom";
import { useSetRecoilState } from "recoil";

import UserInfo from "../UserInfo";
import MessageBox from "../MessageBox";
import AlertBox from '../AlertBox';
import {baseUrl} from '../../Helpers/constants';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const setUserLoggedIn = useSetRecoilState(userLoggedState)

  const [alert, setAlert] = useState(null);

  const closeAlert = () => {
    setAlert(null);
  }

  const getUserData = (accessToken) => {
    //Getting Messages,Username and Name
    axios({
      url: `${baseUrl}/user/dashboard`,
      method: "GET",
      timeout:5000,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setUserData(res.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 500) {
            setAlert({
              type: "error",
              title: "Network Error",
              content: "Make sure you are connected to a network.",
              buttonName: "Close",
              clickEvent: closeAlert
            })
          }
          else {
            localStorage.removeItem("accessToken");
            setUserLoggedIn(false);
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
      });
  };

  useEffect(() => {
    //Getting accessToken
    const accessToken = localStorage.getItem("accessToken");
    getUserData(accessToken);
  }, []);

  const showMessages = () => {
    const sortedMessage = sortByDate(userData.messages);
    return sortedMessage.map((message) => (
      <MessageBox key={message._id} message={message} />
    ));
  };

  return (
    <>
      <div className="dashboard">
        <UserInfo name={userData && userData.name} username={userData && userData.username} />
        <div className="separator"></div>
        <div className="message-section">
          <h2>Your Messages</h2>
          <div className="messages">
            {userData ? (userData.messages ? showMessages() : <p className="no-messages">Inbox is empty</p>) : <p className="no-messages">Loading...</p>}
          </div>
        </div>
      </div>
      {alert &&
        <AlertBox {...alert} />
      }
    </>
  );
};

export default Dashboard;
