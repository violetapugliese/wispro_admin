import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import logo from '../assets/static/logo-wispro.png';
import "../assets/styles/components/UsersAdmin.scss";




const UsersAdmin = () => {

    return (
        <div className="UsersAdmin">
            <h1>Users Admin</h1>
        </div>
    );
};

export default UsersAdmin;