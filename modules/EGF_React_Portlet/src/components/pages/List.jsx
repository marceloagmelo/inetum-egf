import React from "react";
import { Link } from "react-router-dom";

export default function List() {

    return (
        <div className="content">

            <div className="go-back d-flex justify-content-end">
            <Link className="btn btn-primary btn-outline-light btn-lg" role="button" to="/">Voltar</Link> 
            </div>

            <div className="page-title">
                <h2>Documentos</h2>
            </div>
        </div>
    );
}