import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Login from "./Login";
import Chekin from "./Chekin";
import Header from "../Header";
import Footer from "../Footer";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { collection, addDoc } from "@firebase/firestore";
import { auth } from "../../firebase";
import { db } from "../../firebase";

import "../../assets/styles/components/Auth.scss";
import logo from '../../assets/static/logo-wispro.png';


function Auth({ children }) {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const checkin = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            createUser()
        } catch (error) {
            alert(error.message);
        }
    };

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
        } catch (error) {
            alert(error.message);
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    const createUser = async () => {
        await addDoc(collection(db, "users"), { name: registerName, email: registerEmail })
    }

    return (
        <div className="Auth">
            <Container>
                {!user &&
                    <Row className="py-3 d-flex align-items-end">
                        <Col xs={12} md={6} className="p-2" >
                            <img className="logo-img" src={logo} alt="logo-wispro" />
                            <Login></Login>
                        </Col>

                        <Col xs={12} md={6} className="p-2">
                            <Chekin></Chekin>
                        </Col>
                    </Row>
                }
                {user &&
                    <div>
                        <Header>
                            <Col className="d-flex justify-content-end me-3">
                                <Button className="btn-auth" variant="outline-dark" className=" rounded-pill" onClick={logout}>
                                    Log Out
                                </Button>
                            </Col>
                        </Header>
                        <div>
                            {children}
                        </div>

                    </div>

                }
                <Footer></Footer>
            </Container>
        </div>
    );
};

export default Auth;