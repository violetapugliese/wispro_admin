import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { collection, addDoc } from "@firebase/firestore";
import { auth } from "../firebase";
import { db } from "../firebase";

import "../assets/styles/components/Auth.scss";
import logo from '../assets/static/logo-wispro.png';    


function Auth({ children }) {

    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            createUser()
        } catch (error) {
            console.log(error.message);
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
            console.log(error.message);
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
                            <Form className="d-flex flex-column align-items-center p-4">
                                <h3 className="mb-3">Iniciar sesión </h3>
                                <Form.Group className="mb-3 w-100 ps-2 " controlId="formBasicEmail">
                                    <Form.Label>Email </Form.Label>
                                    <Form.Control type="email" className="rounded-pill" placeholder="Enter email" onChange={(event) => {
                                        setLoginEmail(event.target.value);
                                    }} />
                                </Form.Group>

                                <Form.Group className="mb-3 w-100 ps-2 " controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" className="rounded-pill" placeholder="Password" onChange={(event) => {
                                        setLoginPassword(event.target.value);
                                    }} />
                                </Form.Group>

                                <Button variant="outline-dark" className="btn-auth btn-outline-primary rounded-pill" onClick={login}>
                                    Log In
                                </Button>
                            </Form>
                        </Col>
                        <Col xs={12} md={6} className="p-2">
                            <Form className="d-flex flex-column align-items-center p-4 form-checkin">
                                <h3 className="mb-3">Registrar nuevo Usuario</h3>
                                <Form.Group className="mb-3 w-100 ps-2 " controlId="formBasicEmail">
                                    <Form.Label>Nombre y Apellido</Form.Label>
                                    <Form.Control type="name" className="rounded-pill" placeholder="Nombre y Apellido" onChange={(event) => {
                                        setRegisterName(event.target.value);
                                    }}  />
                                </Form.Group>

                                <Form.Group className="mb-3 w-100 ps-2 " controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" className="rounded-pill" placeholder="example@mail.com" onChange={(event) => {
                                        setRegisterEmail(event.target.value);
                                    }} />
                                </Form.Group>

                                <Form.Group className="mb-3 w-100 ps-2 " controlId="formBasicPassword">
                                    <Form.Label>Password (min 6 caracteres)</Form.Label>
                                    <Form.Control type="password" className="rounded-pill" placeholder="Password" onChange={(event) => {
                                        setRegisterPassword(event.target.value);
                                    }} />
                                </Form.Group>
                                <Form.Group className="mb-3 w-100 ps-2 d-flex" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="" />
                                    <a href="" className="d-flex ps-2">Aceptar términos y condiciones</a>
                                </Form.Group>
                                <Button variant="dark" className="btn-auth rounded-pill" onClick={register}>
                                    Submit
                                </Button>
                            </Form>
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