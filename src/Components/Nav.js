import React from "react";
import {Link} from 'react-router-dom';

const Nav = ({ isUserLoggedIn }) => {
  return (
    <header className="navbar">
      <div className="logo">
        <h3><span role="img" aria-label="message">✉️</span>&nbsp;Message</h3>
      </div>

      {!isUserLoggedIn && <div className="button-grp">
        <Link to="/login"><button className="btn secondary-btn">Login</button></Link>
        <Link to="/register"><button className="btn primary-btn">Sign Up</button></Link>
        
      </div>}
    </header>
  );
};

export default Nav;
