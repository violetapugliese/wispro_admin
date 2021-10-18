import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../assets/styles/components/Index.scss";


const Index = () => {

    return (
        <div className="Index px-4">
            <h2 className="mb-3">Bienvenido al Administrador de Usuarios de <span>Wispro</span></h2>
            <div>
                <p> Podés visitar el  <Link to="/users">panel de control</Link> de usuarios, o conocer las <Link to="/data">estadísticas</Link> de uso.</p>

            </div>
        </div>
    );
};

export default Index;