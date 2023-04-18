import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getListOfCategories } from "../../functions/Service";



export default function Home(configuration) {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        getListOfCategories(configuration).then(result => {
            console.log(JSON.stringify(result));
            const size = Object.keys(result).length;
             result && size > 0 ? setCategories(result.data) : console.log(result);
            /* if(result && size > 0) {
               //averigurar se resulta.data.nome já existe
            }  */

            // console.log(result.data.Results);
            // console.log(configuration);
        }).catch(err =>  {
            console.log(err);
        });
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (

        <div className="content">
            <div className="page-title">
                <h2 className="mb-5">Selecione a categoria dos documentos</h2>
            </div>
            <div className="row">
                {categories.map((category) => (
                    <div className="col-sm-4" key={category.id}>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-center">
                                    <h5 className="card-title">{category.nome}</h5>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Link className="btn btn-primary btn-outline-light btn-lg" role="button" to="/lista">
                                        {category.nome}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}