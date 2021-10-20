import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Container, Form } from "react-bootstrap";
import { db } from "../../firebase"
import "../../assets/styles/components/UsersAdmin.scss";
import {updateDoc, doc } from "@firebase/firestore";
import { BiEditAlt } from "react-icons/bi"


function UpdateModal ({user})  {
    
    const [updateModalShow, setUpdateModalShow] = useState(false);
    const handleClose = () => setUpdateModalShow(false);
    const handleShow = () => setUpdateModalShow(true);

    const [userSelect, setUserSelect] = useState({
        id: user.id,
        name: user.name,
        email: user.email,
        rol: user.rol
    })

    const selectUser = (user, action) => {
        setUserSelect(user);
        (action === 'Edit') && setUpdateModalShow(true)
    }
    const handleChange = e => {
        const {name, value} = e.target;
        setUserSelect((prevstate) => ({
            ...prevstate,
            [name]: value
        }))
    }

    const updateUser = async (id) => {
        const userDoc = doc(db, "users", id);
        const newData = { name: userSelect.name, email: userSelect.email, rol: userSelect.rol }
        await updateDoc(userDoc, newData);
        handleClose();
    }

    return (
        <>
            <Button className="rounded-pill me-3" variant="outline-dark" onClick={() => selectUser(user, 'Edit')}>
            <BiEditAlt />
            </Button>
            <Modal show={updateModalShow} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                       Actualizar datos de usuario
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre y Apellido</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="" 
                            onChange={handleChange} 
                            name='name' 
                            value={userSelect && userSelect.name} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasiEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                             type="email" 
                             placeholder="example@mail.com" 
                             onChange={handleChange} 
                             name='email' 
                             value={userSelect && userSelect.email} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasiEmail">
                            <Form.Label>Rol</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="" 
                            onChange={handleChange} 
                            name='rol' 
                            value={userSelect && userSelect.rol} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="rounded-pill" variant="success" onClick={() => updateUser(user.id)}>Guarar cambios</Button>
                    <Button className="rounded-pill" variant="secondary" onClick={handleClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default UpdateModal;