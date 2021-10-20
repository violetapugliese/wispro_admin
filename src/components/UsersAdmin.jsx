import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Container, Form } from "react-bootstrap";
import { db } from "../firebase"
import "../assets/styles/components/UsersAdmin.scss";
import { collection, getDocs, addDoc, updateDoc, doc } from "@firebase/firestore";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import RemoveModal from "./RemoveModal";


function UsersAdmin () {

  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const getData = await getDocs(collection(db, "users"));
      setUsers(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getUsers();

  });

  
  return users.length === 0 ? <div className="loader" ><h6>Loading...</h6></div>
    : (
      <div className="UsersAdmin">
        <h2 className="mb-3">Panel de control de usuarios</h2>
        <div className="w-100 mb-3 ">
        <AddModal />
        </div>
        <Table striped bordered hover className="table-users d-none d-sm-table rounded-pill">
          <thead>
            <tr>
              <th>Nombre y Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id} >
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.rol}</td>
                  <td className="d-flex justify-content-center">
                  <UpdateModal user={user} />
                   <RemoveModal user={user}/>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <Table striped bordered hover className="table-users d-table d-sm-none">
          <thead>
            <tr>
              <th>Nombre y Apellido</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id} >
                  <td>{user.name}</td>
                  <td>
                  <UpdateModal user={user} />
                   <RemoveModal user={user}/>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    );
};

export default UsersAdmin;