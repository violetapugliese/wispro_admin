import React, { useState, useEffect } from "react";
import logo from '../assets/static/logo-wispro.png';
import { Container, Navbar, Nav } from "react-bootstrap";
import "../assets/styles/components/Header.scss";


const Header = () => {

    return (
        <div className="header">
            <Navbar  expand="lg">
                <Container>
                    <Navbar.Brand href="#home"><img  style={{ width: '140px '}} src={logo} alt="logo-wispro" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;