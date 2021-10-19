import React, { useState, useEffect } from "react";
import {  Button, Modal,  Form } from "react-bootstrap";
import { db } from "../firebase"
import "../assets/styles/components/UsersAdmin.scss";
import { collection,  addDoc } from "@firebase/firestore";


const  AddModal = () => {

    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newRol, setNewRol] = useState("");

    const [addModalShow, setAddModalShow] = useState(false);
    const handleClose = () => setAddModalShow(false);
    const handleShow = () => setAddModalShow(true);

    const createUser = async () => {
      await addDoc(collection(db, "users"), { name: newName, email: newEmail, rol: newRol })
      handleClose();
    }

    return (
      <>
      <Button variant="secondary" onClick={handleShow}>
      + Crear Usuario
    </Button>
      <Modal show={addModalShow} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Crear Usuario
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre y Apellido</Form.Label>
                <Form.Control type="text" placeholder="" onChange={(e) => setNewName(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasiEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="example@mail.com"onChange={(e) => setNewEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasiEmail">
                <Form.Label>Rol</Form.Label>
                <Form.Control type="text" placeholder="" onChange={(e) => setNewRol(e.target.value)}/>
              </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success" onClick={createUser}>Crear usuario</Button>
          <Button variant="secondary"  onClick={handleClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
  export default AddModal;