import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import logo from '../assets/static/logo-wispro.png';
import Footer from "./Footer";
import Header from "./Header";
import "../assets/styles/components/Auth.scss";




const Auth = ({children}) => {


    const [email, setEmail] = useState(['']);
    const [password, setPassword] = useState(['']);
    const [userName, setUserName] = useState(['']);
    const [hasUser, setHasUser] = useState();

    const auth = getAuth();

    const handleSubmit = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setHasUser(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

            });
    }

    const handleLogIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setHasUser(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const handleLogOut = () => {
        signOut(auth).then(() => {
            setHasUser();
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div className="Auth">
            <Container>
                {!hasUser &&
                    <Row className="py-5 d-flex align-items-end">
                        <Col xs={12} md={6} className="p-5" >
                                <img className="logo-img" src={logo} alt="logo-wispro" />
                            <Form className="d-flex flex-column align-items-center p-4">
                                <h3 className="mb-3">Iniciar sesión </h3>
                                <Form.Group className="mb-3 w-100 ps-2 " controlId="formBasicEmail">
                                    <Form.Label>Email </Form.Label>
                                    <Form.Control type="email" className="rounded-pill" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3 w-100 ps-2 " controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" className="rounded-pill" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
 
                                <Button variant="outline-dark" className="btn-auth btn-outline-primary rounded-pill" onClick={handleLogIn}>
                                    Log In
                                </Button>
                            </Form>
                        </Col>
                        <Col xs={12} md={6} className="p-5">
                            <Form className="d-flex flex-column align-items-center p-4 form-checkin">
                            <h3 className="mb-3">Registrar nuevo Usuario</h3>
                                <Form.Group className="mb-3 w-100 ps-2 " controlId="formBasicEmail">
                                    <Form.Label>Nombre y Apellido</Form.Label>
                                    <Form.Control type="name" className="rounded-pill" placeholder="Nombre y Apellido" onChange={(e) => setUserName(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3 w-100 ps-2 " controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" className="rounded-pill" placeholder="example@mail.com" onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3 w-100 ps-2 " controlId="formBasicPassword">
                                    <Form.Label>Password (min 6 caracteres)</Form.Label>
                                    <Form.Control type="password" className="rounded-pill" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3 w-100 ps-2 d-flex" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="" />
                                    <a href="" className="d-flex ps-2">Acptar términos y condiciones</a>
                                </Form.Group>
                                <Button variant="dark" className="btn-auth rounded-pill" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                }
                {hasUser &&
                <div>
                    <Header></Header>
                    <div className="w-100 d-flex justify-content-end">
                    <Button variant="dark" className=" rounded-pill" onClick={handleLogOut}>
                        Log Out
                    </Button>
                    </div>

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