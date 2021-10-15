import React, { useState, useEffect } from "react";
import Auth from '../components/Auth';
import UsersAdmin from "../components/UsersAdmin";
import Data from "../components/Data";
import Header from "../components/Header";
import "../assets/styles/App.scss";

import '../firebase';


const App = () => {

  return (
    <div className="app">
      <Auth>
        <UsersAdmin></UsersAdmin>
        <Data></Data>
      </Auth>
    </div>
  );
};

export default App;
