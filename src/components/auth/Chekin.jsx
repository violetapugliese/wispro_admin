import React, { useState } from "react";
import { useForm } from 'react-hook-form'
import { Form, Button, Modal} from "react-bootstrap";
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
    const [registerCheckbox, setRegisterCheckbox] = useState();

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

    // Modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    <Form.Label>Clave (min 6 caracteres)</Form.Label>
                    <Form.Control
                        type="password"
                        className="rounded-pill"
                        {...register('newpassword', { required: true })}
                        placeholder="Clave"
                        onChange={(event) => { setRegisterPassword(event.target.value); }} />
                    {errors.newpassword && <span>Ingrese una clave de al menos 6 caracteres</span>}
                </Form.Group>
                <Form.Group className="mb-3 w-100 ps-2" controlId="formBasicCheckbox">
                    <div className="d-flex">
                        <Form.Check
                            type="checkbox"
                            label=""
                            {...register('checkbox', { required: true })}
                            placeholder="Clave"
                            onChange={(event) => { setRegisterCheckbox(event.target.value); }} />
                        <button className="btn text-light p-1 text-decoration-underline" onClick={handleShow}>Aceptar términos y condiciones</button>
                    </div>
                    {errors.checkbox && <span>Acepte terminos y condiciones</span>}
                </Form.Group>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Términos y condiciones</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Estos son los términos y condiciones que aceptarás al registrate.</Modal.Body>
                    <Modal.Footer>
                        <Button className="roundend-pill" variant="secondary" onClick={handleClose}>
                            Entendido
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Button type="submit" variant="dark" className="btn-auth rounded-pill">
                    Submit
                </Button>
            </Form>
        </>
    );
}
export default Login;