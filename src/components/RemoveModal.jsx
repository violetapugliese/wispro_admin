import React, { useState, useEffect } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { db } from "../firebase"
import "../assets/styles/components/UsersAdmin.scss";
import { deleteDoc, doc } from "@firebase/firestore";
import { BiTrashAlt } from "react-icons/bi"

const RemoveModal = ({ user }) => {


    const [removeModal, setRemoveModal] = useState(false);
    const handleClose = () => setRemoveModal(false);
    const handleShow = () => setRemoveModal(true);

    const [userSelect, setUserSelect] = useState({
        id: user.id,
        name: user.name,
        email: user.email,
        rol: user.rol
    })

    const selectUser = (user, action) => {
        setUserSelect(user);
        (action === 'Remove') && setRemoveModal(true)
    }

    const removeUser = async (id) => {
        const userDoc = doc(db, "users", id);
        const newData = { name: userSelect.name, email: userSelect.email, rol: userSelect.rol }
        await deleteDoc(userDoc);
        handleClose();
    }

    return (
        <>
            <Button variant="light" onClick={() => selectUser(user, 'Remove')}>
            <BiTrashAlt/>
            </Button>
            <Modal show={removeModal} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Eliminar Usuario
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="danger" >
                        <Alert.Heading>Estás a punto de eliminar un Usuario</Alert.Heading>
                        <p>
                            Una vez que el usuario está eliminado, no podrás recuperar la información.
                        </p>
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => removeUser(user.id)}>Eliminar</Button>
                    <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default RemoveModal;