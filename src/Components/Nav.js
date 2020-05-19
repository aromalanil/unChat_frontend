import React from "react";
import { Link } from 'react-router-dom';
import UserAvatar from "./UserAvatar";

import { userLoggedState } from "../Recoil/atom";
import { useRecoilState } from "recoil";


const Nav = () => {

  const [isUserLoggedIn, setUserLoggedIn] = useRecoilState(userLoggedState);

  return (
    <header className="navbar">
      <div className="logo">
       <Link to="/"><h3><span role="img" aria-label="message">✉️</span>&nbsp;Message</h3></Link> 
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
