import React, { useState, useEffect } from "react";
import { Table, Button} from "react-bootstrap";
import { db } from "../firebase"
import "../assets/styles/components/UsersAdmin.scss";
import { collection, getDocs, addDoc } from "@firebase/firestore";


const UsersAdmin = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const getData = await getDocs(collection(db, "users"));
            setUsers(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getUsers();

    }, []);




    // return <div className="prueba">
    //     {users.map((user) => { 
    //         return  <div>
    //             <h1>{user.name}</h1> 
    //             <h1>{user.email}</h1>
    //         </div> })}
    //         </div>

    return users.length === 0 ? <div className="d-flex justifu-content-center align-items-center"><h6>Loading...</h6></div> 
        : (
     <div className="UsersAdmin">
                <h2 className="mb-3">Panel de control de usuarios</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre y Apellido</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.rol}</td>
                                <th><Button>Edit</Button><Button>remove</Button></th>
                            </tr>
                        )
                        })}
                    </tbody>
                </Table>
            </div>
    );
        
};

export default UsersAdmin;