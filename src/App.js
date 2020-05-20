import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { userLoggedState } from './Recoil/atom.js';
import { useRecoilValue } from 'recoil';

import ProtectedRoute from "./Components/ProtectedRoute";
import ChangePassword from "./Components/Pages/ChangePassword";
import SendMessage from "./Components/Pages/SendMessage.js";
import Dashboard from "./Components/Pages/Dashboard";
import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login";
import Nav from "./Components/Nav";

import "./scss/app.scss";

function App() {

  const isUserLoggedIn = useRecoilValue(userLoggedState);

  return (

    <Router>
      <Nav />
      <div className="app-content">
        <Switch>

          <Route path="/login" component={Login} />

          <Route path="/changepassword" component={ChangePassword} />

          <Route path="/send/:username" component={SendMessage} />

          <ProtectedRoute
            path="/register"
            redirectTo="/dashboard"
            protectCondition={!isUserLoggedIn}
            component={Register} />


          <ProtectedRoute
            path="/dashboard"
            redirectTo="/login"
            protectCondition={isUserLoggedIn}
            component={Dashboard}
          />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
