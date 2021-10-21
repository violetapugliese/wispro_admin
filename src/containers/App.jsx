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
import Footer from "../components/Footer";
import "../assets/styles/App.scss";

import '../firebase';


const App = () => {

  return (
    <div className="app">
      <Router>
        <Auth>
          <Switch>
            <Route path="/" exact>
              <Index/>
            </Route>
            <Route path="/users">
              <UsersAdmin/>
            </Route>
            <Route path="/data">
              <Data/>
            </Route>
          </Switch>
        </Auth>
        <Footer/>
      </Router>
    </div>
  );
};

export default App;
