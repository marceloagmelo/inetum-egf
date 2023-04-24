import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../minorComponents/SearchBar";
import Table from "../minorComponents/Table";
import { data } from '../../data';

export default function List() {
    const [query, setQuery] = useState("");

    // Define a função handleQuery que filtra a lista de documentos
    const handleQuery = (data) => {
        return data.filter(
            (document) =>
                document.Nome.toLowerCase().includes(query.toLowerCase()) ||
                document.Tipo.toLowerCase().includes(query.toLowerCase()) ||
                document.Empresa.toLowerCase().includes(query.toLowerCase()) ||
                document.Data.toLowerCase().includes(query.toLowerCase())
        )
    };

    // Define o listener que atualiza o estado 'query' sempre que o usuário digita na barra de pesquisa
    const searchBarListener = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className="content">
            <div className="go-back d-flex justify-content-end">
                <Link className="btn btn-primary btn-outline-light btn-lg" role="button" to="/">Voltar</Link>
            </div>
            <div className="page-title">
                <h2>Documentos</h2>
            </div>
            <div className="container">
                <div className="row m-3">
                    <div className="col-3">
                        <div className="dropdown">
                            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown link
                            </a>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-9">
                        <div className="search">
                            <SearchBar placeholder="Pesquise documentos" onChange={searchBarListener} />
                            <div className="dataResult">
                                <Table data={handleQuery(data)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}