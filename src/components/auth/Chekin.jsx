import React, { useState } from "react";
import { useForm } from 'react-hook-form'
import { Form, Button } from "react-bootstrap";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc } from "@firebase/firestore";
import { auth } from "../../firebase";
import { db } from "../../firebase";

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

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


    const createUser = async () => {
        await addDoc(collection(db, "users"), { name: registerName, email: registerEmail })
    }

    return (
        <>
            <Form className="d-flex flex-column align-items-center p-4 form-checkin" onSubmit={handleSubmit(checkin)}>
                <h3 className="mb-3">Registrar nuevo Usuario</h3>
                <Form.Group className="mb-3 w-100 ps-2 " controlId="formBasicEmail">
                    <Form.Label>Nombre y Apellido</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('name', { required: true })}
                        className="rounded-pill"
                        placeholder="Nombre y Apellido"
                        onChange={(event) => { setRegisterName(event.target.value); }} />
                    {errors.name && <span>Ingrese un Nombre</span>}
                </Form.Group>

                <Form.Group className="mb-3 w-100 ps-2 " controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"
                        className="rounded-pill"
                        {...register('newemail', { required: true })}
                        placeholder="example@mail.com"
                        onChange={(event) => { setRegisterEmail(event.target.value); }} />
                    {errors.newemail && <span>Ingrese un Email</span>}
                </Form.Group>

                <Form.Group className="mb-3 w-100 ps-2 " controlId="formBasicPassword">
                    <Form.Label>Password (min 6 caracteres)</Form.Label>
                    <Form.Control
                        type="password"
                        className="rounded-pill"
                        {...register('newpassword', { min: 6 })}
                        placeholder="Password"
                        onChange={(event) => { setRegisterPassword(event.target.value); }} />
                    {errors.newpassword && <span>Ingrese una clave de al menos 6 caracteres</span>}
                </Form.Group>
                <Form.Group className="mb-3 w-100 ps-2 d-flex" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="" />
                    <a href="" className="d-flex ps-2">Aceptar términos y condiciones</a>
                </Form.Group>
                <Button type="submit" variant="dark" className="btn-auth rounded-pill">
                    Submit
                </Button>
            </Form>
        </>
    );
}
export default Login;