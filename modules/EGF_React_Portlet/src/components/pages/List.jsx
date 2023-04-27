import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../minorComponents/SearchBar";
import Table from "../minorComponents/Table";
import { data } from '../../data';
import { getListOfCategories } from "../../functions/Service";

export default function List(configuration) {
    const [query, setQuery] = useState("");
    const [show, setShow] = useState("");
    const [showSubCat, setShowSubCat] = useState("");
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState("");

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

    const getCategories = () => {
        getListOfCategories(configuration).then(result => {
            const size = Object.keys(result).length;
            result && size > 0 ? setCategories(result.data) : console.log(result);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleToggle = (category) => {
        show === category ? setShow("") : setShow(category);
    };

    const handleToggleSubCatgory = (subCat) => {
        showSubCat === subCat ? setShowSubCat("") : setShowSubCat(subCat);
    };

    const handleSelection = (event) => {
        console.log(event.target.value)
    }

    function teste(event){
        
        console.log('target' + event.target);
        console.log('value' + event.target.value);

    }


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
                    <div className="col-3 d-flex flex-column filter-column">
                        <h6 className="btn btn-light d-flex" onClick={() => { handleToggle("category"); getCategories() }}>Categorias</h6>
                        {

                            categories.map((category) => (

                                show === "category" ?
                                    <div className="category" key={category.id}>
                                        <ul className="category-list" style={{ listStyleType: "none" }}>
                                            <li><h6 className="btn btn-light"
                                                style={{ textDecoration: "none" }}
                                                onClick={() => handleToggleSubCatgory(category.nome)}> {category.nome}</h6>
                                                {
                                                    showSubCat === category.nome ?
                                                        <div className={category.nome}>
                                                            <ul className="doc-type-list" style={{ listStyleType: "none" }}>
                                                                <li><input id="1" value="Tipo 1" type="checkbox" onChange={ teste }/> Tipo 1</li>
                                                                <li><input id="2" value="Tipo 2" type="checkbox" onChange={ handleSelection}/> Tipo 2</li>
                                                                <li><input id="3" value="Tipo 3" type="checkbox" onChange={ (event) => handleSelection(event)}/> Tipo 3</li>
                                                            </ul>
                                                        </div>
                                                        : null
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                    : null
                            ))}
                        <h6 type="button" className="btn btn-light d-flex" onClick={() => handleToggle("company")}>Empresas</h6>
                        {
                            show === "company" ?
                                <div className="company">
                                    <ul className="company-list" style={{ listStyleType: "none" }}>
                                        <li><input id="4" value="Empresa 1" type="checkbox" onChange={ (event) => handleSelection(event)}/> Empresa 1</li>
                                        <li><input id="5" value="Empresa 2" type="checkbox" onChange={ (event) => handleSelection(event)}/> Empresa 2</li>
                                        <li><input id="6" value="Empresa 3" type="checkbox" onChange={ (event) => handleSelection(event)}/> Empresa 3</li>
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
                                        <li> Antes de <input type="date" /></li>
                                    </ul>
                                </div>
                                : null
                        }
                    </div>
                    <div className="col-9 list-files">
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