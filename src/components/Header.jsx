import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from '../assets/static/logo-wispro.png';
import "../assets/styles/components/Header.scss";



const Header = ({children}) => {

    return (
        <div className="header">
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="/"><img  style={{ width: '140px '}} src={logo} alt="logo-wispro" /></Navbar.Brand>
                    {children}   
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="nav-bar">
                        <Nav className="me-auto">
                            <Link className="me-3" to="/users"> 
                             Panel de control
                            </Link>
                            <Link className="me-3" to="/data">
                            Estadísticas
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;