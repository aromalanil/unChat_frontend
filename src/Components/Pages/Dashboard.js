import React, { useState, useEffect } from "react";
import axios from "axios";
import {sortByDate} from "../../Helpers/utils";

import { userLoggedState } from "../../Recoil/atom";
import { useRecoilState } from "recoil";

import UserInfo from "../UserInfo";
import MessageBox from "../MessageBox";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [isUserLoggedIn, setUserLoggedIn] = useRecoilState(userLoggedState);

  const getUserData = (accessToken) => {
    //Getting Messages,Username and Name
    axios({
      url: "/user/dashboard",
      method: "GET",
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
          localStorage.removeItem("accessToken");
          setUserLoggedIn(false);
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
    <div className="dashboard">
      <UserInfo name={userData.name} username={userData.username} />
      <div className="separator"></div>
      <div className="message-section">
        <h2>Your Messages</h2>
        <div className="messages">
          {userData.messages ? showMessages() : <div className="no-messages">No messages</div>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
