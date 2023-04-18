import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getListOfCategories } from "../../functions/Service";



export default function Home(configuration) {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        getListOfCategories(configuration).then(result => {
            const size = Object.keys(result).length;
            return result && size > 0 ? setCategories(result.data.Results) : console.log(result);
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
                    <div className="col-sm-4" key={category.Mfr_ID}>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-center">
                                    <h5 className="card-title">{category.Country}</h5>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Link className="btn btn-primary btn-outline-light btn-lg" role="button" to="/lista">
                                        {category.Country}
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