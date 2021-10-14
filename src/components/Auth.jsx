import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { Container, Form, Button } from "react-bootstrap";
// import { useFirebaseApp, useUser } from "reactfire"


const Auth = () => {



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
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter User Name" onChange={(e) => setUserName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" onClick={handleSubmit}>
                            Submit
                        </Button>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" onClick={handleLogIn}>
                            Log In
                        </Button>
                    </Form>
                }
                { hasUser &&
                    <Button variant="primary" onClick={handleLogOut}>
                        Log Out
                    </Button>
                }
            </Container>
        </div>
    );
};

export default Auth;