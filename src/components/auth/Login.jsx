import React, { useState } from "react";
import { useForm } from 'react-hook-form'
import {  Form, Button } from "react-bootstrap";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";


const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

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
    return (
        <>
            <Form className="d-flex flex-column align-items-center p-4" onSubmit={handleSubmit(login)}>
                <h3 className="mb-3">Iniciar sesión </h3>
                <Form.Group className="mb-3 w-100 ps-2 " controlId="formBasicEmail">
                    <Form.Label>Email </Form.Label>
                    <Form.Control
                        type="email"
                        {...register('email', { required: true })}
                        className="rounded-pill"
                        placeholder=""
                        onChange={(event) => { setLoginEmail(event.target.value); }}
                    />
                    {errors.email && <span>Ingrese un email</span>}
                </Form.Group>

                <Form.Group className="mb-3 w-100 ps-2 " controlId="formBasicPassword">
                    <Form.Label>Clave</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        {...register('password', { required: true })}
                        className="rounded-pill"
                        placeholder="Clave"
                        onChange={(event) => { setLoginPassword(event.target.value); }} />
                    {errors.password && <span>Ingrese una clave</span>}
                </Form.Group>

                <Button type="submit" variant="outline-dark" className="btn-auth btn-outline-primary rounded-pill" >
                    Log In
                </Button>
            </Form>
        </>

    )
}
export default Login;