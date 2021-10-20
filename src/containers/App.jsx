import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Auth from '../components/auth/Auth';
import Index from "../components/Index";
import UsersAdmin from "../components/users-admin/UsersAdmin";
import Data from "../components/users-data/Data";
import Header from "../components/Header";
import "../assets/styles/App.scss";

import '../firebase';


const App = () => {

  return (
    <div className="app">
      <Router>

        <Auth>
          <Switch>
            <Route path="/" exact>
              <Index></Index>
            </Route>
            <Route path="/users">
              <UsersAdmin></UsersAdmin>
            </Route>
            <Route path="/data">
              <Data></Data>
            </Route>
          </Switch>
        </Auth>
      </Router>
    </div>
  );
};

export default App;
