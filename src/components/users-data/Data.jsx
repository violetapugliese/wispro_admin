import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DataLogin from "./DataLogin";
import "../../assets/styles/components/Data.scss";




const Data = () => {

    return (
        <div className="Data">
            <Container>
                <h2 className="mb-3">Login por día</h2>
                <DataLogin></DataLogin>
            </Container>
        </div>
    );
};

export default Data;