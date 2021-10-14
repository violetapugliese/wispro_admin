import React, { useState, useEffect } from "react";
import Auth from '../components/Auth';
import "../assets/styles/App.scss";

import '../firebase';


const App = () => {

  return (
    <div className="app">
      <Auth></Auth>
    </div>
  );
};

export default App;
