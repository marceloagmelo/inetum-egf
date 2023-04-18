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
            <div className="container-fluid h-100">
                <div className="row">
                    <div class="col-3 bg-primary">col-3</div>
                    <div class="col-9 bg-secondary">col-9</div>
                </div>
            </div>
        </div>
    );
}