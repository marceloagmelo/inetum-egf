import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../minorComponents/SearchBar";
import Table from "../minorComponents/Table";
import { data } from '../../data';


export default function List() {
    const [query, setQuery] = useState("");
    const [show, setShow] = useState("");
    const [showSubCat, setShowSubCat] = useState("");

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

    const handleToggle = (category) => {
        show === category ? setShow("") : setShow(category);
    };

    const handleToggleSubCatgory = (subCat) => {
        show === subCat ? setShowSubCat("") : setShowSubCat(subCat);
    };


    // Define o listener que atualiza o estado 'query' sempre que o usuário digita na barra de pesquisa
    const searchBarListener = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className="content">
            <div className="go-back d-flex justify-content-end">
                <Link className="btn btn-light" role="button" to="/">Voltar</Link>
            </div>
            <div className="page-title">
                <h2 className="mb-5">Documentos</h2>
            </div>
            <div className="container">
                <div className="row m-3">
                    <div className="col-3 d-flex flex-column">
                        <h6 className="btn btn-light d-flex" onClick={() => handleToggle("category")}>Categorias</h6>
                        {
                            show === "category" ?
                                <div className="category">
                                    <ul className="category-list" style={{ listStyleType: "none" }}>
                                        <li><h6 className="btn btn-link"
                                            style={{ textDecoration: "none" }}
                                            onClick={() => handleToggleSubCatgory("category1")}> Categoria 1</h6>
                                            {
                                                showSubCat === "category1" ?
                                                    <div className="category1">
                                                        <ul className="doc-type-list" style={{ listStyleType: "none" }}>
                                                            <li><input type="checkbox" /> Tipo 1</li>
                                                            <li><input type="checkbox" /> Tipo 2</li>
                                                            <li><input type="checkbox" /> Tipo 3</li>
                                                        </ul>
                                                    </div>
                                                    : null
                                            }
                                        </li>
                                        <li><h6 className="btn btn-link"
                                            style={{ textDecoration: "none" }}
                                            onClick={() => handleToggleSubCatgory("category2")}> Categoria 2</h6>
                                            {
                                                showSubCat === "category2" ?
                                                    <div className="category2">
                                                        <ul className="doc-type-list" style={{ listStyleType: "none" }}>
                                                            <li><input type="checkbox" /> Tipo 1</li>
                                                            <li><input type="checkbox" /> Tipo 2</li>
                                                            <li><input type="checkbox" /> Tipo 3</li>
                                                        </ul>
                                                    </div>
                                                    : null
                                            }</li>
                                        <li><h6 className="btn btn-link"
                                            style={{ textDecoration: "none" }}
                                            onClick={() => handleToggleSubCatgory("category3")}> Categoria 3</h6>
                                            {
                                                showSubCat === "category3" ?
                                                    <div className="category3">
                                                        <ul className="doc-type-list" style={{ listStyleType: "none" }}>
                                                            <li><input type="checkbox" /> Tipo 1</li>
                                                            <li><input type="checkbox" /> Tipo 2</li>
                                                            <li><input type="checkbox" /> Tipo 3</li>
                                                        </ul>
                                                    </div>
                                                    : null
                                            }</li>
                                    </ul>
                                </div>
                                : null
                        }
                        <h6 type="button" className="btn btn-light d-flex" onClick={() => handleToggle("company")}>Empresas</h6>
                        {
                            show === "company" ?
                                <div className="company">
                                    <ul className="company-list" style={{ listStyleType: "none" }}>
                                        <li><input type="checkbox" /> Empresa 1</li>
                                        <li><input type="checkbox" /> Empresa 2</li>
                                        <li><input type="checkbox" /> Empresa 3</li>
                                    </ul>
                                </div>
                                : null
                        }
                        <h6 type="button" className="btn btn-light d-flex" onClick={() => handleToggle("date")}>Data</h6>
                        {
                            show === "date" ?
                                <div className="date">
                                    <ul className="date-list" style={{ listStyleType: "none" }}>
                                        <li> Depois de <input type="date" /></li>
                                        <li> Antes de   <input type="date" /></li>  
                                    </ul>
                                </div>
                                : null
                        }
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