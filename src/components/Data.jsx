import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import logo from '../assets/static/logo-wispro.png';
import "../assets/styles/components/Data.scss";




const Data = () => {

    return (
        <div className="Data">
            <h1>statistics</h1>
        </div>
    );
};

export default Data;