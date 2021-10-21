import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DataLogin from "./DataLogin";
import DataLoginDate from "./DataLoginDate";
import "../../assets/styles/components/Data.scss";




const Data = () => {

    return (
        <div className="Data">
            <Container>
                <DataLogin></DataLogin>
            </Container>
                <DataLoginDate></DataLoginDate>
        </div>
    );
};

export default Data;