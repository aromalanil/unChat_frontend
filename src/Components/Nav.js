import React from "react";
import { Link } from 'react-router-dom';
import UserAvatar from "./UserAvatar";

import { userLoggedState } from "../Recoil/atom";
import { useRecoilValue } from "recoil";


const Nav = () => {

  const isUserLoggedIn = useRecoilValue(userLoggedState);

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/"><h3>un<span>Chat</span>&nbsp;<i className="fa fa-envelope-open"></i></h3></Link>
      </div>

      {isUserLoggedIn
        ? <UserAvatar />

        : <div className="button-grp">
          <Link to="/login"><button className="btn secondary-btn">Login</button></Link>
          <Link to="/register"><button className="btn primary-btn">Sign Up</button></Link>
        </div>
      }
    </header>
  );
};

export default Nav;
